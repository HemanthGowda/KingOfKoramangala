import {Alert, Button, Col, Container, FormControl, Row} from "react-bootstrap";
import {createPlayer} from "../../datastore/player";
import {Component} from "react";
import {withRouter} from 'react-router-dom'

class Join extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {error: undefined, roomName: "", playerName: ""}

		this.JoinGame = this.JoinGame.bind(this)
		this.onPlayerNameChanged = this.onPlayerNameChanged.bind(this)
		this.onRoomNameChanged = this.onRoomNameChanged.bind(this)
	}

	async JoinGame() {
		const error = await createPlayer(this.state.roomName, this.state.playerName);
		if (error) {
			this.setState({error: error.error})
		} else {
			this.props.history.push("/game/" + this.state.roomName)
		}
	}

	onPlayerNameChanged(e) {
		this.setState({playerName: e.target.value, error: undefined})
	}

	onRoomNameChanged(e) {
		this.setState({roomName: e.target.value, error: undefined})
	}

	render() {
		let {error} = this.state;

		return <Container fluid>
			<Row className="justify-content-md-center">
				<Col sm={5}>
					{error ? <Alert variant="danger" onClose={() => this.setState({error: undefined})} dismissible>
						<Alert.Heading>{error}</Alert.Heading>
					</Alert> : null}

					<Row>
						<FormControl
							placeholder="Player Name"
							aria-label="Player Name"
							onChange={this.onPlayerNameChanged}
						/>
					</Row>
					<Row>
						<FormControl
							placeholder="Room Name"
							aria-label="Room Name"
							onChange={this.onRoomNameChanged}
						/>
					</Row>
					<Row>
						<Button margin="auto" variant="outline-primary" onClick={this.JoinGame}>Join</Button>
					</Row>
				</Col>
			</Row>
		</Container>;
	}
}

export default withRouter(Join)