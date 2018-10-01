export enum Suit {
    HEART,
    SPADE,
    DIAMOND,
    CLUB
}

export enum Rank {
    TWO,
    THREE,
    FOUR,
    FIVE,
    SIX,
    SEVEN,
    EIGHT,
    NINE,
    TEN,
    JACK,
    QUEEN,
    KING,
    ACE
}

export enum HandRank {
    HIGH_CARD,
    PAIR,
    DOUBLE_PAIR,
    SET, // Also called three of a kind
    STRAIGHT,
    FLUSH,
    FULL_HOUSE,
    FOUR_OF_A_KIND,
    STRAIGHT_FLUSH,
    ROYAL_FLUSH, 
    /* Having a separate Royal flush is probably not necessary, 
    since it's the highest straight flush, but it's probably nice for 
    labeling purposes in an expanded version of this. */
}