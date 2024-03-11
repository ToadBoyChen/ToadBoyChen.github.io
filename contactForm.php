<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];

    $to = "toby.chen1337@gmail.com";

    $subject = "New Contact Form Submission";

    $body = "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Message:\n$message";

    if (mail($to, $subject, $body)) {
        header("Location: thankyou.html");
        exit;
    } 
    else 
    {
        header("Location: contact.html?success=false");
        exit;
    }
} else {
    header("Location: contact.html");
    exit;
}
?>
