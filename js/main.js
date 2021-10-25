import {generateAdvertisement} from './data.js';
import {renderCard} from './elements.js';
import {makesFormsInactive, makesFormsActive} from './form.js';


const advertisement = generateAdvertisement();
const card = renderCard(advertisement);
const mapCanvas = document.querySelector('#map-canvas');
mapCanvas.appendChild(card);

makesFormsInactive();
makesFormsActive();
