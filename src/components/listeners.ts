import events, { IMessage, owner } from "../settings/events";

function listenToTab(tabId: number, changeInfo: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) {
    if (changeInfo.status === 'complete') {
        const message: IMessage = {
            from: owner.popup,
            event: events.system.attached,
            payload: tabId
        }

        chrome.tabs.sendMessage(tabId, message)
    }
}

function attachListener(listenFor: string, callback: Function = (message: IMessage) => { }) {
    chrome.runtime.onMessage.addListener(message => {
        if (message.owner === listenFor) {
            callback(message)
        }
    })
}

export { listenToTab }