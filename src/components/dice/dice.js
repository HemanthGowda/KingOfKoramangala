import "./dice.css";
import {Col} from "react-bootstrap";
import {BsFillHeartFill, BsFillLightningFill, GiMonsterGrasp} from "react-icons/all";

export function Dice(props) {
	const {die, onSelect} = props

	if (die.value <= 0) {
		return null
	}

	return <Col xs={2}>
		{
			die.value <= 3 ?
				<div className={`dice ${die.selected ? 'selected' : ''}`} onClick={onSelect}>
					{die.value}
				</div>
				: null
		}
		{
			die.value === 4 ?
				<div className={`dice ${die.selected ? 'selected' : ''}`} onClick={onSelect}>
					<BsFillLightningFill/>
				</div>
				: null
		}
		{
			die.value === 5 ?
				<div className={`dice ${die.selected ? 'selected' : ''}`} onClick={onSelect}>
					<BsFillHeartFill/>
				</div>
				: null
		}
		{
			die.value === 6 ?
				<div className={`dice ${die.selected ? 'selected' : ''}`} onClick={onSelect}>
					<GiMonsterGrasp/>
				</div>
				: null
		}

	</Col>
}