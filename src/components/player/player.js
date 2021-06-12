import {Col, Container, Row} from "react-bootstrap";
import {AiFillHeart, AiFillStar} from "react-icons/all";
import "./player.css"

export function Player(props) {
	return !props.player ? null : <Container>
		<Row>
			<Col xs={12}>
				<span>
					{props.player.currentScore} <AiFillStar className={"star-icon"}/>
				</span>
				<span>
					{props.player.currentHealth} <AiFillHeart className={"health-icon"}/>
				</span>
			</Col>
		</Row>
		<Row>
			<Col xs={12}>
				Character name and photo goes here
			</Col>
		</Row>
	</Container>
}