import React from 'react';
import ComunityOverview from './Comunity/ComunityOverview';
// import ComunityCard from './Comunity/ComunityCard';

const Comunity: React.FC = () => {
  return (
    <div style={{ paddingTop: '70px', minHeight: '100vh' }}>
      <ComunityOverview />
      {/* <ComunityCard /> */}
    </div>
  );
};

export default Comunity;
