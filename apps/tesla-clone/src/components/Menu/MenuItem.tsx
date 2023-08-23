import { FC } from 'react';
import './Menu.scss';

interface MenuItemProps {
  title: string;
}

const MenuItem: FC<MenuItemProps> = ({ title, ...props }) => {
  return (
    <li className="menuItem" {...props}>
      {title}
    </li>
  );
};

export default MenuItem;
