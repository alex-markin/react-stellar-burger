import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components"; // импорт компонентов из библиотеки Яндекс.Практикум
import React from 'react';
import { useSelector, useDispatch } from "react-redux"; // импорт хука редакса
import styles from "./draggable-ingredient.module.css";
import { useDrag } from 'react-dnd'; // импорт хука для перетаскивания




function DraggableIngredient({ item, handleClose, index }) {


  const [{ isDragging }, dragRef] = useDrag({
    type: "ingredient",
    item: ({ item, index, source: "draggedIngredient" }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <li className={styles.listElement} ref={dragRef}>
      <DragIcon type="primary" />
      <ConstructorElement
        isLocked={false}
        type="undefined"
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => handleClose(item)}
      />
    </li>
  );
}

export default DraggableIngredient;
