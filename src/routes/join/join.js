import {Button, Col, Container, FormControl, InputGroup, Row} from "react-bootstrap";
import {useHistory} from "react-router-dom";


export function Join() {
	const history = useHistory();
	let value;

	function JoinGame() {
		history.push("/game/" + value);
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
							value = event.target.value
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