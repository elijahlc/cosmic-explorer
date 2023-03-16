import React from 'react';

const DataSelector = ({ instruction, date, handleDateChange, handleSubmit, dateFormatter }) => {
	return (
		<div className="selector">
			<h1>{instruction}</h1>
			<div>
				<input type="date" value={date} onChange={handleDateChange} max={dateFormatter()} />
				<button onClick={handleSubmit}>Submit</button>
			</div>
		</div>
	);
};

export default DataSelector;
