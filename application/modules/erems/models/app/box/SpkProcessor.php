<?php

/**
 * Description of AbsentProcessor
 *
 * @author MIS
 */
class Erems_Models_App_Box_SpkProcessor extends Erems_Models_App_Box_Processor {

    private $purchasLetter;
    private $spkTypeId;
    private $prosesType;

    public function __construct($testingFlag = NULL, $prosesType = NULL) {
        parent::__construct($testingFlag);
        $this->prosesType = isset($prosesType) ? $prosesType : NULL;
    }

    public function daoProses($dao, $object, $modeCreate) {
        echo "hello";
        switch ($modeCreate) {
            case "setupsheet":
                return $dao->setupShift($object);
                break;
        }
    }

    public function afterFillData($spk) {
        if ($spk instanceof Erems_Models_Spk_SpkTransaction) {

            $this->spkTypeId = $spk->getSpkType()->getId();
        }
        return $spk;
    }

    public function daoSave($dao, $object) {
        $data = $this->getData();
        $autoGenerateNumber = TRUE;
        if(strlen($data["spk_no"]) > 0){
            $autoGenerateNumber = FALSE;
            $object->setNomor($data["spk_no"]);
        }
      
        
        if ($this->spkTypeId == Erems_Box_Config::SPKTYPE_UNIT) {
            // return $dao->updateWithUnit($spk,  Erems_Box_Models_App_Decan $decan);
            return $dao->insertWithUnit($object,$autoGenerateNumber);
        } else {

            return $dao->insertNonUnit($object,$autoGenerateNumber);
        }
    }

    public function daoUpdate($dao, $spk) {
        if ($this->prosesType == "CANCEL") {
            if($spk->getId() > 0){
                $spk->getStatus()->setName(Erems_Box_Config::SPKSTATUS_CANCEL);
               
                return $dao->updateCancel($spk);
            }
            return 0;
        }else if ($this->prosesType == "CLOSE") {
            if($spk->getId() > 0){
                $spk->getStatus()->setName(Erems_Box_Config::SPKSTATUS_CLOSE);
               
                return $dao->updateCancel($spk);
            }
            return 0;
        } else {
             $data = $this->getData();
             if($spk instanceof  Erems_Models_Spk_SpkTransaction){
                 $spk->setNomor($data["spk_no"]);
             }
            
            
            if ($this->spkTypeId == Erems_Box_Config::SPKTYPE_UNIT) {
               
                $de = new Erems_Box_Delien_DelimiterEnhancer();
                $decan = new Erems_Box_Models_App_Decan(explode(",", $data["deletedRows"]));
                $de->setDelimiterCandidate($decan);
                $de->generate();
                return $dao->updateWithUnit($spk, $decan);
            } else {
                return $dao->updateNonUnit($spk);
            }
        }
    }

}

?>
