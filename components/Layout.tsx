import React, { useState } from 'react'
import type { MenuProps } from 'antd'
import { Layout, Menu } from 'antd'
import { PieChartOutlined, ShopOutlined, UploadOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'

const { Header, Content, Footer, Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
  return {
    key,
    icon,
    children,
    label
  } as MenuItem
}

const DEFAULT_ITEMS: MenuItem[] = [
  getItem('主页', 'main', <PieChartOutlined />),
  getItem('Demo 网站预览', 'review', <ShopOutlined />),
  getItem('上传新 Demo 文件', 'uploadNewDemoFile', <UploadOutlined />)
]

type Config = {
  icp?: string
  copyright?: string
}

interface Props {
  children?: React.ReactNode
  config?: Config
  items?: MenuItem[]
  defaultSelectedKey?: string
  onMenuClick?: (key: string) => void
}

export default function DefaultLayout({ children, config, items = [], onMenuClick, defaultSelectedKey }: Props) {
  const [collapsed, setCollapsed] = useState(false)
  const router = useRouter()
  const onCollapse = (collapsed: boolean) => {
    console.log(collapsed)
    setCollapsed(collapsed)
  }

  const [activeKey] = useState(
    defaultSelectedKey || router.asPath === '/' ? 'main' : router.asPath === '/review' ? 'review' : 'uploadNewDemoFile'
  )

  const handleClickMenu = (key: string) => {
    console.log('[handleClickMenu]', key)
    if (activeKey === key) return
    switch (key) {
      case 'main':
        router.push('/')
        break
      case 'review':
        router.push('/review')
        break
      case 'uploadNewDemoFile':
        router.push('/upload')
        break
      default:
        onMenuClick && onMenuClick(key)
    }
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="fc">
          <img style={{ width: '60px', height: '60px' }} src="/logo.png" alt="logo" />
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={[activeKey]}
          mode="inline"
          onClick={({ key }) => handleClickMenu(key)}
          items={DEFAULT_ITEMS.concat(items)}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>{children}</Content>
        <Footer style={{ textAlign: 'center' }}>
          {config?.icp && <span>{config.icp}</span>}
          <span>{config?.copyright || 'Siykt ©2022'}</span>
        </Footer>
      </Layout>
    </Layout>
  )
}
