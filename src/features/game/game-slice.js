import { createSlice } from '@reduxjs/toolkit'
import {
  nextRotation,
  canMoveTo,
  addBlockToBoard,
  checkRows,
  randomShape,
} from '../../utils'
import { defaultState } from '../../utils/index'

const initialState = defaultState() //初始化状态

const gameSlice = createSlice({
  name: 'game',
  initialState,

  reducers: {
    rotate: (state) => {
      const { shape, rotation, board, x, y } = state
      const newRotation = nextRotation(shape, rotation)
      if (canMoveTo(shape, board, x, y, newRotation)) {
        state.rotation = newRotation
      }
    }, //immer
    // 向右移动形状
    moveRight: (state) => {
      const { shape, rotation, board, x, y } = state
      if (canMoveTo(shape, board, x + 1, y, rotation)) {
        state.x = x + 1
      }
    },
    // 向左移动形状
    moveLeft: (state) => {
      const { shape, rotation, board, x, y } = state
      if (canMoveTo(shape, board, x - 1, y, rotation)) {
        state.x = x - 1
      }
    },
    // 向下移动形状
    moveDown: (state) => {
      const { shape, board, x, y, rotation, nextShape, score, isRunning } =
        state
      const maybeY = y + 1
      if (canMoveTo(shape, board, x, maybeY, rotation)) {
        state.y = maybeY
      } else {
        const obj = addBlockToBoard(shape, board, x, y, rotation)
        const newBoard = obj.board
        const gameOver = obj.gameOver
        if (gameOver) {
          state.shape = 0
          state.gameOver = gameOver
          state.board = newBoard
          state.isRunning = false
        } else {
          state.board = newBoard
          state.shape = nextShape
          state.nextShape = randomShape()

          state.score = score + checkRows(newBoard)
          state.isRunning = isRunning
          state.x = 5
          state.y = -4
          state.rotation = 0
        }
      }
    },
    // 继续
    resume: (state) => {
      state.isRunning = true
    },
    // 暂停
    pause: (state) => {
      state.isRunning = false
    },
    // 重开
    restart: (state) => {
      return {
        ...initialState,
        highestScore: state.highestScore,
      }
    },
    // 设置当前分数
    setScore: (state, action) => {
      state.score = action.payload
      if (state.score > state.highestScore) {
        state.highestScore = state.score
      }
    },
  },
})

export const {
  rotate,
  moveRight,
  moveLeft,
  moveDown,
  resume,
  pause,
  gameOver,
  restart,
  setScore,
} = gameSlice.actions

export default gameSlice.reducer
