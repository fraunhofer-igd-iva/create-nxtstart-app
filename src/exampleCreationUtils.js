import * as fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import chalk from 'chalk';


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export function addExample(projectPath, element) {
  // copies general templates directory with subdirectories and files
  const templatePath = path.join(path.join(__dirname, 'templates'), element)
  // only attempt to copy if folder exists
  if (fs.existsSync(templatePath)) {
    fs.cpSync(templatePath, projectPath, { recursive: true }, err => {
      if (err) return console.error(err)
      console.log(chalk.green(`Added ${element} files successfully!`))
    })
  } else {
    console.log(chalk.red(`No example filse found for ${element}!`))
  }
}

export function updateNextConfigI18n(projectPath) {
  fs.readFile(path.join(projectPath, 'next.config.js'), 'utf8', function (err, data) {
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
    fs.writeFile(path.join(projectPath, 'next.config.js'), result, 'utf8', function (err) {
      if (err) return console.log(err)
      console.log(chalk.green('Added NextAuth config!'))
    })
  })
}

export function updateEnvNextAuth(projectPath) {
  fs.appendFile(path.join(projectPath, '.env'),
    `
# Next Auth Variables
GITHUB_ID=<enter github id>
GITHUB_SECRET=<enter github secret>

# Update according to your deployment address (You can leave this for local development)
NEXTAUTH_URL=http://localhost:3000

# You should replace this secret when deploying your application
SECRET=qwertysecretForTheN3xtJ5Template

`, function (err) {
    if (err) throw err
    console.log(chalk.green('Added NextAuth .env!'))
  })
}

export function addCypressRunScripts(projectPath) {
  fs.readFile(path.join(projectPath, 'package.json'), 'utf8', function (err, data) {
    if (err) {
      return console.log(err)
    }
    const result = data.replace(
      /"start": "next start",/g,
      `"start": "next start",
  "test": "cypress run",
  "cypressGui": "yarn run cypress open",`
    )

    fs.writeFile(path.join(projectPath, 'package.json'), result, 'utf8', function (err) {
      if (err) return console.log(err)
      console.log(chalk.green('Added Cypress run scripts!'))
    })
  })
}

export function addNextAuthNavBar(projectPath) {
  // copies general templates directory with subdirectories and files
  fs.cpSync(path.join(path.join(__dirname, 'templates'), 'nextAuthNavBar'), projectPath, { recursive: true }, err => {
    if (err) return console.error(err)
    console.log(chalk.green('Updated NavBar to include NextAuth successfully!'))
  })
}