// const { require } = require("yargs");
const yargs = require("yargs");
const pkg = require("./package.json");
const { addNotes, printNotes, removeNote } = require("./note.conrollers");

yargs.version(pkg.version);

yargs.command({
  command: "add",
  describe: "Добавить новую заметку",
  builder: {
    title: {
      type: "string",
      describe: "Название заметки",
      demandOption: true,
    },
  },
  handler({ title }) {
    addNotes(title);
  },
});

yargs.command({
  command: "list",
  describe: "Показать все заметки",
  async handler() {
    printNotes();
  },
});

yargs.command({
  command: "remove",
  describe: "Удалить заметку по id",
  builder: {
    id: {
      type: "string",
      describe: "ID заметки",
      demandOption: true,
    },
  },
  async handler({ id }) {
    removeNote(id);
  },
});

yargs.parse();

// require("./module");
// const pesrson = {
//   name: "Imp",
//   age: "36",
// };
// function getName(p) {
//   return p.name;
// }
// console.log(getName(pesrson));
// console.log(__filename);
// console.log(__dirname);
// console.log(process.argv);
