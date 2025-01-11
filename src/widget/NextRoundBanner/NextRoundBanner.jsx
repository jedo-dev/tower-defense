import { useSelector } from 'react-redux';

export const NextRoundBanner = ({onTowerDragStart}) => {
  return (
    <div className='nextround-banner-wrapper'>
        <div>Next round will start </div>
        <div>00:45</div>
    </div>
  );
};

