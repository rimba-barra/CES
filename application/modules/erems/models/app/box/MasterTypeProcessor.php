<?php

/**
 * Description of AbsentProcessor
 *
 * @author MIS
 */
class Erems_Models_App_Box_MasterTypeProcessor extends Erems_Models_App_Box_Processor {

    public function daoProses($dao, $object, $modeCreate) {

        switch ($modeCreate) {
            case "setupsheet":
                return $dao->setupShift($object);
                break;
        }
    }

    public function afterFillData($typeTran) {

        return $typeTran;
    }
    
    private function addDetail(Erems_Models_Master_Type $object){
        $data = $this->getData();


        $detail = $data["typeattribute"];
        $typeAttribute = NULL;
        foreach ($detail as $dtl) {
            $typeAttribute = new Erems_Models_Type_Attribute();
            $typeAttribute->setArrayTable($dtl);
            //   var_dump($typeAttribute->getAttributeValue()->getName());
            if ($typeAttribute->getAttribute()->getId() > 0) {

                $object->addAttribute($typeAttribute);
            }
        }



        $de = new Erems_Box_Delien_DelimiterEnhancer();
        $de->setDelimiterCandidate($object);
        $de->generate();
        
    }
    
    public function daoSave($dao, $object) {
        $this->addDetail($object);
        return $dao->save($object);
    }

    public function daoUpdate($dao, $object) {
        $data = $this->getData();
        $this->addDetail($object);
         $de = new Erems_Box_Delien_DelimiterEnhancer();
        $decan = new Erems_Box_Models_App_Decan(explode(",", $data["deletedRows"]));
        $de->setDelimiterCandidate($decan);
        $de->generate();
        return $dao->update($object, $decan);
    }

}

?>
