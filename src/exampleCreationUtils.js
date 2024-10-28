import * as fs from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'
import chalk from 'chalk'
import shell from 'shelljs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export function addExamplesJson(projectPath, examples) {
  fs.writeFileSync(path.join(projectPath, 'nxtstart.config.json'), JSON.stringify(examples), function (err) {
    if (err) {
      return console.log(err)
    }
    console.log(chalk.green('Nxtstart config json created!'))
  })
}

export function addExample(projectPath, element) {
  // copies specific templates directory with subdirectories and files
  const templatePath = path.join(path.join(__dirname, 'templates'), element)
  // only attempt to copy if folder exists
  if (fs.existsSync(templatePath)) {
    fs.cpSync(templatePath, projectPath, { recursive: true }, (err) => {
      if (err) return console.error(err)
      console.log(chalk.green(`Added ${element} files successfully!`))
    })
  } else {
    console.log(chalk.green(`No example files found for ${element}!`))
  }
}

export function addEmptyCypressDirectories(projectPath) {
  // create empty directories for testing package that won't be present otherwise
  shell.mkdir(
    '-p',
    path.join(path.join(projectPath, 'cypress'), 'screenshots'),
    path.join(path.join(projectPath, 'cypress'), 'videos')
  )
  console.log(chalk.green(`Added empty cypress directories successfully!`))
}

export function seedSqliteDb(projectPath, packages, packageManager) {
  if (packages.includes('prisma')) {
    shell.cd(projectPath)
    if (packageManager === 'yarn') {
      shell.exec('yarn prisma db push')
      shell.exec('yarn db:generate')
      console.log(chalk.cyan(`Start data insertion...`))
      shell.exec('yarn db:seed')
    } else if (packageManager === 'npm') {
      shell.exec('npx prisma db push')
      console.log(chalk.cyan(`Start data insertion...`))
      shell.exec('npm run db:seed')
    }
    console.log(chalk.green(`Created SQLite database and seeded with example data!`))
  }
}
