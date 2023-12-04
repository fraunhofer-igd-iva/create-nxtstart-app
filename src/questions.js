import { input, select, checkbox, Separator, confirm } from '@inquirer/prompts'

export const getProjectName = async () =>
  (await input({ message: 'Enter the project name, only lowercase!' })).toLowerCase()

export const getKeepGit = async () => await confirm({ message: 'Initialize a git repository?', default: true })

export const getDoInitialCommit = async () => await confirm({ message: 'perform initial commit?', default: true })

export const getPackageManager = async () =>
  await select({
    message: 'Select a package manager',
    choices: [
      {
        name: 'yarn',
        value: 'yarn',
      },
      {
        name: 'npm',
        value: 'npm',
      },
    ],
  })

export const getPackages = async () =>
  await checkbox({
    message: 'Select your packages',
    choices: [
      // mui added by default
      //{ name: 'Material UI', value: 'mui', disabled: true },
      new Separator('Material UI'),
      { name: 'Page Transitions, Animations', value: 'animations' },
      //{ name: 'Tailwind CSS', value: 'tailwind' },
      new Separator(),
      { name: 'React Redux + Toolkit', value: 'redux' },
      { name: 'SWR Data Fetching', value: 'swr' },
      { name: 'D3 JS', value: 'd3' },
      { name: 'Next Auth', value: 'nextAuth' },
      { name: 'Prisma DB', value: 'prisma' },
      // i18n added by default
      //{ name: 'Internationalization', value: 'i18n', disabled: true },
      new Separator('Internationalization'),
      { name: 'Progressive Web App', value: 'pwa' },
      { name: 'Cypress Testing', value: 'cypress' },
      { name: 'Prettier Code Formatting', value: 'linting' },
      { name: 'Husky Git Hooks (requires Prettier!)', value: 'husky'},
      new Separator(),
      { name: 'Server-Sent-Events', value: 'sse' },
      { name: 'Web Worker', value: 'webWorker' },
      new Separator('=============================='),
    ],
  })

export const getExamples = async (packages) =>
  await checkbox({
    message: 'Select provided example code and configurations',
    choices: [
      { name: 'Material UI', value: 'mui', disabled: !packages.includes('mui') },
      { name: 'Page Transitions, Animations', value: 'animations', disabled: !packages.includes('animations') },
      //{ name: 'Tailwind CSS', value: 'tailwind', disabled: !packages.includes('tailwind') },
      new Separator(),
      { name: 'React Redux + Toolkit', value: 'redux', disabled: !packages.includes('redux') },
      { name: 'SWR Data Fetching', value: 'swr', disabled: !packages.includes('swr') },
      { name: 'D3 JS', value: 'd3', disabled: !packages.includes('d3') },
      { name: 'Next Auth', value: 'nextAuth', disabled: !packages.includes('nextAuth') },
      { name: 'Prisma DB', value: 'prisma', disabled: !packages.includes('prisma') },
      // files for i18n also added by default
      //{ name: 'Internationalization', value: 'i18n', disabled: true },
      new Separator('Internationalization'),
      { name: 'Progressive Web App', value: 'pwa', disabled: !packages.includes('pwa') },
      { name: 'Cypress Testing', value: 'cypress', disabled: !packages.includes('cypress') },
      { name: 'Prettier Code Formatting', value: 'linting', disabled: !packages.includes('linting') },
      { name: 'Husky Git Hooks (requires Prettier!)', value: 'husky'},
      new Separator(),
      { name: 'Server-Sent-Events', value: 'sse', disabled: !packages.includes('sse') },
      { name: 'Web Worker', value: 'webWorker', disabled: !packages.includes('webWorker') },
      new Separator('=============================='),
    ],
  })

export const getRunPrettier = async () => await confirm({ message: 'Run prettier once? (recommended)', default: true })
