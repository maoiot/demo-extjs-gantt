<?php

header('Content-Type: application/json; charset=utf-8');

require 'UploadException.php';

$dir      = dirname(__FILE__);
$jar_path = $dir .'/../msprojectreader/target/bryntum-msproject-reader-4.0.0.jar';
$tmp_dir  = $dir .'/tmp/';

try {

    if (!$_FILES['mpp-file']) {
        throw new Exception('Upload failed, probably the upload request exceeds the maximum allowed size');
    }

    if ($_FILES['mpp-file']['error'] !== UPLOAD_ERR_OK) {
        throw new Bryntum\UploadException($_FILES['mpp-file']['error']);
    }

    $tmp_file = $_FILES['mpp-file']['tmp_name'];

    if (!is_uploaded_file($tmp_file)) {
        throw new Exception('Upload failed.');
    }

    if (!is_dir($tmp_dir)) {
        throw new Exception('No such directory exists.');
    }

    $move_path = $tmp_dir . $_FILES['mpp-file']['name'];

    if (!move_uploaded_file($tmp_file, $move_path)) {
        throw new Exception('Cannot save file. Please verify, that web-server user account has write permission to '. $move_path);
    }

    // launch JAR file to extract the uploaded MPP-file contents
    $json = shell_exec('java -jar '. escapeshellarg($jar_path) .' '. escapeshellarg($move_path) .' 1');

    if (!$json) {
        throw new Exception('Could not process uploaded file.');
    }

    // cleanup copied file
    unlink($move_path);

    echo '{"success": true, "data": '.$json.'}';

} catch (Exception $e) {

    die(
        json_encode(
            array(
                'success' => false,
                'msg'     => $e->getMessage()
            )
        )
    );

}
