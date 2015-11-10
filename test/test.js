var assert = require('assert'),
    magicStatus = require('../index'),
    testStatus;

describe('magicStatus', function() {
  describe('creates a status object with properties passed', function () {
    it('should create a status object that calls callback with updates in a throttled manner', function (done) {
      var updateCalledTimes = 0,
          previousTime,
          delay = 100;
      
      testStatus = magicStatus( {
        foo: 'bar',
        baz: 2
      }, onUpdate, delay );

      assert( testStatus.foo === 'bar' );
      assert( testStatus.baz === 2 );

      testStatus.baz += 5;

      return;

      function onUpdate( status ){
        updateCalledTimes++;

        var updatedKeys = Object.keys( status.updated );

        if(updateCalledTimes === 1){
          previousTime = Date.now();

          assert( updatedKeys.length === 1 && updatedKeys[0] === 'baz' );
          assert( status.updated.baz === 7 );
          assert( status.values.baz === 7 );
          assert( status.values.foo === 'bar' );

          testStatus.baz++;
          testStatus.baz++;
          testStatus.foo = 'boo';

          return;
        }

        assert.equal( updatedKeys.length, 2);
        assert.equal( status.updated.baz, 9);
        assert.equal( status.values.baz, 9 );
        assert.equal( status.updated.foo, 'boo' );

        assert.equal( Date.now() - previousTime >= delay * 0.8, true );
        done();
      }

    });
  });
});
