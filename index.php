<?php
    include_once 'connect.php';
    include_once 'header.php';

    $sql = ("SELECT cat_id, cat_name, cat_description FROM categories");
    $result = mysqli_query($conn, $sql);

    if(!$result) {
        echo 'The categories could not be displayed, please try again later.';
    }
    else {
        if(mysqli_num_rows($result) == 0) {
            echo 'No categories defined yet.';
        }
        else {
            echo '<table border="1">
                <tr>
                    <th style="background-color: #000;">Category</th>
                    <th style="background-color: #000;">Last topic</th>
                </tr>';

            while($row = mysqli_fetch_assoc($result)) {
                echo '<tr style="background-color: white;">';
                    echo '<td class="leftpart">';
                        echo '<h3><a href="category.php?id=' . $row['cat_id'] . '">' . $row['cat_name'] . '</a></h3>' . $row['cat_description'];
                    echo '</td>';
                    echo '<td class="rightpart">';
                        echo '<a href="topic.php">Topic subject</a>';
                    echo '</td>';
                echo '</tr>';
            }
        }
    }

    include_once 'footer.php';
?>
