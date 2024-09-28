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
      <link href="/css/navbar.css" rel="stylesheet" type="text/css">
      <link href="/css/tables.css" rel="stylesheet" type="text/css">
    </head>

    <body>
      <div class="navbar">
        <a id="navbar_home" href="index.php">Hurst Chat</a>
        <a href="create_topic.php">Create topic</a>
        <a href="create_cat.php">Create category</a>

        <div id="userbar">
          <?php if (isset($_SESSION['signed_in'])): ?>
            <a href="#"><?= htmlspecialchars($_SESSION['user_name']); ?></a> 
            <a href="signout.php">Sign out</a>
            <?php else: ?>
              <a href="signin.php">Login</a>
              <a href="signup.php">Register</a>
          <?php endif; ?>
        </div>
      </div>

      <img src="/assets/logo.png" alt="Main Logo">
      <div id="wrapper">
        <div id="content">
