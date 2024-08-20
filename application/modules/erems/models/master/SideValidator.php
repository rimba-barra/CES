<?php

/**
 * Description of Validator
 *
 * @author MIS
 */
class Erems_Models_Master_SideValidator extends Erems_Box_Models_App_Validator{
    public function run(Erems_Models_Master_Side $pl){
        $msg = "";
        
        $dao = new Erems_Models_Master_SideDao();
        if ($pl->getId() > 0) {
            $code = $dao->codeExist($pl, 'update');
        } else {
            $code = $dao->codeExist($pl, 'add');
        }
        
        

        $idExist = 0;
        if($code){
            if(count($code[0]) > 0){
                $idExist = $code[0][0]['side_id'];
            }
        }

        $checkSite_ID = $dao->idExist($pl);
        $SiteIdExist = 0;
        if($checkSite_ID){
            if(count($checkSite_ID[0]) > 0){
                $SiteIdExist = $checkSite_ID[0][0]['side_id'];
            }
        }

        if(strlen($pl->getCode())<1){
            $msg = "Code minimum 1 character";
        } else if(strlen($pl->getCode())>5){
            $msg = "Code Side maksimal 5 character";
        } else if(strlen($pl->getName())<5){
            $msg = "Name minimum 5 characters";
        } else if($idExist){
        // } else if($idExist && ($pl->getId() != $SiteIdExist)){
            $msg = "Code already taken";
        } else{
            $this->setStatus(TRUE);
            
        }
        $this->setMsg($msg);
    }
}

?>