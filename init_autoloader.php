<?php
/**
 * Zend Framework (http://framework.zend.com/)
 *
 * @link      http://github.com/zendframework/ZendSkeletonApplication for the canonical source repository
 * @copyright Copyright (c) 2005-2013 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

/**
 * This autoloading setup is really more complicated than it needs to be for most
 * applications. The added complexity is simply to reduce the time it takes for
 * new developers to be productive with a fresh skeleton. It allows autoloading
 * to be correctly configured, regardless of the installation method and keeps
 * the use of composer completely optional. This setup should work fine for
 * most users, however, feel free to configure autoloading however you'd like.
 */


set_include_path("vendor/lib/google-api-php-client-master/src/" . PATH_SEPARATOR . get_include_path());


include_once 'Google/Client.php';
include_once 'Google/Service.php';
include_once 'Google/Collection.php';
include_once 'Google/Config.php';
include_once 'Google/Exception.php';
include_once 'Google/Model.php';
include_once 'Google/Utils.php';
require_once 'Google/Service/Plus.php';
require_once 'Google/Service/Drive.php';
require_once 'Google/authconfig.php';
//include 'vendor/lib/Google/*';



include 'vendor/lib/ResponseGenerator.php';
include 'vendor/lib/ServerapiUtil.php';

include 'vendor/lib/PHPMailer.php';
include 'vendor/lib/SMTP.php';
/*
function _require_all($dir, $depth=0) {
	if ($depth > 2) {
		return;
	}

	// require all php files
	$scan = glob("$dir/*");
	foreach ($scan as $path) {
		if (preg_match('/\.php$/', $path)) {
		    print_r($path);
			include $path;
		}
		elseif (is_dir($path)) {
			//_require_all($path, $depth+1);
		}
	}
}
 */



if (file_exists('vendor/autoload.php')) {
    $loader = include 'vendor/autoload.php';
}

$zf2Path = false;

if (is_dir('vendor/ZF2/library')) {
    $zf2Path = __DIR__.'/vendor/ZF2/library';
} elseif (getenv('ZF2_PATH')) {      // Support for ZF2_PATH environment variable or git submodule
    $zf2Path = getenv('ZF2_PATH');
} elseif (function_exists('zend_deployment_library_path') && zend_deployment_library_path ('Zend Framework 2')) {
	$zf2Path = zend_deployment_library_path ('Zend Framework 2');
} elseif (get_cfg_var('zf2_path')) { // Support for zf2_path directive value
    $zf2Path = get_cfg_var('zf2_path');
}

if ($zf2Path) {
    if (isset($loader)) {
        $loader->add('Zend', $zf2Path);
    } else {
        include $zf2Path . '/Zend/Loader/AutoloaderFactory.php';
        Zend\Loader\AutoloaderFactory::factory(array(
            'Zend\Loader\StandardAutoloader' => array(
                'autoregister_zf' => true
            )
        ));
    }
}

if (!class_exists('Zend\Loader\AutoloaderFactory')) {
    throw new RuntimeException('Unable to load ZF2. Run `php composer.phar install` or define a ZF2_PATH environment variable.');
}
