import {Alert, Button, Col, Container, FormControl, Row} from "react-bootstrap";
import {createPlayer} from "../../firebase/player";
import {withRouter} from 'react-router-dom'
import {useState} from "react";

function Join(props) {
	const [error, setError] = useState(undefined);
	const [loading, setLoading] = useState(false);
	const [playerName, setPlayerName] = useState("");
	const [roomName, setRoomName] = useState("");

	const joinGame = async () => {
		setLoading(true)
		const error = await createPlayer(roomName, playerName);
		setLoading(false)
		if (error) {
			setError(error.error)
		} else {
			props.history.push("/game/" + roomName + "/waitingRoom")
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
					/>
				</Row>
				<Row>
					<FormControl
						placeholder="Room Name"
						aria-label="Room Name"
						onChange={(e) => {
							setError(undefined)
							setRoomName(e.target.value);
						}}
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