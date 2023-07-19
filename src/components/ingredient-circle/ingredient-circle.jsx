import styles from "./ingredient-circle.module.css";
import PropTypes from 'prop-types';

function IngredientCircle({ ingredient, style, count }) {

  const { image, name } = ingredient;
  const imgStyle = count ? `${styles.img} ${styles.imgWithCount}` : `${styles.img}`;

  return (
    <div className={styles.ingredientCircle} style={style}>
      <img className={imgStyle} src={image} alt={name}/>
      {count && <span className={`${styles.count} text text_type_digits-default`}>+{count}</span>}
    </div>
  );
}

IngredientCircle.propTypes = {
  ingredient: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  style: PropTypes.object,
  count: PropTypes.number,
};



export default IngredientCircle;
