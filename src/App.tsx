import React from 'react'
import { Provider } from '@self.id/framework'
import ConnectButton from './ConnectButton'
import ViewerName, { SetViewerName } from './ViewerName'

const App = () => {
  return (
    <Provider client={{ ceramic: 'testnet-clay' }}>
      <ConnectButton></ConnectButton>
      <ViewerName></ViewerName>
      <SetViewerName></SetViewerName>
    </Provider>
  )
}

export default App
