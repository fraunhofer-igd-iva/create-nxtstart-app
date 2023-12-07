#!/usr/bin/env node

import {
  getProjectName,
  getPackageManager,
  getPackages,
  getExamples,
  getRunPrettier,
  getKeepGit,
  getDoInitialCommit,
} from './questions.js'
import {
  initNodeNpm,
  initNodeYarn,
  addEnvFile,
  checkProjectFolder,
  removeGit,
  performInitialCommit,
  removeDefaultPage,
} from './projectCreationUtils.js'
import {
  addPackages,
  addRunScripts,
  updateEnvPrisma,
  updateEnvNextAuth,
  runFinalInstall,
  addVsCodeSdks,
} from './packageInstallationUtils.js'
import { addExamplesJson, addExample, addEmptyCypressDirectories } from './exampleCreationUtils.js'
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
// per default add mui, redux and i18n
const packages = ['mui', 'i18n', ...(await getPackages())]
// per default add general files, the custom index page and the internationalization files
const examples = ['general', 'i18n', ...(await getExamples(packages))]

// setup nextjs project using selected package manager in the appropriate subfolder of the current directory
const CURR_DIR = process.cwd()
const targetPath = path.join(CURR_DIR, projectName)

createProject()

function createProject() {
  if (!checkProjectFolder(targetPath)) {
    throw new Error(chalk.red(`Folder ${targetPath} exists. Delete or use another name.`))
  }

  if (packageManager === 'npm') {
    initNodeNpm(CURR_DIR, targetPath)
  } else if (packageManager === 'yarn') {
    initNodeYarn(CURR_DIR, targetPath)
  }
  addExamplesJson(targetPath, examples)
  addEnvFile(targetPath)
  if (!keepGit) {
    removeGit(targetPath)
  }
  removeDefaultPage(targetPath)
  console.log(chalk.green('Done creating nextjs project structure. Proceeding to install additional packages...'))

  installChosenPackages()
}

function installChosenPackages() {
  // add packages selected by the user
  addPackages(packageManager, packages, targetPath)

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
  postProcessFile(path.join(targetPath, 'next.config.js'), examples)
  postProcessFile(path.join(path.join(path.join(targetPath, 'app'), '[locale]'), 'layout.tsx'), examples)
  postProcessFile(path.join(path.join(targetPath, 'components'), 'NavBar.tsx'), examples)
  postProcessFile(path.join(path.join(targetPath, 'components'), 'ClientProviders.tsx'), examples)
  postProcessFile(path.join(path.join(targetPath, 'components'), 'PageLayout.tsx'), examples)

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
  }, 3000)
}
