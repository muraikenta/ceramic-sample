import React from 'react'
import { useViewerRecord } from '@self.id/framework'

export default function ViewerName() {
  const record = useViewerRecord('basicProfile')

  const text = record.isLoading
    ? 'Loading...'
    : record.content
    ? `Hello ${record.content.name || 'stranger'}`
    : 'No profile to load'
  return <div>{text}</div>
}

export function SetViewerName() {
  const record = useViewerRecord('basicProfile')

  return (
    <button
      disabled={!record.isMutable || record.isMutating}
      onClick={async () => {
        await record.merge!({ name: 'AliceBob' })
      }}
    >
      Set name
    </button>
  )
}
