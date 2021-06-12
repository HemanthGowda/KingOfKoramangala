import database from "./db"
import {v4 as uuid} from 'uuid';

export const createGame = async (roomName) => {
	let gameId = uuid();
	await database.ref('games/' + gameId).set({
		name: roomName,
		players: []
	});

	return gameId
}