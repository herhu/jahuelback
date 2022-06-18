import React, { FC } from 'react'
import ReactDOM from 'react-dom'
import Calendar from '../../components/Calendar'
import Select from '../../components/Select'
import Button from '../../components/Button'
import { Divider, DatePicker, Space, InputNumber } from 'antd'
import { IInventory } from '../../interfaces/IInventory'
import 'antd/dist/antd.css'

const { RangePicker } = DatePicker

interface TProps {
  inventory: IInventory[]
}

const Inventory = (props: TProps) => {
  function onChange (value: any) {
    console.log('changed', value)
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          marginBottom: '10'
        }}
      >
        <Select placeholder={'Seleccione Programa'} />
        <RangePicker
          placeholder={['Fecha entrada', 'Fecha salida']}
          onChange={(e, a) => console.log(e, a)}
        />
        <Space size={'large'}>
          <Button name={'Cargar'} />
        </Space>
      </div>
      <Divider />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          marginBottom: '10'
        }}
      >
        <div>
          <Space size={'large'}>
            <span>Superior</span>
            <InputNumber
              placeholder={'Cantidad'}
              min={1}
              max={10}
              defaultValue={3}
              onChange={onChange}
            />
          </Space>
        </div>
        <div>
          <Space size={'large'}>
            <span>Vip</span>
            <InputNumber
              placeholder={'Cantidad'}
              min={1}
              max={10}
              defaultValue={3}
              onChange={onChange}
            />
          </Space>
        </div>
        <div>
          <Space size={'large'}>
            <span>Clasica</span>
            <InputNumber
              placeholder={'Cantidad'}
              min={1}
              max={10}
              defaultValue={3}
              onChange={onChange}
            />
          </Space>
        </div>
      </div>
      <Divider />
      <div>
        <Space direction='vertical' size={'large'}>
          <Calendar inventory={props.inventory} />
        </Space>
      </div>
    </div>
  )
}

export default Inventory
