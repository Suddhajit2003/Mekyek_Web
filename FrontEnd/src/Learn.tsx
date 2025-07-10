import React from 'react';
import LearnOverview from './Learn/LearnOverview';
import Learncomponents from './Learn/Learncomponents';

const Learn: React.FC = () => {
  return (
    <div style={{ paddingTop: '70px', minHeight: '100vh' }}>
      <LearnOverview />
      <Learncomponents />
    </div>
  );
};

export default Learn;
