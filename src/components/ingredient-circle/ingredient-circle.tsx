import styles from "./ingredient-circle.module.css";

// импорт типов
import { Item } from '../../utils/types';

type IngredientCircleProps = {
  ingredient: {
    _id: string,
    image: string,
    name: string,
    count?: number,
  },
  style?: object,
  count?: number,
}

export default function IngredientCircle({ ingredient, style, count }: IngredientCircleProps) {

  const { image, name } = ingredient;
  const imgStyle = count ? `${styles.img} ${styles.imgWithCount}` : `${styles.img}`;

  return (
    <div className={styles.ingredientCircle} style={style}>
      <img className={imgStyle} src={image} alt={name} />
      {count && <span className={`${styles.count} text text_type_digits-default`}>+{count}</span>}
    </div>
  );
}

