<?php
    include_once 'connect.php';
    include_once 'header.php';

    session_unset();
    session_destroy();

    echo '<h3>signed out successfully</h3>';
    echo 'Return to <a href="index.php"> Homepage</a>';
    include_once 'footer.php';
?>
