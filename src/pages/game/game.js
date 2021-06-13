import React from "react";

import {Col, Container, Row} from "react-bootstrap";
import "./game.css"
import {Player} from "../../components/player/player";
import {getGame} from "../../firebase/game";
import {values} from "lodash";
import Board from "../../components/board/board";
import {withRouter} from "react-router-dom";

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			players: []
		}
	}

	async componentDidMount() {
		let roomName = this.props.match.params.id;
		let game = await getGame(roomName);
		if (!game.started) {
			this.props.history.push("/game/" + roomName + "/waitingRoom")
			return
		}
		this.setState({players: values(game.toJSON().players)})
	}

	componentDidUpdate() {
	}

	render() {
		const {players} = this.state;
		return <Container>
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
		</Container>
	}
}

export default withRouter(Game)