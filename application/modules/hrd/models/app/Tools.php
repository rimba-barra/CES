<?php

/**
 * Description of Tools
 *
 * @author MIS
 */
class Hrd_Models_App_Tools {

    public static function getDayList($startDate, $endDate) {
        $dayList = array();
        $sTime = strtotime($startDate);
        $eTime = strtotime($endDate);
        $sMonth = (int) date("m", $sTime);
        $sDay = (int) date("j", $sTime);
        $eMonth = (int) date("m", $eTime);
        $eDay = (int) date("j", $eTime);
        $maxDays = (int) date("t", $sTime);
        $sYear = (int) date("Y", $sTime);
        $eYear = (int) date("Y", $eTime);
        if ($sYear != $eYear) {
            return FALSE;
        }

        $arDay = array();
        $arMonth = array();

        if ($sMonth == $eMonth) {
            for ($i = $sDay; $i <= $eDay; $i++) {
                $arDay[] = $i;
                $arMonth[] = $sMonth;
            }
        } else {
            for ($i = $sDay; $i <= $maxDays; $i++) {
                $arDay[] = $i;
                $arMonth[] = $sMonth;
            }
            for ($i = 1; $i <= $eDay; $i++) {
                $arDay[] = $i;
                $arMonth[] = $eMonth;
            }
        }

        ///// create delimiter string
        $dString = "";
        $mString = "";
        $count = 1;
        $jumlah = count($arDay);

        foreach ($arDay as $day) {
            $dString .=$count == $jumlah ? $day : $day . "~";
            $count++;
        }
        $count = 1;
        foreach ($arMonth as $month) {
            $mString .=$count == $jumlah ? $month : $month . "~";
            $count++;
        }


        $dayList = array(array($arDay, $arMonth), array($dString, $mString));

        return $dayList;
    }

    public static function enchantDelimiter(Box_Delien_DelimiterCandidate $candidate) {
        $de = new Hrd_Models_App_HrdDelimiterEnhancer();
        $de->setDelimiterCandidate($candidate);
        $de->generate();
    }

    public final static function setArrayTable($data, Box_Models_ObjectEmbedData $object) {
        $object->setArrayTable($data);
        if ($object instanceof Box_Kouti_Remora) {

            foreach ($object->grouped() as $embedObject) {
                
            }
        }
    }

    public static function checkStatus(Hrd_Models_Master_Status $status, Hrd_Models_Master_StatusInformation $information) {
        $result = array("valid" => false, "msg" => "Invalid Status");
        $msg = "";
        if ($status->getId() == Box_Config::STATUS_PERMANENT) {
            if (!$information->getHireDate()) {
                $msg = "Invalid hire date";
            } else if (!$information->getAssignationDate()) {
                $msg = "Invalid Assignation Date";
            } else {
                $result["valid"] = TRUE;
            }
        } else if ($status->getId() == Box_Config::STATUS_CONTRACT || $status->getId() == Box_Config::STATUS_CANDIDATE) {
            if (!$information->getContractStart()) {
                $msg = "Invalid contract start date";
            } else if (!$information->getContractEnd()) {
                $msg = "Invalid contract expiry date";
            } else {
                $result["valid"] = TRUE;
            }
        } else if ($status->getId() == Box_Config::STATUS_CONSULTANT) {
            if (!$information->getConsultantStart()) {
                $msg = "Invalid consultant start date";
            } else if (!$information->getConsultantEnd()) {
                $msg = "Invalid consultant expiry date";
            } else {
                $result["valid"] = TRUE;
            }
        } else if ($status->getId() == Box_Config::STATUS_DAILY_CONTRACT || $status->getId() == Box_Config::STATUS_DAILY_TEMPORARY) {

            if (!$information->getTemporaryStart()) {
                $msg = "Invalid Daily status start date";
            } else if (!$information->getTemporaryEnd()) {
                $msg = "Invalid Daily status end date";
            } else {
                $result["valid"] = TRUE;
            }
        } else if ($status->getId() == Box_Config::STATUS_DAILY_PERMANENT) {

            if (!$information->getTemporaryStart()) {
                $msg = "Invalid Daily status start date";
            } else {
                $result["valid"] = TRUE;
            }
        }


        $result["msg"] = $result["valid"] == TRUE ? "" : $msg;
        return $result;
    }

    public static function isCodeExist($dao, $object, $fieldID) {

        $ce = TRUE;
        $code = FALSE;
        if ($dao instanceof Hrd_Models_App_CodeChecked) {
            $code = $dao->codeExist($object);



            $idExist = 0;
            if ($code) {
                if (count($code[0]) > 0) {

                    $idExist = $code[0][0][$fieldID];
                }
            }

            if ($idExist && ($object->getId() != $idExist)) {
                $ce = TRUE;
            }else{
                $ce = FALSE;
            }
        }
        return $ce;
    }

}

?>
