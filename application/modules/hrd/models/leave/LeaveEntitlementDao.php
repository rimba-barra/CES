<?php

/**
 * Description of LeaveEntitlementDao
 *
 * @author MIS
 */
class Hrd_Models_Leave_LeaveEntitlementDao  extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {
    public function save(Hrd_Models_Leave_LeaveEntitlement $d) {
        $hasil = 0;
     

        $hasil = $this->dbTable->SPUpdate('sp_leaveentitlements_create',$d->getAddBy(),$d->getProject()->getId(),$d->getPt()->getId(),$d->getEmployee()->getId(),$d->getRest(),$d->getAmount(),
                $d->getLeavegroup(),$d->getStartUse(),$d->getEndUse(),$d->getIsLeaveEnd(),
                $d->getExtensionDate(),$d->getExtensionNote(),$d->getExpiredDate());      
   
        return $hasil;
    }
    
    
    public function bindHakCuti(Box_Models_App_Decan $decan,  Box_Models_App_Decan $decanCuti,  Box_Models_App_Session $ses) {
        $hasil = 0;
     
        $result = $decan->getDCResult();
        
        $rCuti = $decanCuti->getDCResult();

        $hasil = $this->dbTable->SPUpdate('sp_leaveentitlementsbind_update',$ses->getUser()->getId(),
                $result["leaveentitlements_id"],
                $result["rest"],
                $rCuti["leave_id"],
                $rCuti["leave_bind"]);      
       
        return $hasil;
    }
    
    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Leave_LeaveEntitlement $d){
        $hasil = 0;
   
        $hasil = $this->dbTable->SPExecute('sp_leaveentitlements_read', $d->getProject()->getId(),$d->getPt()->getId(),$r->getPage(), $r->getLimit());
        return $hasil;
    }
    
    
    // added by wulan sari 20190702
    // untuk check shift cuti, jika cuti di hari libur maka cuti tidak terbentuk
    public function getShift($date, Hrd_Models_Leave_Leave $d){
        $hasil = 0;

        $hasil = $this->dbTable->SPExecute('sp_shift_employee', $d->getProject()->getId(),$d->getPt()->getId(),$d->getEmployee()->getId(), $date);
        //var_dump($this->dbTable); exit;
        return $hasil;
    }
    
    
    public function getAllWOPL(Hrd_Models_Leave_LeaveEntitlement $d){
        $hasil = 0;
   
        $hasil = $this->dbTable->SPExecute('sp_leaveentitlements_read', $d->getProject()->getId(),$d->getPt()->getId(),1,9999);
        return $hasil;
    }
    
    public function getAllByEmployee(Box_Models_App_HasilRequestRead $r, Hrd_Models_Leave_LeaveEntitlement $d){
        $hasil = 0;
   
        $hasil = $this->dbTable->SPExecute('sp_leaveentitlements_read', $d->getProject()->getId(),$d->getPt()->getId(),$r->getPage(), $r->getLimit(),$d->getEmployee()->getId());
        return $hasil;
    }
    
    /* tanpa PAGE DAN LIMIT*/
    public function getAllByEmployeeWOPL(Hrd_Models_Leave_LeaveEntitlement $d){
        $hasil = 0;
   
        $hasil = $this->dbTable->SPExecute('sp_leaveentitlements_read', $d->getProject()->getId(),$d->getPt()->getId(),1,9999,$d->getEmployee()->getId(),0,$d->getLeavegroup(),$d->getIsLeaveEnd());
    
        
        return $hasil;
    }

    //added by michael 2022-06-08 karena cuti bersama dari Bu Shirley mau supaya bisa dipotong cuti tahunan/cuti besar, soalnya dulu cuma cuti tahunan aja
    public function getAllByEmployeeWOPL_cutibersama(Hrd_Models_Leave_LeaveEntitlement $d){
        $hasil = 0;
   
        $hasil = $this->dbTable->SPExecute('sp_leaveentitlements_cutibersama_read', $d->getProject()->getId(),$d->getPt()->getId(),1,9999,$d->getEmployee()->getId(),0,$d->getLeavegroup(),$d->getIsLeaveEnd());
    
        
        return $hasil;
    }
    
    
    
    public function getLeaveEntDetail(Hrd_Models_Leave_LeaveEntitlement $d,$session){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_leaveentitlements_read',$session->getProject()->getId(),$session->getPt()->getId(),1,1,0,$d->getId());
        return $hasil;
    }
    
    public function getJatahCutiTahunTerakhir($ids,$session){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_leaveentitlementstahunterakhirb_read',$session->getProject()->getId(),$session->getPt()->getId(),$ids);
       
        return $hasil;
    }
    
    public function getJatahCutiTahunTerlamaYangAktif($ids,$session){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_leaveentitlementstahunterlamayaktif_read',$session->getProject()->getId(),$session->getPt()->getId(),$ids);
       
       // var_dump($this->dbTable);
        
        return $hasil;
    }
    
    public function getDetail(Hrd_Models_Leave_LeaveEntitlement $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_leavedetail_read',$d->getId());
        return $hasil;
    }

    public function update(Hrd_Models_Leave_LeaveEntitlement $em) {
        $hasil = 0;
        if ($em->getId() == 0) {
            return $hasil;
        }
        
        $hasil = $this->dbTable->SPUpdate('sp_leaveentitlements_update', $em->getAddBy(), $em->getId(),
                $em->getRest(),$em->getAmount(),$em->getIsLeaveEnd(),$em->getExtensionDate(),$em->getExtensionNote(),
                $em->getExpiredDate());
        return $hasil;
    }
    
    public function updateHabisCuti(Box_Models_App_Decan $decan,  Box_Models_App_Session $ses,Box_Models_App_Decan $decanCE) {
        $hasil = 0;
        
        $dcResult = $decan->getDCResult();
        
        $dcResultCE = $decanCE->getDCResult();
        
        $hasil = $this->dbTable->SPUpdate('sp_leaveentitlementshabiscuti_update',$ses->getUser()->getId(),$dcResult["leaveentitlements_id"],
                    $dcResult["rest"],
                    $ses->getProject()->getId(),$ses->getPt()->getId(),
                    $dcResultCE["start_date"],
                    $dcResultCE["end_date"],
                    $dcResultCE["absenttype_absenttype_id"],
                    $dcResultCE["employee_employee_id"],
                    $dcResultCE["note"],
                $dcResultCE["duration"],
                $dcResultCE["is_kadaluarsa"]
                    );
        return $hasil;
    }
    
    public function updateAllAndSisaCutiKaryawan( Box_Models_App_Session $ses,$sisaCutiDecan,$jatahCutiDecan) {
        $hasil = 0;
        
        //$dcResult = Box_Tools::getCleanDCResult($jatahCutiDecan,"leaveentitlement");
        
        
        
       
        
        $hasil = $this->dbTable->SPUpdate('sp_leaveentitlementsall_update',
                $ses->getUser()->getId(),
                $ses->getProject()->getId(),
                $ses->getPt()->getId(),
                $sisaCutiDecan["employee_id"],
                $sisaCutiDecan["sisa_cuti"],
                $jatahCutiDecan["leaveentitlements_id"],
                $jatahCutiDecan["rest"],
                $jatahCutiDecan["start_use"],
                $jatahCutiDecan["amount"],
                $jatahCutiDecan["employee_employee_id"]
                );
        
        
        
        
  
        
        return $hasil;
    }
    
    public function getListEmployee(Hrd_Models_Leave_LeaveEntitlement $d,$hireDate,$year,$leaveGroup){
        $hasil = array();
   
        $hasil = $this->dbTable->SPExecute('sp_leavegiving_employeelist_read', $d->getProject()->getId(),$d->getPt()->getId(),$hireDate,$year,$leaveGroup);
        
    
        
        if(key_exists(0,$hasil)){
            return $hasil[0];
        }
        return $hasil;
    }
    
    
    public function getListEmployee2($project,$pt) {
        $hasil = 0;

        $hasil = $this->dbTable->SPExecute('sp_employeehakcuti_read',$project,$pt, 1,9999);

        return $hasil;
    }
    
    /*
     * @params array $dcResult 
     */
    
    public function generateYearly(Hrd_Models_Leave_LeaveEntitlement $d,$dcResult,$dcResultLe) {
        $hasil = 0;
     
        if(count($dcResultLe)==0){
            $dcResultLe["leaveentitlements_id"] = "";
            $dcResultLe["rest"] = "";
        }
       
        $hasil = $this->dbTable->SPUpdate('sp_leaveentitlementsyearly_create',$d->getAddBy(),$d->getProject()->getId(),$d->getPt()->getId(),
                $dcResult["employee_employee_id"],$dcResult["amount"],$dcResult["rest"],$d->getLeavegroup(),$d->getStartUse(),
                $d->getExtensionDate(),$d->getExpiredDate(),$dcResultLe["leaveentitlements_id"],$dcResultLe["rest"]);          
       
        return $hasil;
    }
    
    // edit by wulan sari 20190815
    public function generatecutibesar($session, $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_leave_generate_cutibesar_thn', $session->getUser()->getId(), $d->getStartUse(), $session->getProject()->getId(), $session->getPt()->getId());
        return $hasil;
    }
    // end edit by wulan sari 20190815
    
    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
       
        $row = $this->dbTable->SPUpdate('sp_leaveentitlements_destroy',$decan->getString(), $session->getUserId());
        
        return $row;
       
    }
    
    //added by anas 08122021
    public function getAllKompensasiExtraLeaveByEmployee(Box_Models_App_HasilRequestRead $r, Hrd_Models_Leave_LeaveEntitlement $d){
        $hasil = 0;
        
        $hasil = $this->dbTable->SPExecute('sp_kompensasi_extraleave_read', $d->getProject()->getId(),$d->getPt()->getId(),1,9999,$r->getOthersValue('employee_id'));
        return $hasil;
    }
}

?>
