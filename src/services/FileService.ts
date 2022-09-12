export default class FileService {
  writeFile(file: string, data: string, options: any): Promise<void> {
    if (typeof HOLOCMS === 'undefined') {
      return Promise.resolve();
    } else {
      const fs = HOLOCMS?.require?.('fs/promises');
      return fs.writeFile(file, data, options);
    }
  }
  readFile = (fileName: string): Promise<string> => {
    if (typeof HOLOCMS === 'undefined') {
      return Promise.resolve('{}');
    } else {
      const fs = HOLOCMS.require('fs/promises');
      return fs.readFile(fileName, 'utf-8');
    }
  }
}