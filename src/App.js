import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Join from "./pages/join/join";
import {Home} from "./pages/home/home";
import {Create} from "./pages/create/create";
import Room from "./pages/room/room";

function App() {
	return (
		<Router>
			<div>
				{/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
				<Switch>
					<Route path="/create">
						<Create/>
					</Route>
					<Route path="/join/:roomName">
						<Join/>
					</Route>
					<Route path="/room/:roomName">
						<Room/>
					</Route>

					{/* If none of the previous pages render anything,
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
