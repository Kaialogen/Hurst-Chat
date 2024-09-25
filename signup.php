<?php

include 'connect.php';
include 'header.php';

echo '<center><h3>Sign up</h3></center>';


if($_SERVER['REQUEST_METHOD'] != 'POST')
{
    echo '<ul id="list"><form method="post" action=""><center>
        <li> Username: <input type="text" name="user_name" /> </li>
        <li> Password: <input type="password" name="user_pass"> </li>
        <li> Password again: <input type="password" name="user_pass_check"> </li>
        <li> E-mail: <input type="email" name="user_email"> </li>
        <li> <input type="submit" value="submit" /> </li>
        </center>
     </form></ul>';
     echo '<center> <a href="terms.php">Terms and Conditions</a> </center>';
}
else
{

    $errors = array();

    if(isset($_POST['user_name']))
    {
        if(!ctype_alnum($_POST['user_name']))
        {
            $errors[] = 'The username can only contain letters and digits.';
        }
        if(strlen($_POST['user_name']) > 30)
        {
            $errors[] = 'The username cannot be longer than 30 characters.';
        }
    }
    else
    {
        $errors[] = 'The username field must not be empty.';
    }


    if(isset($_POST['user_pass']))
    {
        if($_POST['user_pass'] != $_POST['user_pass_check'])
        {
            $errors[] = 'The two passwords did not match.';
        }
    }
    else
    {
        $errors[] = 'The password field cannot be empty.';
    }

    if(!empty($errors))
    {
        echo 'A couple of fields are not filled in correctly.';
        echo '<ul>';
        foreach($errors as $key => $value)
        {
            echo '<li>' . $value . '</li>';
        }
        echo '</ul>';
    }
    else
    {
        $sql = "INSERT INTO
              users (user_name, user_pass, user_email, user_date, user_level)
              VALUES (
                '" . $_POST['user_name'] . "',
                 '" . sha1($_POST['user_pass']) . "',
                 '" . $_POST['user_email'] . "',
                  NOW(),
                  0
                    )";

        $result = mysqli_query($conn, $sql);
        if(!$result)
        {
            echo 'Something went wrong while registering. Please try again later.';
        }
        else
        {
            echo 'Successfully registered. You can now <a href="signin.php">sign in</a> and start interacting';
        }
    }
}
include 'footer.php';
?>
