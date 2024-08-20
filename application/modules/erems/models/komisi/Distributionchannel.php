<?php

/**
 * Description of distributionchannel
 *
 * @author MIS
 */
class Erems_Models_Komisi_Distributionchannel extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora,Erems_Box_Models_Master_InterProjectPt {
    private $code;
    private $name;
    private $description;
    private $project;
    private $pt;
    private $Addon;
    private $user_name;
    private $modi_user_name;
    private $Modion;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "komisi_distributionchannel_";
    }
    
    public function getCode() {
        return $this->code;
    }

    public function setCode($code) {
        $this->code = $code;
    }

    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function getDescription() {
        return $this->description;
    }

    public function setDescription($description) {
        $this->description = $description;
    }
    
    public function getProject() {
        if(!$this->project){
            $this->project = new Erems_Box_Models_Master_Project();
        }
        return $this->project;
    }

    public function setProject(Erems_Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function getPt() {
        if(!$this->pt){
            $this->pt = new Erems_Box_Models_Master_Pt();
        }
        return $this->pt;
    }

    public function setPt(Erems_Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    public function getAddon() {
        return $this->Addon;
    }

    public function setAddon($Addon) {
        $this->Addon = $Addon;
    }

    public function getuser_name() {
        return $this->user_name;
    }

    public function setuser_name($user_name) {
        $this->user_name = $user_name;
    }

    public function getmodi_user_name() {
        return $this->modi_user_name;
    }

    public function setmodi_user_name($modi_user_name) {
        $this->modi_user_name = $modi_user_name;
    }

    public function getModion() {
        return $this->Modion;
    }

    public function setModion($Modion) {
        $this->Modion = $Modion;
    }

        
     public function setArrayTable($dataArray=NULL) {
 
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
  
        if(isset ($x['komisi_distributionchannel_id'])){
           $this->setId($x['komisi_distributionchannel_id']); 
        }
        if(isset ($x['code'])){
           $this->setCode($x['code']); 
        }
        if(isset ($x['distributionchannel'])){
           $this->setName($x['distributionchannel']); 
        }
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
        if(isset ($x['Addon'])){
           $this->setAddon($x['Addon']); 
        }
        if(isset ($x['user_name'])){
           $this->setuser_name($x['user_name']); 
        }
        if(isset ($x['Modion'])){
           $this->setModion($x['Modion']); 
        }
        if(isset ($x['modi_user_name'])){
           $this->setmodi_user_name($x['modi_user_name']); 
        }
        unset($x);
        
       
        
    }
    
    public function getArrayTable(){
        $x = array(
            "komisi_distributionchannel_id"=>$this->getId(),
            "code"=>$this->getCode(),
            "distributionchannel"=>$this->getName(),
            "description"=>$this->getDescription(),
            'Addon'=>$this->getAddon(),
            'user_name'=>$this->getuser_name(),
            'Modion'=>$this->getModion(),
            'modi_user_name'=>$this->getmodi_user_name()
        );
      
        return $x;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }
    
    


}

?>
