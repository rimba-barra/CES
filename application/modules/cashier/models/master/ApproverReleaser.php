<?php


/**
 * Description of PaymentMethod
 *
 * @author tommytoban
 */
class Cashier_Models_Master_ApproverReleaser extends Cashier_Box_Models_ObjectEmbedData {
    private $user_id;
    private $user_fullname;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "approverreleaser_";
    }
    
    function getUser_id() {
        return $this->user_id;
    }

    function getUser_fullname() {
        return $this->user_fullname;
    }

    function setUser_id($user_id) {
        $this->user_id = $user_id;
    }

    function setUser_fullname($user_fullname) {
        $this->user_fullname = $user_fullname;
    }

        
    public function setArrayTable($dataArray=NULL) {
       // $x = $dataArray;
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;

        if(isset ($x['user_id'])){
           $this->setUser_id($x['user_id']); 
        }
        if(isset ($x['user_fullname'])){
           $this->setUser_fullname($x['user_fullname']); 
        }
        
        unset($x);
        
 
        
    }
    
    public function getArrayTable(){
        $x = array(
            "user_id"=>$this->getUser_id(),
            "user_fullname"=>$this->getUser_fullname(),
        );
        
        return $x;
    }


}

?>
