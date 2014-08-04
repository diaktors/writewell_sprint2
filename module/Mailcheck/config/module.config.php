<?php
return array(
		'controllers' => array(
				'invokables' => array(
						'Mailcheck\Controller\Mailcheck' => 'Mailcheck\Controller\MailcheckController',
				),
		),
		// The following section is new and should be added to your file
		'router' => array(
				'routes' => array(
						'forgetpassword' => array(
								'type'    => 'segment',
								'options' => array(
										'route'    => '/mailcheck[/][:action][/:id][/:key]',
										'constraints' => array(
												'action' => '[a-zA-Z][a-zA-Z0-9_-]*',
												'id'=>'[0-9]+',

												'key'=> '[a-zA-Z0-9_-]+',
										),
										'defaults' => array(
												'controller' => 'Mailcheck\Controller\Mailcheck',
												'action'     => 'index',
										),
								),
						),
				),
		),
		'view_manager' => array(
				'template_path_stack' => array(
						'forgetpassword' => __DIR__ . '/../view',
				),
		),
);