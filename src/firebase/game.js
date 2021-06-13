import database from "./db"

export const createGame = async (roomName) => {
	return database.ref('games/' + roomName).set({
		name: roomName,
		started: false,
		players: []
	});
}

export const getGame = async (roomName) => {
	return database.ref('games/' + roomName).get()
}