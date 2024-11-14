import Link from 'next/link'
import React from 'react'
import { IoIosConstruct } from "react-icons/io";

const CommingSoon = () => {
  return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
      }}> 
      <div style={{ marginTop: '6rem', fontSize: '120px' }}>
        <IoIosConstruct />
      </div>
      <h3 style={{marginBottom: '2.5rem'}}>Coming-soon</h3>
      <Link href="/"> go Home </Link>
    </div>
  )
}

export default CommingSoon