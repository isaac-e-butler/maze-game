import * as startup from './steps/startup.steps.js';
import { keyPress, code } from './steps/input.steps.js';

before(() => {
    startup.shouldLoad();
});

describe('player', () => {
    it('position rounding', () => {
        keyPress(code.action2, 1, false);
        keyPress(code.action2, 1, false);

        keyPress(code.left, 31);
        keyPress(code.up, 31);
    });

    it('position gets blocked', () => {
        keyPress(code.up);
        keyPress(code.left);

        keyPress(code.up);
        keyPress(code.left);

        keyPress(code.right, 3);
        keyPress(code.up);

        keyPress(code.down, 3);
        keyPress(code.right);

        keyPress(code.left, 3);
        keyPress(code.down);

        keyPress(code.up);
        keyPress(code.right);
    });
});
