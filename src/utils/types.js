import PropTypes from "prop-types";

const ingredientPropTypes = PropTypes.shape({
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  calories: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  image_large: PropTypes.string,
  image_mobile: PropTypes.string,
  price: PropTypes.number.isRequired,
  type: PropTypes.oneOf(["bun", "sauce", "main"]).isRequired,
  _id: PropTypes.string.isRequired,
  _v: PropTypes.number,
});

export default ingredientPropTypes;
