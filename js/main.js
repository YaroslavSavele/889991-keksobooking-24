//import {generateAdvertisement, createAdvertisements} from './data.js';
import {getData } from './api.js';
import {makesFormsInactive, validateForm, setUserFormSubmit} from './forms.js';
import {createMap, getMainMarker,  showAddress, generatePins} from './map.js';


const ADVERTISEMENTS_COUNT = 10;

makesFormsInactive();
validateForm();
const map = createMap();

const mainPinMarker = getMainMarker();
mainPinMarker.addTo(map);
showAddress(mainPinMarker);

getData((advertisements) => {
  generatePins(advertisements.slice(0, ADVERTISEMENTS_COUNT), map);
});

setUserFormSubmit(mainPinMarker, map);

