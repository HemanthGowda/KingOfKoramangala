import {Button, Col, Container, FormControl, InputGroup, Row} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {createPlayer} from "../../store/player";


export function Join() {
	const history = useHistory();
	let gameName, playerName;

	async function JoinGame() {
		await createPlayer(gameName, playerName)
		history.push("/game/" + gameName);
	}

	return <Container fluid>
		<Row className="justify-content-md-center">
			<Col sm={5}/>
			<Col>
				<InputGroup className="mb-3">
					<FormControl
						placeholder="Game Name"
						aria-label="Game Name"
						onChange={event => {
							gameName = event.target.value
						}}
					/>
					<InputGroup.Append>
						<Button variant="outline-primary" onClick={JoinGame}>Join</Button>
					</InputGroup.Append>
				</InputGroup>
			</Col>
			<Col>
				<InputGroup className="mb-3">
					<FormControl
						placeholder="Player Name"
						aria-label="Player Name"
						onChange={event => {
							playerName = event.target.value
						}}
					/>
					<InputGroup.Append>
						<Button variant="outline-primary" onClick={JoinGame}>Join</Button>
					</InputGroup.Append>
				</InputGroup>
			</Col>
			<Col sm={5}/>
		</Row>
	</Container>;
}