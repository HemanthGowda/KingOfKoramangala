import React from "react";
import {Button} from "react-bootstrap";
import "./player.css"
import {updateRoom} from "../../firebase/game";
import GameService from "../../services/gameService";

export function CurrentPlayerActions(props) {
	const {game} = props
	const gameService = new GameService(game);

	const endTurn = async () => {
		let updatedGame = gameService.endTurn()

		await updateRoom(game.name, updatedGame)
	}

	const rollDice = async () => {
		let updatedGame = gameService.rollDice()

		await updateRoom(game.name, updatedGame)
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