import React, { useState, useEffect, useContext } from 'react'
import settings from '../settings/settings'
import TipJar from './features/tips/tipJar'
import { observeChat, observeUserStatus, unmount } from './observers'
import { Col } from 'react-bootstrap'
import ActionBar from './actionBar/actionBar'
import { useAppDispatch } from '../store/store'
import GoalContainer from './features/goals/goalContainer'
import { UserContext } from '../app.router'

interface IObservers {
    chat: MutationObserver,
    status: MutationObserver
}

function Manager() {
    const user = useContext(UserContext)

    const dispatch = useAppDispatch()
    const [online, setOnline] = useState<Set<string>>(new Set)
    const [observer] = useState<IObservers>({
        status: new MutationObserver((mutations) => {
            observeUserStatus(mutations, (users) => {
                setOnline(users)
            })
        }),
        chat: new MutationObserver((mutations) => {
            observeChat(mutations, user.username, dispatch)
        })
    })
    
    const watched = {
        chat: document.getElementById(settings.element.chat),
        rollcall: document.getElementById(settings.element.rollcall)
    }

    // Run once (componentDidMount / componentWillUnmount)
    useEffect(() => {
        if (watched.chat && watched.rollcall) {
            const obsOptions = { childList: true, subtree: true }
            observer.chat.observe(watched.chat, obsOptions)
            
            // Cannot map rollcall user to tip user as site lacks consistency in DOM attributes...
            observer.status.observe(watched.rollcall, obsOptions)

            return () => {
                unmount([observer.chat, observer.status])
            }
        }
    }, [])

    return (
        <Col>
            <ActionBar
                online={online.size}
            />
            <GoalContainer />
            <TipJar />
        </Col>
    )
}

export default Manager