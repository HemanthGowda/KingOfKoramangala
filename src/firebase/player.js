import database from "./db"
import {v4 as uuid} from 'uuid';

export const createPlayer = async (roomName, userName, facilitator) => {
	return await database.ref('rooms/' + roomName).once('value').then((snapshot) => {
		if (snapshot.exists()) {
			return database.ref('rooms/' + roomName + "/players/" + uuid()).set({
				name: userName,
				currentHealth: 10,
				currentScore: 0,
				state: "waiting",
				takingTurn: false,
				facilitator: facilitator || false
			})
		} else {
			return {
				'error': 'Room Name not found'
			}
		}
	});
}
