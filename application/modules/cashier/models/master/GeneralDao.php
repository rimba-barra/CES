<?php

/**
 * Description of BlockDao
 *
 * @author MIS
 */
class Cashier_Models_Master_GeneralDao extends Cashier_Box_Models_App_AbDao {
    
    /*@getByCPP
     * @params Cashier_Models_Master_BlockTran
     */
    public function getAllCity(Cashier_Box_Models_App_HasilRequestRead $requestRead,Cashier_Models_Master_City $city){
        $hasil = array();
        
        $hasil = $this->dbTable->SPExecute('sp_city_read');
    
        return $hasil;
    }
    
    public function getAllSourceMoney(){
        $hasil = array();
        
        $hasil = $this->dbTable->SPExecute('sp_sourcemoneyb_read');
    
        return $hasil;
    }
    
    public function getAllDepartment(Cashier_Box_Models_App_HasilRequestRead $requestRead){
        $hasil = array();
        
        $hasil = $this->dbTable->SPExecute('sp_department_read',$requestRead->getPage(),$requestRead->getLimit());
    
        return $hasil;
    }
    
    public function getAllDepartmentWOPL(Cashier_Box_Models_App_HasilRequestRead $requestRead, $session){
        $hasil = array();
        
        //$hasil = $this->dbTable->SPExecute('sp_department_read',1,99999);

        if($session!==null){
            $hasil = $this->dbTable->SPExecute('sp_departmentpt_read',1,99999, $session->getProject()->getId(), $session->getPt()->getId());
        }else{
            $hasil = $this->dbTable->SPExecute('sp_department_read',1,99999);
        }
        
    
        return $hasil;
    }
    
