<?php

/**
 * 
 *
 * @author MIS
 */
class Hrd_EmployeeparameterController extends Box_Models_App_Hermes_AbstractController {

    private $moduleName = 'employeeparameter';

    protected function testingFlag() {
        return FALSE;
    }

    public function allRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'generalparameter', array(), array());
        $dao = new Hrd_Models_Master_GeneralParameterDao();
        $hasil = $dao->getParams($this->moduleName, $this->getAppSession());

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function mainCreate() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setUseProcess(FALSE);

        $data = $this->getAppData();
        $hasilSave = FALSE;
        $msg = "Process...";
        if (isset($data["status"]) && strlen($data["status"]) > 0) {
            $allParams = array();
            $validFieldName = array(
                Box_Config::EMPLOYEEPARAMETER_ATTENDANCE_HOURS,
                Box_Config::EMPLOYEEPARAMETER_BLEAVE_AVAILABLE_1,
                Box_Config::EMPLOYEEPARAMETER_BLEAVE_AVAILABLE_2,
                Box_Config::EMPLOYEEPARAMETER_BLEAVE_LIMIT,
                Box_Config::EMPLOYEEPARAMETER_BLEAVE_QUOTA,
		Box_Config::EMPLOYEEPARAMETER_BLEAVE_EVERY_YEAR,
                Box_Config::EMPLOYEEPARAMETER_BONUS_1,
                Box_Config::EMPLOYEEPARAMETER_BONUS_2,
                Box_Config::EMPLOYEEPARAMETER_BONUS_3,
                Box_Config::EMPLOYEEPARAMETER_BONUS_4,
                Box_Config::EMPLOYEEPARAMETER_BONUS_ZERO,
                Box_Config::EMPLOYEEPARAMETER_NIK_NUMBER,
                Box_Config::EMPLOYEEPARAMETER_NLEAVE_AVAILABLE,
                Box_Config::EMPLOYEEPARAMETER_NLEAVE_LIMIT,
                Box_Config::EMPLOYEEPARAMETER_NLEAVE_QUOTA,
            );
            foreach ($data as $k => $v) {
                if (in_array($k, $validFieldName)) {
                    $param = new Hrd_Models_Master_GeneralParameter();
                    $param->setName($data["status"]."_".$k);
                    $param->setValue($v);
                    $param->setModuleName($this->moduleName);
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
        } else {
            $msg = "Invalid employee status"; 
        }


        $dm->setHasil(array("msg" => $msg, "status" => $hasilSave ? TRUE : FALSE));
        return $dm;
    }

    public function mainDelete() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setObject(new Hrd_Models_Sanction_Sanction());
        $dm->setDao(new Hrd_Models_Sanction_Dao());
        $dm->setIdProperty("sanction_id");
        return $dm;
    }

    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_Processor();
    }

}

?>
