import React from 'react';
import './RaceStatus.scss';

export default function RaceStatus(props) {
  const {status} = props;
  const statusMessage = {
    default: 'Not Yet Run',
    start: 'In Progress',
    end: 'All Calculated'
  };

  return (
    <div className='ant-race__status'>
      <span>{statusMessage[status]}</span>
    </div>
  );
}
