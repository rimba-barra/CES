<?php

/**
 * Description of DepartmentController
 *
 * @author MIS
 */
class Hrd_TrainingnameController extends Hrd_Models_App_Template_AbstractMasterController {

    public function _getMainDataModel() {

        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Box_Models_App_DataListCreator('', 'trainingname', array(), array()));
        $dm->setObject(new Hrd_Models_Training_Trainingname_Trainingname());
        $dm->setDao(new Hrd_Models_Training_Trainingname_Dao());
        $dm->setValidator(new Hrd_Models_Training_Trainingname_Validator());
        $dm->setIdProperty("trainingname_id");
        return $dm;
    }

    public function detailRead() {
        
        $em = new Hrd_Models_Training_Trainingbudgetprogram_Trainingbudgetprogram();
        // $em->setProjectKP($this->getAppSession()->getProject());
        // $em->setPtKP($this->getAppSession()->getPt());
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingbudgetprogram_Dao();
        
        $allcaption = $dao->getAllWoPLKP($em);
        if(Box_Tools::adaRecord($allcaption)){
            $allcaption = Box_Tools::toObjectsb("trainingcaption", $allcaption,FALSE);
        }

        //COMPETENCY
        // $dm = new Box_Models_App_Hermes_DataModel();
        
        // $dm->setDirectResult(TRUE);
        // $dm->setRequiredDataList(FALSE);
        // $dm->setRequiredModel(FALSE);
        
        // $mastercn   = new Hrd_Models_App_Mastertable_CompetencyNames();
        // $allcn      = $mastercn->prosesDataWithSession($this->getAppSession(), TRUE);
        $allcn = '';
        return Box_Tools::instantRead(array(), array($allcaption,$allcn));

    }

    public function gettrainingnameRead(){

        $em = new Hrd_Models_Training_Trainingname_Trainingname();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingname_Dao();
        $hasil = $dao->gettrainingname($em, $this->getAppSession(), $this->getAppData());

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'trainingname', array(),array());
        
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        
        return $dm;
    }

    public function getcompetencyRead(){

        $em = new Hrd_Models_Training_Trainingname_Trainingname();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingname_Dao();
        $hasil = $dao->getcompetencynames($em, $this->getAppSession(), $this->getAppData());

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'competencynames', array(),array());
        
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function getprojectptaccessRead(){

        $dao_projectpt = new Hrd_Models_Master_Projectpt_Dao();
        $projectptFilter = new Hrd_Models_Master_Projectpt_ProjectPt();
        $projectptFilter->setUserid($this->getAppSession()->getUserId());
        $projectptFilter->setGroupid($this->getAppSession()->getGroupId());
        $hasil_projectpt = $dao_projectpt->getAllWoPL($projectptFilter);

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'projectpt', array(),array());
        
        $dm->setDataList($dataList);
        $dm->setHasil($hasil_projectpt);
        
        return $dm;
    }

    public function copytrainingnameRead(){

        $em = new Hrd_Models_Training_Trainingname_Trainingname();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingname_Dao();
        $hasil = $dao->copytrainingname($em, $this->getAppSession(), $this->getAppData());

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'trainingname', array(),array());
        
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        
        return $dm;
    }

    public function sharetrainingnameRead(){

        $em = new Hrd_Models_Training_Trainingname_Trainingname();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingname_Dao();

        $hasil = $dao->sharetrainingname($em, $this->getAppSession(), $this->getAppData());

        return Box_Tools::instantRead(array("HASIL" => 1,), array());
    }

    public function processcompetencytrainingnameRead(){

        $em = new Hrd_Models_Training_Trainingname_Trainingname();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingname_Dao();

        $hasil = $dao->processcompetencytrainingname($em, $this->getAppSession(), $this->getAppData());

        return Box_Tools::instantRead(array("HASIL" => 1,"ID"=>$hasil), array());
    }

    public function processdeletecompetencytrainingnameRead(){

        $em = new Hrd_Models_Training_Trainingname_Trainingname();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingname_Dao();

        $hasil = $dao->processdeletecompetencytrainingname($em, $this->getAppSession(), $this->getAppData());

        return Box_Tools::instantRead(array("HASIL" => 1,"ID"=>$hasil), array());
    }

    public function getcompetencyexistRead(){

        $em = new Hrd_Models_Training_Trainingname_Trainingname();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingname_Dao();
        $hasil = $dao->getcompetencyexist($em, $this->getAppSession(), $this->getAppData());

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'competencynames', array(),array());
        
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

}

?>
