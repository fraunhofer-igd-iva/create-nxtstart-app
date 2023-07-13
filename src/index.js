#!/usr/bin/env node

import { getProjectName, getPackageManager, getPackages, getExamples, getRunPrettier } from './questions.js';
import { initNodeNpm, initNodeYarn, addEnvFile, checkProjectFolder } from './projectCreationUtils.js';
import { addPackages, addRunScripts, updateEnvPrisma, runFinalInstall } from './packageInstallationUtils.js';
import { addExamplesJson, addExample, updateNextConfig, updateEnvNextAuth, addEmptyCypressDirectories } from './exampleCreationUtils.js';
import { postProcessFile, runPrettier } from './filePostProcessor.js';
import * as path from 'path';
import chalk from 'chalk';

// Query setup data from user
const projectName = await getProjectName()
const packageManager = await getPackageManager()
// per default add mui, redux and i18n
const packages = ['mui', 'i18n', ...await getPackages()]
// per default add general files, the custom index page and the internationalization files
const examples = ['general', 'index', 'i18n', ...await getExamples(packages)]

// setup nextjs project using selected package manager in the appropriate subfolder of the current directory
const CURR_DIR = process.cwd()
const targetPath = path.join(CURR_DIR, projectName)

if (!checkProjectFolder(targetPath)) {
  throw new Error(chalk.red(`Folder ${targetPath} exists. Delete or use another name.`))
}

if (packageManager === 'npm') {
  await initNodeNpm(CURR_DIR, targetPath)
} else if (packageManager === 'yarn') {
  await initNodeYarn(CURR_DIR, targetPath)
}
await addExamplesJson(targetPath, examples)
await addEnvFile(targetPath)
console.log(chalk.green('Done creating nextjs project structure.'))

// add packages selected by the user
addPackages(packageManager, packages, targetPath)
  .then(async () => {
    // add run scripts to package.json
    await addRunScripts(targetPath, packages, packageManager)
    // update next config
    await updateNextConfig(targetPath, packages)

    // add additional files and examples selected by the user
    examples.map(async element => {
      addExample(targetPath, element)
    })

    // additional file changes for prisma
    if (packages.includes('prisma')) {
      await updateEnvPrisma(targetPath)
    }

    // additional file changes for nextAuth
    if (packages.includes('nextAuth')) {
      await updateEnvNextAuth(targetPath)
    }

    if (examples.includes('cypress')) {
      addEmptyCypressDirectories(targetPath)
    }
  })
  .then(async () => {
    // post process _app.tsx, only pass the relevant packages for the file
    await postProcessFile(path.join(path.join(path.join(targetPath, 'src'), 'pages'), '_app.tsx'), packages)
    await postProcessFile(path.join(path.join(path.join(targetPath, 'src'), 'components'), 'NavBar.tsx'), packages)
  })

if(examples.includes('linting')) {
  setTimeout(async () =>  {
    await runFinalInstall(packageManager, targetPath)
    const runP = await getRunPrettier()
    if (runP) {
      runPrettier(targetPath, packageManager)
    }
  }, 3000)
}