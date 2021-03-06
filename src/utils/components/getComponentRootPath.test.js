const { getTmpDir } = require('@serverless/utils')
const path = require('path')
const getRegistryRoot = require('../getRegistryRoot')
const getComponentRootPath = require('./getComponentRootPath')

describe('#getComponentRootPath()', () => {
  it('should return a registry path if "type" parameter does not include path information', () => {
    const type = 'function-mock'
    const res = getComponentRootPath(type)
    const expected = path.join(getRegistryRoot(), type)
    expect(res).toEqual(expected)
  })

  it('should detect if "type" parameter includes path to local file system', () => {
    const type = './my-custom-component'
    const res = getComponentRootPath(type)
    const expected = path.resolve(type)
    expect(res).toEqual(expected)
  })

  describe('when no component "type" propert parameter is provided', () => {
    let oldCwd
    let tmpDirPath

    beforeEach(async () => {
      oldCwd = process.cwd()
      process.chdir(await getTmpDir())
      tmpDirPath = process.cwd()
    })

    afterEach(() => {
      process.chdir(oldCwd)
    })

    it('should default to the cwd if no parameter is provided', () => {
      const res = getComponentRootPath()
      expect(res).toEqual(tmpDirPath)
    })
  })
})
