
// импорт библиотек
import { useEffect } from "react";

// импорт хуков
import { useRef } from "react";
import { useSelector, useDispatch } from "../../hooks/redux-hooks"; // импорт хука редакса

// импорт компонентов
import Tabs from "../tabs/tabs"; // импорт компонента Табс
import Ingredient from "../ingredient/ingredient"; // импорт компонента Ингредиент

// импорт стилей
import styles from "./burger-ingredients.module.css"; // импорт стилей

// импорт слайсов и редьюсеров Redux toolkit
import { tabsNavigationSlice } from "../../services/tabs-navigation-slice"; // импорт редьюсера для навигации по табам


// импорт функций useSelector
import { getData } from "../../services/store-selectors";

// импорт типов
import { Item } from "../../utils/types";
import { tabs } from '../../services/tabs-navigation-slice'

type BurgerIngredientsProps = {
  handleIngredientDetails: (item: Item) => void
}

export default function BurgerIngredients({ handleIngredientDetails }: BurgerIngredientsProps) {

  const dispatch = useDispatch(); // диспатч Redux

  // установка заглавий Табсов

  const tabData = [
    { value: "Булки", label: "Булки" },
    { value: "Соусы", label: "Соусы" },
    { value: "Начинки", label: "Начинки" },
  ];

  // получение данных из хранилища Redux
  const { data } = useSelector(getData); // данные с сервера


  // рефы для заголовков Табсов и контейнера
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bunRef = useRef<HTMLHeadingElement | null>(null);
  const sauceRef = useRef<HTMLHeadingElement | null>(null);
  const mainRef = useRef<HTMLHeadingElement | null>(null);


  // обработчик скролла для навигации по табам
  useEffect(() => {
    const container = containerRef.current;
    const headerRefs = [bunRef, sauceRef, mainRef];

    const handleScroll = () => {
      const containerTop = container?.getBoundingClientRect().top;
      const scrollPosition = window.scrollY;

      const distances = headerRefs.map((ref) => {
        const header = ref.current;
        if (header && containerTop) {
          const headerTop = header.getBoundingClientRect().top;
          const distance = Math.abs(headerTop - containerTop - scrollPosition);
          return distance;
        }
        return Infinity;
      });

      const minDistanceIndex = distances.indexOf(Math.min(...distances));
      const tabValue = tabData[minDistanceIndex].value;
      dispatch(tabsNavigationSlice.actions.selectTab(tabValue as tabs));
    };

    container && container.addEventListener("scroll", handleScroll);
    return () => {
      container && container.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch, tabData]);



  // скролл к заголовку Табса
  const scrollToHeader = (tabValue: string) => {
    const headerRef = tabValue === "Булки" ? bunRef.current :
      tabValue === "Соусы" ? sauceRef.current :
        tabValue === "Начинки" ? mainRef.current : null;

    if (headerRef && containerRef.current) {
      const containerTop = containerRef.current.getBoundingClientRect().top;
      const headerTop = headerRef.getBoundingClientRect().top;
      const scrollTop = headerTop - containerTop + containerRef.current.scrollTop;
      containerRef.current.scrollTo({
        top: scrollTop,
        behavior: "smooth",
      });
    }
  };


  return (
    <section className={`${styles.container} pt-10`}>
      <h1 className={`text text_type_main-large mb-5`}>Соберите бургер</h1>
      <Tabs tabData={tabData} onTabClick={scrollToHeader} />

      <div ref={containerRef} className={`${styles.ingredients} `}>

        <div className={`${styles.ingredientType} pt-6`}>
          <h2
            id={"Булки"}
            className={`text text_type_main-medium `}
            ref={bunRef}
          >Булки</h2>
          <div className={`${styles.ingredientContainer} `}>
            {data.map((item: Item) => {
              if (item.type === "bun") {
                return (
                  <Ingredient
                    key={item._id}
                    item={item}
                    onClick={() => handleIngredientDetails(item)}
                  />
                );
              }
            })}
          </div>
        </div>

        <div className={`${styles.ingredientType} pt-6`}>
          <h2
            id={"Соусы"}
            className={`text text_type_main-medium `}
            ref={sauceRef}
          >Соусы</h2>
          <div className={`${styles.ingredientContainer} `}>
            {data.map((item: Item) => {
              if (item.type === "sauce") {
                return (
                  <Ingredient
                    key={item._id}
                    item={item}
                    onClick={() => handleIngredientDetails(item)}
                  />
                );
              }
            })}
          </div>
        </div>

        <div className={`${styles.ingredientType} pt-6`}>
          <h2
            id={"Начинки"}
            className={`text text_type_main-medium `}
            ref={mainRef}
          >Начинки</h2>
          <div className={`${styles.ingredientContainer} `}>
            {data.map((item: Item) => {
              if (item.type === "main") {
                return (
                  <Ingredient
                    key={item._id}
                    item={item}
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

