import * as main from '../steps/main.step.js';

describe('player movement', () => {
    it('load level', () => {
        main.load();
        expect(true).to.equal(true);
    });
});
