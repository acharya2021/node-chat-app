const expect = require('expect');

// import isRealString
const {isRealString} = require('./validation');

// describe isRealString
describe("isRealString", () => {
    it("should reject non-string values", () => {
        expect(isRealString(123)).toBe(false);
    });

    it("should reject strings with only spaces", () => {
        expect(isRealString('   ')).toBe(false);
    });

    it("should allow strings with non-space characters", () => {
        expect(isRealString('  ab  ')).toBe(true);
    });
});

