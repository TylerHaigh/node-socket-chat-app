var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {

    it('should generate a message', () => {
        var res = generateMessage('John', 'Hi');

        expect(res).toInclude({
            from: 'John',
            text: 'Hi'
        });

        expect(res.createdAt).toExist().toBeA('number');

    });

});