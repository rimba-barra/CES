<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of EmployeeDao
 *
 * @author MIS
 */
class Hrd_Models_Master_EmployeeDao extends Box_Models_App_AbDao {
   
   /* added by ahmad riadi 29-09-2017 */	
   public function getdatabyEmail($email) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_employee_byemail_read',$email);
        return $hasil;
    }


    public function save(Hrd_Models_Master_EmployeePersonal $em) {
        $hasil = 0;

        $this->setHireDate($em);
        $this->countChilds($em);
        
        
        
       


        //$hasil = $this->dbTable->SPUpdate('sp_employee_create', $em->getAddBy(), $em->getProject()->getId(), $em->getPt()->getId(), $em->getName(), $em->getBirthPlace(), $em->getBirthDate(), $em->getReligion()->getId(), $em->getSex(), $em->getAddress(), $em->getDepartment()->getId(), $em->getDivision()->getId(), $em->getGroup()->getId(), $em->getGroupPosition()->getId(), $em->getPosition()->getId(), $em->getStatus()->getId(), $em->getStatusInformation()->getHireDate(), $em->getStatusInformation()->getAssignationDate(), $em->getStatusInformation()->getContractKe(), $em->getStatusInformation()->getContractStart(), $em->getStatusInformation()->getContractEnd(), $em->getStatusInformation()->getTemporaryKe(), $em->getStatusInformation()->getTemporaryStart(), $em->getStatusInformation()->getTemporaryEnd(), $em->getPhoneNumber()->getNumber(), $em->getNik(), $em->getKtp()->getNomor(), $em->getBloodGroup()->getId(), $em->getMarriage()->getId(), $em->getChildCount(), $em->getKtp()->getAddress(), $em->getLastEducation()->getId(), $em->getNpwp(), $em->getPhoneNumber()->getMobile(), $em->getEmail(), $em->getPassport(), $em->getNikGroup(), $em->getMarriageDate(), $em->getFingerPrintCode(), $em->getActived(), $em->getReportTo()->getId(), $em->getAlokasiBiaya()->getId(),$em->getJobfunction()->getId(),$em->getNomorRekening(),$em->getNamaRekening(),$em->getBankRekening(),$em->getStatus()->getId(),$em->getEmailCiputra());
        /* edited by ahmad riadi 21-06-2017 */
        // $getMasaKerjaStartDate = date('Y-m-d',strtotime($em->getMasaKerjaStartDate()));
        // $getUsiaKerjaStartDate = date('Y-m-d',strtotime($em->getUsiaKerjaStartDate()));
        $getMasaKerjaStartDate = $em->getMasaKerjaStartDate();
        $getUsiaKerjaStartDate = $em->getUsiaKerjaStartDate();
        if(empty($em->getIsKompensasi())){
            $getIsKompensasi = 0;
        }else{
            $getIsKompensasi = $em->getIsKompensasi();
        }

        //untuk contract, usia kerja lgsg diisi dengan hiredate aja, masa kerja dikosongin
        if($em->getStatus()->getId() == 2){
            $getUsiaKerjaStartDate = $em->getStatusInformation()->getHireDate();
        }

        if(empty($em->getIsPensiun())){
            $getIsPensiun = 0;
        }else{
            $getIsPensiun = $em->getIsPensiun();
        }

	 $hasil = $this->dbTable->SPUpdate('sp_employee_create', 
                                            $em->getAddBy(),
                                            $em->getProject()->getId(),
                                            $em->getPt()->getId(),
                                            $em->getName(), 
                                            $em->getBirthPlace(),
                                            $em->getBirthDate(), 
                                            $em->getReligion()->getId(), 
                                            $em->getSex(),
                                            $em->getAddress(), 
                                            $em->getDepartment()->getId(),
                                            $em->getDivision()->getId(),
                                            $em->getGroup()->getId(), 
                                            $em->getGroupPosition()->getId(), 
                                            $em->getPosition()->getId(),
                                            $em->getStatus()->getId(),
                                            $em->getStatusInformation()->getHireDate(),
                                            $em->getStatusInformation()->getAssignationDate(),
                                            $em->getStatusInformation()->getContractKe(), 
                                            $em->getStatusInformation()->getContractStart(),
                                            $em->getStatusInformation()->getContractEnd(), 
                                            //added by michael 18/08/2021
                                            $em->getStatusInformation()->getConsultantKe(), 
                                            $em->getStatusInformation()->getConsultantStart(),
                                            $em->getStatusInformation()->getConsultantEnd(), 

                                            $em->getStatusInformation()->getTemporaryKe(), 
                                            $em->getStatusInformation()->getTemporaryStart(), 
                                            $em->getStatusInformation()->getTemporaryEnd(),
                                            $em->getPhoneNumber()->getNumber(), 
                                            $em->getNik(), 
                                            $em->getKtp()->getNomor(),
                                            $em->getBloodGroup()->getId(),
                                            $em->getMarriage()->getId(), 
                                            $em->getChildCount(),
                                            $em->getKtp()->getAddress(), 
                                            $em->getLastEducation()->getId(),
                                            $em->getNpwp(),
                                            $em->getPhoneNumber()->getMobile(),
                                            $em->getEmail(),
                                            $em->getPassport(),
                                            $em->getNikGroup(), 
                                            $em->getMarriageDate(),
                                            $em->getFingerPrintCode(),
                                            $em->getEmployeeActiveByuser(),
                                            $em->getReportTo()->getId(),
                                            $em->getAlokasiBiaya()->getId(),
                                            $em->getJobfunction()->getId(),
                                            $em->getNomorRekening(),
                                            $em->getNamaRekening(),
                                            $em->getBankRekening(),
                                            $em->getStatus()->getId(),
                                            $em->getEmailCiputra(),
                                            $em->getJobfamily()->getId(),
                                            $em->getBanding()->getId(),                 
                                            $em->getHari_kerja_perminggu(),
                                            $em->getNo_kk(),
                                            $em->getNo_bpjs_pp(),    
                                            $em->getNo_bpjs_k(),    
                                            $em->getNo_bpjs_kk(),    
                                            $em->getNo_ijazah(),    
                                            $em->getNo_manulife_p(),    
                                            $em->getNo_asuransi(),    
                                            $em->getNotes()

                                            //added by anas 10022022
                                            , $em->getNoVAKSIN1(),
                                            $em->getNoVAKSIN2(),
                                            $em->getNoVAKSIN3()

                                            // added by michael 2023-04-26 | untuk masa kerja dan usia kerja
                                            ,$getIsKompensasi,
                                            $getMasaKerjaStartDate,
                                            $getUsiaKerjaStartDate

                                            ,$getIsPensiun

                                            ,$em->getNoPasFoto()
                                            ,$em->getNoStnk()
                                           
                                );


	$insertedId = (int) $hasil; /* employee id */
         if ($insertedId > 0) {
             $em->setId($hasil);
            // var_dump($em->getId())
             $this->storeEmgContact($em);
         // $this->storeRelation($em);	
	    $this->storeMultiposition($em);		


          }

         


        return $insertedId;
    }

  
  
    public function getAllByIds($ids) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_employee_bylist_id_read',$ids);
        return $hasil;
    }
  

   public function getAllB(Box_Models_App_HasilRequestRead $r, Hrd_Models_Master_EmployeePersonal $em) {
        $obj_setup = new Hrd_Models_General_Setup();
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_employee_read', $r->getPage(), $r->getLimit(), $em->getProject()->getId(), $em->getPt()->getId(), $em->getName(), $em->getNik(), intval($em->getDepartment()->getId()) == 999 ? "" : intval($em->getDepartment()->getId()), $em->getActived());
        $data = $obj_setup->clean_blackdiamondquestion($hasil[1]);
        $hasil = array(array(array("totalRow" => $hasil[0][0]['totalRow'])), $data);
        return $hasil;
    }	

    //
    public function checkFingePrintCode(Hrd_Models_Master_Employee $em) {
        $hasil = 0;

        $hasil = $this->dbTable->SPExecute('sp_fingeprintcodeexist_read', $em->getFingerPrintCode());

        return $hasil;
    }

    public function checkFingePrintCodePP(Hrd_Models_Master_Employee $em) {
        $hasil = 0;

        $hasil = $this->dbTable->SPExecute('sp_fingeprintcodeexist_read', $em->getFingerPrintCode(), $em->getProject()->getId(), $em->getPt()->getId());

        return $hasil;
    }

    public function checkNIK(Hrd_Models_Master_Employee $em) {
        $hasil = 0;

        $hasil = $this->dbTable->SPExecute('sp_employeenikexist_read', $em->getNik(), $em->getProject()->getId(), $em->getPt()->getId());



        return $hasil;
    }

    public function update(Hrd_Models_Master_EmployeePersonal $em) {
        $hasil = 0;
        if ($em->getId() == 0) {
            return $hasil;
        }

        //commented by anas 17012024 | karena seharusnya tidak boleh mengupdate hiredate, keculai diupdate langsung oleh hc
        // $this->setHireDate($em);
        $this->countChilds($em);


        //$hasil = $this->dbTable->SPUpdate('sp_employee_update', $em->getAddBy(), $em->getId(), $em->getName(), $em->getBirthPlace(), $em->getBirthDate(), $em->getReligion()->getId(), $em->getSex(), $em->getAddress(), $em->getPhoneNumber()->getNumber(), $em->getStatus()->getId(), $em->getStatusInformation()->getHireDate(), $em->getStatusInformation()->getAssignationDate(), $em->getStatusInformation()->getContractKe(), $em->getStatusInformation()->getContractStart(), $em->getStatusInformation()->getContractEnd(), $em->getStatusInformation()->getTemporaryKe(), $em->getStatusInformation()->getTemporaryStart(), $em->getStatusInformation()->getTemporaryEnd(), $em->getDepartment()->getId(), $em->getDivision()->getId(), $em->getPosition()->getId(), $em->getGroupPosition()->getId(), $em->getGroup()->getId(), $em->getNik(), $em->getKtp()->getNomor(), $em->getBloodGroup()->getId(), $em->getMarriage()->getId(), $em->getChildCount(), $em->getKtp()->getAddress(), $em->getLastEducation()->getId(), $em->getNpwp(), $em->getPhoneNumber()->getMobile(), $em->getEmail(), $em->getPassport(), $em->getNikGroup(), $em->getActived(), $em->getNonActiveDate(), $em->getMarriageDate(), $em->getFingerPrintCode(), $em->getReportTo()->getId(), $em->getAlokasiBiaya()->getId(),$em->getJobfunction()->getId(),$em->getAlasanResign(),$em->getNomorRekening(),$em->getNamaRekening(),$em->getBankRekening(),$em->getEmailCiputra());
	/* edited by ahmad riadi 21-06-2017*/

        // $getMasaKerjaStartDate = date('Y-m-d',strtotime($em->getMasaKerjaStartDate()));
        // $getUsiaKerjaStartDate = date('Y-m-d',strtotime($em->getUsiaKerjaStartDate()));

        $getMasaKerjaStartDate = $em->getMasaKerjaStartDate();
        $getUsiaKerjaStartDate = $em->getUsiaKerjaStartDate();

        if(empty($em->getIsKompensasi())){
            $getIsKompensasi = 0;
        }else{
            $getIsKompensasi = $em->getIsKompensasi();
        }

        //untuk contract, usia kerja lgsg diisi dengan hiredate aja, masa kerja dikosongin
        if($em->getStatus()->getId() == 2){
            $getUsiaKerjaStartDate = $em->getStatusInformation()->getHireDate();
        }

        if(empty($em->getIsPensiun())){
            $getIsPensiun = 0;
        }else{
            $getIsPensiun = $em->getIsPensiun();
        }

	  $hasil = $this->dbTable->SPUpdate('sp_employee_update', 
                                            $em->getAddBy(), 
                                            $em->getId(), 
                                            $em->getName(),
                                            $em->getBirthPlace(),
                                            $em->getBirthDate(),
                                            $em->getReligion()->getId(), 
                                            $em->getSex(),
                                            $em->getAddress(),
                                            $em->getPhoneNumber()->getNumber(),
                                            $em->getStatus()->getId(),
                                            $em->getStatusInformation()->getHireDate(),
                                            $em->getStatusInformation()->getAssignationDate(),
                                            $em->getStatusInformation()->getContractKe(),
                                            $em->getStatusInformation()->getContractStart(),
                                            $em->getStatusInformation()->getContractEnd(),
                                            $em->getStatusInformation()->getTemporaryKe(),
                                            $em->getStatusInformation()->getTemporaryStart(), 
                                            $em->getStatusInformation()->getTemporaryEnd(),
                                            $em->getDepartment()->getId(), 
                                            $em->getDivision()->getId(), 
                                            $em->getPosition()->getId(),
                                            $em->getGroupPosition()->getId(), 
                                            $em->getGroup()->getId(),
                                            $em->getNik(), 
                                            $em->getKtp()->getNomor(), 
                                            $em->getBloodGroup()->getId(),
                                            $em->getMarriage()->getId(), 
                                            $em->getChildCount(),
                                            $em->getKtp()->getAddress(), 
                                            $em->getLastEducation()->getId(), 
                                            $em->getNpwp(),
                                            $em->getPhoneNumber()->getMobile(),
                                            $em->getEmail(), 
                                            $em->getPassport(),
                                            $em->getNikGroup(), 
                                            $em->getEmployeeActiveByuser(), 
                                            $em->getNonActiveDate(),
                                            $em->getMarriageDate(),
                                            $em->getFingerPrintCode(),
                                            $em->getReportTo()->getId(),
                                            $em->getAlokasiBiaya()->getId(),
                                            $em->getJobfunction()->getId(),
                                            $em->getAlasanResign(),
                                            $em->getNomorRekening(),
                                            $em->getNamaRekening(),
                                            $em->getBankRekening(),
                                            $em->getEmailCiputra(),
                                            $em->getJobfamily()->getId(),
                                            $em->getBanding()->getId(),
                                            $em->getAlasanResignId(),    
                                            $em->getHari_kerja_perminggu(),
                                            $em->getNo_kk(),
                                            $em->getNo_bpjs_pp(),    
                                            $em->getNo_bpjs_k(),    
                                            $em->getNo_bpjs_kk(),    
                                            $em->getNo_ijazah(),    
                                            $em->getNo_manulife_p(),    
                                            $em->getNo_asuransi(),    
                                            $em->getNotes()
                                            
                                            //added by anas 10022022
                                            , $em->getNoVAKSIN1(),
                                            $em->getNoVAKSIN2(),
                                            $em->getNoVAKSIN3()

                                            // added by michael 2023-04-26 | untuk masa kerja dan usia kerja
                                            ,$getIsKompensasi,
                                            $getMasaKerjaStartDate,
                                            $getUsiaKerjaStartDate
                                            
                                            ,$getIsPensiun
                                            
                                            ,$em->getNoPasFoto()
                                            ,$em->getNoStnk()
                                            
                );



        $this->storeRelation($em);
	$this->storeMultiposition($em);

	$intranetmodel = new Hrd_Models_Intranet_Employee();
	$intranetmodel->Authorizeuser($em->getId(), $em->getEmailCiputra());
        
        // edit by Wulan Sari 2018.10.10
	$intranetmodel->activenonactive_employee_intranet($em->getId(), $em->getActived());
        
        return $hasil;
    }

    // WORKLOCATION
    public function save_worklocation_personal(Hrd_Models_Master_EmployeePersonal $d, $request,$session,$data) {
        $hasil = 0;

        if($data['employee_id'] == 0){
            $last = $this->dbTable->SPExecute('sp_worklocation_personal_readlast',
                    $session->getUserId()); 
            $data['employee_id'] = $last[0][0]['employee_id'];
        }else{
            $data['employee_id'] = $data['employee_id'];
        }

        $hasil = $this->dbTable->SPUpdate('sp_save_worklocation_personal_update',
                $session->getUserId(),
                $data['employee_id'],
                $data['worklocationprojectpt_id']); 
        
        
        return $hasil;
    }
    public function detail_worklocation_personal(Hrd_Models_Master_EmployeePersonal $d, $request,$session,$data) {
        $hasil = 0;

        $hasil = $this->dbTable->SPExecute('sp_worklocation_personal_readdetail',
                $data['employee_id']); 
        
        return $hasil;
    }
    // WORKLOCATION

    //added by michael 2022-08-11
    public function detail_intranetca_personal(Hrd_Models_Master_EmployeePersonal $d, $request,$session,$data) {
        $hasil = 0;

        $hasil = $this->dbTable->SPExecute('sp_intranetca_personal_readdetail',
                $data['employee_id']); 
        
        return $hasil;
    }
    public function save_intranetca_personal(Hrd_Models_Master_EmployeePersonal $d, $request,$session,$data) {
        $hasil = 0;

        $hasil = $this->dbTable->SPUpdate('sp_intranetca_personal_update',
                $session->getUserId(),
                $data['employee_id'],
                $data['purchasing'],
                $data['inventory'],
                $data['marketing'],
                $data['finance'],
                $data['operational'],
                $data['sales']); 
        
        
        return $hasil;
    }
    //end added by michael 2022-08-11

    public function save_iskompensasi_personal(Hrd_Models_Master_EmployeePersonal $d, $request,$session,$data) {
        $hasil = 0;

        //pake yg ischild aja, soalnya sama
        if($data['employee_id'] == 0){
            $last = $this->dbTable->SPExecute('sp_ischild_personal_readlast',
                    $session->getUserId()); 
            $data['employee_id'] = $last[0][0]['employee_id'];
        }else{
            $data['employee_id'] = $data['employee_id'];
        }

        // if($data['is_child'] == 'true'){
        //     $data['is_child'] = 1;
        // }else{
        //     $data['is_child'] = 0;
        // }
        
        $hasil = $this->dbTable->SPUpdate('sp_save_iskompensasi_personal_update',
                $session->getUserId(),
                $data['employee_id'],
                $data['is_kompensasi']); 
        
        
        return $hasil;
    }

    public function save_ispensiun_personal(Hrd_Models_Master_EmployeePersonal $d, $request,$session,$data) {
        $hasil = 0;

        //pake yg ischild aja, soalnya sama
        if($data['employee_id'] == 0){
            $last = $this->dbTable->SPExecute('sp_ischild_personal_readlast',
                    $session->getUserId()); 
            $data['employee_id'] = $last[0][0]['employee_id'];
        }else{
            $data['employee_id'] = $data['employee_id'];
        }
        
        $hasil = $this->dbTable->SPUpdate('sp_save_ispensiun_personal_update',
                $session->getUserId(),
                $data['employee_id'],
                $data['is_pensiun']); 
        
        
        return $hasil;
    }

    //added by Michael 2021.08.27
    public function save_ischild_personal(Hrd_Models_Master_EmployeePersonal $d, $request,$session,$data) {
        $hasil = 0;

        if($data['employee_id'] == 0){
            $last = $this->dbTable->SPExecute('sp_ischild_personal_readlast',
                    $session->getUserId()); 
            $data['employee_id'] = $last[0][0]['employee_id'];
        }else{
            $data['employee_id'] = $data['employee_id'];
        }

        if($data['is_child'] == 'true'){
            $data['is_child'] = 1;
        }else{
            $data['is_child'] = 0;
        }
        
        $hasil = $this->dbTable->SPUpdate('sp_save_ischild_personal_update',
                $session->getUserId(),
                $data['employee_id'],
                $data['is_child']); 
        
        
        return $hasil;
    }
    public function detail_ischild_personal(Hrd_Models_Master_EmployeePersonal $d, $request,$session,$data) {
        $hasil = 0;

        $hasil = $this->dbTable->SPExecute('sp_ischild_personal_readdetail',
                $data['employee_id']); 
        
        return $hasil;
    }
    //end added by Michael 2021.08.27

    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Master_Employee $em) {
        $hasil = 0;

        $hasil = $this->dbTable->SPExecute('sp_employee_read', $r->getPage(), $r->getLimit(), $em->getProject()->getId(), $em->getPt()->getId(), $em->getName());


        return $hasil;
    }

    public function getAllProjectPt(Box_Models_App_HasilRequestRead $r, Hrd_Models_Master_Employee $em,$session,$data,$employee_active=NULL) {

        $get_id = 0;
        $get_id = $this->dbTable->SPExecute('sp_projectpt_getid_read',
                $session->getUserid(),
                $session->getGroupid(),
                $data['projectpt_id'],1,99999);

        $hasil = 0;
        $employee_id = '';
        if($data['employee_id']){
            if($data['employee_id'] == '999'){
                $employee_id = '';
            }else{
                $employee_id = $data['employee_id'];
            }
        }

        if($employee_active){
            if($employee_active == 'No'){
                $employee_active = '0';
            }
        }else{
            $employee_active = '1';
        }

            $hasil = $this->dbTable->SPExecute('sp_employee_projectpt_read', 1, 999, $get_id[1][0]['project_id'], $get_id[1][0]['pt_id'], $em->getName(),'','',$employee_active,$employee_id,$data['start_date'],$data['end_date']);
            
            // $hasil_gabungan = $this->getAllProjectPt_Upload($r, $em,$session,$data,NULL,$hasil);

        return $hasil;
            // return $hasil_gabungan;
    }

    public function getAllProjectPt_Upload(Box_Models_App_HasilRequestRead $r, Hrd_Models_Master_Employee $em,$session,$data,$employee_active=NULL,$hasil) {
        $get_id = 0;
        $get_id = $this->dbTable->SPExecute('sp_projectpt_getid_read',
                $session->getUserid(),
                $session->getGroupid(),
                $data['projectpt_id'],1,99999);
        
        $hasil_upload = 0;
        
        $hasil_upload = $this->dbTable->SPExecute('sp_upload_master_employee_readmerge', $get_id[1][0]['project_id'], $get_id[1][0]['pt_id'],1,9999,'');
        
        if($hasil_upload[0][0]['totalRow'] > 0){
            $hasil_gabungan_total = $hasil_upload[0][0]['totalRow'] + $hasil[0][0]['totalRow'];
            $hasil_gabungan_data  = array_merge($hasil[1],$hasil_upload[1]);
            $hasil_result[0][0]['totalRow'] = $hasil_gabungan_total;
            $hasil_result[1] = $hasil_gabungan_data;
        }else{
            $hasil_result = $hasil;
        }

        return $hasil_result;
    }


  /*
    public function getAllB(Box_Models_App_HasilRequestRead $r, Hrd_Models_Master_EmployeePersonal $em) {
        $hasil = 0;



        $hasil = $this->dbTable->SPExecute('sp_employee_read', $r->getPage(), $r->getLimit(), $em->getProject()->getId(), $em->getPt()->getId(), $em->getName(), $em->getNik(), intval($em->getDepartment()->getId()) == 999 ? "" : intval($em->getDepartment()->getId()), $em->getActived());


        return $hasil;
    }
  */

    public function getAllWOPL(Hrd_Models_Master_Employee $em) {
        $hasil = 0;



        $hasil = $this->dbTable->SPExecute('sp_employee_read', 1, 9999, $em->getProject()->getId(), $em->getPt()->getId(), $em->getName());


        return $hasil;
    }

    public function updatePhoto(Hrd_Models_Master_Employee $em) {
        $hasil = 0;

        $hasil = $this->dbTable->SPUpdate('sp_employeephoto_update', $em->getModiBy(), $em->getId(), $em->getPhoto());


        return $hasil;
    }

    public function updateDokoumen(Hrd_Models_Master_Employee $em, $jenisDoc, $dokumen) {
        $hasil = 0;

        $hasil = $this->dbTable->SPUpdate('sp_employeedocument_update', $em->getModiBy(), $em->getId(), $jenisDoc, $dokumen);


        return $hasil;
    }

    /* @param Hrd_Models_Master_EmployeePersonal */

	
    /*
    public function getAllEP(Box_Models_App_HasilRequestRead $r, Hrd_Models_Master_EmployeePersonal $em) {
        $hasil = 0;

        $hasil = $this->dbTable->SPExecute('sp_employee_read', $r->getPage(), $r->getLimit(), $em->getProject()->getId(), $em->getPt()->getId(), $em->getName(), $em->getNik(), $em->getDepartment()->getId());

        return $hasil;
    }
    */


    /* start edited by ahmad riadi 09-06-2017 */	
    public function getAllEP(Box_Models_App_HasilRequestRead $r, Hrd_Models_Master_EmployeePersonal $em) {
        $obj_setup = new Hrd_Models_General_Setup();
        $hasil = 0;   
	$r->setPage(1);
        $r->setLimit(99999999);
        
        // comment by Wulan Sari 2018.05.28
        //$hasil = $this->dbTable->SPExecute('sp_employee_read', $r->getPage(), $r->getLimit(), $em->getProject()->getId(), $em->getPt()->getId(), $em->getName(), $em->getNik(), $em->getDepartment()->getId());
        
        // added by Wulan Sari 2018.05.28
        //$hasil = $this->dbTable->SPExecute('sp_employee_read', $r->getPage(), $r->getLimit(), $em->getProject()->getId(), $em->getPt()->getId(), $em->getName(), $em->getNik(), $em->getDepartment()->getId(), 1);
        
        // added by wulan sari 
        $obj_setup = new Hrd_Models_General_Setup();
        $hasil = $this->dbTable->SPExecute('sp_employee_read_byaccess', $obj_setup->_user_id, $r->getPage(), $r->getLimit(), $em->getProject()->getId(), $em->getPt()->getId(), $em->getName(), $em->getNik(), $em->getDepartment()->getId(), 1);
        
        $data = $obj_setup->clean_blackdiamondquestion($hasil[1]);
        $hasil = array(array(array("totalRow" => $hasil[0][0]['totalRow'])), $data);
        return $hasil;
    }
  

    /* start added by ahmad riadi 26-10-2017 */	
    public function getAllForMultiplemodule(Box_Models_App_HasilRequestRead $r, Hrd_Models_Master_EmployeePersonal $em) {
        //jangan di rubah limitnya
        $obj_setup = new Hrd_Models_General_Setup();
        $hasil = 0;
        // $hasil = $this->dbTable->SPExecute('sp_employee_read_byaccess', $obj_setup->_user_id, $r->getPage(), $r->getLimit(), $em->getProject()->getId(), $em->getPt()->getId(), $em->getName(), $em->getNik(), $em->getDepartment()->getId());
        $hasil = $this->dbTable->SPExecute('sp_employee_read_byaccess', $obj_setup->_user_id, $r->getPage(), 999, $em->getProject()->getId(), $em->getPt()->getId(), $em->getName(), $em->getNik(), $em->getDepartment()->getId());
        $data = $obj_setup->clean_blackdiamondquestion($hasil[1]);
        $hasil = array(array(array("totalRow" => $hasil[0][0]['totalRow'])), $data);
        return $hasil;
    }


    public function getAllEPReportto(Box_Models_App_HasilRequestRead $r, Hrd_Models_Master_EmployeePersonal $em) {
        $obj_setup = new Hrd_Models_General_Setup();
        $hasil = 0;   
	$r->setPage(1);
        $r->setLimit(99999999);
   
        $hasil = $this->dbTable->SPExecute('sp_employee_read', $r->getPage(), $r->getLimit(), $em->getProject()->getId(), $em->getPt()->getId(), $em->getName(), $em->getNik(), $em->getDepartment()->getId(),1);
        $data = $obj_setup->clean_blackdiamondquestion($hasil[1]);
        $hasil = array(array(array("totalRow" => $hasil[0][0]['totalRow'])), $data);
        return $hasil;
    }	

    /* end edited by ahmad riadi 09-06-2017 */	
	

    public function getAllEPJustActive(Box_Models_App_HasilRequestRead $r, Hrd_Models_Master_EmployeePersonal $em) {
        $hasil = 0;


        $obj_setup = new Hrd_Models_General_Setup();
        //$hasil = $this->dbTable->SPExecute('sp_employee_read', $r->getPage(), $r->getLimit(), $em->getProject()->getId(), $em->getPt()->getId(), $em->getName(), $em->getNik(), intval($em->getDepartment()->getId()) == 999 ? "" : intval($em->getDepartment()->getId()), 1);
        $hasil = $this->dbTable->SPExecute('sp_employee_read_byaccess', $obj_setup->_user_id, $r->getPage(), $r->getLimit(), $em->getProject()->getId(), $em->getPt()->getId(), $em->getName(), $em->getNik(), intval($em->getDepartment()->getId()) == 999 ? "" : intval($em->getDepartment()->getId()), 1);



        return $hasil;
    }

    public function getAllEPJustActiveWOPL(Hrd_Models_Master_EmployeePersonal $em) {
        $hasil = 0;



        $hasil = $this->dbTable->SPExecute('sp_employee_read', 1, 99999, $em->getProject()->getId(), $em->getPt()->getId(), $em->getName(), $em->getNik(), intval($em->getDepartment()->getId()) == 999 ? "" : intval($em->getDepartment()->getId()), 1);



        return $hasil;
    }

    // added by Michael 2021.06.30 
    public function getAllEPJustActiveWOPL_CutiTambahan(Box_Models_App_HasilRequestRead $r, $data) {
        $hasil = 0;



        $hasil = $this->dbTable->SPExecute('sp_extraleavedetail_read',
                                            $data['extraleave_id']);



        return $hasil;
    }
    // added by Michael 2021.06.30 

    // added by Michael 2021.07.16 
    public function getAllEPJustActiveWOPL_SanksiKeterlambatan(Box_Models_App_HasilRequestRead $r, $data) {
        $hasil = 0;



        $hasil = $this->dbTable->SPExecute('sp_sanksiketerlambatandetail_read',
                                            $data['sanksiketerlambatan_id']);



        return $hasil;
    }
    // added by Michael 2021.07.16 

    

    // added by Michael 2021.05.19
    public function getAllEPJustActiveWOPL_CustomProjectPt(Hrd_Models_Master_EmployeePersonal $em, $data){
        $hasil = 0;

        $hasil = $this->dbTable->SPExecute('sp_employee_read', 1, 99999, $data['project_id'],$data['pt_id'], $em->getName(), $em->getNik(), intval($em->getDepartment()->getId()) == 999 ? "" : intval($em->getDepartment()->getId()), 1);

        return $hasil;
    }
    // end added by Michael 2021.05.19
    
    private function storeEmgContact(Hrd_Models_Master_EmployeePersonal $em){
        /* store emgcontact */

        $em->setSelectedRelation("emgcontact");
        $ed = $em->getDCResult();
        
      
     

        if (count($ed) > 0) {
            $hasil = $this->dbTable->SPUpdate('sp_relation_create', $em->getAddBy(), $em->getId(), $ed["relation_id"], $ed["name"], $ed["birth_date"], $ed["address"], $ed["job"], $ed["last_education"], $ed["relationtype_id"], $ed["sex"], $ed["birth_place"], $ed["deleted"], $ed["phone_number"], '', '', '', '', '', $ed["relation_name"], $ed["rip_date"]);
        }
    }

    private function storeRelation(Hrd_Models_Master_Employee $em) {


        $em->setSelectedRelation("skills");
        $ed = $em->getDCResult();
        if (count($ed) > 0) {
            $hasil = $this->dbTable->SPUpdate('sp_potency_create', $em->getAddBy(), $em->getId(), $ed["employeepotency_id"], $ed["potency_id"], $ed["list"], $ed["value"], $ed["is_active"]);
        }


        $em->setSelectedRelation("organizations");
        $ed = $em->getDCResult();



        if ($ed) {
            if (count($ed) > 0) {
                $hasil = $this->dbTable->SPUpdate('sp_organization_create', $em->getAddBy(), $em->getId(), $ed["organization_id"], $ed["organization"], $ed["position"], $ed["start_year"], $ed["end_year"], $ed["deleted"]);
            }
        }





        $em->setSelectedRelation("educations");
        $ed = $em->getDCResult();
        if (count($ed) > 0) {
            $hasil = $this->dbTable->SPUpdate('sp_educationhistory_create', $em->getAddBy(), $em->getId(), $ed["educationhistory_id"], $ed["stage"], $ed["start_year"], $ed["end_year"], $ed["school"], $ed["subjected"], $ed["deleted"], $ed["ijasah"]);
        }



        /* store spouse, father , mother info */

        /* temp mark 30 maret 2016 */

        $em->setSelectedRelation("relation");
        $ed = $em->getDCResult();

       
        /// check jika ada edit/add spouse
        $tipeRelasi = $ed["relationtype_id"];
        $tipeRelasi = explode("~", $tipeRelasi);
        if (in_array("3", $tipeRelasi)) {
            if (count($ed) > 0) {
                if (strlen($ed["relation_id"]) > 0) {
                    $hasil = $this->dbTable->SPUpdate('sp_relation_create', $em->getAddBy(), $em->getId(), $ed["relation_id"], $ed["name"], $ed["birth_date"], $ed["address"], $ed["job"], $ed["last_education"], $ed["relationtype_id"], $ed["sex"], $ed["birth_place"], $ed["deleted"], $ed["phone_number"], $ed["hp_number"], $ed["company_name"], $ed["company_line_of_business"], $ed["company_address"], $ed["company_phone"], '', $ed["rip_date"]);
                }
            }
        }else{
            if (count($ed) > 0) {
                if (strlen($ed["relation_id"]) > 0) {
                    $hasil = $this->dbTable->SPUpdate('sp_relation_create', $em->getAddBy(), $em->getId(), $ed["relation_id"], $ed["name"], $ed["birth_date"], $ed["address"], $ed["job"], $ed["last_education"], $ed["relationtype_id"], $ed["sex"], $ed["birth_place"], $ed["deleted"], '','', '','', '','', '', $ed["rip_date"]);
                }
            } 
        }









        /* end temp mark 30 maret 2016 */



        /* store childs */

        $em->setSelectedRelation("childs");
        $ed = $em->getDCResult();

        if (count($ed) > 0) {
            $hasil = $this->dbTable->SPUpdate('sp_relation_create', $em->getAddBy(), $em->getId(), $ed["relation_id"], $ed["name"], $ed["birth_date"], $ed["address"], $ed["job"], $ed["last_education"], $ed["relationtype_id"], $ed["sex"], $ed["birth_place"], $ed["deleted"], '', '', '', '', '', '', '', $ed["rip_date"]);
        }

        $hasil = $this->dbTable->SPUpdate('sp_relationchild_update', $em->getId(), Box_Config::getv("RT_CHILD"));

        /* store emgcontact */

        $em->setSelectedRelation("emgcontact");
        $ed = $em->getDCResult();





        if (count($ed) > 0) {
            $hasil = $this->dbTable->SPUpdate('sp_relation_create', $em->getAddBy(), $em->getId(), $ed["relation_id"], $ed["name"], $ed["birth_date"], $ed["address"], $ed["job"], $ed["last_education"], $ed["relationtype_id"], $ed["sex"], $ed["birth_place"], $ed["deleted"], $ed["phone_number"], '', '', '', '', '', $ed["relation_name"], $ed["rip_date"]);
        }




        /* store saudara */




        $em->setSelectedRelation("saudaras");
        $ed = $em->getDCResult();





        if (count($ed) > 0) {
            $hasil = $this->dbTable->SPUpdate('sp_relation_create', $em->getAddBy(), $em->getId(), $ed["relation_id"], $ed["name"], $ed["birth_date"], $ed["address"], $ed["job"], $ed["last_education"], $ed["relationtype_id"], $ed["sex"], $ed["birth_place"], $ed["deleted"], '', '', '', '', '', '', $ed["relation_name"], $ed["rip_date"]);
        }



        /* store job histor */

        $em->setSelectedRelation("jobhistories");
        $ed = $em->getDCResult();



        if (count($ed) > 0) {
            $hasil = $this->dbTable->SPUpdate('sp_jobhistory_create', $em->getAddBy(), $em->getId(), $ed["jobhistory_id"], $ed["company_name"], $ed["division"], $ed["position"], $ed["start_date"], $ed["end_date"], $ed["line_of_business"],$ed["lamakerja"],$ed["deleted"]);
        }

        /* store trainings */

        $em->setSelectedRelation("trainings");
        $ed = $em->getDCResult();





        if (count($ed) > 0) {
            $hasil = $this->dbTable->SPUpdate('sp_training_create', $em->getAddBy(), $em->getId(), $ed["traininghistory_id"], $ed["training"], $ed["organizer"], $ed["city_name"], $ed["years"], $ed["deleted"], $ed["sertifikat"]);
        }
    }

    public function lookupemployee(Hrd_Models_Master_Employee $em) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_report_lookemployee', $em->getName(), $em->getProject()->getId(), $em->getPt()->getId());
        return $hasil;
    }

    public function lookupemployee2(Hrd_Models_Master_Employee $em) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_report_lookemployee', $em->getName(), $em->getProject()->getId(), $em->getPt()->getId());
        return $hasil;
    }

    public function getRelation(Hrd_Models_Master_Employee $em) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_relation_read', $em->getId());
        return $hasil[0];
    }

    public function getDetail(Hrd_Models_Master_Employee $em) {
        $obj_setup = new Hrd_Models_General_Setup();        
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_employeedetail_read', $em->getId(), $obj_setup->_user_id);
        return $hasil;
    }

    private function setHireDate(Hrd_Models_Master_EmployeePersonal $em) {
        $statusId = $em->getStatus()->getId();
        if ($statusId == Box_Config::STATUS_CONTRACT || $statusId == Box_Config::STATUS_CANDIDATE) {
            $em->getStatusInformation()->setHireDate($em->getStatusInformation()->getContractStart());
        } else if ($statusId == Box_Config::STATUS_DAILY_CONTRACT || $statusId == Box_Config::STATUS_DAILY_PERMANENT || $statusId == Box_Config::STATUS_DAILY_TEMPORARY) {
            $em->getStatusInformation()->setHireDate($em->getStatusInformation()->getTemporaryStart());
        }
        //added by michael 18/08/2021
        else if ($statusId == Box_Config::STATUS_CONSULTANT) {
            $em->getStatusInformation()->setHireDate($em->getStatusInformation()->getConsultantStart());
        }

    }

    private function countChilds(Hrd_Models_Master_EmployeePersonal $em) {
        /// get child count
        $em->setSelectedRelation("childs");
        $childCount = 0;
        $ed = $em->getDCResult();
        if ($ed) {

            foreach ($ed as $key => $value) {
                if ($key == "relation_id") {

                    $data = explode("~", $value);
                    foreach ($data as $id) {
                        if (intval($id) > 0) {
                            $childCount +=1;
                        }
                    }
                }
            }
        }


        $em->setChildCount($childCount);
    }

   /* start added by ahmad riadi 20-06-2017 */	
    public function getDatareportto($params) {       
        $obj_setup = new Hrd_Models_General_Setup();
        $hasil = 0;      
        $obj_setup->_storeprocedure = 'sp_employeefilter_read';
        $params['page']=1;
        $params['limit']=999999999;    
        $obj_setup->_project_id = $params['project_id'];
        $obj_setup->_pt_id = $params['pt_id'];
        $obj_setup->_param = $params;
        $hasil = $obj_setup->executeSP();

	//print_r($hasil);
        $data = $obj_setup->clean_blackdiamondquestion($hasil[1]);
        $hasil = array(array(array("totalRow" => $hasil[0][0]['totalRow'])), $data);
        return $hasil;
    }
    /* end added by ahmad riadi 20-06-2017 */	



  private function storeMultiposition(Hrd_Models_Master_EmployeePersonal $em) {
        $setup = new Hrd_Models_General_Setup();
        $data = $em->getDatamultiposition();
        $hasil = 0;
        if (!empty($data)) {
            $obj = new Hrd_Models_Master_Multiposition();
            $dao = new Hrd_Models_Master_MultipositionDao();
            foreach ($data as $row) {
                $id = $row['employee_multiposition_id'];
                $row['employee_id'] = $em->getId();
                $row['addby'] = $setup->_user_id;

                $obj->setArrayTable($row);
                if ($id > 0) {
                    //update                    
                    $hasil = $dao->update($obj);
                } else {
                    //create
                    if ($row['statedata'] !== 'delete') {
                        $hasil = $dao->save($obj);
                    }
                }
                if (intval($hasil) > 0) {
                    $is_default = $obj->getIs_default();
                    if ($is_default) {
                        //update m_employee set data from is default from grid multiposition

                        $obj_array = $obj->getArrayTable();

                        $recordupdate = array(
                            "alokasibiaya_id" => $obj_array['alokasibiaya_id'],
                            "department_id" => $obj_array['department_id'],
                            "jobfamily_id" => $obj_array['jobfamily_id'],
                            "position_id" => $obj_array['position_id'],
                            "reportto" => $obj_array['reportto_id'],
                            "section_id" => $obj_array['section_id'],
                        );
                        $setup->_tabledata = $setup->_m_employee;
                        $setup->updatedatav2($recordupdate, array("employee_id" => $obj_array['employee_id']));
                    }
                }
            }
        }
    }



  private function storeMultiposition_old(Hrd_Models_Master_EmployeePersonal $em) {
        $data = $em->getDatamultiposition();
        if (!empty($data)) {
            $obj = new Hrd_Models_Master_Multiposition();
            $dao = new Hrd_Models_Master_MultipositionDao();
            foreach ($data as $row) {
                $id = $row['employee_multiposition_id'];
                
                $obj->setArrayTable($row);
                if ($id > 0) {
                    //update                    
                    $dao->update($obj);
                } else {
                    //create
                    if ($row['statedata'] !== 'delete') {
                        $dao->save($obj);
                    }
                }
            }
        } else {
            //echo 'kosong';
        }
    }
    
    // add by wulan 24 10 2021
    public function getEmployeesaldocuti($id) {
        
        $obj_setup = new Hrd_Models_General_Setup();
        $user_id = $obj_setup->_user_id;
                
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_employee_saldocuti', $id, $user_id);
        #var_dump($this->dbTable);
        return $hasil;
    }
    public function getHitungcuti($params) {
        $hasil = 0;        
        $hasil = $this->dbTable->SPExecute('sp_calculatorleave',$params["hire_date"], $params["resign_date"], $params["rest"], $params["group_code"], $params["employeestatus"]);
        #var_dump($this->dbTable);
        return $hasil;
    }
  
    public function getAllExportList() {    
        $hasil = $this->dbTable->SPExecute('sp_personal_listdocument_read');

        return $hasil;
    }

    public function exportValidation($params) {
        $hasil = 0;        
        $available = NULL;
        $available_title = NULL;
        
        $document_selected = json_decode($params['selected'],TRUE);

        foreach($document_selected as $key_s => $item_s){
            $hasil = $this->dbTable->SPExecute('sp_reportpersonaldocument_validation_read',
                                                $params['employee_id'],
                                                $item_s['field']);
            
            if(array_key_exists(0, $hasil[0])){
                $available[]=$item_s['field'];
                $available_title[]=$item_s['header_title'];
            }
        }
        
        if($available){
            $hasil_result['available'] = json_encode($available);
            $hasil_result['available_title'] = implode(',', $available_title);
        }else{
            $hasil_result = NULL;
        }

        return $hasil_result;
    }

    public function exportDocument($params){

        require_once APPLICATION_PATH . '\modules\hrd\library\fpdf185\fpdf.php';
        require_once APPLICATION_PATH . '\modules\hrd\library\FPDI-2.3.6\src\autoload.php';
        
        $pdf = new \setasign\Fpdi\Fpdi();
        $destination = getcwd() . '/app/hrd/uploads/personal/exportdata/';
        $httpdirect = 'app/hrd/uploads/personal/exportdata/';

        $get_employee = $this->dbTable->SPExecute('sp_employee_read_byid',
                                                $params['employee_id']);

        $employee = $get_employee[0][0];

        $fileName = 'document_'.$employee['employee_name'].'_'.time().'.pdf';
        
        $document_selected = json_decode($params['available'],TRUE);

        foreach($document_selected as $key_s => $item_s){
            $hasil = $this->dbTable->SPExecute('sp_reportpersonaldocument_validation_read',
                                                $params['employee_id'],
                                                $item_s);
            
            if(array_key_exists(0, $hasil[0])){
                $file = getcwd() . '/app/hrd/uploads/'.$hasil[0][0][$item_s];
                $ext = pathinfo($file, PATHINFO_EXTENSION);
                if($ext == 'jpg' || $ext == 'png' || $ext == 'jpeg')
                {
                    $pdf->AddPage();
                    // image fullsize A4
                    $pdf->Image($file, $pdf->GetX(), $pdf->GetY(), 100);
                }
                else
                {
                    $pageCount = $pdf->setSourceFile($file);
                    for ($i = 0; $i < $pageCount; $i++) 
                    {
                        $tpl = $pdf->importPage($i + 1, '/MediaBox');
                        $pdf->addPage();
                        $pdf->useTemplate($tpl);
                    }
                }
            }
        }
        
        $pdf->Output('F',$destination.$fileName);
        $url = $httpdirect.$fileName;
        return $url;
    }

    public function cektukarshift($params) {
        $hasil = 0;        
        $hasil = $this->dbTable->SPExecute('sp_tukarshift_cek_read',
                                            $params["project_id"],
                                            $params["pt_id"], 
                                            $params["employee_id"], 
                                            'NO', 
                                            'APPROVE_BYREPORTTO');
        return $hasil;
    }

    public function cekklaimpengobatan($params) {
        $hasil = 0;        
        $hasil = $this->dbTable->SPExecute('sp_klaim_cek_read',
                                            $params["project_id"],
                                            $params["pt_id"], 
                                            $params["employee_id"],
                                            0, 
                                            0,

                                            1,
                                            -1,

                                            0,
                                            -1,
                                            0,

                                            -1,
                                            -1,
                                            
                                            0
                                            );
        return $hasil;
    }
    
    //added by anas 24102023
    public function getHitungcuti_detail($params) {
        $hasil = 0;        
        $hasil = $this->dbTable->SPExecute('sp_calculatorleave_detail',$params["employee_id"], $params["hire_date"], $params["resign_date"], $params["rest"], $params["group_code"], $params["employeestatus"]);
        return $hasil;
    }
}

?>
