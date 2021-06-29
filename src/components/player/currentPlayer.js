import {Button, Card} from "react-bootstrap";
import "./player.css"
import {AiFillHeart, AiFillStar} from "react-icons/all";
import React from "react";
import {cloneDeep, map} from "lodash";
import {updateRoom} from "../../firebase/game";

export function CurrentPlayer(props) {
	const {player, game} = props

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

	return !player ? null :
		<Card style={{width: "100%"}}>
			<Card.Header>
				{player.currentScore} <AiFillStar className={"star-icon"}/>
				{player.currentHealth} <AiFillHeart className={"health-icon"}/>
				{
					game.currentPlayerPosition === player.tablePosition ?
						<Button variant={"danger"} className={"roll-button"} onClick={rollDice}>Roll Dice</Button> :
						null
				}
			</Card.Header>
			<Card.Body>
				<Card.Title>
					{player.name}
				</Card.Title>
			</Card.Body>
		</Card>
}