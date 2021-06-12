import database from "./db"
import { v4 as uuid } from 'uuid';

export const createPlayer = async (gameId, userName) => {
	return database.ref('games/' + gameId + "/players/" + uuid()).set({
		name: userName,
		currentHealth: 10,
		currentScore: 0,
		state: "waiting",
		takingTurn: false
	});
}