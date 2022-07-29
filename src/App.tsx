import React from 'react'
import { Provider } from '@self.id/framework'
import SelfidExample from './SelfidExample'

const App = () => {
  return (
    <Provider client={{ ceramic: 'testnet-clay' }}>
      <SelfidExample></SelfidExample>
    </Provider>
  )
}

export default App
