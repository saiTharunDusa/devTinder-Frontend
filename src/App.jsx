import { BrowserRouter, Routes, Route } from "react-router-dom"
import Body from "./components/Body"
import Login from "./components/login"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import Feed from "./components/Feed"
import ProfileView from "./components/ProfileView"
import ProfileEdit from "./components/ProfileEdit"
import Connections from "./components/Connections"
import ConnectionRequest from "./components/ConnectionRequest"

function App() {

	return (
		<>
			<Provider store={appStore}>
				<BrowserRouter basename="/">
					<Routes>
						<Route path="/" element={<Body />}>
							<Route path="/" element={<Feed />} />
							<Route path="/login" element={<Login />} />
							<Route path="/profile" element={<ProfileView />} />
							<Route path="/edit" element={<ProfileEdit />} />
							<Route path="/connections" element={<Connections />} />
							<Route path="/requests" element={<ConnectionRequest />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</Provider>
		</>
	)
}

export default App
