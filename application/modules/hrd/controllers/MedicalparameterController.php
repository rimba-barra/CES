<?php

/**
 * Description of AbsentrecordController
 *
 * @author MIS
 */
class Hrd_MedicalparameterController extends Box_Models_App_Hermes_AbstractController {

    protected function testingFlag() {
        return FALSE;
    }

    public function allRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'generalparameter', array(), array());
        $dao = new Hrd_Models_Master_GeneralParameterDao();
        //$hasil = $dao->getParams("medicalparameter", $this->getAppSession());
        $hasil = $dao->getParams("medicalparameter");

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function employeeRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'employee', array('division', 'group'), array());
        $dao = new Hrd_Models_Master_EmployeeDao();
        $employee = new Hrd_Models_Master_Employee();
        $employee->setArrayTable($this->getAppData());
        $employee->setProject($this->getAppSession()->getProject());
        $employee->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAll($this->getAppRequest(), $employee);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function mainCreate() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setUseProcess(FALSE);

        $data = $this->getAppData();
        $hasilSave = FALSE;
        $msg = "";

        if ($data["claim_password"] !== Box_Config::MEDICALPARAM_PASSWORD) {
            $msg = "Password tidak valid";
            $hasilSave = FALSE;
        } else {
            $allParams = array();
            $validFieldName = array(
                Box_Config::GENERALPARAMATER_NAME_CLAIM_FRAMELIMIT,
                Box_Config::GENERALPARAMATER_NAME_CLAIM_LENSLIMIT,
                Box_Config::GENERALPARAMATER_NAME_CLAIM_PASSWORD,
                Box_Config::GENERALPARAMATER_NAME_CLAIM_PERCENTADDPLF
            );
            foreach ($data as $k => $v) {
                if (in_array($k, $validFieldName)) {
                    $param = new Hrd_Models_Master_GeneralParameter();
                    $param->setName($k);
                    $param->setValue($v);
                    $param->setModuleName("medicalparameter");
                    $param->setHasModule(1); // set not display in general parameter module
                    $allParams[] = $param;
                }
            }



            $de = new Box_Delien_DelimiterEnhancer();
            $decan = new Box_Models_App_DecanForObject($allParams);
            $de->setDelimiterCandidate($decan);
            $de->generate();


            $dao = new Hrd_Models_Master_GeneralParameterDao();
            $hasilSave = $dao->saveMulti($decan, $this->getAppSession());
            $msg = "SUCCESS";
            if (!$hasilSave) {
                $msg = "Something problem when processing your request";
            }
        }





        $dm->setHasil(array("msg" => $msg, "status" => $hasilSave ? TRUE : FALSE));
        return $dm;
    }

    public function mainDelete() {
        $dm = new Box_Models_App_Hermes_DataModel();

        return $dm;
    }

    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_Processor();
    }

}

?>
