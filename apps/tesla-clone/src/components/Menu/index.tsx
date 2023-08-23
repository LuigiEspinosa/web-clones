import { FC } from 'react';

import MenuItem from './MenuItem';
import './Menu.scss';

const menuItems = [
  'existing inventory',
  'used inventory',
  'trade-in',
  'cybertruck',
  'roadster',
  'semi',
  'charging',
  'powerwall',
  'commercial solar',
  'test drive',
  'find us',
  'support',
  'united states',
];

const Menu: FC = () => {
  return (
    <nav className="menu" aria-label="Sidebar Links">
      <ul>
        {menuItems.map((item) => (
          <MenuItem key={item} title={item} />
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
