<?php

class Main_Models_Email {
	
	private $zendSmpt;
	private $status;
	private $error;
	private $zendMail;
	
	public function __construct(){
            
         
            $this->zendSmpt = new Zend_Mail_Transport_Smtp('mail.ciputra.co.id', array(
			'auth' => 'login',
			'username' => 'ces@ciputra.co.id',
			'password' => 'C3s4ho01',
			//// add by erwin.st 08042022 ////
			'port'     => 587,
			'ssl'      => 'tls'
			)
		);
             
          
         
           
             
            
        /*
		$this->zendSmpt = new Zend_Mail_Transport_Smtp('mail.ciputra.co.id', array(
			'auth' => 'login',
			'username' => 'qqqe@adad.com',
			'password' => 'adadasd',
			)
		);
       
        */
             
      
		
		
		Zend_Mail::setDefaultTransport($this->zendSmpt);
		$this->zendMail = new Zend_Mail();
	}
	
	public function getStatus(){
		return $this->status;
	}
	
	public function getError(){
		return $this->error;
	}
	
	public function getMail(){
		return $this->zendMail;
	}
}

?>
