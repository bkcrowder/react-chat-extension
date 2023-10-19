import React, { useState } from 'react'
import { complete, undo, remove } from './tip.slice'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import { Col, Row, Nav, Tab, Card } from 'react-bootstrap'
import { ITip, Tips, TipAction, ITipRemove, ITipActions } from './tip'

function empty(title: string = '') {
    return <Row key={ crypto.randomUUID() }>
        <Col>
            <Card
                bg='dark'
                text='light'
            >
                <h4 className='text-muted text-center'>{ title } tips are currently empty</h4>
            </Card>
        </Col>
    </Row>
}

function renderTipPane(tips: { [key: string]: number[] }, isComplete: boolean, shown: {[key:string]: boolean}, actions: ITipActions): React.JSX.Element {
    let elements: React.JSX.Element[] = []
    const keys = Object.keys(tips)
    if (keys.length > 0)
    {
        keys.map((username) => {
            elements.push(
                <Tips
                    key={crypto.randomUUID()}
                    username={username}
                    isComplete={isComplete}
                    isShown={shown[username] || false}
                    actions={
                        {
                            tipToggle: actions.tipToggle,
                            tipShow: actions.tipShow,
                            tipRemove: actions.tipRemove
                        }
                    }
                />
            )
        })
    }
    else 
    {
        elements.push(empty(isComplete ? 'Complete' : 'Incomplete'))
    }

    return (
        <Tab.Pane eventKey={isComplete ? 'complete' : 'incomplete'}>
            <Row>
                { elements }
            </Row>
        </Tab.Pane>
    )
}

function tipNav(togglecallback: Function, key: string, theme: string, count: number) {
    const title = key.charAt(0).toUpperCase() + key.slice(1)
    return (
        <Nav.Item>
            <Nav.Link
                onClick={() => { togglecallback(key) }}
                eventKey={key}
                className='rounded-0'
            >
                <Row className='mx-auto my-auto'>
                    <Col>
                        { title }
                    </Col>
                </Row>
            </Nav.Link>
        </Nav.Item>
    )
}

/*
    Something here is causing an error with doing a list with keys.
*/
function TipJar() {
    const [activeTab, setActiveTab] = useState('incomplete')
    const [showAmounts, setShowAmounts] = useState<{ [key: string]: boolean }>({})
    const tips = useAppSelector(state => state.tip)
    const dispatch = useAppDispatch()

    const count = {
        incomplete: Object.keys(tips.incomplete).length,
        complete: Object.keys(tips.complete).length
    }

    const toggleShow = (username: string) => {
        if (showAmounts.hasOwnProperty(username)) {
            setShowAmounts({...showAmounts, [username]: !showAmounts[username]})
        }
        else {
            setShowAmounts({...showAmounts, [username]: true})
        }
    }

    const batch = {
        complete: () => { tips.incomplete.map((tip: ITip) => { dispatch(complete(tip)) }) },
        undo: () => { tips.complete.map((tip: ITip) => { dispatch(undo(tip)) }) }
    }

    const removeTip = (tip: ITipRemove) => dispatch(remove({ username: tip.username, complete: false }))

    return (
        <Tab.Container id="tip-list" defaultActiveKey={activeTab}>
            <Card className='border-0 rounded-0'>
                <Card.Body className='p-0'>
                    <Row className='m-0'>
                        <Col sm={3} className="border-end px-0"
                        >
                            <Nav variant="pills" className="flex-column">
                                { tipNav(setActiveTab, 'incomplete', 'dark', count.incomplete) } 
                                { tipNav(setActiveTab, 'complete', 'dark', count.complete) } 
                            </Nav>
                        </Col>

                        <Col sm={9} className='p-0 bg-light'>
                            <Tab.Content className='mx-3'>
                                {
                                    renderTipPane(
                                        tips.incomplete,
                                        false,
                                        showAmounts,
                                        {
                                            tipToggle: (tip: ITip) => dispatch(complete(tip)),
                                            tipRemove: removeTip,
                                            tipShow: toggleShow
                                        }
                                        
                                )}

                                {
                                    renderTipPane(
                                        tips.complete,
                                        true,
                                        showAmounts,
                                        {
                                            tipToggle: (tip: ITip) => dispatch(undo(tip)),
                                            tipRemove: removeTip,
                                            tipShow: toggleShow
                                        }
                                    )}
                            </Tab.Content>
                        </Col>
                    </Row>
                </Card.Body>
                
                <Card.Footer className='text-center bg-opacity-0 rounded-0'>
                    <h4>Total: ${tips.total}</h4>
                </Card.Footer>
            </Card>
            
        </Tab.Container>
    )
}

export default TipJar