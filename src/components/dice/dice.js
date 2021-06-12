import "./dice.css";
import {Col} from "react-bootstrap";

export function Dice(props) {
	return <Col xs={2}>
		<div className={"dice"}>{props.value}</div>
	</Col>
}