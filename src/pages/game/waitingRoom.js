import {Button, Col, Container, ListGroup, Row} from "react-bootstrap";
import "./waitingRoom.css"
import React from 'react';
import {values} from "lodash"

export default function WaitingRoom(props) {
	const {game, player} = props;

	return game && player ? <Container>
		<Row>
			<Col md={{span: 4, offset: 4}}>
				Joined Players:
				<br/>
				<br/>
				<ListGroup>
					{values(game.players).map(p => <ListGroup.Item key={p.name}>{p.name}</ListGroup.Item>)}
				</ListGroup>
				<br/>
				{player.facilitator ? <Button variant={"primary"} className={"start-button"}>Start Game</Button> : null}
				{player.state === "waiting" ? <Button variant={"success"} className={"ready-button"}>Ready!</Button> : null}
			</Col>
		</Row>
	</Container> : null
}