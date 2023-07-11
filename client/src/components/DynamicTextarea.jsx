import React, { useState } from "react";

const DynamicTextarea = ({ text, setText }) => {
	const handleChange = (event) => {
		setText(event.target.value);
	};

	const handleInput = (event) => {
		event.target.style.height = "auto";
		event.target.style.height = `${event.target.scrollHeight}px`;
	};

	return (
		<div className="relative">
			<textarea
				value={text}
				onChange={handleChange}
				onInput={handleInput}
				className="resize-none cursor-text block w-full bg-transparent px-3 py-2 rounded-md focus:outline-none text-lg"
				placeholder="What's on your mind? Dwip It!"
			/>
		</div>
	);
};

export default DynamicTextarea;