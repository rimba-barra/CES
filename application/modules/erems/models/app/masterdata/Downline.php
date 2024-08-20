<?php

/**
 * Description of Downline
 *
 * @author david p
 */
class Erems_Models_App_Masterdata_Downline extends Erems_Box_Models_App_Masterdata_Masterdata {
    public function getDao() {
        return new Erems_Models_Master_GeneralDao();
    }

    public function getTableClass() {
        return new Erems_Models_Master_Downline();
    }

    public function getTableClassName() {
        return "downline";
    }

    public function prosesData(\Erems_Box_Models_App_AbDao $dao, \Erems_Box_Models_ObjectEmbedData $objectEmbedata, \Erems_Box_Models_App_Models_ReadWorms $app) {
        $projectId=$app->getProject()->getId();
        $ptId=$app->getPt()->getId();
        $hasil = $dao->getAllDownline($projectId,$ptId);
        return $hasil;
    }
    
    protected function getMethod($object){
        $projectId=$object->getProject()->getId();
        $ptId=$object->getPt()->getId();
        return $this->getDao()->getAllDownline($projectId,$ptId);
    }

    

}
