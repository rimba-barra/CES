<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of HasilRequestRead
 *
 * @author MIS
 */
class Box_Models_App_HasilRequestRead extends Box_Kouti_Hasil{
    private $modeRead;
    private $page;
    private $limit;
    private $others;
    
    public function __construct($array) {
        $this->modeRead = 'all';
        $this->page = 1;
        $this->limit = 25;
        $this->others = array();
        $this->setForm(array("mode_read"=>"","page"=>1,"limit"=>25,"others"=>array()));
        $this->setArrayForm($array);
        /* ExtJS based*/
        
       $actualPage = floor((int)$this->getOthersValue("start")/$this->getLimit());
           
       $actualPage = (int)($actualPage+1);
       $this->page = $actualPage;
    }
    
    public function getModeRead() {
        return $this->modeRead;
        
    }

    public function setModeRead($modeRead) {
        $this->modeRead = $modeRead;
    }

    public function getPage() {
        return $this->page;
    }

    public function setPage($page) {
        $this->page = $page;
    }

    public function getLimit() {
        return $this->limit;
    }

    public function setLimit($limit) {
        $this->limit = $limit;
    }

    public function getOthers() {
        return $this->others;
    }

    public function setOthers($others) {
        $this->others = $others;
    }

            
    protected function setFormFromParams() {
        $form = $this->getForm();
        $form["mode_read"] = $this->modeRead;
        $form["page"] = $this->page;
        $form["limit"] = $this->limit;
        $form["others"] = $this->others;
        return $form;
    }

    protected function setParamsFromForm() {
       $form = $this->getForm();
        $this->modeRead = $form["mode_read"];
        $this->page = $form["page"];
        $this->limit = $form["limit"]; 
        $this->others = $form["others"];
    }   
    
    public function setArrayForm($array){
        $form = $this->getForm();
        foreach ($array as $key=>$value){
            
            if(key_exists($key,$form)){
             
                $form[$key]= $value;
            }else{
                $form["others"][$key] = $value;
            }
        }
     
        $this->setForm($form);
        $this->setParamsFromForm();
    }
    
    public function getOthersValue($key){
        $hasil = "";
        if(key_exists($key,$this->others)){
            $hasil = $this->others[$key];
        }
        return $hasil;
 
    }
    
    public function setOthersValue($key,$value){
        $this->others[$key] = $value;
 
    }
}

?>
