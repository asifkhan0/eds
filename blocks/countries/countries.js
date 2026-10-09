
export default async function decorate(block) {
  const countries = block.querySelector('a[href$=".json"]');
  console.log("Countries block found:", countries);

  if (!link) {
    block.textContent = "Country API URL not found.";
    return;
  }

  const apiUrl = new URL(link.getAttribute("href"), window.location.href).href;

  block.textContent = "Loading countries...";

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const result = await response.json();

    // Support either an array or an object containing data
    const countries = Array.isArray(result) ? result : result.data;

    if (!Array.isArray(countries)) {
      throw new Error("Invalid API response format.");
    }

    const columns = [
      { key: "Country", label: "Country" },
      { key: "Capital", label: "Capital" },
      { key: "Continent", label: "Continent" },
      { key: "Abbreviation", label: "Abbreviation" },
    ];

    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
    const headerRow = document.createElement("tr");

    columns.forEach(({ label }) => {
      const th = document.createElement("th");
      th.textContent = label;
      th.scope = "col";
      headerRow.append(th);
    });

    thead.append(headerRow);

    countries.forEach((country) => {
      const row = document.createElement("tr");

      columns.forEach(({ key }) => {
        const td = document.createElement("td");
        td.textContent = country[key] ?? "";
        row.append(td);
      });

      tbody.append(row);
    });

    table.append(thead, tbody);
    block.replaceChildren(table);
  } catch (error) {
    console.error("Error loading countries:", error);
    block.textContent = "Unable to load countries.";
  }
}
