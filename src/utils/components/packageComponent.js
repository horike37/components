const path = require('path')
const semver = require('semver')
const { fileExists, readFile } = require('@serverless/utils')

const log = require('../log')
const validateCoreVersion = require('../validateCoreVersion')
const pack = require('../pack')

module.exports = async (options) => {
  const format = options.format || 'zip'
  const slsYmlFilePath = path.join(process.cwd(), 'serverless.yml')
  if (!await fileExists(slsYmlFilePath)) {
    throw new Error('The package command can only be run inside a component directory')
  }

  const slsYml = await readFile(slsYmlFilePath)

  validateCoreVersion(slsYml.type, slsYml.core)

  if (semver.valid(slsYml.version) === null) {
    throw new Error('Please provide a valid version for your component')
  }

  if (!options.path) {
    throw new Error('Please provide an output path for the package with the --path option')
  }

  const outputFileName = `${slsYml.type}@${slsYml.version}.${format}`
  const outputFilePath = path.resolve(options.path, outputFileName)

  return pack(process.cwd(), outputFilePath)
    .then(() => log(`Component has been packaged in ${outputFilePath}`)) // eslint-disable-line
}
