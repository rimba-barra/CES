<?php


/**
 * Description of ContractorDao
 *
 * @author MIS
 */
class Erems_Models_Master_ContractorDao extends Erems_Box_Models_App_AbDao implements Erems_Box_Models_App_BlackHole {
    
    
    private $ses;
	 /* start added by ahmad riadi 29-12-2016 */
    protected $session;
    protected $project_id;
    protected $pt_id;
    /* end added by ahmad riadi 29-12-2016 */
	
	/* start added by ahmad riadi 04-01-2017*/
    public function __construct() {
         $this->dbTable = new Erems_Models_Dbtable_Db();
         /* start added by ahmad riadi 29-12-2016 */
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->project_id = $this->session->getCurrentProjectId();
        $this->pt_id = $this->session->getCurrentPtId();
         /* end added by ahmad riadi 29-12-2016 */     
    }
    /* end added by ahmad riadi 04-01-2017*/
    
    public function getSes() {
        return $this->ses;
    }

    public function setSes($ses) {
        $this->ses = $ses;
    }

        
    public function getById(Erems_Models_Master_Contractor $ct){

        $hasil = array();
        if($ct->getId()==0){
            return $hasil;
        }
        $hasil = $this->dbTable->SPExecute('sp_contractorprofile_read',$ct->getId());
        return $hasil; 
    }
	 /* start added by ahmad riadi 04-01-2017*/
    public function getByCode(Erems_Models_Master_Contractor $ct){
        $hasil = array();       
        $hasil = $this->dbTable->SPExecute('sp_contractorprofilebycode_read',$ct->getCode(),$this->project_id,$this->pt_id);
        return $hasil; 
    }
     /* end added by ahmad riadi 04-01-2017*/
    
    public function getAll(Erems_Box_Models_App_HasilRequestRead $r,Erems_Models_Master_Contractor $ct){
        $hasil = array();

        $hasil = $this->dbTable->SPExecute('sp_contractorsimple_read',$r->getPage(),$r->getLimit(),(int)$r->getOthersValue("country_country_id"),(int)$r->getOthersValue("city_city_id"),
                $r->getOthersValue("code"),$r->getOthersValue("contractorname"),$r->getOthersValue("address"),
                $r->getOthersValue("PIC"),$ct->getProject()->getId(),$ct->getPt()->getId());
        return $hasil; 
    }
    
    public function save(Erems_Models_Master_ContractorProfile $pc){
        $hasil = 0;
        $profile = $pc->getProfile();
        
        if($profile instanceof Erems_Models_Master_Profile){
            $hasil = $this->dbTable->SPUpdate('sp_contractorb_create',$pc->getCode(),$pc->getName(),
                $profile->getAddress(),$profile->getTelp(),$profile->getFax(),$profile->getEmail(),
                    $pc->getPic(),$pc->getCity()->getId(),$profile->getKodepos(),
                    $pc->getCountry()->getId(),
                    $pc->getNpwp(),
                    $pc->getAddBy(),$pc->getProject()->getId(),$pc->getPt()->getId());
        }
     
        return $hasil;
    }
    
    public function codeExist(Erems_Models_Master_ContractorProfile $ft,  Erems_Box_Models_App_Session $ses){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_contractorcodeexist_read',$ft->getCode(),$ses->getProject()->getId(),$ses->getPt()->getId());
        
        return $hasil;
    }

     public function npwpExist(Erems_Models_Master_ContractorProfile $ft,  Erems_Box_Models_App_Session $ses){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_contractornpwpexist_read',$ft->getNpwp(),$ses->getProject()->getId(),$ses->getPt()->getId());
        
        return $hasil;
    }
    
    //sp_projectfacilitiestcodeexist_read
    
    public function update(Erems_Models_Master_ContractorProfile $pc){
        $hasil = 0;
        
        $profile = $pc->getProfile();
        
        if($profile instanceof Erems_Models_Master_Profile){
            $hasil = $this->dbTable->SPUpdate('sp_contractorb_update',
                    $pc->getId(),$pc->getCode(),$pc->getName(),$profile->getAddress(),
                    $profile->getTelp(),$profile->getFax(),$profile->getEmail(),
                    $pc->getCity()->getId(),$profile->getKodepos(),$pc->getCountry()->getId(),
                    $pc->getNpwp(),
                    $pc->getPic(),$pc->getAddBy());
        }            
    
        return $hasil;
    }

    public function directDelete(\Erems_Box_Models_App_Decan $decan, \Erems_Box_Kouti_InterSession $session) {
        $row = 0;
        $checkUsed = $this->dbTable->SPExecute('sp_contractor_checkUsed', $decan->getString(), $session->getUserId());

        if(count($checkUsed[0]) == 0 ){
            $row = $this->dbTable->SPExecute('sp_contractor_destroy', $decan->getString(), $session->getUserId());
        }

        return $row;
    }
}

?>