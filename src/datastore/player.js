import database from "./db"
import { v4 as uuid } from 'uuid';

export const createPlayer = async (gameId, userName) => {
	return await database.ref('games/' + gameId).once('value').then((snapshot) => {
		if (snapshot.exists()) {
			return database.ref('games/' + gameId + "/users/" + uuid()).set({
				name: userName,
				currentHealth: 10,
				currentScore: 0,
				state: "waiting",
				takingTurn: false
			})
		} else {
			return {
				'error': 'Room Name not found'
			}
		}
	});
}