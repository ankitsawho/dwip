import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DwipPost from "../../components/DwipPost";
import UserDetail from "../../components/UserDetail";

function Search() {
	const location = useLocation();
	const { users, posts } = location.state;
	const [reload, setReload] = useState(false);
	if (users.length == 0 && posts.length == 0) {
		return (
			<div className="text-2xl text-slate-800 m-10 font-extrabold">
				No search results
			</div>
		);
	}
	return (
		<div>
			{users.length != 0 && (
				<div>
					<h1 className="text-lg ml-4 text-slate-600 font-extrabold">
						Users
					</h1>
					<div className="mt-8 mb-12">
						{users.map((item) => (
							<UserDetail
								key={item.id}
								user_id={item.id}
								username={item.username}
							/>
						))}
					</div>
				</div>
			)}
			<div className="my-3" />
			{posts.length != 0 && (
				<div>
					<h1 className="text-lg ml-4 text-slate-600 font-extrabold">
						Dwips
					</h1>
					<div className="mt-8 mb-12">
						{posts.map((item) => (
							<DwipPost
								key={item.id}
								data={item}
								setReload={setReload}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

export default Search;
