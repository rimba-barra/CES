<?php

/**
 * Description of DeleteWm
 *
 * @author TOMMY-MIS
 */
class Erems_Box_Models_App_Models_DeleteWm extends Erems_Box_Models_App_AbModel{
    private $hasil;
    private $idProperty;
     
    public function __construct($controller, $debug = '') {
        $this->hasil = new Erems_Box_Models_App_HasilSaveUpdateWM();
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
    
    public function execute(Erems_Box_Models_App_BlackHoleWM $blackHole){
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



        $de = new Erems_Box_Delien_DelimiterEnhancer();
        $decan = new Erems_Box_Models_App_Decan($idAr);
        $de->setDelimiterCandidate($decan);
        $de->generate();
        
        $hasilSP = FALSE;
        $prosesSP = $blackHole->directDeleteWM($decan,$this->getSession());
       // $hasilSP = $prosesSP > 0 ? TRUE : FALSE;
        if(is_array($prosesSP)){
            if(count($prosesSP) > 0){
                $result = $prosesSP[0][0]["result"];
                $result = $result? TRUE:FALSE;
         
                $this->hasil->setSuccessTransaction($result);
                
           
                if(array_key_exists("message",$prosesSP[0][0])){
                     $this->hasil->setMsg($prosesSP[0][0]["message"]);
                }
                if(array_key_exists("others",$prosesSP[0][0])){
                     $this->hasil->setMsg($prosesSP[0][0]["others"]);
                }
            }else{
                $this->hasil->setMsg("[DWM002] Invalid result. Jumlah dalam array = 0.");
            }
        }else{
            $this->hasil->setMsg("[DWM001] Invalid result. Hasil yang diinginkan array.");
        }
        $this->hasil->setSuccess(TRUE); /// wajib true, karena aliran data melalui callback success di js
       
 
    }
}
