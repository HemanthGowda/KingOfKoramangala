import React, {useEffect} from "react";

import {Col, Container, Row} from "react-bootstrap";
import "./game.css"
import {Player} from "../../components/player/player";
import Board from "../../components/board/board";
import {withRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchGameRoom, selectGame, updateGame} from "../../reducers/game";
import db from "../../firebase/db";
import WaitingRoom from "./waitingRoom";
import {selectPlayer, updatePlayerId} from "../../reducers/player";
import {values} from "lodash"

function Game(props) {
	const dispatch = useDispatch()

	const onGameUpdate = (snapshot) => {
		if (snapshot.exists()) {
			dispatch(updateGame(snapshot.val()))
		}
	};

	useEffect(() => {
		dispatch(updatePlayerId(sessionStorage.getItem("playerId")))
		dispatch(fetchGameRoom(props.match.params.id))

		db.ref(`/rooms/${props.match.params.id}`).on('value', onGameUpdate)
		return () => {
			db.ref(`/rooms/${props.match.params.id}`).off('value', onGameUpdate)
		}
	}, [])

	const game = useSelector(selectGame);
	const player = useSelector(selectPlayer);

	if (!game) {
		return null
	}

	const players = values(game.players)

	return game.started ? <Container>
		<Row>
			<Col xs={2} className={"player-layout"}>
				<Row className={"vertical-player"}>
					<Player player={players[0]}/>
				</Row>
				<Row className={"vertical-player"}>
					<Player player={players[1]}/>
				</Row>
			</Col>
			<Col xs={8} className={"board-layout"}>
				<Row className={"horizontal-player"}>
					<Player player={players[2]}/>
				</Row>
				<Row className={"board"}>
					<Board/>
				</Row>
				<Row className={"horizontal-player"}>
					<Player player={players[3]}/>
				</Row>
			</Col>
			<Col xs={2} className={"player-layout"}>
				<Row className={"vertical-player"}>
					<Player player={players[4]}/>
				</Row>
				<Row className={"vertical-player"}>
					<Player player={players[5]}/>
				</Row>
			</Col>
		</Row>
	</Container> : <WaitingRoom game={game} player={player}/>
}

export default withRouter(Game)