import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import useAuthStore from "../../zustand/auth-store";
import API_CONFIG from "../../api.config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SyncLoader from "react-spinners/SyncLoader";

function SearchBar() {
	const navigate = useNavigate();
	const accessToken = useAuthStore((state) => state.accessToken);
	const [searchText, setSearchText] = useState("");
	const [loading, setLoading] = useState(false);
	const handleSearch = async (event) => {
		if (event.key === "Enter") {
			if (searchText.trim().length == 0) return;
			setLoading(true);
			try {
				const response = await axios.post(
					`${API_CONFIG.baseUrl}/post/search/`,
					{
						query: searchText,
					},
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					}
				);
				const data = response.data.data;
				setSearchText("");
				setLoading(false);
				return navigate("/search", {
					state: { users: data.users, posts: data.posts },
				});
			} catch (error) {
				console.error(error);
				setLoading(false);
			}
		}
	};
	return (
		<div>
			{loading ? (
				<SyncLoader
					color="#708090"
					loading={loading}
					size={10}
					aria-label="Loading Spinner"
					data-testid="loader"
				/>
			) : (
				<div className="hidden md:flex items-center justify-center bg-slate-200 rounded-full px-3 py-2">
					<FiSearch size={18} className="text-slate-500 mr-2" />
					<input
						onKeyDown={handleSearch}
						className=" bg-transparent outline-none"
						type="text"
						placeholder="Search ..."
						value={searchText}
						onChange={(e) => setSearchText(e.target.value)}
					/>
				</div>
			)}
		</div>
	);
}

export default SearchBar;
