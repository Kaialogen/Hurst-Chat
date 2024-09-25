<?php

include 'connect.php';
include 'header.php';




session_unset();
session_destroy();

echo '<h3>signed out successfully</h3>';
echo 'Return to <a href="index.php"> Homepage</a>';
include 'footer.php';

?>
