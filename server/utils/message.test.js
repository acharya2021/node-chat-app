// to make our assertions about the returning value
var expect = require('expect');

var {generateMessage} = require("./message");

describe('generateMessage', () => {
    it('should generate the correct message object', () => {

        var from = "Abhi";
        var text = "Hi there!";
        var message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({
            from,
            text
        });

    });
});