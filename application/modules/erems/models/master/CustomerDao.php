<?php

/**
 * Description of CustomerDao
 *
 * @author MIS
 */
class Erems_Models_Master_CustomerDao extends Erems_Box_Models_App_AbDao implements Erems_Box_Models_App_BlackHole {
    
    
    
    public function getAll(Erems_Box_Models_App_Session $ses){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_customerb_read',$ses->getProject()->getId(),$ses->getPt()->getId());
        return $hasil; 
    }

    
    public function getAllByFilter(Erems_Box_Models_App_HasilRequestRead $r,  Erems_Box_Models_App_Session $ses){
        $hasil = array();    

        $hasil = $this->dbTable->SPExecute('sp_customerb_read',
                $ses->getProject()->getId(),
                $ses->getPt()->getId(),
                $r->getOthersValue("code"),
                $r->getOthersValue("name"),
                $r->getOthersValue("birthdate"),
                $r->getPage(),
                $r->getLimit(),
                $r->getOthersValue("address"),
                $r->getOthersValue("mobile_phone"),
                $r->getOthersValue("home_phone"),
                'm_customer',
                //added by anas 15062021
                $r->getOthersValue("ktp_number"));    
        return $hasil; 
    }
    
    public function userIdExist(Erems_Models_Master_CustomerProfile $cs){
        $row = 0;
        
        $row = $this->dbTable->SPExecute('sp_mastercustomer_userexist',$cs->getUser()->getName(),$cs->getProject()->getId(),$cs->getPt()->getId());
      
        return $row[0][0]['userFound'];
        
    }
    
    public function save(Erems_Models_Master_CustomerProfile $cs){
        $row = 0;
       
        if(!$cs->getAddBy()){
            return $row;
        }
        
       // print_r($cs->getArrayTable());
       // die();
        
           
        $addre = str_replace("'", "''", $cs->getAddress());
        $name = str_replace("'", "`", $cs->getName());
        
        $ktp = str_replace("'", "''", $cs->getKtp()->getAddress()); 
        $ktp_name = str_replace("'", "''", $cs->getKtp()->getName()); 

        $username = str_replace("'", "",$cs->getUser()->getName());
                   
        $row = $this->dbTable->SPCreate('sp_customerb_create',
                $cs->getAddBy(),$cs->getProject()->getId(),$cs->getPt()->getId(),$cs->getCode(),$name,$addre,$cs->getCity()->getId(),$cs->getZipCode(),$cs->getHomePhone(),$cs->getOfficePhone(),$cs->getMobilePhone(),$cs->getFax(),
                $cs->getKtp()->getNomor(),$ktp_name,$ktp,
                $cs->getNpwpNumber(),$cs->getBirthPlace(),$cs->getBirthDate(),$cs->getMaritalStatus(),$cs->getChildren(),$cs->getNationality(),
                $cs->getReligion()->getId(),
                // add by hadi 30092019
                // $cs->getPurpose()->getId(),
                $cs->getPurposeBuy()->getId(),
                // add by hadi 30092019
                $cs->getEducation()->getId(),$cs->getEmail(),
                $cs->getCompany()->getName(),$cs->getCompany()->getAddress(),$cs->getCompany()->getPhone(),$cs->getCompany()->getExtPhone(),$cs->getCompany()->getCity()->getId(),$cs->getCompany()->getZipCode(),$cs->getCompany()->getFax(),$cs->getCompany()->getPosition(),
                $cs->getEmergency()->getName(),$cs->getEmergency()->getAddress(),$cs->getEmergency()->getHomePhone(),$cs->getEmergency()->getMobilePhone(),$cs->getEmergency()->getFamilyStatus(),
                $username,$cs->getUser()->getPassword(),$cs->getPic(),$cs->getDescription(),$cs->getIsTemporary(),$cs->getNpwpAddress(),
                /* start added by ahmad riadi 06-01-2017 */
                $cs->getGeneral_gelar(),
                $cs->getGeneral_virtualaccount_no(),
                $cs->getGeneral_provinsi()->getId(),
                $cs->getGeneral_kecamatan(),
                $cs->getGeneral_kelurahan(),
                $cs->getGeneral_rt(),
                $cs->getGeneral_rw(),
                $cs->getGeneral_kewarganegaraan(),
                $cs->getGeneral_kodewna(),
                $cs->getGeneral_pekerjaan(),
                $cs->getIdentitas_documenttype()->getId(),
                $cs->getIdentitas_province()->getId(),
                $cs->getIdentitas_city()->getId(),
                $cs->getIdentitas_rt(),
                $cs->getIdentitas_rw(),
                $cs->getIdentitas_kecamatan(),
                $cs->getIdentitas_kelurahan(),
                $cs->getIdentitas_kodepos(),
                $cs->getBadanhukum(),
                $cs->getBentukusaha()->getId(),
                $cs->getBidangusaha(),
                $cs->getBilalain(),
                $cs->getInstrumentpembayaran()->getId(),
                $cs->getRekeningwakat_no(),
                $cs->getRinciantransaksi(),
                $cs->getSumberdana(),
                $cs->getRekeningtrans_no(),
                $cs->getNamawali(),
                $cs->getAktapendirian(),
                $cs->getTanggalaktapendirian(),
                $cs->getAktaperubahan(),
                $cs->getTanggalaktaperubahan(),
                $cs->getAktasusunanpengurus(),
                $cs->getTanggalaktasusunanpengurus(),     
                $cs->getCompany_email(),
				$cs->getGender(),		
                /* end added by ahmad riadi 06-01-2017 */
                $cs->getKKNumber(), /*added by david*/
                //new for surabaya
                $cs->getNPPKP(),
                $cs->getNPWPName(),
                $cs->getNPWPKlu(),
                $cs->getNPWPKlasifikasiusaha(),
                $cs->getNPWPStatus(),
                $cs->getNPWPTarif(),
                $cs->getNPWPTarifno(),
                $cs->getCompanyPic(),
                $cs->getMaritalStatusBaru(),
                $cs->getGeneral_pekerjaan_baru(),
                $cs->getGeneral_bidang_pekerjaan_baru()
				,$cs->getKtpFile()
				,$cs->getNpwpFile()
                );
      // $this->dbTable->printDbError();
        
      
        
   
        return $row;
        
    }
    
