<?php
include 'connect.php';
include 'header.php';

$conn = mysqli_connect("fdb27.runhosting.com", "3578976_forum", "Dovahkiin1", "3578976_forum");

echo '<h2>Create a category</h2>';

if($_SESSION['signed_in'] == false)
{
        echo 'You have to be <a href="signin.php">signed in</a> to create a category.';
}
else
{
if($_SERVER['REQUEST_METHOD'] != 'POST')
{
    echo '<form method="post" action="">
        Category name: <input type="text" name="cat_name" />
        Category description: <textarea name="cat_description" /></textarea>
        <input type="submit" value="Add category" />
     </form>';
}
else
{
    $text = str_replace("<","",$_POST['cat_description']);
    $sql = "INSERT INTO categories(cat_name, cat_description, cat_id)
       VALUES(
         '" . $_POST['cat_name'] . "',
         '" . $text . "',
          0)";

    
    $result = mysqli_query($conn, $sql);
    if(!$result)
    {
        echo 'Error' . mysqli_error();
    }
    else
    {
        echo 'New category successfully added.';
    }
}
}
?>
