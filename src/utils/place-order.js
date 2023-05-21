
import { checkReponse } from "./check-response.js";

export const placeOrder = (url, currentIngredients) => {
  if (currentIngredients.bun && currentIngredients.ingredients.length > 0) {
    const ingredients = currentIngredients.ingredients.map((item) => item._id);
    const body = {
      ingredients: [...ingredients, currentIngredients.bun._id],
    };

    return fetch(`${url}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then(checkReponse)
      .then((data) => {
        return data.order.number;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  }
};
