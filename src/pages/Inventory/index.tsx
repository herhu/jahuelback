import React, { useState, useEffect } from 'react'
import Calendar from '../../components/Calendar'
import {
  Divider,
  DatePicker,
  InputNumber,
  message,
  Select,
  Form,
  Button,
  Space
} from 'antd'
import { DayPilot } from 'daypilot-pro-react'
import { IprogramOracle } from '../../interfaces/IProgram'
import { IInventoryHotel } from '../../interfaces/IInventory'
import { getInventory, saveInventory } from '../../api/services/jahuel'
import 'antd/dist/antd.css'
import { PopoverPicker } from '../../components/PopoverPicker'
import moment from 'moment'

const { RangePicker } = DatePicker

const { Option } = Select

interface TProps {
  programs: IprogramOracle[]
}

const validateMessages = {
  required: '${label} es obligatorio!',
  number: {
    range: '${label} debe de ser entre ${min} y ${max}'
  }
}

const Inventory = (props: TProps) => {
  const [inventories, setInventories] = useState<IInventoryHotel[]>([])
  const [dates, setDates] = useState<Array<String>>([])
  const [loading, setLoading] = useState(true)
  const [color, setColor] = useState('#aabbcc')
  const [pickerType, setPickerType] = useState(0)
  const [program, setProgram] = useState('')
  const [form] = Form.useForm()

  useEffect(() => {
    getInventories()
  }, [])

  const building = async (values: any) => {
    let post = {
      rooms: props.programs[values.programa].ROOMS,
      program: props.programs[values.programa].PROGRAM,
      text: props.programs[values.programa].PROGRAM,
      backColor: color,
      start: dates[0].toString(),
      end: dates[1].toString(),
      id: DayPilot.guid(),
      active: true
    }

    post.rooms.map(room => {
      switch (room.ROOM_TYPE) {
        case Object.keys(values)[2]:
          room.INVENTORY = Object.values(values)[2] as number
          room.AVAILABLE = Object.values(values)[2] as number
          break
        case Object.keys(values)[3]:
          room.INVENTORY = Object.values(values)[3] as number
          room.AVAILABLE = Object.values(values)[3] as number
          break
        case Object.keys(values)[4]:
          room.INVENTORY = Object.values(values)[4] as number
          room.AVAILABLE = Object.values(values)[4] as number
          break
        default:
          room.INVENTORY = 0
          room.AVAILABLE = 0
          break
      }
    })

    return post
  }

  const onFinish = async (values: any) => {
    let post = await building(values)
    form.resetFields()
    saveInventory(post)
      .then(response =>
        setInventories([...inventories, response.data.inventory])
      )
      .catch(error => console.log(error))
  }

  const getInventories = async () => {
    getInventory()
      .then(response => {
        setLoading(false)
        setInventories(response.data.data)
      })
      .catch(error => console.log(error))
  }

  const DayOffCalendar = (index: number) => {
    if (index) {
      let Iprogram = props.programs[index].PROGRAM
      setProgram(Iprogram)
      if (Iprogram === 'PROG. TEMPORADA BAJA LUNES A JUEVES') {
        setPickerType(1)
      } else if (
        Iprogram === 'PROGRAMA VIERNES A DOMINGO BAJA' ||
        Iprogram === 'PROGRAMA VIERNES A DOMINGO ALTA'
      ) {
        setPickerType(2)
      } else {
        setPickerType(0)
      }
    }
  }

  const DisableDates = (current: moment.Moment) => {
    if (pickerType === 1) {
      return (
        (current && current < moment().endOf('day')) ||
        moment(current).day() === 0 ||
        moment(current).day() === 5 ||
        moment(current).day() === 6
      )
    } else if (pickerType === 2) {
      return (
        (current && current < moment().endOf('day')) ||
        moment(current).day() === 1 ||
        moment(current).day() === 2 ||
        moment(current).day() === 3 ||
        moment(current).day() === 4
      )
    } else {
      return current && current < moment().endOf('day')
    }
  }

  const resetDates = () => {
    form.resetFields(['fecha'])
    message.warning('Seleccione fechas dentro del rango disponible')
  }

  const onChageDates = (Selected: string[]) => {
    let start = moment(Selected[0], 'YYYY-MM-DD').week()
    let end = moment(Selected[1], 'YYYY-MM-DD').week()

    if (program === 'PROG. TEMPORADA BAJA LUNES A JUEVES') {
      //same week
      start === end ? setDates(Selected) : resetDates()
    } else if (
      program === 'PROGRAMA VIERNES A DOMINGO BAJA' ||
      program === 'PROGRAMA VIERNES A DOMINGO ALTA'
    ) {
      let dayA = moment(Selected[0]).day()
      let dayB = moment(Selected[1]).day()
      console.log('start: ', start, ', end: ', end)

      if (dayA === 0 && dayB === dayA && start === end) {
        // only sunday same week
        setDates(Selected)
      } else if (
        // friday to saturday same week
        (dayA === 5 || dayA === 6) &&
        (dayB === 5 || dayB === 6) &&
        start === end
      ) {
        setDates(Selected)
      } else if (
        (dayA === 5 || dayA === 6) &&
        dayB === 0 &&
        start + 1 === end
      ) {
        //friday to sunday different week
        setDates(Selected)
      } else {
        resetDates()
      }
    } else {
      setDates(Selected)
    }
  }

  return (
    <div>
      <Form
        onFinish={onFinish}
        form={form}
        validateMessages={validateMessages}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap-reverse'
        }}
      >
        <Space align='center' size={[8, 16]} wrap>
          <Form.Item name={['programa']} rules={[{ required: true }]}>
            <Select
              allowClear
              placeholder={'Programas'}
              onChange={i => DayOffCalendar(i)}
            >
              {props.programs.map((q, i) => (
                <Option key={i}>{q.PROGRAM}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name={['fecha']} rules={[{ required: true }]}>
            <RangePicker
              disabledDate={current => DisableDates(current)}
              placeholder={['Fecha entrada', 'Fecha salida']}
              onChange={(e, a) => onChageDates(a)}
            />
          </Form.Item>
          <Form.Item
            name={['Superior']}
            rules={[{ required: true, type: 'number', min: 0, max: 46 }]}
            label='Superior(46)'
          >
            <InputNumber placeholder={'Cantidad'} min={0} max={46} />
          </Form.Item>
          <Form.Item
            name={['Vip']}
            rules={[{ required: true, type: 'number', min: 0, max: 14 }]}
            label='Vip(14)'
          >
            <InputNumber placeholder={'Cantidad'} min={0} max={14} />
          </Form.Item>
          <Form.Item
            name={['Clasicas']}
            rules={[{ required: true, type: 'number', min: 0, max: 20 }]}
            label='Clasica(20)'
          >
            <InputNumber placeholder={'Cantidad'} min={0} max={20} />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Cargar
            </Button>
          </Form.Item>
          <Form.Item>
            <PopoverPicker color={color} onChange={setColor} />
          </Form.Item>
        </Space>
      </Form>
      <Divider />
      <div>
        <Calendar
          programs={props.programs}
          loading={loading}
          setLoading={setLoading}
          getInventories={getInventories}
          inventories={inventories}
        />
      </div>
    </div>
  )
}

export default Inventory
