<?php

/**
 * Description of BatasplafonController
 *
 * @author MIS
 */
class Erems_BatasplafonController extends Erems_Models_App_Template_AbstractMasterController {
    
    protected function testingFlag() {
        return FALSE;
    }
    
    public function allRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'batasplafon', array('plafon'),array());
        
        $dao = new Erems_Models_Construction_BatasPlafonDao();
        $obj = new Erems_Models_Construction_BatasPlafon();

        $obj->setArrayTable($this->getAppData());
        $obj->setProject($this->getAppSession()->getProject());
        $obj->setPt($this->getAppSession()->getPt());

        $hasil = $dao->getAll($this->getAppRequest(),$obj);
        
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        return $dm;
    }
    
    public function _getMainDataModel() {
        $dao = new Erems_Models_Construction_BatasPlafonDao();
  
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Erems_Box_Models_App_DataListCreator('', 'batasplafon', array('plafon'), array()));
        $dm->setObject(new Erems_Models_Construction_BatasPlafon());
        $dm->setDao($dao);
        $v = new Erems_Models_Construction_BatasPlafonValidator();
        $v->setSession($this->getAppSession());
        $dm->setValidator($v);
        $dm->setIdProperty("batasplafon_id");

        return $dm;
    }  
    
    public function generateRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $dao = new Erems_Models_Construction_PlafonDao();
        $plafon = new Erems_Models_Construction_Plafon();
        $plafon->setIsDefault(1);
        $allDef = $dao->getAll($this->getAppRequest(),$plafon);
        
        $allDef = Erems_Box_Tools::dbResultToObjects($allDef,"plafon");
        
        $de = new Erems_Box_Delien_DelimiterEnhancer();
        $decan = new Erems_Box_Models_App_DecanForObject($allDef);
        $de->setDelimiterCandidate($decan);
        $de->generate();
        
        $hasil = $dao->generateAllDefault($decan,$this->getAppSession());
        
        $otherAT = array(array(
            "STATUS" => $hasil
        ));

        $dm->setHasil(array($otherAT));

        return $dm;
    }
    
    public function detailRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $creator = new Erems_Box_Models_App_Creator();

        //===== MASTERDATA == //
        $mp = new Erems_Models_App_Masterdata_Plafon();
        $ap = $mp->prosesDataWithSession($this->getAppSession(), TRUE);
                
        $dm->setHasil(array($ap));

        return $dm;
    }
}

?>
