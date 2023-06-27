if(typeof self !== 'undefined') {
  addEventListener('message', async (event: MessageEvent<File>) => {

      const data = await event.data.text()

      // received file, starting processing
      postMessage('start')

      const allLines = data.split(/\r\n|\n/)
      const tmpArray: string[] = []
      // Reading line by line
      allLines.forEach((line) => {
          // computations on the different elements
          tmpArray.push(line.slice(0, 10))
          // every 10 results, current buffer is returned to main thread
          if (tmpArray.length === 200) {
              postMessage(tmpArray)
              tmpArray.splice(0, tmpArray.length)
          }
      })
      if(tmpArray.length > 0) {
          postMessage(tmpArray)
      }

      // final message, all processing is done
      postMessage('finished')
  })
}
