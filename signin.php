<?php
    session_start();
    include_once 'connect.php';
    include_once 'header.php';

    echo '<h3>Sign in</h3>';

    if(isset($_SESSION['signed_in']) && $_SESSION['signed_in']) {
        echo 'You are already signed in, you can <a href="signout.php">sign out</a> if you want.';
    }
    else {
        if($_SERVER['REQUEST_METHOD'] != 'POST') {
            echo '<form method="post" action="">
                Username: <input type="text" name="user_name" />
                Password: <input type="password" name="user_pass">
                <input type="submit" value="Sign in" />
            </form>';
        }
        else {
            $errors = array();

            if(!isset($_POST['user_name'])) {
                $errors[] = 'The username field must not be empty.';
            }

            if(!isset($_POST['user_pass'])) {
                $errors[] = 'The password field must not be empty.';
            }

            if(!empty($errors)) {
                echo 'A couple of fields are not filled in correctly';
                echo '<ul>';
                foreach($errors as $key => $value) {
                    echo '<li>' . $value . '</li>';
                }
                echo '</ul>';
            }
            else {
                $sql = "SELECT user_id, user_name, user_level FROM users WHERE user_name = '" . $_POST['user_name'] . "' AND user_pass = '" . sha1($_POST['user_pass']) . "'";
                $result = mysqli_query($conn, $sql);
            
                if(!$result) {
                    echo 'Something went wrong while signing in. Please try again later.';
                }
                else {
                    if(mysqli_num_rows($result) == 0) {
                        echo 'You have supplied a wrong user/password combination. Please try again.';
                    }
                    else {
                        $_SESSION['signed_in'] = true;

                        while($row = mysqli_fetch_assoc($result)) {
                            $_SESSION['user_id']    = $row['user_id'];
                            $_SESSION['user_name']  = $row['user_name'];
                            $_SESSION['user_level'] = $row['user_level'];
                        }
                        echo 'Welcome, ' . $_SESSION['user_name'] . '. <a href="index.php">Proceed to the forum</a>.';
                    }
                }
            }
        }
    }

    include_once 'footer.php';
?>
