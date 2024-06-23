import fs from 'fs-extra'
import path from 'path'
import chokidar from 'chokidar'

const { 
  PLUGIN_PHP,
  PLUGIN_PHP_PATH,
  OUTPUT_PATH,
  WATCH_FILE
} = process.env

if (!OUTPUT_PATH) {
  console.error('OUTPUT_PATH environment variable is not defined in .env file')
  process.exit(1)
}

const sanitizePath = (input) => input.replace(/(\r\n|\n|\r)/gm, '').trim()

const copyPhpFiles = async () => {
  try {
    const sourceFile = path.join(PLUGIN_PHP_PATH.trim(), PLUGIN_PHP.trim())
    const destPath = path.join(OUTPUT_PATH.trim(), PLUGIN_PHP.trim())
    
    console.log(`source File: ${sourceFile}`)
    console.log(`destination Path: ${destPath}`)

    const sourceExists = await fs.pathExists(sourceFile)
    if (!sourceExists) {
      console.error(`source file does not exist: ${sourceFile}`)
      return
    }
    
    // copy build files
    await fs.copy(sanitizePath(`${PLUGIN_PHP_PATH}/build`), sanitizePath(`${OUTPUT_PATH}/build`), {
      overwrite: true,
      errorOnExists: false,
      recursive: true
    })
    await fs.copy(sanitizePath(sourceFile), sanitizePath(destPath))
  } catch (err) {
    console.error('error copying files:', err)
  }
}

const watchOutputFiles = () => {
  const watcher = chokidar.watch(sanitizePath(`${PLUGIN_PHP_PATH}/build`), {
    ignored: /^\./, // Ignore dot files and directories
    persistent: true, // Keep the process running
    ignoreInitial: true, // Ignore initial scan (only watch for changes)
    awaitWriteFinish: true // Wait until writes are complete before triggering events
  })

  watcher.on('change', async (path) => {
    console.log(`File ${path} has been changed`)
    await copyPhpFiles(); // Call your copy function
  })

  watcher.on('add', async (path) => {
    console.log(`File ${path} has been added`)
    await copyPhpFiles(); // Call your copy function
  })

  watcher.on('unlink', async (path) => {
    console.log(`File ${path} has been removed`)
    await copyPhpFiles(); // Call your copy function
  })

  watcher.on('error', (error) => {
    console.error(`Watcher error: ${error}`)
  })

  watcher.on('error', (error) => console.error(`watcher error: ${error}`))
}

const main = async() => {
  await copyPhpFiles()
  watchOutputFiles()
}

main()