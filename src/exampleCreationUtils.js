import * as fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import chalk from 'chalk';
import shell from 'shelljs';


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export async function addExamplesJson(projectPath, examples) {
  fs.writeFile(path.join(projectPath, 'webstart.config.json'), JSON.stringify(examples), function (err) {
    if (err) {
      return console.log(err)
    }
    console.log(chalk.green('Webstart config json created!'))
  })
}

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

export async function updateNextConfig(projectPath, packages) {
  fs.readFile(path.join(projectPath, 'next.config.js'), 'utf8', function (err, data) {
    if (err) {
      return console.log(err)
    }
    let result = data
    
    if (packages.includes('i18n')) {
      result = result.replace(
        /reactStrictMode: true,/g,
        `reactStrictMode: true,
  i18n: i18n,`
      ).replace(
        /const nextConfig = {/g,
        `const { i18n } = require('./next-i18next.config')
  
const nextConfig = {`
      )
    }
    
    if (packages.includes('pwa')) {
      result = result.replace(
        /module.exports = nextConfig/g,
        `module.exports = withPWA(nextConfig)`
      ).replace(
        /const nextConfig = {/g,
        `// disable service worker in development to prevent warning spam https://github.com/GoogleChrome/workbox/issues/1790.
// enable again to test service worker locally
const withPWA = require('next-pwa')({dest: 'public', disable: process.env.NODE_ENV === 'development'})
  
const nextConfig = {`
      )
    }

    fs.writeFile(path.join(projectPath, 'next.config.js'), result, 'utf8', function (err) {
      if (err) return console.log(err)
      console.log(chalk.green('Added NextAuth config!'))
    })
  })
}

export async function updateEnvNextAuth(projectPath) {
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

export function addNextAuthNavBar(projectPath) {
  fs.cpSync(path.join(path.join(__dirname, 'templates'), 'nextAuthNavBar'), projectPath, { recursive: true }, err => {
    if (err) return console.error(err)
    console.log(chalk.green('Updated NavBar to include NextAuth successfully!'))
  })
}

export function addNextAuthAndAnimation(projectPath) {
  fs.cpSync(path.join(path.join(__dirname, 'templates'), 'nextAuthAndAnimation'), projectPath, { recursive: true }, err => {
    if (err) return console.error(err)
    console.log(chalk.green('Updated _app to include NextAuth and Animation Provider successfully!'))
  })
}

export function addEmptyCypressDirectories(projectPath) {
  // create empty directories for testing package that won't be present otherwise
  shell.mkdir('-p', path.join(path.join(projectPath, 'cypress'), 'screenshots'), path.join(path.join(projectPath, 'cypress'), 'videos'))
  console.log(chalk.green(`Added empty cypress directories successfully!`))
}