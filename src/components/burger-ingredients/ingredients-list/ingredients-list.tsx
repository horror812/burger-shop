import { FC , RefObject} from 'react';
import { IIngredient } from '../../../utils/types';
import IngredientActiveItem from '../ingredient-active-item/ingredient-active-item';

import styles from './ingredients-list.module.css'

interface IngredientsItemListProps {
  title: string;
  index: number;
  ingredients: IIngredient[];
  type?: string;   
  listRef?: RefObject<HTMLDivElement>
}

const IngredientsItemList: FC<IngredientsItemListProps> = (props) => {
  
  const { title, ingredients, index, listRef} = props;
  
  return (
    <div ref = {listRef} className={styles.ingrList} >
      <p id = {index.toString()}  className='text text_type_main-medium mb-6'>
        {title}
      </p>
      <section className={styles.ingrContainer + " ml-4"}>
        {
          ingredients.map((item) => <IngredientActiveItem key={item._id} item={item}/>)
        }
      </section>
    </div>
  );
};

export default IngredientsItemList;