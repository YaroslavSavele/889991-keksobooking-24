import {generateAdvertisement, createAdvertisements} from './data.js';
import {makesFormsInactive, validateForm} from './forms.js';
import {createMap, getMainMarker,  showAddress, generatePins} from './map.js';

const ADVERTISEMENTS_COUNT = 10;

const advertisement = generateAdvertisement();
const advertisements = createAdvertisements(ADVERTISEMENTS_COUNT);
makesFormsInactive();
validateForm();
const map = createMap();

const mainPinMarker = getMainMarker();
mainPinMarker.addTo(map);
showAddress(mainPinMarker);
generatePins(advertisements, map);


