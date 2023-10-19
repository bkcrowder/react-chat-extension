import React, { useState, useEffect } from 'react'
import { Card, Col } from "react-bootstrap"
import { BsTrash } from 'react-icons/bs'

interface IGoal {
    name: string
    current: number
    target: number
    diff: number
    countdown: Date
}

interface IGoalRemove extends IGoal {
    complete: boolean
}

interface IGoalEntity extends IGoal {
    removeCallback: Function
}

interface ITimer {
    [key: string]: number
}

const timeRemaining = (target: Date) => {
    const difference = +target - +new Date()

    // Invalidate 
    if (target == new Date(+0)) {
        return null
    }

    let remaining: ITimer = {
        hours: 0,
        minutes: 0,
        seconds: 0
    }


    if (difference > 0) {
        remaining = {
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
        }
    }

    return remaining
}

function timer(timeLeft: {[key: string]: number} | null) {
    if (timeLeft == null) {
        return null
    }

    const components: React.JSX.Element[] = []

    Object.keys(timeLeft).forEach((k, i) => {
        components.push(
            <span>{`${ i == 0 ? ':' : ''}${timeLeft[k]}`}</span>
        )
    })

    return components
}

function Goal({ name, current, target, diff, countdown, removeCallback }: IGoalEntity) {
    // TODO: For some reason when it would not reduce beyond zero for remaining when at 2 and tipped 10 (-8 should be result)
    const [timeLeft, setTimeLeft] = useState<ITimer | null>(timeRemaining(countdown))
    const remaining = target - current
    const variant = remaining > 0 ? 'Dark' : 'Success'

    useEffect(() => {
        if (timeLeft !== null) {
            const timer = setTimeout(() => {
                setTimeLeft(timeRemaining(countdown))
            }, 1000)

            return () => {
                clearTimeout(timer)
            }
        }
    }, [])
    
    const usingTimer = (time: ITimer | null) => {
        if (time == null) {
            return null
        }

        return (
            <Card.Footer>
                {timer(time)}
            </Card.Footer>
        )
    }

    return (
        <Col sm={3}>
            <Card
                bg={variant.toLowerCase()}
                text='light'>
                <Card.Header className='h4 text-light d-flex justify-content-between align-items-center'>
                    {name}
                    <BsTrash
                        size={17}
                        onClick={() => { removeCallback() }}
                    />
                </Card.Header>
                <Card.Body>
                    <p> {remaining > 0 ? `Remaining: $${remaining}` : 'Complete!'} </p>
                    <p>Goal: ${diff}</p>
                </Card.Body>
                { usingTimer(timeLeft)}
            </Card>
        </Col >
    )
}

function GoalEmpty() {
    return (
        <Col>
            <h4 className='text-center text-muted'>
                <i>No goals set yet</i>
            </h4>
        </Col>
    )
}

export { IGoal, IGoalRemove, GoalEmpty }
export default Goal