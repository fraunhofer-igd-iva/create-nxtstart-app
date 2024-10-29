import * as fs from 'fs'
import path from 'path'
import shell from 'shelljs'
import chalk from 'chalk'

export function checkProjectFolder(projectPath) {
  if (fs.existsSync(projectPath)) {
    return false
  }
  return true
}

export function initNodeNpm(pathToParentDirectory, pathToProject) {
  shell.cd(pathToParentDirectory)

  const result = shell.exec(
    `npx create-next-app@latest "${pathToProject}" --ts --eslint --no-src-dir --app --import-alias @/* --use-npm --no-tailwind --turbopack`
  )

  if (result.code !== 0) {
    return false
  }

  return true
}

export function initNodeYarn(pathToParentDirectory, pathToProject) {
  shell.cd(pathToParentDirectory)
  // set yarn version in parent dict so installation does not fail
  shell.exec('yarn set version stable')
  // clean up package.json thats created when switching yarn versions
  shell.rm('package.json')

  const result = shell.exec(
    `npx create-next-app@latest "${pathToProject}" --ts --eslint --no-src-dir --app --import-alias @/* --use-yarn --no-tailwind --no-turbopack`
  )

  if(result.code === 0) {
    shell.cd(pathToProject)
    // set yarn version for new project
    shell.exec('yarn set version stable')

    // disable default telemetry
    shell.exec('yarn next telemetry disable')
  }

  // clean up parent dict
  shell.cd(pathToParentDirectory)
  shell.rm('-rf', '.yarn')
  shell.rm('.yarnrc.yml')

  if (result.code !== 0) {
    return false
  }

  return true
}

export function addEnvFile(projectPath) {
  fs.writeFileSync(
    path.join(projectPath, '.env'), '',
    function (err) {
      if (err) {
        return console.log(err)
      }
      console.log(chalk.green('Env file created!'))
    }
  )
}

export function removeGit(projectPath) {
  fs.rmSync(path.join(projectPath, '.git'), { recursive: true, force: true })
  console.log(chalk.green('Removed .git folder!'))
}

export function removeDefaultPage(projectPath) {
  fs.rmSync(path.join(path.join(projectPath, 'app'), 'page.tsx'))
  fs.rmSync(path.join(path.join(projectPath, 'app'), 'layout.tsx'))
  fs.rmSync(path.join(path.join(projectPath, 'app'), 'page.module.css'))
  console.log(chalk.green('Removed default page!'))
}

export function performInitialCommit(projectPath) {
  shell.cd(projectPath)
  // add all files except those in .gitignore
  shell.exec('git add .')
  // commit
  shell.exec('git commit -m "Initial commit"')
}
