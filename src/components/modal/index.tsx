import React, { useEffect, useState } from 'react'
import {
  Modal,
  Descriptions,
  PageHeader,
  Statistic,
  Tabs,
  Divider,
  Tag
} from 'antd'
import { IInventoryHotel } from '../../interfaces/IInventory'

interface Tprops {
  inventory: IInventoryHotel
  visible: boolean
  onOk: () => void
  onCancel: () => void
}

const { CheckableTag } = Tag

const { TabPane } = Tabs

const App = (props: Tprops) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  useEffect(() => {
    if (props.inventory) {
      setSelectedTags([props.inventory.rooms[0].ROOM_TYPE])
    }
  }, [props.inventory])

  const handleChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [tag]
      : selectedTags.filter(t => t !== tag)
    setSelectedTags(nextSelectedTags)
  }

  const renderContent = (column = 1) => (
    <React.Fragment>
      <Descriptions size='small' style={{ width: '50%' }} column={column}>
        <Descriptions.Item label='Created'>Lili Qu</Descriptions.Item>
        <Descriptions.Item label='Association'>
          <a>421421</a>
        </Descriptions.Item>
        <Descriptions.Item label='Creation Time'>2017-10-10</Descriptions.Item>
        <Descriptions.Item label='Effective Time'>2017-10-10</Descriptions.Item>
        <Descriptions.Item label='Remarks'>
          Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
        </Descriptions.Item>
      </Descriptions>

      <div style={{ width: '50%' }}></div>
    </React.Fragment>
  )

  const extraContent = (
    <div
      style={{
        display: 'flex',
        width: 'max-content',
        justifyContent: 'flex-end'
      }}
    >
      <Statistic
        title='Comienza'
        value={props.inventory && props.inventory.start.split('T')[0]}
        style={{
          marginRight: 32
        }}
      />
      <Statistic
        title='Finaliza'
        value={props.inventory && props.inventory.end.split('T')[0]}
      />
    </div>
  )

  const Content: React.FC<{
    children: React.ReactNode
    extra: React.ReactNode
  }> = ({ children, extra }) => (
    <div className='content'>
      {props.inventory
        ? props.inventory.rooms.map((room, i) => (
            <CheckableTag
              key={i}
              checked={selectedTags.indexOf(room.ROOM_TYPE) > -1}
              onChange={checked => handleChange(room.ROOM_TYPE, checked)}
            >
              {room.ROOM_TYPE}
            </CheckableTag>
          ))
        : null}
      <Divider />
      <div className='main' style={{ display: 'flex' }}>
        {children}
      </div>
      <Divider />
      <div className='extra'>{extra}</div>
    </div>
  )

  console.log('inventory', props.inventory)

  return (
    <Modal
      centered
      visible={props.visible}
      onOk={props.onOk}
      onCancel={props.onCancel}
      width={1000}
    >
      <PageHeader
        className='site-page-header-responsive'
        title={props.inventory ? props.inventory.program : ''}
        subTitle={
          props.inventory ? `${props.inventory.rooms.length} Habitaciones` : ''
        }
        footer={
          <Tabs
            defaultActiveKey={
              props.inventory
                ? props.inventory.active === true
                  ? '1'
                  : '2'
                : ''
            }
          >
            <TabPane tab='Público' key='1' />
            <TabPane tab='Privado' key='2' />
          </Tabs>
        }
      >
        <Content extra={extraContent}>{renderContent()}</Content>
      </PageHeader>
    </Modal>
  )
}

export default App
