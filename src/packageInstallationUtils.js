import shell from 'shelljs';
import chalk from 'chalk';
import * as fsStandard from 'fs';
import path from 'path';


const packageBundles = {
	general: {
		dep: [
			'@emotion/cache',
			'@emotion/react',
			'@emotion/server',
			'@emotion/styled',
		],
		devDep: [],
	},
	mui: {
		dep: [
			'@fontsource/roboto',
			'@mui/icons-material',
			'@mui/material',
		],
		devDep: [],
	},
	tailwind: {
		dep: [
			'tailwindcss',
			'postcss',
		],
		devDep: [],
	},
	redux: {
		dep: [
			'@reduxjs/toolkit',
			'react-redux',
		],
		devDep: [],
	},
	d3: {
		dep: [
			'd3',
		],
		devDep: [
			'@types/d3',
		],
	},
	nextAuth: {
		dep: [
			'next-auth',
		],
		devDep: [],
	},
	prisma: {
		dep: [
			'@prisma/client',
			'@yarnpkg/pnpify',
		],
		devDep: [
			'prisma',
		],
	},
	i18n: {
		dep: [
			'i18next',
			'next-i18next',
			'react-i18next',
		],
		devDep: [],
	},
	pwa: {
		dep: [
			'next-pwa',
		],
		devDep: [],
	},
	cypress: {
		dep: [],
		devDep: [
			'cypress',
		],
	},
	sse: {
		dep: [
			'uuid',
		],
		devDep: [
			'@types/uuid',
		],
	},
	sseProxy: {
		dep: [
			'eventsource',
			'uuid',
		],
		devDep: [
			'@types/eventsource',
			'@types/uuid',
		],
	},
	webWorker: {
		dep: [],
		devDep: [],
	},
	fileUpload: {
		dep: [
			'formidable',
			'uuid',
		],
		devDep: [
			'@types/formidable',
			'@types/uuid',
		],
	},
}

export async function addPackages(packageManager, packageNamesUser, path) {
	shell.cd(path)

	// add general packages
	const packageNames = ['general', ...packageNamesUser]

	let result = 0
	let cmdDep = packageManager === 'yarn' ? 'yarn add' : 'npm install';
	let cmdDevDep = packageManager === 'yarn' ? 'yarn add' : 'npm install';

	for (let i = 0; i < packageNames.length; i++) {
		const packageName = packageNames[i]
		packageBundles[packageName].dep.forEach(name => {
			cmdDep += ` ${name}`
		})
		packageBundles[packageName].devDep.forEach(name => {
			cmdDevDep += ` ${name}`
		})
	}

	if (cmdDep) {
		result = shell.exec(cmdDep)
	}

	if (cmdDevDep) {
		cmdDevDep += ` ${packageManager === 'yarn' ? '--dev' : '--save-dev'}`
		result = shell.exec(cmdDevDep)
	}
	console.log(chalk.green(`Installed using "${cmdDep}"`))
	console.log(chalk.green(`Installed using "${cmdDevDep}"`))

	if (result.code !== 0) {
		return false
	}
	return true
}

export async function updateEnvPrisma(projectPath) {
  fsStandard.appendFile(path.join(projectPath, '.env'), 
`
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema
# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings
  
DATABASE_URL="mysql://webstart:webstart@localhost:3306/webstart"

`, function (err) {
    if (err) throw err
		console.log(chalk.green('Added Prisma Env'))
  })
}

export async function addPrismaRunScript(projectPath) {
	fsStandard.readFile(path.join(projectPath, 'package.json'), 'utf8', function (err, data) {
		if (err) {
			return console.log(err)
		}
		const result = data.replace(
			/"lint": "next lint"/g,
			`"lint": "next lint",
	"db:generate": "yarn pnpify prisma generate"`
		).replace(
      /"dependencies": {/g,
      `"dependencies": {
	".prisma": "link:./prisma/.prisma/",`
    )

		fsStandard.writeFile(path.join(projectPath, 'package.json'), result, 'utf8', function (err) {
			if (err) return console.log(err)
			console.log(chalk.green('Added Prisma run script!'))
		})
	})
}