<?php

/**
 * Description of MasterCoaConfigProcessor
 *
 * @author Semy MIS C:\xampp\htdocs\webapps\application\modules\erems\models\app\boxcashier\MasterCoaConfigProcessor.php
 */
class Erems_Models_App_Boxcashier_MasterCoaConfigProcessor extends Erems_Models_App_Box_Processor {

    public function daoSave($dao, $coaconfig) {
        $data = $this->getData();
        $detail = $data['detail'];
        $allDetail = array();
        foreach ($detail as $row){
            $d = new Erems_Models_Master_CoaConfigDetail();
            $d->setArrayTable($row);
           
            $allDetail[] = $d;
        }
        $decanResult = Erems_Box_Tools::toDecan($allDetail);
        return $dao->save($coaconfig,$decanResult->getDCResult());
    }
    
    public function daoUpdate($dao, $coaconfig) {
        
        $data = $this->getData();
        $detail = $data['detail'];
        
        $allDetail = array();
        $deletedRows = implode("~",$data["deletedRows"]);
        
        foreach ($detail as $row){
            $d = new Erems_Models_Master_CoaConfigDetail();
            $d->setArrayTable($row);
           
            $allDetail[] = $d;
        }
        $decanResult = Erems_Box_Tools::toDecan($allDetail);
      
        return $dao->update($coaconfig,$decanResult->getDCResult(),$deletedRows);
    }

    
    

}

?>
