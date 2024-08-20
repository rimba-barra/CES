<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Params
 *
 * @author MIS
 */
class Erems_Models_Customer_Params extends Erems_Models_Parameter_Parameter{
    private $mandatoryFieldsCheck;
    
    
    
    public function getMandatoryFieldsCheck() {
        return $this->mandatoryFieldsCheck;
    }

    public function setMandatoryFieldsCheck($mandatoryFieldsCheck) {
        $this->mandatoryFieldsCheck = $mandatoryFieldsCheck;
    }

    public function fill(\Erems_Models_Master_Parameter $parameter) {
        switch($parameter->getName()){
            case Erems_Box_GlobalParams::MASTERCUSTOMER_MANDATORYFIELDS:
               $this->setMandatoryFieldsCheck($parameter->getValue());
                break;
            
        }
    }

    public function getParams() {
        return array(Erems_Box_GlobalParams::MASTERCUSTOMER_MANDATORYFIELDS);
    }


}

?>
