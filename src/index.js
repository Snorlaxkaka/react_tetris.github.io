import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App' // 你的App组件
import { Provider } from 'react-redux'
import { store, persistor } from './store'
import { PersistGate } from 'redux-persist/integration/react'

// 创建根节点
const root = ReactDOM.createRoot(document.getElementById('root'))

// 设置viewport的函数
function setViewport () {
  // 创建meta标签
  const viewportMeta = document.createElement('meta')
  viewportMeta.name = 'viewport'
  viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
  // 将meta标签添加到head中
  document.head.appendChild(viewportMeta)
}

// 调用设置viewport的函数
setViewport()

// 渲染应用
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
)