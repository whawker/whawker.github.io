import React, { Component, PropTypes } from 'react';

const shortMonthMap = {
    '01': 'Jan',
    '02': 'Feb',
    '03': 'Mar',
    '04': 'Apr',
    '05': 'May',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Aug',
    '09': 'Sep',
    '10': 'Oct',
    '11': 'Nov',
    '12': 'Dec'
};

const DateBadge = ({ year, month, day }) => (
    <time datetime={`${year}-${month}-${day}T00:00:00`}>
        <span className="month">{shortMonthMap[month]}</span>
        <span className="day">{day}</span>
        <span className="year">{year}</span>
    </time>
);

DateBadge.propTypes = {
    year: PropTypes.string.isRequired,
    month: PropTypes.string.isRequired,
    day: PropTypes.string.isRequired
};

export default DateBadge;