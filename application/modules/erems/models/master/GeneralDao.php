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
    public function getAllCityDropdown(){
        $res = $this->dbTable->SPExecute('sp_city_read_dropdown');
        $hasil = array();
        if(isset($res[0]) && count($res[0])){
            $hasil = $res[0];
        }
    
        return $hasil;
    }

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
    
    public function getAllSourceMoneyDropdown(){
        $res = $this->dbTable->SPExecute('sp_sourcemoneyb_read_dropdown');
        $hasil = array();
        if(isset($res[0]) && count($res[0])){
            $hasil = $res[0];
        }
    
        return $hasil;
    }
    
    public function getAllDepartment(Erems_Box_Models_App_HasilRequestRead $requestRead){
        $hasil = array();
        
        $hasil = $this->dbTable->SPExecute('sp_department_read',$requestRead->getPage(),$requestRead->getLimit());
    
        return $hasil;
    }
    
    public function getAllDepartmentWOPL(Erems_Box_Models_App_HasilRequestRead $requestRead, $session){
        $hasil = array();
        
        //$hasil = $this->dbTable->SPExecute('sp_department_read',1,99999);

        if($session!==null){
            $hasil = $this->dbTable->SPExecute('sp_departmentpt_read',1,99999, $session->getProject()->getId(), $session->getPt()->getId());
        }else{
            $hasil = $this->dbTable->SPExecute('sp_department_read',1,99999);
        }
        
    
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
        
        $hasil = $this->dbTable->SPExecute('sp_purposeb_read',$purpose->getProject()->getId(),$purpose->getPt()->getId(),1,100000);
        // $hasil = $this->dbTable->SPExecute('sp_purposebuy_read',1,100000);
      
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
        
       $session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
       
       $hasil = $this->dbTable->SPExecute('sp_pt_read', $session->project);
      
        return $hasil; 
    }
    public function getAllPtCashier(Erems_Box_Models_App_HasilRequestRead $requestRead, $session){
       $hasil = array();
    
       $hasil = $this->dbTable->SPExecute('sp_ptcashier_read',$session->getUser()->getId());

        return $hasil; 
    }

    public function getAllTanahcode(){
       $hasil = array();
        
       
       $hasil = $this->dbTable->SPExecute('sp_pt_read');
      
        return $hasil; 
    }

    public function getAllTanahcode2(){
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
            $limit,
            $scheduletypeId) {
        $row = 0;
        $row = $this->dbTable->SPExecute('sp_popupjatuhtempob_read',$clusterId,$blockId,$customerName,
                $unitNumber,$todayPlus,$projectId,$ptId,$page,$limit,$scheduletypeId);
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
    
    //added by semy 04-07-2017
    public function getPopupJatuhTempoFilter(Erems_Box_Models_App_HasilRequestRead $requestRead,$projectId,$ptId,$clusterId,$blockId,$customerName,$unitNumber,$todayPlus,$scheduletypeId) {
        $row = 0;

        $row = $this->dbTable->SPExecute('sp_popupjatuhtempofilter_read',$clusterId,$blockId,$customerName,
                $unitNumber,$todayPlus,$projectId,$ptId,$requestRead->getPage(),$requestRead->getLimit(),$scheduletypeId);

        return $row;
    }
    //ended semy
    
    public function getPopupNamaSementara(Erems_Box_Models_App_HasilRequestRead $requestRead,$projectId,$ptId,$clusterId,$customerName,$unitNumber) {
        $row = 0;

        $row = $this->dbTable->SPExecute('sp_popupnamasementara_read',$clusterId,$customerName,
                $unitNumber,$projectId,$ptId,$requestRead->getPage(),$requestRead->getLimit());
        
        return $row;
    }
    
    //added by rico 12082021
    public function getPopupNamaSementaraExport($projectId,$ptId,$clusterId,$customerName,$unitNumber, $page, $limit) {
        $row = 0;

        $row = $this->dbTable->SPExecute('sp_popupnamasementara_read',$clusterId,$customerName,
                $unitNumber,$projectId,$ptId, $page, $limit);
        
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
    
    public function getPopupbangunansiapstExport($projectId,$ptId,$customerName,$unitNumber,$productCategoryCode, $page, $limit) {
        $row = 0;

        $row = $this->dbTable->SPExecute('sp_popupbangunansiapst_read',
                $customerName,$unitNumber,$projectId,$ptId,$productCategoryCode, $page, $limit);
        
        return $row;
    }
    
    public function getSempatMonitoring(Erems_Box_Models_App_HasilRequestRead $requestRead,$projectId,$ptId,$customerName,$unitNumber) {
        $row = 0;

        $row = $this->dbTable->SPExecute('sp_sempatmonitoring_read',
                $customerName,$unitNumber,$projectId,$ptId,$requestRead->getPage(),$requestRead->getLimit());
        return $row;
    }
    
    public function getSempatMonitoringExport($projectId,$ptId,$customerName,$unitNumber, $page, $limit) {
        $row = 0;

        $row = $this->dbTable->SPExecute('sp_sempatmonitoring_read',
                $customerName,$unitNumber,$projectId,$ptId,$page,$limit);
        return $row;
    }
    
    public function getParameterSPPJB(Erems_Box_Models_App_HasilRequestRead $requestRead,$projectId,$ptId,Erems_Models_Legal_ParameterSPPJB $paramSppjb) {
        $row = 0;

        $row = $this->dbTable->SPExecute('sp_sppjbparameter_read',$projectId,$ptId,$requestRead->getPage(),$requestRead->getLimit(),$paramSppjb->getId());
        return $row;
    }
    
    public function getParameterSPPJBb(Erems_Box_Models_App_HasilRequestRead $requestRead,$projectId,$ptId,Erems_Models_Legal_ParameterSPPJB $paramSppjb) {
        $row = 0;

        $row = $this->dbTable->SPExecute('sp_sppjbparameter_read',$projectId,$ptId,$requestRead->getPage(),$requestRead->getLimit(),$paramSppjb->getId(),$paramSppjb->getName01());
        return $row;
    }
    
   
    //added by semy 3-07-2017
    public function getPopupUnitSpk(Erems_Box_Models_App_HasilRequestRead 
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
    
    public function getPopupUnitSpkAll(Erems_Box_Models_App_HasilRequestRead 
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
    
     public function getPopupUnitSpkPage(Erems_Box_Models_App_HasilRequestRead 
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

    public function getPopupAkadKredit(Erems_Box_Models_App_HasilRequestRead 
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
    
    public function getAllDownlineDropdown($projectId,$ptId) {
        $res = $this->dbTable->SPExecute('sp_downline_read_dropdown',$projectId,$ptId);
        $hasil = array();
        if(count($res[0])){
            $hasil = $res[0];
        }
        return $hasil;
    }
    
    public function getKeuanganModel2($projectId,$ptId,$date, $status) {
        $hasil = 0;

        $hasil = $this->dbTable->SPExecute('sp_keuanganmodel2_read',$projectId,$ptId,$date, $status);
        return $hasil;
    }
    
    public function getKeuanganModel2Escrow($projectId,$ptId,$date, $status) {
        $hasil = 0;

        $hasil = $this->dbTable->SPExecute('sp_keuanganmodel2escrow_read',$projectId,$ptId,$date, $status);
        return $hasil;
    }
    
    public function getScheduleMonitor($projectId,$ptId,$page,$limit,$purchaseNo,$customer,$unit,$selisihUnder,$priceType=0) {
        $hasil = 0;

        $hasil = $this->dbTable->SPExecute('sp_schedulemonitor_read',$projectId,$ptId,$page,$limit,$purchaseNo,$customer,$unit,$selisihUnder,$priceType);
       
      
        
        return $hasil;
    }
    
    public function getScheduleMonitorPayment($purchaseletterId) {
        $hasil = 0;
        
   

        $hasil = $this->dbTable->SPExecute('sp_schedulemonitorpayment_read',$purchaseletterId,1,9999);
        return $hasil;
    }
    
    public function deletePaymentScheduleMonitor($paymentId,$userId) {
        $hasil = 0;

        $hasil = $this->dbTable->SPUpdate('sp_schedulemonitorpaydelete_update',$userId,$paymentId);
       
        
        return $hasil;
    }
    
    public function updatescheduleScheduleMonitor($userId,$ids,$remainings, $r_denda, $duedate) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_schedulemonitorschedit_update', $userId, $ids, $remainings, $r_denda, $duedate);
        return $hasil;
    }
    
    
    public function secGetAction($groupId,$appsId,$controllerName) {
        $hasil = 0;

        $hasil = $this->dbTable->SPExecute('sp_secaction_read',$groupId,$appsId,$controllerName);
       
        
        return $hasil;
    }
    
    public function saveFlashWebToken($userId,$unitId,$token,$durasi) {
        $hasil = 0;

        $hasil = $this->dbTable->SPExecute('sp_flashwebtoken_create',$userId,$unitId,$token,$durasi);
       
        
        return $hasil;
    }
    
    public function getFlashWebToken($unitId) {
        $hasil = 0;

        $hasil = $this->dbTable->SPExecute('sp_flashwebtoken_read',$unitId);
       
        
        return $hasil;
    }
    
    public function getGlobalParameterSolo($projectId,$ptId,$paramName) {
        $hasil = 0;

        $hasil = $this->dbTable->SPExecute('sp_globalparametersolo_read',$projectId,$ptId,$paramName);
       
        
        return $hasil;
    }
    
    public function getGlobalParameterFilter($projectId,$ptId,$paramName) {
        $hasil = 0;

        $hasil = $this->dbTable->SPExecute('sp_globalparameterfilter_read',$projectId,$ptId,$paramName);
       
        
        return $hasil;
    }

    public function getAllPurposeBuyWOR(Erems_Models_Master_PurposeBuy $purposebuy){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_purposebuy_read',1,100000);
      
        return $hasil; 
    }
    
    public function getProjectDetail($project_id){
        $hasil = $this->dbTable->SPExecute('sp_projectdetail_read', $project_id);
        $result = $hasil[0][0];
        return $result;
    }

    public function getAllEremsDepartment(){
        $hasil = array();

        $hasil = $this->dbTable->SPExecute('sp_alldepartment_read', 1,999999 );

        return $hasil;
    }   
    public function getPopupHoldTeknik(Erems_Box_Models_App_HasilRequestRead $requestRead, $projectId, $ptId, $unitNumber) {
        $row = 0;

        $row = $this->dbTable->SPExecute('sp_popupholdteknik_read',
                $projectId,
                $ptId,
                $unitNumber,
                $requestRead->getPage(),
                $requestRead->getLimit());
        
        return $row;
    } 
    
    public function getPopupHoldTeknikAll(Erems_Box_Models_App_HasilRequestRead 
             $requestRead,
             $projectId,
             $ptId,
             $unitNumber) {
        $row = 0;

        $row = $this->dbTable->SPExecute('sp_popupholdteknikall_read',
                $projectId,
                $ptId,
                $unitNumber);
        
        return $row;
    }
    
     public function getPopupHoldTeknikPage(Erems_Box_Models_App_HasilRequestRead 
             $requestRead,
             $projectId,
             $ptId,
             $unitNumber,
             $pages) {
        $row = 0;

        $row = $this->dbTable->SPExecute('sp_popupholdteknikpage_read',
                $projectId,
                $ptId,
                $unitNumber,
                $pages);
        
        return $row;
    }

    public function getAllOrientasi(){
       $hasil = array();
        
       
       $hasil = $this->dbTable->SPExecute('sp_orientasi_read');
      
        return $hasil; 
    }
}

?>
