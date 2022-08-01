import React from 'react'
import { Provider } from '@self.id/framework'
import SelfidExample from './SelfidExample'
import { ThreeIdExample } from './ThreeIdExample'
import { DidSessionExample } from './DidSessionExample'

const App = () => {
  return (
    <Provider client={{ ceramic: 'testnet-clay' }}>
      <SelfidExample></SelfidExample>
      <hr />
      <ThreeIdExample></ThreeIdExample>
      <hr />
      <DidSessionExample></DidSessionExample>
    </Provider>
  )
}

export default App
