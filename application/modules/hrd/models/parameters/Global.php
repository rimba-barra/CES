<?php


/**
 * Description of Global
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Parameters_Global extends Hrd_Models_App_Parameter implements Box_Kouti_Remora  {
    private $klaimHamil;
    
    
    public function extraGetArrayTable() {
        
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function getModuleName() {
        return "globalparameter";
    }

    public function grouped() {
         return array();
    }
    
    
    public function getKlaimHamil() {
        return $this->klaimHamil;
    }

    public function setKlaimHamil($klaimHamil) {
        $this->klaimHamil = $klaimHamil;
    }




}
