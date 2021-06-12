import './App.css';
import {BrowserRouter as Router, Link} from "react-router-dom";

function App() {
	return (
		<Router>
			<div>
				<ul>
					<li>
						<Link to="/create">Create Game</Link>
					</li>
					<li>
						<Link to="/join">Join Game</Link>
					</li>
				</ul>

				{/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
				<Switch>
					<Route path="/create">
					</Route>
					<Route path="/join">
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
