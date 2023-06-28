#!/usr/bin/env node

import { getProjectName, getPackageManager, getPackages, getExamples } from './questions.js';
import { initNodeNpm, initNodeYarn, addEnvFile } from './projectCreationUtils.js';
import { addPackages, addRunScripts, updateEnvPrisma } from './packageInstallationUtils.js';
import { addExample, updateNextConfigI18n, updateEnvNextAuth, addNextAuthNavBar } from './exampleCreationUtils.js';
import * as path from 'path';
import chalk from 'chalk';


// Query setup data from user
const projectName = await getProjectName()
const packageManager = await getPackageManager()
const packages = await getPackages()
// per default add mui and i18n
packages.push('mui')
packages.push('i18n')
const examples = ['general', 'index', ...await getExamples(packages)]

// setup nextjs project using selected package manager in the appropriate subfolder of the current directory
const CURR_DIR = process.cwd()
const targetPath = path.join(CURR_DIR, projectName)
if (packageManager === 'npm') {
  await initNodeNpm(CURR_DIR, targetPath)
} else if (packageManager === 'yarn') {
  await initNodeYarn(CURR_DIR, targetPath)
}
await addEnvFile(targetPath)
console.log(chalk.green('Done creating nextjs project structure.'))

// add packages selected by the user
addPackages(packageManager, packages, targetPath)
  .then(async () => {
    // add run scripts to package.json
    await addRunScripts(targetPath, packages)
    
    // add additional files and examples selected by the user
    examples.map(async element => {
      addExample(targetPath, element)
    })

    // make sure this happens after copying the general version of the NavBar
    // this version of the NavBar includes the User management
    if (examples.includes('nextAuth')) {
      addNextAuthNavBar(targetPath)
    }

    // additional config changes for i18n
    if (examples.includes('i18n')) {
      await updateNextConfigI18n(targetPath)
    }

    // additional file changes for prisma
    if (packages.includes('prisma')) {
      await updateEnvPrisma(targetPath)
    }

    // additional file changes for nextAuth
    if (packages.includes('nextAuth')) {
      await updateEnvNextAuth(targetPath)
    }
  })