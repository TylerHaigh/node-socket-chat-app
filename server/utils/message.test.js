var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

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


describe('generateLocationMessage', () => {

    it('should generate a location message', () => {
        var res = generateLocationMessage('John', -32, 150);

        expect(res).toInclude({
            from: 'John',
            url: 'https://www.google.com/maps?q=-32,150'
        });

        expect(res.createdAt).toExist().toBeA('number');

    });

});