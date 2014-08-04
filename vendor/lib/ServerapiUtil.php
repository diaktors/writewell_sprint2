<?php
class ServerapiUtil
{

	public  static $env="local";



	public static function getProjDir()
	{


		if(self::$env=='local')
			return $_SERVER ["DOCUMENT_ROOT"] . "/writewell_sprint2/public/docs/";
		else
			return $_SERVER ["DOCUMENT_ROOT"] . "/docs/";



	}
	public static function getSourceUploadDir()
	{

		if(self::$env=='local')
			return $_SERVER["DOCUMENT_ROOT"].'/writewell_sprint2/public/metadata/sources/';
		else
			return $_SERVER ["DOCUMENT_ROOT"] . "/metadata/sources/";



	}
	public static function getGoogleConfig()
	{


		$client_id = '220301297262-6echqsehb5gp8nn0oi2kef2a9ffhu52p.apps.googleusercontent.com';
		$client_secret = 'Fquq4SA_uqnUtgk7OdBY8zjb';
		$scopes = array (
				"https://www.googleapis.com/auth/drive",
				"https://www.googleapis.com/auth/userinfo.email",
				"https://www.googleapis.com/auth/userinfo.profile"
		);


		if($_SERVER ['HTTP_HOST']=="localhost")
			$redirect_uri = 	 'http://' . $_SERVER ['HTTP_HOST'] .'/writewell_sprint2/public/signin/handle';
		else
			$redirect_uri = 'http://' . $_SERVER ['HTTP_HOST'] .'/signin/handle';

		/* if($this->env=="local")
				$redirect_uri = 'http://' . $_SERVER ['HTTP_HOST'] .'/signin/handle';
		else
			$redirect_uri = 'http://' . $_SERVER ['HTTP_HOST'] .'signin/handle'; */


	 return json_decode(
				json_encode(array("client_id"=>$client_id,"client_secret"=>$client_secret,"scopes"=>$scopes,"redirect_uri"=>$redirect_uri)),
				 FALSE);


	}
	public static function   getWritewellCredentials()
	{
		/* $authdata='{
					"access_token":"ya29.QAAp17QEHqQLpBkAAADHPfjGp_jZ7F5qT4DU-CbEAbKQtes5CRe1vaPzeP-yFQ",
					"token_type":"Bearer",
					"expires_in":3600,
					"id_token":"eyJhbGciOiJSUzI1NiIsImtpZCI6IjIwNWJkZDJkYzAxZDM5MTE3MWFiZmZjZDZmOTE3ZmU2Njk3ODYxNmYifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiaWQiOiIxMTE5NzU5OTg4MzYxODg3MzYwODUiLCJzdWIiOiIxMTE5NzU5OTg4MzYxODg3MzYwODUiLCJhenAiOiIyMjAzMDEyOTcyNjItNmVjaHFzZWhiNWdwOG5uMG9pMmtlZjJhOWZmaHU1MnAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJlbWFpbCI6InNuYWxsYW1AcmFwaWRiaXphcHBzLmNvbSIsImF0X2hhc2giOiI4d1lOemE4TzJxMkYtdzBwalBxWDZnIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF1ZCI6IjIyMDMwMTI5NzI2Mi02ZWNocXNlaGI1Z3A4bm4wb2kya2VmMmE5ZmZodTUycC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImhkIjoicmFwaWRiaXphcHBzLmNvbSIsInRva2VuX2hhc2giOiI4d1lOemE4TzJxMkYtdzBwalBxWDZnIiwidmVyaWZpZWRfZW1haWwiOnRydWUsImNpZCI6IjIyMDMwMTI5NzI2Mi02ZWNocXNlaGI1Z3A4bm4wb2kya2VmMmE5ZmZodTUycC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImlhdCI6MTQwNTEzNTYwOSwiZXhwIjoxNDA1MTM5NTA5fQ.XHVje2uPswJYw19qsf-2OPOl7s0GuZUzQas20fOePmwqosz5qp4rjj23BAIukjJvkB4LLpCGeMOmLPmNQeTn5FoVHsKRX3GGVfnaR1Jb1Wn5by6xnedttFx4NbRJKqX5qKpJra6dhcjtlpepL9YZ9oSXq6fwQAvENlRwgxy4lcY",
					"refresh_token":"1\/nl0IPF0N3jmgR0xL9GMH9z-sdkOL9rYsLcAKyekhJkU",
					"created":1405135909
		}'; */

		$authdata='
		              {"access_token":"ya29.UQAu1aCDeeZgbyEAAABccR-fjrgWf3mlGYhm-K9QspMS7TVg9sWjk5d8njj-a6GcGwBreuQIuCSyBubaYUs",
				"token_type":"Bearer","expires_in":3600,
				"id_token":"eyJhbGciOiJSUzI1NiIsImtpZCI6ImYwYTIxMWVjYjVjYTZlZmY4Nzg4YjJhOWM2M2QyMjBmMGI4ZWRhNWYifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiaWQiOiIxMTE2NjMyNjQ1ODE5MTQ3MTQxOTEiLCJzdWIiOiIxMTE2NjMyNjQ1ODE5MTQ3MTQxOTEiLCJhenAiOiIyMjAzMDEyOTcyNjItNmVjaHFzZWhiNWdwOG5uMG9pMmtlZjJhOWZmaHU1MnAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJlbWFpbCI6IndyaXRld2VsbC5yYmFAZ21haWwuY29tIiwiYXRfaGFzaCI6IkdRRVNUYmtZOGdaNF9kcHlLVjZHaXciLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXVkIjoiMjIwMzAxMjk3MjYyLTZlY2hxc2VoYjVncDhubjBvaTJrZWYyYTlmZmh1NTJwLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwidG9rZW5faGFzaCI6IkdRRVNUYmtZOGdaNF9kcHlLVjZHaXciLCJ2ZXJpZmllZF9lbWFpbCI6dHJ1ZSwiY2lkIjoiMjIwMzAxMjk3MjYyLTZlY2hxc2VoYjVncDhubjBvaTJrZWYyYTlmZmh1NTJwLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiaWF0IjoxNDA2NjQ0OTI0LCJleHAiOjE0MDY2NDg4MjR9.Wqy2hTF2ioWrVyWo5wdezWS61iD9hbOGm209lcexLOG5XuxZN6QrjD9adaGnAFUMOKFkV4qp23VWEah3v0nNyvv8j5rwQ9T-cXAf2S6Ff_F0O4J8CEEnXylFPu-do13S3m37O1ONTYihAIxUNa99uSOEj8DTRwRHQ-fO9i3Eww8","refresh_token":"1\/Z3l49anx-qKU9o3lCBhbpGfq126hE7j24mA8QdzBtjM",
				"created":1406645224}';

		return $authdata;
	}

	public static function   getClientUrl()
	{


       if($_SERVER ['HTTP_HOST']=="localhost")
		return 'http://' . $_SERVER ['HTTP_HOST'] .'/writewell_3/';
       else
       	return "http://ec2-54-204-117-51.compute-1.amazonaws.com/writewell_client/web_optimized/";

	}



}
