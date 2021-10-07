import {createAdvertisement} from './util.js';

const ADVERTISEMENTS_COUNT = 10;

const advertisements = (count) => Array(count).fill(null).map(createAdvertisement);

advertisements(ADVERTISEMENTS_COUNT);
