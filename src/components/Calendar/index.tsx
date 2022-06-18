import React, { FC, useState, useEffect } from 'react'
import 'antd/dist/antd.css'
import './index.css'
import { IlistData } from '../../interfaces/Icalendar'
import { Calendar, Badge } from 'antd'
import moment from 'moment'
import { IInventory } from '../../interfaces/IInventory'

import Modal from '../modal'

interface TProps {
  inventory: IInventory[]
}

const CCalendar = (props: TProps) => {
  const [visible, setVisible] = useState(false)
  const [currDate, setCurrDate] = useState(moment())
  const [numRefThisMonth, setNumRefThisMonth] = useState(0)
  const [listOfRefsByDate, setListOfRefsByDate] = useState([])

  useEffect(() => {
    console.log(`from Use STATE::Month is ${currDate.month() + 1}`)
    let tempState = {} as any

    setNumRefThisMonth(props.inventory.length) // 3

    props.inventory.map(day => {
      const dayNum = day.start.toString().substring(8, 10) // my days

      if (tempState.hasOwnProperty(dayNum)) {
        // create a object with key as day with data and value as quantity of data
        tempState[dayNum]++
      } else {
        tempState[dayNum] = 1
      }
    })

    setListOfRefsByDate(tempState)
  }, [currDate])

  function dateCellRender (value: any) {
    let listData = [] as IlistData[]

    const currDateRender =
      value.date() < 10
        ? '0' + value.date().toString()
        : value.date().toString() // add 0 to the current

    if (
      listOfRefsByDate.hasOwnProperty(currDateRender) &&
      value.month() === currDate.month()
    ) {
      listData = [
        {
          status: 'success',
          content: `${listOfRefsByDate[currDateRender]} habilitados`
        }
      ]
    }
    return (
      <ul className='events'>
        {listData.map((item, index) => (
          <li key={index}>
            <Badge status={'success'} text={item.content} />
          </li>
        ))}
      </ul>
    )
  }

  return (
    <>
      <Modal
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      />

      <Calendar
        dateCellRender={dateCellRender}
        onSelect={() => setVisible(true)}
      />
    </>
  )
}

export default CCalendar
