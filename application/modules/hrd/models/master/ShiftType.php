<?php

/**
 * Description of ShiftType
 *
 * @author MIS
 */
class Hrd_Models_Master_ShiftType extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,Box_Models_Master_InterProjectPt  {
    private $code;
    private $name;
    private $inTime;
    private $outTime;
    private $holyday;
    private $unStatus;
    private $outAfterTime;
    private $differentDay;
    private $project;
    private $pt;
    private $is_flexi; // yang pakai baru SH3A

    //added by anas 18112021
    private $is_mod;

    //added by mike 21/04/2022
    private $is_teams;
    private $is_ess;

    //added by mike 24/08/2022
    private $is_auto;

    //added by mike 14/04/2023
    private $is_flexi_kpsh3b;
    private $total_jam;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "shifttype_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['shifttype_id'])){
           $this->setId($x['shifttype_id']); 
        }
        if(isset ($x['shifttype'])){
           $this->setName($x['shifttype']); 
        }
        if(isset ($x['code'])){
           $this->setCode($x['code']); 
        }
        if(isset ($x['in_time'])){
           $this->setInTime($x['in_time']); 
        }
        if(isset ($x['out_time'])){
           $this->setOutTime($x['out_time']); 
        }
        if(isset ($x['holyday'])){
           $this->setHolyday($x['holyday']); 
        }
        if(isset ($x['unstatus'])){
           $this->setUnStatus($x['unstatus']); 
        }
        if(isset ($x['outafter_time'])){
           $this->setOutAfterTime($x['outafter_time']); 
        }
        if(isset ($x['different_day'])){
           $this->setDifferentDay($x['different_day']); 
        }
        if(isset ($x['is_flexi'])){
           $this->setIsFlexi($x['is_flexi']); 
        }

        //added by anas 18112021
        if(isset ($x['is_mod'])){
           $this->setIsMod($x['is_mod']); 
        } 

        //added by mike 21/04/2022      
        if(isset ($x['is_teams'])){
           $this->setIsTeams($x['is_teams']); 
        } 
        if(isset ($x['is_ess'])){
           $this->setIsEss($x['is_ess']); 
        } 

        //added by mike 24/08/2022      
        if(isset ($x['is_auto'])){
           $this->setIsAuto($x['is_auto']); 
        } 

        //added by mike 14/04/2023
        if(isset ($x['is_flexi_kpsh3b'])){
           $this->setIsFlexiKpsh3b($x['is_flexi_kpsh3b']); 
        } 
        if(isset ($x['total_jam'])){
           $this->setTotaljam($x['total_jam']); 
        } 
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'shifttype_id'=>$this->getId(),
            'shifttype'=>$this->getName(),
            'code'=>$this->getCode(),
            'in_time'=>$this->getInTime(),
            'out_time'=>$this->getOutTime(),
            'holyday'=>$this->getHolyday(),
            'unstatus'=>$this->getUnStatus(),
            'outafter_time'=>$this->getOutAfterTime(),
            'different_day'=>$this->getDifferentDay(),
            'is_flexi'=>$this->getIsFlexi(),

            //added by anas 18112021
            'is_mod'=>$this->getIsMod(),

            //added by mike 21/04/2022
            'is_teams'=>$this->getIsTeams(),
            'is_ess'=>$this->getIsEss(),

            //added by mike 24/08/2022
            'is_auto'=>$this->getIsAuto(),

            //added by mike 14/04/2023
            'is_flexi_kpsh3b'=>$this->getIsFlexiKpsh3b(),
            'total_jam'=>$this->getTotaljam()
        );
      
        return $x;
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

    public function getInTime() {
        return $this->inTime;
    }

    public function setInTime($inTime) {
        $this->inTime = $inTime;
    }

    public function getOutTime() {
        return $this->outTime;
    }

    public function setOutTime($outTime) {
        $this->outTime = $outTime;
    }

    public function getHolyday() {
        return $this->holyday;
    }

    public function setHolyday($holyDay) {
        $this->holyday = $holyDay;
    }

    public function getUnStatus() {
        return (int)$this->unStatus;
    }

    public function setUnStatus($unStatus) {
        if($unStatus=="on"){
            $unStatus = 1;
        }
        $this->unStatus = (int)$unStatus;
    }

    public function getOutAfterTime() {
        return $this->outAfterTime;
    }

    public function setOutAfterTime($outAfterTime) {
        $this->outAfterTime = $outAfterTime;
    }

    public function getDifferentDay() {
        return $this->differentDay;
    }

    public function setDifferentDay($differentDay) {
        $this->differentDay = $differentDay;
    }

    public function getIsFlexi() {
        return $this->is_flexi;
    }
    
    public function setIsFlexi($is_flexi) {
        $this->is_flexi = $is_flexi;
    }

    //added by anas 18112021
    public function getIsMod() {
        return $this->is_mod;
    }
    
    public function setIsMod($is_mod) {
        $this->is_mod = $is_mod;
    }
    //end added by anas  

    //added by mike 21/04/2022
    public function getIsTeams() {
        return $this->is_teams;
    }
    
    public function setIsTeams($is_teams) {
        $this->is_teams = $is_teams;
    }
    public function getIsEss() {
        return $this->is_ess;
    }
    
    public function setIsEss($is_ess) {
        $this->is_ess = $is_ess;
    }
    //end added by mike   

    //added by mike 24/08/2022
    public function getIsAuto() {
        return $this->is_auto;
    }
    
    public function setIsAuto($is_auto) {
        $this->is_auto = $is_auto;
    }
    //end added by mike 

    //added by mike 14/04/2023
    public function getIsFlexiKpsh3b() {
        return $this->is_flexi_kpsh3b;
    }
    
    public function setIsFlexiKpsh3b($is_flexi_kpsh3b) {
        $this->is_flexi_kpsh3b = $is_flexi_kpsh3b;
    }

    public function getTotaljam() {
        return $this->total_jam;
    }
    
    public function setTotaljam($total_jam) {
        $this->total_jam = $total_jam;
    }
    //end added by mike    
    
    

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }

    public function getProject() {
        if(!$this->project){
            $this->project = new Box_Models_Master_Project();
        }
        return $this->project;
    }

    public function getPt() {
        if(!$this->pt){
            $this->pt = new Box_Models_Master_Pt();
        }
        return $this->pt;
    }

    public function setProject(\Box_Models_Master_Project $project) {
        $this->project = $project;
        
    }

    public function setPt(\Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

}

?>
