<?php
return array(
		'controllers' => array(
				'invokables' => array(
						'Forgetpassword\Controller\Forgetpassword' => 'Forgetpassword\Controller\ForgetpasswordController',
				),
		),
		// The following section is new and should be added to your file
		'router' => array(
				'routes' => array(
						'forgetpassword' => array(
								'type'    => 'segment',
								'options' => array(
										'route'    => '/forgetpassword[/][:action][/:id][/:password]',
										'constraints' => array(
												'action' => '[a-zA-Z][a-zA-Z0-9_-]*',
												'id'     => '[a-zA-Z0-9_-]+',
												'password'=> '[a-zA-Z0-9_-]+',
										),
										'defaults' => array(
												'controller' => 'Forgetpassword\Controller\Forgetpassword',
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