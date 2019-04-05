import * as React from 'react'
import * as ReactDOM from 'react-dom'

class App extends React.Component<any, any> {
  constructor (props) {
    super(props)
  }
  loadData () {
    // request data from server
    setTimeout(function () {
      throw new Error('something wrong happens')
    }, 1000)
  }
  render () {
    const arr = [1, 2, 3]
    var a: any = {}
    a.foo()
    return (
      <div>Hello App{arr[0]}</div>
    )
  }
}

ReactDOM.render(<App/>, document.querySelector('#app'))
