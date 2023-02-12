document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;

    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }
  if (event.target.dataset.type === "edit") {
    const tit = window.prompt(
      "Измените название заметки?",
      `${event.target.dataset.title}`
    );
    console.log("app_tit", tit);
    const id = event.target.dataset.id;
    // const ob = { id, tit };
    change(id, tit).then(() => {
      document.getElementById(`${id}`).innerHTML = `${tit}`;
    });
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}

async function change(id, tit) {
  await fetch(`/${id}/${tit}`, { method: "PUT" });
}
