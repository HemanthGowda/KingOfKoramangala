import {Button, Col, Container, ListGroup, Row} from "react-bootstrap";
import "./waitingRoom.css"
import React from 'react';
import {cloneDeep, each, keys, shuffle, times, values} from "lodash"
import {updatePlayer} from "../../firebase/player";
import {selectPlayerId} from "../../reducers/player";
import {useSelector} from "react-redux";
import {updateRoom} from "../../firebase/game";

export default function WaitingRoom(props) {
	const {game, player} = props;
	const playerId = useSelector(selectPlayerId)
	const onReady = async function () {
		await updatePlayer(game.name, playerId, {...player, state: "ready"})
	}

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

	return game && player ? <Container>
		<Row>
			<Col md={{span: 4, offset: 4}}>
				Joined Players:
				<br/>
				<br/>
				<ListGroup>
					{
						values(game.players).map(p =>
							<ListGroup.Item key={p.name}
							                variant={p.state === "ready" ? "success" : "danger"}>
								{p.name}
							</ListGroup.Item>
						)
					}
				</ListGroup>
				<br/>
				{player.facilitator ? <Button variant={"primary"} className={"start-button"} onClick={startGame}>Start
					Game</Button> : null}
				{player.state === "waiting" ?
					<Button variant={"success"} className={"ready-button"} onClick={onReady}>Ready!</Button> : null}
			</Col>
		</Row>
	</Container> : null
}