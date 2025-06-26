document.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch("/api/categories");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    } else {
      const categoriesData = await response.json();

      const tbody = document.querySelector("tbody");
      tbody.innerHTML = "";

      categoriesData.forEach((category) => {
        const row = document.createElement("tr");

        let topicContent = "No topics yet";
        if (category.topics && category.topics.length > 0) {
          topicContent = category.topics
            .map((topic) => topic.topic_subject)
            .join(", ");
        }

        row.innerHTML = `
        <td class="leftpart">
          <h3>${category.name}</h3>
          <p>${category.description}</p>
        </td>
        <td class="rightpart">${topicContent}</td>
        `;
        tbody.appendChild(row);
      });
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
});
