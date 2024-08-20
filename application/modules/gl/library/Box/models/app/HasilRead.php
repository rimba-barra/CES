<?php

class Gl_Box_Models_App_HasilRead extends Gl_Box_Kouti_Hasil{
    protected $totalRow;
    protected $data;
  
    public function __construct() {
        $this->totalRow = 0;
        $this->data = array();
        $this->setForm(array("totalRow"=>0,"data"=>array()));
    }
    
    public function getTotalRow() {
        return $this->totalRow;
    }

    public function setTotalRow($totalRow) {
        $this->totalRow = (int)$totalRow;
    }

    public function getData() {
        return $this->data;
    }

    public function setData($data) {
        $this->data = (array)$data;
    }
     

    protected function setFormFromParams() {
        $form = $this->getForm();
        $form["totalRow"] = $this->totalRow;
        $form["data"] = $this->data;
        return $form;
        
    }

    protected function setParamsFromForm() {
        $form = $this->getForm();
        $this->totalRow = $form["totalRow"];
        $this->data = $form["data"];
    }
    
   
    
    
}
?>
