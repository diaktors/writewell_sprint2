<?php
return array(
    'controllers' => array(
        'invokables' => array(
            'Project\Controller\Project' => 'Project\Controller\ProjectController',
        ),
    ),
    // The following section is new and should be added to your file
    'router' => array(
        'routes' => array(
            'Project' => array(
                'type' => 'segment',
                'options' => array(
                    'route' => '/project[/][:id]',
                    'constraints' => array(
                        'id'     => '[a-zA-Z0-9]*',
                    ),
                    'defaults' => array(
                        'controller' => 'Project\Controller\Project',

                    ),
                ),
            ),
        ),
    ),
    'view_manager' => array(
        'template_path_stack' => array(
            __DIR__ . '/../view',
        ),
        'strategies' => array(
            'ViewJsonStrategy',
        ),
    ),
);