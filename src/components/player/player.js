import {Col, Container, Row} from "react-bootstrap";
import {AiFillHeart, AiFillStar} from "react-icons/all";
import "./player.css"

export function Player(props) {
	const {player} = props
	return !player ? null : <Container>
		<Row>
			<Col xs={12}>
				<span>
					{player.currentScore} <AiFillStar className={"star-icon"}/>
				</span>
				<span>
					{player.currentHealth} <AiFillHeart className={"health-icon"}/>
				</span>
			</Col>
		</Row>
		<Row>
			<Col xs={12}>
				{player.name}
				Character name and photo goes here
			</Col>
		</Row>
	</Container>
}