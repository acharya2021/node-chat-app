// to make our assertions about the returning value
var expect = require('expect');

var {generateMessage, generateLocationMessage} = require("./message");

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

describe('generateLocationMessage', () => {
    it('should generate the correct location object', () => {

        var from = "Admin";
        var latitude = 123;
        var longitude = 456;
        var url = `https://www.google.com/maps?q=${latitude},${longitude}`;

        var message = generateLocationMessage(from, latitude, longitude);

        // make our assertions
        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, url});
    });
});