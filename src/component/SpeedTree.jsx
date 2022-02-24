import React, { useState, memo } from 'react'
import { FixedSizeList as List, areEqual } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import memoizeOne from 'memoize-one'
import { columns } from './columns'
import { Checkbox } from 'antd'

const Row = memo(({ data, index, style }) => {
  const { flattenedData, onOpen, onSelect } = data
  const node = flattenedData[index]
  const left = node.depth * 20
  return (
    <div
      className="item-background"
      style={style}

      // onClick={() => onOpen(node)}
    >
      <div
        // className={`${node.hasChildren ? 'tree-branch' : ''} ${
        //   node.collapsed ? 'tree-item-closed' : 'tree-item-open'
        // }`}
        onClick={e => onSelect(e, node)}
        style={{
          position: 'absolute',
          left: `${left}px`,
          width: `calc(100% - ${left}px)`,
        }}
      >
        {node.hasChildren && (
          <span
            onClick={() => onOpen(node)}
            style={{
              border: '1px solid',
              padding: '0 3px',
              borderRadius: 3,
              marginRight: 10,
            }}
          >
            {node.collapsed ? '+' : '-'}
          </span>
        )}
        <Checkbox
          type="checkbox"
          id={node.tier_id}
          name={node.tier_name}
          value={node.tier_id}
        />
        {columns.map(col => {
          return (
            <div
              style={{
                display: 'inline-block',
                padding: '0px 10px',
                width: `${col.width}`,
              }}
            >
              {/* {node[col.dataId]} */}
              {col.renderComp}
            </div>
          )
        })}
        {/* <div
        className={`${node.hasChildren ? "tree-branch" : ""} ${
          node.collapsed ? "tree-item-closed" : "tree-item-open"
        }`}
        onClick={(e) => onSelect(e, node)}
        style={{
          position: "absolute",
          left: `${left}px`,
          width: `calc(100% - ${left}px)`
        }}
      >
        {`${node.tier_name}`}
      </div> */}
      </div>
    </div>
  )
}, areEqual)

const getItemData = memoizeOne((onOpen, onSelect, flattenedData) => ({
  // memoizeOne ??
  onOpen,
  onSelect,
  flattenedData,
}))

const SpeedTree = ({ data }) => {
  // console.log(data, "DATA-----");
  const [openedNodeIds, setOpenedNodeIds] = useState([])

  const flattenOpened = treeData => {
    const result = []
    for (let node of data) {
      flattenNode(node, 1, result)
    }
    return result
  }

  const flattenNode = (node, depth, result) => {
    const { tier_id, tier_name, children } = node
    let collapsed = !openedNodeIds.includes(tier_id)
    result.push({
      ...node,
      hasChildren: children && children.length > 0,
      depth,
      collapsed,
    })

    if (!collapsed && children) {
      for (let child of children) {
        flattenNode(child, depth + 1, result)
      }
    }
  }

  const onOpen = node =>
    node.collapsed
      ? setOpenedNodeIds([...openedNodeIds, node.tier_id])
      : setOpenedNodeIds(openedNodeIds.filter(id => id !== node.tier_id))

  const onSelect = (e, node) => {
    console.log('e, node :>> ', e, node)
    //e.stopPropagation();
  }

  const flattenedData = flattenOpened(data)

  const itemData = getItemData(onOpen, onSelect, flattenedData)

  return (
    <React.Fragment>
      {/* <Instance /> */}
      <div>
        {columns.map(col => (
          <div
            style={{
              display: 'inline-block',
              // padding: '0px 10px',
              width: `${col.width}`,
            }}
          >
            {col.name}
          </div>
        ))}
      </div>
      <AutoSizer>
        {({ height, width }) => (
          <List
            className="List"
            height={height}
            itemCount={flattenedData.length}
            itemSize={32}
            width={width}
            itemKey={index => flattenedData[index].tier_id}
            itemData={itemData}
          >
            {Row}
          </List>
        )}
      </AutoSizer>
    </React.Fragment>
  )
}

export default SpeedTree
