import type { NextPage } from 'next'
import Head from 'next/head'
import { Card, Col, Row } from 'antd'
import React, { useEffect, useRef } from 'react'
import { Bar, Line, Pie } from '@antv/g2plot'
import Layout from '../components/Layout'
import style from '../styles/home.module.scss'
import Link from 'next/link'

interface StaticProps {
  visitCountData: { time: string; count: number }[]
  visitRegionData: { region: string; count: number }[]
  preferenceData: { name: string; count: number }[]
}

export async function getStaticProps() {
  return {
    props: {
      visitCountData: [
        {
          time: '5-1',
          count: 18
        },
        {
          time: '5-2',
          count: 19
        },
        {
          time: '5-3',
          count: 20
        },
        {
          time: '5-4',
          count: 21
        },
        {
          time: '5-5',
          count: 20
        },
        {
          time: '5-6',
          count: 18
        },
        {
          time: '5-7',
          count: 18
        }
      ],
      visitRegionData: [
        {
          region: '华东',
          count: 18
        },
        {
          region: '华南',
          count: 30
        },
        {
          region: '华中',
          count: 28
        },
        {
          region: '华北',
          count: 10
        },
        {
          region: '华西',
          count: 5
        }
      ],
      preferenceData: [
        {
          name: '简洁',
          count: 8
        },
        {
          name: '明亮',
          count: 6
        },
        {
          name: '优雅',
          count: 5
        },
        {
          name: '大气',
          count: 30
        },
        {
          name: '深邃',
          count: 20
        }
      ]
    }
  }
}

const Home: NextPage<StaticProps> = ({ visitCountData, visitRegionData, preferenceData }) => {
  const visitCountChart = useRef<HTMLDivElement>(null)
  const visitRegionChart = useRef<HTMLDivElement>(null)
  const preferenceChart = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const line = new Line(visitCountChart.current as HTMLDivElement, {
      appendPadding: 25,
      data: visitCountData,
      xField: 'time',
      yField: 'count',
      smooth: true,
      meta: { time: { alias: '时间' }, count: { alias: '访问量' } }
    })
    line.render()
    return () => line.destroy()
  })

  useEffect(() => {
    const pie = new Pie(visitRegionChart.current as HTMLDivElement, {
      data: visitRegionData,
      angleField: 'count',
      colorField: 'region',
      radius: 0.75,
      interactions: [{ type: 'element-selected' }, { type: 'element-active' }]
    })
    pie.render()
    return () => pie.destroy()
  })
  useEffect(() => {
    const bar = new Bar(preferenceChart.current as HTMLDivElement, {
      appendPadding: 15,
      data: preferenceData.sort((a, b) => b.count - a.count),
      xField: 'count',
      yField: 'name',
      seriesField: 'name',
      meta: { name: { alias: '偏好' }, count: { alias: '人数' } }
    })
    bar.render()
    return () => bar.destroy()
  })

  const ICard = (props: { title?: string; children?: React.ReactNode }) => (
    <Card title={props.title} bordered={false}>
      {props.children}
    </Card>
  )

  const ICol = ({ children }: { children: React.ReactNode }) => (
    <Col lg={8} xs={24}>
      {children}
    </Col>
  )

  return (
    <Layout>
      <Head>
        <title>Demo 网站预览</title>
        <meta name="description" content="Demo 网站预览" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mt-20 mb-20">
        <ICard title="访问数据">
          <Row gutter={10}>
            <ICol>
              <h3>访问次数</h3>
              <div ref={visitCountChart} className={style.chart} />
            </ICol>
            <ICol>
              <h3>访问地域</h3>
              <div ref={visitRegionChart} className={style.chart} />
            </ICol>
            <ICol>
              <h3>喜好排名</h3>
              <div ref={preferenceChart} className={style.chart} />
            </ICol>
          </Row>
        </ICard>
        <ICard title="概览">
          <Row gutter={10}>
            <Col span={6}>
              <h3>已有模版</h3>
              <p>30</p>
            </Col>
            <Col span={6}>
              <h3>访客</h3>
              <p>320</p>
            </Col>
          </Row>
        </ICard>
        <ICard title="快捷入口">
          <Row gutter={10}>
            <Col span={6}>
              <Link href="/demos/hk/index.html">模版网站A</Link>
            </Col>
          </Row>
        </ICard>
      </div>
    </Layout>
  )
}

export default Home
