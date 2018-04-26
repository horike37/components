const os = require('os')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const fse = require('../fs/fse')

const TMP_DIR = os.tmpdir()
// Workaround for https://github.com/nodejs/node/issues/11422
let resolved
const getActualTmpDir = () => {
  if (!resolved) {
    resolved = fs.realpathSync(TMP_DIR)
  }
  return resolved
}

async function getTmpDir() {
  const tmpDirPath = path.join(
    getActualTmpDir(),
    'tmpdirs-serverless-components',
    crypto.randomBytes(8).toString('hex')
  )

  await fse.ensureDirAsync(tmpDirPath)

  return tmpDirPath
}

module.exports = getTmpDir
