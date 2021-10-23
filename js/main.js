import {generateAdvertisement} from './data.js';
import {renderCard} from './elements.js';


const advertisement = generateAdvertisement();
const card = renderCard(advertisement);
const mapCanvas = document.querySelector('#map-canvas');
mapCanvas.appendChild(card);

