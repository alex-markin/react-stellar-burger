// импорт стилей
import styles from "./ingredient-details.module.css";

// импорт библиотек
import { useParams, useNavigate } from 'react-router-dom';

// ипорт путей
import { ROUTES } from "../app/app";

// импорт типов
import { Item } from "../../utils/types";

type IngredientDetailsProps = {
  ingredient?: Item | null;
  isIndependent?: boolean;
}

export default function IngredientDetails({ ingredient, isIndependent }: IngredientDetailsProps) {

  const { ingredientId } = useParams();
  const navigate = useNavigate();

  let ingredients: Array<Item> | null = null;

  try {
    const storedIngredients = localStorage.getItem('ingredients');
    ingredients = storedIngredients ? JSON.parse(storedIngredients) : null;
  } catch (e) {
    ingredients = null;
  }

  if (!ingredient && ingredients) {
    ingredient = ingredients.find((item) => item._id === ingredientId) || null;
  }

  if (!ingredient && !ingredients) {
    navigate(ROUTES.NOT_FOUND)
    return null;
  } else if (ingredient) {

    const contentStyle = isIndependent ? `${styles.content} ${styles.content_center}` : '';
    const titleStyle = isIndependent ? `${styles.title} ${styles.title_center}` : `${styles.title}`;

    return (

      <div className={contentStyle}>
        <h1 className={`${titleStyle} text text_type_main-large mt-10 ml-10 mr-10`}>Детали ингредиента</h1>
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
      </div>
    )
  }
  return null;
}
