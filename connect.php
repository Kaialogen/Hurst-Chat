<?php

$user = '3578976_forum';
$password = 'Dovahkiin1';
$database = '3578976_forum';
$host = 'fdb27.runhosting.com';
$port = 3306;

$conn = mysqli_connect($host, $user, $password) or die("cannot connect");

if(!mysqli_select_db($conn, $database))
{
  exit('Error: could not select the database');
}
?>
