<?php
return array(
		'controllers' => array(
				'invokables' => array(
						'Note\Controller\Note1' => 'Note\Controller\NoteController',
				),
		),
		// The following Save is new and should be added to your file
		'router' => array(
				'routes' => array(
						'Note' => array(
								'type'    => 'segment',
								'options' => array(
										'route'    => '/note[/][:id]',
										'constraints' => array(

												'id' => '[a-zA-Z0-9_-]*',
										),
										'defaults' => array(
												'controller' => 'Note\Controller\Note',

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