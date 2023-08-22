
// тип для ингредиента
export type Item = {
  _id: string;
  name: string;
  type: 'bun' | 'main' | 'sauce';
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  [key: string]: any;
};

// тип для данных с сервера
export type Data = {
  data: Item[],
}


// тип для заказа
export type Order = {
  createdAt: string,
  ingredients: Array<string>,
  name: string,
  number: number,
  owner: {
    createdAt: string,
    email: string,
    name: string,
    uopdatedAt: string,
  },
  price: number,
  status: string,
  updatedAt: string,
  _id: string
}


// тип для текущих ингредиентов
export type CurrentIngredients = {
  bun: Item | null,
  ingredients: Item[],
}

// тип для пользователя
export type User = {
  email: string,
  name: string,
  password: string,
}