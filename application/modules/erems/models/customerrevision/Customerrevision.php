<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of CustomerTmp
 *
 * @author lenovo
 */
class Erems_Models_Customerrevision_Customerrevision extends Erems_Models_Master_CustomerProfile{
    private $customer_id;
    private $code;
    private $name;
    private $address;
    private $Approvedon;
    private $is_approved;
    private $Rejectedon;
    private $is_rejected;
    private $proposed_by;

    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "customerrevision_";
    }
    
    /*
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
         if(isset ($x['customer_tmp_id'])){
           $this->setId($x['customer_tmp_id']); 
        }
        if(isset ($x['customer_id'])){
           $this->setCustomer_id($x['customer_id']); 
        }
        if(isset ($x['name'])){
           $this->setName($x['name']); 
        }
       
        
        unset($x);
    }
     * 
     */
    
    
    /*
    public function getArrayTable() {
     
        $x = array(
            'customer_tmp_id'=>$this->getId(),
            'customer_id'=>$this->getCustomer_id(),
            'name'=>$this->getName(),
        );
      
        return $x;
    }
     * 
     * 
     */
    
    
    public function getArrayTable() {
        $x = array(
            'customer_tmp_id'=>$this->getId(),
            'customer_customer_id'=>$this->getCustomer_id(),
            'proposed_by' => $this->getProposedBy(),
            'Approvedon'=>$this->getApprovedon(),
            'is_approved'=>$this->getIsApproved(), 
            'Rejectedon'=>$this->getRejectedon(),
            'is_rejected'=>$this->getIsRejected(), 
        );
        
        $y =  parent::getArrayTable();
        
        
        $x= array_merge($x,$y);
        unset($x["customer_id"]);
        
        return $x;
       
        
    }

    public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
        $x=$dataArray;
        if(isset ($x['customer_tmp_id'])){
           $this->setId($x['customer_tmp_id']); 
        }
        if(isset ($x['customer_customer_id'])){
           $this->setCustomer_id($x['customer_customer_id']); 
        }
        if(isset ($x['customer_id'])){
           $this->setCustomer_id($x['customer_id']); 
        }
        if(isset ($x['proposed_by'])){
           $this->setProposedBy($x['proposed_by']); 
        }
        if(isset ($x['Approvedon'])){
           $this->setApprovedon($x['Approvedon']); 
        }
        if(isset ($x['is_approved'])){
           $this->is_approved = $x['is_approved']; 
        }
        if(isset ($x['Rejectedon'])){
           $this->setRejectedon($x['Rejectedon']); 
        }
        if(isset ($x['is_rejected'])){
           $this->is_rejected = $x['is_rejected']; 
        }
    }
    
    function getCustomer_id() {
        return $this->customer_id;
    }

    function getCode() {
        return $this->code;
    }

    function getName() {
        return $this->name;
    }

    function getAddress() {
        return $this->address;
    }

   

    function setCustomer_id($customer_id) {
        $this->customer_id = $customer_id;
    }

    function setCode($code) {
        $this->code = $code;
    }

    function setName($name) {
        $this->name = $name;
    }

    function setAddress($address) {
        $this->address = $address;
    }


    /**
     * @return mixed
     */
    public function getApprovedon()
    {
        return $this->Approvedon;
    }

    /**
     * @param mixed $Approvedon
     *
     * @return self
     */
    public function setApprovedon($Approvedon)
    {
        $this->Approvedon = $Approvedon;

        return $this;
    }



    /**
     * @return mixed
     */
    public function getIsApproved()
    {
        return $this->is_approved;
    }

    /**
     * @param mixed $is_approved
     *
     * @return self
     */
    public function setIsApproved($is_approved)
    {
        $this->is_approved = $is_approved;

        return $this;
    }



    /**
     * @return mixed
     */
    public function getRejectedon()
    {
        return $this->Rejectedon;
    }

    /**
     * @param mixed $Rejectedon
     *
     * @return self
     */
    public function setRejectedon($Rejectedon)
    {
        $this->Rejectedon = $Rejectedon;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getIsRejected()
    {
        return $this->is_rejected;
    }

    /**
     * @param mixed $is_rejected
     *
     * @return self
     */
    public function setIsRejected($is_rejected)
    {
        $this->is_rejected = $is_rejected;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getProposedBy()
    {
        return $this->proposed_by;
    }

    /**
     * @param mixed $proposed_by
     *
     * @return self
     */
    public function setProposedBy($proposed_by)
    {
        $this->proposed_by = $proposed_by;

        return $this;
    }
}
