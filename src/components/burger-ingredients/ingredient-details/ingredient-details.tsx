import { FC, useMemo } from 'react';
import styles from './ingredient-details.module.css';
import { IIngredient } from '../../../utils/types';
import { useStoreSelector } from '../../../services/store';
import { useParams } from 'react-router-dom';
import { getLoadIngredientsState } from '../../../services/selectors';

type IngredientDetailsProps = {
    item:IIngredient
}

export const IngredientDetailsByItem:FC<IngredientDetailsProps> = ({item}) => {
  return (
    <section className={styles.root}>
      <img src={item.image_large} alt={item.name} />
      <h4 className="text_type_main-medium mb-8 mt-4">{item.name}</h4>
      <div className={styles.info}>
        <div className={styles.infoItem +' mr-5'}>
          <span className="text_type_main-default mb-2">Калории,ккал</span>
          <span className="text_type_digits-default">{item.calories}</span>
        </div>
        <div className={styles.infoItem +' mr-5'}>
          <span className="text_type_main-default mb-2">Белки, г</span>
          <span className="text_type_digits-default">{item.proteins}</span>
        </div>
        <div className={styles.infoItem +' mr-5'}>
          <span className="text_type_main-default mb-2">Жиры, г</span>
          <span className="text_type_digits-default">{item.fat}</span>
        </div>
        <div className={styles.infoItem +' mr-5'}>
          <span className="text_type_main-default mb-2">Углеводы, г</span>
          <span className="text_type_digits-default">{item.carbohydrates}</span>
        </div>
      </div>
    </section>
  )
};

export const IngredientDetailsByPathId:FC = ()=>{
  const {ingredientId} = useParams();
  const {ingredients} = useStoreSelector(getLoadIngredientsState);  
  // find
  const activeIngredient = useMemo(()=>{
      return (ingredients && ingredientId) 
          ? ingredients.find((ingredient) => ingredient._id === ingredientId) 
          : null;
  },[ingredientId, ingredients]);  
  // not found
  if(!activeIngredient){return <div> Ингредиент не найден!</div> }
  // comp
  return <IngredientDetailsByItem item={activeIngredient}/> 
}

// for modal
export const IngredientDetailsByActive = ()=>{
  const {activeIngredient} = useStoreSelector(getLoadIngredientsState);  
  if(!activeIngredient){return <div> Ингредиент не найден!</div> }
  return <IngredientDetailsByItem item={activeIngredient}/> 
}

export default IngredientDetailsByItem;