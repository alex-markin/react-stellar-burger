
import styles from "./ingredient-details.module.css";
import PropTypes from 'prop-types';
import ingredientPropTypes from '../../utils/types.js';


function ingredientDetails({ ingredient }) {
  return (
    <>
      <h1 className={`${styles.title} text text_type_main-large mt-10 ml-10 mr-10`}>Детали ингредиента</h1>
      <div className={`${styles.container} `}>
        <img className={styles.image} src={ingredient.image} alt={ingredient.name} />
        <h2 className={`${styles.name} text text_type_main-medium mt-4 mb-8`}>{ingredient.name}</h2>
        <div className={`${styles.info} text text_type_main-default mb-15`}>
          <div className={`${styles.infoItem} mr-5`}>
            <span className="text text_type_main-default text_color_inactive">
              Калории,ккал
            </span>
            <span className="text text_type_digits-default text_color_inactive ml-2">
              {ingredient.calories}
            </span>
          </div>
          <div className={`${styles.infoItem} mr-5`}>
            <span className="text text_type_main-default text_color_inactive">
              Белки,г
            </span>
            <span className="text text_type_digits-default text_color_inactive ml-2">
              {ingredient.proteins}
            </span>
          </div>
          <div className={`${styles.infoItem} mr-5`}>
            <span className="text text_type_main-default text_color_inactive">
              Жиры,г
            </span>
            <span className="text text_type_digits-default text_color_inactive ml-2">
              {ingredient.fat}
            </span>
          </div>
          <div className={`${styles.infoItem} mr-5`}>
            <span className="text text_type_main-default text_color_inactive">
              Углеводы,г
            </span>
            <span className="text text_type_digits-default text_color_inactive ml-2">
              {ingredient.carbohydrates}
            </span>
          </div>
        </div>
      </div>

    </>
  )
}


ingredientDetails.propTypes = {
  ingredient: ingredientPropTypes.isRequired,
};


export default ingredientDetails;
