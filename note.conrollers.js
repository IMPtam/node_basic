const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNotes(title) {
  // const notes = require("./db.json");
  const notes = await getNotes();
  // const notes = Buffer.from(buffer).toString("utf-8");

  const note = {
    title,
    id: Date.now().toString(),
  };
  notes.push(note);

  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.bgYellow("Note was added"));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNotes();

  console.log(chalk.bgGreenBright("Список занесенных заметок:"));
  notes.forEach((note) => {
    console.log(chalk.blue(note.id, note.title));
  });
}

async function removeNote(id) {
  const notes = await getNotes();

  const filterNote = notes.filter((note) => note.id !== id);

  await fs.writeFile(notesPath, JSON.stringify(filterNote));
  console.log(chalk.red(`ID"${id}" удален.`));
}

module.exports = { addNotes, printNotes, removeNote };
