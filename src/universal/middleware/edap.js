
// Responds to TRIGGER_EDAP_EVENT action
function triggerEdapEvent(store, action = {payload: {eventName: '', eventData: {}, options: {}}}) {
    if (typeof window === 'undefined') {
        return;
    }

    const {payload} = action;

    window.edap.push((edapInstance) => {
        edapInstance.trigger(payload.eventName, payload.eventData, payload.options);
    });
}

// responds to TRIGGER_EDAP_PAGEVIEW action
function triggerEdapPageView() {
    if (typeof window === 'undefined') {
        return;
    }

    window.edap.push((edapInstance) => {
        edapInstance.trigger('pageview');
    });
}

export {triggerEdapPageView, triggerEdapEvent};
