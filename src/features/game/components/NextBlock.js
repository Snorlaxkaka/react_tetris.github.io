import React from 'react'
import Square from './Square'
import '../../../styles/NextBlock.css'
import { useSelector } from 'react-redux'
import { shapes } from '../../../utils'  //形状

// 下一个方块形状
export default function NextBlock () {
  const nextShape = useSelector((state) => state.game.nextShape)
  const block = shapes[nextShape][0]  //获取 nextShape 对应的形状数据

  const blockToDisplay = block.map((rowArr, row) => {
    return rowArr.map((square, col) => {
      return (
        <Square key={`${row}${col}`} color={square === 0 ? 0 : nextShape} />
      )
    })
  })
  //渲染结果
  return <div className="next-block">{blockToDisplay}</div>
}
