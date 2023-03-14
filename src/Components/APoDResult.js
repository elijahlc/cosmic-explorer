import React from 'react';

const APoDResult = ({ date, explanation, media_type, title, url }) => {
	return (
		<div>
			<h2>{title}</h2>
			{media_type === 'image' ? (
				<img src={url} alt={title} />
			) : (
				<iframe src={url} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen title={title} />
			)}
			<p>{explanation}</p>
		</div>
	);
};

export default APoDResult;
