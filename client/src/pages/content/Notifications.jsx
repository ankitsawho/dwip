import React, { useEffect, useState } from "react";
import { TfiClose } from "react-icons/tfi";
import toast from "react-hot-toast";
import API_CONFIG from "../../../api.config";
import axios from "axios";
import useAuthStore from "../../../zustand/auth-store";

function Notifications() {
	const accessToken = useAuthStore((state) => state.accessToken);
	const [notifications, setNotifications] = useState([]);
	const [reload, setReload] = useState(false);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		setLoading(true);
		const fetchNotifications = async () => {
			try {
				const response = await axios.get(
					`${API_CONFIG.baseUrl}/post/notification/`,
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					}
				);
				setNotifications(response.data.data);
				setLoading(false);
			} catch (error) {
				console.error("Error", error);
				setLoading(false);
			}
		};
		fetchNotifications();
	}, [reload]);

	return (
		<div className="w-full">
			<h1 className="pb-4 pl-4 font-bold text-2xl cursor-default">
				Notifications
			</h1>
			<div className="flex flex-col bg-slate-100 p-1 rounded-lg items-start justify-start">
				{notifications.map((item) => (
					<NotificationCard
						key={item.id}
						data={item}
						setReload={setReload}
						accessToken={accessToken}
					/>
				))}
			</div>
		</div>
	);
}

const NotificationCard = ({ data, setReload, accessToken }) => {
	const handleDeleteNotification = async () => {
		try {
			const response = await axios.delete(
				`${API_CONFIG.baseUrl}/post/notification/`,
				{
					id: data.id,
				},
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			toast("Notification deleted");
			setReload((prev) => !prev);
		} catch (error) {
			toast("Error Occurred");
			console.error(error);
		}
	};

	return (
		<div className="w-full cursor-pointer">
			<div className="rounded-md">
				<div className="py-4 px-5 flex items-center justify-between">
					<p className="text-slate-600 font-light text-sm">
						{data.content}
					</p>
					<button
						onClick={handleDeleteNotification}
						className="flex hover:text-red-500 p-2  hover:bg-slate-200 items-end justify-center space-x-3 py-2 rounded-full mx-4"
					>
						<TfiClose size={18} />
					</button>
				</div>
			</div>
			<hr class="h-px bg-slate-300 border-0 dark:bg-slate-300"></hr>
		</div>
	);
};

export default Notifications;
