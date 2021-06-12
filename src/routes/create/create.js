import {Button, Col, Container, FormControl, Row} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {createGame} from "../../store/game";
import {createPlayer} from "../../store/player";


export function Create() {
	const history = useHistory();
	let userName, roomName;


	async function CreateGame() {
		await createGame(roomName);
		await createPlayer(roomName, userName)

		history.push("/game/" + roomName);
	}

	return <Container fluid>
		<Row className="justify-content-md-center">
			<Col sm={5}>
				<Row>
					<FormControl
						placeholder="User Name"
						aria-label="User Name"
						onChange={event => {
							userName = event.target.value
						}}
					/>
				</Row>
				<Row>
					<FormControl
						placeholder="Room name"
						aria-label="Room name"
						onChange={event => {
							roomName = event.target.value
						}}
					/>
				</Row>
				<Row>
					<Button margin="auto" variant="outline-primary" onClick={CreateGame}>Create</Button>
				</Row>
			</Col>
		</Row>
	</Container>;
}
