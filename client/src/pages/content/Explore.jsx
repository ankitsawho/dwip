import React, { useState, useEffect } from "react";
import { LuThumbsUp } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import GridLoader from "react-spinners/GridLoader";
import axios from "axios";
import API_CONFIG from "../../../api.config";
import useAuthStore from "../../../zustand/auth-store";
import DwipPost from "../../components/DwipPost";

function Explore() {
	const [posts, setPosts] = useState([]);
	const [reload, setReload] = useState(false);
	const [loading, setLoading] = useState(false);
	const accessToken = useAuthStore((state) => state.accessToken);

	useEffect(() => {
		setLoading(true);
		const fetchPosts = async () => {
			try {
				const response = await axios.get(
					`${API_CONFIG.baseUrl}/post/popular/100/`,
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					}
				);
				setPosts(response.data);
				setLoading(false);
			} catch (error) {
				console.error(error);
				setLoading(false);
			}
		};

		fetchPosts();
	}, []);

	return (
		<div className="w-full">
			<h1 className="pb-4 pl-4 font-bold text-2xl cursor-default">
				Explore
			</h1>

			{/* To Follow */}
			<div className="flex flex-col bg-slate-100 p-1 rounded-2xl items-start justify-start">
				<div className="font-bold text-lg ml-8 mt-6 text-slate-700 mb-3">
					Who to follow
				</div>
				{/* <UserDetail />
				<UserDetail />
				<UserDetail />
				<UserDetail /> */}
				<Link to="">
					<div className="text-sm text-right ml-8 pl-2 font-bold text-slate-500 py-3">
						Show More
					</div>
				</Link>
			</div>

			{/* Trending */}
			<h1 className="mt-10 pl-4 font-bold text-2xl cursor-default">
				Trending Dwips
			</h1>
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
					{posts.map((item) => (
						<DwipPost
							key={item.id}
							data={item}
							setReload={setReload}
						/>
					))}
				</div>
			)}
		</div>
	);
}

export default Explore;
