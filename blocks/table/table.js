
export default async function decorate(block) {
  const countries = block.querySelector('a[href$=".json"]');

  if (!countries) {
    console.error("Countries JSON link not found");
    return;
  }

  const url = countries.href;
  console.log("API URL:", url);

  const parentDiv = countries.closest("div");

  try {
    const table = await createTable(url);
    parentDiv.classList.add("countries-block");
    parentDiv.replaceChildren(table);
  } catch (error) {
    console.error("Countries API error:", error);
    parentDiv.textContent = `Unable to load countries: ${error.message}`;
  }
}

async function createTable(url) {
  const response = await fetch(url);

  console.log("Response status:", response.status);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const result = await response.json();

  console.log("API response:", result);

  // Handle common JSON response structures
  const data = Array.isArray(result)
    ? result
    : Array.isArray(result.data)
      ? result.data
      : Array.isArray(result.results)
        ? result.results
        : null;

  if (!data || data.length === 0) {
    throw new Error("Could not find an array of country records");
  }

  console.log("Country records:", data.length);
  console.log("First country:", data[0]);

  const headers = Object.keys(data[0]);

  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

  const headerRow = document.createElement("tr");

  headers.forEach((key) => {
    const th = document.createElement("th");
    th.textContent = key;
    headerRow.append(th);
  });

  thead.append(headerRow);

  data.forEach((item) => {
    const row = document.createElement("tr");

    headers.forEach((key) => {
      const td = document.createElement("td");
      td.textContent = item[key] ?? "";
      row.append(td);
    });

    tbody.append(row);
  });

  table.append(thead, tbody);

  return table;
}
