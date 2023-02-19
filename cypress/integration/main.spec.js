import * as startup from './steps/startup.steps.js';
import { press, code } from './steps/input.steps.js';

before(() => {
    startup.shouldLoad();
});

describe('player', () => {
    it('movement', () => {});
});