    public function update(Erems_Models_Master_CustomerProfile $cs){

      // echo $cs->getKKNumber();
        
        $row = 0;
        if($cs->getId()==0 || !$cs->getAddBy()){
            return $row;
        }
        
      
    
        $row = $this->dbTable->SPUpdate('sp_customerb_update',
                $cs->getModiBy(),$cs->getId(),$cs->getCode(),$cs->getName(),$cs->getAddress(),$cs->getCity()->getId(),$cs->getZipCode(),$cs->getHomePhone(),$cs->getOfficePhone(),$cs->getMobilePhone(),$cs->getFax(),
                $cs->getKtp()->getNomor(),$cs->getKtp()->getName(),$cs->getKtp()->getAddress(),
                $cs->getNpwpNumber(),$cs->getBirthPlace(),$cs->getBirthDate(),$cs->getMaritalStatus(),$cs->getChildren(),$cs->getNationality(),
                $cs->getReligion()->getId(),
                // add by hadi 30092019
                // $cs->getPurpose()->getId(),
                $cs->getPurposeBuy()->getId(),
                // add by hadi 30092019
                $cs->getEducation()->getId(),$cs->getEmail(),
                $cs->getCompany()->getName(),$cs->getCompany()->getAddress(),$cs->getCompany()->getPhone(),$cs->getCompany()->getExtPhone(),$cs->getCompany()->getCity()->getId(),$cs->getCompany()->getZipCode(),$cs->getCompany()->getFax(),$cs->getCompany()->getPosition(),
                $cs->getEmergency()->getName(),$cs->getEmergency()->getAddress(),$cs->getEmergency()->getHomePhone(),$cs->getEmergency()->getMobilePhone(),$cs->getEmergency()->getFamilyStatus(),
                $cs->getUser()->getName(),$cs->getUser()->getPassword(),$cs->getPic(),$cs->getDescription(),$cs->getIsTemporary(),$cs->getNpwpAddress(),
              /* start added by ahmad riadi 06-01-2017 */
                $cs->getGeneral_gelar(),
                $cs->getGeneral_virtualaccount_no(),
                $cs->getGeneral_provinsi()->getId(),
                $cs->getGeneral_kecamatan(),
                $cs->getGeneral_kelurahan(),
                $cs->getGeneral_rt(),
                $cs->getGeneral_rw(),
                $cs->getGeneral_kewarganegaraan(),
                $cs->getGeneral_kodewna(),
                $cs->getGeneral_pekerjaan(),
                $cs->getIdentitas_documenttype()->getId(),
                $cs->getIdentitas_province()->getId(),
                $cs->getIdentitas_city()->getId(),
                $cs->getIdentitas_rt(),
                $cs->getIdentitas_rw(),
                $cs->getIdentitas_kecamatan(),
                $cs->getIdentitas_kelurahan(),
                $cs->getIdentitas_kodepos(),
                $cs->getBadanhukum(),
                $cs->getBentukusaha()->getId(),
                $cs->getBidangusaha(),
                $cs->getBilalain(),
                $cs->getInstrumentpembayaran()->getId(),
                $cs->getRekeningwakat_no(),
                $cs->getRinciantransaksi(),
                $cs->getSumberdana(),
                $cs->getRekeningtrans_no(),
                $cs->getNamawali(),
                $cs->getAktapendirian(),
                $cs->getTanggalaktapendirian(),
                $cs->getAktaperubahan(),
                $cs->getTanggalaktaperubahan(),
                $cs->getAktasusunanpengurus(),
                $cs->getTanggalaktasusunanpengurus(),     
                $cs->getCompany_email(),
				$cs->getGender(), 	
                /* end added by ahmad riadi 06-01-2017 */
                $cs->getKKNumber(), /*added by david*/
                //new for surabaya
                $cs->getNPPKP(),
                $cs->getNPWPName(),
                $cs->getNPWPKlu(),
                $cs->getNPWPKlasifikasiusaha(),
                $cs->getNPWPStatus(),
                $cs->getNPWPTarif(),
                $cs->getNPWPTarifno(),
                $cs->getCompanyPic(),
                $cs->getMaritalStatusBaru(),
                $cs->getGeneral_pekerjaan_baru(),
                $cs->getGeneral_bidang_pekerjaan_baru()
                );        
         
        return $row;
        
    }
    
