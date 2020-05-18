#!/usr/bin/env node

/* eslint-disable no-sync */
const path = require('path')
const fs = require('fs')
const process = require('process')
const commander = require('commander')
const {
  runSync,
  spawnInteractive,
  npmInteractive,
  npxInteractive,
  webpackInteractive,
  gcloudJson,
  gcloudInteractive,
  firebaseInteractive,
} = require('@kynikos/tasks/subprocess')
const {
  linkDependencies,
  maintainPackageDependencies,
} = require('@kynikos/tasks/dependencies')
// I can't define these constants directly in this script because they're also
// required by webpack.config.js, which in turn can't require this whole script
// because commander.js eats all the command-line arguments and the webpack-cli
// command wouldn't be able to read its own arguments
const {SRCDIR, SRCLOCAL, SRCPRODUCTION, DISTDIR, AUXDIR} =
  require('./tasks-const')

commander
  .command('deps')
  .description('run semi-automated dependency maintenance operations')
  .action(() => maintainDependencies())

commander
  .command('build [VERSION]')
  .description('recompile user scripts; optionally assign a version string to \
the build; if not given, only the testing script is recompiled')
  .option('-n, --no-links', "do not create npm links to my dependencies \
(relies on having run the 'deps --no-links' command first)")
  .action((version, {links}) => build(version, links))

commander
  .command('lint')
  .description('lint the source code')
  .action(() => lint())

commander
  .command('test [REGEX]')
  .description('run the automated tests; optionally only run tests with a name \
that matches REGEX')
  // eslint-disable-next-line jest/require-top-level-describe,jest/no-disabled-tests,jest/expect-expect,jest/valid-title
  .action((regex) => test(regex))

commander
  .command('gencert')
  .description('generate the certificate to serve the user scripts from localhost')
  .action(() => genCert())

commander
  .command('serve')
  .description('serve the user scripts on localhost')
  .action(() => serve())

commander.parse(process.argv)


function maintainDependencies() {
  maintainPackageDependencies(
    __dirname,
    {
      regExpsToLink: [/^@kynikos\//u],
      recursiveLinks: true,
    }
  )
}


function build(version, links) {
  if (links) {
    linkDependencies({
      cwd: __dirname,
      regExps: [/^@kynikos\//u],
      ask: false,
      recurse: true,
    })
  }

  for (const fname of SRCLOCAL) {
    webpackInteractive([
      '--env.entry',
      fname,
    ], {})
  }

  if (version) {
    for (const fname of SRCPRODUCTION) {
      webpackInteractive([
        '--env.entry',
        fname,
        '--env.production',
      ], {})
      webpackInteractive([
        '--env.entry',
        fname,
        '--env.production',
        '--env.minified',
      ], {})
    }
  }

  if (version) {
    npmInteractive({args: [
      '--allow-same-version',
      '--no-git-tag-version',
      'version',
      version,
    ]})
  }
}


function lint() {
  // See also the .eslintignore file
  return npxInteractive(['eslint', __dirname])
}


function test(testNameRegex) {
  npxInteractive([
    'jest',
    ...testNameRegex ? ['--testNamePattern', testNameRegex] : [],
  ])
}


function genCert() {
  spawnInteractive({
    command: 'openssl',
    args: [
      'genrsa',
      '-out',
      'dev-key.pem',
      '2048',
    ],
    options: {cwd: AUXDIR},
  })
  spawnInteractive({
    command: 'openssl',
    args: [
      'req',
      '-new',
      '-key',
      'dev-key.pem',
      '-out',
      'dev.csr',
    ],
    options: {cwd: AUXDIR},
  })
  spawnInteractive({
    command: 'openssl',
    args: [
      'x509',
      '-req',
      '-in',
      'dev.csr',
      '-signkey',
      'dev-key.pem',
      '-out',
      'dev-cert.pem',
    ],
    options: {cwd: AUXDIR},
  })
  fs.unlinkSync(path.join(AUXDIR, 'dev.csr'))
}


function serve() {
  npxInteractive([
    'http-server',
    '--cors',
    '--ssl',
    '--cert', path.join(AUXDIR, 'dev-cert.pem'),
    '--key', path.join(AUXDIR, 'dev-key.pem'),
  ])
}
