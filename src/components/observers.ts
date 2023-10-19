import { AppDispatch } from "store/store"
import ObserveAts from "./features/ats/ats.callback"
import ObserveTip from "./features/tips/tip.callback"

type isUsernameCallback<Type> = (arg: Type) => void

type obsChatCallback = (node: Node, username: string, dispatch: AppDispatch) => void

/**
 * Watches for the lobby node. Fires the callback and disconnects itself when found
 * @param mutations     List of mutations containing records of added/removed nodes
 * @param obs           Observer to disconnect if supplied needle is found
 */
function observeLobby(mutations: MutationRecord[], obs: MutationObserver, callback: Function) {
    mutations.forEach((mutation) => {
        if (mutation.attributeName == 'style') {
            const node = mutation.target as HTMLElement
            // Fire the callback when the channel selector changes to hidden
            if (node.style.display == 'none') {
                callback()
                obs.disconnect()
            }
        }
    })
}

/**
 * Executes callbacks when a user joins / leaves chat
 * @param mutations             List of mutations containing records of added/removed nodes
 * @param isOnlineCallback      Callback of what to do when the user enters
 * NOTE: Site rebuilds the node list every time. It's either on interval or whenever someone joins / leaves...
 * NOTE: Site Rollcall users do not match up with chat displayed users. Cannot find element attribute to correlate...
 * NOTE: Solely using this for online count...
 */
function observeUserStatus(mutations: MutationRecord[], isOnlineCallback: isUsernameCallback<Set<string>>){
    let online = new Set<string>()
    for (const mutation of mutations) {
        for (let i = 0; i < mutation.addedNodes.length; i++)
        {
            const node = mutation.addedNodes[i] as HTMLElement
            const username = node.id
            if (username) {
                online.add(username)
            }
        }
    }

    isOnlineCallback(online)
}

/**
 * Observes the chat node for added/removed nodes (tips, user chat text, etc)
 * @param mutations     List of mutations containing records of added/removed nodes
 * @param username      Username of the current user
 * @param dispatch      Whether or not the current user is the host
 */
function observeChat(mutations: MutationRecord[], username: string, dispatch: AppDispatch) {
    for (const mutation of mutations) {
        for (let i = 0; i < mutation.addedNodes.length; i++)
        {
            ObserveTip(mutation.addedNodes[i], username, dispatch)
            ObserveAts(mutation.addedNodes[i], username, dispatch)
        }
    }
}

/**
 * Disconnect supplied observers
 * @param observers     Array of observers to disconnect
 */
function unmount(observers: MutationObserver[]) {
    for (const observer of observers) {
        observer?.disconnect()
    }
}

export { observeChat, observeUserStatus, unmount, observeLobby, obsChatCallback }