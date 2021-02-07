<?php
$to = "info@cpr-team.ru" ;
$landingUrl = 'cpr-team.ru';
$headers = "From: landing@$landingUrl";

if (!empty($_POST)) {
    $name = trim(strip_tags($_POST['name']));
    $email = trim(strip_tags($_POST['email']));
    $phone = trim(strip_tags($_POST['phone']));
    $text = trim(strip_tags($_POST['text']));
    if ($phone || $email) {
        if (!$text) {
            $text = "Пользователь оставил заявку на проект " . date('Y-m-d H:i:s');
        }
        $message = "Запрос пользователя с $landingUrl\n";
        if ($phone) {
            $message .= "Телефон: $phone\n";
        }
        if ($email) {
            $message .= "E-mail: $email\n";
        }
        if ($name) {
            $message .= "Имя пользователя: $name\n";
        }
        $message .= "Сообщение: \n $text\n";
        mail($to, "Запрос пользователя с $landingUrl", $message, $headers);
        echo 'OK';
    } else {
        $error = 'Введите e-mail или телефон';
        echo $error;
    }
    die;
}


