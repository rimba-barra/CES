<?php

/**
 * Description of AbsentProcessor
 *
 * @author MIS
 */
class Erems_Models_App_Box_SerahterimaProcessor extends Erems_Models_App_Box_Processor {

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
    
    
    public function daoSave($dao, $object) {
        return $dao->save($object);
    }

    public function daoUpdate($dao, $object) {
        $data = $this->getData();
         $de = new Erems_Box_Delien_DelimiterEnhancer();
        $decan = new Erems_Box_Models_App_Decan(explode(",", $data["serahterima_id"]));
        $de->setDelimiterCandidate($decan);
        $de->generate();
        return $dao->update($object, $decan);
    }

}

?>
