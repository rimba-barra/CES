<?php

/**
 * Description of AbsentrecordController
 *
 * @author MIS
 */
class Hrd_MastergajiController extends Box_Models_App_Hermes_WingedBController {

    protected function testingFlag() {
        return FALSE;
    }

    public function leaveRead() {

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'leaveentitlement', array('employee'), array());
        $dao = new Hrd_Models_Leave_LeaveEntitlementDao();
        $enti = new Hrd_Models_Leave_LeaveEntitlement();

        $enti->setArrayTable($this->getAppData());
        $enti->setProject($this->getAppSession()->getProject());
        $enti->setPt($this->getAppSession()->getPt());

        $dm->setDataList($dataList);
        $dm->setHasil($dao->getAllByEmployee($this->getAppRequest(), $enti));
        return $dm;
    }

    public function parameterRead() {
        $dm = new Box_Models_App_Hermes_DataModel();

        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $creator = new Box_Models_App_Creator();


        $paramsRequestResult = Box_Tools::globalParamsExistLeave($this->getAppSession());




        $otherAT = array(array(
                "GLOBALPARAMSEXIST" => $paramsRequestResult["status"],
                "GLOBALPARAMSMSG" => $paramsRequestResult["msg"],
                "GLOBALPARAMSPARAMS" => $paramsRequestResult["parameters"],
                "EXPIRE_DURATION" => Box_Config::LEAVE_EXPIRE_DURATION
        ));

        $dm->setHasil(array($otherAT));


        return $dm;
    }

    

    

    

    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_Processor();
    }

    protected function getMainDao() {
        return new Hrd_Models_Payroll_Gaji_Dao();
    }

    protected function getMainFieldID() {
        return "gaji_id";
    }

    protected function getMainObject() {
        return new Hrd_Models_Payroll_Gaji_Gaji();
    }

    protected function getMainValidator() {
        return new Hrd_Models_Payroll_Gaji_Validator();
    }

}

?>
