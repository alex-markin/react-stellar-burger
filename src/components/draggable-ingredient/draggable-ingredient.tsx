// импорт библиотек и внешних компонентов
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components"; // импорт компонентов из библиотеки Яндекс.Практикум


// импорт хуков
import { useDrag, useDrop } from 'react-dnd'; // импорт хука для перетаскивания
import { useRef } from 'react';

// импорт стилей
import styles from "./draggable-ingredient.module.css";

// импорт типов
import { Item } from '../../utils/types';

type DraggableIngredientProps = {
  item: Item;
  handleClose: (item: Item) => void;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  uuid?: string;
}


export default function DraggableIngredient({ item, handleClose, index, moveCard, uuid }: DraggableIngredientProps) {

  const ref = useRef<HTMLLIElement>(null);

  // функционал смены ингредиентов местами
  const [{ isDragging }, drag] = useDrag({
    type: "draggedIngredient",
    item: () => {
      return { item, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ handlerId }, drop] = useDrop({
    accept: "draggedIngredient",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: Item, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect: DOMRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset: null | { x: number; y: number } = monitor.getClientOffset()
      const hoverClientY: number = clientOffset && hoverBoundingRect
        ? clientOffset.y - hoverBoundingRect.top
        : 0;


      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      moveCard(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  drag(drop(ref))

  //  определение стилей для перетаскиваемого ингредиента
  const listElementStyle = isDragging ? `${styles.listElement} ${styles.isDragging}` : `${styles.listElement}`;


  return (
    <li className={listElementStyle} ref={ref}>
      <DragIcon type="primary" />
      <ConstructorElement
        isLocked={false}
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => handleClose(item)}
      />
    </li>
  );
}

