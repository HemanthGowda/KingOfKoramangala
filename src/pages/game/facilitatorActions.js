import React from 'react';
import {Button} from "react-bootstrap";
import {cloneDeep, each, every, keys, shuffle, times, values} from "lodash";
import {updateRoom} from "../../firebase/game";

export default function FacilitatorActions(props) {
	const {onReady, game, player: me} = props;


	const startGame = async function () {
		const clonedGame = cloneDeep(game)

		let tablePositions = shuffle(times(keys(clonedGame.players).length, Number));
		let index = 0;
		each(clonedGame.players, (player) => {
			player.tablePosition = tablePositions[index]
			index += 1
		});

		await updateRoom(clonedGame.name, {...clonedGame, started: true})
	}

	const isEveryoneReady = function () {
		return every(values(game.players), {"state": "ready"})
	}

	return (
		<>
			{isEveryoneReady() ?
				<Button variant={"primary"} className={"start-button"} onClick={startGame}>Start Game</Button> :
				<p>Wait for everyone to be ready.</p>}
			{me.state === "waiting" ?
				<Button variant={"success"} className={"ready-button"} onClick={onReady}>Ready!</Button> : null}
		</>
	)
}