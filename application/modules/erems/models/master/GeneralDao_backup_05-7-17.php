<?php

/**
 * Description of BlockDao
 *
 * @author MIS
 */
class Erems_Models_Master_GeneralDao extends Erems_Box_Models_App_AbDao {
    
    /*@getByCPP
     * @params Erems_Models_Master_BlockTran
     */
    public function getAllCity(Erems_Box_Models_App_HasilRequestRead $requestRead,Erems_Models_Master_City $city){
        $hasil = array();
        
        $hasil = $this->dbTable->SPExecute('sp_city_read');
    
        return $hasil;
    }
    
    public function getAllSourceMoney(){
        $hasil = array();
        
        $hasil = $this->dbTable->SPExecute('sp_sourcemoneyb_read');
    
        return $hasil;
    }
    
    public function getAllDepartment(Erems_Box_Models_App_HasilRequestRead $requestRead){
        $hasil = array();
        
        $hasil = $this->dbTable->SPExecute('sp_department_read',$requestRead->getPage(),$requestRead->getLimit());
    
        return $hasil;
    }
    
    public function getAllDepartmentWOPL(Erems_Box_Models_App_HasilRequestRead $requestRead){
        $hasil = array();
        
        $hasil = $this->dbTable->SPExecute('sp_department_read',1,99999);
    
        return $hasil;
    }
    
    public function getAllExpenseType(Erems_Box_Models_App_HasilRequestRead $requestRead){
        $hasil = array();
        
        $hasil = $this->dbTable->SPExecute('sp_expensetype_read',$requestRead->getPage(),$requestRead->getLimit());
    
        return $hasil;
    }
    
    public function getAllCityWOR(){
        $hasil = array();
        
        $hasil = $this->dbTable->SPExecute('sp_city_read');
    
        return $hasil;
    }
    
    public function getAllCountryWOR(){
        $hasil = array();
        
        $hasil = $this->dbTable->SPExecute('sp_country_read');
    
        return $hasil;
    }
    
    public function getAllPurpose(Erems_Box_Models_App_HasilRequestRead $requestRead,  Erems_Models_Master_Purpose $purpose){
       $hasil = array();
        
       
        $hasil = $this->dbTable->SPExecute('sp_purpose2_read',$purpose->getCode(),$purpose->getName(),
                $purpose->getDescription(),$purpose->getProject()->getId(),$purpose->getPt()->getId(),
                $requestRead->getPage(),$requestRead->getLimit());
      
        return $hasil; 
    }
    
    public function getAllPurposeWOR(Erems_Models_Master_Purpose $purpose){
       $hasil = array();
        
       
        $hasil = $this->dbTable->SPExecute('sp_purposeb_read',$purpose->getProject()->getId(),$purpose->getPt()->getId(),1,100000
                );
      
        return $hasil; 
    }
    
    public function getAllPosition(Erems_Models_Master_Position $position){
       $hasil = array();
        
       
        $hasil = $this->dbTable->SPExecute('sp_position_read',$position->getProject()->getId(),$position->getPt()->getId(),$position->getCluster()->getId());
      
        return $hasil; 
    }
    
    public function getAllSide(Erems_Models_Master_Side $side){
       $hasil = array();
        
       
        $hasil = $this->dbTable->SPExecute('sp_side_read',$side->getProject()->getId(),$side->getPt()->getId());
      
        return $hasil; 
    }
    
    public function getAllScheduleType(){
       $hasil = array();
        
       
       $hasil = $this->dbTable->SPExecute('sp_scheduletypeb_read');
      
        return $hasil; 
    }
    
    public function getAllPt(){
       $hasil = array();
        
       
       $hasil = $this->dbTable->SPExecute('sp_pt_read');
      
        return $hasil; 
    }
    
    public function getPopupJatuhTempo(Erems_Box_Models_App_HasilRequestRead $requestRead,$projectId,$ptId,$clusterId,$blockId,$customerName,$unitNumber,$todayPlus) {
        $row = 0;

        $row = $this->dbTable->SPExecute('sp_popupjatuhtempo_read',$clusterId,$blockId,$customerName,
                $unitNumber,$todayPlus,$projectId,$ptId,$requestRead->getPage(),$requestRead->getLimit());
        
        
        
        return $row;
    }
    //aded by semy 22-6-2017
    public function getPopupJatuhTempoPage(
            Erems_Box_Models_App_HasilRequestRead $requestRead,
            $projectId,
            $ptId,
            $clusterId,
            $blockId,
            $customerName,
            $unitNumber,
            $todayPlus,
            $page,
            $limit) {
        $row = 0;
        $row = $this->dbTable->SPExecute('sp_popupjatuhtempob_read',$clusterId,$blockId,$customerName,
                $unitNumber,$todayPlus,$projectId,$ptId,$page,$limit);
        return $row;
    }
    public function getPopupJatuhTempoAll(
            Erems_Box_Models_App_HasilRequestRead $requestRead,
            $projectId,
            $ptId,
            $clusterId,
            $blockId,
            $customerName,
            $unitNumber,
            $todayPlus) {
        $row = 0;
        $row = $this->dbTable->SPExecute('sp_popupjatuhtempoall_read',$clusterId,$blockId,$customerName,
                $unitNumber,$todayPlus,$projectId,$ptId);
        return $row;
    }
    //ended
    
    public function getPopupNamaSementara(Erems_Box_Models_App_HasilRequestRead $requestRead,$projectId,$ptId,$clusterId,$customerName,$unitNumber) {
        $row = 0;

        $row = $this->dbTable->SPExecute('sp_popupnamasementara_read',$clusterId,$customerName,
                $unitNumber,$projectId,$ptId,$requestRead->getPage(),$requestRead->getLimit());
        
        return $row;
    }
    
    public function getPopubelumajb(Erems_Box_Models_App_HasilRequestRead $requestRead,$projectId,$ptId,$customerName,$unitNumber) {
        $row = 0;

        $row = $this->dbTable->SPExecute('sp_popupbelumajb_read',
                $projectId,$ptId,$customerName,$unitNumber,$requestRead->getPage(),$requestRead->getLimit());
        
        return $row;
    }
    
    public function getPopupbangunansiapst(Erems_Box_Models_App_HasilRequestRead $requestRead,$projectId,$ptId,$customerName,$unitNumber,$productCategoryCode) {
        $row = 0;

        $row = $this->dbTable->SPExecute('sp_popupbangunansiapst_read',
                $customerName,$unitNumber,$projectId,$ptId,$productCategoryCode,$requestRead->getPage(),$requestRead->getLimit());
        
        return $row;
    }
    
    public function getSempatMonitoring(Erems_Box_Models_App_HasilRequestRead $requestRead,$projectId,$ptId,$customerName,$unitNumber) {
        $row = 0;

        $row = $this->dbTable->SPExecute('sp_sempatmonitoring_read',
                $customerName,$unitNumber,$projectId,$ptId,$requestRead->getPage(),$requestRead->getLimit());
        return $row;
    }
    
    public function getParameterSPPJB(Erems_Box_Models_App_HasilRequestRead $requestRead,$projectId,$ptId,Erems_Models_Legal_ParameterSPPJB $paramSppjb) {
        $row = 0;

        $row = $this->dbTable->SPExecute('sp_sppjbparameter_read',$projectId,$ptId,$requestRead->getPage(),$requestRead->getLimit(),$paramSppjb->getId());
        return $row;
    }
    
    
}

?>
