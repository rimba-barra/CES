<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of DinasProcessor
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_App_Box_DinasProcessor extends Hrd_Models_App_Box_Processor {
    
    
    public function afterFillData($object) {
        $this->insertDetail($object);
        
        return $object;
    }
    
    public function daoSave($dao, $object) {
        
        $n = $this->getRequestNomorSurat();
        return $dao->save($object,$n);
    }
    
    public function daoUpdate($dao, $object) {
        $data = $this->getData();
       
        $n = $this->getRequestNomorSurat();
        return $dao->update($object,$n,$data["deletedRows"]);
    }
    
    private function insertDetail(Hrd_Models_Dinas_Transaksi $t){
       $data = $this->getData();
       foreach($data["detail"] as $d){
           $detail = new Hrd_Models_Dinas_TransaksiDetail();
           $detail->setArrayTable($d);
           
         
           
           $t->addDetail($detail);
       }
       
       $de = new Box_Delien_DelimiterEnhancer();
        $de->setDelimiterCandidate($t);
        $de->generate();
       
    }
    
    public function getRequestNomorSurat(){
        $data = $this->getData();
        
        $nomorSurat = new Hrd_Models_Dinas_NomorSurat();
        $data = $data["nomorsurat"];
        $nomorSurat->setId($data["nomorsuratdinas_id"]);
        $nomorSurat->setInfiks($data["infiks"]);
        
        if($nomorSurat->getId()==0){
            $nomorSurat->setNomor(1);
            $nomorSurat->setTahun(date("Y"));
            $nomorSurat->setBulan(date("m"));
        }else{
            $nomorSurat->setNomor($data["nomor"]);
         
        }
        return $nomorSurat;
    }
}
