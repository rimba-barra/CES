<?php

/**
 * Description of AbsentrecordController
 *
 * @author MIS
 */
class Hrd_PrivacypolicyController extends Box_Models_App_Hermes_AbstractController {

    protected function testingFlag() {
        return FALSE;
    }

    public function allRead() {

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'privacypolicy', array(), array());
        $dao = new Hrd_Models_Master_PrivacypolicyDao();
        $header = new Hrd_Models_Master_Privacypolicy();

        $header->setArrayTable($this->getAppData());
        $header->setProject_id($this->getAppSession()->getProject()->getId());
        $header->setPt_id($this->getAppSession()->getPt()->getId());

        $hasil = $dao->getAll($this->getAppSession()->getUserId(), $this->getAppRequest(), $header);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    
    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_ReportProcessor();
    }
    

}

?>
