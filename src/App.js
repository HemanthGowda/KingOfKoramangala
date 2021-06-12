import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Join} from "./routes/join/join";
import {Home} from "./routes/home/home";

function App() {
	return (
		<Router>
			<div>
				{/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
				<Switch>
					<Route path="/">
						<Home/>
					</Route>
					<Route path="/create">
					</Route>
					<Route path="/join">
						<Join/>
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
