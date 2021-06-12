import {Button, Col, Container, FormControl, InputGroup, Row} from "react-bootstrap";
import {useHistory} from "react-router-dom";


export function Create() {
	const history = useHistory();
	let userHandle, gameCode;

	function CreateGame() {
		history.push("/game/" + gameCode);
	}

	return <Container fluid>
		<Row className="justify-content-md-center">
			<Col sm={5}>
				<Row>
					<FormControl
						placeholder="User Handle"
						aria-label="User Handle"
						onChange={event => {
							userHandle = event.target.value
						}}
					/>
				</Row>
				<Row>
					<FormControl
						placeholder="Game Code"
						aria-label="Game Code"
						onChange={event => {
							gameCode = event.target.value
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
