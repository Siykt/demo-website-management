import type { NextPage } from 'next'
import Head from 'next/head'
import { Card, Col, Row } from 'antd'
import React from 'react'
import Layout from '../components/Layout'
import Link from 'next/link'

const TEMPLATES = ['company-1', 'company-2']

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
          <Row gutter={10}>
            <Col span={6}>
              {templates.map((id) => (
                <Link key={id} href={`/review?id=${id}`}>
                  {id}
                </Link>
              ))}
            </Col>
          </Row>
        </ICard>
      </div>
    </Layout>
  )
}

export default Home
