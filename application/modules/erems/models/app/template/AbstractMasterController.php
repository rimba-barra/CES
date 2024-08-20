<?php

/**
 * Description of ControllerForMaster
 *
 * @author MIS
 */
abstract class Erems_Models_App_Template_AbstractMasterController extends Erems_Box_Models_App_Hermes_AbstractController {

    protected function testingFlag() {
        return FALSE;
    }

    public function allRead() {
        $dm = $this->_getMainDataModel();
        if ($dm instanceof Erems_Box_Models_App_Hermes_DataModel) {
            $dataList = $dm->getDataList();
            $dao = $dm->getDao();
            $obj = $dm->getObject();
            $obj->setArrayTable($this->getAppData());
            if($obj instanceof Erems_Box_Models_Master_InterProjectPt){
                $ses = $this->getAppSession();
                $obj->setProject($ses->getProject());
                $obj->setPt($ses->getPt());
            }
            
            $hasil = $dao->getAll($this->getAppRequest(),$obj);

            $dm->setDataList($dataList);
            $dm->setHasil($hasil);
        }

        return $dm;
    }
    
    public function detailRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $allM = array();

        $dm->setHasil(array($allM));

        return $dm;
    }
    

    public function mainCreate() {
        return $this->_getMainDataModel();
    }

    public function mainDelete() {
        return $this->_getMainDataModel();
    }

    protected function getDefaultProcessor() {
        return new Erems_Models_App_Box_Processor();
    }

    /* @return Erems_Box_Models_App_Hermes_DataModel */

    abstract function _getMainDataModel();
}

?>
