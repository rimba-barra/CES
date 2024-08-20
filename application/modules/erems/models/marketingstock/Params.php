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
class Erems_Models_Marketingstock_Params extends Erems_Models_Parameter_Parameter{
    private $ppnbm;
    private $pph22;
    private $ppnPl;
    
    public function fill(\Erems_Models_Master_Parameter $parameter) {
        switch($parameter->getName()){
            case Erems_Box_GlobalParams::MARKETINGSTOCK_PPNBM:
               $this->setPpnbm($parameter->getValue());
                break;
            case Erems_Box_GlobalParams::MARKETINGSTOCK_PPH22:
                $this->setPph22($parameter->getValue());
                break;
            case Erems_Box_GlobalParams::MARKETINGSTOCK_PPN_PL:
                $this->setPpnPl($parameter->getValue());
                break;
            
            
        }
    }

    public function getParams() {
        return array(Erems_Box_GlobalParams::MARKETINGSTOCK_PPNBM,  Erems_Box_GlobalParams::MARKETINGSTOCK_PPH22,Erems_Box_GlobalParams::MARKETINGSTOCK_PPN_PL);
    }    
    
    public function getPpnbm() {
        return $this->ppnbm;
    }

    public function setPpnbm($ppnbm) {
        $this->ppnbm = $ppnbm;
    }

    public function getPph22() {
        return $this->pph22;
    }

    public function setPph22($pph22) {
        $this->pph22 = $pph22;
    }
    
    function getPpnPl() {
        return $this->ppnPl;
    }

    function setPpnPl($ppnPl) {
        $this->ppnPl = $ppnPl;
    }




}

?>
