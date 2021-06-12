import {Col, Container, Nav, Row} from "react-bootstrap";

export function Home() {
	return <Container fluid>
		<Row className="justify-content-md-center">
			<Nav.Link href="/create">Create Game</Nav.Link>
			<Col md="auto"/>
			<Nav.Link href="/join">Join Game</Nav.Link>
		</Row>
	</Container>
}