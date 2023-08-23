import { FC, MouseEventHandler } from 'react';
import './Button.scss';

interface ButtonSecondaryProps {
  name: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const ButtonSecondary: FC<ButtonSecondaryProps> = ({ name, type, onClick }) => {
  return (
    <button className="buttonSecondary" onClick={onClick} type={type}>
      {name}
    </button>
  );
};

export default ButtonSecondary;
