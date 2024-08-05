import React from 'react'
import '../../../styles/Square.css'

// 渲染一个带有动态颜色样式的方块
export default function Square (props) {
  const squareColor = `square color-${props.color}`

  return <div className={squareColor}></div>
}
