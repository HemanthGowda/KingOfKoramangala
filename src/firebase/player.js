import database from "./db"

export const createPlayer = async (id, roomName, userName, facilitator) => {
	return await database.ref('rooms/' + roomName + "/players/" + id).set({
		name: userName,
		currentHealth: 10,
		points: 0,
		state: "waiting",
		facilitator: facilitator || false
	});
}

export const updatePlayer = async (roomName, id, payload) => {
	return database.ref('rooms/' + roomName + "/players/" + id).set(payload)
}
