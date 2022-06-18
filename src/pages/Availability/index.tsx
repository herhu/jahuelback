import React, { FC } from 'react'
import ReactDOM from 'react-dom'
import Calendar from '../../components/Calendar'
import Select from '../../components/Select'
import Button from '../../components/Button'
import { Divider, DatePicker, Space, InputNumber, Tooltip } from 'antd'
import 'antd/dist/antd.css'

const { RangePicker } = DatePicker

const Availability: FC = () => {
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
        <RangePicker
          placeholder={['Fecha entrada', 'Fecha salida']}
          onChange={(e, a) => console.log(e, a)}
        />

        <Select placeholder={'Seleccione Habitación'} />

          <InputNumber value={14} disabled />


        <InputNumber
          placeholder={'Cantidad'}
          min={1}
          max={10}
          defaultValue={3}
          onChange={onChange}
        />
        <Button name={'Actualizar'} />
      </div>
      <Divider />
      <div>
        <Space direction='vertical' size={'large'}>
          {/* <Calendar /> */}
        </Space>
      </div>
    </div>
  )
}

export default Availability
