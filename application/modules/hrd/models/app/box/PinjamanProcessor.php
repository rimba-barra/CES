<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of PinjamanProcessor
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_App_Box_PinjamanProcessor  extends Hrd_Models_App_Box_Processor  {
    public function daoSave($dao, $object) {
        $this->insertDetail($object);
        return $dao->save($object);
    }
    
    public function daoUpdate($dao, $object) {
        $this->insertDetail($object);
        return $dao->update($object);
    }
    
    private function insertDetail(Hrd_Models_Pinjaman_Transaksi $t){
       $data = $this->getData();
      
       foreach($data["detail"] as $d){
      
           $detail = new Hrd_Models_Pinjaman_Angsuran();
           $detail->setArrayTable($d);
           $detail->setDate($d["date"]);
           $t->addDetail($detail);
       }
       
       $de = new Box_Delien_DelimiterEnhancer();
        $de->setDelimiterCandidate($t);
        $de->generate();
       
    }
}
