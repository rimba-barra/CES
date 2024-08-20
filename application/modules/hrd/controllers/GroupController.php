<?php

/**
 * Description of DepartmentController
 *
 * @author MIS
 */
class Hrd_GroupController extends Hrd_Models_App_Template_AbstractMasterController {
    
    protected function testingFlag() {
        return FALSE;
    } 
    
    public function _getMainDataModel() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Box_Models_App_DataListCreator('', 'group', array(), array()));
        $dm->setObject(new Hrd_Models_Master_Group());
        $dm->setDao(new Hrd_Models_Master_GroupDao());
        $dm->setValidator(new Hrd_Models_Master_GroupValidator());
        $dm->setIdProperty("group_id");
        return $dm;
        
    } 

   public function getgroupkantorpusatRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'group', array(), array());
        $dao = new Hrd_Models_Master_GroupDao();
        $obj = new Hrd_Models_Master_Group();
        $obj->setArrayTable($this->getAppData());
        $hasil = $dao->getAllDefaultBrowse($obj);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function createfromimportRead() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $projectId = $this->getAppSession()->getProject()->getId();
        $ptId = $this->getAppSession()->getPt()->getId();
        $userid = $this->getAppSession()->getUser()->getId();
        $dao = new Hrd_Models_Master_GroupDao();
        $obj = new Hrd_Models_Master_Group();
        $data = $this->getAppData();
        $paramdata = Zend_Json::decode($data['data']);
        if (is_array($paramdata)) {
            if (!empty($paramdata)) {
                foreach ($paramdata as $row) {
                    $row['project_id'] = $projectId;
                    $row['pt_id'] = $ptId;
                    $row['user_id'] = $userid;
                    $obj->setArrayTable($row);
                    $hasil = $dao->getAllDefaultBrowse($obj);
                    $totaldata = $hasil[0][0]['totalRow'];
                    if ($totaldata < 1) {                      
                        $dao->savefromimport($row);
                    }
                }
            }
        }
        return Box_Tools::instantRead(array("HASIL" => 1,), array());
    }


}

?>
