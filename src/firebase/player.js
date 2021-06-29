import database from "./db"

export const createPlayer = async (id, roomName, userName, facilitator) => {
	return await database.ref('rooms/' + roomName).once('value').then((snapshot) => {
		if (snapshot.exists()) {
			return database.ref('rooms/' + roomName + "/players/" + id).set({
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

export const updatePlayer = async (roomName, id, payload) => {
	return database.ref('rooms/' + roomName + "/players/" + id).set(payload)
}
