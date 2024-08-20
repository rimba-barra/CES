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
class Erems_Models_Cac_Params extends Erems_Models_Parameter_Parameter{
    private $nilaiKelipatan;
    public function fill(\Erems_Models_Master_Parameter $parameter) {
        switch($parameter->getName()){
            case Erems_Box_GlobalParams::PROSESCAC_NILAI_KELIPATAN:
               $this->setNilaiKelipatan($parameter->getValue());
                break;
            
            
        }
    }

    public function getParams() {
           return array(Erems_Box_GlobalParams::PROSESCAC_NILAI_KELIPATAN);
    
    }
    
    
    public function getNilaiKelipatan() {
        return $this->nilaiKelipatan;
    }

    public function setNilaiKelipatan($nilaiKelipatan) {
        $this->nilaiKelipatan = $nilaiKelipatan;
    }


    
    

//put your code here
}
