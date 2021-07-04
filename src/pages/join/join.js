import {Alert, Button, Col, Container, Form, Row} from "react-bootstrap";
import {createPlayer} from "../../firebase/player";
import {withRouter} from 'react-router-dom'
import {useState} from "react";
import {v4 as uuid} from 'uuid';
import {useDispatch} from "react-redux";
import {updatePlayerId} from "../../reducers/player";
import {getRoom} from "../../firebase/game";
import {fetchGameRoom, updateGame} from "../../reducers/game";
import {keys} from "lodash";

function Join(props) {
	const dispatch = useDispatch()
	const [error, setError] = useState(undefined);
	const [loading, setLoading] = useState(false);
	const [playerName, setPlayerName] = useState("");
	const [roomName, setRoomName] = useState(props.match.params.roomName);
	const [validated, setValidated] = useState(false);

	const joinGame = async (e) => {
		e.preventDefault();
		e.stopPropagation();

		setLoading(true)
		setValidated(true);
		if (!e.currentTarget.checkValidity()) {
			setLoading(false)
		} else {
			let game = await getRoom(roomName);
			if (!game) {
				setError("Room not found")
				return
			}
			game = game.val()

			if (game.started) {
				setError("Game already started")
				return
			}
			if (keys(game.players).length > 5) {
				setError("Room is full")
				return
			}

			let id = uuid()
			await createPlayer(id, roomName, playerName);
			dispatch(fetchGameRoom(props.match.params.roomName))
			dispatch(updatePlayerId(id))

			setTimeout(() => {
				setLoading(false)
				props.history.push("/room/" + roomName)
			}, 200)
		}
	}

	return <Container fluid>
		<Row className="justify-content-md-center">
			<Col sm={2}>
				{error ? <Alert variant="danger" onClose={() => setError(undefined)} dismissible>
					<Alert.Heading>{error}</Alert.Heading>
				</Alert> : null}
				<Form className={"w-100"} onSubmit={joinGame} noValidate validated={validated}>
					<Form.Group>
						<Form.Label>Player Name</Form.Label>
						<Form.Control type="text" placeholder="Thor" required onChange={e => {
							setError(undefined)
							setPlayerName(e.target.value)
						}}/>
						<Form.Control.Feedback type="invalid">
							Please enter valid player name.
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group>
						<Form.Label>Room Name</Form.Label>
						<Form.Control type="text" value={roomName} required onChange={e => {
							setError(undefined)
							setRoomName(e.target.value)
						}}/>
						<Form.Control.Feedback type="invalid">
							Please enter valid room name.
						</Form.Control.Feedback>
					</Form.Group>
					<Button type={"submit"} margin="auto" variant="outline-primary" className={"float-right"}>
						{loading ? 'Joining…' : 'Join Room'}
					</Button>
				</Form>
			</Col>
		</Row>
	</Container>;
}

export default withRouter(Join)