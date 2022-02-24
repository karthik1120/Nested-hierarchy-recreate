import React from 'react'
import { Checkbox } from 'antd'

const onChange = e => {
  console.log('e', e)
}

const renderData = () => <div>render some data</div>

export const columns = [
  {
    name: <Checkbox onChange={onChange} tier={'all'} />,
    dataId: (
      <input type="checkbox" id="vehicle2" name="vehicle1" value="Bike"></input>
    ),
    width: '2%',
  },
  {
    name: 'Name',
    dataId: 'tier_name',
    width: '13%',
    renderComp: renderData(),
  },
  {
    name: 'Category',
    dataId: 'tier_category_name',
    width: '10%',
    renderComp: renderData(),
  },

  {
    name: 'Users',
    dataId: 'tier_user_count',
    width: '10%',
    renderComp: renderData(),
  },
  {
    name: 'Location Name',
    dataId: 'tier_user_count',
    width: '10%',
    renderComp: renderData(),
  },
  {
    name: 'Published',
    dataId: 'enable_publish',
    width: '10%',
    renderComp: renderData(),
  },
  {
    name: 'Actions',
    dataId: 'tier_user_count',
    width: '10%',
    renderComp: renderData(),
  },
]
