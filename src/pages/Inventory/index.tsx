import React, { useState, useEffect } from 'react'
import Calendar from '../../components/Calendar'
import { Divider, DatePicker, InputNumber, Select, Form, Button } from 'antd'
import { DayPilot } from 'daypilot-pro-react'
import { IprogramOracle } from '../../interfaces/IProgram'
import { IInventoryHotel } from '../../interfaces/IInventory'
import { getInventory, saveInventory } from '../../api/services'
import 'antd/dist/antd.css'
import { PopoverPicker } from '../../components/PopoverPicker'

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
  const [color, setColor] = useState('#aabbcc')
  const [form] = Form.useForm()

  useEffect(() => {
    getInventory()
      .then(response => setInventories(response.data.data))
      .catch(error => console.log(error))
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
          room.QUANTITY = Object.values(values)[2] as number
          break
        case Object.keys(values)[3]:
          room.QUANTITY = Object.values(values)[3] as number
          break
        case Object.keys(values)[4]:
          room.QUANTITY = Object.values(values)[4] as number
          break
        default:
          room.QUANTITY = 0
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

  return (
    <div>
      <Form
        onFinish={onFinish}
        form={form}
        validateMessages={validateMessages}
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Form.Item name={['programa']} rules={[{ required: true }]}>
          <Select allowClear placeholder={'Programas'}>
            {props.programs.map((q, i) => (
              <Option key={i}>{q.PROGRAM}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name={['fecha']} rules={[{ required: true }]}>
          <RangePicker
            placeholder={['Fecha entrada', 'Fecha salida']}
            onChange={(e, a) => setDates(a)}
          />
        </Form.Item>
        <Form.Item
          name={['Superior']}
          rules={[{ required: true, type: 'number', min: 1, max: 10 }]}
          label='Superior'
        >
          <InputNumber placeholder={'Cantidad'} min={1} max={10} />
        </Form.Item>
        <Form.Item
          name={['Vip']}
          rules={[{ required: true, type: 'number', min: 1, max: 10 }]}
          label='Vip'
        >
          <InputNumber placeholder={'Cantidad'} min={1} max={10} />
        </Form.Item>
        <Form.Item
          name={['Clasicas']}
          rules={[{ required: true, type: 'number', min: 1, max: 10 }]}
          label='Clasica'
        >
          <InputNumber placeholder={'Cantidad'} min={1} max={10} />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Cargar
          </Button>
        </Form.Item>
        <Form.Item>
          <PopoverPicker color={color} onChange={setColor} />
        </Form.Item>
      </Form>
      <Divider />
      <div>
        <Calendar programs={props.programs} inventories={inventories} />
      </div>
    </div>
  )
}

export default Inventory
