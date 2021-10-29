import {generateAdvertisement} from './data.js';
import {renderCard} from './card.js';
import {makesFormsInactive, makesFormsActive, validateTitle, validateCountGuest, validatePrice, synchronizesTime} from './forms.js';


const advertisement = generateAdvertisement();
const card = renderCard(advertisement);
const mapCanvas = document.querySelector('#map-canvas');
mapCanvas.appendChild(card);

makesFormsInactive();
makesFormsActive();
validateTitle();
validatePrice();
validateCountGuest();
synchronizesTime();
