import Link from 'next/link'
import React from 'react'

const pages = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      textAlign: 'center',
    }}>
      <h2> Not Found Page !!  </h2>
      <Link href="/"> go Home </Link>
    </div>
  )
}

export default pages