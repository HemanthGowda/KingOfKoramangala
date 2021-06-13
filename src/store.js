import {configureStore} from '@reduxjs/toolkit'
import gameReducer from "./pages/game/slice";

export default configureStore({
	reducer: {
		game: gameReducer,
	},
})