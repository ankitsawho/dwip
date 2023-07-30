import React, { useEffect, useState } from "react";
import useAuthStore from "../../../zustand/auth-store";
import jwtDecode from "jwt-decode";
import API_CONFIG from "../../../api.config";
import axios from "axios";
import Identicon from "react-identicons";
import GridLoader from "react-spinners/GridLoader";
import DwipPost from "../../components/DwipPost";
import { useParams } from "react-router-dom";

function Profile() {
	const { user_id } = useParams();
	const accessToken = useAuthStore((state) => state.accessToken);
	const [userDetail, setUserDetail] = useState(null);
	const [posts, setPosts] = useState([]);
	const [reload, setReload] = useState(true);
	const [loading, setLoading] = useState(false);
	const getUserDetail = async () => {
		try {
			const response = await axios.get(
				`${API_CONFIG.baseUrl}/account/get-detail/${user_id}/`,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			setUserDetail(response.data.data);
		} catch (error) {
			console.error(error);
		}
	};

	const getUserPosts = async () => {
		setLoading(true);
		try {
			const response = await axios.get(
				`${API_CONFIG.baseUrl}/post/user/${user_id}/`,
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

	useEffect(() => {
		getUserPosts();
		getUserDetail(9);
	}, []);

	return (
		<div>
			{userDetail && (
				<div className="bg-slate-200 rounded-2xl p-4">
					<div className="flex items-center space-x-4">
						<div className="bg-white w-fit rounded-full flex items-center justify-center p-5">
							<Identicon string={user_id} size={50} />
						</div>
						<div>
							<div className=" text-slate-700 font-bold text-xl">
								{userDetail.fullname}
							</div>
							<div className="text-slate-600 font-bold text-md">
								{userDetail.username}
							</div>
						</div>
					</div>
					<div className="mt-4 flex items-center space-x-4">
						<button className="bg-slate-500 text-slate-50 rounded-xl font-bold px-4 py-1">
							Connect
						</button>
						<div className="flex items-center space-x-2 text-slate-600">
							<span className="text-sm font-bold">
								Connections:
							</span>
							<span className="text-sm font-semibold text-slate-500">
								{130}
							</span>
						</div>
					</div>
				</div>
			)}
			<div>
				<div className="text-slate-700 font-bold px-3 py-4 text-lg">
					Dwips
				</div>
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
					<div className="mt-1">
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
		</div>
	);
}

export default Profile;
