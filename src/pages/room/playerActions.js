import React from 'react';
import {Button} from "react-bootstrap";

export default function PlayerActions(props) {
	const {onReady, player: me} = props;

	return (
		<>
			{me.state === "waiting" ?
				<Button variant={"success"} className={"ready-button"} onClick={onReady}>Ready!</Button> :
				<p>Wait for facilitator to start the game</p>}
		</>
	)
}