import React, { useState } from 'react'
import { Modal, Button } from 'antd'

const App = (props: any) => {
    
  return (
      <Modal
        title='Modal 1000px width'
        centered
        visible={props.visible}
        onOk={props.onOk}
        onCancel={props.onCancel}
        width={1000}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
  )
}

export default App
