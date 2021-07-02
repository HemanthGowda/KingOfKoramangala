import database from "./db"
import {keys} from "lodash";

export const createPlayer = async (id, roomName, userName, facilitator) => {
	return await database.ref('rooms/' + roomName).once('value').then((snapshot) => {
		if (snapshot.exists()) {
			let val = snapshot.val();
			console.log(val)
			if (val.started) {
				return {
					error: "Game already started"
				}
			}
			if (val.players && keys(val.players).length >= 6) {
				return {
					error: "Room is full"
				}
			}

			database.ref('rooms/' + roomName + "/players/" + id).set({
				name: userName,
				currentHealth: 10,
				points: 0,
				state: "waiting",
				facilitator: facilitator || false
			})
		} else {
			return {
				'error': "Room not found"
			}
		}
	});
}

export const updatePlayer = async (roomName, id, payload) => {
	return database.ref('rooms/' + roomName + "/players/" + id).set(payload)
}
