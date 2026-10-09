
export default async function decorate(block) {
  const countries = block.querySelector('a[href$=".json"]');
  console.log("Countries block found:", countries);

  if (!countries) return;

  const parentDiv = countries.closest("div");
  parentDiv.classList.add("countries-block");

  try {
    const table = await createTable(countries.href, null);

    parentDiv.append(table);
    countries.replaceWith(parentDiv);
  } catch (error) {
    console.error("Error creating countries table:", error);
    parentDiv.textContent = "Unable to load countries.";
  }
}

async function createTable(url, columns = null) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const result = await response.json();
  const data = Array.isArray(result) ? result : result.data;

  if (!Array.isArray(data) || data.length === 0) {
    throw new Error("No country data found.");
  }

  // Use provided columns or derive them from the first object
  const headers = columns ?? Object.keys(data[0]);

  const table = document.createElement("table");
  table.classList.add("countries-table");

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  headers.forEach((column) => {
    const th = document.createElement("th");
    th.textContent =
      typeof column === "string" ? column : column.label;
    headerRow.append(th);
  });

  thead.append(headerRow);

  const tbody = document.createElement("tbody");

  data.forEach((item) => {
    const row = document.createElement("tr");

    headers.forEach((column) => {
      const key = typeof column === "string" ? column : column.key;
      const td = document.createElement("td");

      td.textContent = item[key] ?? "";
      row.append(td);
    });

    tbody.append(row);
  });

  table.append(thead, tbody);

  return table;
}