    public function getAllExpenseType(Cashier_Box_Models_App_HasilRequestRead $requestRead){
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
    
    public function getAllPurpose(Cashier_Box_Models_App_HasilRequestRead $requestRead,  Cashier_Models_Master_Purpose $purpose){
       $hasil = array();
        
       
        $hasil = $this->dbTable->SPExecute('sp_purpose2_read',$purpose->getCode(),$purpose->getName(),
                $purpose->getDescription(),$purpose->getProject()->getId(),$purpose->getPt()->getId(),
                $requestRead->getPage(),$requestRead->getLimit());
      
        return $hasil; 
    }
    
    public function getAllPurposeWOR(Cashier_Models_Master_Purpose $purpose){
       $hasil = array();
        
       
        $hasil = $this->dbTable->SPExecute('sp_purposeb_read',$purpose->getProject()->getId(),$purpose->getPt()->getId(),1,100000
                );
      
        return $hasil; 
    }
    
    public function getAllPosition(Cashier_Models_Master_Position $position){
       $hasil = array();
        
       
        $hasil = $this->dbTable->SPExecute('sp_position_read',$position->getProject()->getId(),$position->getPt()->getId(),$position->getCluster()->getId());
      
        return $hasil; 
    }
    
    public function getAllSide(Cashier_Models_Master_Side $side){
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

    public function getAllTanahcode(){
       $hasil = array();
        
       
       $hasil = $this->dbTable->SPExecute('sp_pt_read');
      
        return $hasil; 
    }
    
    public function getPopupJatuhTempo(Cashier_Box_Models_App_HasilRequestRead $requestRead,$projectId,$ptId,$clusterId,$blockId,$customerName,$unitNumber,$todayPlus) {
        $row = 0;

        $row = $this->dbTable->SPExecute('sp_popupjatuhtempo_read',$clusterId,$blockId,$customerName,
                $unitNumber,$todayPlus,$projectId,$ptId,$requestRead->getPage(),$requestRead->getLimit());
        
        
        
        return $row;
    }
    //aded by semy 22-6-2017
    public function getPopupJatuhTempoPage(
            Cashier_Box_Models_App_HasilRequestRead $requestRead,
            $projectId,
            $ptId,
            $clusterId,
            $blockId,
            $customerName,
            $unitNumber,
            $todayPlus,
            $page,
            $limit,
            $scheduletypeId) {
        $row = 0;
        $row = $this->dbTable->SPExecute('sp_popupjatuhtempob_read',$clusterId,$blockId,$customerName,
                $unitNumber,$todayPlus,$projectId,$ptId,$page,$limit,$scheduletypeId);
        return $row;
    }
    public function getPopupJatuhTempoAll(
            Cashier_Box_Models_App_HasilRequestRead $requestRead,
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
    
    //added by semy 04-07-2017
    public function getPopupJatuhTempoFilter(Cashier_Box_Models_App_HasilRequestRead $requestRead,$projectId,$ptId,$clusterId,$blockId,$customerName,$unitNumber,$todayPlus,$scheduletypeId) {
        $row = 0;

        $row = $this->dbTable->SPExecute('sp_popupjatuhtempofilter_read',$clusterId,$blockId,$customerName,
                $unitNumber,$todayPlus,$projectId,$ptId,$requestRead->getPage(),$requestRead->getLimit(),$scheduletypeId);
        
        
        
        return $row;
    }
    //ended semy
    
    public function getPopupNamaSementara(Cashier_Box_Models_App_HasilRequestRead $requestRead,$projectId,$ptId,$clusterId,$customerName,$unitNumber) {
        $row = 0;

        $row = $this->dbTable->SPExecute('sp_popupnamasementara_read',$clusterId,$customerName,
                $unitNumber,$projectId,$ptId,$requestRead->getPage(),$requestRead->getLimit());
        
        return $row;
    }
    
    public function getPopubelumajb(Cashier_Box_Models_App_HasilRequestRead $requestRead,$projectId,$ptId,$customerName,$unitNumber) {
        $row = 0;

        $row = $this->dbTable->SPExecute('sp_popupbelumajb_read',
                $projectId,$ptId,$customerName,$unitNumber,$requestRead->getPage(),$requestRead->getLimit());
        
        return $row;
    }
    
    public function getPopupbangunansiapst(Cashier_Box_Models_App_HasilRequestRead $requestRead,$projectId,$ptId,$customerName,$unitNumber,$productCategoryCode) {
        $row = 0;

        $row = $this->dbTable->SPExecute('sp_popupbangunansiapst_read',
                $customerName,$unitNumber,$projectId,$ptId,$productCategoryCode,$requestRead->getPage(),$requestRead->getLimit());
        
        return $row;
    }
    
    public function getSempatMonitoring(Cashier_Box_Models_App_HasilRequestRead $requestRead,$projectId,$ptId,$customerName,$unitNumber) {
        $row = 0;

        $row = $this->dbTable->SPExecute('sp_sempatmonitoring_read',
                $customerName,$unitNumber,$projectId,$ptId,$requestRead->getPage(),$requestRead->getLimit());
        return $row;
    }
    
    public function getParameterSPPJB(Cashier_Box_Models_App_HasilRequestRead $requestRead,$projectId,$ptId,Cashier_Models_Legal_ParameterSPPJB $paramSppjb) {
        $row = 0;

        $row = $this->dbTable->SPExecute('sp_sppjbparameter_read',$projectId,$ptId,$requestRead->getPage(),$requestRead->getLimit(),$paramSppjb->getId());
        return $row;
    }
    
    public function getParameterSPPJBb(Cashier_Box_Models_App_HasilRequestRead $requestRead,$projectId,$ptId,Cashier_Models_Legal_ParameterSPPJB $paramSppjb) {
        $row = 0;

        $row = $this->dbTable->SPExecute('sp_sppjbparameter_read',$projectId,$ptId,$requestRead->getPage(),$requestRead->getLimit(),$paramSppjb->getId(),$paramSppjb->getName01());
        return $row;
    }
    
   
    //added by semy 3-07-2017
    public function getPopupUnitSpk(Cashier_Box_Models_App_HasilRequestRead 
             $requestRead,
             $projectId,
             $ptId,
             $customerName,
             $unitNumber) {
        $row = 0;

        $row = $this->dbTable->SPExecute('sp_popupunitspk_read',
                $projectId,
                $ptId,
                $customerName,
                $unitNumber,
                $requestRead->getPage(),
                $requestRead->getLimit());
        
        return $row;
    }
    
    public function getPopupUnitSpkAll(Cashier_Box_Models_App_HasilRequestRead 
             $requestRead,
             $projectId,
             $ptId,
             $customerName,
             $unitNumber) {
        $row = 0;

        $row = $this->dbTable->SPExecute('sp_popupunitspkall_read',
                $projectId,
                $ptId,
                $customerName,
                $unitNumber);
        
        return $row;
    }
    
     public function getPopupUnitSpkPage(Cashier_Box_Models_App_HasilRequestRead 
             $requestRead,
             $projectId,
             $ptId,
             $customerName,
             $unitNumber,
             $pages) {
        $row = 0;

        $row = $this->dbTable->SPExecute('sp_popupunitspkpage_read',
                $projectId,
                $ptId,
                $customerName,
                $unitNumber,
                $pages);
        
        return $row;
    }
    //semy

    public function getPopupAkadKredit(Cashier_Box_Models_App_HasilRequestRead 
             $requestRead,
             $projectId,
             $ptId,
             $customerName,
             $unitNumber) {
        $row = 0;

        $row = $this->dbTable->SPExecute('sp_popupakadkredit_read',
                $projectId,
                $ptId,
                $customerName,
                $unitNumber,
                $requestRead->getPage(),
                $requestRead->getLimit());
        
        return $row;
    }
    

    /*@ids => list user id , example => 1~2~3 */
    public function getUsersInfo($ids) {
        $row = 0;

        $row = $this->dbTable->SPExecute('sp_getuserinfo_read',$ids);
        return $row;
    }
    
    public function getAllDownline($projectId,$ptId) {
        $hasil = 0;

        $hasil = $this->dbTable->SPExecute('sp_downline_read',0,'','',0,99999,$projectId,$ptId);
        return $hasil;
    }
    
    public function getKeuanganModel2($projectId,$ptId,$date) {
        $hasil = 0;

        $hasil = $this->dbTable->SPExecute('sp_keuanganmodel2_read',$projectId,$ptId,$date);
        return $hasil;
    }
    
    public function getKeuanganModel2Escrow($projectId,$ptId,$date) {
        $hasil = 0;

        $hasil = $this->dbTable->SPExecute('sp_keuanganmodel2escrow_read',$projectId,$ptId,$date);
        return $hasil;
    }
    
    public function getScheduleMonitor($projectId,$ptId) {
        $hasil = 0;

        $hasil = $this->dbTable->SPExecute('sp_schedulemonitor_read',$projectId,$ptId);
        return $hasil;
    }
    
    public function getScheduleMonitorPayment($purchaseletterId) {
        $hasil = 0;
        
   

        $hasil = $this->dbTable->SPExecute('sp_schedulemonitorpayment_read',$purchaseletterId,1,9999);
        return $hasil;
    }
    
    public function getPt($ptId){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_app_pt',$ptId);
        return $hasil; 
    }
    public function getProject($projectId){
       $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_app_project',$projectId);
        return $hasil;  
    }

    
}

?>
