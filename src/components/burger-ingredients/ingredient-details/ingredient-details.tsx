import { FC } from 'react';
import styles from './ingredient-details.module.css';
import { TIngredientItem } from '../../../utils/types';

type IngredientDetailsProps = {
    item:TIngredientItem
}

const IngredientDetails:FC<IngredientDetailsProps> = (props) => {
    
const item = props.item
  return (
    <section className={styles.root}>
      <img src={item.image_large} alt={item.name} />
      <h4 className="text_type_main-medium mb-8 mt-4">{item.name}</h4>
      <div className={styles.info}>
        <div className={`${styles.infoItem} mr-5`}>
          <span className="text_type_main-default mb-2">Калории,ккал</span>
          <span className="text_type_digits-default">{item.calories}</span>
        </div>
        <div className={`${styles.infoItem} mr-5`}>
          <span className="text_type_main-default mb-2">Белки, г</span>
          <span className="text_type_digits-default">{item.proteins}</span>
        </div>
        <div className={`${styles.infoItem} mr-5`}>
          <span className="text_type_main-default mb-2">Жиры, г</span>
          <span className="text_type_digits-default">{item.fat}</span>
        </div>
        <div className={`${styles.infoItem}`}>
          <span className="text_type_main-default mb-2">Углеводы, г</span>
          <span className="text_type_digits-default">{item.carbohydrates}</span>
        </div>
      </div>
    </section>
  )
};


export default IngredientDetails;