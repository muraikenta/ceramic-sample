import React, { useEffect } from 'react'
import { useState } from 'react'
import { auth, checkSession, ceramic } from './auth'

import { CeramicClient } from '@ceramicnetwork/http-client'
import { DataModel } from '@glazed/datamodel'
import { DIDDataStore } from '@glazed/did-datastore'
import { DID } from 'dids'
import { Ed25519Provider } from 'key-did-provider-ed25519'
import { getResolver } from 'key-did-resolver'
import { fromString } from 'uint8arrays'

// Import the model aliases created during development time
import modelAliases from '../../glazed/model.json' assert { type: 'json' }

const model = new DataModel({ ceramic, aliases: modelAliases })
const store = new DIDDataStore({ ceramic, model })

// const exampleNote = await model.loadTile('exampleNote')

// const newNote = await model.createTile('SimpleNote', { text: 'My new note' })

// await store.set('myNote', { text: 'This is my note' })

// const myNote = await store.get('myNote') // { text: 'This is my note' }

// console.log(myNote)

export const CeramicExample = () => {
  const [did, setDid] = useState<string>()

  useEffect(() => {
    checkSession().then(val => {
      setDid(val)
    })
    // model.loader.
  }, [])

  return (
    <div>
      <h2>Ceramic Example</h2>
      {did == null ? (
        <button
          onClick={async () => {
            const res = await auth()
            setDid(res)
          }}
        >
          Connect Wallet
        </button>
      ) : (
        <div>{did}</div>
      )}
    </div>
  )
}
