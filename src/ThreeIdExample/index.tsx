import React, { useEffect } from 'react'
import { CeramicClient } from '@ceramicnetwork/http-client'
import { DID } from 'dids'
import { getResolver as getKeyResolver } from 'key-did-resolver'
import { getResolver as get3IDResolver } from '@ceramicnetwork/3id-did-resolver'
import { EthereumAuthProvider, ThreeIdConnect } from '@3id/connect'
import { useState } from 'react'

// Create a ThreeIdConnect connect instance as soon as possible in your app to start loading assets
const threeID = new ThreeIdConnect()

async function authenticateWithEthereum(ethereumProvider: any) {
  // Request accounts from the Ethereum provider
  const accounts = await ethereumProvider.request({
    method: 'eth_requestAccounts',
  })
  // Create an EthereumAuthProvider using the Ethereum provider and requested account
  const authProvider = new EthereumAuthProvider(ethereumProvider, accounts[0])
  // Connect the created EthereumAuthProvider to the 3ID Connect instance so it can be used to
  // generate the authentication secret
  await threeID.connect(authProvider)

  const ceramic = new CeramicClient()
  // const ipfs = await IPFS.create()
  // const ceramic = await Ceramic.create(ipfs)
  const did = new DID({
    // Get the DID provider from the 3ID Connect instance
    provider: threeID.getDidProvider(),
    resolver: {
      ...get3IDResolver(ceramic),
      ...getKeyResolver(),
    },
  })

  // Authenticate the DID using the 3ID provider from 3ID Connect, this will trigger the
  // authentication flow using 3ID Connect and the Ethereum provider
  await did.authenticate()

  // The Ceramic client can create and update streams using the authenticated DID
  ceramic.did = did
  window.ceramic = ceramic
  return did.id
}

// When using extensions such as MetaMask, an Ethereum provider may be injected as `window.ethereum`
async function tryAuthenticate() {
  if (window.ethereum == null) {
    throw new Error('No injected Ethereum provider')
  }
  return await authenticateWithEthereum(window.ethereum)
}

export const ThreeIdExample = () => {
  const [did, setDid] = useState<string>()

  useEffect(() => {
    // console.log('@@@@@@@@@@@@')
    // threeID.connect(undefined)
    // const provider = threeID.getDidProvider()
    // const did = new DID({ provider })
    // console.log(did.id, did.parent)
  }, [])
  return (
    <div>
      <h2>3ID Example</h2>
      {did == null ? (
        <button
          onClick={async () => {
            const res = await tryAuthenticate()
            setDid(res)
          }}
        >
          Connect by 3ID
        </button>
      ) : (
        <div>{did}</div>
      )}
    </div>
  )
}
