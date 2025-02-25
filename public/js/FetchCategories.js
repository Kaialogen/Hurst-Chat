document.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch("/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: "{ categories { id name description } }",
      }),
    });

    const { data } = await response.json();
    if (!data || !data.categories.length) {
      return;
    }

    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";

    data.categories.forEach((category) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${category.name}</td>
        <td>No topics yet</td>
      `;
      tbody.appendChild(row);
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
});