<?php
include 'connect.php';
include 'header.php';

echo '<h2>Create a topic</h2>';
if($_SESSION['signed_in'] == false)
{

    echo 'You have to be <a href="signin.php">signed in</a> to create a topic.';
}
else
{
    if($_SERVER['REQUEST_METHOD'] != 'POST')
    {
        $sql = "SELECT
                    cat_id,
                    cat_name,
                    cat_description
                FROM
                    categories";

        $result = mysqli_query($conn, $sql);

        if(!$result)
        {
            echo 'Error while selecting from database. Please try again later.';
        }
        else
        {
            if(mysqli_num_rows($result) == 0)
            {
                if($_SESSION['user_level'] == 1)
                {
                    echo 'You have not created categories yet.';
                }
                else
                {
                    echo 'Before you can post a topic, you must wait for an admin to create some categories.';
                }
            }
            else
            {

                echo '<form method="post" action="">
                    Subject: <input type="text" name="topic_subject" />
                    Category:';

                echo '<select name="topic_cat">';
                    while($row = mysqli_fetch_assoc($result))
                    {
                        echo '<option value="' . $row['cat_id'] . '">' . $row['cat_name'] . '</option>';
                    }
                echo '</select>';

                echo 'Message: <textarea name="post_content" /></textarea>
                    <input type="submit" value="Create topic" />
                 </form>';
            }
        }
    }
    else
    {
        $query  = "BEGIN WORK;";
        $result = mysqli_query($conn, $query);

        if(!$result)
        {
            echo 'An error occured while creating your topic. Please try again later.';
        }
        else
        {
            $sql = "INSERT INTO
                        topics(topic_subject,
                               topic_date,
                               topic_cat,
                               topic_by)
                   VALUES('" . $_POST['topic_subject'] . "',
                               NOW(),
                               '" . $_POST['topic_cat'] . "',
                               '" . $_SESSION['user_id'] . "'
                               )";

            $result = mysqli_query($conn, $sql);
            if(!$result)
            {
                echo 'An error occured while inserting your data. Please try again later.';
                $sql = "ROLLBACK;";
                $result = mysqli_query($conn, $sql);
            }
            else
            {
                $topicid = mysqli_insert_id();

                $sql = "INSERT INTO
                            posts(post_content,
                                  post_date,
                                  post_topic,
                                  post_by)
                        VALUES
                            ('" . $_POST['post_content'] . "',
                                  NOW(),
                                  '" . $topicid . "',
                                  '" . $_SESSION['user_id'] . "'
                            )";
                $result = mysqli_query($conn, $sql);

                if(!$result)
                {
                    echo 'An error occured while inserting your post. Please try again later.';
                    $sql = "ROLLBACK;";
                    $result = mysqli_query($conn, $sql);
                }
                else
                {
                    $sql = "COMMIT;";
                    $result = mysqli_query($conn, $sql);
                    echo 'You have successfully created <a href="topic.php'. $topicid . '">your new topic</a>.';
                }
            }
        }
    }
}

include 'footer.php';
?>
