const parse = require('@babel/parser').parse
const traverse = require('@babel/traverse').default
const generate = require('@babel/generator').default
const template = require('@babel/template').default


const wrapFunction = template(`{
  try {
    BODY
  } catch(err) {
    console.log(err)
    // update the err info to server
  }
}`)

module.exports = function(source, map) {
  const { methodNames } = this.loaders[this.loaderIndex].options
  const ast = parse(source, {
    sourceType: 'module',
    plugins: [
      'jsx',
      'typescript',
    ]
  })
  traverse(ast, {
    ClassMethod: {
      exit: function exit(path, state) {
        if (path.node && path.node.key && path.node.key.name)  {
          if(methodNames.indexOf(path.node.key.name) > -1) {
            const body = path.node.body.body
            path.get('body').replaceWith(wrapFunction({
              BODY: body,
            }))
          }
        }
      }
    },
  })
  const output = generate(ast, { /* options */ })
  console.log(output.code)
  return output.code
}
