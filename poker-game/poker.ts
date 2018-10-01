import { Suit, Rank, HandRank } from './constants.js';
import Card from './card.js';
import Hand from './hands/hand.js';

let testCard = new Card(Rank.EIGHT, Suit.CLUB);

console.log("test: " + testCard);
