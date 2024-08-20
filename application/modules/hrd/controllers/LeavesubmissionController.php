<?php

/**
 * Description of AbsentrecordController
 *
 * @author MIS
 */
class Hrd_LeavesubmissionController extends Box_Models_App_Hermes_WingedBController {

    protected function testingFlag() {
        return FALSE;
    }

    protected function getMainDao() {
        return new Hrd_Models_Leave_Dao();
    }

    protected function getMainFieldID() {
        return 'leave_id';
    }

    protected function getMainObject() {
        return new Hrd_Models_Leave_Leave();
    }

    protected function getMainValidator() {
        return new Hrd_Models_Leave_Validator();
    }

    public function allRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'employeeb', array('department', 'employeestatus', 'statusinformation', 'group'), array());
        $dao = new Hrd_Models_Leave_Dao();
        $em = new Hrd_Models_Employee_Employee();
        $em->setArrayTable($this->getAppData());
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAllEmployeeWithLeaveQuota($this->getAppRequest(), $em);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function detailRead() {
        $dm = new Box_Models_App_Hermes_DataModel();

        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $creator = new Box_Models_App_Creator();


        $ma = new Hrd_Models_App_Mastertable_AbsentType();
        $aa = $ma->prosesDataWithSession($this->getAppSession(), TRUE);

        $dma = new Hrd_Models_App_Mastertable_Department();
         $da = $dma->prosesDataWithSession($this->getAppSession(), TRUE);


        $otherAT = array(array(
                "STATUS" => TRUE,
                "ABSENTTYPEGROUP_LEAVE"=>  Box_Config::ABSENTTYPEGROUP_LEAVE
        ));

        $dm->setHasil(array($aa,$da, $otherAT));


        return $dm;
    }

    public function leaveRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'leave', array('absenttype', 'employee'), array());
        $dao = new Hrd_Models_Leave_Dao();
        $leave = new Hrd_Models_Leave_Leave();

        //$this->setArrayTable($leave,$this->getAppData());
        $leave->setArrayTable($this->getAppData());
        $leave->setProject($this->getAppSession()->getProject());
        $leave->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAllByEmployeeWOPL($leave);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function deleteRead() {
        $dm = new Box_Models_App_Hermes_DataModel();

        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $creator = new Box_Models_App_Creator();

        $success = FALSE;

        $dao = $this->getMainDao();

        $params = $this->getAppData();

        $de = new Box_Delien_DelimiterEnhancer();
        $decan = new Box_Models_App_Decan(array(intval($params['id'])));
        $de->setDelimiterCandidate($decan);
        $de->generate();

        $id = intval($params['id']);





        /// informasi cuti
        $oldRecord = NULL;
        $oldLeave = new Hrd_Models_Leave_Leave();
        $oldLeave->setId($id);

        $oldRecord = $dao->getDetail($oldLeave);
        // var_dump($oldRecord[0][0]);
        $oldLeave = new Hrd_Models_Leave_Leave();
        $oldLeave->setArrayTable($oldRecord[0][0]);
      
        //added by anas 08122021
        if($oldRecord[0][0]["absenttype"] == "CUTI EXTRA")
        {
            $lDao = new Hrd_Models_Leave_Dao();
            $success = $lDao->deleteKompensasiExtraLeave($decan, $this->getAppSession());
        }
        else
        {
            $leDao = new Hrd_Models_Leave_LeaveEntitlementDao();
            $le = new Hrd_Models_Leave_LeaveEntitlement();
            $le->setId($oldLeave->getLeaveBind());

            $detailLe = $leDao->getLeaveEntDetail($le, $this->getAppSession());
            $leDetail = new Hrd_Models_Leave_LeaveEntitlement();
            $leDetail = Box_Tools::toObjects('leaveentitlement', $detailLe,TRUE);
          
          
            $sisaCuti = $leDetail->getRest();
            $sisaCuti = $sisaCuti + $oldLeave->getDuration();

            $leDetail->setRest($sisaCuti);

            

            $success = $dao->delete($decan, $this->getAppSession(), $leDetail);
        }


        $otherAT = array(array(
                "SUCCESS" => $success
        ));

        $dm->setHasil(array($otherAT));

        return $dm;
    }

    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_LeaveSubmissionProcessor();
    }

}

?>
