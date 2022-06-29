import React, { useEffect, useState } from 'react'
import 'antd/dist/antd.css'
import './index.css'
import { DayPilot, DayPilotMonth } from 'daypilot-pro-react'
import { Space, Divider, Statistic, Skeleton } from 'antd'
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
  loading: boolean
  getInventories: () => Promise<void>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
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
        if (programClicked) {
          let inventory = props.inventories.filter(
            invt => invt.id === programClicked.id
          )[0]

          setProgramClicked(inventory)
        }
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

  const setMonthToName = (): string => {
    switch (date.getMonth()) {
      case 0:
        return 'Enero'
      case 1:
        return 'Febrero'
      case 2:
        return 'Marzo'
      case 3:
        return 'Abril'
      case 4:
        return 'Mayo'
      case 5:
        return 'Junio'
      case 6:
        return 'Julio'
      case 7:
        return 'Agosto'
      case 8:
        return 'Septiembre'
      case 9:
        return 'Octubre'
      case 10:
        return 'Noviembre'
      case 11:
        return 'Diciembre'
      default:
        return ''
        break
    }
  }

  return (
    <Skeleton active loading={props.loading}>
      <Modal
        visible={visible}
        setVisible={setVisible}
        setLoading={props.setLoading}
        inventory={programClicked as IInventoryHotel}
        newDate={newDate}
        loading={props.loading}
        getInventories={props.getInventories}
        onCancel={() => setVisible(false)}
      />
      <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Space>
          <Statistic title='Año' groupSeparator='' value={date.getYear()} />
          <Divider type='vertical' />
          <Statistic title='Mes' groupSeparator='' value={setMonthToName()} />
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
    </Skeleton>
  )
}
export default CCalendar
