import { Routes, Route, Outlet, Link, Navigate } from "react-router-dom";
import UnauthorizedRoutes from "./layouts/UnauthorizedRoutes";
import AuthorizedRoutes from "./layouts/AuthorizedRoutes";
import Error from "./pages/error/Error";
import Login from "./pages/auth/Login";
import Home from "./pages/content/Home";
import Main from "./pages/content/Main";
import Explore from "./pages/content/Explore";
import Notifications from "./pages/content/Notifications";
import Profile from "./pages/content/Profile";
import Settings from "./pages/settings/Settings";
import Bookmarks from "./pages/content/Bookmarks";
import Register from "./pages/auth/Register";
import SnackbarProvider from "react-simple-snackbar";
import Verify from "./pages/auth/Verify";
import Comment from "./pages/content/Comment";
import Search from "./pages/content/Search";

function App() {
	return (
		<SnackbarProvider>
			<Routes>
				<Route path="auth" element={<UnauthorizedRoutes />}>
					<Route path="" element={<Login />} />
					<Route path="register" element={<Register />} />
					<Route path="verify" element={<Verify />} />
				</Route>

				<Route path="" element={<AuthorizedRoutes />}>
					<Route path="" element={<Main />}>
						<Route path="" element={<Home />} />
						<Route path="explore" element={<Explore />} />
						<Route path="/comment" element={<Comment />} />
						<Route path="/search" element={<Search />} />
						<Route
							path="notifications"
							element={<Notifications />}
						/>
						<Route path="/profile/:user_id" element={<Profile />} />
						<Route path="bookmarks" element={<Bookmarks />} />
					</Route>
					<Route path="settings" element={<Settings />} />
				</Route>

				<Route path="*" element={<Error />} />
			</Routes>
		</SnackbarProvider>
	);
}

export default App;
