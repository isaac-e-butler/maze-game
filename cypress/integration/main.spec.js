import * as startup from './steps/startup.steps.js';

before(() => {
    startup.shouldLoad();
});

describe('player', () => {
    it('movement', () => {});
});
