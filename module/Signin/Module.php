<?php
/**
 *
 *
 *
 *
 */

namespace Signin;

use Zend\Mvc\ModuleRouteListener;
use Zend\Mvc\MvcEvent;
use Zend\Db\ResultSet\ResultSet;
use Zend\Db\TableGateway\TableGateway;
Use Signin\Model\UserloginModel;
Use Signin\Model\UserloginTable;
use Signin\Model\AuthkeyModel;
use Signin\Model\AuthkeyTable;

Use Signin\Model\GmailloginModel;
Use Signin\Model\GmailloginTable;

class Module
{
    public function onBootstrap(MvcEvent $e)
    {
        $eventManager        = $e->getApplication()->getEventManager();
        $moduleRouteListener = new ModuleRouteListener();
        $moduleRouteListener->attach($eventManager);
    }

    public function getConfig()
    {
        return include __DIR__ . '/config/module.config.php';
    }

    public function getAutoloaderConfig()
    {
        return array(
            'Zend\Loader\StandardAutoloader' => array(
                'namespaces' => array(
                    __NAMESPACE__ => __DIR__ . '/src/' . __NAMESPACE__,
                		'Google' => __DIR__ . '/../../vendor/lib/Google',
                ),
            ),
        );
    }

    //Signin
    public function getServiceConfig()
    {
    	return array(
    			'factories' => array(
    					'Signin\Model\UserloginTable' => function($sm) {
    						$tableGateway = $sm->get('UserloginTableGateway');
    						$table = new UserloginTable($tableGateway);
    						return $table;
    					},
    					'UserloginTableGateway' => function ($sm) {
    						$dbAdapter = $sm->get('Zend\Db\Adapter\Adapter');
    						$resultSetPrototype = new ResultSet();
    						$resultSetPrototype->setArrayObjectPrototype(new UserloginModel());
    						return new TableGateway('user_table', $dbAdapter, null, $resultSetPrototype);
    					},
    					'Signin\Model\AuthkeyTable' => function($sm) {
    						$tableGateway = $sm->get('AuthkeyTableGateway');
    						$table = new AuthkeyTable($tableGateway);
    						return $table;
    					},
    					'AuthkeyTableGateway' => function ($sm) {
    						$dbAdapter = $sm->get('Zend\Db\Adapter\Adapter');
    						$resultSetPrototype = new ResultSet();
    						$resultSetPrototype->setArrayObjectPrototype(new AuthkeyModel());
    						return new TableGateway('user_keys', $dbAdapter, null, $resultSetPrototype);
    					},


    			),
    	);
    }


}