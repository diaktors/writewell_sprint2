<?php


/**
 * Extension to the regular Google_Model that automatically
 * exposes the items array for iteration, so you can just
 * iterate over the object rather than a reference inside.
 */
class authdata
{
  protected $clientID;
  protected $clientSecret;

  public function __construct($config = null)
  {
  	$this->clientID='220301297262-6echqsehb5gp8nn0oi2kef2a9ffhu52p.apps.googleusercontent.com';
  	$this->clientSecret = 'Fquq4SA_uqnUtgk7OdBY8zjb';

  }
  public function getclientID()
  {
  	return $this->clientID;
  }

  public function getclientSecret()
  {
  	return $this->clientSecret;
  }

 }
