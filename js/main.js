
import {getData } from './api.js';
import {makesFormsInactive, validateForm, setUserFormSubmit, makesFiltersInactive} from './forms.js';
import {createMap, getMainMarker,  showAddress, generatePins} from './map.js';
import {debounce} from './util.js';
import {
  setTypeSelect,
  setPriceSelect,
  setRoomsSelect,
  setGuestsSelect,
  setFeaturessSelect
} from './filters.js';

const RERENDER_DELAY = 500;

makesFormsInactive();
makesFiltersInactive();
validateForm();
const map = createMap();

const mainPinMarker = getMainMarker();
mainPinMarker.addTo(map);
const markersGroup = L.layerGroup().addTo(map);
showAddress(mainPinMarker);

getData((advertisements) => {
  generatePins(advertisements, map, markersGroup);
  setTypeSelect(debounce(() => generatePins(advertisements, map, markersGroup), RERENDER_DELAY));
  setPriceSelect(debounce(() => generatePins(advertisements, map, markersGroup), RERENDER_DELAY));
  setRoomsSelect(debounce(() => generatePins(advertisements, map, markersGroup), RERENDER_DELAY));
  setGuestsSelect(debounce(() => generatePins(advertisements, map, markersGroup), RERENDER_DELAY));
  setFeaturessSelect(debounce(() => generatePins(advertisements, map, markersGroup), RERENDER_DELAY));
});

setUserFormSubmit(mainPinMarker, map);
