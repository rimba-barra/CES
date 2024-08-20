<?php
/**
 * Description of ClusterB
 *
 * @author MIS
 */
class Erems_Models_Master_Side extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora,  Erems_Box_Models_Master_InterProjectPt {
    private $name;
    private $project;
    private $pt;
    private $code;
    private $description;
    private $Addon;
    private $user_user_fullname;
    private $usermodi_user_fullname;
    private $Modion;
    
    public function __construct($embedPrefix=NULL) {
        parent::__construct();
    
        $this->embedPrefix = $embedPrefix==NULL?'side_':$embedPrefix;
    }
    
    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
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


    public function getCode() {
        return $this->code;
    }

    public function setCode($code) {
        $this->code = $code;
    }

    public function getDescription() {
        return $this->description;
    }

    public function setDescription($description) {
        $this->description = $description;
    }

    public function getAddon() {
        return $this->Addon;
    }

    public function setAddon($Addon) {
        $this->Addon = $Addon;
    }

    public function getuser_user_fullname() {
        return $this->user_user_fullname;
    }

    public function setuser_user_fullname($user_user_fullname) {
        $this->user_user_fullname = $user_user_fullname;
    }

    public function getusermodi_user_fullname() {
        return $this->usermodi_user_fullname;
    }

    public function setusermodi_user_fullname($usermodi_user_fullname) {
        $this->usermodi_user_fullname = $usermodi_user_fullname;
    }

    public function getModion() {
        return $this->Modion;
    }

    public function setModion($Modion) {
        $this->Modion = $Modion;
    }

   

        
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['side_id'])){
           $this->setId($x['side_id']); 
        }
        if(isset ($x['code'])){
           $this->setCode($x['code']); 
        }
        if(isset ($x['side'])){
           $this->setName($x['side']); 
        }
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
        if(isset ($x['Addon'])){
           $this->setAddon($x['Addon']); 
        }
        if(isset ($x['user_user_fullname'])){
           $this->setuser_user_fullname($x['user_user_fullname']); 
        }
        if(isset ($x['Modion'])){
           $this->setModion($x['Modion']); 
        }
        if(isset ($x['usermodi_user_fullname'])){
           $this->setusermodi_user_fullname($x['usermodi_user_fullname']); 
        }
      
        unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'side_id'=>$this->getId(),
            'code'=>$this->getCode(),
            'side'=>$this->getName(),
            'description'=>$this->getDescription(),
            'Addon'=>$this->getAddon(),
            'user_user_fullname'=>$this->getuser_user_fullname(),
            'Modion'=>$this->getModion(),
            'usermodi_user_fullname'=>$this->getusermodi_user_fullname()
            
        );
        
        return $x;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getProject(),$this->getPt());
    }

    

}

?>
