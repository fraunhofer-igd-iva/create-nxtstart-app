import * as fs from 'fs-extra';
import * as fsStandard from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export async function addGeneralFiles(projectPath) {
  // copies general templates directory with subdirectories and files
  fs.copy(path.join(path.join(__dirname, 'templates'), 'general'), projectPath, err => {
    if (err) return console.error(err)
    console.log(chalk.green('Updated general files successfully!'))
  })
}

export async function addIndexFiles(projectPath) {
  // copies general templates directory with subdirectories and files
  fs.copy(path.join(path.join(__dirname, 'templates'), 'index'), projectPath, err => {
    if (err) return console.error(err)
    console.log(chalk.green('Added custom index page successfully!'))
  })
}

export async function addExamples(projectPath, examples) {
  // copies general templates directory with subdirectories and files
  for (let index = 0; index < examples.length; index++) {
    const element = examples[index]
    const templatePath = path.join(path.join(__dirname, 'templates'), element)
    // only attempt to copy if folder exists
    if (fsStandard.existsSync(templatePath)) {
      fs.copy(templatePath, projectPath, err => {
        if (err) return console.error(err)
        console.log(chalk.green(`Updated ${element} files successfully!`))
      })
    } else {
      console.log(chalk.red(`No example filse found for ${element}!`))
    }
  }
}

export async function updateNextConfigI18n(projectPath) {
  fsStandard.readFile(path.join(projectPath, 'next.config.js'), 'utf8', function (err,data) {
    if (err) {
      return console.log(err)
    }
    const result = data.replace(
      /reactStrictMode: true,/g, 
      `reactStrictMode: true,
  i18n: i18n,`
    ).replace(
      /const nextConfig = {/g,
      `const { i18n } = require('./next-i18next.config')
      
const nextConfig = {`
    )
    fsStandard.writeFile(path.join(projectPath, 'next.config.js'), result, 'utf8', function (err) {
       if (err) return console.log(err)
    })
  })
}