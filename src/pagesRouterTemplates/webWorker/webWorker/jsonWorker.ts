function piJson(n: number) {
  let v = 0
  for (let i = 1; i <= n; i += 4) {
    // increment by 4
    v += 1 / i - 1 / (i + 2) // add the value of the series
  }
  return 4 * v // apply the factor at last
}

if (typeof self !== 'undefined') {
  addEventListener('message', async (event: MessageEvent<File>) => {
    const uint8Array = new Uint8Array(await event.data.arrayBuffer())
    // fails with larger files (>500mb)
    const jsonString = Buffer.from(uint8Array).toString('utf8')
    const json = await JSON.parse(jsonString)

    const tmpArray = []
    // received file, starting processing
    postMessage('start')
    for (let i = 0; i < json.length; i++) {
      // computations on the different elements
      tmpArray.push(piJson(1000000))
      // every 10 results, current buffer is returned to main thread
      if (i % 100 === 99 && tmpArray.length > 0) {
        postMessage(tmpArray)
        tmpArray.splice(0, tmpArray.length)
      }
    }
    if (tmpArray.length > 0) {
      postMessage(tmpArray)
    }
    // final message, all processing is done
    postMessage('finished')
  })
}
