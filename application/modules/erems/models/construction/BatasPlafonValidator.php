<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of BatasPlafonValidator
 *
 * @author MIS
 */
class Erems_Models_Construction_BatasPlafonValidator extends Erems_Box_Models_App_Validator {
    private $ses;

    public function setSession($session){
        $this->ses = $session;
    }
    
    public function run(Erems_Models_Construction_BatasPlafon $pl){
        $msg = "";
        
        $pl->setProject($this->ses->getProject());
        $pl->setpt($this->ses->getPt());
        $dao = new Erems_Models_Construction_BatasPlafonDao();
        $codeExist = $dao->codeExist($pl);     
        
        $percentExist = $dao->percentExist($pl);
    
        $idExist = 0;
        if($codeExist){
            if(count($codeExist[0]) > 0){
                $idExist = $codeExist[0][0]['batasplafon_id'];
            }
        }
        
        if($pl->getPlafon()->getId()==0){
            $msg = "Invalid plafon";
        }else if($pl->getPercent() <= 0){
            $msg = "Percent must be higher than 0";
        }else if($pl->getPercent() > 100){
            $msg = "Percent must be not higher than 100";    
        } else if($idExist && ($pl->getId() != $idExist)){
            $msg = "Plafon already taken";    
        } else if(Erems_Box_Tools::codeExist($percentExist, $pl,"batasplafon_id")){
            $msg = "Percent already taken";    
        }else{
            $this->setStatus(TRUE);
            
        }
        $this->setMsg($msg);
    }
}

?>
