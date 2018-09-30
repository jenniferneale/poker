import { Suit, Rank, HandRank } from './constants.js';
import { Card } from './card.js';

/*
// the Hand class contains the player cards + board cards.
export class Hand {
    public cards: Card[] = [];
    // those two are used when evaluating a hand
    // take a look at evaluate hand for more details
    public suits: Card[][] = new Array(4).fill(0).map(_ => []);
    public ranks: Card[][] = new Array(13).fill(0).map(_ => []);

    constructor(cards: Card[] = []) {
        cards.forEach(card => this.addCard(card));
    }

    addCard(card: Card): Hand {
        if (this.cards.length > 7)
            throw Error('Hand containing board card must have max 7 cards. This is Hold\'em');
        // precautious check to see that we can actually add the card (there shouldn't be two Ad in a deck for example)
        if (this.cards.some(c => c.toString() === card.toString()))
            throw Error('This card has already been added to this hand!');

        this.cards.push(card);
        // we are adding the suit and ranks to their respective array so we can easily
        // evaluate those.
        this.suits[card.suit].push(card);
        this.ranks[card.rank].push(card);
        return this;
    }

    evaluateHand() {
        // in hold'em poker there is 5 cards on board + 2 cards in hand.
        // for convenience, the Hand class contains the board cards as well
        if (this.cards.length < 7)
            throw new Error('When evaluating a hand, the hand must have 7 cards');

    }

    hasRank(rank: Rank) {
        return this.ranks[rank].length > 0;
    }

    // gives back a string representation of the hand of the form: 7d 6h 8s Js 9s Td As
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

export class HandEvaluator {

    evaluateHand(hand: Hand): WinningHand {
        let winningCards: Card[] | undefined;
        if (winningCards = this.evaluateRoyalFlush(hand))
            return new WinningHand(winningCards, HandRank.ROYAL_FLUSH);
        if (winningCards = this.evaluateStraightFlush(hand))
            return new WinningHand(winningCards, HandRank.STRAIGHT_FLUSH);
        else if (winningCards = this.evaluateFourOfAKind(hand))
            return new WinningHand(winningCards, HandRank.FOUR_OF_A_KIND);
        else if (winningCards = this.evaluateFullHouse(hand))
            return new WinningHand(winningCards, HandRank.FULL_HOUSE);
        else if (winningCards = this.evaluateFlush(hand))
            return new WinningHand(winningCards, HandRank.FLUSH);
        else if (winningCards = this.evaluateStraight(hand))
            return new WinningHand(winningCards, HandRank.STRAIGHT);
        else if (winningCards = this.evaluateSet(hand))
            return new WinningHand(winningCards, HandRank.SET);
        else if (winningCards = this.evaluateDoublePair(hand))
            return new WinningHand(winningCards, HandRank.DOUBLE_PAIR);
        else if (winningCards = this.evaluatePair(hand))
            return new WinningHand(winningCards, HandRank.PAIR);
        else
            return new WinningHand(this.findHighests(5, hand.cards), HandRank.HIGH_CARD);
    }

    evaluateRoyalFlush(hand: Hand): Card[] | undefined {
        const straightFlush = this.evaluateStraightFlush(hand);
        if (straightFlush) {
            const sfHand = new Hand(straightFlush);
            if (sfHand.hasRank(Rank.ACE) && sfHand.hasRank(Rank.KING))
                return sfHand.cards;
        }
    }

    evaluateStraightFlush(hand: Hand): Card[] | undefined {
        let flush: any = this.evaluateFlush(hand, 7);
        let straightFlush;
        if (flush) {
            straightFlush = this.evaluateStraight(new Hand(flush));
        }
        return straightFlush;
    }

    // returns the biggest flush in a Hand
    evaluateFlush(hand: Hand, amount: number = 5): Card[] | undefined {
        // we need to remove other cards
        // originally the Suit is an enum but it's converted to a number
        // by typescript under the hood
        const flushCards = hand.suits.find( cardArr => cardArr.length >= 5);
        if (flushCards)
            return this.findHighests(amount, flushCards);
    }


    evaluateStraight(hand: Hand): Card[] | undefined {
        let consecutives: Card[] = [];
        const length = hand.ranks.length;
        // for A2345 we put the A already in the consecutive array
        if (hand.hasRank(Rank.ACE))
            consecutives.push(hand.ranks[Rank.ACE][0])

        // we loop through each rank in hand, if we find a group of card
        // we push the first one of the group into consecutives
        // if there is no card at said rank we reset consecutives.
        for (let i = 0; i < length; i++) {
            // we are only sure there is at least one card at that rank
            if (hand.hasRank(i))
                consecutives.push(hand.ranks[i][0]);
            else
                consecutives = [];
            // if we have 5 consecutives cards we still need to check
            // that there isn't anymore after
            if (consecutives.length >= 5) {
                const nextCards = hand.ranks[i + 1];
                if (nextCards && nextCards.length === 0) {
                    break;
                }
            }
        }
        if (consecutives.length >= 5)
            return consecutives.reverse().slice(0, 5);
    }

    evaluateFullHouse(hand: Hand): Card[] | undefined {
        const set = this.findHighestArr(3, hand);
        if (set){
            const pair = this.findHighestArr(2, hand, set[0]);
            if (pair)
                return [...set, ...pair];
        }
    }

    evaluateFourOfAKind(hand: Hand): Card[] | undefined {
        const four = hand.ranks.find(cardArr => cardArr.length === 4);
        if (four) {
            four.push(...this.findHighests(1, hand.cards, four));
            return four;
        }
    }

    evaluateSet(hand: Hand): Card[] | undefined {
        const set = this.findHighestArr(3, hand);
        if (set) {
            set.push(...this.findHighests(2, hand.cards, set));
            return set;
        }
    }

    evaluateDoublePair(hand: Hand): Card[] | undefined {
        const pair1 = this.findHighestArr(2, hand);
        let pair2;
        if (pair1)
            pair2 = this.findHighestArr(2, hand, pair1[0]);
        if (pair1 && pair2){
            const combination = [ ...pair1, ...pair2 ];
            return [...combination, ...this.findHighests(1, hand.cards, combination)]
        }
    }

    evaluatePair(hand: Hand): Card[] | undefined {
        const pair = this.findHighestArr(2, hand);
        if (pair) {
            pair.push(...this.findHighests(3, hand.cards, pair));
            return pair;
        }
    }

    findHighestArr(length: number, hand: Hand, omitted?: Card): Card[] | undefined {
        let ranksReverse = [...hand.ranks].reverse();
        // omit the ones we don't want by checking omitted rank and rank.firstcard.rank
        if (omitted)
            ranksReverse = ranksReverse.filter(arr => arr[0] && arr[0].rank !== omitted.rank);
        const set = ranksReverse
            .find(arr => arr.length >= length);
        if (set)
            return set.slice(0, length);
    }

    // get x highest number of cards
    findHighests(amount: number, cards: Card[] = [], omitted: Card[] = []): Card[] {
        // !~indexOf = not found
        const relevant =  (cards.filter(c => !~omitted.indexOf(c)) as Card[])
            .sort(Card.sortFn);
        return relevant.slice(0, amount);
    }
}

// A hand consist of the cards the player is holding + the cards on board
// Which equals to 7 cards.
// A winning hand is the best possible combination of 5 cards from those 7 cards
export class WinningHand extends Hand{

    constructor(cards: Card[], public rank: HandRank) {
        super();
        super.cards = cards;
    }

    // If a hand has a rank of PAIR
    // we need to be able to compare it with another
    // wining hand that is also pair. Thus we need additional information,
    // like the high card, etc.
    // We will total 6 ranks
    calculateRanks(rank: HandRank){
        // TODO
    }
}*/

let testCard = new Card(Rank.EIGHT, Suit.CLUB);

console.log("test2" + Suit.CLUB + "-" + testCard + "  " + Object.keys(Rank) + "  " + Card.fromString("FOUR-HEARTS") + " " + (typeof testCard.rank == typeof Rank.EIGHT));
