import React from 'react'
import { Col, Row } from 'react-bootstrap'
import './callout.scss'

interface ICallout {
    type: CalloutTypeValue,
    heading?: string,
    description?: React.JSX.Element
}

export const Callouts = {
    default: 'callout-default',
    primary: 'callout-primary',
    info: 'callout-info',
    success: 'callout-success',
    warning: 'callout-warning',
    danger: 'callout-danger'
}

type CalloutType = keyof typeof Callouts
type CalloutTypeValue = typeof Callouts[CalloutType]

export default function Callout({type, heading, description}: ICallout) {
    const header = () => {
        if (heading) {
            return <h4>{heading}</h4>
        }

        return null
    }

    return (
        <Row>
            <Col>
                <div className={`callout ${type}`}>
                    {header()}
                    {description}
                </div>
            </Col>
        </Row>
    )
}