import {Component} from "react";
import {Button, Col, Container, ListGroup, Row} from "react-bootstrap";
import {getGame} from "../../datastore/game";
import {withRouter} from "react-router-dom";
import rd from "../../datastore/db"
import {values} from "lodash"
import "./waitingRoom.css"

class WaitingRoom extends Component {
	constructor(props) {
		super(props);
		this.state = {
			game: undefined
		}
		this.onGameChanged = this.onGameChanged.bind(this)
	}

	onGameChanged(snapshot) {
		this.setState({game: snapshot.val()})
	}

	async componentDidMount() {
		let roomName = this.props.match.params.id;
		let gameRef = rd.ref("/games/" + roomName);
		gameRef.on('value', this.onGameChanged)

		let d = await getGame(roomName);
		this.setState({game: d.toJSON()})
	}

	render() {
		if (!this.state.game) {
			return null
		}

		const {players} = this.state.game
		return <Container>
			<Row>
				<Col md={{ span: 4, offset: 4 }}>
					Joined Players:
					<br/>
					<br/>
					<ListGroup>
						{values(players).map(p => <ListGroup.Item key={p.name}>{p.name}</ListGroup.Item>)}
					</ListGroup>
					<br/>
					<Button variant={"success"} className={"start-button"}>Start Game</Button>
				</Col>
			</Row>
		</Container>
	}
}

export default withRouter(WaitingRoom)