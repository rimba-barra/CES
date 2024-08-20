<?php

/**
 * Description of Validator
 *
 * @author MIS
 */
class Erems_Models_Master_ClusterValidator extends Erems_Box_Models_App_Validator {

    public function run(Erems_Models_Master_ClusterTran $cluster) {
        $msg = "";
        
        $dao = new Erems_Models_Master_ClusterDao();
        
        $codeExist = $dao->codeExist($cluster);
        
       
        $idExist = 0;
        if($codeExist){
            if(count($codeExist[0]) > 0){
               
                $idExist = $codeExist[0][0]['cluster_id'];
            }
        }
        
    

        if (strlen($cluster->getName()) < 3) {
            $msg = "Nama Cluster minimum 3 characters";
        } else if (strlen($cluster->getCode()) < 1) {
            $msg = "Code Cluster minimum 1 character";
        } else if($idExist && ($cluster->getId() != $idExist)){
            $msg = "Code Cluster already taken";
        } else {


            $this->setStatus(TRUE);
        }
        $this->setMsg($msg);
    }

}

?>