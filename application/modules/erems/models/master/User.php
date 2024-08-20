<?php

/**
 * Description of User
 *
 * @author MIS
 */
class Erems_Models_Master_User extends Erems_Box_Models_ObjectEmbedData {
    private $name;
    private $fullName;
	/* start added by ahmad riadi */
	 private $currentuser;	
	/* end added by ahmad riadi */
    
    public function __construct($params=NULL) {
        parent::__construct();
      //  $this->embedPrefix = 'user_';
         $this->embedPrefix = $params==NULL?'user_':$params;
    }
   
    /*start added by ahmad riadi */
    function getCurrentuser() {
       if(!$this->currentuser){
          $session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
          $userid = $session->getUserId();
          $userdao = new Erems_Models_Master_UserDao();
          $data = $userdao->getdataCurrentuser($userid);
          $this->currentuser = $data[0][0];
        }
        return $this->currentuser;
    }
    /*start end by ahmad riadi */
   
    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function getFullName() {
        return $this->fullName;
    }

    public function setFullName($fullName) {
        $this->fullName = $fullName;
    }
    
    public function setArrayTable($dataArray=NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        $this->setId($x['user_id']);
        $this->setName($x['user_name']);
        $this->setFullName($x['user_fullname']);
        
    }
    
    public function getArrayTable(){
        $x = array();
        $x['user_id'] = $this->getId();
        $x['user_name']  = $this->getName();
        $x['user_fullname'] = $this->getFullName();
		$x['currentuser'] = $this->getCurrentuser();
        return $x;
    }


}

?>
