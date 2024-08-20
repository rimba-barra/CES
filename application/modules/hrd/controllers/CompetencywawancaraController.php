<?php

/**
 * Description of DepartmentController
 *
 * @author MIS
 */
class Hrd_CompetencywawancaraController extends Hrd_Models_App_Template_AbstractMasterController {

    public function _getMainDataModel() {

        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Box_Models_App_DataListCreator('', 'competencywawancara', array(), array()));
        $dm->setObject(new Hrd_Models_Performancemanagement_Competencywawancara_CompetencyWawancara());
        $dm->setDao(new Hrd_Models_Performancemanagement_Competencywawancara_Dao());
        $dm->setValidator(new Hrd_Models_Performancemanagement_Competencywawancara_Validator());
        $dm->setIdProperty("competency_wawancara_id");
        return $dm;
    }


    public function listcatRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        
        $mastergp   = new Hrd_Models_App_Mastertable_CompetencyNames();
        $masterbd   = new Hrd_Models_App_Mastertable_Banding();
        $masterlc   = new Hrd_Models_App_Mastertable_LevelCategory();
        $allgp      = $mastergp->prosesDataWithSession($this->getAppSession(), TRUE);
        $allbd      = $masterbd->prosesDataWithSession($this->getAppSession(), TRUE);
        $alllc      = $masterlc->prosesDataWithSession($this->getAppSession(), TRUE);
        
        $dm->setHasil(array($allgp,$allbd,$alllc));
        return $dm;
    }

}

?>
