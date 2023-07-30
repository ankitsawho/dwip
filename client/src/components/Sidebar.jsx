import { LuThumbsUp } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { BiMessageSquareDetail } from "react-icons/bi";
import GridLoader from "react-spinners/GridLoader";
import axios from "axios";
import API_CONFIG from "../../api.config";
import useAuthStore from "../../zustand/auth-store";

function Sidebar() {
	const accessToken = useAuthStore((state) => state.accessToken);
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		const fetchPosts = async () => {
			try {
				const response = await axios.get(
					`${API_CONFIG.baseUrl}/post/popular/4/`,
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
		<div className="hidden lg:block w-80 pl-2 pr-6">
			<div className="flex flex-col bg-slate-100 p-2 rounded-2xl items-center">
				<div className="font-bold text-lg p-3 text-slate-700">
					Trending
				</div>
				{loading ? (
					<div className="w-full flex justify-center">
						<GridLoader
							color="#708090"
							loading={loading}
							size={10}
							aria-label="Loading Spinner"
							data-testid="loader"
						/>
					</div>
				) : (
					<div className="mt-2 w-full">
						{posts.map((item) => (
							<TrendingPost key={item.id} data={item} />
						))}
					</div>
				)}
				<Link to="/explore">
					<div className="text-sm text-right font-bold text-slate-500 py-3">
						Show More
					</div>
				</Link>
			</div>
		</div>
	);
}

const TrendingPost = ({ data }) => {
	const navigate = useNavigate();
	const handleComment = () => {
		return navigate(`/comment`, {
			state: { data },
		});
	};
	return (
		<div onClick={handleComment}>
			<div className="text-sm my-2 text-slate-600 w-full hover:bg-slate-200 rounded-lg p-2 cursor-pointer">
				<span>{data.content}</span>
				<div className="flex items-center space-x-3">
					<div className="flex items-center justify-start mt-2 space-x-1">
						<LuThumbsUp size={12} />
						<span className="text-xs">{data.likes_count}</span>
					</div>
					<div className="flex items-center justify-start mt-2 space-x-1">
						<BiMessageSquareDetail size={12} />
						<span className="text-xs">{data.comments_count}</span>
					</div>
				</div>
			</div>
			<hr class="h-px my-2 bg-slate-300 border-0 dark:bg-slate-300"></hr>
		</div>
	);
};

export default Sidebar;
