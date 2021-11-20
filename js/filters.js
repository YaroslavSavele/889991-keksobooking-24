import { convertsNumberToValue } from './util.js';

const filterRules = {
  'housing-type': ({ offer }, filter) => filter.value === 'any' || offer.type === filter.value,

  'housing-price': ({ offer }, filter) => filter.value === 'any' || convertsNumberToValue(offer.price) === filter.value,

  'housing-rooms': ({ offer }, filter) => filter.value === 'any' || offer.rooms === Number(filter.value),

  'housing-guests': ({ offer }, filter) => filter.value === 'any' || offer.guests === Number(filter.value),

  'housing-features': ({ offer }, filter) => {
    const checkListElements = Array.from(filter.querySelectorAll('input[type="checkbox"]:checked'));
    if (checkListElements.length === 0) {
      return true;
    }
    if (offer.features !== undefined) {
      return checkListElements.every((checkListElement) => offer.features.some((feature) => feature === checkListElement.value));
    } else {
      return false;
    }
  },
};

export {
  filterRules
};
