import "./dice.css";
import {Col} from "react-bootstrap";

export function Dice(props) {
	const {die} = props

	return die.value ? <Col xs={2}>
		<div className={"dice"} onClick={() => die.selected = true}>{die.value}</div>
	</Col> : null
}