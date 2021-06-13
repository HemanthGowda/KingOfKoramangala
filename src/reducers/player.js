import {createSlice} from '@reduxjs/toolkit'

const slice = createSlice({
	name: 'player',
	initialState: {
		id: undefined
	},
	reducers: {
		updatePlayerId: (state, action) => {
			localStorage.setItem("playerId", action.payload)
			state.id = action.payload
		}
	}
})
export const {updatePlayerId} = slice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectPlayer = state => {
	return state.game.game.players[state.player.id || localStorage.getItem("playerId")]
};


export default slice.reducer