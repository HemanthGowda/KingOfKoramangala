import "./dice.css";
import {Col} from "react-bootstrap";

export function Dice(props) {
	const {die, onSelect} = props

	return die.value ? <Col xs={2}>
		<div className={`dice ${die.selected ? 'selected' : ''}`} onClick={onSelect}>{die.value}</div>
	</Col> : null
}