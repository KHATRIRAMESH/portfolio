import React from 'react'
import Head from 'next/head'

import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import BackgroundAnimation from '../components/BackgrooundAnimation/BackgroundAnimation'
import { Container } from './LayoutStyles'
import { MetaData } from '../constants/constants'

export const Layout = ({children}) => {
  return (
    <Container>
      <Head>
        <title>{MetaData.title}</title>
        <meta name="description" content={MetaData.description} />
      </Head>
      <Header/>
      <BackgroundAnimation />
      <main>{children}</main> 
      <Footer/>
    </Container>
  )
}

