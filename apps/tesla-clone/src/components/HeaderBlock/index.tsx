import { FC } from 'react';
import './HeaderBlock.scss';

const HeaderBlock: FC = () => {
  return (
    <div className="headerBlock">
      <div className="headerBlock__info">
        <div className="headerBlock__infoText">
          <h1>Model 3</h1>
          <h2>
            Order Online from <span>Touchless Delivery</span>
          </h2>
        </div>

        <div className="headerBlock__actions">
          <button className="headerBlock__buttonPrimary">Custom Order</button>
          <button className="headerBlock__buttonSecondary">Existing Inventory</button>
        </div>
      </div>
    </div>
  );
};

export default HeaderBlock;
