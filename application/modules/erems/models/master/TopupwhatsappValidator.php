<?php


/**
 * Description of ClusterFacilitiesValidator
 *
 * @author MIS
 */
class Erems_Models_Master_TopupwhatsappValidator extends Erems_Box_Models_App_Validator{
    private $ses;
    public function setSes(Erems_Box_Kouti_Session $ses) {
        $this->ses = $ses;
    }

    public function run(Erems_Models_Topupwhatsapp $pl){
        $msg = "";
        $pl->setProject($this->ses->getProject());
        $pl->setPt($this->ses->getPt());
       
        $dao = new Erems_Models_Master_TopupwhatsappDao();

        // if($pl->getTopupDate()){
        //     $msg = "Code already taken";
        // }else{
        // }

        $this->setStatus(true);
        $this->setMsg($msg);
    }
}

?>
