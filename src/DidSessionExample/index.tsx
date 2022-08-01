import React, { useEffect } from 'react'
import { DIDSession } from 'did-session'
import { EthereumAuthProvider } from '@ceramicnetwork/blockchain-utils-linking'
import { CeramicClient } from '@ceramicnetwork/http-client'
import { useState } from 'react'

const sessionKey = 'ceramic-session'
const ceramic = new CeramicClient()

const checkSession = async () => {
  const storageSession = window.localStorage.getItem(sessionKey)
  if (storageSession == null) return

  const session = await DIDSession.fromSession(storageSession)
  // Use DIDs in ceramic, composedb & glaze libraries, ie
  ceramic.did = session.did

  return ceramic.did.id
}

const auth = async () => {
  const ethProvider = window.ethereum // import/get your web3 eth provider
  const accounts = await window.ethereum.request({
    method: 'eth_requestAccounts',
  })
  const authProvider = new EthereumAuthProvider(ethProvider, accounts[0])
  const session = await DIDSession.authorize(authProvider, {
    resources: [
      'kjzl6cwe1jw1490htuecdx3bto3sizyygppk3o1d19gz5evphr8r9fe411p5e0q',
    ],
  })

  // save to storage
  const sessionString = session.serialize()
  window.localStorage.setItem(sessionKey, sessionString)

  // Use DIDs in ceramic, composedb & glaze libraries, ie
  ceramic.did = session.did

  return ceramic.did.id
}

export const DidSessionExample = () => {
  const [did, setDid] = useState<string>()

  useEffect(() => {
    checkSession().then(val => {
      setDid(val)
    })
  }, [])

  return (
    <div>
      <h2>DID Session Example</h2>
      {did == null ? (
        <button
          onClick={async () => {
            const res = await auth()
            setDid(res)
          }}
        >
          Connect by DID Session
        </button>
      ) : (
        <div>{did}</div>
      )}
    </div>
  )
}
