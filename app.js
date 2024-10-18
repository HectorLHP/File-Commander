const fs = require('fs/promises');

// open (32) file descriptor (remember to close it after)
// read or write

(async () => {
  const commandFileHandler = await fs.open('./command.txt', 'r');

  commandFileHandler.on('change', async () => {
    // get the size of our file
    const size = (await commandFileHandler.stat()).size;
    // allocate our buffer with the sixe of the file
    const buff = Buffer.alloc(size);
    // the location at which we want to start filling our buffer
    const offset = 0;
    // how many bytes we want to read
    const length = size;
    // the posotion that we want to start reading the file from
    const position = 0;

    // we always want to read the whole content (from beginning all the way to the end)
    await commandFileHandler.read(buff, offset, length, position);

    // decoder 0101011 => meaningful
    // encoder meaningful => 0101010

    console.log(buff.toString('utf-8'));
  });

  // watcher...

  const watcher = fs.watch('./command.txt');

  for await (const event of watcher) {
    if (event.eventType === 'change') {
      commandFileHandler.emit('change');
    }
  }
})();
