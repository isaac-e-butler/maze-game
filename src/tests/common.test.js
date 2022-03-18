import * as common from '../scripts/common';

describe('common functions', () => {
    const diffCases = [
        ['position equals to object position', 10, 10, 0],
        ['position negative to object position', -10, 0, -10],
        ['position positive to object position', 0, -10, 10],
    ];
    it.each(diffCases)('x_diff: %s', (testName, num1, num2, expected) => {
        const result = common.x_diff(num1, { x: num2 });
        expect(result).toEqual(expected);
    });
    it.each(diffCases)('y_diff: %s', (testName, num1, num2, expected) => {
        const result = common.y_diff(num1, { y: num2 });
        expect(result).toEqual(expected);
    });
    it.each([
        ['outside as negative', -11, false],
        ['outside as positive', 11, false],
        ['inside as negative', -10, true],
        ['inside as positive', 10, true],
        ['inside as zero', 0, true],
    ])('within: is %s', (testName, value, expected) => {
        const result = common.within(value);
        expect(result).toBe(expected);
    });
    it.each([
        ['stage size minus object size', -10, 300],
        ['the original value - 0', 0, 0],
        ['the original value - 310', 300, 300],
    ])('restrictNegative: returns %s', (testName, value, expected) => {
        const result = common.restrictNegative(value);
        expect(result).toBe(expected);
    });
    it.each([
        ['the start value of stage - 0', 310, 0],
        ['the original value - 0', 0, 0],
        ['the original value - 310', 300, 300],
    ])('restrictPositive: returns %s', (testName, value, expected) => {
        const result = common.restrictPositive(value);
        expect(result).toBe(expected);
    });
});
