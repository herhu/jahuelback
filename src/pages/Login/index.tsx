import React, { FC } from 'react'
import { Form, Input, Button, notification, Checkbox } from 'antd'
import { useNavigate } from 'react-router-dom'
import { signIn } from '../../api/services'

interface TUser {
  id: string
  email: string
  password: string
  name: string
  role: string
}

type NotificationType = 'success' | 'info' | 'warning' | 'error'

const Demo: FC = () => {
  const navigate = useNavigate()

  const openNotificationWithIcon = (type: NotificationType, text: string) => {
    notification[type]({
      message: 'Error al iniciar session',
      description: text
    })
  }

  const onFinish = (values: TUser) => {
    signIn(values.email, values.password)
      .then(response => navigate('/home'))
      .catch(error =>
        openNotificationWithIcon('error', error.response.data.errors.message)
      )
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}
    >
      <Form
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true, email: 'admin@admin.com' }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Form.Item
          label='email'
          name='email'
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name='remember'
          valuePropName='checked'
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Demo
