<?php

class Cashier_Box_Models_App_HasilSaveUpdate extends Cashier_Box_Kouti_Hasil{
    private $sucess;
  

    public function __construct() {
        $this->sucess = false;
        $this->setForm(array('success'=>false));
    }

    protected function setFormFromParams() {
        $form = $this->getForm();
        $form['success'] = $this->sucess;
        
        return $form;
        
    }
    
    protected function setParamsFromForm() {
        $form = $this->getForm();
        $this->sucess = $form['success'];
    }
    
    public function getSucess() {
        return $this->sucess;
    }

    public function setSucess($sucess) {
        $this->sucess = (boolean)$sucess;
    }

    
    
    
}
?>
