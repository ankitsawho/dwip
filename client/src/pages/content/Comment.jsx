import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DwipPost from "../../components/DwipPost";
import axios from "axios";
import useAuthStore from "../../../zustand/auth-store.js";
import API_CONFIG from "../../../api.config.js";
import GridLoader from "react-spinners/GridLoader";
import CommentContainer from "../../components/CommentContainer";
import CreateComment from "../../components/CreateComment";
import useReloadStore from "../../../zustand/reload-store";

function Comment() {
	const reloadComments = useReloadStore((state) => state.reloadComments);
	const location = useLocation();
	const data = location.state.data;
	const accessToken = useAuthStore((state) => state.accessToken);
	const [comments, setComments] = useState([]);
	const [reload, setReload] = useState(true);

	const [loading, setLoading] = useState(false);

	const getComments = async () => {
		setLoading(true);
		try {
			console.log(`${API_CONFIG.baseUrl}/post/${data.id}/comments/`);
			const response = await axios.get(
				`${API_CONFIG.baseUrl}/post/${data.id}/comments/`,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			setComments(response.data);
			setLoading(false);
		} catch (error) {
			console.error("ERROR");
			setLoading(false);
		}
	};

	useEffect(() => {
		console.log("1");
		getComments();
		console.log(2);
	}, [reload, location.state.data]);

	return (
		<div className="px-2">
			<DwipPost data={data} setReload={setReload} />
			<div className="pt-4">
				<span className="text-xl ml-4 font-bold">Comments</span>
			</div>
			<CreateComment post_id={data.id} setReload={setReload} />
			<div>
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
					<div className="mt-12 pb-20">
						{comments.map((item) => (
							<CommentContainer
								key={item.id}
								data={item}
								setReload={setReload}
								comment_id={item.id}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

export default Comment;
