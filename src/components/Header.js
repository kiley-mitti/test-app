import React from 'react';
import { RuxGlobalStatusBar, RuxClock } from '@astrouxds/react';
import { useGlobalContext } from '../context';

const Header = () => {
  const { data } = useGlobalContext();

  const completeCount = data.filter(
    (currentAlert) => currentAlert.complete
  ).length;

  return (
    <RuxGlobalStatusBar app-domain='Alerts' app-name='Dashboard'>
      <div className='active-alerts'>
        <h1>{data.length - completeCount}</h1>
        <p>Active Alerts</p>
      </div>
      <RuxClock slot='right-side'></RuxClock>
    </RuxGlobalStatusBar>
  );
};
export default Header;
