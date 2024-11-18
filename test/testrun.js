import child_process from 'child_process'
import * as path from 'path'
import * as fs from 'fs'
import shell from 'shelljs'

const CURR_DIR = process.cwd()
const targetPath = path.join(CURR_DIR, 'src/index.js')
const projectParentFolder = path.join(CURR_DIR, '/../nxtstart-test')
const projectName = 'nxtstart'
const projectPath = path.join(projectParentFolder, projectName)
const isWindows = process.platform === 'win32'
const packageManager = process.argv[2]

function runNxtstart(scriptPath, callback) {

  // cleanup previous tests
  fs.rmSync(projectParentFolder, { recursive: true, force: true })

  fs.mkdirSync(projectParentFolder,
    (err) => {
        if (err) {
            return console.error(err)
        }
    })

  // keep track of whether callback has been invoked to prevent multiple invocations
  let invoked = false

  const process = child_process.fork(
    scriptPath,
    [
      `--projectName=${projectName}`,
      '--keepGit',
      `--packageManager=${packageManager}`,
      '--useLatestVersions',
      '--allPackages',
      '--allExamples',
      '--runPrettier',
      '--initCommit',
      '--seedDb'
    ],
    {
      cwd: projectParentFolder,
      // timeout after 10 minutes if nxtstart is stuck somewhere
      timeout: 600000
    }
  )

  // listen for errors as they may prevent the exit event from firing
  process.on('error', function (err) {
      if (invoked) return
      invoked = true
      callback(err)
  })

  // execute the callback once the process has finished running
  process.on('exit', function (code) {
      if (invoked) return
      invoked = true
      var err = code === 0 ? null : new Error('exit code ' + code)
      callback(err)
  })
}

function testProject() {
  shell.cd(projectPath)
  shell.exec(`${packageManager} run build`)
  const start = shell.exec(`${packageManager} run start`, { timeout: 5000, killSignal: 'SIGKILL' })
  if (start.code === 1 && start.stderr === '' && start.stdout.includes('Ready in')) return true
  return false
}

runNxtstart(targetPath, function (err) {
  if (err) throw err
  console.log('Finished running create-nxtstart-app')
  const success = testProject()
  if (!success) throw new Error('Error while starting Nxtstart App!')
  else console.log('Passed test using ' + packageManager)
  // make sure test server is completely shutdown, this will kill ALL running node processes
  if (isWindows) {
    shell.exec('taskkill /f /im node.exe')
  } else {
    shell.exec('killall node')
  }
})