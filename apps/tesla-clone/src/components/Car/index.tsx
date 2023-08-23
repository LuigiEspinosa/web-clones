import { FC } from 'react';

import ButtonPrimary from '../Button/primary';
import ButtonSecondary from '../Button/secondary';
import './Car.scss';

interface CarProps {
  imgSrc: string;
  model: string;
  testDrive?: boolean;
}

const Car: FC<CarProps> = ({ imgSrc, model, testDrive = 'false' }) => {
  return (
    <div className="car">
      <div className="car__image">
        <img src={imgSrc} alt={model} />
      </div>

      <h2 className="car__model">{model}</h2>
      <div className="car__actions">
        <ButtonPrimary name="order" />
        {testDrive ? <ButtonSecondary name="test drive" /> : null}
      </div>

      <p className="car__info">
        <span>Request a Call</span> to speak with a product specialist, value your trade-in or apply
        for leasing
      </p>
    </div>
  );
};

export default Car;
