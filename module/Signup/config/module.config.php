<?php
return array(
		'controllers' => array(
				'invokables' => array(
						'Signup\Controller\Signup' => 'Signup\Controller\SignupController',
				),
		),
		// The following section is new and should be added to your file
		'router' => array(
				'routes' => array(
						'Signup' => array(
								'type'    => 'segment',
								'options' => array(
										'route'    => '/signup[/][:action][/:id]',
										'constraints' => array(
												'action' => '[a-zA-Z][a-zA-Z0-9_-]*',
												'id'     => '[0-9]+',
										),
										'defaults' => array(
												'controller' => 'Signup\Controller\Signup',
												'action'     => 'index',
										),
								),
						),
				),
		),
		'view_manager' => array(
				'template_path_stack' => array(
						'Signup' => __DIR__ . '/../view',
				),
		),
);