<?php
session_start();

 ?>

<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hurst Chat</title>
    <link rel="shortcut icon" href="logo.png" type="image/x-icon">
    <link href="style1.css" rel="stylesheet" type="text/css">


  </head>

<body>
      <img src="logo.png">
      <div id="wrapper">
      <div id="menu">
        <a class="item" href="index.php">Home</a>
        <a class="item" href="create_topic.php">Create topic</a>
        <a class="item" href="create_cat.php">Create a category</a>

        <div id="userbar">
          <?php
            if($_SESSION['signed_in'] == true)
            {
                echo 'Hello ' . $_SESSION['user_name'] . '. Not you? <a href="signout.php">Sign out</a>';
           }
           else
            {
                echo '<a href="signin.php">Sign in</a> or <a href="signup.php">create an account</a>.';
            }
            ?>
        </div>

      </div>

        <div id="content">
