import {Button, Container, Row} from "react-bootstrap";
import "./board.css"
import {Dice} from "../dice/dice";
import React from "react";

export default class Game extends React.Component {
	const

	constructor(props) {
		super(props);
		this.state = {
			diceValues: {
				1: undefined,
				2: undefined,
				3: undefined,
				4: undefined,
				5: undefined,
				6: undefined
			}
		}
	}

	rollDice = () => {
		this.setState({
			diceValues: {
				1: Math.floor(Math.random() * 6) + 1,
				2: Math.floor(Math.random() * 6) + 1,
				3: Math.floor(Math.random() * 6) + 1,
				4: Math.floor(Math.random() * 6) + 1,
				5: Math.floor(Math.random() * 6) + 1,
				6: Math.floor(Math.random() * 6) + 1
			}
		})
	}

	render() {
		const {diceValues} = this.state;
		return <Container className={"board-container"}>
			<Row>
				<Button variant={"danger"} onClick={this.rollDice}>Roll Dice</Button>
			</Row>
			<Row className={"excess"}>

			</Row>
			<Row className={"dice-container"}>
				<Dice value={diceValues[1]}/>
				<Dice value={diceValues[2]}/>
				<Dice value={diceValues[3]}/>
				<Dice value={diceValues[4]}/>
				<Dice value={diceValues[5]}/>
				<Dice value={diceValues[6]}/>
			</Row>
		</Container>
	}
}
