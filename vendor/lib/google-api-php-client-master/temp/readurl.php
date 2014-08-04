<?php
/**
 * Created by PhpStorm.
 * User: lenovo
 * Date: 29/5/14
 * Time: 2:30 PM
 */

 print_r(file_get_contents('http:docs.google.com/document/d/1cgkp_ngIsPT3yJ-NvRo86ibEIFEqdV5rt65pwP9YfF0/'));

function downloadFile($service, $file) {
    $downloadUrl = $file->getDownloadUrl();
    if ($downloadUrl) {
        $request = new Google_HttpRequest($downloadUrl, 'GET', null, null);
        $httpRequest = Google_Client::$io->authenticatedRequest($request);
        if ($httpRequest->getResponseHttpCode() == 200) {
            return $httpRequest->getResponseBody();
        } else {
            // An error occurred.
            return null;
        }
    } else {
        // The file doesn't have any content stored on Drive.
        return null;
    }
}