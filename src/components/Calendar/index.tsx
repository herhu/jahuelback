import React, { useEffect, useState } from 'react'
import 'antd/dist/antd.css'
import './index.css'
import { DayPilot, DayPilotMonth } from 'daypilot-pro-react'
import { IprogramOracle } from '../../interfaces/IProgram'
import { IInventoryHotel } from '../../interfaces/IInventory'

import Modal from '../modal'

interface TProps {
  programs: IprogramOracle[]
  inventories: IInventoryHotel[]
}

const CCalendar = (props: TProps) => {
  useEffect(() => {
    setConfig({
      locale: 'es-es',
      showWeekend: true,
      startDate: DayPilot.Date.today(),
      onTimeRangeSelected: async (args: any) => {
        const modal = await DayPilot.Modal.prompt(
          'Create a new event:',
          'Event 1'
        )
        const dp = args.control
        dp.clearSelection()
        if (modal.canceled) {
          return
        }
        dp.events.add({
          start: args.start,
          end: args.end,
          id: DayPilot.guid(),
          text: modal.result
        })
      },
      onEventMoved: (args: any) => {
        args.control.message('Event moved: ' + args.e.text())
      },
      onEventResized: (args: any) => {
        args.control.message('Event resized: ' + args.e.text())
      },

      onEventClicked: (args: any) => {
        args.control.message('Event clicked: ' + args.e.text())
      },
      events: props.inventories
    })
  },[props.inventories])

  const [visible, setVisible] = useState(false)
  const [config, setConfig] = useState({})

  return (
    <>
      <Modal
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      />
      <DayPilotMonth {...config} />
    </>
  )
}
export default CCalendar
