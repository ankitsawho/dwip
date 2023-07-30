import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import useAuthStore from "../../../zustand/auth-store";
import axios from "axios";
import API_CONFIG from "../../../api.config";
import GridLoader from "react-spinners/GridLoader";
import DwipPost from "../../components/DwipPost";

function Bookmarks() {
	const accessToken = useAuthStore((state) => state.accessToken);
	const [bookmarks, setBookmarks] = useState([]);
	const [reload, setReload] = useState(true);

	const [loading, setLoading] = useState(false);
	useEffect(() => {
		setLoading(true);
		const fetchPosts = async () => {
			try {
				const response = await axios.get(
					`${API_CONFIG.baseUrl}/post/bookmark-list/`,
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					}
				);
				setBookmarks(response.data.data);
				setLoading(false);
			} catch (error) {
				console.error(error);
				setLoading(false);
			}
		};

		fetchPosts();
	}, [reload]);

	return (
		<div className="w-full">
			<Toaster />
			<h1 className="pb-4 pl-4 font-bold text-2xl cursor-default">
				Bookmarks
			</h1>
			<div className="px-2 pb-36">
				{loading ? (
					<div className="w-full p-10 flex justify-center">
						<GridLoader
							color="#708090"
							loading={loading}
							size={10}
							aria-label="Loading Spinner"
							data-testid="loader"
						/>
					</div>
				) : (
					<div className="mt-12">
						{bookmarks.map((item) => (
							<DwipPost
								key={item.id}
								data={item}
								setReload={setReload}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

export default Bookmarks;
