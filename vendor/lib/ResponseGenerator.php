<?php
class ResponseGenerator
{

	public static function create_response($status,$msg,$result=null)
	{

		return  array("status"=>$status,"msg"=>$msg,"result"=>$result);

	}



}
