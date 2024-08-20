<?php

/**
 * Description of Create
 *
 * @author MIS
 */
class Cashier_Box_Models_App_Models_Create extends Cashier_Box_Models_App_AbModel {
    protected $hasil;
    public function __construct($controller, $debug = '') {
        $this->hasil = new Cashier_Box_Models_App_HasilSaveUpdateWM();
        parent::__construct($controller, $debug);
    }
    
    protected function getHasil() {
        return $this->hasil;
    }

    protected function getPost(Zend_Controller_Action $controller) {
        return $controller->getRequest()->getPost('data');
    }
    
    public function prosesData(Cashier_Box_Kouti_Remora $remora){
        $d = $this->getData();
        $converter = new Cashier_Box_Models_App_Converter($d);
        $a = $remora->grouped();
        $converter->process($a);
        $remora->fillData($d);
    }
    
    /*@added 26 Maret 2014*/
    public function prosesDataMini(Cashier_Box_Kouti_Remora $remora,$data){
      
        $converter = new Cashier_Box_Models_App_Converter($data);
        $a = $remora->grouped();
        $converter->process($a);
        $remora->fillData($data);
    }
    
    public function setMsg($msg){
        $this->hasil->setMsg($msg);
        
    }
    public function setSuccess($success){
        $this->hasil->setSuccess($success);
    }
    
    public function setOthers($others){
        $this->hasil->setOthers($others);
    }
    
}

?>
