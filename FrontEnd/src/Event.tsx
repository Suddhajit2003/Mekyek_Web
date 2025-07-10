import React from 'react';
import EventElement from './Event/EventElement';
import './Css/Event.module.css';

const Event: React.FC = () => {
  return (
    <div style={{ paddingTop: '70px', minHeight: '100vh' }}>
      <EventElement />
    </div>
  );
};

export default Event;
