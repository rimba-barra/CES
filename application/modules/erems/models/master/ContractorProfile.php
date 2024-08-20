<?php

/**
 * Description of ContractorProfile
 *
 * @author MIS
 */
class Erems_Models_Master_ContractorProfile extends Erems_Models_Master_Contractor {
    private $profile;
    /* @PIC*/
    private $pic;
    private $npwp;
    
    public function __construct() {
        parent::__construct();
        $this->profile = new Erems_Models_Master_Profile();
    }
    
    public function getProfile() {
        if(!$this->profile){
            $this->profile = new Erems_Models_Master_Profile();    
        }
        return $this->profile;
        
    }

    public function setProfile(Erems_Models_Master_Profile $profile) {
        
        $this->profile = $profile;
    }

    public function getPic() {
        return $this->pic;
    }

    public function setPic($pic) {
        $this->pic = $pic;
    }

      public function getNpwp() {
        return $this->npwp;
    }

    public function setNpwp($npwp) {
        $this->npwp = $npwp;
    }
    
    public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['address'])){
           $this->getProfile()->setAddress($x['address']); 
        }
        if(isset ($x['telp'])){
           $this->getProfile()->setTelp($x['telp']); 
        }
        if(isset ($x['fax'])){
           $this->getProfile()->setFax($x['fax']); 
        }
        if(isset ($x['email'])){
           $this->getProfile()->setEmail($x['email']); 
        }
        if(isset ($x['kodepos'])){
           $this->getProfile()->setKodepos($x['kodepos']); 
        }
        if(isset ($x['PIC'])){
           $this->setPic($x['PIC']); 
        }
         if(isset ($x['npwp'])){
           $this->setNpwp($x['npwp']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
        $x = parent::getArrayTable();
        $y = array(
            'address'=>$this->getProfile()->getAddress(),
            'telp'=>$this->getProfile()->getTelp(),
            'fax'=>$this->getProfile()->getFax(),
            'email'=>$this->getProfile()->getEmail(),
            'kodepos'=>$this->getProfile()->getKodepos(),
            'PIC'=>$this->getPic(),
            'npwp'=>$this->getNpwp()
        );
        $x = array_merge($x,$y);
        return $x;
    }

 
}

?>
