import {Alert, Button, Col, Container, FormControl, Row} from "react-bootstrap";
import {createPlayer} from "../../firebase/player";
import {withRouter} from 'react-router-dom'
import {useState} from "react";
import {v4 as uuid} from 'uuid';
import {useDispatch} from "react-redux";
import {updatePlayerId} from "../../reducers/player";

function Join(props) {
	const dispatch = useDispatch()
	const [error, setError] = useState(undefined);
	const [loading, setLoading] = useState(false);
	const [playerName, setPlayerName] = useState("");
	const [roomName, setRoomName] = useState(props.match.params.roomName);

	const joinGame = async () => {
		setLoading(true)
		let id = uuid()
		const response = await createPlayer(id, roomName, playerName);
		dispatch(updatePlayerId(id))

		setLoading(false)
		if (response) {
			setError(response.error)
		} else {
			props.history.push("/game/" + roomName)
		}
	}

	return <Container fluid>
		<Row className="justify-content-md-center">
			<Col sm={5}>
				{error ? <Alert variant="danger" onClose={() => setError(undefined)} dismissible>
					<Alert.Heading>{error}</Alert.Heading>
				</Alert> : null}

				<Row>
					<FormControl
						placeholder="Player Name"
						aria-label="Player Name"
						onChange={e => {
							setError(undefined)
							setPlayerName(e.target.value)
						}}
						value={playerName}
					/>
				</Row>
				<Row>
					<FormControl
						placeholder="Game Name"
						aria-label="Game Name"
						onChange={(e) => {
							setError(undefined)
							setRoomName(e.target.value);
						}}
						value={roomName}
					/>
				</Row>
				<Row>
					<Button margin="auto" variant="outline-primary" onClick={joinGame}>
						{loading ? 'Joining…' : 'Join Game'}
					</Button>
				</Row>
			</Col>
		</Row>
	</Container>;
}

export default withRouter(Join)