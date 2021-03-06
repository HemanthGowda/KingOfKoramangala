import {Alert, Button, Col, Container, FormControl, Row} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {createRoom} from "../../firebase/game";
import {createPlayer} from "../../firebase/player";
import {useState} from "react";
import {v4 as uuid} from 'uuid';
import {updatePlayerId} from "../../reducers/player";
import {useDispatch} from "react-redux";

var randomstring = require("randomstring");

export function Create() {
	const dispatch = useDispatch()
	const history = useHistory();
	const [playerName, setPlayerName] = useState("");
	const [error, setError] = useState(undefined);
	const [loading, setLoading] = useState(false);

	const onCreate = async () => {
		setLoading(true)
		if (playerName.length > 0) {
			const roomName = randomstring.generate(5);
			await createRoom(roomName);
			let id = uuid()
			await createPlayer(id, roomName, playerName, true);
			dispatch(updatePlayerId(id))
			history.push("/room/" + roomName);
		} else {
			setError("Player name is required")
		}
		setLoading(false)
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
						onChange={event => {
							setError(undefined)
							setPlayerName(event.target.value)
						}}
					/>
				</Row>
				<Row>
					<Button margin="auto" variant="outline-primary"
					        onClick={onCreate}>{loading ? 'Creating…' : 'Create Room'}</Button>
				</Row>
			</Col>
		</Row>
	</Container>;
}
