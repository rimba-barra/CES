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
class Erems_Models_Construction_Params extends Erems_Models_Parameter_Parameter {
    private $sendMail;
    
    public function getSendMail() {
        return $this->sendMail;
    }

    public function setSendMail($sendMail) {
        $this->sendMail = $sendMail;
    }

        
    public function fill(\Erems_Models_Master_Parameter $parameter) {
        switch($parameter->getName()){
            case Erems_Box_GlobalParams::CONSTRUCTION_SEND_MAIL:
               $this->setSendMail($parameter->getValue());
                break;
           
            default:
                break;
        }
    }

    public function getParams() {
        return array(Erems_Box_GlobalParams::CONSTRUCTION_SEND_MAIL);
    }    
}

?>
