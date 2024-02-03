import { FC , RefObject} from 'react';
import { TIngredientItem } from '../../utils/types';

import styles from './burger-ingredients.module.css'
import BurgerIngredientsItem from './burger-ingredients-item/burger-ingredients-item';

interface BurgerIngredientsItemListProps {
  title: string;
  index: number;
  type?: string; 
  ingredients: TIngredientItem[];
  ref?: RefObject<HTMLDivElement>
}

const BurgerIngredientsItemList: FC<BurgerIngredientsItemListProps> = (props) => {
  
  const { title, ingredients, index, ref} = props;
  
  return (
    <div ref = {ref} className={styles.ingrList} >
      <p id = {index.toString()}  className='text text_type_main-medium mb-6'>
        {title}
      </p>
      <section className={styles.ingrContainer + " ml-4"}>
        {
          ingredients.map((item) => <BurgerIngredientsItem key={item._id} item={item}/>)
        }
      </section>
    </div>
  );
};

export default BurgerIngredientsItemList;