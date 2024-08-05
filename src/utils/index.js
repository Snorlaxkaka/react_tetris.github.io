const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

//游戏板块
export const boardDefault = () => {
  const rows = 18
  const cols = 10
  const array = Array.from(Array(rows), () => Array(cols).fill(0))
  return array
}

// 俄罗斯方块游戏中的所有形状及其旋转状态。
export const shapes = [
  //none
  [
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  ],
  //I
  [
    [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ],
  ],
  //T
  [
    [
      [0, 0, 0, 0],
      [1, 1, 1, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 1, 0, 0],
      [1, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 1, 0, 0],
      [1, 1, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0],
    ],
  ],
  // L
  [
    [
      [0, 0, 0, 0],
      [1, 1, 1, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [1, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 1, 0],
      [1, 1, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ],
  ],
  //J
  [
    [
      [1, 0, 0, 0],
      [1, 1, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 1, 1, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0],
      [1, 1, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [1, 1, 0, 0],
      [0, 0, 0, 0],
    ],
  ],
  // Z
  [
    [
      [0, 0, 0, 0],
      [1, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 1, 0],
      [0, 1, 1, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0],
    ],
  ],
  // S
  [
    [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [1, 1, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 0],
    ],
  ],
  //o
  [
    [
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  ],
]
// 生成一个随机的形状索引
export const randomShape = () => {
  return random(1, shapes.length - 1)
}

//初始化游戏的默认状态
export const defaultState = () => {
  return {
    board: boardDefault(),
    shape: randomShape(),
    rotation: 0,
    x: 5,
    y: -4,
    nextShape: randomShape(),
    isRunning: true,
    score: 0,
    speed: 500,
    gameOver: false,
    highestScore: 0,
  }
}

// 根据当前的旋转状态来获取下一个旋转状态。
export const nextRotation = (shape, rotation) => {
  return (rotation + 1) % shapes[shape].length
}
//判断是否可以移动
export const canMoveTo = (shape, board, x, y, rotation) => {
  const currentShape = shapes[shape][rotation]
  for (let row = 0; row < currentShape.length; row++) {
    for (let col = 0; col < currentShape[row].length; col++) {
      if (currentShape[row][col] !== 0) {
        const proposedX = col + x

        const proposedY = row + y

        if (proposedY < 0) {
          continue
        }

        const possibleRow = board[proposedY]

        if (possibleRow) {
          if (
            possibleRow[proposedX] === undefined ||
            possibleRow[proposedX] !== 0
          ) {
            return false
          }
        } else {
          return false
        }
      }
    }
  }
  return true
}

// 将形状添加到主板上，并返回更新后的主板和游戏结束状态。
export const addBlockToBoard = (shape, board, x, y, rotation) => {
  let blockOffBoard = false
  const block = shapes[shape][rotation]

  const newBoard = [...board]
  for (let row = 0; row < block.length; row++) {
    for (let col = 0; col < block[row].length; col++) {
      if (block[row][col]) {
        const yIndex = row + y
        if (yIndex < 0) {
          blockOffBoard = true
        } else {
          newBoard[row + y][col + x] = shape
        }
      }
    }
  }

  return { board: newBoard, gameOver: blockOffBoard }
}

// 检查并消除已填满的行，并返回消除行数用于更新得分。
export const checkRows = (board) => {
  const points = [0, 40, 100, 300, 1200]
  let completedRows = 0
  for (let row = 0; row < board.length; row++) {
    if (board[row].indexOf(0) === -1) {
      completedRows += 1
      board.splice(row, 1)
      board.unshift(Array(10).fill(0))
    }
  }
  return points[completedRows]
}
