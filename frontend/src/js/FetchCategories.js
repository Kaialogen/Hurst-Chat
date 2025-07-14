document.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch("http://localhost:3000/api/categories");

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
          // Find the most recent topic by comparing created_at
          const mostRecentTopic = category.topics.reduce((latest, topic) => {
            return new Date(topic.created_at) > new Date(latest.created_at)
              ? topic
              : latest;
          }, category.topics[0]);
          topicContent = mostRecentTopic.topic_content;
        }

        row.innerHTML = `
        <td class="leftpart">
          <h3><a href="/topics.html?id=${category.id}">${category.name}</a></h3>
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
