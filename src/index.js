#!/usr/bin/env node

import { getProjectName, getPackageManager, getPackages, getExamples } from './questions.js';
import { initNodeNpm, initNodeYarn } from './projectCreationUtils.js';
import { addPackages } from './packageInstallationUtils.js';
import { addGeneralFiles, addIndexFiles, addExamples, updateNextConfigI18n } from './exampleCreationUtils.js';
import * as path from 'path';
import chalk from 'chalk';


// Query setup data from user
const projectName = await getProjectName()
const packageManager = await getPackageManager()
const packages = await getPackages()
// per default add mui
packages.push('mui')
const examples = await getExamples(packages)

// setup nextjs project using selected package manager in the appropriate subfolder of the current directory
const CURR_DIR = process.cwd()
const targetPath = path.join(CURR_DIR, projectName)
if(packageManager === 'npm') {
  await initNodeNpm(CURR_DIR, targetPath)
} else if(packageManager === 'yarn') {
  await initNodeYarn(CURR_DIR, targetPath)
}
console.log(chalk.green('Done creating nextjs project structure.'))

// add packages selected by the user
await addPackages(packageManager, packages, targetPath)

// add additional files and examples selected by the user
await addGeneralFiles(targetPath)
await addIndexFiles(targetPath)
await addExamples(targetPath, examples)
if(examples.includes('i18n')) {
  await updateNextConfigI18n(targetPath)
}