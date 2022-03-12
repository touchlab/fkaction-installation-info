import * as core from '@actions/core'
import fetch from 'node-fetch'

async function run(): Promise<void> {
  try {
    await mergeBranch()
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

async function mergeBranch() {
  const faktorySecretKey: string = core.getInput('FAKTORY_SECRET_KEY')

  await fetch(
    `https://api.touchlab.dev/gh/installationInfo?faktorySecretKey=${faktorySecretKey}`
  )
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => {
          throw new Error(text)
        })
      } else {
        return response
      }
    })
    .then(response => response.json())
    .then((data: any) => core.setOutput('buildBranch', data.buildBranch))
    .catch(error => {
      if (error instanceof Error) {
        core.setFailed(error.message)
      } else {
        core.setFailed(error)
      }
    })
}

run()
