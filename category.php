<?php

include_once 'connect.php';
include_once 'header.php';

$sql_categories = "SELECT cat_id, cat_name, cat_description FROM categories WHERE cat_id = " . $_GET['id'];

$result = mysqli_query($conn, $sql_categories);
 
if(!$result)
{
    echo 'The category could not be displayed, please try again later.';
}
else
{
    if(mysqli_num_rows($result) == 0)
    {
        echo 'This category does not exist.';
    }
    else
    {
        
        while($row = mysqli_fetch_assoc($result))
        {
            echo '<h2>Topics in ' . $row['cat_name'] . '</h2>';
        }
     
        $sql_topics = "SELECT topic_id, topic_subject, topic_date, topic_cat FROM topics WHERE topic_cat = " . $_GET['id'];
         
        $result = mysqli_query($conn, $sql_topics);
         
        if(!$result)
        {
            echo 'The topics could not be displayed, please try again later.';
        }
        else
        {
            if(mysqli_num_rows($result) == 0)
            {
                echo 'There are no topics in this category yet.';
            }
            else
            {
                
                echo '<table border="1">
                      <tr>
                        <th style="background-color: #000;">Topic</th>
                        <th style="background-color: #000;">Created at</th>
                      </tr>';
                     
                while($row = mysqli_fetch_assoc($result))
                {
                    echo '<tr>';
                        echo '<td class="leftpart">';
                            echo '<h3><a href="topic.php?id=' . $row['topic_id'] . '">' . $row['topic_subject'] . '</a><h3>';
                        echo '</td>';
                        echo '<td class="rightpart">';
                            echo date('d-m-Y', strtotime($row['topic_date']));
                        echo '</td>';
                    echo '</tr>';
                }
            }
        }
    }
}
 
include_once 'footer.php';
?>
