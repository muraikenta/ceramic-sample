import React from 'react'
import ConnectButton from './ConnectButton'
import ViewerName, { SetViewerName } from './ViewerName'

export default function SelfidExample() {
  return (
    <div>
      <h2>Self.ID example</h2>
      <ConnectButton></ConnectButton>
      <ViewerName></ViewerName>
      <SetViewerName></SetViewerName>
    </div>
  )
}
