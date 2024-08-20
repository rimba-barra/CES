<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Params
 *
 * @author TOMMY-MIS
 */
class Erems_Models_General_Params extends Erems_Models_Parameter_Parameter{
    private $prosesSp1Hari;
    private $prosesSp2Hari;
    private $prosesSp3Hari;
    private $prosesSp4Hari;
    
    
    public function fill(\Erems_Models_Master_Parameter $parameter) {
        switch($parameter->getName()){
            case Erems_Box_GlobalParams::GENERAL_PROSESSP_SP1_HARI:
               $this->setProsesSp1Hari($parameter->getValue());
                break;
            case Erems_Box_GlobalParams::GENERAL_PROSESSP_SP2_HARI:
               $this->setProsesSp2Hari($parameter->getValue());
                break;
            case Erems_Box_GlobalParams::GENERAL_PROSESSP_SP3_HARI:
               $this->setProsesSp3Hari($parameter->getValue());
                break;
            case Erems_Box_GlobalParams::GENERAL_PROSESSP_SP4_HARI:
               $this->setProsesSp4Hari($parameter->getValue());
                break;
            
            
        }
    }

    public function getParams() {
           return array(Erems_Box_GlobalParams::GENERAL_PROSESSP_SP1_HARI,
               Erems_Box_GlobalParams::GENERAL_PROSESSP_SP2_HARI,
               Erems_Box_GlobalParams::GENERAL_PROSESSP_SP3_HARI,
               Erems_Box_GlobalParams::GENERAL_PROSESSP_SP4_HARI);
    
    }
    
    
    public function getProsesSp1Hari() {
        return $this->prosesSp1Hari;
    }

    public function getProsesSp2Hari() {
        return $this->prosesSp2Hari;
    }

    public function getProsesSp3Hari() {
        return $this->prosesSp3Hari;
    }

    public function getProsesSp4Hari() {
        return $this->prosesSp4Hari;
    }

    public function setProsesSp1Hari($prosesSp1Hari) {
        $this->prosesSp1Hari = $prosesSp1Hari;
    }

    public function setProsesSp2Hari($prosesSp2Hari) {
        $this->prosesSp2Hari = $prosesSp2Hari;
    }

    public function setProsesSp3Hari($prosesSp3Hari) {
        $this->prosesSp3Hari = $prosesSp3Hari;
    }

    public function setProsesSp4Hari($prosesSp4Hari) {
        $this->prosesSp4Hari = $prosesSp4Hari;
    }


    
}
