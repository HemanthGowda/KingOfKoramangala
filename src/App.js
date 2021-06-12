import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Join} from "./routes/join/join";
import {Home} from "./routes/home/home";
import {Create} from "./routes/create/create";

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
<<<<<<< HEAD
=======

					{/* If none of the previous routes render anything,
                        this route acts as a fallback.

                        Important: A route with path="/" will *always* match
                        the URL because all URLs begin with a /. So that's
                        why we put this one last of all */}
>>>>>>> d983f8316a4f16cf23be41bd6830c938adafa2c1
					<Route path="/">
						<Home/>
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
