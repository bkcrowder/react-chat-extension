import React, { useContext } from "react"
import { Col, Button, Row, Tooltip, OverlayTrigger } from "react-bootstrap"
import { BsPerson } from 'react-icons/bs'
import { VscDebugRestart } from 'react-icons/vsc'
import { useAppDispatch, persistor, AppDispatch } from "../../store/store"
import { add, reset } from "../features/tips/tip.slice"
import { clear } from '../features/goals/goals.slice'
import { UserContext } from "../../app.router"

interface IActionBar {
    online: number
}

// Wrapper for all of the tips to simulate
function SimulateTips({ username, dispatch }: { username: string, dispatch: AppDispatch }) {
    return (
        <Col>
            <Row>
                <SimulateHeader username={username} />
                <Col className="text-center border border-warning m-0 py-auto">
                    <Row className="m-0">
                        <Col className="my-auto">
                            <SimulateTip
                                amount={1}
                                username={username}
                                dispatch={dispatch}
                            />
                            <SimulateTip
                                amount={5}
                                username={username}
                                dispatch={dispatch}
                            />
                            <SimulateTip
                                amount={10}
                                username={username}
                                dispatch={dispatch}
                            />
                            <SimulateTip
                                amount={25}
                                username={username}
                                dispatch={dispatch}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>   
        </Col>
    )
}

// Simulate button that adds a tip of supplied amount
function SimulateTip({ amount, username, dispatch }: { amount: number, username: string, dispatch: AppDispatch }) {
    return (
        <Button
            className="mx-1"
            variant="warning"
            onClick={() => {
                dispatch(add({username, amount}))
            }}>
            ${amount}
        </Button>
    )
}

// Simulate Button header
// TODO: Convert this to a callout?
function SimulateHeader({ username }: { username: string }) {
    return (
        <Col className="alert-warning border border-warning text-end rounded-start m-0 border-end-0">
            <p className="py-auto">Simulate Tip as {username}</p>
        </Col>
    )
}

// Reset button that clears localstorage
function ResetButton({resetCallback}: {resetCallback: Function}) {
    return (
        <Col sm={2} className="text-end h5">
            <OverlayTrigger
                placement="bottom"
                key={'session-delete'}
                overlay={
                <Tooltip
                    id="session-clear"
                >
                    Reset Session
                </Tooltip>
            }>
                <Button
                    variant='outline-light'
                    className="border"
                    onClick={() => resetCallback()}>
                    <VscDebugRestart
                        className="mx-auto my-auto h5"
                    />
                </Button>
            </OverlayTrigger>
        </Col>
    )
}

function OnlineCounter({count}: {count: number}) {
    return (
        <Col sm={2} className="h6">
            <BsPerson size={25}/> {count.toString()}
        </Col>
    )
}

function ActionBar({ online }: IActionBar) {
    const dispatch = useAppDispatch()
    const user = useContext(UserContext)

    return (
        <Row className='m-0 align-items-end'>
            <OnlineCounter count={online} />
            <SimulateTips
                username={user.username}
                dispatch={dispatch}
            />
            <ResetButton resetCallback={() => {
                persistor.purge()
                dispatch(reset())
                dispatch(clear())
            }} />
        </Row>
    )
}

export default ActionBar