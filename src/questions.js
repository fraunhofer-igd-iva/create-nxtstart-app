import { input, select, checkbox, Separator } from '@inquirer/prompts';


export const getProjectName = async () => (await input({ message: 'Enter the project name, only lowercase!' })).toLowerCase()

export const getPackageManager = async () => await select({
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
  ]
})

export const getPackages = async () => await checkbox({
  message: 'Select your packages',
  choices: [
    { name: 'Material UI', value: 'mui', checked: true },
    //{ name: 'Tailwind CSS', value: 'tailwind' },
    new Separator(),
    { name: 'React Redux + Toolkit', value: 'redux' },
    { name: 'D3 JS', value: 'd3' },
    { name: 'Next Auth', value: 'nextAuth' },
    { name: 'Prisma DB', value: 'prisma' },
    { name: 'Internationalization', value: 'i18n' },
    { name: 'Progressive Web App', value: 'pwa' },
    { name: 'Cypress Testing', value: 'cypress' },
    new Separator(),
    { name: 'Server-Sent-Events', value: 'sse' },
    { name: 'Server-Sent-Events Proxy', value: 'sseProxy' },
    { name: 'Web Worker', value: 'webWorker' },
    { name: 'File Upload', value: 'fileUpload' },
    new Separator('=============================='),
  ],
})

export const getExamples = async (packages) => await checkbox({
  message: 'Select provided example code',
  choices: [
    { name: 'Material UI', value: 'mui', disabled: !packages.includes('mui') },
    //{ name: 'Tailwind CSS', value: 'tailwind', disabled: !packages.includes('tailwind') },
    new Separator(),
    { name: 'React Redux + Toolkit', value: 'redux', disabled: !packages.includes('redux') },
    { name: 'D3 JS', value: 'd3', disabled: !packages.includes('d3') },
    { name: 'Next Auth', value: 'nextAuth', disabled: !packages.includes('nextAuth') },
    { name: 'Prisma DB', value: 'prisma', disabled: !packages.includes('prisma') },
    { name: 'Internationalization', value: 'i18n', disabled: !packages.includes('i18n') },
    { name: 'Progressive Web App', value: 'pwa', disabled: !packages.includes('pwa') },
    { name: 'Cypress Testing', value: 'cypress', disabled: !packages.includes('cypress') },
    new Separator(),
    { name: 'Server-Sent-Events', value: 'sse', disabled: !packages.includes('sse') },
    { name: 'Server-Sent-Events Proxy', value: 'sseProxy', disabled: !packages.includes('sseProxy') },
    { name: 'Web Worker', value: 'webWorker', disabled: !packages.includes('webWorker') },
    { name: 'File Upload', value: 'fileUpload', disabled: !packages.includes('fileUpload') },
    new Separator('=============================='),
  ],
})