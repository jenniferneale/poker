import Card from '../public/build/card.js';
import Hand from '../public/build/hands/hand.js';
import { Rank, Suit } from '../public/build/constants.js';
import chai from 'chai';
import HandEvaluator from '../public/build/handEvaluator.js';
let should = chai.should();

describe('Cards', function() {

  it('should make a new card given a rank and suit', function(done) {
    let testCard = new Card(Rank.FIVE, Suit.HEARTS);
    testCard.should.be.a("object");
    testCard.should.have.property('rank');
    testCard.rank.should.be.a("number");
    done();
  });

  it('should make a new card given a string rank and suit', function(done) {
    let testCard = Card.fromString(Rank[Rank.FIVE] + "-" + Suit[Suit.CLUB]);
    testCard.rank.should.equal(Rank.FIVE);
    testCard.suit.should.equal(Suit.CLUB);
    done();
  });
 
});

describe('Hands', function() {

    it('should make a new hand given a list of cards', function(done) {
      let testHand = new Hand([
        new Card(Rank.FIVE, Suit.CLUB),
        new Card(Rank.ACE, Suit.HEART)
      ]);
      testHand.cards.length.should.equal(2);
      testHand.toString().should.equal(
        Rank[Rank.FIVE] + "-" + Suit[Suit.CLUB] + " " + 
        Rank[Rank.ACE] + "-" + Suit[Suit.HEART]);
      testHand.hasRank(Rank.ACE).should.be.true;
      testHand.hasRank(Rank.THREE).should.be.false;
      testHand.suits[Suit.HEART].length.should.equal(1);
      testHand.suits[Suit.SPADE].length.should.equal(0);
      done();
    });

    it('should make a new hand given a string list of cards', function(done) {
      let testString = "SEVEN-DIAMOND SIX-HEART EIGHT-SPADE JACK-SPADE NINE-DIAMOND TEN-DIAMOND ACE-SPADE";
      let testHand = Hand.fromString(testString);
      testHand.cards.length.should.equal(7);
      testHand.toString().length.should.equal(testString.length);
      testHand.hasRank(Rank.ACE).should.be.true;
      testHand.hasRank(Rank.THREE).should.be.false;
      testHand.suits[Suit.DIAMOND].length.should.equal(3);
      testHand.suits[Suit.CLUB].length.should.equal(0);
      done();
    })
});

describe('HandEvaluator', function() {

  it('should identify winning hands', function(done) {
    let testString = "SEVEN-DIAMOND SIX-HEART EIGHT-SPADE JACK-SPADE NINE-DIAMOND TEN-DIAMOND ACE-SPADE";
    let testHand = Hand.fromString(testString);
    let testEvaluator = new HandEvaluator();
    should.equal(testEvaluator.evaluateFourOfAKind(testHand), undefined);
    let straightTestResult = "JACK-SPADE TEN-DIAMOND NINE-DIAMOND EIGHT-SPADE SEVEN-DIAMOND";
    should.equal(new Hand(testEvaluator.evaluateStraight(testHand)).toString(), straightTestResult);
    should.equal(testEvaluator.evaluateHand(testHand).toString(), straightTestResult);
    done();
  })
})