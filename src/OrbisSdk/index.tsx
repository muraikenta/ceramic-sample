import React, { useEffect } from 'react'
import { useState } from 'react'

import { Orbis } from '@orbisclub/orbis-sdk'

let orbis = new Orbis()

export const OrbisSdkExample = () => {
  const [user, setUser] = useState()

  useEffect(() => {
    orbis.isConnected().then((res: any) => {
      setUser(res.did)
    })
  }, [])

  return (
    <div>
      <h2>Orbis Sdk Example</h2>
      {user == null ? (
        <button
          onClick={async () => {
            const res = await orbis.connect()
            setUser(res.did)
          }}
        >
          Connect by Orbis
        </button>
      ) : (
        <div>{user}</div>
      )}
    </div>
  )
}
