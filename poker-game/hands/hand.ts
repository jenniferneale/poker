import { Rank, HandRank } from '../constants.js';
import Card from '../card.js';

// the Hand class contains the player cards + board cards.
export default class Hand {
    public cards: Card[] = [];
    // those two are used when evaluating a hand
    // take a look at evaluate hand for more details
    // 2-dimensional arrays to list how many of each kind we have
    public suits: Card[][] = new Array(4).fill(0).map(_ => []);
    public ranks: Card[][] = new Array(13).fill(0).map(_ => []);

    constructor(cards: Card[] = []) {
        cards.forEach(card => this.addCard(card));
    }

    get getCards() {
        return this.cards;
    }

    addCard(card: Card): Hand {
        if (this.cards.length > 7)
            throw Error('Hand containing board card must have max 7 cards. This is Hold\'em');
        // cautious check to see that we can actually add the card (there shouldn't be two ACE-DIAMOND in a deck for example)
        if (this.cards.some(c => c.toString() === card.toString()))
            throw Error('This card has already been added to this hand!');

        this.cards.push(card);
        // we are adding the suit and ranks to their respective array so we can easily
        // evaluate those.
        this.suits[card.suit].push(card);
        this.ranks[card.rank].push(card);
        return this;
    }

    /* I removed evaluateHand from the Hand class so as to 
        avoid circular references, and to have just one 
        location for the evaluateHand function (in HandEvaluator).
    */

    // Check if hand contains one or more of the given Rank
    hasRank(rank: Rank) {
        return this.ranks[rank].length > 0;
    }

    // gives back a string representation of the hand of the form: 
    // SEVEN-DIAMOND SIX-HEART EIGHT-SPADE JACK-SPADE NINE-DIAMOND TEN-DIAMOND ACE-SPADE
    toString() {
        return this.cards.toString().replace(/,/g, ' ');
    }

    static fromString(str: String): Hand {
        const hand = new Hand();
        const cardsStr = str.split(' ');
        cardsStr.forEach(cardStr => {
            const card = Card.fromString(cardStr);
            hand.addCard(card);
        });
        return hand;
    }
}