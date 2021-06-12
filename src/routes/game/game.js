import {Col, Container, Row} from "react-bootstrap";
import "./game.css"
import {Player} from "../../components/player/player";

export function Game() {
	return <Container>
		<Row>
			<Col xs={2} className={"player-layout"}>
				<Row className={"vertical-player"}/>
				<Row className={"vertical-player"}/>
			</Col>
			<Col xs={8} className={"board-layout"}>
				<Row className={"horizontal-player"}>
				<Player/>
				</Row>
				<Row className={"board"}/>
				<Row className={"horizontal-player"}/>
			</Col>
			<Col xs={2} className={"player-layout"}>
				<Row className={"vertical-player"}/>
				<Row className={"vertical-player"}/>
			</Col>
		</Row>
	</Container>
}