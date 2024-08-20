<?php

/**
 * Description of AbsentProcessor
 *
 * @author MIS
 */
class Erems_Models_App_Box_ProjectFacilitiesProcessor extends Erems_Models_App_Box_Processor {
    private $decan; // for hold deleted image in image list 
    
    public function daoProses($dao, $object, $modeCreate) {

        switch ($modeCreate) {
            case "setupsheet":
                return $dao->setupShift($object);
                break;
        }
    }
    
    protected function afterValidation($object) {
        $data = $this->getData();
        if($object->getId() > 0){
            $de = new Erems_Box_Delien_DelimiterEnhancer();
            $decan = new Erems_Box_Models_App_Decan(explode(",", $data["deletedRows"]));
            $de->setDelimiterCandidate($decan);
            $de->generate();
            $this->decan = $decan;
        }
        return $object;
    }
    
    public function daoUpdate($dao, $object) {
      //  return parent::daoUpdate($dao, $object);
        return $dao->update($object,$this->decan,$this->getSession());
    }
    
    public function daoSave($dao, $object) {
        
        return $dao->save($object,$this->getSession());
    }




}

?>
