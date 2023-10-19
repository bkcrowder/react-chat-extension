import React from 'react'
import Goal, { IGoal } from './goal'
import GoalForm from './goalForm'
import { Row } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import { complete, remove } from './goals.slice'

function GoalContainer() {
    const total = useAppSelector(state => state.tip.total)
    const goals = useAppSelector(state => state.goal)
    const dispatch = useAppDispatch()

    const completed = () => {
        return goals.complete.map((g: IGoal) => {
            return (
                <Goal
                    name={g.name}
                    current={g.current}
                    target={g.target}
                    diff={g.diff}
                    countdown={g.countdown}
                    removeCallback={() => dispatch(remove({ ...g, complete: true }))}
                />
            )
        })
    }

    const incomplete = () => {
        return goals.incomplete.map((g: IGoal) => {
            if (g.target - g.current <= 0) {
                dispatch(complete(g))
            }
            else
            {
                return (
                    <Goal
                        key={g.name + g.target + Math.random()}
                        name={g.name}
                        current={total}
                        target={g.target}
                        diff={g.diff}
                        countdown={g.countdown}
                        removeCallback={() => dispatch(remove({ ...g, complete: false }))}
                    />
                )
            }
        })
    }
    
    return (
        <React.Fragment>
            {GoalForm(total)}
            <hr />
            <Row>
                {completed()}
                {incomplete()}
            </Row>
        </React.Fragment>
    )
}

export default GoalContainer