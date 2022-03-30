import React from 'react';

export default function RaceStatus(props) {
  const {status} = props;
  const statusMessage = {
    default: 'Not Yet Run',
    start: 'In Progress',
    end: 'All Calculated'
  };

  return (
    <div>
      <span>{statusMessage[status]}</span>
    </div>
  );
}
