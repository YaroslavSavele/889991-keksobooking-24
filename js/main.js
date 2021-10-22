import {createAdvertisements} from './data.js';
import {renderCards} from './elements.js';


const ADVERTISEMENTS_COUNT = 1;
const similarAdvertisements = createAdvertisements(ADVERTISEMENTS_COUNT);

const cards = renderCards(similarAdvertisements);
const mapCanvas = document.querySelector('#map-canvas');
mapCanvas.appendChild(cards);