    //added by david
    public function saveTmp(Erems_Models_Master_CustomerProfile $cs,  $sess){

        $proposed_by = $cs->getUserlogin()->getCurrentuser();

        $row = 0;
       
        if(!$cs->getAddBy()){
            return $row;
        }
        
       //print_r($cs->getArrayTable());
       //die();
                   
        $row = $this->dbTable->SPCreate('sp_customerb_tmp_create',
                $cs->getAddBy(),$sess["projectId"],$sess["ptId"],$cs->getId(),$cs->getCode(),$cs->getName(),$cs->getAddress(),$cs->getCity()->getId(),$cs->getZipCode(),$cs->getHomePhone(),$cs->getOfficePhone(),$cs->getMobilePhone(),$cs->getFax(),
                $cs->getKtp()->getNomor(),$cs->getKtp()->getName(),$cs->getKtp()->getAddress(),
                $cs->getNpwpNumber(),$cs->getBirthPlace(),$cs->getBirthDate(),$cs->getMaritalStatus(),$cs->getChildren(),$cs->getNationality(),
                $cs->getReligion()->getId(),
                // $cs->getPurpose()->getId(),
                $cs->getPurposeBuy()->getId(),
                $cs->getEducation()->getId(),$cs->getEmail(),
                $cs->getCompany()->getName(),$cs->getCompany()->getAddress(),$cs->getCompany()->getPhone(),$cs->getCompany()->getExtPhone(),$cs->getCompany()->getCity()->getId(),$cs->getCompany()->getZipCode(),$cs->getCompany()->getFax(),$cs->getCompany()->getPosition(),
                $cs->getEmergency()->getName(),$cs->getEmergency()->getAddress(),$cs->getEmergency()->getHomePhone(),$cs->getEmergency()->getMobilePhone(),$cs->getEmergency()->getFamilyStatus(),
                $cs->getUser()->getName(),$cs->getUser()->getPassword(),$cs->getPic(),$cs->getDescription(),$cs->getIsTemporary(),$cs->getNpwpAddress(),
                /* start added by ahmad riadi 06-01-2017 */
                $cs->getGeneral_gelar(),
                $cs->getGeneral_virtualaccount_no(),
                $cs->getGeneral_provinsi()->getId(),
                $cs->getGeneral_kecamatan(),
                $cs->getGeneral_kelurahan(),
                $cs->getGeneral_rt(),
                $cs->getGeneral_rw(),
                $cs->getGeneral_kewarganegaraan(),
                $cs->getGeneral_kodewna(),
                $cs->getGeneral_pekerjaan(),
                $cs->getIdentitas_documenttype()->getId(),
                $cs->getIdentitas_province()->getId(),
                $cs->getIdentitas_city()->getId(),
                $cs->getIdentitas_kecamatan(),
                $cs->getIdentitas_kelurahan(),
                $cs->getIdentitas_kodepos(),
                $cs->getBadanhukum(),
                $cs->getBentukusaha()->getId(),
                $cs->getBidangusaha(),
                $cs->getBilalain(),
                $cs->getInstrumentpembayaran()->getId(),
                $cs->getRekeningwakat_no(),
                $cs->getRinciantransaksi(),
                $cs->getSumberdana(),
                $cs->getRekeningtrans_no(),
                $cs->getNamawali(),
                $cs->getAktapendirian(),
                $cs->getTanggalaktapendirian(),
                $cs->getAktaperubahan(),
                $cs->getTanggalaktaperubahan(),
                $cs->getAktasusunanpengurus(),
                $cs->getTanggalaktasusunanpengurus(),     
                $cs->getCompany_email(),
				$cs->getGender(),		
                /* end added by ahmad riadi 06-01-2017 */
                $cs->getKKNumber(),
                //new for surabaya
                $cs->getNPPKP(),
                $cs->getNPWPName(),
                $cs->getNPWPKlu(),
                $cs->getNPWPKlasifikasiusaha(),
                $cs->getNPWPStatus(),
                $cs->getNPWPTarif(),
                $cs->getNPWPTarifno(),

                $proposed_by['user_email'], /*added by david*/
                
                $cs->getIdentitas_rt(),
                $cs->getIdentitas_rw(),
                $cs->getCompanyPic(),
                $cs->getMaritalStatusBaru(),
                $cs->getGeneral_pekerjaan_baru(),
                $cs->getGeneral_bidang_pekerjaan_baru()
                );

    
        return $row;
        
    }

