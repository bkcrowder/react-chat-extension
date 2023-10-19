import React from 'react'
import { Col, Card, Row, Button, Collapse, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { BsChevronBarDown, BsTrash } from 'react-icons/bs'
import { IoIosUndo, IoMdCheckmark } from 'react-icons/io'
import { useAppSelector } from '../../../store/store'

export type TipAction<Type> = (arg: Type) => void

interface ITip {
    username: string,
    amount: number
}

interface ITipRemove {
    username: string
    complete: boolean
}

interface ITipActions {
    tipToggle: TipAction<ITip>
    tipRemove: TipAction<ITipRemove>
    tipShow: TipAction<string>
}

interface ITipConfiguration {
    username: string
    isComplete: boolean
    isShown: boolean
    actions: ITipActions
}

function buttonBatch(complete: boolean, username: string, callback: Function) {
    const tooltip = complete
        ? <Tooltip id={`undo-batch-${username}`}>Undo all tips for {username}</Tooltip>
        : <Tooltip id={`complete-batch-${username}`}>Complete all tips for {username}</Tooltip>
    
    const icon = complete ? <IoIosUndo size={17} /> : <IoMdCheckmark size={17} />

    return (
        <OverlayTrigger
            placement='bottom'
            delay={{ show: 250, hide: 400 }}
            overlay={tooltip}
        >
            <Button onClick={callback()}>
                {icon}
            </Button>
        </OverlayTrigger>
    )
}

function buttonShowTips(isOpen: boolean, username: string, callback: Function) {
    const tooltip = <Tooltip id={`toggle-amounts-${username}`}>{isOpen ? 'Hide' : 'Show'} tips</Tooltip>
    return (
        <OverlayTrigger
            placement='bottom'
            delay={{ show: 250, hide: 400 }}
            overlay={tooltip}
        >
            <Button
                variant='outline-dark'
                onClick={callback()}
            >
                <BsChevronBarDown size={17} />
            </Button>
        </OverlayTrigger>
    )
}

function buttonDeleteTip(username: string, callback: Function) {
    const tooltip = <Tooltip id={`delete-tips-${username}`}>Delete these tips for {username}</Tooltip>
    return (
        <OverlayTrigger
            placement='bottom'
            delay={{ show: 250, hide: 400 }}
            overlay={tooltip}
        >
            <Button
                variant={`outline-style`}
                onClick={callback()}
            >
                <BsTrash size={17} />
            </Button>
        </OverlayTrigger>
    )
}

function renderAmount(amount: number, index: number, style: string, toggleCallback: Function) {
    const border = `border-top border-${style}`
    return (
        <Row
            key={crypto.randomUUID()}
            className={`mb-0 ${index > 0 ? border : ''}`}
            onClick={toggleCallback()}
        >
            <Col className='py-1'>
                <h5 className={`text-center tip-amount-${style}`}>${amount.toString()}</h5>
            </Col>
        </Row>
    )
}

function renderHeader(style: string, username: string) {
    return (
        <Card.Header
            className={`h6 bg-${style} text-light`}
        >
            <Row className='d-flex justify-content-between align-items-center'>
                <Col>
                    {username}
                </Col>
            </Row>
        </Card.Header>
    )
}

function renderFooter(total: number) {
    return (
        <Card.Footer>
            <p className='m-0' style={ {color: '#333'}}>Total: ${ total.toString() }</p>
        </Card.Footer>
    )
}

 // TODO: Tip container still collapses on re-render. State is not preserved.

/**
 * Creates a card representing all the tips they've made of that type (complete / incomplete)
 * @returns A user's tip card containing all of the amounts for that tip type
 */
function Tips({ username, isComplete, isShown, actions }: ITipConfiguration) {
    const style = isComplete ? 'success' : 'danger'
    const tips: number[] = useAppSelector(state => isComplete
        ? state.tips.complete[username]
        : state.tips.incomplete[username]
    )

    let total = 0
    const amounts = () => {
        if (tips == null) {
            return null
        }

        return (
            tips.map((amount, i) => {
                total += amount
                return (renderAmount(amount, i, style, () => actions.tipToggle({ username, amount: amount })))
            })
        )
    }

    // Removed online status since site doesn't have a mapping between rollcall and chat
    return (
        <Col sm={3} className='py-3'>
            <Card className='shadow rounded'
                border={`border-${style}`}
                text='light'
                style={{ height: '100%' }}
            >
                {renderHeader(style, username)} 

                <Card.Body className={`mx-auto my-auto bg-white text-${style}`}>
                    <Row>
                        <Col sm={12} className='d-flex justify-content-between align-items-center'>
                            { buttonBatch(isComplete, username, () => tips.map((amount) => actions.tipToggle({username, amount}))) }
                            { buttonDeleteTip(username, () => actions.tipRemove({ username, complete: isComplete })) }
                            { buttonShowTips(isShown, username, () => actions.tipShow(username)) }
                        </Col>
                    </Row>
                    <Collapse in={isShown}>
                        <div>
                            { amounts() }
                        </div>
                    </Collapse>
                </Card.Body>

                {renderFooter(total)}
                
            </Card>
        </Col>
    )
}

export { Tips, ITip, ITipRemove, ITipActions }