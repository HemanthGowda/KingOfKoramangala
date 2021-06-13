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
				{id: 0, selected: true, value: undefined},
				{id: 1, selected: true, value: undefined},
				{id: 2, selected: true, value: undefined},
				{id: 3, selected: true, value: undefined},
				{id: 4, selected: true, value: undefined},
				{id: 5, selected: true, value: undefined}
			],
			numberOfTimesRolled: 0
		}
	}

	rollDice = () => {
		let changed = false;
		let updatedDice = map(this.state.dice, (diceValue) => {
			if (!diceValue.selected) {
				return {selected: false, value: diceValue.value, id: diceValue.id}
			}
			changed = true;
			return ({
				id: diceValue.id,
				selected: false,
				value: Math.floor(Math.random() * 6) + 1
			});
		});

		if (changed) {
			this.setState({dice: updatedDice, numberOfTimesRolled: this.state.numberOfTimesRolled + 1})
		}
	}

	onSelectDice = (die) => {
		return () => {
			let updatedDice = map(this.state.dice, (diceValue) => {
				if (diceValue.id === die.id) {
					return {selected: !diceValue.selected, value: diceValue.value, id: diceValue.id}
				}
				return diceValue
			});
			this.setState({dice: updatedDice})
		}
	}

	render() {
		const {dice, numberOfTimesRolled} = this.state;
		return <Container className={"board-container"}>
			<Row>
				<Button variant={"danger"} onClick={this.rollDice} disabled={numberOfTimesRolled >= 3}>Roll
					Dice</Button>
			</Row>
			<Row className={"excess"}>

			</Row>
			<Row className={"dice-container"}>
				{dice.map((die) => {
					return <Dice die={die} key={die.id} onSelect={this.onSelectDice(die)}/>;
				})}
			</Row>
		</Container>
	}
}
