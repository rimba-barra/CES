<?php

/**
 * Description of EmployeeValidator
 *
 * @author TOMMY-MIS
 */
class Cashier_Models_Hrd_EmployeeValidator extends Cashier_Box_Models_App_Validator{
    
    private $session;
    
    public function setSession($session){
        $this->session = $session;
    }
    
    public function run(Cashier_Models_Hrd_Employee $em){
        $msg = "";
        
        $em->setProject($this->session->getProject());
        $em->setPt($this->session->getPt());
        
        if(strlen($em->getName())<3){
            $msg = "Nama karyawan minimal 3 karakter.";
        }else if(intval($em->getJabatanId())==0){
            $msg = "Jabatan tidak valid.";
        }else if(strlen($em->getPhoneNumber())> 50){
            $msg = "Nomor telepon maksimal 50 karakter.";
        }else if(strlen($em->getNomorRekening()) > 50){
            $msg = "Nomor rekening maksimal 50 karakter.";
        }else if(strlen($em->getAlamat()) > 255){
            $msg = "Alamat maksimal 255 karakter.";
        }else{
            $this->setStatus(TRUE);
            
        }
        $this->setMsg($msg);
    }
}
