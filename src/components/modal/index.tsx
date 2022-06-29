import React, { useEffect, useState } from 'react'
import {
  Modal,
  Descriptions,
  PageHeader,
  Statistic,
  Tabs,
  Divider,
  Skeleton,
  Space,
  Button,
  Tag,
  InputNumber,
  Form,
  Popconfirm,
  Popover
} from 'antd'
import { IInventoryHotel } from '../../interfaces/IInventory'
import { IroomOracle } from '../../interfaces/IRoom'
import {
  updateStatusInventory,
  updateAvailabilityInventory
} from '../../api/services/jahuel'
import { openNotificationWithIcon } from '../../components/Notification'
import { deleteInventory } from '../../api/services/jahuel'
import { ExclamationCircleOutlined } from '@ant-design/icons'

interface Tprops {
  inventory: IInventoryHotel
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  onCancel: () => void
  loading: boolean
  getInventories: () => Promise<void>
  newDate: { start: string; end: string }
}

interface ITags {
  tag: string
  max: number
}

const { confirm } = Modal

const { CheckableTag } = Tag

const { TabPane } = Tabs

const App = (props: Tprops) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [tagAndMax, setTagAndMax] = useState<ITags>({ tag: 'Vip', max: 0 })
  const [room, setRoom] = useState<IroomOracle>()
  const [status, setStatus] = useState(false)
  const [inventory, setInventory] = useState<IInventoryHotel>()

  useEffect(() => {
    if (props.inventory) {
      let invt = props.inventory
      setSelectedTags([invt.rooms[0].ROOM_TYPE])
      let maxTagValue = getMaxOfRooms(invt.rooms[0].ROOM_TYPE)
      setTagAndMax({ tag: invt.rooms[0].ROOM_TYPE, max: maxTagValue })
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
  }, [props.inventory, props.newDate, props.getInventories])

  const getMaxOfRooms = (ROOM_TYPE: string): number => {
    let maxTagValue = 0

    switch (ROOM_TYPE) {
      case 'Vip':
        maxTagValue = 14
        break
      case 'Superior':
        maxTagValue = 46
        break
      case 'Clasicas':
        maxTagValue = 20
        break
      default:
        maxTagValue = 0
        break
    }

    return maxTagValue
  }

  const handleChange = async (
    tag: string,
    checked: boolean,
    room: IroomOracle
  ) => {
    const nextSelectedTags = checked
      ? [tag]
      : selectedTags.filter(t => t !== tag)

    let maxTagValue = getMaxOfRooms(nextSelectedTags[0])
    setSelectedTags(nextSelectedTags)
    setTagAndMax({ tag: nextSelectedTags[0], max: maxTagValue })
    setRoom(room)
  }

  const showDeleteConfirm = () => {
    confirm({
      title: '¿Estás seguro de Borrar este programa?',
      icon: <ExclamationCircleOutlined />,
      content: props.inventory.program,
      okText: 'Si',
      okType: 'danger',
      cancelText: 'No',
      onOk () {
        props.setLoading(true)
        deleteInventory(props.inventory.id)
          .then(response => {
            openNotificationWithIcon('success', '', 'Programa eliminado')
            props.setVisible(false)
            props.getInventories()
          })
          .catch(() => {
            props.setLoading(false)
            openNotificationWithIcon(
              'error',
              '',
              'No se ha podido eliminar el programa'
            )
          })
      },
      onCancel () {
        console.log('Cancel')
      }
    })
  }

  const UpdateStatus = (tab: string) => {
    let active = tab === '1' ? true : false
    updateStatusInventory(props.inventory.id, { active })
      .then(response => {
        openNotificationWithIcon('success', '', 'Estado actualizado')
        setStatus(active)
      })
      .catch(() =>
        openNotificationWithIcon(
          'error',
          '',
          'No se ha podido actualizar el estado'
        )
      )
  }

  const onFinish = (values: any, roomy: IroomOracle, id: string) => {
    let INVENTORY =
      roomy.SOLD === 0 ? values.available : values.available - roomy.SOLD
    let AVAILABLE = values.available
    props.setLoading(true)
    updateAvailabilityInventory(id, {
      AVAILABLE,
      INVENTORY,
      ROOM_TYPE: roomy.ROOM_TYPE
    })
      .then(response => {
        openNotificationWithIcon('success', '', 'Disponibilidad actualizada')
        props.getInventories()
      })
      .catch(() =>
        openNotificationWithIcon(
          'error',
          '',
          'No se ha podido actualizar la disponibilidad'
        )
      )
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const renderContent = (column = 1) => (
    <Skeleton active loading={false}>
      <Descriptions size='small' style={{ width: '50%' }} column={column}>
        <Descriptions.Item label='Precio Single'>
          <a> {room && room.SINGLE}</a>
        </Descriptions.Item>
        <Descriptions.Item label='Precio Double'>
          <a> {room && room.DOUBLE}</a>
        </Descriptions.Item>
        <Descriptions.Item label={`Cantidad a vender (${tagAndMax.max})`}>
          <Popover
            placement='right'
            title={'Puedes Actualizar el valor'}
            content={() => (
              <Form
                name='in'
                onFinish={values =>
                  onFinish(values, room as IroomOracle, props.inventory.id)
                }
                onFinishFailed={onFinishFailed}
                style={{ display: 'flex' }}
              >
                <Space>
                  <Form.Item
                    label=''
                    name='available'
                    rules={[
                      {
                        required: true,
                        message: 'Ingrese un valor',
                        type: 'number',
                        min: 1,
                        max: tagAndMax.max
                      }
                    ]}
                  >
                    <InputNumber
                      status='warning'
                      size='small'
                      min={1}
                      max={tagAndMax.max}
                      value={room ? room.AVAILABLE : 0}
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button size={'small'} type='primary' htmlType='submit'>
                      Actualizar
                    </Button>
                  </Form.Item>
                </Space>
              </Form>
            )}
            trigger='hover'
          >
            {room && room.AVAILABLE}
          </Popover>
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
      onOk={showDeleteConfirm}
      cancelText='Salir'
      okText={'Eliminar'}
      okType='dashed'
      onCancel={props.onCancel}
      width={1000}
    >
      <PageHeader
        className='site-page-header-responsive'
        title={inventory ? inventory.program : ''}
        subTitle={inventory ? `${inventory.rooms.length} Habitaciones` : ''}
        footer={
          <Tabs
            activeKey={status ? '1' : '2'}
            onChange={key => UpdateStatus(key)}
          >
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
