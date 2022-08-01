import React from 'react'
import { Provider } from '@self.id/framework'
import SelfidExample from './SelfidExample'
import { ThreeIdExample } from './ThreeIdExample'

const App = () => {
  return (
    <Provider client={{ ceramic: 'testnet-clay' }}>
      <SelfidExample></SelfidExample>
      <hr />
      <ThreeIdExample></ThreeIdExample>
      <hr />
    </Provider>
  )
}

export default App