    public function updateTmp(Erems_Models_Master_CustomerProfile $cs){
        
        $row = 0;
        if($cs->getId()==0 || !$cs->getAddBy()){
            return $row;
        }
        
      
    
        $row = $this->dbTable->SPUpdate('sp_customerb_tmp_update',
                $cs->getModiBy(),$cs->getId(),$cs->getCode(),$cs->getName(),$cs->getAddress(),$cs->getCity()->getId(),$cs->getZipCode(),$cs->getHomePhone(),$cs->getOfficePhone(),$cs->getMobilePhone(),$cs->getFax(),
                $cs->getKtp()->getNomor(),$cs->getKtp()->getName(),$cs->getKtp()->getAddress(),
                $cs->getNpwpNumber(),$cs->getBirthPlace(),$cs->getBirthDate(),$cs->getMaritalStatus(),$cs->getChildren(),$cs->getNationality(),
                $cs->getReligion()->getId(),
                // $cs->getPurpose()->getId(),
                $cs->getPurposeBuy()->getId(),
                $cs->getEducation()->getId(),$cs->getEmail(),
                $cs->getCompany()->getName(),$cs->getCompany()->getAddress(),$cs->getCompany()->getPhone(),$cs->getCompany()->getExtPhone(),$cs->getCompany()->getCity()->getId(),$cs->getCompany()->getZipCode(),$cs->getCompany()->getFax(),$cs->getCompany()->getPosition(),
                $cs->getEmergency()->getName(),$cs->getEmergency()->getAddress(),$cs->getEmergency()->getHomePhone(),$cs->getEmergency()->getMobilePhone(),$cs->getEmergency()->getFamilyStatus(),
                $cs->getUser()->getName(),$cs->getUser()->getPassword(),$cs->getPic(),$cs->getDescription(),$cs->getIsTemporary(),$cs->getNpwpAddress(),
              /* start added by ahmad riadi 06-01-2017 */
                $cs->getGeneral_gelar(),
                $cs->getGeneral_virtualaccount_no(),
                $cs->getGeneral_provinsi()->getId(),
                $cs->getGeneral_kecamatan(),
                $cs->getGeneral_kelurahan(),
                $cs->getGeneral_rt(),
                $cs->getGeneral_rw(),
                $cs->getGeneral_kewarganegaraan(),
                $cs->getGeneral_kodewna(),
                $cs->getGeneral_pekerjaan(),
                $cs->getIdentitas_documenttype()->getId(),
                $cs->getIdentitas_province()->getId(),
                $cs->getIdentitas_city()->getId(),
                $cs->getIdentitas_kecamatan(),
                $cs->getIdentitas_kelurahan(),
                $cs->getIdentitas_kodepos(),
                $cs->getBadanhukum(),
                $cs->getBentukusaha()->getId(),
                $cs->getBidangusaha(),
                $cs->getBilalain(),
                $cs->getInstrumentpembayaran()->getId(),
                $cs->getRekeningwakat_no(),
                $cs->getRinciantransaksi(),
                $cs->getSumberdana(),
                $cs->getRekeningtrans_no(),
                $cs->getNamawali(),
                $cs->getAktapendirian(),
                $cs->getTanggalaktapendirian(),
                $cs->getAktaperubahan(),
                $cs->getTanggalaktaperubahan(),
                $cs->getAktasusunanpengurus(),
                $cs->getTanggalaktasusunanpengurus(),     
                $cs->getCompany_email(),
                $cs->getGender(), 
                /* end added by ahmad riadi 06-01-2017 */
                $cs->getKKNumber(), /*added by david*/
                //new for surabaya
                $cs->getNPPKP(),
                $cs->getNPWPName(),
                $cs->getNPWPKlu(),
                $cs->getNPWPKlasifikasiusaha(),
                $cs->getNPWPStatus(),
                $cs->getNPWPTarif(),
                $cs->getNPWPTarifno(),
                $cs->getIdentitas_rt(),
                $cs->getIdentitas_rw(),
                $cs->getCompanyPic(),
                $cs->getMaritalStatusBaru(),
                $cs->getGeneral_pekerjaan_baru(),
                $cs->getGeneral_bidang_pekerjaan_baru()

                );
         
        return $row;
        
    }
    
