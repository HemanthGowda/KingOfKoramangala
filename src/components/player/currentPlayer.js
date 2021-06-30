import React from "react";
import {Card} from "react-bootstrap";
import "./player.css"
import {AiFillHeart, AiFillStar} from "react-icons/all";
import {CurrentPlayerActions} from "./currentPlayerActions";

export function CurrentPlayer(props) {
	const {player, game} = props

	return !player ? null :
		<Card style={{width: "100%"}}>
			<Card.Header>
				{player.points} <AiFillStar className={"star-icon"}/>
				{player.currentHealth} <AiFillHeart className={"health-icon"}/>
				{
					game.currentPlayerPosition === player.tablePosition ?
						<CurrentPlayerActions game={game} player={player}/> :
						null
				}
			</Card.Header>
			<Card.Body>
				<Card.Title>
					{player.name}
				</Card.Title>
			</Card.Body>
		</Card>
}