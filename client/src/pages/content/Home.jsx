import React, { useEffect, useState } from "react";
import CreatePost from "../../components/CreatePost";
import DwipPost from "../../components/DwipPost";
import toast, { Toaster } from "react-hot-toast";
import GridLoader from "react-spinners/GridLoader";
import axios from "axios";
import API_CONFIG from "../../../api.config";
import useAuthStore from "../../../zustand/auth-store";

function Home() {
	const accessToken = useAuthStore((state) => state.accessToken);
	const [posts, setPosts] = useState([]);
	const [reload, setReload] = useState(true);

	const [loading, setLoading] = useState(false);
	useEffect(() => {
		setLoading(true);
		const fetchPosts = async () => {
			try {
				const response = await axios.get(
					`${API_CONFIG.baseUrl}/post/`,
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					}
				);
				setPosts(response.data.data);
				setLoading(false);
			} catch (error) {
				console.error(error);
				setLoading(false);
			}
		};

		fetchPosts();
	}, [reload]);

	return (
		<div className="px-2">
			<Toaster />
			<h1 className="pb-4 pl-4 font-bold text-2xl cursor-default text-slate-900">
				Home
			</h1>
			<CreatePost setReload={setReload} />
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
			<div className="py-20 text-slate-600 font-bold w-full flex items-center justify-center text-sm">
				No more dwips ☹️
			</div>
		</div>
	);
}

export default Home;
