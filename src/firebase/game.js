import database from "./db"

export const createRoom = async (roomName) => {
	return database.ref('rooms/' + roomName).set({
		name: roomName,
		started: false,
		players: [],
		currentPlay: {
			dice: [
				{selected: true, value: -1, diceNumber: 1},
				{selected: true, value: -1, diceNumber: 2},
				{selected: true, value: -1, diceNumber: 3},
				{selected: true, value: -1, diceNumber: 4},
				{selected: true, value: -1, diceNumber: 5},
				{selected: true, value: -1, diceNumber: 6},
			],
			numberOfTimesRolled: 0
		}
	});
}

export const getRoom = async (roomName) => {
	return database.ref('rooms/' + roomName).get()
}

export const updateRoom = async (roomName, payload) => {
	return database.ref('rooms/' + roomName).set(payload)
}
