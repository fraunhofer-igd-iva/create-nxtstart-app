import * as fsExtra from 'fs-extra';
import * as fsStandard from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import chalk from 'chalk';


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export async function addGeneralFiles(projectPath) {
  // copies general templates directory with subdirectories and files
  fsExtra.copy(path.join(path.join(__dirname, 'templates'), 'general'), projectPath, err => {
    if (err) return console.error(err)
    console.log(chalk.green('Updated general files successfully!'))
  })
}

export async function addIndexFiles(projectPath) {
  // copies general templates directory with subdirectories and files
  fsExtra.copy(path.join(path.join(__dirname, 'templates'), 'index'), projectPath, err => {
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
      fsExtra.copy(templatePath, projectPath, err => {
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
       console.log(chalk.green('Added NextAuth config!'))
    })
  })
}

export async function updateEnvNextAuth(projectPath) {
  fsStandard.appendFile(path.join(projectPath, '.env'), 
`
# Next Auth Variables
# TODO remove 
GITHUB_ID=93222600017a00c6e424
GITHUB_SECRET=1f44c75dcb0c51fd6347bc206ff714c2dd5c021d

NEXTAUTH_URL=http://localhost:3000

SECRET=qwertysecretForTheN3xtJ5Template

`, function (err) {
    if (err) throw err
    console.log(chalk.green('Added NextAuth .env!'))
  })
}