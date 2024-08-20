<?php

/**
 * Description of CustomerrevisionDao
 *
 * @author MIS
 */
class Erems_Models_Master_CustomerrevisionDao extends Erems_Box_Models_App_AbDao implements Erems_Box_Models_App_BlackHole {
    
    
    
    public function getAll(Erems_Box_Models_App_Session $ses){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_customerb_tmp_read',$ses->getProject()->getId(),$ses->getPt()->getId());
        return $hasil; 
    }

    public function getAllByFilter(Erems_Box_Models_App_HasilRequestRead $r,  Erems_Box_Models_App_Session $ses){
        $hasil = array();   
        $hasil = $this->dbTable->SPExecute('sp_customerb_tmp_read',
                $ses->getProject()->getId(),
                $ses->getPt()->getId(),
                $r->getOthersValue("customer_id"),
                $r->getOthersValue("code"),
                $r->getOthersValue("name"),
                $r->getOthersValue("birthdate"),
                $r->getPage(),
                $r->getLimit(),
                $r->getOthersValue("address"),
                $r->getOthersValue("mobile_phone"),
                $r->getOthersValue("home_phone"))
        ;
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
                   
        $row = $this->dbTable->SPCreate('sp_customerb_tmp_create',
                $cs->getAddBy(),$cs->getProject()->getId(),$cs->getPt()->getId(),$cs->getCode(),$cs->getName(),$cs->getAddress(),$cs->getCity()->getId(),$cs->getZipCode(),$cs->getHomePhone(),$cs->getOfficePhone(),$cs->getMobilePhone(),$cs->getFax(),
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
                null,
                $cs->getIdentitas_rt(),
                $cs->getIdentitas_rw(),
                $cs->getCompanyPic(),
                $cs->getMaritalStatusBaru(),
                $cs->getGeneral_pekerjaan_baru(),
                $cs->getGeneral_bidang_pekerjaan_baru()
                );
      // $this->dbTable->printDbError();
        
      
        
   
        return $row;
        
    }
    
