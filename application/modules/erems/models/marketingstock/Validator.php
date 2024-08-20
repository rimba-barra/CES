<?php

/**
 * Description of Validator
 *
 * @author MIS
 */
class Erems_Models_Marketingstock_Validator extends Erems_Box_Models_App_Validator{
    private $dataRequest;
    public function setDataRequest($dr){
        $this->dataRequest = $dr;
    }
    public function run(Erems_Models_Marketingstock_MarketingStock $pl){
        $msg = "";
      
        $listUnit = $this->dataRequest["list_unit_id"];
        $listUnit = explode("~",$listUnit);
     
        if(count($listUnit) < 1){
            $msg = "Please insert unit";
     
      
        }else{
            
            
            $this->setStatus(TRUE);
            
        }
        $this->setMsg($msg);
    }
}

?>
