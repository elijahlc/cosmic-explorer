import React from 'react';

const APoDResult = ({ date, explanation, media_type, title, url }) => {
	return (
		<div className="APoDResult">
			<h2>Astronomy Picture of the Day for {new Date(date).toLocaleString('en-us')}</h2>

			<h3>{title}</h3>

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
