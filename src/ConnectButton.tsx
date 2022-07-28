import React from 'react'
import { EthereumAuthProvider, useViewerConnection } from '@self.id/framework'

export default function ConnectButton() {
  const [connection, connect, disconnect] = useViewerConnection()

  return connection.status === 'connected' ? (
    <div>
      Hello {connection.selfID.id}
      <button
        onClick={() => {
          disconnect()
        }}
      >
        Disconnect ({connection.selfID.id})
      </button>
    </div>
  ) : (
    <button
      disabled={connection.status === 'connecting'}
      onClick={async () => {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        })
        await connect(new EthereumAuthProvider(window.ethereum, accounts[0]))
      }}
    >
      Connect
    </button>
  )
}
