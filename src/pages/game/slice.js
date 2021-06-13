import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {getRoom} from "../../firebase/game";

export const fetchGameRoom = createAsyncThunk(
	'rooms/fetchByName',
	async (roomName) => {
		let game = await getRoom(roomName);
		return game.val()
	}
)

const slice = createSlice({
	name: 'game',
	initialState: {
		game: {
			started: false,
			name: undefined,
			players: []
		}
	},
	reducers: {
		updateGame: (state, action) => {
			state.game = action.payload
		}
	},
	extraReducers: {
		[fetchGameRoom.fulfilled]: (state, action) => {
			state.game = action.payload
		}
	}
})
export const { updateGame } = slice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectGame = state => state.game.game;


export default slice.reducer