<?php

/**
 * Description of OpportunitycustomerDao
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Master_OpportunitycustomerDao extends Erems_Box_Models_App_AbDao implements Erems_Box_Models_App_BlackHole{
    public function getAll(Erems_Box_Models_App_Session $ses){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_opportunitycustomer_read',$ses->getProject()->getId(),$ses->getPt()->getId());
      
        return $hasil; 
    }

    
    public function getAllByFilter(Erems_Box_Models_App_HasilRequestRead $r,  Erems_Box_Models_App_Session $ses){
        $hasil = array();
      

        $hasil = $this->dbTable->SPExecute('sp_opportunitycustomer_read',
                $ses->getProject()->getId(),
                $ses->getPt()->getId(),
                $r->getOthersValue("code"),
                $r->getOthersValue("name"),
                $r->getOthersValue("birthdate"),
                $r->getOthersValue("address"),
                $r->getOthersValue("mobile_phone"),
                $r->getOthersValue("home_phone"),
                $ses->getUser()->getId()
                // ,$r->getPage()
                // ,$r->getLimit()
            );
        
        return $hasil; 
    }
    
    public function getAllNoFilter(Erems_Box_Models_App_HasilRequestRead $r,  Erems_Box_Models_App_Session $ses){
        $hasil = array();
      
       
        
        $hasil = $this->dbTable->SPExecute('sp_opportunitycustomer_read',
                $ses->getProject()->getId(),
                $ses->getPt()->getId(),
                $r->getOthersValue("code"),
                $r->getOthersValue("name"),
                $r->getOthersValue("birthdate"),
                $r->getOthersValue("address"),
                $r->getOthersValue("mobile_phone"),
                $r->getOthersValue("home_phone"),
                $ses->getUser()->getId()
                // ,1
                // ,999999
            );
      
        return $hasil; 
    }

    public function phoneExist(Erems_Models_Master_OpportunityCustomer $r, Erems_Box_Models_App_Session $ses) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_opportunitycustomerexist_read',
                $ses->getProject()->getId(),
                $ses->getPt()->getId(),
                $r->getHomePhone(),
                $r->getMobilePhone(),
                $r->getOfficePhone(),
                $r->getHomePhone2(),
                $r->getMobilePhone2()                
                );
        return $hasil; 
    } 
    
    public function save(Erems_Models_Master_OpportunityCustomer $cs){
        $row = 0;
       
        if(!$cs->getAddBy()){
            return $row;
        }
       
        $row = $this->dbTable->SPCreate('sp_opportunitycustomer_create',
                $cs->getAddBy(),$cs->getProject()->getId(),$cs->getPt()->getId(),$cs->getCode(),$cs->getName(),$cs->getAddress(),$cs->getCity()->getId(),$cs->getZipCode(),$cs->getHomePhone(),$cs->getOfficePhone(),$cs->getMobilePhone(),$cs->getFax(),
                $cs->getKtp()->getNomor(),$cs->getKtp()->getName(),$cs->getKtp()->getAddress(),
                $cs->getNpwpNumber(),$cs->getBirthPlace(),$cs->getBirthDate(),$cs->getMaritalStatus(),$cs->getChildren(),$cs->getNationality(),
                $cs->getReligion()->getId(),
                $cs->getPurpose()->getId(),$cs->getEducation()->getId(),$cs->getEmail(),
                $cs->getCompany()->getName(),$cs->getCompany()->getAddress(),$cs->getCompany()->getPhone(),$cs->getCompany()->getExtPhone(),$cs->getCompany()->getCity()->getId(),$cs->getCompany()->getZipCode(),$cs->getCompany()->getFax(),$cs->getCompany()->getPosition(),
                $cs->getEmergency()->getName(),$cs->getEmergency()->getAddress(),$cs->getEmergency()->getHomePhone(),$cs->getEmergency()->getMobilePhone(),$cs->getEmergency()->getFamilyStatus(),
                $cs->getUser()->getName(),$cs->getUser()->getPassword(),$cs->getPic(),$cs->getDescription(),$cs->getDownline(),$cs->getHomePhone2(),$cs->getMobilePhone2());
      // $this->dbTable->printDbError();
        
        
   
        return $row;
        
    }
    
    public function update(Erems_Models_Master_OpportunityCustomer $cs){
        $row = 0;
        if($cs->getId()==0 || !$cs->getAddBy()){
            return $row;
        }
    
        $row = $this->dbTable->SPUpdate('sp_opportunitycustomer_update',
                $cs->getModiBy(),$cs->getId(),$cs->getCode(),$cs->getName(),$cs->getAddress(),$cs->getCity()->getId(),$cs->getZipCode(),$cs->getHomePhone(),$cs->getOfficePhone(),$cs->getMobilePhone(),$cs->getFax(),
                $cs->getKtp()->getNomor(),$cs->getKtp()->getName(),$cs->getKtp()->getAddress(),
                $cs->getNpwpNumber(),$cs->getBirthPlace(),$cs->getBirthDate(),$cs->getMaritalStatus(),$cs->getChildren(),$cs->getNationality(),
                $cs->getReligion()->getId(),
                $cs->getPurpose()->getId(),$cs->getEducation()->getId(),$cs->getEmail(),
                $cs->getCompany()->getName(),$cs->getCompany()->getAddress(),$cs->getCompany()->getPhone(),$cs->getCompany()->getExtPhone(),$cs->getCompany()->getCity()->getId(),$cs->getCompany()->getZipCode(),$cs->getCompany()->getFax(),$cs->getCompany()->getPosition(),
                $cs->getEmergency()->getName(),$cs->getEmergency()->getAddress(),$cs->getEmergency()->getHomePhone(),$cs->getEmergency()->getMobilePhone(),$cs->getEmergency()->getFamilyStatus(),
                $cs->getUser()->getName(),$cs->getUser()->getPassword(),$cs->getPic(),$cs->getDescription(),$cs->getDownline());
         
        return $row;
        
    }
    
    public function getById(Erems_Box_Models_App_HasilRequestRead $r){
        $id = (int) $r->getOthersValue("opportunitycustomer_id");
     
        $hasil = array();
        if($id==0){
            return $hasil;
        }
        $hasil = $this->dbTable->SPExecute('sp_opportunitycustomerdetail_read',$id);
        return $hasil;
    }
    
    public function directDelete(\Erems_Box_Models_App_Decan $decan, \Erems_Box_Kouti_InterSession $session) {
         $row = 0;
        $row = $this->dbTable->SPUpdate('sp_opportunitycustomer_destroy', $decan->getString(), $session->getUserId());
      
        return $row;
    }
}
