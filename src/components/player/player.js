import {Card} from "react-bootstrap";
import {AiFillHeart, AiFillStar} from "react-icons/all";
import "./player.css"

export function Player(props) {
	const {player} = props
	return !player ? null :
		<Card style={{width: "100%"}}>
			<Card.Header>
				{player.points} <AiFillStar className={"star-icon"}/>
				{player.currentHealth} <AiFillHeart className={"health-icon"}/>
			</Card.Header>
			<Card.Body>
				<Card.Title>
					{player.name}
				</Card.Title>
			</Card.Body>
		</Card>
}