    public function update(Erems_Models_Master_CustomerProfile $cs){
        
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

    public function approve(Erems_Models_Master_CustomerProfile $cs, $customer_tmp_id){
        
        $row = 0;

        if($cs->getId()==0 || !$cs->getAddBy()){
            return $row;
        }

        //Get detail address
        $daoAddr = new Erems_Models_Master_CustomerAddressDao(); 
        $hasil = $daoAddr->getAllByCustomerWOPLTmp($cs->getId());
        $totalRow = $hasil[0][0]['totalRow']; 

        if($totalRow>0){

            /*Destroy terlebih dulu*/

            $row = $this->dbTable->SPUpdate('sp_customeraddress_multi_destroy',
                        $cs->getId(),
                        $cs->getAddBy());
     

            foreach ($hasil[1] as $h) {
                //insert ke mastercustomeraddress

                $row = $this->dbTable->SPUpdate('sp_customeraddress_create',
                        $h['Addby'],
                        $h['customer_id'],
                        $h['address'],
                        $h['is_default'] );   
                 /*Set Approve*/
                 $row = $this->dbTable->SPUpdate('sp_customeraddress_tmp_update',
                        $h['Addby'],
                        $h['customeraddress_id'],
                        $h['address'],
                        $h['is_default'], 1, $h['Addby'], 0, 0, date("Y-m-d H:i:s"), null);
             
            }
        }

        //Get detail documents
        $daoDoc = new Erems_Models_Master_CustomerDocumentDao(); 
        $hasil = $daoDoc->getAllByCustomerWOPLTmp($cs->getId());
        $totalRow = $hasil[0][0]['totalRow']; 

        if($totalRow>0){

            $row = $this->dbTable->SPUpdate('sp_customerdocument_multi_destroy',
                        $cs->getId(),
                        $cs->getAddBy());

            foreach ($hasil[1] as $h) {

                //insert ke mastercustomeraddress
                $row = $this->dbTable->SPUpdate('sp_customerdocument_create',
                        $h['Addby'],
                        $h['customer_id'],
                        $h['documenttype_id'],
                        $h['filename'],
                        $h['description']);
                /*Set Approve*/
                $row = $this->dbTable->SPUpdate('sp_customerdocument_tmp_update',
                        $h['Addby'],
                        $h['customerdocument_id'],
                        $h['documenttype_id'],
                        $h['filename'],
                        $h['description'], 1, $h['Addby'], 0, 0, date("Y-m-d H:i:s"), null);
            }
        }

        //update ke sp_customerb_update
        $row = $this->dbTable->SPUpdate('sp_customerb_update',
                $cs->getAddBy(),$cs->getId(),$cs->getCode(),$cs->getName(),$cs->getAddress(),
                
                //updated by anas 27012021
                // $cs->getCity()->getId(), 
                $cs->getCityId(),
                //end updated

                $cs->getZipCode(),$cs->getHomePhone(),$cs->getOfficePhone(),$cs->getMobilePhone(),$cs->getFax(),
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

        //update ke sp_customerb_tmp_update
        $row = $this->dbTable->SPUpdate('sp_customerb_tmp_update',
                $cs->getAddBy(),$customer_tmp_id,$cs->getCode(),$cs->getName(),$cs->getAddress(),

                //updated by anas 27012021
                // $cs->getCity()->getId(), 
                $cs->getCityId(),
                //end updated

                $cs->getZipCode(),$cs->getHomePhone(),$cs->getOfficePhone(),$cs->getMobilePhone(),$cs->getFax(),
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
                $cs->getGender(), $cs->getKKNumber(), /*added by david*/ 

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
                $cs->getGeneral_bidang_pekerjaan_baru(),

                date("Y-m-d H:i:s") , 1, $cs->getAddBy(), /*aproval date, true, by*/ 
                null, 0, null /*Reject date, false, by*/
                /* end added by ahmad riadi 06-01-2017 */

                );

        return $row;
        
    }
    public function reject(Erems_Models_Master_CustomerProfile $cs, $customer_tmp_id){
        
        $row = 0;

        if($cs->getId()==0 || !$cs->getAddBy()){
            return $row;
        }

        //Get detail address
        $daoAddr = new Erems_Models_Master_CustomerAddressDao(); 
        $hasil = $daoAddr->getAllByCustomerWOPLTmp($cs->getId());
        $totalRow = $hasil[0][0]['totalRow']; 

        if($totalRow>0){

            foreach ($hasil[1] as $h) {
                 /*Set Reject*/
                 $row = $this->dbTable->SPUpdate('sp_customeraddress_tmp_update',
                        $h['Addby'],
                        $h['customeraddress_id'],
                        $h['address'],
                        $h['is_default'], 0, 0, 1, $h['Addby'], null, $cs->getCurrentuserdate());
             
            }
        }

        //Get detail documents
        $daoDoc = new Erems_Models_Master_CustomerDocumentDao(); 
        $hasil = $daoDoc->getAllByCustomerWOPLTmp($cs->getId());
        $totalRow = $hasil[0][0]['totalRow']; 

        if($totalRow>0){

            foreach ($hasil[1] as $h) {
                /*Set Reject*/
                $row = $this->dbTable->SPUpdate('sp_customerdocument_tmp_update',
                        $h['Addby'],
                        $h['customerdocument_id'],
                        $h['documenttype_id'],
                        $h['filename'],
                        $h['description'], 0, 0, 1, $h['Addby'], null, $cs->getCurrentuserdate());
            }
        }

        //update ke sp_customerb_tmp_update
        $row = $this->dbTable->SPUpdate('sp_customerb_tmp_update',
                $cs->getAddBy(),$customer_tmp_id,$cs->getCode(),$cs->getName(),$cs->getAddress(),

                //updated by anas 27012021
                // $cs->getCity()->getId(), 
                $cs->getCityId(),
                //end updated

                $cs->getZipCode(),$cs->getHomePhone(),$cs->getOfficePhone(),$cs->getMobilePhone(),$cs->getFax(),
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
                $cs->getGender(), $cs->getKKNumber(),

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
                $cs->getGeneral_bidang_pekerjaan_baru(),

                 /*added by david*/ 
                null, 0, null, /*aproval date, false, by*/ 
                $cs->getCurrentuserdate() , 1, $cs->getAddBy()
                /* end added by ahmad riadi 06-01-2017 */

                );

        return $row;
        
    }
    
    public function getById($customer_tmp_id){
        $id = (int) $customer_tmp_id;
     
        $hasil = array();
        if($id==0){
            return $hasil;
        }
        $hasil = $this->dbTable->SPExecute('sp_customerdetail_tmp_read',$id);
        return $hasil;
    }
    
    public function directDelete(\Erems_Box_Models_App_Decan $decan, \Erems_Box_Kouti_InterSession $session) {
         $row = 0;

        $row = $this->dbTable->SPUpdate('sp_customerb_tmp_destroy', $decan->getString(), $session->getUserId());
      
        return $row;
    }

    public function getNewRevisionId($customer_id){
        //lihat revisionid (customer_tmp_id) by customer_id
        $hasil = $this->dbTable->SPExecute('sp_customerb_tmp_id_read', $customer_id);
        if(isset($hasil[0][0])){
            $hasil = $hasil[0][0]["customer_tmp_id"];
        }else{
            $hasil = 0;
        }
        return $hasil;
    }

     
}

?>
