import { spawn } from 'child_process'
import { resolve, dirname } from 'path'

const sh = (command, cb, pipeOutputToResult = false) => {
  const binPath = resolve(process.cwd(), 'node_modules/.bin')
  const nodePath = dirname(process.execPath) // gets the dir of the current node binary

  const options = {
    cwd: process.cwd(),
    env: {
      ...process.env,
      PATH: `${binPath};${nodePath};${process.env.PATH}`,
    },
    stdio: pipeOutputToResult ? 'pipe' : [0, 1, 2],
    shell: true,
  }

  const child = spawn(command, [], options)

  let stdoutData = ''

  if (child.stdout) {
    child.stdout.on('data', (data) => {
      stdoutData += data
    })
  }

  child.on('close', (code) => {
    if (code === 0) {
      cb(null, stdoutData)
      return
    }

    cb(new Error(`child process exited with code ${code}`))
  })
}

export default sh