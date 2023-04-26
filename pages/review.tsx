import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import DefaultLayout from '../components/Layout'
import style from '../styles/review.module.scss'

const Review: NextPage = () => {
  const router = useRouter()
  const src = `/templates/${router.query.id}/index.html`

  return (
    <DefaultLayout defaultSelectedKey="main">
      <Head>
        <title>Demo 网站预览</title>
        <meta name="description" content="Demo 网站预览" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={style.container}>
        <iframe className="w-full h-full" src={src}></iframe>
      </div>
    </DefaultLayout>
  )
}

export default Review
