<?php
// Database connection parameters
$host = 'db';            // MySQL container service name (from docker-compose.yml)
$user = 'user';          // MySQL user (set in MYSQL_USER)
$password = 'userpassword';  // MySQL password (set in MYSQL_PASSWORD)
$database = 'mydatabase';    // Database name (set in MYSQL_DATABASE)
$port = 3306;            // MySQL default port

// Create the connection
$conn = mysqli_connect($host, $user, $password, $database, $port);

// Check the connection
if (!$conn) {
    // Display a generic error message (don't expose details in production)
    die('Connection failed: ' . mysqli_connect_error());
}

// Selecting the database (this step is redundant, mysqli_connect already selects the database)
if (!mysqli_select_db($conn, $database)) {
    // Error handling if the database cannot be selected
    exit('Error: Could not select the database');
}
?>
