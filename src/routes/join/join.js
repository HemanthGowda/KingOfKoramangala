import {Button, Col, Container, FormControl, InputGroup, Row} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {createGame} from "../../store/game";
import {createPlayer} from "../../store/player";

export function Join() {
	const history = useHistory();
	let roomName, userName;

	async function JoinGame() {
		var error = await createPlayer(roomName, userName)
		if (error) {
			console.log(error);
			console.log("Todo : Complain about non existent rooms");
		} else {
			history.push("/game/" + roomName);
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
						<FormControl
							placeholder="Room Name"
							aria-label="Room Name"
							onChange={event => {
								roomName = event.target.value
							}}
						/>
					</Row>
				<Row>
					<Button margin="auto" variant="outline-primary" onClick={JoinGame}>Join</Button>
				</Row>
			</Col>
		</Row>
	</Container>;
}
