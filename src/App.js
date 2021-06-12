import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Join} from "./routes/join/join";
import {Home} from "./routes/home/home";
import {Create} from "./routes/create/create";
import {Game} from "./routes/game/game";

function App() {
	return (
		<Router>
			<div>
				{/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
				<Switch>
					<Route path="/create">
						<Create />
					</Route>
					<Route path="/join">
						<Join/>
					</Route>
					<Route path="/game/:id">
						<Game/>
					</Route>

					{/* If none of the previous routes render anything,
                        this route acts as a fallback.

                        Important: A route with path="/" will *always* match
                        the URL because all URLs begin with a /. So that's
                        why we put this one last of all */}
					<Route path="/">
						<Home/>
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
