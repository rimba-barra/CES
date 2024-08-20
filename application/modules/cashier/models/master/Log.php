<?php

/**
 * Description of ClusterTran
 *
 * @author MIS
 */
class Cashier_Models_Master_Log extends Cashier_Box_Models_ObjectEmbedData implements Cashier_Box_Kouti_Remora,  Cashier_Box_Models_Master_InterProjectPt,Cashier_Box_Delien_DelimiterCandidate {
    
    private $action;
    private $actionType;
    private $user;
    private $addon;
    private $transaction_id;
    private $transaction_no;
    private $module;
    private $trans_amount;
    

    
   public function __construct() {
        parent::__construct();
        $this->project = new Cashier_Box_Models_Master_Project();
        $this->pt = new Cashier_Box_Models_Master_Pt();
       
        //$this->detail = array();
        $this->embedPrefix = 'log_';
    }

    function getAction() {
        return $this->action;
    }

    function getActionType() {
        return $this->actionType;
    }

    function setAction($action) {
        $this->action = $action;
    }

    function setActionType($actionType) {
        $this->actionType = $actionType;
    }
    function getUser() {
        return $this->user;
    }

    function setUser($user) {
        $this->user = $user;
    }
    function getAddon() {
        return $this->addon;
    }

    function setAddon($addon) {
        $this->addon = $addon;
    }

     function getTransactionid() {
        return $this->transaction_id;
    }

    function setTransactionid($transaction_id) {
        $this->transaction_id = $transaction_id;
    }

     function getTransactionNo() {
        return $this->transaction_no;
    }

    function setTransactionNo($transaction_no) {
        $this->transaction_no = $transaction_no;
    }

     function getModule() {
        return $this->module;
    }

    function setModule($module) {
        $this->module = $module;
    }

     function getTransAmount() {
        return $this->trans_amount;
    }

    function setTransAmount($trans_amount) {
        $this->trans_amount = $trans_amount;
    }





            
                
    public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['action_id'])){
           $this->setId($x['action_id']); 
        }
        if(isset ($x['action_type'])){
           $this->setActionType($x['action_type']); 
        }
        if(isset ($x['action'])){
           $this->setAction($x['action']); 
        }
        if(isset ($x['user_name'])){
           $this->setUser($x['user_name']); 
        }
        if(isset ($x['addon'])){
           $this->setAddon($x['addon']); 
        }

        if(isset ($x['transaction_id'])){
           $this->setTransactionid($x['transaction_id']); 
        }

        if(isset ($x['transaction_no'])){
           $this->setTransactionNo($x['transaction_no']); 
        }

        if(isset ($x['module'])){
           $this->setModule($x['module']); 
        }

        if(isset ($x['trans_amount'])){
           $this->setTransAmount($x['trans_amount']); 
        }

    
        unset($x);
        
    }
    
    public function getArrayTable() {
       
        $x = array(
            "action_type"=>$this->getActionType(),
            "action_id"=>$this->getId(),   
            "action"=>$this->getAction(),       
            "user_name"=>$this->getUser(),       
            "addon"=>$this->getAddon(),
             "transaction_id"=>$this->getTransactionid(),
              "transaction_no"=>$this->getTransactionNo(),
               "module"=>$this->getModule(),
                "trans_amount"=>$this->getTransAmount()                    
        );
        
        return $x;
    }
    

    
    
    public function getProject() {
        return $this->project;
    }

    public function setProject(Cashier_Box_Models_Master_Project $project) {
        $this->project = $project;
    }
    
     public function setProjectPt(Cashier_Box_Models_Master_Project $project, Cashier_Box_Models_Master_Pt $pt) {
        $this->project = $project;
        $this->pt = $pt;
    }

    public function getPt() {
        return $this->pt;
    }

    public function setPt(Cashier_Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getProject(),$this->getPt());
    }
    
    protected function getDatefields() {
        $x = parent::getDatefields();
        return array_merge($x,array("Modion","Addon"));
    }

    public function getDCArray() {
        return $this->detail;
    }

    public function getDCResult() {
        return $this->dcResult;
    }

    public function setDCArray($delimiteredArray) {
        $this->dcResult = $delimiteredArray;
    }



}

?>
