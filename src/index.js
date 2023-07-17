#!/usr/bin/env node

import { getProjectName, getPackageManager, getPackages, getExamples, getRunPrettier, getKeepGit } from './questions.js';
import { initNodeNpm, initNodeYarn, addEnvFile, checkProjectFolder, removeGit } from './projectCreationUtils.js';
import { addPackages, addRunScripts, updateEnvPrisma, runFinalInstall } from './packageInstallationUtils.js';
import { addExamplesJson, addExample, updateNextConfig, updateEnvNextAuth, addEmptyCypressDirectories } from './exampleCreationUtils.js';
import { postProcessFile, runPrettier } from './filePostProcessor.js';
import * as path from 'path';
import chalk from 'chalk';
import gradient from 'gradient-string';

const TITLE_TEXT = `
 _   _  __   __  _______    _____   _______              _____    _______ 
| \\ | | \\ \\ / / |__   __|  / ____| |__   __|     /\\     |  __ \\  |__   __|
|  \\| |  \\ V /     | |    | (___      | |       /  \\    | |__) |    | |   
| . \` |   > <      | |     \\___ \\     | |      / /\\ \\   |  _  /     | |   
| |\\  |  / . \\     | |     ____) |    | |     / ____ \\  | | \\ \\     | |   
|_| \\_| /_/ \\_\\    |_|    |_____/     |_|    /_/    \\_\\ |_|  \\_\\    |_|   
`;

console.log(gradient(['#009374', '#66BFAC', '#79B4D9', '#1F82C0']).multiline(TITLE_TEXT))
// Query setup data from user
const projectName = await getProjectName()
const keepGit = await getKeepGit()
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
if(!keepGit) {
  await removeGit(targetPath)
}
console.log(chalk.green('Done creating nextjs project structure. Proceeding to install additional packages...'))

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
    // post process files
    await postProcessFile(path.join(path.join(path.join(targetPath, 'src'), 'pages'), '_app.tsx'), examples)
    await postProcessFile(path.join(path.join(path.join(targetPath, 'src'), 'components'), 'NavBar.tsx'), examples)
    await postProcessFile(path.join(path.join(path.join(targetPath, 'src'), 'components'), 'Layout.tsx'), examples)
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