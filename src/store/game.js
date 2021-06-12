import database from "./db"

export const createGame = async (roomName) => {
	return database.ref('games/' + roomName).set({
		name: roomName,
		players: []
	});
}