<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of EmployeeValidator
 *
 * @author MIS
 */
class Hrd_Models_Master_EmployeeValidator extends Box_Models_App_Validator {
    
    private $dataParams;
    
    public function setDataParams($dataParams){
        $this->dataParams = $dataParams;
    }
    

    public function run(Hrd_Models_Master_EmployeePersonal $em) {
        $msg = "";
        
        $statusResult = $this->checkStatus($em->getStatus(), $em->getStatusInformation());
        $dao = new Hrd_Models_Master_EmployeeDao();
        $fpCodeExist = $dao->checkFingePrintCodePP($em);
        
        $nikExist = $dao->checkNIK($em);
        $nikEmployeeId = 0;
        $employeeIdCode = 0; // employe yang mempunyai code yang dicek
        if ($fpCodeExist) {
            if ($fpCodeExist[0]) {
                $employeeIdCode = $fpCodeExist[0][0]['employee_id'];
               
                
            }
        }
        
        
        /// cek emergensi kontak
        //$emgContancts = $em->getEmgContact();
       
        
        
        
        $emgConts = $this->dataParams["emgcontact"];
        
       
        //
        
        if ($nikExist) {
            if ($nikExist[0]) {
                $nikEmployeeId = intval($nikExist[0][0]['employee_id']);
            }
        }



        $checkvalidemail = $this->check_emailvalidation($em->getEmailCiputra());
        $email_employee_id = NULL;
        if ($checkvalidemail) {
            if ($checkvalidemail[0]) {
                $email_employee_id = intval($checkvalidemail[0][0]['employee_id']);
            }
        }
        
    

        
        if ($nikEmployeeId != $em->getId() && $nikEmployeeId > 0){
             $msg = "NIK sudah terpakai. Silahkan memilih NIK lain.";
        }else if(empty($em->getKtp()->getNomor())) {
            $msg = "KTP Number harus di isi";
        }else if (strlen($em->getName()) < 3) {
            $msg = "Nama karyawan minimal 3 karakter.";
        } else if (!$em->getBirthDate()) {
            $msg = "Tanggal lahir tidak valid.";
        } else if (!$em->getBirthPlace()) {
            $msg = "Tempat lahir tidak valid.";
        } else if ($em->getReligion()->getId() == 0) {
            $msg = "Agama tidak valid.";
        } else if (!$em->getSex()) {
            $msg = "Jenis Kelamin tidak valid.";
        } else if (!$em->getAddress()) {
            $msg = "Alamat  karyawan tidak valid.";
       // } else if (!$em->getPhoneNumber()->getNumber()) {
          //  $msg = "Invalid phone number";
        } else if ($em->getEmployeeActiveByuser() != 1 && !$em->getNonActiveDate()) {
            $msg = "Tanggal non aktif tidak valid.";
        /* comment by Wulan Sari 2019.03.01 karena validasi lewat multiposition
        } else if ($em->getDepartment()->getId() == 0) {
            $msg = "Departemen tidak valid.";*/
            
        /* comment by Wulan Sari 2018.07.20 karena validasi lewat multiposition
        }else if ($em->getJobfamily()->getId() == 0) {
            $msg = "Job Family tidak valid.";*/
            
        }else if ($em->getBanding()->getId() == 0) {
            $msg = "Banding tidak valid.";
        
        } else if ($em->getEmployeeActiveByuser() != 1 && !$em->getAlasanResignId()) {
            $msg = "Resign Reason tidak valid.";
            
        /* comment by Wulan Sari 2019.06.25 karena input golongan lewat form comben
        } else if ($em->getGroup()->getId() == 0) {
            $msg = "Golongan tidak valid.";
            
        /* comment by Wulan Sari 2018.07.20 karena validasi lewat multiposition
        } else if ($em->getPosition()->getId() == 0) {
            $msg = "Jabatan karyawan tidak valid.";*/
            
        } else if (!$statusResult["valid"]) {
            $msg = $statusResult["msg"];
        } else if (strlen($em->getFingerPrintCode())>0 && ($employeeIdCode != $em->getId()) && $employeeIdCode > 0) { // jika code ada dan bukan milik employee ini maka tidak bisa mengambil code ini
          
            $msg = "Silahkan menginput nomor fingerprint yang lain.";
        } else if(count($emgConts)==0){
            $msg = "Silahkan menginput minimal 1 emergency contact.";
        //} else if(strlen($em->getEmailCiputra()) > 0 && !filter_var($em->getEmailCiputra(), FILTER_VALIDATE_EMAIL)){
        } else if(!filter_var($em->getEmailCiputra(), FILTER_VALIDATE_EMAIL)){
            $msg = "Email Ciputra tidak valid";
            
        }else if (strlen($em->getEmailCiputra())>0 && ($email_employee_id != $em->getId()) && $email_employee_id > 0) { // jika code ada dan bukan milik employee ini maka tidak bisa mengambil code ini
            $email = $em->getEmailCiputra();
            $msg = "Email $email sudah digunakan, tidak boleh double..!";
        
        // edit by wulan sari 20190422
        }else if(empty($em->getLastEducation()->getId())) {
            $msg = "Education Last harus di isi";
        } else {
            $this->setStatus(TRUE);
        }
        $this->setMsg($msg);
    }

    private function checkStatus(Hrd_Models_Master_Status $status, Hrd_Models_Master_StatusInformation $information) {
       
        return Hrd_Models_App_Tools::checkStatus($status, $information);;
    }
 

  public function check_emailvalidation($email) {
        $dao = new Hrd_Models_Master_EmployeeDao();
        $result = $dao->getdatabyEmail($email);
        return $result;
      
    }




}

?>
