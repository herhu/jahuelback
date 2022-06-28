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
  newDate: { start: string; end: string }
}

const { CheckableTag } = Tag

const { TabPane } = Tabs

const App = (props: Tprops) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [room, setRoom] = useState<IroomOracle>()
  const [status, setStatus] = useState(false)
  const [inventory, setInventory] = useState<IInventoryHotel>()

  useEffect(() => {
    if (props.inventory) {
      let invt = props.inventory

      setSelectedTags([invt.rooms[0].ROOM_TYPE])
      setRoom(invt.rooms[0])
      setStatus(props.inventory.active)

      if (typeof invt.start === 'string') {
        invt.start = props.inventory.start.split('T')[0]
        invt.end = props.inventory.end.split('T')[0]
      } else {
        invt.start = props.newDate.start.split('T')[0]
        invt.end = props.newDate.end.split('T')[0]
      }
      setInventory(invt)
    }
  }, [props.inventory, props.newDate])

  const handleChange = (tag: string, checked: boolean, room: IroomOracle) => {
    const nextSelectedTags = checked
      ? [tag]
      : selectedTags.filter(t => t !== tag)
    setSelectedTags(nextSelectedTags)
    setRoom(room)
  }

const UpdateStatus = (tab: string) => {
  console.log(tab)
}

  const renderContent = (column = 1) => (
    <Skeleton active loading={inventory ? false : true}>
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
        value={inventory && inventory.start}
        style={{
          marginRight: 32
        }}
      />
      <Statistic title='Finaliza' value={inventory && inventory.end} />
    </div>
  )
  const Content: React.FC<{
    children: React.ReactNode
    extra: React.ReactNode
  }> = ({ children, extra }) => (
    <div className='content'>
      {inventory
        ? inventory.rooms.map((room, i) => (
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
        title={inventory ? inventory.program : ''}
        subTitle={inventory ? `${inventory.rooms.length} Habitaciones` : ''}
        footer={
          <Tabs activeKey={status ? '1' : '2'} onChange={(key) => UpdateStatus(key)}>
            <TabPane tab='Abrir' key='1' />
            <TabPane tab='Cerrar' key='2' />
          </Tabs>
        }
      >
        <Content extra={extraContent}>{renderContent()}</Content>
      </PageHeader>
    </Modal>
  )
}

export default App
