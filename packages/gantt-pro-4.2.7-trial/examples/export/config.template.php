<?php
/*
 * Copyright (C) 2016 Bryntum AB
 */
 
// Path to local binary folder
define('COMMON_PATH', '');

// Path to launcher (phantomjs or slimerjs) binary folder
define('LAUNCHER_PATH', COMMON_PATH);

// Launcher name (phantomjs or slimerjs)
define('LAUNCHER_NAME', 'phantomjs');

// Command to run launcher (phantomjs or slimerjs) in console/terminal
define('EXPORT_LAUNCHER', LAUNCHER_PATH . LAUNCHER_NAME);

// Command to check accessibility of the launcher in console/terminal
// Output must not be empty
define('EXPORT_LAUNCHER_VERIFIER', EXPORT_LAUNCHER . ' --version');

// Path to ImageMagick binary folder
define('IMGK_PATH', COMMON_PATH);

// ImageMagick convert name
define('IMGK_CONVERT_NAME', 'convert');

// Command to run ImageMagick convert
define('IMGK_CONVERT', IMGK_PATH . IMGK_CONVERT_NAME);

// ImageMagick montage name
define('IMGK_MONTAGE_NAME', 'montage');

// Command to run ImageMagick montage
define('IMGK_MONTAGE', IMGK_PATH . IMGK_MONTAGE_NAME);

// Command to check accessibility of the ImageMagick in console/terminal
// Output must not be empty
define('IMGK_CONVERT_VERIFIER', IMGK_CONVERT . ' --version');

// Path where temporary HTML and resulting PNG/PDF files will be created
// define('OUTPUT_PATH', '/some/folder');
define('OUTPUT_PATH', dirname(__FILE__).'/output');

// If you change OUTPUT_PATH then URL string pointing to that folder should be placed here.
// getCurrentPageURL described in functions.php file
// define('OUTPUT_URL', 'http://localhost/somefolder/');
define('OUTPUT_URL', getCurrentPageURL(true).'output/');