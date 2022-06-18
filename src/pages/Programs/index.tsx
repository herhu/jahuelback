import React, { FC } from 'react'
import Button from '../../components/Button'
import { Divider, DatePicker, Space } from 'antd'
import 'antd/dist/antd.css'

const { RangePicker } = DatePicker

const Programs: FC = () => {
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
        {/* <Select placeholder={'Seleccione Programa'} /> */}
        <Button name={'Habilitar'} />
        <Button name={'Deshabilitar'} />
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

export default Programs
