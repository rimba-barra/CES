<?php


/**
 * Description of ClusterFacilitiesValidator
 *
 * @author MIS
 */
class Erems_Models_Master_ClusterFacilitiesValidator extends Erems_Box_Models_App_Validator{
    
    private $ses;
    
  

    public function setSes(Erems_Box_Kouti_Session $ses) {
        $this->ses = $ses;
    }

        
    
    public function run(Erems_Models_Master_ClusterFacilities $pl){
        $msg = "";
        $pl->setProject($this->ses->getProject());
        $pl->setPt($this->ses->getPt());
       
        
        $dao = new Erems_Models_Master_ClusterFacilitiesDao();
        $code = $dao->codeExist($pl);
        
        $idExist = 0;
        if($code){
            if(count($code[0]) > 0){
               
                $idExist = $code[0][0]['clusterfacilities_id'];
            }
        }
        
        if(strlen($pl->getCode()) < 2){
            $msg = "Code minimum 2 karakter";
        }else if(strlen($pl->getCode()) > 5){
            $msg = "Code Cluster Facilities maksimum 5 karakter";
        } else if(strlen($pl->getName()) < 2){
            $msg = "Name mininum 2 karakter";
       } else if($pl->getCluster()->getId()==0){
            $msg = "Invalid cluster";   
        } else if($pl->getFacilitiesType()->getId()==0){
            $msg = "Invalid facilities type";   
        } else if($idExist && ($pl->getId() != $idExist)){
            $msg = "Code already taken";
        }else{
            $this->setStatus(TRUE);
            
        }
        $this->setMsg($msg);
    }
}

?>
