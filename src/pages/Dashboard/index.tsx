import React, { FC, useEffect, useState } from 'react'
import { Layout, Menu, Spin, Avatar } from 'antd'
import Inventory from '../Inventory'
import { getProgram } from '../../api/services/jahuel'
import Availability from '../Availability'
import Programs from '../Programs'
import { logout } from '../../api/services/auth'
import logo from '.././../logo512.png'
import './index.css'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const { Header, Sider, Content, Footer } = Layout

const Dashboard: FC = () => {

  const navigate = useNavigate()

  useEffect(() => {
    getProgram()
      .then(response => setPrograms(response.data.data))
      .catch(error => console.log(error))
  }, [])

  const [collapsed, setCollapsed] = useState(false)
  const [menuSelected, setmenuSelected] = useState('1')
  const [programs, setPrograms] = useState([])
  const [spin, setSpin] = useState({
    tips: 'Cargando datos...',
    loading: false
  })

  const toggle = () => {
    setCollapsed(!collapsed)
  }

  const setMenu = (key: string) => {
    setmenuSelected(key)
  }

  const ContentToShow = (item: any) => {
    switch (item) {
      case '1':
        return <Inventory programs={programs} />
      case '2':
        return <Programs />
      case '3':
        return <Availability />
      default:
        return
    }
  }

  const LogoutHandle  = async () => {
    let res = await logout()
    res && navigate('/')
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={<span onClick={LogoutHandle}>Cerrar Session </span>}
        collapsible
        collapsed={collapsed}
      >
        <div
          style={{ padding: '10px', marginTop: '20px', marginBottom: '20px' }}
        >
          {collapsed ? (
            <Avatar size='large' src={logo} />
          ) : (
            <Avatar size={64} src={logo} />
          )}
        </div>
        <Menu
          theme='dark'
          mode='inline'
          style={{ lineHeight: '64px' }}
          defaultSelectedKeys={['1']}
          onClick={item => setMenu(item.key)}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'Inventario'
            }
          ]}
        />
      </Sider>
      <Layout className='site-layout'>
        <Header
          className='site-layout-background'
          style={{ paddingLeft: 24, textAlign: 'left' }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: toggle
            }
          )}
        </Header>
        <Content
          className='site-layout-background'
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280
          }}
        >
          <Spin tip={spin.tips} spinning={spin.loading}>
            {ContentToShow(menuSelected)}
          </Spin>
        </Content>
        {/* <Footer style={{ textAlign: 'center' }}>
          Developers ??2022 Created by delabyron
        </Footer> */}
      </Layout>
    </Layout>
  )
}

export default Dashboard
