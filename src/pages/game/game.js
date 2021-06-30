import React, {useEffect} from "react";

import {Button, Col, Container, Modal, Row} from "react-bootstrap";
import "./game.css"
import {Player} from "../../components/player/player";
import Board from "../../components/board/board";
import {withRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchGameRoom, selectGame, updateGame} from "../../reducers/game";
import db from "../../firebase/db";
import WaitingRoom from "./waitingRoom";
import {selectPlayer, updatePlayerId} from "../../reducers/player";
import {sortBy, values} from "lodash"
import {CurrentPlayer} from "../../components/player/currentPlayer";
import GameService from "../../services/gameService";
import {updateRoom} from "../../firebase/game";

function Game(props) {
	const dispatch = useDispatch()
	const game = useSelector(selectGame);
	const me = useSelector(selectPlayer);
	const gameService = new GameService(game);

	const onGameUpdate = (snapshot) => {
		if (snapshot.exists()) {
			dispatch(updateGame(snapshot.val()))
		}
	};

	const onRestart = async () => {
		let updatedGame = gameService.restart()

		await updateRoom(game.name, updatedGame)
	}

	useEffect(() => {
		dispatch(updatePlayerId(sessionStorage.getItem("playerId")))
		dispatch(fetchGameRoom(props.match.params.id))

		db.ref(`/rooms/${props.match.params.id}`).on('value', onGameUpdate)
		return () => {
			db.ref(`/rooms/${props.match.params.id}`).off('value', onGameUpdate)
		}
	}, [])


	if (!game) {
		return null
	}

	const players = sortBy(values(game.players), "tablePosition")

	return game.started ? <Container>
		<Row>
			<Col xs={2} className={"player-layout"}>
				<Row className={"vertical-player"}>
					<Player player={players[(me.tablePosition + 2) % 6]}/>
				</Row>
				<Row className={"vertical-player"}>
					<Player player={players[(me.tablePosition + 1) % 6]}/>
				</Row>
			</Col>
			<Col xs={8} className={"board-layout"}>
				<Row className={"horizontal-player"}>
					<Player player={players[(me.tablePosition + 3) % 6]}/>
				</Row>
				<Row className={"board"}>
					<Board game={game}/>
				</Row>
				<Row className={"horizontal-player"}>
					<CurrentPlayer player={players[me.tablePosition]} game={game}/>
				</Row>
			</Col>
			<Col xs={2} className={"player-layout"}>
				<Row className={"vertical-player"}>
					<Player player={players[(me.tablePosition + 4) % 6]}/>
				</Row>
				<Row className={"vertical-player"}>
					<Player player={players[(me.tablePosition + 5) % 6]}/>
				</Row>
			</Col>
		</Row>

		<Modal show={game.finished}>
			<Modal.Header>
				<Modal.Title>Game Over!</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<p>{gameService.getWinnerName()} is the King of Koramangala</p>
			</Modal.Body>

			<Modal.Footer>
				{me.facilitator ? <Button variant="primary" onClick={onRestart}>Restart</Button> : null}
			</Modal.Footer>
		</Modal>
	</Container> : <WaitingRoom game={game} player={me}/>
}

export default withRouter(Game)