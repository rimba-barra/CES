<?php

/**
 * Description of DepartmentController
 *
 * @author MIS
 */
class Hrd_PersonalischildController extends Hrd_Models_App_Template_AbstractMasterController {

    public function _getMainDataModel() {

        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Box_Models_App_DataListCreator('', 'personalischild', array(), array()));
        $dm->setObject(new Hrd_Models_Personalischild_Personalischild());
        $dm->setDao(new Hrd_Models_Personalischild_Dao());
        $dm->setValidator(new Hrd_Models_Personalischild_Validator());
        $dm->setIdProperty("employee_id");
        return $dm;
    }

    public function detailRead() {
        
        $em = new Hrd_Models_Personalischild_Personalischild();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Personalischild_Dao();

        $allspecialemployee = $dao->getSpecialEmployee($em);
        
        if(Box_Tools::adaRecord($allspecialemployee)){
            $allspecialemployee = Box_Tools::toObjectsb("personalischild", $allspecialemployee,FALSE);
        }
        return Box_Tools::instantRead(array(), array($allspecialemployee));

    }

    public function checkedemployeeRead() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $projectId = $this->getAppSession()->getProject()->getId();
        $ptId = $this->getAppSession()->getPt()->getId();
        $userid = $this->getAppSession()->getUser()->getId();
        $dao = new Hrd_Models_Personalischild_Dao();
        $em = new Hrd_Models_Personalischild_Personalischild();
        $data = $this->getAppData();
        $paramdata = Zend_Json::decode($data['data']);

        if (is_array($paramdata)) {
            if (!empty($paramdata)) {
                foreach ($paramdata as $row) {
                    $hasil = $dao->getUpdateEmployee($this->getAppSession(),$em,$row);
                }
            }
        }
        return Box_Tools::instantRead(array("HASIL" => 1,), array());
    }

    public function uncheckedemployeeRead() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $projectId = $this->getAppSession()->getProject()->getId();
        $ptId = $this->getAppSession()->getPt()->getId();
        $userid = $this->getAppSession()->getUser()->getId();
        $dao = new Hrd_Models_Personalischild_Dao();
        $em = new Hrd_Models_Personalischild_Personalischild();
        $data = $this->getAppData();
        $paramdata = Zend_Json::decode($data['data']);

        if (is_array($paramdata)) {
            if (!empty($paramdata)) {
                foreach ($paramdata as $row) {
                    $hasil = $dao->getUpdateEmployeeUnchecked($this->getAppSession(),$em,$row);
                }
            }
        }
        return Box_Tools::instantRead(array("HASIL" => 1,), array());
    }


}

?>
