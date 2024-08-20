<?php

/**
 * Description of Delete
 *
 * @author MIS
 */
class Cashier_Box_Models_App_Models_Delete extends Cashier_Box_Models_App_AbModel {
    private $hasil;
    private $idProperty;
     
    public function __construct($controller, $debug = '') {
        $this->hasil = new Cashier_Box_Models_App_HasilSaveUpdate();
        parent::__construct($controller, $debug);
    }
    
    public function getIdProperty() {
        return $this->idProperty;
    }

    public function setIdProperty($idProperty) {
        $this->idProperty = (string)$idProperty;
    }
    
    protected function getHasil() {
        return $this->hasil;
    }

    protected function getPost(Zend_Controller_Action $controller) {
        return $controller->getRequest()->getPost('data');
    }
    
    public function execute(Cashier_Box_Models_App_BlackHole $blackHole){
        $idP = $this->idProperty;
        if(strlen($idP)==0)return FALSE;
        $idAr = array();
        $y = $this->getData();
  
        if (array_key_exists("0", $y)) {
            foreach ($y as $row) {
                $idAr[] = $row[$idP];
            }
        } else {
            $idAr[] = $y[$idP];
        }



        $de = new Cashier_Box_Delien_DelimiterEnhancer();
        $decan = new Cashier_Box_Models_App_Decan($idAr);
        $de->setDelimiterCandidate($decan);
        $de->generate();
        
        $hasilSP = FALSE;
        $prosesSP = $blackHole->directDelete($decan,$this->getSession());
        $hasilSP = $prosesSP > 0 ? TRUE : FALSE;
        $this->hasil->setSucess($hasilSP);
 
    }
}

?>
