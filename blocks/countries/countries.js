
export default function decorate(block) {
  const rows = [...block.children];

  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

  rows.forEach((row, index) => {
    const tr = document.createElement("tr");
    const cells = [...row.children];

    cells.forEach((cell) => {
      const element = document.createElement(
        index === 0 ? "th" : "td"
      );

      element.innerHTML = cell.innerHTML;

      if (index === 0) {
        element.scope = "col";
      }

      tr.append(element);
    });

    if (index === 0) {
      thead.append(tr);
    } else {
      tbody.append(tr);
    }
  });

  table.append(thead, tbody);
  block.replaceChildren(table);
}
