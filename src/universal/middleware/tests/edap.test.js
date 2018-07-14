import sinon from 'sinon';
import {triggerEdapEvent, triggerEdapPageView} from '../edap.js';

describe('universal/middleware/edap.js', () => {
    it('triggerEdapEvent: triggers an edap event', () => {
        const trigger = sinon.stub();
        global.window = {
            edap: {
                push(cb) {
                    cb({trigger});
                }
            }
        };
        triggerEdapEvent();
        sinon.assert.called(trigger);
        delete global.window;
    });

    it('triggerEdapEvent: if window is undefined, doesnt trigger an event', () => {
        triggerEdapEvent();
    });

    it('triggerEdapPageView: triggers an edap pageview event', () => {
        const trigger = sinon.stub();
        global.window = {
            edap: {
                push(cb) {
                    cb({trigger});
                }
            }
        };
        triggerEdapPageView();
        sinon.assert.calledWith(trigger, 'pageview');
        delete global.window;
    });

    it('triggerEdapPageView: if window is undefined, doesnt trigger an event', () => {
        triggerEdapPageView();
    });
});