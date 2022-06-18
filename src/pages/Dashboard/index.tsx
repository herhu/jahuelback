import React, { FC, useEffect, useState } from 'react'
import { Layout, Menu, Spin } from 'antd'
import Inventory from '../Inventory'
import { getInventory } from '../../api/services'
import Availability from '../Availability'
import Programs from '../Programs'
import './index.css'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined
} from '@ant-design/icons'

const { Header, Sider, Content } = Layout

const Dashboard: FC = () => {
  useEffect(() => {
    getInventory()
      .then(response => setInventory(response.data.data))
      .catch(error => console.log(error.response.data.error.message))
  }, [])

  const [collapsed, setCollapsed] = useState(false)
  const [menuSelected, setmenuSelected] = useState('1')
  const [inventory, setInventory] = useState([])
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
        return <Inventory inventory={inventory}/>
      case '2':
        return <Programs />
      case '3':
        return <Availability />
      default:
        return
    }
  }

  return (
    <Layout style={{ height: '100%' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className='logo'>go</div>
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={['1']}
          onClick={item => setMenu(item.key)}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'Inventario'
            }
            // {
            //   key: '2',
            //   icon: <VideoCameraOutlined />,
            //   label: 'Programas'
            // },
            // {
            //   key: '3',
            //   icon: <UploadOutlined />,
            //   label: 'Disponibilidad'
            // }
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
      </Layout>
    </Layout>
  )
}

export default Dashboard
