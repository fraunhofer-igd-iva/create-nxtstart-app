#!/usr/bin/env node

import {
  getProjectName,
  getPackageManager,
  getUseLatestVerions,
  getPackages,
  getExamples,
  getRunPrettier,
  getKeepGit,
  getDoInitialCommit,
  getSeedDb,
} from './questions.js'
import {
  initNodeNpm,
  initNodeYarn,
  addEnvFile,
  checkProjectFolder,
  removeGit,
  performInitialCommit,
  removeDefaultPage,
  upgradeToEslint9,
} from './projectCreationUtils.js'
import {
  addPackages,
  addRunScripts,
  updateEnvPrisma,
  updateEnvNextAuth,
  runFinalInstall,
  addVsCodeSdks,
} from './packageInstallationUtils.js'
import { addExamplesJson, addExample, addEmptyCypressDirectories, seedSqliteDb } from './exampleCreationUtils.js'
import { postProcessFile, runPrettier, removeNpmIgnore } from './filePostProcessor.js'
import * as path from 'path'
import chalk from 'chalk'
import gradient from 'gradient-string'

const TITLE_TEXT = `
 _   _  __   __  _______    _____   _______              _____    _______ 
| \\ | | \\ \\ / / |__   __|  / ____| |__   __|     /\\     |  __ \\  |__   __|
|  \\| |  \\ V /     | |    | (___      | |       /  \\    | |__) |    | |   
| . \` |   > <      | |     \\___ \\     | |      / /\\ \\   |  _  /     | |   
| |\\  |  / . \\     | |     ____) |    | |     / ____ \\  | | \\ \\     | |   
|_| \\_| /_/ \\_\\    |_|    |_____/     |_|    /_/    \\_\\ |_|  \\_\\    |_|   
`

console.log(gradient(['#009374', '#66BFAC', '#79B4D9', '#1F82C0']).multiline(TITLE_TEXT))
// Query setup data from user
const projectName = await getProjectName()
const keepGit = await getKeepGit()
const packageManager = await getPackageManager()
const useLatestVersions = await getUseLatestVerions()
// per default add mui and i18n
const packages = ['mui', 'i18n', ...(await getPackages())]
// per default add general files, mui and i18n
const examples = ['general', 'i18n', ...(await getExamples(packages))]

// setup nextjs project using selected package manager in the appropriate subfolder of the current directory
const CURR_DIR = process.cwd()
const targetPath = path.join(CURR_DIR, projectName)

createProject()

function createProject() {
  if (!checkProjectFolder(targetPath)) {
    throw new Error(chalk.red(`Folder ${targetPath} exists. Delete or use another name.`))
  }

  let success = false

  if (packageManager === 'npm') {
    success = initNodeNpm(CURR_DIR, targetPath)
  } else if (packageManager === 'yarn') {
    success = initNodeYarn(CURR_DIR, targetPath)
  }

  if (!success) {
    throw new Error(chalk.redBright('Failed creating NextJS project. create-next-app did not run successfully.'))
  }

  addExamplesJson(targetPath, examples)
  addEnvFile(targetPath)
  if (!keepGit) {
    removeGit(targetPath)
  }
  removeDefaultPage(targetPath)

  // remove once nextjs implements default eslint 9 usage into create next app
  upgradeToEslint9(targetPath, packageManager, useLatestVersions)
  
  console.log(chalk.green('Done creating nextjs project structure. Proceeding to install additional packages...'))

  installChosenPackages()
}

function installChosenPackages() {
  // add packages selected by the user
  addPackages(packageManager, packages, targetPath, useLatestVersions)

  addSdks()
}

function addSdks() {
  addVsCodeSdks(targetPath, packageManager)

  updateProjectRunScripts()
}

function updateProjectRunScripts() {
  // add run scripts to package.json
  addRunScripts(targetPath, packages, packageManager)

  implementExamples()
}

function implementExamples() {
  // add additional files and examples selected by the user
  examples.map((element) => {
    addExample(targetPath, element)
  })

  // additional file changes for prisma
  if (packages.includes('prisma')) {
    updateEnvPrisma(targetPath)
  }

  // additional file changes for nextAuth
  if (packages.includes('nextAuth')) {
    updateEnvNextAuth(targetPath)
  }

  if (examples.includes('cypress')) {
    addEmptyCypressDirectories(targetPath)
  }

  postProcessFiles()
}

function postProcessFiles() {
  postProcessFile(path.join(path.join(path.join(targetPath, 'app'), '[locale]'), 'layout.tsx'), examples)
  postProcessFile(path.join(path.join(targetPath, 'components'), 'NavBar.tsx'), examples)
  postProcessFile(path.join(path.join(targetPath, 'components'), 'ClientProviders.tsx'), examples)
  postProcessFile(path.join(path.join(targetPath, 'components'), 'PageLayout.tsx'), examples)
  postProcessFile(path.join(targetPath, 'Dockerfile'), [...examples, packageManager])
  postProcessFile(path.join(targetPath, '.env'), examples)
  postProcessFile(path.join(targetPath, '.env.sample'), examples)
  postProcessFile(path.join(targetPath, 'eslint.config.mjs'), examples)

  setTimeout(async () => {
    finishCreation()
  }, 2000)
}

function finishCreation() {
  runFinalInstall(packageManager, targetPath)
  removeNpmIgnore(targetPath)

  setTimeout(async () => {
    if (examples.includes('linting')) {
      const runP = await getRunPrettier()
      if (runP) {
        runPrettier(targetPath, packageManager)
      }
    }

    if (keepGit) {
      const doInitialCommit = await getDoInitialCommit()
      if (doInitialCommit) {
        performInitialCommit(targetPath)
      }
    }
    seedDb()
  }, 3000)
}

async function seedDb() {
  if (examples.includes('prisma')) {
    const seedDb = await getSeedDb()
    if (seedDb) {
      seedSqliteDb(targetPath, packages, packageManager)
    }
  }
}
