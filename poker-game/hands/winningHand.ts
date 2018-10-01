import Hand from './hand.js';
import Card from '../card.js';
import { HandRank } from '../constants.js';

// A hand consist of the cards the player is holding + the cards on board
// Which equals to 7 cards.
// A winning hand is the best possible combination of 5 cards from those 7 cards
export default class WinningHand extends Hand{

    constructor(cards: Card[], public rank: HandRank) {
        
        // passed in cards to the super, instead of setting cards after

        super(cards);
    }

    // If a hand has a rank of PAIR
    // we need to be able to compare it with another
    // winning hand that is also pair. Thus we need additional information,
    // like the high card, etc.
    // We will total 6 ranks
    calculateRanks(rank: HandRank){
        // TODO
    }
}