import React from "react";
import {Button} from "react-bootstrap";
import "./player.css"
import {cloneDeep, countBy, each, keys, map} from "lodash";
import {updateRoom} from "../../firebase/game";
import {selectPlayerId} from "../../reducers/player";
import {useSelector} from "react-redux";
import {updatePlayer} from "../../firebase/player";

export function CurrentPlayerActions(props) {
	const {game, player} = props

	const playerId = useSelector(selectPlayerId)

	const endTurn = async () => {
		let clonedGame = cloneDeep(game);

		let score = 0;
		each(countBy(clonedGame.currentPlay.dice, "value"), (v, k) => {
			switch (v) {
				case 3:
					score += parseInt(k)
					break
				case 4:
					score += parseInt(k) + 1
					break
				case 5:
					score += parseInt(k) + 2
					break
				case 6:
					score += parseInt(k) + 3
					break
			}
		})


		await updateRoom(clonedGame.name, {
			...clonedGame,
			currentPlay: {
				dice: {
					0: {selected: true, value: -1, diceNumber: 1},
					1: {selected: true, value: -1, diceNumber: 2},
					2: {selected: true, value: -1, diceNumber: 3},
					3: {selected: true, value: -1, diceNumber: 4},
					4: {selected: true, value: -1, diceNumber: 5},
					5: {selected: true, value: -1, diceNumber: 6},
				},
				numberOfTimesRolled: 0
			},
			currentPlayerPosition: (game.currentPlayerPosition + 1) % keys(game.players).length
		})

		await updatePlayer(game.name, playerId, {...player, currentScore: player.currentScore + score})
	}

	const rollDice = async () => {
		let clonedGame = cloneDeep(game);
		let currentPlay = clonedGame.currentPlay
		currentPlay.dice = map(currentPlay.dice, (v) => {
			if (!v.selected) {
				return {selected: v.selected, value: v.value, diceNumber: v.diceNumber}
			}
			return {
				diceNumber: v.diceNumber,
				selected: false,
				value: Math.floor(Math.random() * 6) + 1
			};
		});
		currentPlay.numberOfTimesRolled += 1

		await updateRoom(clonedGame.name, {...clonedGame, currentPlay: currentPlay})
	}

	return <>
		{
			game.currentPlay.numberOfTimesRolled < 3 ?
				<Button variant={"primary"} className={"roll-button"} onClick={rollDice}>Roll Dice</Button> :
				null
		}

		{
			game.currentPlay.numberOfTimesRolled > 0 ?
				<Button variant={"danger"} className={"roll-button"} onClick={endTurn}>End Turn</Button> :
				null
		}

	</>
}