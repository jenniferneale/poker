import { Rank, Suit } from './constants.js';

export default class Card {

    /* Where possible, it's nice to have constants like suits and ranks defined in only one place. 
    The arrays defined here previously have the advantage of being short-hand names, but if we really 
    needed these, it would be preferable to include those as part of the suit and rank collection objects. 
    As it is, we're making this list every time we make a new card, which is redundant. */
    private static delim: string = "-";

    constructor(private _rank: Rank, private _suit: Suit) {
        // These checks might be better like Card.ranks.indexOf(this._rank) != -1, 
        // which is more precise, but this comparison works too.
        if (this._rank >= Object.keys(Rank).length / 2)
            throw Error('A rank must be 0 and 12. ( Ace to king)');
        if (this._suit >= Object.keys(Suit).length / 2)
            throw Error('A suit must be between 0 and 3 (h, s, d, c)')
    }

    toString() {
        return Rank[this._rank] + Card.delim + Suit[this._suit];
    }

    static sortFn(a: Card, b: Card) {
        return b.rank - a.rank;
    }

    get suit() {
        return this._suit;
    }

    get rank() {
        return this._rank;
    }

    // transform EIGHT-CLUB type of strings to a new Card
    static fromString(str: string) {
        let splits = str.split(Card.delim);
        if (splits.length !== 2)
            throw Error('Card length should be 2 words, delimited by -');
        // findIndex is a bit silly when we are using enums
        const rank: Rank = (<any>Rank)[splits[0]];
        const suit: Suit = (<any>Suit)[splits[1]];

        if (rank === -1 || suit === -1)
            throw Error(`Rank ${str[0]} or suit ${str[1]} was not found`);

        return new Card(rank, suit);
    }
}