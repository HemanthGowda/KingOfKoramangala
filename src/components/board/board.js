import {Button, Container, Row} from "react-bootstrap";
import "./board.css"
import {Dice} from "../dice/dice";
import React from "react";
import {map} from "lodash"

export default class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dice: [
				{selected: true, value: undefined},
				{selected: true, value: undefined},
				{selected: true, value: undefined},
				{selected: true, value: undefined},
				{selected: true, value: undefined},
				{selected: true, value: undefined}
			]
		}
	}

	rollDice = () => {
		let updatedDice = map(this.state.dice, (diceValue) => {
			if (!diceValue.selected) {
				return {selected: false, value: diceValue.value}
			}
			return ({
				selected: false,
				value: Math.floor(Math.random() * 6) + 1
			});
		});

		this.setState({dice: updatedDice})
	}

	render() {
		const {dice} = this.state;
		return <Container className={"board-container"}>
			<Row>
				<Button variant={"danger"} onClick={this.rollDice}>Roll Dice</Button>
			</Row>
			<Row className={"excess"}>

			</Row>
			<Row className={"dice-container"}>
				{dice.map((die, i) => <Dice die={die} key={i}/>)}
			</Row>
		</Container>
	}
}
