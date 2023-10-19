import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import settings from './settings/settings'
import { persistor } from './store/store'
import { observeLobby } from './components/observers'
import AppRouter from './app.router'
import { owner } from './settings/events'
import store from './store/store'
import { PersistGate } from 'redux-persist/integration/react'
import { Spinner } from 'react-bootstrap'

/**
 * Listen to the DOM until the necessary element exists and then start the content app
 */
function startEmbed() {
    const username = parseCurrentUser();
    
    if (!username)
    {
        console.warn("Extension disallowed as you are not the stream owner.")
        return
    }

    const streamer = parseStreamer();
    if (!streamer)
    {
        console.warn("Could not determine the current streamer. Extension will not load.")
        return
    }

    const obsConfig: MutationObserverInit = {
        attributes: true,
        attributeFilter: ['style']
    }

    const observer = new MutationObserver((mutations, observer) => {
        observeLobby(mutations, observer, () => {
            console.log(`Starting app as ${username}`)
            startApp(streamer, username)
        })
    })

    const obsTarget = document.getElementById(settings.element.lobby)
    if (!obsTarget) {
        return
    }

    observer.observe(obsTarget, obsConfig)
}

/**
 * Pull the username for this user in order to isolate operations.
 * @returns string of current extension user only if it matches the chatroom being entered
 */
function parseCurrentUser(): string {
    const field = document.getElementById(settings.element.username) as HTMLInputElement
    return field?.value?.toLowerCase() || '';
}

/**
 * Pull the streamer username from the URI parameters
 * @returns Username of the current streamer
 */
function parseStreamer(): string {
    const path = new URLSearchParams(window.location.search)
    return path?.get(settings.needle.streamer)?.toLowerCase() || ''
}

/**
 * Loading node to use in the persist gate on warmup
 * @returns Node to use for loading
 */
function loading() {
    return (
        <Spinner animation='border' />
    )
}

/**
 * Start the actual app
 * @param username Username accessing the extension
 */
function startApp(streamer: string = '', username: string = '') {
    const root = document.createElement("div")
    root.className = "chat-extension"
    const anchor = document.getElementById(settings.element.primary)
    if (anchor) {
        anchor.appendChild(root);
        const rootDiv = ReactDOM.createRoot(root);
        rootDiv.render(
            <Provider
                store={store}
            >
                <PersistGate
                    loading={loading()}
                    persistor={persistor}>
                    <hr />
                        <AppRouter
                            owner={owner.content}
                            streamer={streamer}
                            username={username}
                        />
                    <hr />
                </PersistGate>
            </Provider>
        )
    }
    else {
        console.error('Failed to initialize content app. Did not attach to DOM.');
    }
}

// Note: URL matching tied to manifest. No need to worry about when to load.
startEmbed()