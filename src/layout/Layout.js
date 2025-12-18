import React from 'react'
import Head from 'next/head'

import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import BackgroundAnimation from '../components/BackgrooundAnimation/BackgroundAnimation'
import { MetaData } from '../constants/constants'

export const Layout = ({ children }) => {
  return (
    <div className="max-w-7xl w-full mx-auto">
      <Head>
        <title>{MetaData.title}</title>
        <meta name="description" content={MetaData.description} />
      </Head>
      <Header />
      <BackgroundAnimation />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
