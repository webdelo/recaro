<?php
error_reporting(E_ERROR | E_PARSE);

if (isset($_POST['mailType']) && !empty($_POST['mailType'])) {

    $mailType = $_POST['mailType'];

    if ($mailType == 'contactManager') {
        $name = $_POST['name'];
        $phone = $_POST['phone'];
        $text = $_POST['text'];

        $emailContent = file_get_contents('./emails/contactManager.htm');
        $variables = ['name' => $name, 'phone' => $phone, 'text' => $text];
        $mailSubject = 'Заявка на вопрос менеджеру';
    } else {

        $quantity = $_POST['quantity'];
        $name = $_POST['name'];
        $email = $_POST['email'];
        $phone = $_POST['phone'];
        $address = $_POST['address'];
        $product = $_POST['product'];

        $emailContent = file_get_contents('./emails/requestProduct.htm');
        $variables = [
            'quantity' => $quantity,
            'name' => $name,
            'email' => $email,
            'phone' => $phone,
            'address' => $address,
            'product' => $product,
        ];
        $mailSubject = 'Заявка на товар';
    }

    $host = $_SERVER['HTTP_HOST'];
    $variables['host'] = $host;
    foreach ($variables as $key => $val) {
        $emailContent = str_replace('$' . $key, $val, $emailContent);
    }

    require_once './vendor/autoload.php';

    $mailSubject .= ' ' . '(' . $host . ')';
    #$recipient = $host == 'recaro-cs.ru' ? 'denis.kamenshik@gmail.com' : 'denis.kamenshik@gmail.com';

    $transport = new Swift_SendmailTransport('/usr/sbin/sendmail -bs');
    $mailer = new Swift_Mailer($transport);

    $message = (new Swift_Message())
        ->setSubject($mailSubject)
        ->setFrom('noreply@'.$host)
        ->setTo(['denis.kamenshik@gmail.com','comanda@ligood.eu'])
        ->setPriority(1)
        ->setBody($emailContent, 'text/html');

    $result = $mailer->send($message);
    echo json_decode($result);
}
