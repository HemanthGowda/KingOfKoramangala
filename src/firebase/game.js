import database from "./db"

export const createRoom = async (roomName) => {
	return database.ref('rooms/' + roomName).set({
		name: roomName,
		started: false,
		players: []
	});
}

export const getRoom = async (roomName) => {
	return database.ref('rooms/' + roomName).get()
}

export const updateRoom = async (roomName, payload) => {
	return database.ref('rooms/' + roomName).set(payload)
}
