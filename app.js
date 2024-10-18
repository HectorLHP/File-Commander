const fs = require('fs/promises');

// open (32) file descriptor (remember to close it after)
// read or write

(async () => {
  const commandFileHandler = await fs.open('./command.txt', 'r');
  const watcher = fs.watch('./command.txt');

  for await (const event of watcher) {
    if (event.eventType === 'change') {
      // the file was changed
      console.log('The file was changed.');
      // we want to read the content

      // get the size of our file
      const size = (await commandFileHandler.stat()).size;
      const buff = Buffer.alloc(size);
      const offset = 0;
      const length = size;
      const position = 0;

      const content = await commandFileHandler.read(
        buff,
        offset,
        length,
        position
      );
      console.log(content);
    }
  }
})();
