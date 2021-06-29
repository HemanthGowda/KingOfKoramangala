import "./board.css"
import React from "react";
import {Container, Row} from "react-bootstrap";
import {Dice} from "../dice/dice";
import {cloneDeep, map} from "lodash";
import {updateRoom} from "../../firebase/game";

export default function Board(props) {
	const {game} = props;

	const onSelectDice = (die) => {
		return async () => {
			let clonedGame = cloneDeep(game);
			let currentPlay = clonedGame.currentPlay
			currentPlay.dice = map(currentPlay.dice, (v) => {
				if (v.diceNumber === die.diceNumber) {
					return {selected: !v.selected, value: v.value, diceNumber: v.diceNumber}
				}
				return v
			});

			await updateRoom(clonedGame.name, {...clonedGame, currentPlay: currentPlay})
		}
	}

	return game ? <Container className={"board-container"}>
		<Row className={"excess"}>

		</Row>
		<Row className={"dice-container"}>
			{game.currentPlay.dice.map((die) => {
				return <Dice die={die} key={die.diceNumber} onSelect={onSelectDice(die)}/>;
			})}
		</Row>
	</Container> : null
}
