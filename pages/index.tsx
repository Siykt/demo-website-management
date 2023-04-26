import type { NextPage } from 'next'
import Head from 'next/head'
import { Card } from 'antd'
import React from 'react'
import Layout from '../components/Layout'
import Link from 'next/link'
import styles from '../styles/home.module.scss'
import classnames from 'classnames'

const TEMPLATES = ['company-1', 'company-2', 'company-3']

interface StaticProps {
  templates: string[]
}

export async function getStaticProps() {
  return {
    props: {
      templates: TEMPLATES
    }
  }
}

const Home: NextPage<StaticProps> = ({ templates }) => {
  const ICard = (props: { title?: string; children?: React.ReactNode }) => (
    <Card title={props.title} bordered={false}>
      {props.children}
    </Card>
  )

  return (
    <Layout>
      <Head>
        <title>Demo 网站预览</title>
        <meta name="description" content="Demo 网站预览" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mt-20 mb-20">
        <ICard title="模版列表">
          <div className={styles.reviewWrapper}>
            {templates.map((id) => (
              <div key={id} className={styles.reviewWrapperBox}>
                <div className={styles.title}>模版 {id}</div>
                <iframe className={classnames('w-full', 'h-full')} src={`/templates/${id}/index.html`}></iframe>
                <div className={styles.toReview}>
                  <Link href={`/review?id=${id}`}>前往预览</Link>
                </div>
              </div>
            ))}
          </div>
        </ICard>
      </div>
    </Layout>
  )
}

export default Home
