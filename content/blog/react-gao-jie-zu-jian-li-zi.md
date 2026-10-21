---
title: "2022-09-21 react高阶组件例子"
description: "高级组件例子"
date: 2022-09-21
collection: react
tags: ["React", "组件"]
readingTime: 1
wordage: 6
originalUrl: "https://www.jianshu.com/p/2370dcb660e9"
---
高级组件例子

```
import { PermissionContext } from '@constant/context'
import NoAuthView from '@jsroot/view/error/403.jsx'
import { getUserInfo, setupUserInfoByToken } from '@util/auth'
import { Spin } from 'antd'
import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}
export default function permissionsHandler(C) {
  @withRouter
  class PermissionsHOC extends React.Component {
    static contextType = PermissionContext

    constructor(props, context) {
      super(props, context)
      this.state = {
        cango: false,
        component: null,
        loading: false,
      }
    }

    async componentDidMount() {
      const res = getUserInfo()
      // 接收菜单数据
      window.addEventListener('message', (e) => {
        if (e && e.data.type === 'menuData') {
          console.log(e, '接收菜单数据')
          window.localStorage.setItem(
            'menuData',
            JSON.stringify(e.data.data.menuData)
          )
        }
      })

      if (!res) {
        // 权限
        try {
          this.setState({ loading: true })

          const result = await setupUserInfoByToken()
          console.log(result, 'result')
          if (result) {
            this.setState({ component: C })
          }
        } catch (err) {
          // eslint-disable-next-line no-console
          console.log(err, 'err')
        } finally {
          this.setState({ loading: false })
        }
      } else {
        this.setState({ component: C })
      }
    }

    render() {
      const { loading, component } = this.state

      return (
        <Fragment>
          {/* eslint-disable-next-line no-nested-ternary */}
          {loading ? (
            <Spin tip="Loading..."></Spin>
          ) : component ? (
            <C
              // eslint-disable-next-line no-return-assign
              ref={(ref) => (this.wrappedRef = ref)}
              {...this.props}
              permissions={this.permissions}
            />
          ) : (
            <NoAuthView />
          )}
        </Fragment>
      )
    }
  }
  PermissionsHOC.displayName = `PermissionsHOC(${getDisplayName(C)})`
  return PermissionsHOC
}
```
