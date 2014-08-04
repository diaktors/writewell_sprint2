<?php
return array(
		'controllers' => array(
				'invokables' => array(
						'Signin\Controller\Signin' => 'Signin\Controller\SigninController',
				),
		),
		// The following section is new and should be added to your file
		'router' => array(
				'routes' => array(
						'signin' => array(
								'type'    => 'segment',
								'options' => array(
										'route'    => '/signin[/][:action][/:id]',
										'constraints' => array(
												'action' => '[a-zA-Z][a-zA-Z0-9_-]*',
												'id'     => '[0-9]+',
										),
										'defaults' => array(
												'controller' => 'Signin\Controller\Signin',
												'action'     => 'index',
										),
								),
						),
				),
		),
		'view_manager' => array(
				'template_path_stack' => array(
						'signin' => __DIR__ . '/../view',
				),
		),
);