<?php


/**
 * Description of ClusterFacilitiesValidator
 *
 * @author MIS
 */
class Erems_Models_Master_ProseswhatsappValidator extends Erems_Box_Models_App_Validator{
    private $ses;
    public function setSes(Erems_Box_Kouti_Session $ses) {
        $this->ses = $ses;
    }

    public function run(Erems_Models_Whatsapp_Proseswhatsapp $pl){
        $msg = "";
       
        $dao = new Erems_Models_Whatsapp_Dao();

        // if($pl->getTopupDate()){
        //     $msg = "Code already taken";
        // }else{
        // }

        $this->setStatus(true);
        $this->setMsg($msg);
    }
}

?>
