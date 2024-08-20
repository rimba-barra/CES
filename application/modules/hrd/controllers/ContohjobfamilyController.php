<?php

/**
 * Description of DepartmentController
 *
 * @author MIS
 */
class Hrd_ContohjobfamilyController extends Hrd_Models_App_Template_AbstractMasterController {

    public function _getMainDataModel() {

        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Box_Models_App_DataListCreator('', 'contohjobfamily', array(), array()));
        $dm->setObject(new Hrd_Models_Performancemanagement_Contohjobfamily_Contohjobfamily());
        $dm->setDao(new Hrd_Models_Performancemanagement_Contohjobfamily_Dao());
        $dm->setValidator(new Hrd_Models_Performancemanagement_Contohjobfamily_Validator());
        $dm->setIdProperty("contoh_jobfamily_id");
        return $dm;
    }


    public function listjobRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        
        $mastergp   = new Hrd_Models_App_Mastertable_JobFamily();
        $allgp      = $mastergp->prosesDataWithSession($this->getAppSession(), TRUE);
        
        $dm->setHasil(array($allgp));
        // print_r($dm);die();
        return $dm;
    }

}

?>
