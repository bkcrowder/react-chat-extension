import Manager from './components/manager';
import React, { createContext, useEffect, useMemo, useState } from 'react'
import { Row, Container } from 'react-bootstrap';
import events, { IMessage } from './settings/events';
import { ThemeContextValue } from 'react-bootstrap/esm/ThemeProvider';

// SASS
import './styles/theme.scss'

interface IProps {
  owner: string,
  streamer: string,
  username: string
}

interface IUserContext {
  username: string,
  isOwner: boolean
}

interface IThemeContext {
  general: string
}

const UserContext = createContext<IUserContext>({ username: '', isOwner: false })
const ThemeContext = createContext<IThemeContext>({ general: 'dark' })

/**
   * Handles messages emitted from the background script
   * @param message   Message containing the sender, the event name, and the payload
   */
function handleMessage(message: IMessage, owner: string): void {
}

function AppRouter({ owner, streamer, username }: IProps) {
  const exception = 'defilemeelmo' // It me for debugging purposes

  const [currentOwner, setCurrentOwner] = useState(owner)
  const [currentStreamer, setCurrentStreamer] = useState(streamer)
  const [currentUsername, setCurrentUsername] = useState(username)
  const [isOwner, setIsOwner] = useState(username == streamer || username == exception)

  const [theme, setTheme] = useState<IThemeContext>({ general: 'dark' })

  const handleMessage = (message: IMessage) => {
    if (message.from == owner) { return }

    // Events we should be receiving from background script
    switch (message.event) {
        case events.theme:
            setTheme(message.payload)
            break
    }
  }

  // Component Did Mount
  useEffect(() => {
    //chrome.runtime.onMessage.addListener(handleMessage)
    
    // Component will unmount
    return () => {
      //chrome.runtime.onMessage.removeListener(handleMessage)
    }
  },[])

  const userContextValue = useMemo(() => ({
    username: currentUsername,
    isOwner
  }), [currentOwner, currentStreamer, isOwner, currentUsername])

  // Theme which will be set from the popup
  const themeContextValue = useMemo(() => ({
    general: theme.general
  }), [theme])

  return (
    <main>
      <UserContext.Provider value={userContextValue}>
        <ThemeContext.Provider value={ themeContextValue }>
          <Container fluid>
            <Row>
              <Manager/>
            </Row>
          </Container>
        </ThemeContext.Provider>
      </UserContext.Provider>
    </main>
  )
}

export { UserContext, IUserContext }
export default AppRouter;