import React, { useState } from "react";
import Toast from 'react-bootstrap/Toast'
import ToastContainer from "react-bootstrap/ToastContainer";

interface IToastAlert {
    username: string,
    amount: number
}

function ToastAlert({ username, amount }: IToastAlert) {
    const [show, setShow] = useState(false);

    return (
        <Toast onClose={() => setShow(false)} show={show} delay={5000} autohide>
            <Toast.Header>
                <strong className="me-auto">{username} just tipped you!</strong>
            </Toast.Header>
            <Toast.Body>
                {username} just tipped ${amount.toString()}
            </Toast.Body>
        </Toast>
    )
}

export default ToastAlert