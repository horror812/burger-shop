import IngredientDetails from '../../components/burger-ingredients/ingredient-details/ingredient-details';
import { getLoadIngredientsState } from '../../services/selectors';
import { useStoreSelector } from '../../services/store';

import styles from './ingredient-details.module.css';

const IngredientDetailsPage = () => {
    const {activeIngredient} = useStoreSelector(getLoadIngredientsState);
    if(!activeIngredient){
        // goto 404
        return <div>goto 404</div>
    }    
    return (<div className={styles.background}>
            <div className={styles.content}>
                <div className={"text text_type_main-large"}>Детали ингредиента</div>
                <IngredientDetails item={activeIngredient}/>
            </div>
        </div>);
    
};

export default IngredientDetailsPage;