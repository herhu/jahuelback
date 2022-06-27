import React, { useEffect, useState } from 'react'
import {
  Modal,
  Descriptions,
  PageHeader,
  Statistic,
  Tabs,
  Divider,
  Skeleton,
  Tag
} from 'antd'
import { IInventoryHotel } from '../../interfaces/IInventory'
import { IroomOracle } from '../../interfaces/IRoom'

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
  const [room, setRoom] = useState<IroomOracle>()

  useEffect(() => {
    if (props.inventory) {
      setSelectedTags([props.inventory.rooms[0].ROOM_TYPE])
      setRoom(props.inventory.rooms[0])
    }
  }, [props.inventory])

  const handleChange = (tag: string, checked: boolean, room: IroomOracle) => {
    const nextSelectedTags = checked
      ? [tag]
      : selectedTags.filter(t => t !== tag)
    setSelectedTags(nextSelectedTags)
    console.log(room)
    setRoom(room)
  }

  const renderContent = (column = 1) => (
    <Skeleton active loading={props.inventory ? false : true}>
      <Descriptions size='small' style={{ width: '50%' }} column={column}>
        <Descriptions.Item label='Precio Single'>
          <a> {room && room.SINGLE}</a>
        </Descriptions.Item>
        <Descriptions.Item label='Precio Double'>
          <a> {room && room.DOUBLE}</a>
        </Descriptions.Item>
        <Descriptions.Item label='Cantidad a vender'>
          {room && room.AVAILABLE}
        </Descriptions.Item>
        <Descriptions.Item label='Cantidad  vendidas'>
          {room && room.SOLD}
        </Descriptions.Item>
        <Descriptions.Item label='Cantidad disponibles'>
          {room && room.INVENTORY}
        </Descriptions.Item>
        <Descriptions.Item label='Días disponibles'>
          {room &&
            `${room.MONDAY === 'Y' ? 'Lunes, ' : ''} 
             ${room.TUESDAY === 'Y' ? 'Martes, ' : ''} 
             ${room.WEDNESDAY === 'Y' ? 'Miercoles, ' : ''} 
             ${room.THURSDAY === 'Y' ? 'Jueves, ' : ''} 
             ${room.FRIDAY === 'Y' ? 'Viernes, ' : ''} 
             ${room.SATURDAY === 'Y' ? 'Sabado, ' : ''}
             ${room.SUNDAY === 'Y' ? 'Domingo' : ''} `}
        </Descriptions.Item>
      </Descriptions>

      <div style={{ width: '50%' }}></div>
    </Skeleton>
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
              onChange={checked => handleChange(room.ROOM_TYPE, checked, room)}
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
                : '2'
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
