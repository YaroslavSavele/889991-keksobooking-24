import {createAdvertisements} from './data.js';
import {generatePins} from './elements.js';


const ADVERTISEMENTS_COUNT = 10;
const similarAdvertisements = createAdvertisements(ADVERTISEMENTS_COUNT);

const pins = generatePins(similarAdvertisements);
const mapCanvas = document.querySelector('#map-canvas');
mapCanvas.appendChild(pins.firstChild);
