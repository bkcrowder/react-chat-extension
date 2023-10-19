import React, { useState } from "react";
import Toast from 'react-bootstrap/Toast'
import { ITip } from '../features/tips/tip'
import { useAppSelector } from "store/store";

interface IToastTip {
    username: string,
    amount: number,
    removeCallback: Function
}

function ToastTip({ username, amount, removeCallback }: IToastTip) {
    const [show, setShow] = useState(true)

    return (
        <Toast
            onClose={() => {
                setShow(false)
            }}
            onExit={() => removeCallback}
            show={show}
            delay={5000}
            autohide>
            <Toast.Header>
                <strong className="me-auto">{username} just tipped you!</strong>
            </Toast.Header>
            <Toast.Body>
                {username} tipped ${amount.toString()}
            </Toast.Body>
        </Toast>
    )
}

export default ToastTip