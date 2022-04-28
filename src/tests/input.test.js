import { jest } from '@jest/globals';
import * as input from '../scripts/input.js';
import { objectData } from '../scripts/object-data.js';

beforeEach(() => {
    jest.clearAllMocks();
    input.setup();
});

describe('input functions', () => {
    input.list.map((inputEvent) => {
        document.body.innerHTML += `<button id='${inputEvent.code}'></button>`;
    });

    describe('setup', () => {
        const keyDown = new Event('keydown');
        const keyUp = new Event('keyup');

        objectData.player.object = {
            handleInput: jest.fn(),
        };

        it('onmousedown', () => {
            input.list.map((inputEvent) => {
                inputEvent.btn.onmousedown();

                const event = objectData.player.object.handleInput.mock.lastCall[0];
                expect(event.code).toBe(inputEvent.code);
                expect(event.type).toBe('keydown');
            });

            expect(objectData.player.object.handleInput.mock.calls.length).toBe(
                input.list.length
            );
        });

        it('onmouseup', () => {
            input.list.map((inputEvent) => {
                inputEvent.btn.onmouseup();

                const event = objectData.player.object.handleInput.mock.lastCall[0];
                expect(event.code).toBe(inputEvent.code);
                expect(event.type).toBe('keyup');
            });

            expect(objectData.player.object.handleInput.mock.calls.length).toBe(
                input.list.length
            );
        });

        it('keydown', () => {
            document.dispatchEvent(keyDown);

            expect(objectData.player.object.handleInput.mock.calls.length).toBe(1);
        });

        it('keyup', () => {
            document.dispatchEvent(keyUp);

            expect(objectData.player.object.handleInput.mock.calls.length).toBe(1);
        });
    });

    it('getBtn', () => {
        input.list.map((inputEvent) => {
            const result = input.getBtn(inputEvent.code);
            const expected = inputEvent.btn;
            expect(result).toBe(expected);
        });
    });
});
