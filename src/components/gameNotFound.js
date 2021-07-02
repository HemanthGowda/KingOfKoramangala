import React from "react";
import {Button, Col, Row} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {GiLongAntennaeBug} from "react-icons/all";

export default function GameNotFound(props) {
	const history = useHistory();

	const onCreate = () => {
		history.push("/create")
	}

	return <Row className="text-center">
		<Col md={{span: 12}}>
			<h1><GiLongAntennaeBug/></h1>
			<h1>404</h1>
			<h4>Sorry, we couldn't find the room...</h4>
			<Button onClick={onCreate}>Create New</Button>
		</Col>
	</Row>
}