    public function getById(Erems_Box_Models_App_HasilRequestRead $r){
        $id = (int) $r->getOthersValue("customer_id");
     
        $hasil = array();
        if($id==0){
            return $hasil;
        }
        $hasil = $this->dbTable->SPExecute('sp_customerdetail_read',$id);
        return $hasil;
    }
    
    public function directDelete(Erems_Box_Models_App_Decan $decan, Erems_Box_Kouti_InterSession $session) {
         $row = 0;
        $row = $this->dbTable->SPUpdate('sp_customerb_destroy', $decan->getString(), $session->getUserId());
      
        return $row;
    }

    public function isCustomerRevisionActive($sess){

        $hasil = $this->dbTable->SPExecute('sp_customerb_tmp_info_read', $sess["projectId"], $sess["ptId"]);

        if(isset($hasil[0][0])){
            $hasil = $hasil[0][0]["value"];
        }else{
            $hasil = 0;
        }

        return $hasil;
    }

    public function getNewRevisionId($customer_id){
        //lihat revisionid (customer_tmp_id) by customer_id
        //yang belum approve / belum reject
        $hasil = $this->dbTable->SPExecute('sp_customerb_tmp_id_read', $customer_id);
        if(isset($hasil[0][0])){
            $hasil = $hasil[0][0]["customer_tmp_id"];
        }else{
            $hasil = 0;
        }

        return $hasil;
    }
    
    public function getTotalDocumentByDocumentType($daftarTipeDokumen,$customerId){
       
        $hasil = $this->dbTable->SPExecute('sp_customerdocumentcheck_read',$customerId);
        return $hasil;
    }
    
