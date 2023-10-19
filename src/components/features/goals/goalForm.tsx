import React, { useState, FormEvent, ChangeEvent } from 'react'
import { IGoal } from './goal'
import { Row, Col, Form, Button, Collapse, InputGroup } from 'react-bootstrap'
import { BsChevronDown } from 'react-icons/bs'
import { add } from './goals.slice'
import { useAppDispatch } from '../../../store/store'

interface IGoalForm extends IGoal {
    timer: false,
    hours: number,
    minutes: number,
    seconds: number
}

function rotationStyle(isOpen: boolean): React.CSSProperties {
    const rotation = isOpen ? 'rotate(180)deg' : 'rotate(0)'
    return {
        transform: rotation,
        transition: 'all 2s linear'
    }
}

function GoalForm(currentAmount: number) {
    const dispatch = useAppDispatch()
    const [open, setOpen] = useState(false)
    const [start, setStart] = useState<number>(0)
    const [goalForm, setGoalForm] = useState<IGoalForm>({
        name: '',
        target: 0,
        current: 0,
        diff: 0,
        countdown: new Date(+0),
        timer: false,
        hours: 0,
        minutes: 0,
        seconds: 0
    })

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (e.currentTarget.checkValidity() === true) {
            const g = goalForm
            g.diff = g.target;
            g.target = g.target + start

            if (g.timer && (g.hours > 0 || g.minutes > 0 || g.seconds > 0)) {
                g.countdown = new Date()

                g.countdown.setHours(g.hours)
                g.countdown.setMinutes(g.minutes)
                g.countdown.setSeconds(g.seconds)
            }


            dispatch(add(g as IGoal))
            
            const reset: IGoalForm = {
                name: '',
                target: 0,
                current: 0,
                diff: 0,
                countdown: new Date(+0),
                timer: false,
                hours: 0,
                minutes: 0,
                seconds: 0
            }

            setGoalForm(reset)
            setStart(0)

            setOpen(false)
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const value = e.target.value
        if (name == 'target')
        {
            setGoalForm({ ...goalForm, [name]: parseInt(value) })
        }
        else
        {
            setGoalForm({ ...goalForm, [name]: value })   
        }
    }

    return (
        <Row className='m-0'>
            <Col sm={12}>
                <div className="d-grid">
                    <Button
                        onClick={() => { setOpen(!open) }}
                        variant='outline-light'
                        className='my-auto rounded-0 border-top-0 border-left-0 border-right-0'
                    >
                        Add Goal <BsChevronDown size={15} className="mx-auto my-auto h5" style={rotationStyle(open)}/>
                    </Button>
                </div>
                    
                <Collapse in={open} className='mt-3'>
                    <Col sm={{span: 4, offset: 4}}>
                        <Form onSubmit={(e) => handleSubmit(e)}>
                            <Row className='m-0'>
                                <Col xs='auto'>
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Goal</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Write your goal'
                                            name='name'
                                            value={goalForm.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group className='mb-3'>
                                        <Form.Label htmlFor='amount'>Amount</Form.Label>
                                        <InputGroup className='mb-2'>
                                            <InputGroup.Text>$</InputGroup.Text>
                                            <Form.Control
                                                id='amount'
                                                type='number'
                                                placeholder='0'
                                                name='target'
                                                value={goalForm.target}
                                                onChange={handleChange}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                </Col>

                                <Col xs='auto'>
                                    <Form.Group>
                                        <Form.Check
                                            label="Set Timer"
                                            name="setTimer"
                                            type='switch'
                                        />
                                    </Form.Group>
                                    <Row className='m-0'>
                                        <Col>
                                            <Form.Control
                                                type='number'
                                                placeholder='00'
                                                value={goalForm.hours}
                                                onChange={handleChange}
                                            />
                                            <Form.Label>hours</Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type='number'
                                                placeholder='00'
                                                value={goalForm.minutes}
                                                onChange={handleChange}
                                            />
                                            <Form.Label>minutes</Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type='number'
                                                placeholder='00'
                                                value={goalForm.seconds}
                                                onChange={handleChange}
                                            />
                                            <Form.Label>seconds</Form.Label>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            
                            <Row>
                                <Col>
                                    <Form.Group className='mb-3'>
                                        <Form.Label>When to start goal</Form.Label>
                                        <Form.Check
                                            label="Start of stream"
                                            name='startGoal'
                                            type='radio'
                                            value='original'
                                            id='start-original'
                                            checked={start == 0}
                                            onChange={()=>{ setStart(0) }}
                                        />
                                        <Form.Check
                                            label="Start now"
                                            name='startGoal'
                                            type='radio'
                                            value='now'
                                            id='start-now'
                                            checked={start != 0}
                                            onChange={() => { setStart(currentAmount) }}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            
                            <Button variant='primary' type='submit'>
                                Add Goal
                            </Button>
                        </Form>
                    </Col>
                </Collapse>   
            </Col>
             
        </Row>
    )
}

export default GoalForm
export { rotationStyle }