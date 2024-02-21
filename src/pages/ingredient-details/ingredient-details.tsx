import { IngredientDetailsByPathId } from '../../components/burger-ingredients/ingredient-details/ingredient-details';

import styles from './ingredient-details.module.css';

const IngredientDetailsPage = () => {
    return (<div className={styles.background}>
            <div className={styles.content}>
                <div className={"text text_type_main-large"}>Детали ингредиента</div>
                <IngredientDetailsByPathId />
            </div>
        </div>);    
};

export default IngredientDetailsPage;