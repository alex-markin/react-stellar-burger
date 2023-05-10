import styles from "./burgerStyles.module.css";
import Tabs from "../tabs/tabs.js";
import Ingredient from "../ingredient/ingredient.js";
import PropTypes, { func } from 'prop-types';


// Burger Ingredients component
function BurgerIngredients({ data, handleIngredientDetails }) {

  // установка заглавий Табсов
  const tabData = [
    { value: "Булки", label: "Булки" },
    { value: "Соусы", label: "Соусы" },
    { value: "Начинки", label: "Начинки" },
  ];

  return (
    <section className={`${styles.container} pt-10`}>
      <h1 className={`text text_type_main-large mb-5`}>Соберите бургер</h1>
      <Tabs tabData={tabData} />

      <div className={`${styles.ingredients} `}>

        <div className={`${styles.ingredientType} pt-6`}>
          <h2 className={`text text_type_main-medium `}>Булки</h2>
          <div className={`${styles.ingredientContainer} `}>
            {data.map((item) => {
              if (item.type === "bun") {
                return (
                  <Ingredient
                    key={item._id}
                    image={item.image}
                    name={item.name}
                    price={item.price}
                    onClick={() => handleIngredientDetails(item)}
                  />
                );
              }
            })}
          </div>
        </div>

        <div className={`${styles.ingredientType} pt-6`}>
          <h2 className={`text text_type_main-medium `}>Соусы</h2>
          <div className={`${styles.ingredientContainer} `}>
            {data.map((item) => {
              if (item.type === "sauce") {
                return (
                  <Ingredient
                    key={item._id}
                    image={item.image}
                    name={item.name}
                    price={item.price}
                    onClick={() => handleIngredientDetails(item)}
                  />
                );
              }
            })}
          </div>
        </div>

        <div className={`${styles.ingredientType} pt-6`}>
          <h2 className={`text text_type_main-medium `}>Начинки</h2>
          <div className={`${styles.ingredientContainer} `}>
            {data.map((item) => {
              if (item.type === "main") {
                return (
                  <Ingredient
                    key={item._id}
                    image={item.image}
                    name={item.name}
                    price={item.price}
                    onClick={() => handleIngredientDetails(item)}
                  />
                );
              }
            })}
          </div>
        </div>

      </div>
    </section>
  );
}


BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      type: PropTypes.oneOf(["bun", "sauce", "main"]).isRequired,
    })
  ).isRequired,
  handleIngredientClick: PropTypes.func.isRequired,
};


export default BurgerIngredients;
