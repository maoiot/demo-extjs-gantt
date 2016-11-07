<?php
/*
 * Copyright (C) 2012 Bryntum AB
 */

require_once('functions.php');
require_once('config.php');

try {
    if (!isset($_POST['html'])) {
        throw new Exception('Error in request data.');
    }

    if (!checkIfFolderWritable(OUTPUT_PATH)) {
        throw new Exception("Can't write to the folder " . OUTPUT_PATH);
    }

    if (!checkIfModuleAvailable(EXPORT_LAUNCHER_VERIFIER)) {
        throw new Exception('Module ' . EXPORT_LAUNCHER_VERIFIER . ' cannot be found. PhantomJS (or SlimerJS) not installed or not reachable.');
    }

    if (!checkIfModuleAvailable(IMGK_CONVERT_VERIFIER)) {
        throw new Exception('Module ' . IMGK_CONVERT_VERIFIER . ' cannot be found. ImageMagick not installed or not reachable.');
    }

    // get request parameters
    $html           = json_decode($_POST['html'], true);
    $format         = stripslashes($_POST['format']);
    $orientation    = stripslashes($_POST['orientation']);
    $range          = stripslashes($_POST['range']);
    $fileFormat     = stripslashes($_POST['fileFormat']);

    // generate name of the created single PDF file
    $out            = $range.buildUniqueFileName('-exportedPanel', '.').$fileFormat;

    // output file full path
    $outputFilePath = OUTPUT_PATH."/$out";
    // output file URL
    $outputFileURL  = OUTPUT_URL.$out;

    // put transferred pages HTML code to temporary files
    $files = buildHTMLFiles(OUTPUT_PATH, $html);

    // render HTML files to PNG images
    $images = renderHTMLFiles($files, OUTPUT_PATH, OUTPUT_URL, $format, $orientation);

    // build single PDF/PNG output file
    convertImagesToFile($images, $outputFilePath, $fileFormat);

    // cleanup temporary png/html files
    removeFiles(array_merge($images, $files), OUTPUT_PATH);


    header('Content-Type: application/json; charset=utf-8');
    //header("access-control-allow-origin: *");

    // return response
    die(json_encode(array(
        'success'   => true,
        // return url of the created file
        'url'       => $outputFileURL
    )));

} catch (Exception $e) {

    header('Content-Type: application/json; charset=utf-8');
    //header("access-control-allow-origin: *");

    die(json_encode(array(
        'success'   => false,
        'msg'       => $e->getMessage()
    )));

}
