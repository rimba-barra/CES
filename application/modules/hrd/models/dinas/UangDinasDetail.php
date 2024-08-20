<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of UangDinasDetail
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Dinas_UangDinasDetail extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Arried {
    private $uangDinas;
    private $negaraTujuan;
    private $employeeGroup;
    private $description;
    private $currencyId;
    private $uangHotel;
    private $uangMakanPP1m;
    private $uangMakanPPXm;
    private $uangMakanPU1m;
    private $uangMakanPUXm;
    private $uangSakuPP1m;
    private $uangSakuPPXm;
    private $uangSakuPU1m;
    private $uangSakuPUXm;
    private $standartHotel;
    private $currency;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "uangdinasdetail_";
    }
    
    
    
    
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['uangdinas_detail_id'])){
           $this->setId($x['uangdinas_detail_id']); 
        }
        if(isset ($x['uangdinas_uangdinas_id'])){
           $this->getUangDinas()->setId($x['uangdinas_uangdinas_id']); 
        }
        if(isset ($x['negaratujuan_negaratujuan_id'])){
           $this->getNegaraTujuan()->setId($x['negaratujuan_negaratujuan_id']); 
        }
        if(isset ($x['group_group_id'])){
           $this->getEmployeeGroup()->setId($x['group_group_id']); 
        }
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
        if(isset ($x['currency_currency_id'])){
           $this->getCurrency()->setId($x['currency_currency_id']); 
        }
        if(isset ($x['uanghotel'])){
           $this->setUangHotel($x['uanghotel']); 
        }
        if(isset ($x['uangmakan_pp_1m'])){
           $this->setUangMakanPP1m($x['uangmakan_pp_1m']); 
        }
        if(isset ($x['uangmakan_pp_xm'])){
           $this->setUangMakanPPXm($x['uangmakan_pp_xm']); 
        }
        if(isset ($x['uangmakan_pu_1m'])){
           $this->setUangMakanPU1m($x['uangmakan_pu_1m']); 
        }
        if(isset ($x['uangmakan_pu_xm'])){
           $this->setUangMakanPUXm($x['uangmakan_pu_xm']); 
        }
        if(isset ($x['uangsaku_pp_1m'])){
           $this->setUangSakuPP1m($x['uangsaku_pp_1m']); 
        }
        if(isset ($x['uangsaku_pp_xm'])){
           $this->setUangSakuPPXm($x['uangsaku_pp_xm']); 
        }
        if(isset ($x['uangsaku_pu_1m'])){
           $this->setUangSakuPU1m($x['uangsaku_pu_1m']); 
        }
        if(isset ($x['uangsaku_pu_xm'])){
           $this->setUangSakuPUXm($x['uangsaku_pu_xm']); 
        }
        if(isset ($x['standart_hotel'])){
           $this->setStandartHotel($x['standart_hotel']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'uangdinas_detail_id'=>$this->getId(),
            'uangdinas_uangdinas_id'=>$this->getUangDinas()->getId(),
            'negaratujuan_negaratujuan_id'=>$this->getNegaraTujuan()->getId(),
            'group_group_id'=>$this->getEmployeeGroup()->getId(),
            'description'=>$this->getDescription(),
            'currency_currency_id'=>$this->getCurrency()->getId(),
            'uanghotel'=>$this->getUangHotel(),
            'uangmakan_pp_1m'=>$this->getUangMakanPP1m(),
            'uangmakan_pp_xm'=>$this->getUangMakanPPXm(),
            'uangmakan_pu_1m'=>$this->getUangMakanPU1m(),
            'uangmakan_pu_xm'=>$this->getUangMakanPUXm(),
            'uangsaku_pp_1m'=>$this->getUangSakuPP1m(),
            'uangsaku_pp_xm'=>$this->getUangSakuPPXm(),
            'uangsaku_pu_1m'=>$this->getUangSakuPU1m(),
            'uangsaku_pu_xm'=>$this->getUangSakuPUXm(),
            'standart_hotel'=>$this->getStandartHotel()
           
        );
      
        return $x;
    }
    
    public function getUangDinas() {
        if(!$this->uangDinas){
            $this->uangDinas = new Hrd_Models_Dinas_UangDinas();
        }
        return $this->uangDinas;
    }

    public function getNegaraTujuan() {
        if(!$this->negaraTujuan){
            $this->negaraTujuan = new Hrd_Models_Dinas_NegaraTujuan();
        }
        return $this->negaraTujuan;
    }

    public function getEmployeeGroup() {
        if(!$this->employeeGroup){
            $this->employeeGroup = new Hrd_Models_Master_Group();
        }
        return $this->employeeGroup;
    }

    public function getDescription() {
        return $this->description;
    }

    public function getCurrencyId() {
        return $this->currencyId;
    }

    public function getUangHotel() {
        return $this->uangHotel;
    }

    public function getUangMakanPP1m() {
        return $this->uangMakanPP1m;
    }

    public function getUangMakanPPXm() {
        return $this->uangMakanPPXm;
    }

    public function getUangMakanPU1m() {
        return $this->uangMakanPU1m;
    }

    public function getUangMakanPUXm() {
        return $this->uangMakanPUXm;
    }

    public function getUangSakuPP1m() {
        return $this->uangSakuPP1m;
    }

    public function getUangSakuPPXm() {
        return $this->uangSakuPPXm;
    }

    public function getUangSakuPU1m() {
        return $this->uangSakuPU1m;
    }

    public function getUangSakuPUXm() {
        return $this->uangSakuPUXm;
    }

    public function setUangDinas(Hrd_Models_Dinas_UangDinas $uangDinas) {
        $this->uangDinas = $uangDinas;
    }

    public function setNegaraTujuan(Hrd_Models_Dinas_NegaraTujuan $negaraTujuan) {
        $this->negaraTujuan = $negaraTujuan;
    }

    public function setEmployeeGroup(Hrd_Models_Master_Group $employeeGroup) {
        $this->employeeGroup = $employeeGroup;
    }

    public function setDescription($description) {
        $this->description = $description;
    }

    public function setCurrencyId($currencyId) {
        $this->currencyId = $currencyId;
    }

    public function setUangHotel($uangHotel) {
        $this->uangHotel = $uangHotel;
    }

    public function setUangMakanPP1m($uangMakanPP1m) {
        $this->uangMakanPP1m = $uangMakanPP1m;
    }

    public function setUangMakanPPXm($uangMakanPPXm) {
        $this->uangMakanPPXm = $uangMakanPPXm;
    }

    public function setUangMakanPU1m($uangMakanPU1m) {
        $this->uangMakanPU1m = $uangMakanPU1m;
    }

    public function setUangMakanPUXm($uangMakanPUXm) {
        $this->uangMakanPUXm = $uangMakanPUXm;
    }

    public function setUangSakuPP1m($uangSakuPP1m) {
        $this->uangSakuPP1m = $uangSakuPP1m;
    }

    public function setUangSakuPPXm($uangSakuPPXm) {
        $this->uangSakuPPXm = $uangSakuPPXm;
    }

    public function setUangSakuPU1m($uangSakuPU1m) {
        $this->uangSakuPU1m = $uangSakuPU1m;
    }

    public function setUangSakuPUXm($uangSakuPUXm) {
        $this->uangSakuPUXm = $uangSakuPUXm;
    }
    
    public function getStandartHotel() {
        return $this->standartHotel;
    }

    public function setStandartHotel($standartHotel) {
        $this->standartHotel = $standartHotel;
    }
    
    public function getCurrency() {
        if(!$this->currency){
            $this->currency = new Hrd_Models_Master_General_Currency();
        }
        return $this->currency;
    }

    public function setCurrency(Hrd_Models_Master_General_Currency $currency) {
        $this->currency = $currency;
    }

    
    
        
    
    public function fillData($data) {
        $this->setArrayTable($data);
    }

   

    public function grouped() {
        return array($this->getCurrency());
    }

    public function getArray() {
        return $this->getArrayTable();
    }

//put your code here
}
