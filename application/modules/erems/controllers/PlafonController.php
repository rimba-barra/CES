<?php

/**
 * Description of PlafonController
 *
 * @author MIS
 */
class Erems_PlafonController extends Erems_Models_App_Template_AbstractMasterController {
    
    public function _getMainDataModel() {
        $dao = new Erems_Models_Construction_PlafonDao();
      
  
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Erems_Box_Models_App_DataListCreator('', 'plafon', array(), array()));
        $dm->setObject(new Erems_Models_Construction_Plafon());
        $dm->setDao($dao);
        $dm->setValidator(new Erems_Models_Construction_PlafonValidator());
        $dm->setIdProperty("plafon_id");
        return $dm;
        
    } 
    
    public function allRead() {
        $dm = $this->_getMainDataModel();
        if ($dm instanceof Erems_Box_Models_App_Hermes_DataModel) {
            $dataList = $dm->getDataList();
            $dao = $dm->getDao();
            $obj = $dm->getObject();
            $obj->setArrayTable($this->getAppData());
            $data = $this->getAppData();
            $isDefault = key_exists("is_default", $data)?$data["is_default"]:2;
           
            $obj->setIsDefault($isDefault);
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
}

?>
