import React from 'react';
import "./waitingRoom.css"
import {Col, Container, ListGroup, Row} from "react-bootstrap";
import {cloneDeep, each, keys, shuffle, times, values} from "lodash"
import {updatePlayer} from "../../firebase/player";
import {selectPlayerId} from "../../reducers/player";
import {useSelector} from "react-redux";
import {updateRoom} from "../../firebase/game";
import FacilitatorActions from "./facilitatorActions";
import PlayerActions from "./playerActions";

export default function WaitingRoom(props) {
	const {game, player: me} = props;
	const playerId = useSelector(selectPlayerId)
	const onReady = async function () {
		await updatePlayer(game.name, playerId, {...me, state: "ready"})
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

	return game && me ? <Container>
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
				{me.facilitator ? <FacilitatorActions player={me} game={game} onStart={startGame} onReady={onReady}/> :
					<PlayerActions player={me} onReady={onReady}/>}
			</Col>
		</Row>
	</Container> : null
}