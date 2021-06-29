import database from "./db"

export const createRoom = async (roomName) => {
	return database.ref('rooms/' + roomName).set({
		name: roomName,
		started: false,
		players: [],
		currentPlay: {
			dice: {
				0: {selected: false, value: -1, diceNumber: 1},
				1: {selected: false, value: -1, diceNumber: 2},
				2: {selected: false, value: -1, diceNumber: 3},
				3: {selected: false, value: -1, diceNumber: 4},
				4: {selected: false, value: -1, diceNumber: 5},
				5: {selected: false, value: -1, diceNumber: 6},
			},
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
