


<?php


/*
 * Copyright 2011 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
include_once "templates/base.php";
set_include_path("../src/" . PATH_SEPARATOR . get_include_path());
require_once 'Google/Client.php';
require_once 'Google/Http/MediaFileUpload.php';
require_once 'Google/Service/Drive.php';


$fileid = $_POST['fileid'];

$file_up = $service->files->get($fileid);



// File's new content.

$data = $_POST['fileid'];

$additionalParams = array(

    'data' =>  $data,
    'mimeType' => 'text/html',
    'uploadType' => 'media',
    'convert'=>'true'

);

// Send the request to the API.
$updatedFile = $service->files->update($fileid, $file_up,$additionalParams);
