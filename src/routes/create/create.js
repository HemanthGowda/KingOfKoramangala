import {Button, Col, Container, FormControl, Row} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {createGame} from "../../store/game";
import {createPlayer} from "../../store/player";
var randomstring = require("randomstring");

export function Create() {
	const history = useHistory();
	let userName;

	async function CreateGame() {
		if (userName.length > 0) {
			const roomName = randomstring.generate(5);
			await createGame(roomName);
			await createPlayer(roomName, userName);

			history.push("/game/" + roomName);
		} else {
			console.log("#Todo : Complain about how the user needs a name")
		}
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
					<Button margin="auto" variant="outline-primary" onClick={CreateGame}>Create</Button>
				</Row>
			</Col>
		</Row>
	</Container>;
}
