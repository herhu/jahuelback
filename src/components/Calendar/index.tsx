import React, { useEffect, useState } from 'react'
import 'antd/dist/antd.css'
import './index.css'
import { DayPilot, DayPilotMonth } from 'daypilot-pro-react'
import { Space, Divider, Statistic } from 'antd'
import { IprogramOracle } from '../../interfaces/IProgram'
import { openNotificationWithIcon } from '../../components/Notification'
import {
  IInventoryHotel,
  IUpdateDateInventory
} from '../../interfaces/IInventory'
import { updateDateInventory } from '../../api/services/jahuel'

import Modal from '../modal'

interface TProps {
  programs: IprogramOracle[]
  inventories: IInventoryHotel[]
}

const CCalendar = (props: TProps) => {
  const [visible, setVisible] = useState(false)
  const [config, setConfig] = useState({})
  const [newDate, setNewDate] = useState({ start: '', end: '' })
  const [programClicked, setProgramClicked] = useState<IInventoryHotel>()
  const [date, setDate] = useState(DayPilot.Date.today())

  useEffect(() => {
    setConfig({
      locale: 'es-es',
      showWeekend: true,
      startDate: date,
      eventEndSpec: 'Date',
      onEventMoved: (args: any) => {
        updateDateIn(args.e.data.id, {
          start: args.newStart.value,
          end: args.newEnd.value
        })
      },
      onBeforeCellRender: (args: any) => {
        if (args.cell.start === DayPilot.Date.today()) {
          args.cell.properties.areas = [
            {
              left: 0,
              right: 0,
              bottom: 0,
              height: 20,
              backColor: '#6aa84f',
              fontColor: '#ffffff',
              text: 'HOY',
              horizontalAlignment: 'center'
            }
          ]
        }
        if (args.cell.start < DayPilot.Date.today()) {
          args.cell.properties.disabled = true
        }
      },
      onEventResized: (args: any) => {
        updateDateIn(args.e.data.id, {
          start: args.newStart.value,
          end: args.newEnd.value
        })
      },
      onEventClicked: (args: any) => {
        setVisible(true)
        setProgramClicked(args.e.data)
      },
      events: props.inventories
    })
  }, [date, props.inventories])

  const updateDateIn = (id: string, data: IUpdateDateInventory) => {
    updateDateInventory(id, data)
      .then(response => {
        openNotificationWithIcon('success', '', 'Fechas actualizadas')
        setNewDate({ start: data.start, end: data.end })
      })
      .catch(() =>
        openNotificationWithIcon(
          'error',
          '',
          'No se ha podido actualizar el calendario'
        )
      )
  }
  const previous = () => {
    let previousDate = date.addMonths(-1)
    setDate(previousDate)
  }

  const next = () => {
    let NextDate = date.addMonths(1)
    setDate(NextDate)
  }

  return (
    <>
      <Modal
        visible={visible}
        inventory={programClicked as IInventoryHotel}
        newDate={newDate}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      />
      <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Space>
          <Statistic title='Año' groupSeparator='' value={date.getYear()} />
          <Divider type='vertical' />
          <Statistic
            title='Programas activos'
            groupSeparator=''
            value={props.inventories.length}
          />
        </Space>
        <Space>
          <a onClick={previous}>Mes Anterior</a>
          <Divider type='vertical' />
          <a onClick={next}>Mes Siguiente</a>
        </Space>
      </Space>
      <DayPilotMonth {...config} />
    </>
  )
}
export default CCalendar
