<?php
session_start();
?>

<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta charset="UTF-8">
      <title>Hurst Chat</title>
      <link rel="icon" href="/assets/logo.png" type="image/x-icon">
      <link href="/css/main.css" rel="stylesheet" type="text/css">
    </head>

    <body>
      <img src="/assets/logo.png" alt="Main Logo">
      <div id="wrapper">
        <div id="menu">
          <a class="item" href="index.php">Home</a>
          <a class="item" href="create_topic.php">Create topic</a>
          <a class="item" href="create_cat.php">Create a category</a>

          <div id="userbar">
            <?php
              if($_SESSION['signed_in']) {
                echo 'Hello ' . $_SESSION['user_name'] . '. Not you? <a href="signout.php">Sign out</a>';
              }
              else {
                echo '<a href="signin.php">Sign in</a> or <a href="signup.php">create an account</a>.';
              }
            ?>
          </div>
        </div>

        <div id="content">
