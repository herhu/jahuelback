import { Select } from 'antd'

const { Option } = Select

const children: Array<any> = []

for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>)
}

function handleChange (value: any) {
  console.log(`selected ${value}`)
}

export default (props: any) => (
  <Select
    allowClear
    style={{ width: '40%' }}
    placeholder={props.placeholder}
    onChange={handleChange}
  >
    {children}
  </Select>
)
