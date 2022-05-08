import * as _ from '../source/scripts/common.js';

describe('common functions', () => {
    it.each([
        ['position equal to object position', 10, 10, 0],
        ['position negative to object position', -10, 0, -10],
        ['position positive to object position', 0, -10, 10],
    ])('difference: %s', (testName, position1, position2, expected) => {
        const result = _.difference(position1, position2);
        expect(result).toEqual(expected);
    });

    it.each([
        ['outside as negative', -11, false],
        ['outside as positive', 11, false],
        ['inside as negative', -10, true],
        ['inside as positive', 10, true],
        ['inside as zero', 0, true],
    ])('isNextTo: is %s', (testName, value, expected) => {
        const result = _.isNextTo(value);
        expect(result).toBe(expected);
    });

    it.each([
        ['object position is left & above', { x: 90, y: 90 }, true],
        ['object has equal position', { x: 100, y: 100 }, true],
        ['object position is right & below', { x: 110, y: 110 }, true],
        ['object position X is too left', { x: 80, y: 90 }, false],
        ['object position Y is too high', { x: 90, y: 80 }, false],
        ['object position X is too right', { x: 120, y: 110 }, false],
        ['object position Y is too low', { x: 110, y: 120 }, false],
        ['object position is missing', {}, false],
    ])('withinArea: %s', (testName, object, expected) => {
        const result = _.withinArea(100, 100, object);
        expect(result).toBe(expected);
    });

    it.each([
        ['object has equal position', { x: 100, y: 100 }, true],
        ['object position X is too left', { x: 90, y: 100 }, false],
        ['object position Y is too high', { x: 100, y: 90 }, false],
        ['object position X is too right', { x: 110, y: 100 }, false],
        ['object position Y is too low', { x: 100, y: 110 }, false],
        ['object position is missing', {}, false],
    ])('isTouching: %s', (testName, object, expected) => {
        const result = _.isTouching(100, 100, object);
        expect(result).toBe(expected);
    });

    it.each([
        ['stage size - object size', -10, 300],
        ['start value of stage', 310, 0],
        ['original value - 0', 0, 0],
        ['original value - 300', 300, 300],
    ])('restrict: returns %s', (testName, value, expected) => {
        const result = _.restrict(value);
        expect(result).toBe(expected);
    });
});
