import { Card } from '../public/build/card.js';
import { Rank, Suit } from '../public/build/constants.js';
import chai from 'chai';
let should = chai.should();

describe('Cards', function() {

  it('should make a new card given a rank and suit', function(done) {
    console.log("test " + Card);
    var testCard = new Card(Rank.FIVE, Suit.HEARTS);
    testCard.should.be.a("object");
    testCard.should.have.property('rank');
    testCard.rank.should.be.a("number");
    done();
  });
 
});
