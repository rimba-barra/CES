<?php

/**
 * Description of ControllerForMaster
 *
 * @author MIS
 */
abstract class Hrd_Models_App_Template_AbstractMasterController extends Box_Models_App_Hermes_AbstractController {

    protected function testingFlag() {
        return FALSE;
    }

    public function allRead() {
        $dm = $this->_getMainDataModel();
        if ($dm instanceof Box_Models_App_Hermes_DataModel) {
            $dataList = $dm->getDataList();
            $dao = $dm->getDao();
            $obj = $dm->getObject();
            if($obj instanceof Box_Models_Master_InterProjectPt){
                $ses = $this->getAppSession();
                $obj->setProject($ses->getProject());
                $obj->setPt($ses->getPt());
            }
            $obj->setArrayTable($this->getAppData());
            $hasil = $dao->getAll($this->getAppRequest(),$obj);

            $dm->setDataList($dataList);
            $dm->setHasil($hasil);
        }

        return $dm;
    }

    public function mainCreate() {

        return $this->_getMainDataModel();
    }

    public function mainDelete() {
        return $this->_getMainDataModel();
    }

    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_Processor();
    }

    /* @return Box_Models_App_Hermes_DataModel */

    abstract function _getMainDataModel();
}

?>
