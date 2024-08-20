<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ParameterSPPJB
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Legal_ParameterSPPJB extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora,  Erems_Box_Models_Master_InterProjectPt{
    private $project;
    private $pt;
    private $code;
    private $name01;
    private $position01;
    private $address01;
    private $name02;
    private $position02;
    private $address02;
    private $aktaNo;
    private $aktaDate;
    private $notaris;
    private $aktaNo2;
    private $aktaDate2;
    private $notaris2;
    private $accountNo;
    private $accountName;
    private $accountAddress;
    private $isDefault;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "parametersppjb_";
    }
    
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['parametersppjb_id'])){
           $this->setId($x['parametersppjb_id']); 
        }
        if(isset ($x['code'])){
           $this->setCode($x['code']); 
        }
        if(isset ($x['name_01'])){
           $this->setName01($x['name_01']); 
        }
        if(isset ($x['position_01'])){
           $this->setPosition01($x['position_01']); 
        }
        if(isset ($x['address_01'])){
           $this->setAddress01($x['address_01']); 
        }
        if(isset ($x['name_02'])){
           $this->setName02($x['name_02']); 
        }
        if(isset ($x['position_02'])){
           $this->setPosition02($x['position_02']); 
        }
        if(isset ($x['address_02'])){
           $this->setAddress02($x['address_02']); 
        }
        if(isset ($x['akta_no'])){
           $this->setAktaNo($x['akta_no']); 
        }
        if(isset ($x['akta_date'])){
           $this->setAktaDate($x['akta_date']); 
        }
        if(isset ($x['notaris'])){
           $this->setNotaris($x['notaris']); 
        }
        if(isset ($x['akta_no_2'])){
           $this->setAktaNo2($x['akta_no_2']); 
        }
        if(isset ($x['akta_date_2'])){
           $this->setAktaDate2($x['akta_date_2']); 
        }
        if(isset ($x['notaris_2'])){
           $this->setNotaris2($x['notaris_2']); 
        }
        if(isset ($x['account_no'])){
           $this->setAccountNo($x['account_no']); 
        }
        if(isset ($x['account_name'])){
           $this->setAccountName($x['account_name']); 
        }
        if(isset ($x['account_address'])){
           $this->setAccountAddress($x['account_address']); 
        }
        if(isset ($x['is_default'])){
           $this->setIsDefault($x['is_default']); 
        }
        
        
       
        
        unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'parametersppjb_id'=>$this->getId(),
            'code'=>$this->getCode(),
            'name_01'=>$this->getName01(),
            'position_01'=>$this->getPosition01(),
            'address_01'=>$this->getAddress01(),
            'name_02'=>$this->getName02(),
            'position_02'=>$this->getPosition02(),
            'address_01'=>$this->getAddress01(),
            'name_02'=>$this->getName02(),
            'position_02'=>$this->getPosition02(),
            'address_02'=>$this->getAddress02(),
            'akta_no'=>$this->getAktaNo(),
            'akta_date'=>$this->getAktaDate(),
            'notaris'=>$this->getNotaris(),
            'akta_no_2'=>$this->getAktaNo2(),
            'akta_date_2'=>$this->getAktaDate2(),
            'notaris_2'=>$this->getNotaris2(),
            'account_no'=>$this->getAccountNo(),
            'account_name'=>$this->getAccountName(),
            'account_address'=>$this->getAccountAddress(),
            'is_default'=>$this->getIsDefault(),
            
            
            
            
        );
        
        return $x;
    }
    
    protected function getDatefields() {
        return array("akta_date");
    }
    
    public function getProject() {
        if(!$this->project){
            $this->project = new Erems_Box_Models_Master_Project();
        }
        return $this->project;
    }

    public function getPt() {
        if(!$this->pt){
            $this->pt = new Erems_Box_Models_Master_Pt();
            
        }
        return $this->pt;
    }

    public function getCode() {
        return $this->code;
    }

    public function getName01() {
        return $this->name01;
    }

    public function getPosition01() {
        return $this->position01;
    }

    public function getAddress01() {
        return $this->address01;
    }

    public function getName02() {
        return $this->name02;
    }

    public function getPosition02() {
        return $this->position02;
    }

    public function getAddress02() {
        return $this->address02;
    }

    public function getAktaNo() {
        return $this->aktaNo;
    }

    public function getAktaDate() {
        return $this->aktaDate;
    }

    public function getNotaris() {
        return $this->notaris;
    }

    public function getAktaNo2() {
        return $this->aktaNo2;
    }

    public function getNotaris2() {
        return $this->notaris2;
    }

    public function getAccountNo() {
        return $this->accountNo;
    }

    public function getAccountName() {
        return $this->accountName;
    }

    public function getAccountAddress() {
        return $this->accountAddress;
    }

    public function getIsDefault() {
        return $this->isDefault;
    }

    public function setProject(Erems_Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function setPt(Erems_Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    public function setCode($code) {
        $this->code = $code;
    }

    public function setName01($name01) {
        $this->name01 = $name01;
    }

    public function setPosition01($position01) {
        $this->position01 = $position01;
    }

    public function setAddress01($address01) {
        $this->address01 = $address01;
    }

    public function setName02($name02) {
        $this->name02 = $name02;
    }

    public function setPosition02($position02) {
        $this->position02 = $position02;
    }

    public function setAddress02($address02) {
        $this->address02 = $address02;
    }

    public function setAktaNo($aktaNo) {
        $this->aktaNo = $aktaNo;
    }

    public function setAktaDate($aktaDate) {
        $this->aktaDate = $aktaDate;
    }

    public function setNotaris($notaris) {
        $this->notaris = $notaris;
    }

    public function setAktaNo2($aktaNo2) {
        $this->aktaNo2 = $aktaNo2;
    }

    public function setNotaris2($notaris2) {
        $this->notaris2 = $notaris2;
    }

    public function setAccountNo($accountNo) {
        $this->accountNo = $accountNo;
    }

    public function setAccountName($accountName) {
        $this->accountName = $accountName;
    }

    public function setAccountAddress($accountAddress) {
        $this->accountAddress = $accountAddress;
    }

    public function setIsDefault($isDefault) {
        $this->isDefault = $isDefault;
    }
    
    public function getAktaDate2() {
        return $this->aktaDate2;
    }

    public function setAktaDate2($aktaDate2) {
        $this->aktaDate2 = $aktaDate2;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }

}
