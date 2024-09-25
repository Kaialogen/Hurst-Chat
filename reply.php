<?php
include_once 'connect.php';
include_once 'header.php';

	if($_SERVER['REQUEST_METHOD'] != 'POST') {
		echo 'This file cannot be called directly.';
	}
	else {
		if($_SESSION['signed_in']) {
			echo 'You must be signed in to post a reply.';
		}
		else {
			$text = str_replace("<","",$_POST['reply-content']);
                
            $sql = "INSERT INTO posts(post_content, post_date, post_topic, post_by) VALUES ('" . $text . "', NOW()," . $_GET['id'] . "," . $_SESSION['user_id'] . ")";
			$result = mysqli_query($conn, $sql);
						
			if(!$result) {
				echo 'Your reply has not been saved, please try again later.';
			}
			else {
				echo 'Your reply has been saved, check out <a href="topic.php?id=' . htmlentities($_GET['id']) . '">the topic</a>.';
			}
		}
	}
	include_once 'footer.php';
?>
