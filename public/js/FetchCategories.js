document.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch("/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `{ categories {id name description topics { topic_id topic_subject}}}`,
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

      let topicContent = "No topics yet";
      if (category.topics && category.topics.length > 0) {
        topicContent = category.topics.map(topic => topic.topic_subject).join(", ");
      }

      row.innerHTML = `
        <td>${category.name}</td>
        <td>${topicContent}</td>
        `;
      tbody.appendChild(row);
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
});