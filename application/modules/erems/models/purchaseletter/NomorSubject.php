<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of AbstractNomorSubject
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Purchaseletter_NomorSubject extends Erems_Box_Observer_AbstractSubject {
    private $purchaseParams = NULL;
    private $purchaseNomor = NULL;
    
    
    
    public function getPurchaseParams() {
        return $this->purchaseParams;
    }

    public function setPurchaseParams($purchaseParams) {
        $this->purchaseParams = $purchaseParams;
        $this->notify();
    }
    
    public function getPurchaseNomor(){
        return $this->purchaseNomor;
    }
    
    function notify() {
      $p = $this->purchaseParams;
      $found = 0;
      $default = NULL;
      foreach($this->observers as $obs) {
        
        if($obs instanceof Erems_Models_Purchaseletter_NomorObserver){
            if($obs->getProjectId()==$p["project_id"] && $obs->getPtId()==$p["pt_id"]){
                $obs->update($this);
                $this->purchaseNomor = $obs->getNomor();
                $found = 1;
                
            }
            
        }
        
      }
      if($found===0){ // jika tidak format nomor surat maka pakai yang default Citra Indah
           $this->observers[0]->update($this);
           $this->purchaseNomor = $this->observers[0]->getNomor();
          
      }
    }


    
}
