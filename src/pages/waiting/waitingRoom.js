import {Button, Col, Container, ListGroup, Row} from "react-bootstrap";
import {withRouter} from "react-router-dom";
import "./waitingRoom.css"
import {useDispatch, useSelector} from "react-redux";
import {fetchGameRoom, selectGame, updateGame} from "../game/slice";
import React, {useEffect} from 'react';
import {values} from "lodash"
import db from "../../firebase/db";

function WaitingRoom(props) {
	const dispatch = useDispatch()

	const onRoomUpdate = (snapshot) => {
		if (snapshot.exists()) {
			dispatch(updateGame(snapshot.val()))
		}
	};

	useEffect(() => {
		dispatch(fetchGameRoom(props.match.params.id))

		db.ref(`/rooms/${props.match.params.id}`).on('value', onRoomUpdate)
		return () => {
			db.ref(`/rooms/${props.match.params.id}`).off('value', onRoomUpdate)
		}
	}, [])

	const game = useSelector(selectGame);
	return game ? <Container>
		<Row>
			<Col md={{span: 4, offset: 4}}>
				Joined Players:
				<br/>
				<br/>
				<ListGroup>
					{values(game.players).map(p => <ListGroup.Item key={p.name}>{p.name}</ListGroup.Item>)}
				</ListGroup>
				<br/>
				<Button variant={"success"} className={"start-button"}>Start Game</Button>
			</Col>
		</Row>
	</Container> : null
}

export default withRouter(WaitingRoom)