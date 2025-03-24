import React from 'react'
import { ExampleLayoutProps } from './types'

const ExampleLayout = ({children}: ExampleLayoutProps) => {
  return (
    <div>
      Example Layout
      {children}
    </div>
  )
}

export default ExampleLayout
