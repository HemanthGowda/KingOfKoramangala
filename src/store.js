import {configureStore} from '@reduxjs/toolkit'
import gameReducer from "./reducers/game";
import playerReducer from "./reducers/player";

export default configureStore({
	reducer: {
		game: gameReducer,
		player: playerReducer
	},
})