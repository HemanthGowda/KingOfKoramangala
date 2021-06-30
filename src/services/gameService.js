import {cloneDeep, countBy, each, find, keys, map} from "lodash";

export default class GameService {
	#game;

	constructor(game) {
		this.#game = Object.assign({}, cloneDeep(game));
	}

	getWinnerName = () => {
		return this.#game.players ? find(this.#game.players, (p) => (p.points > 19)).name : undefined
	}

	endTurn = () => {
		return this
			.#calculatePoints()
			.#updateGameStatus()
			.#resetCurrentPlay()
			.#moveGameToNextPlayer()
			.#returnGame()
	};

	rollDice = () => {
		this.#game.currentPlay.dice = map(this.#game.currentPlay.dice, (v) => {
			if (!v.selected) {
				return {selected: v.selected, value: v.value, diceNumber: v.diceNumber}
			}
			return {
				diceNumber: v.diceNumber,
				selected: false,
				value: Math.floor(Math.random() * 6) + 1
			};
		});
		this.#game.currentPlay.numberOfTimesRolled += 1

		return this.#returnGame()
	}

	restart = () => {
		return this
			.#resetGameStatus()
			.#resetCurrentPlay()
			.#resetCurrentPlayerPosition()
			.#resetPlayerStats()
			.#returnGame()
	}

	#returnGame = () => this.#game;

	#calculatePoints = () => {
		let currentPlayer = find(this.#game.players, (v) => (this.#game.currentPlayerPosition === v.tablePosition))

		let newPoints = currentPlayer.points;
		each(countBy(this.#game.currentPlay.dice, "value"), (v, k) => {
			if (k > 3) {
				return
			}
			switch (v) {
				case 3:
					newPoints += parseInt(k)
					break
				case 4:
					newPoints += parseInt(k) + 1
					break
				case 5:
					newPoints += parseInt(k) + 2
					break
				case 6:
					newPoints += parseInt(k) + 3
					break
			}
		})
		currentPlayer.points = newPoints
		return this
	};

	#resetCurrentPlay = () => {
		if (this.#game.finished) {
			return this
		}
		this.#game.currentPlay = {
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
		return this
	}

	#moveGameToNextPlayer = () => {
		if (this.#game.finished) {
			return this
		}
		this.#game.currentPlayerPosition = (this.#game.currentPlayerPosition + 1) % keys(this.#game.players).length
		return this
	}

	#updateGameStatus = () => {
		let currentPlayer = find(this.#game.players, (v) => (this.#game.currentPlayerPosition === v.tablePosition))
		if (currentPlayer.points >= 20) {
			this.#game.finished = true
		}
		return this
	}

	#resetGameStatus = () => {
		this.#game.finished = false
		this.#game.started = false
		return this
	}

	#resetPlayerStats = () => {
		each(this.#game.players, (v) => {
			v.currentHealth = 10
			v.points = 0
			v.state = "waiting"
		})
		return this
	}

	#resetCurrentPlayerPosition = () => {
		this.#game.currentPlayerPosition = 0
		return this
	}
}