<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of AnggaranTakaProcessor
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_App_Box_AnggaranTakaProcessor extends Hrd_Models_App_Box_Processor {
    private $decan;
    public function afterFillData($object) {
        $this->createRecord($object);
        return $object;
    }
    
    public function daoSave($dao, $object) {
        
    
        return $dao->save($object,$this->decan);
    }

    private function createRecord(Hrd_Models_Tandakasih_Anggaran $a) {
      
        $allAnggaran = array();
        $data = $this->getData();
        foreach ($data as $k => $v) {
            if (strpos($k, '_value') !== false) {
                
                $newTipeId = intval(str_replace("_value","",$k));
                $newPlus = key_exists($newTipeId."_plus",$data)?$data[$newTipeId."_plus"]:"";
                $anggaran = new Hrd_Models_Tandakasih_Anggaran();
                $anggaran->getTipe()->setId($newTipeId);
                $anggaran->setValue($v);
                $anggaran->setPlus($newPlus);
                $anggaran->getGroup()->setId($data["group_group_id"]);
                
                $allAnggaran[] = $anggaran;
                
            }
        }
        
        if(count($allAnggaran) > 0){
            $decan = Box_Tools::toDecan($allAnggaran);
            
         //   var_dump($decan->getDCResult());
            $this->decan = $decan;
        }
    }

}
