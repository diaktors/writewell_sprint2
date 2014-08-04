<?php
return array(
		'controllers' => array(
				'invokables' => array(
						'Save\Controller\Save' => 'Save\Controller\SaveController',
				),
		),
		// The following Save is new and should be added to your file
		'router' => array(
				'routes' => array(
						'Save' => array(
								'type'    => 'segment',
								'options' => array(
										'route'    => '/save[/][/:id]',
										'constraints' => array(

												'id' => '[a-zA-Z0-9_-]*',
										),
										'defaults' => array(
												'controller' => 'Save\Controller\Save',

										),
								),
						),
				),
		),
		'view_manager' => array(
				'template_path_stack' => array(
						'view' => __DIR__ . '/../view',
				),
            'strategies' => array(
                'ViewJsonStrategy',
            ),
		),
);