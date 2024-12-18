import React from 'react'
import Square from './Square'

import { useSelector } from 'react-redux'
import { shapes } from '../../../utils'
import { moveDown } from '../game-slice'
import { useTimer } from '../../../utils/useTimer'

import '../../../styles/Board.css'

export default function Board () {
  const game = useSelector((state) => state.game)
  const { board, shape, rotation, x, y, isRunning, speed } = game
  //移动的方块（4*4）
  const block = shapes[shape][rotation]//获取当前形状的方块。

  const blockColor = shape //表示当前形状的颜色。

  // 根据 isRunning 和 speed 定时触发 moveDown 动作
  useTimer(isRunning, speed, moveDown)

  const boardSquare = board.map((rowArray, row) => {
    return rowArray.map((square, col) => {
      //col（0-9）row（0-17)
      const blockX = col - x
      const blockY = row - y

      //square为0
      let color = square
      //生成移动的block的颜色
      if (
        blockX >= 0 &&
        blockX < block.length &&
        blockY >= 0 &&
        blockY < block.length
      ) {
        color = block[blockY][blockX] === 0 ? color : blockColor
      }
      const k = row * board[0].length + col
      return <Square key={k} color={color} />
    })
  })
  return (
    <div className="board-container">
      <div className="board">{boardSquare}</div>
    </div>
  )
}
