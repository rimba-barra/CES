<?php

/**
 * Description of UangDinas
 *
 * @author TOMMY-MIS
 */
class  Hrd_Models_App_Box_UangDinas extends Hrd_Models_App_Box_Processor {
    private $deletedRows;
    
    
    public function afterFillData($object) {
        $this->insertDetail($object);
        
        return $object;
    }
    
    public function daoUpdate($dao, $object) {
        
        return $dao->update($object,$this->deletedRows);
      
    }

    
    private function insertDetail(Hrd_Models_Dinas_UangDinas $t){
       $data = $this->getData();
       $this->deletedRows = $data["deletedRows"];
       foreach($data["details"] as $d){
           $detail = new Hrd_Models_Dinas_UangDinasDetail();
           $detail->setArrayTable($d);
           
         
           
           $t->addDetail($detail);
       }
       
       $de = new Box_Delien_DelimiterEnhancer();
        $de->setDelimiterCandidate($t);
        $de->generate();
       
    }
    
    public function daoProses($dao, $object, $modeCreate) {

        switch ($modeCreate) {
            case "xxx":
                return $this->xxx($dao, $object, $modeCreate);
                break;
        }
    }

    
}
