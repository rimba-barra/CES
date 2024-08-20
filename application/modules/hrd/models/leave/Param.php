<?php


/**
 * Description of Param
 *
 * @author MIS
 */
class Hrd_Models_Leave_Param extends Hrd_Models_Parameter_Parameter  {
    private $normalQuote;
    private $bigQuote;
    
    public function fill(Hrd_Models_Master_Parameter $parameter) {
        switch($parameter->getName()){
            case Box_GlobalParams::P_NLEAVE_QUOTA:
               $this->setNormalQuote($parameter->getValue());
                break;
            case Box_GlobalParams::P_BLEAVE_QUOTA:
                $this->setBigQuote($parameter->getValue());
                break;
            
        }
    }

    public function getParams() {
        return array(Box_GlobalParams::P_NLEAVE_QUOTA,  Box_GlobalParams::P_BLEAVE_QUOTA);
    }
    
    public function getNormalQuote() {
        return $this->normalQuote;
    }

    public function setNormalQuote($normalQuote) {
        $this->normalQuote = $normalQuote;
    }

    public function getBigQuote() {
        return $this->bigQuote;
    }

    public function setBigQuote($bigQuote) {
        $this->bigQuote = $bigQuote;
    }

    


}

?>
