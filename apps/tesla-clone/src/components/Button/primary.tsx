import { FC, MouseEventHandler } from 'react';
import './Button.scss';

interface ButtonPrimaryProps {
  name: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const ButtonPrimary: FC<ButtonPrimaryProps> = ({ name, type, onClick }) => {
  return (
    <button className="buttonPrimary" onClick={onClick} type={type}>
      {name}
    </button>
  );
};

export default ButtonPrimary;
