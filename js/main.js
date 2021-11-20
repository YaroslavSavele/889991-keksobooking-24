
import { getData } from './api.js';
import { makesFormsInactive, validateForm, setUserFormSubmit, makesFiltersInactive } from './forms.js';
import { createMap, getMainMarker, showAddress, generatePins, setFilterFormChange } from './map.js';
import { debounce } from './util.js';
import {insertImages} from './images.js';
const RERENDER_DELAY = 500;

makesFormsInactive();
makesFiltersInactive();
insertImages();
validateForm();
const map = createMap();

const mainPinMarker = getMainMarker();
mainPinMarker.addTo(map);
const markersGroup = L.layerGroup().addTo(map);
showAddress(mainPinMarker);

getData((advertisements) => {
  generatePins(advertisements, markersGroup);
  setFilterFormChange(debounce(() => generatePins(advertisements, markersGroup), RERENDER_DELAY));
});

setUserFormSubmit(mainPinMarker, map, markersGroup);

