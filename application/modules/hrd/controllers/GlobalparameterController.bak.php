<?php

/**
 * Description of DepartmentController
 *
 * @author MIS
 */
class Hrd_GlobalparameterController extends Hrd_Models_App_Template_AbstractMasterController {

    public function _getMainDataModel() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Box_Models_App_DataListCreator('', 'globalparameter', array(), array()));
        $dm->setObject(new Hrd_Models_Parameters_Global());
        $dao = new Hrd_Models_Master_GeneralParameterDao();
       
        $dm->setDao(new Hrd_Models_Master_GeneralParameterDao());
        $dm->setValidator(new Hrd_Models_Parameters_GlobalValidator());
        $dm->setIdProperty("generalparameterprojectpt_id");
        return $dm;
    }
    
    public function allRead() {
       $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'globalparameter', array(), array());
        $obj = new Hrd_Models_Parameters_Global();
        $dao = new Hrd_Models_Master_GeneralParameterDao();
        $obj->setProject($this->getAppSession()->getProject());
        $obj->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getValues($obj);
 
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    
    
    
    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_ParamProcessor();
    }

    public function testprojectRead() {
        $data = $this->getAppData();
        $success = FALSE;
        $msg = "...";
        
       // $import = new Hrd_Models_Import_Importer();
       // $import->run();
        

        return Box_Tools::instantRead(array(
                    "HASIL" => $success,
                    "MSG" => $msg
        ));
    }
    
    

}

?>
