import React, { useEffect, useState } from 'react'
import 'antd/dist/antd.css'
import './index.css'
import { DayPilot, DayPilotMonth } from 'daypilot-pro-react'
import { Space, Divider, Statistic } from 'antd'
import { IprogramOracle } from '../../interfaces/IProgram'
import { IInventoryHotel } from '../../interfaces/IInventory'

import Modal from '../modal'

interface TProps {
  programs: IprogramOracle[]
  inventories: IInventoryHotel[]
}

// interface Tconfig {
//   locale: string
//   showWeekend: boolean
//   startDate: DayPilot.Date
//   onTimeRangeSelected: (args: any) => Promise<void>
//   onEventMoved: (args: any) => void
//   onEventResized: (args: any) => void
//   events: IInventoryHotel[]
// }

const CCalendar = (props: TProps) => {
  const [visible, setVisible] = useState(false)
  const [config, setConfig] = useState({})
  const [programClicked, setProgramClicked] = useState<IInventoryHotel>()
  const [date, setDate] = useState(DayPilot.Date.today())

  useEffect(() => {
    setConfig({
      locale: 'es-es',
      showWeekend: true,
      startDate: date,
      // onTimeRangeSelected: async (args: any) => {
      //   const modal = await DayPilot.Modal.prompt(
      //     'Create a new event:',
      //     'Event 1'
      //   )
      //   const dp = args.control
      //   dp.clearSelection()
      //   if (modal.canceled) {
      //     return
      //   }
      //   dp.events.add({
      //     start: args.start,
      //     end: args.end,
      //     id: DayPilot.guid(),
      //     text: modal.result
      //   })
      // },
      onEventMoved: (args: any) => {
        args.control.message('Event moved: ' + args.e.text())
      },
      onEventResized: (args: any) => {
        args.control.message('Event resized: ' + args.e.text())
      },
      onEventClicked: (args: any) => {
        args.control.message('Event clicked: ' + args.e.text())
        setVisible(true)
        setProgramClicked(args.e.data)
      },
      events: props.inventories
    })
  }, [date, props.inventories])

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
