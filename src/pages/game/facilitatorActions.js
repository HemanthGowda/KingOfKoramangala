import React from 'react';
import {Button} from "react-bootstrap";
import {every, values} from "lodash";

export default function FacilitatorActions(props) {
	const {onStart, onReady, game, player: me} = props;

	const isEveryoneReady = function () {
		return every(values(game.players), {"state": "ready"})
	}

	return (
		<>
			{isEveryoneReady() ?
				<Button variant={"primary"} className={"start-button"} onClick={onStart}>Start Game</Button> :
				<p>Wait for everyone to be ready.</p>}
			{me.state === "waiting" ?
				<Button variant={"success"} className={"ready-button"} onClick={onReady}>Ready!</Button> : null}
		</>
	)
}