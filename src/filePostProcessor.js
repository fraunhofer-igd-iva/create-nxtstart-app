import chalk from 'chalk';
import * as fs from 'fs';
import shell from 'shelljs';

export async function postProcessFile(filePath, chosenPackages, relevantPackagesList) {
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log(err)
    }
    let result = data
    
    for(let i = 0; i < relevantPackagesList.length; i++) {
      const curPackage = relevantPackagesList[i]
      result = result.replace(new RegExp(`<%${curPackage}%>([^%]+)</%${curPackage}%>`, 'gm'), (match, $1) => {
        // only remove the tags, keep enclosed code in capture group one if the current package is chosen by user
        if(chosenPackages.includes(curPackage)) {
          return $1
        } else {
          return ''
        }
      })
    }

    fs.writeFile(filePath, result, 'utf8', function (err) {
      if (err) return console.log(err)
      console.log(chalk.green('Post processed _app.tsx!'))
    })
  })
}

export function runPrettier(projectPath, packageManager) {
  shell.cd(projectPath)
  if (packageManager === 'yarn') {
    shell.exec('yarn prettier . --write')
  } else if (packageManager === 'npm') {
    shell.exec('npx prettier . --write')
  }
  console.log(chalk.green(`Ran prettier successfully!`))
}