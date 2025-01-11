import { useSelector } from 'react-redux';
import img1 from '../../../src/assets/tower-1.png'
import img2 from '../../../src/assets/tower-2.png'
import img3 from '../../../src/assets/tower-3.png'
import img4 from '../../../src/assets/tower-4.png'
export const TowerSelection = ({onTowerDragStart}) => {
  const playerData = useSelector((state) => state.player);
  return (
    <div className="tower-selection-container">
      <div className="towers">
        <div className="tower" onDragStart={()=>onTowerDragStart('start')} onDragOver={()=>onTowerDragStart('lowest')} onDrop={()=>onTowerDragStart('ondrop')}>
          <div className="tower-icon"><img src={img1} height={105} style={{marginBottom: '40px'}} /></div>
          <div className="tower-price">
          <div className='tower-price-label'>
                5
            </div>
          </div>
        </div>
        <div className="tower">
          <div className="tower-icon"><img src={img2} height={105} style={{marginBottom: '40px'}} /></div>
          <div className="tower-price">
          <div className='tower-price-label'>
                10
            </div>
          </div>
        </div>
        <div className="tower">
        <div className="tower-icon"><img src={img3} height={105} style={{marginBottom: '40px'}} /></div>
          <div className="tower-price">
          <div className='tower-price-label'>
                20
            </div>
          </div>
        </div>
        <div className="tower">
        <div className="tower-icon"><img src={img4} height={105} style={{marginBottom: '40px'}} /></div>
          <div className="tower-price">
            <div className='tower-price-label'>
                35
            </div>
          </div>
        </div>
      </div>
      <div className="resources">
        <div className="resource">
        <div className="resource-count">{playerData.gold}</div>
          <div className="resource-icon gold"></div>
        
        </div>
        <div className="resource">
        <div className="resource-count">{playerData.wood}</div>
          <div className="resource-icon wood"></div>
          
        </div>
      </div>
    </div>
  );
};

