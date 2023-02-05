const fs = require("fs/promises");
const path = require("path");
const fsSync = require("fs");

const base = path.join(__dirname, "temp");

const getContent = () => `\n\r${process.argv[2]}`;

async function start() {
  try {
    if (fsSync.existsSync(base)) {
      await fs.appendFile(path.join(base, "logs.txt"), getContent());
      const data = await fs.readFile(path.join(base, "logs.txt"), {
        encoding: "utf-8",
      });
      console.log(data);
    } else {
      await fs.mkdir(base);
      await fs.writeFile(path.join(base, "logs.txt"), process.argv[2] ?? "");
    }
  } catch (error) {
    console.log("Ошибка:", error);
  }
}

start();
// fs.mkdir(base)
//   .then(() => {
//     console.log("Папка создана");
//   })
//   .catch((error) => {
//     console.log("Ошибка:", error);
//   });
