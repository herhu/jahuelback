import React, { FC } from 'react'
import { Form, Input, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { login } from '../../api/services/auth'
import logo from '.././../logo512.png'
interface TUser {
  id: string
  email: string
  password: string
  name: string
  role: string
}
const Demo: FC = () => {
  const navigate = useNavigate()

  const onFinish = async (values: TUser) => {
    let response = await login({
      email: values.email,
      password: values.password
    })
    response && navigate('home')
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
        flexDirection: 'column'
      }}
    >
      <img src={logo} width='20%' />
      <Form
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true, email: '' }}
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

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            Entrar
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Demo
