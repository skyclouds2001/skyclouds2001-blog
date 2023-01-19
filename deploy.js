#! /usr/bin/env node

'use strict'

const child_process = require('child_process')
const path = require('path')
const fs = require('fs')

const source = 'D:\\程序\\skyclouds2001-blog'
const target = 'D:\\程序\\skyclouds2001.github.io'

const deleteDir = (src) => {
  for (const v of fs.readdirSync(src)) {
    const s = path.resolve(src, v)
    const stat = fs.statSync(s)
    if (stat.isFile()) {
      fs.unlinkSync(s)
    } else if (stat.isDirectory()) {
      deleteDir(s)
    } else {
      console.warn('Unexpected file', stat)
    }
  }
  fs.rmdirSync(src)
}

const copyDir = (src, tar) => {
  for (const v of fs.readdirSync(src)) {
    const s = path.resolve(src, v)
    const t = path.resolve(tar, v)
    const stat = fs.statSync(s)
    if (stat.isFile()) {
      fs.copyFileSync(s, t)
    } else if (stat.isDirectory()) {
      if (!fs.existsSync(t)) {
        fs.mkdirSync(t)
      }
      copyDir(s, t)
    } else {
      console.warn('Unexpected file', stat)
    }
  }
}

const main = () => {
  try {
    // check if node_modules exists
    if (!fs.existsSync(path.resolve(source, 'node_modules'))) {
      child_process.execSync('yarn')
    }

    // clean build files and generate build files
    child_process.execSync('npx hexo clean')
    child_process.execSync('npx hexo generate')

    // remove files in target
    for (const v of fs.readdirSync(target)) {
      if (!/.github|.git|LICENSE|README.md/.test(v)) {
        const src = path.resolve(target, v)
        const stat = fs.statSync(src)
        if (stat.isFile()) {
          fs.unlinkSync(src)
        } else if (stat.isDirectory()) {
          deleteDir(src)
        } else {
          console.warn('Unexpected file', stat)
        }
      }
    }

    // copy files to target
    copyDir(path.resolve(source, 'public'), target)
  } catch (error) {
    console.error(error)
  }
}

main()
