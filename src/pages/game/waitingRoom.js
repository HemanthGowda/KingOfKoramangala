import {Button, Col, Container, ListGroup, Row} from "react-bootstrap";
import "./waitingRoom.css"
import React from 'react';
import {values} from "lodash"

export default function WaitingRoom(props) {
	const {game} = props;

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