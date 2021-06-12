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
			</div>
		</Router>
	);
}

export default App;