    public function importexcel($dataimport,$projectId,$ptId,$userId){
        $row = 0;

//        var_dump($dataimport['A']);        die();
       // print_r($cs->getArrayTable());
       // die();
        $no_nup             = $dataimport[0];
        $nilai_nup          = $dataimport[1];
        $tipe               = $dataimport[2];
        $kewarganegaraan    = $dataimport[3];
        $code               = $dataimport[4];
        $nama               = $dataimport[5];
        $nama_bisnis        = $dataimport[6];
        $jenis_bisnis       = $dataimport[7];
        $bidang_bisnis      = $dataimport[8];
        $agama              = $dataimport[9];
        $tgl_lahir          = $dataimport[10];
        $telepon            = $dataimport[11];
        $hp                 = $dataimport[12];
        $kantor             = $dataimport[13];
        $fax                = $dataimport[14];
        $email              = $dataimport[15];
        $alamat             = $dataimport[16];
        $rt                 = $dataimport[17];
        $rw                 = $dataimport[18];
        $kelurahan          = $dataimport[19];
        $kecamatan          = $dataimport[20];
        $no_ktp             = $dataimport[21];
        $ktp_alamat         = $dataimport[22];
        $ktp_rt             = $dataimport[23];
        $ktp_rw             = $dataimport[24];
        $ktp_kelurahan      = $dataimport[25];
        $ktp_kecamatan      = $dataimport[26];
        $alamat_kantor      = $dataimport[27];
        $tempat_lahir       = $dataimport[28];
        $npwp               = $dataimport[29];
        $alamat_npwp        = $dataimport[30];
        $pekerjaan          = $dataimport[31];
        $status_marital     = $dataimport[32];
        $nama_agent         = $dataimport[33];
        $nama_refferator    = $dataimport[34];
        
        
        $tipe_code = strtoupper($tipe) == 'PERORANGAN' ? '0' : '1';
        $addre = str_replace("'", "''", $alamat);
        $name = str_replace("'", "''", $nama);
       
        $ktp = str_replace("'", "''", $ktp_alamat); 
        
        $cek_data = $this->dbTable->SPExecute('sp_customerb_import_read',
                    $userId,
                    $projectId,
                    $ptId,
                    trim($no_ktp)
                    );
        
           
        if ($cek_data[0][0]['data'] > 0) {
           $msg['data'] = trim($no_ktp);
           $msg['status'] = 1;
        } else {
//           $sp_use = 'sp_customerb_import_create';
           
           $hasil = $this->dbTable->SPExecute('sp_customerb_import_create',
                $userId,
                $projectId,
                $ptId,
                $no_nup,
                $nilai_nup,
                $tipe_code,
                $kewarganegaraan,
                $code,
                $name,
                $nama_bisnis,
                $jenis_bisnis,
                $bidang_bisnis,
                $agama,
                $tgl_lahir,
                $telepon,
                $hp,
                $kantor,
                $fax,
                $email,
                $addre,
                $rt,
                $rw,
                $kelurahan,
                $kecamatan,
                trim($no_ktp),
                $ktp,
                $ktp_rt,
                $ktp_rw,
                $ktp_kelurahan,
                $ktp_kecamatan,
                $alamat_kantor,
                $tempat_lahir,
                $npwp,
                $alamat_npwp,
                $pekerjaan,
                $status_marital,
                $nama_agent,
                $nama_refferator
                );
           
            if ($hasil[0][0]['inserted_id'] > 0) {
                $msg['data'] = '';
                $msg['status'] = 0;
            } 
        }
        
//         var_dump($msg); die();
         

        return $msg;        
    }
    
    public function getMoreCustomer(Erems_Box_Models_App_HasilRequestRead $r,  Erems_Box_Models_App_Session $ses){
        $hasil = array();    

        $hasil = $this->dbTable->SPExecute('sp_morecustomer_read',
                $ses->getProject()->getId(),
                $ses->getPt()->getId(),
                $r->getOthersValue("purchaseletter_id"),
                $r->getPage(),
                $r->getLimit()
                );
        $return['totalRow'] = $hasil[0][0]['totalRow'];
        $return['data'] = $hasil[1];	
        $return['success'] = $hasil[0]>0;
        return $return; 
    }
     
}
?>
