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
    // like the high card, etc. -----> Double Pair: Compare Pair1 rank, compare Pair2 rank, compare fifth card
    //                                 Pair: Compare Pair1 rank, compare highest card, compare next highest card, compare last card
    // We will total 6 ranks --------> I'm not sure what this means. Are there 6 players we're comparing?
    calculateRanks(rank: HandRank){
        /* Pairs are not the only hands that require additional information in event of a similar HandRank. 
            You could write additional comparison functions for each case, like the HandEvaluator, but that sounds dreadful. 
            A branching system or a point system might be a better bet, if that holds up. 
            Eg, x points for a flush, y points for a straight, points for k of a kind. 
            There are technically a finite number of card combinations, but it's more than you'd want to store 
            without a clever way to do it: 2,598,960, according to https://www.chemical-ecology.net/java/possible.htm
            */
    }
}