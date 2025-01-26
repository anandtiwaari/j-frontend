import { Modal } from 'antd'
import React from 'react'

const EmailMessage = ({ isModalOpen, handleCancel, handleOk, component, handleSubmit }) => {
    return (
        <div>
            <Modal open={isModalOpen} onOk={handleSubmit} onCancel={handleCancel}>
                {component}
            </Modal>
        </div>
    )
}

export default EmailMessage
