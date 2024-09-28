<?php
    include_once 'connect.php';
    include_once 'header.php';

    // SQL query to fetch categories
    $sql = "SELECT cat_id, cat_name, cat_description FROM categories";
    $result = mysqli_query($conn, $sql);

    // Check if the query was successful
    if(!$result) {
        echo '<p>The categories could not be displayed, please try again later</p>';
    }
    else {
        // Check if there are any categories
        if(mysqli_num_rows($result) == 0) {
            echo '<p>No categories defined yet</p>';
        }
        else {
            // Display categories in a table format
            echo '
                <table>
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Recent topic</th>
                        </tr>
                    </thead>
                    <tbody>';

            // Loop through each category and display it
            while($row = mysqli_fetch_assoc($result)) {
                echo '<tr>';
                    echo '<td class="leftpart">';
                        echo '<h3><a href="category.php?id=' . htmlspecialchars($row['cat_id']) . '">' . htmlspecialchars($row['cat_name']) . '</a></h3>';
                        echo '<p>' . htmlspecialchars($row['cat_description']) . '</p>';
                    echo '</td>';
                    echo '<td class="rightpart">';
                        // Placeholder for the latest topic link
                        echo '<a class="table_topic" href="topic.php">Topic subject</a>';
                    echo '</td>';
                echo '</tr>';
            }
        echo '</tbody></table>';
        }
    }

    include_once 'footer.php';
?>
