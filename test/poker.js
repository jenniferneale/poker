var Card = require('../public/build/card.js');
let Constants = require('../public/build/constants.js');
let chai = require('chai');
let should = chai.should();

describe('Cards', function() {

  it('should make a new card given a rank and suit', function(done) {
      console.log("test " + Object.values(Card));
    let testCard = new Card(Constants.Rank.FIVE, Constants.Suit.HEARTS);
    testCard.should.be.a("object");
    testCard.should.have.property('rank');
    testCard.rank.should.be.a("number");
  });
 
});
