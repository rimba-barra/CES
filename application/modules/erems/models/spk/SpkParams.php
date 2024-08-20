<?php


/**
 * Description of SpkParams
 *
 * @author MIS
 */
class Erems_Models_Spk_SpkParams extends Erems_Models_Parameter_Parameter {
    private $maxUnit;
    private $maxPerUnit;
    private $maxActivePerUnit;
    
    public function getParams() {
        return array(Erems_Box_GlobalParams::SPK_ACTIVE_EACH_UNIT,
            Erems_Box_GlobalParams::SPK_MAX_EACH_UNIT,Erems_Box_GlobalParams::SPK_MAX_UNIT_NUMBER);
    }
    
    
    
    public function fill(Erems_Models_Master_Parameter $parameter){
       
        switch($parameter->getName()){
            case Erems_Box_GlobalParams::SPK_MAX_UNIT_NUMBER:
               $this->setMaxUnit($parameter->getValue());
                break;
            case Erems_Box_GlobalParams::SPK_MAX_EACH_UNIT:
                $this->setMaxPerUnit($parameter->getValue());
                break;
            case Erems_Box_GlobalParams::SPK_ACTIVE_EACH_UNIT:
                $this->setMaxActivePerUnit($parameter->getValue());
                break;
            default:
                break;
        }
    }




    public function getMaxUnit() {
        return $this->maxUnit;
    }

    public function setMaxUnit($maxUnit) {
        $this->maxUnit = $maxUnit;
    }

    public function getMaxPerUnit() {
        return $this->maxPerUnit;
    }

    public function setMaxPerUnit($maxPerUnit) {
        $this->maxPerUnit = $maxPerUnit;
    }

    public function getMaxActivePerUnit() {
        return $this->maxActivePerUnit;
    }

    public function setMaxActivePerUnit($maxActivePerUnit) {
        $this->maxActivePerUnit = $maxActivePerUnit;
    }

    

    
    
    



    
}

?>
