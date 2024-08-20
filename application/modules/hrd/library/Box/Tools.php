<?php

/**
 * Description of Tools
 *
 * @author MIS
 */
class Box_Tools {

    public static function getCleanDCResult(Box_Delien_DelimiterCandidate $decan = NULL, $className, $params = NULL) {
        $dcResult = array();

        if ($decan) {
            $dcResult = $decan->getDCResult();
        }

        if (!$decan || count($dcResult) == 0) {
            $creator = new Box_Models_App_Creator();
            $object = $creator->create($className, $params);
            $dcResult = $object->getArrayTable();
        }





        return $dcResult;
    }

    public static function codeExist($dataDao, Box_Models_ObjectEmbedData $object, $fieldId) {
        $idExist = 0;
        if ($dataDao) {
            if (count($dataDao[0]) > 0) {

                $idExist = $dataDao[0][0][$fieldId];
            }
        }

        if ($idExist && ($object->getId() != $idExist)) {
            return TRUE;
        }
        return FALSE;
    }
    
    

    /* cek jika ada recordnya ( hasil query dari database ) */

    public static function adaRecord($data) {
        if (key_exists(1, $data)) {
            return TRUE;
        }
        return FALSE;
    }

    /* cek jika ada recordnya ( hasil query dari database ) untuk simple queery */

    public static function adaRecordSimple($data) {
        if (is_array($data)) {
            if (key_exists(0, $data)) {
                if (is_array($data[0])) {
                    if (key_exists(0, $data[0])) {
                        return TRUE;
                    }
                }
            }
        }

        return FALSE;
    }

    /* jadikan ke object + model */

    public static function printToObjectsWM($data, $creatorName) {
        $hasil = FALSE;

        $creator = new Box_Models_App_Creator();


        if (count($data) > 0) {
            $hasil = array();
            foreach ($data as $d) {
                $obj = $creator->create($creatorName);
                $obj->setArrayTable($d);
                $hasil[] = $obj;
            }
            return $hasil;
        }
        return $hasil;
    }

    public static function instantRead($hasilArrayBiasa = array(), $hasilArraySpesial = array()) {
        $dm = new Box_Models_App_Hermes_DataModel();

        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);



        $otherAT = array($hasilArrayBiasa);

        $hasil = array();
        $hasil[] = $otherAT;
        foreach ($hasilArraySpesial as $spesial) {
            $hasil[] = $spesial;
        }

		

        $dm->setHasil($hasil);
		
		


        return $dm;
    }

    public static function toDecan($dataArray = array()) {
        $de = new Box_Delien_DelimiterEnhancer();
        $decan = new Box_Models_App_DecanForObject($dataArray);
        $de->setDelimiterCandidate($decan);
        $de->generate();
        return $decan;
    }

    /*
      Convert raw database result to specific array of objects
     */

    public static function toObjects($objectName, $data, $isSingleRecord = FALSE) {
        $objects = array();
        if (!key_exists(1, $data)) {
            return false;
        }
        $creator = new Box_Models_App_Creator();
        foreach ($data[1] as $row) {
            $obj = $creator->create($objectName);
            $obj->setArrayTable($row);
            $objects[] = $obj;
        }
        if ($isSingleRecord) {
            return $objects[0];
        }
        return $objects;
    }

    public static function toObjectsb($objectName, $data, $isSingleRecord = FALSE, $groupEmbedPrefix = array()) {
        $objects = array();
        if (!key_exists(1, $data)) {
            return false;
        }
        $creator = new Box_Models_App_Creator();
        $converter = new Box_Models_App_Converter($data);
        foreach ($data[1] as $row) {
            $obj = $creator->create($objectName);

            $obj->setArrayTable($row);
            $group = $obj->grouped();
            foreach ($group as $gObj) {

                if (in_array($gObj->getEmbedPrefix(), $groupEmbedPrefix)) {
                    
                    $gObj->setArrayTable($row);
                    
                    
                }
            }
            $objects[] = $obj;
        }




        if ($isSingleRecord) {
            if(count($objects)==0){
                $objects[] = $creator->create($objectName);
            }
            return $objects[0];
        }
        return $objects;
    }
    
    /* added 28 april 2016*/
    public static function toObjectsc($objectName, $data, $isSingleRecord = FALSE, $groupEmbedPrefix = array()) {
        $objects = array();
        if (!key_exists(1, $data)) {
            return false;
        }
        $creator = new Box_Models_App_Creator();
        $converter = new Box_Models_App_Converter($data);
        foreach ($data[1] as $row) {
            $obj = $creator->create($objectName);

            $obj->setArrayTable($row);
            $group = $obj->grouped();
            foreach ($group as $gObj) {

                if (in_array($gObj->getEmbedPrefix(), $groupEmbedPrefix)) {
                    $tempRow = array();
                   
                    
                   
                    $tempArTable = $gObj->getArrayTable();
                    foreach($tempArTable as $k=>$v){
                        if(array_key_exists($gObj->getEmbedPrefix()."".$k, $row)){
                            $tempRow[$k] = $row[$gObj->getEmbedPrefix()."".$k];
                   
                        }
                    }
                  
                    $gObj->setArrayTable($tempRow);
                    
                    
                    
                }
            }
            $objects[] = $obj;
        }




        if ($isSingleRecord) {
            if(count($objects)==0){
                $objects[] = $creator->create($objectName);
            }
            return $objects[0];
        }
        return $objects;
    }
    
    /* added 28 april 2016*/
    /*
    public static function toObjectRow($data,$class,$groupEmbedPrefix = array()){
        if(Box_Tools::adaRecord($data)){
            return Box_Tools::toObjectsc(str_replace("_","", $class->getEmbedPrefix()), $data,TRUE,$groupEmbedPrefix);
        }
        return FALSE;
    }
     
     */
   
    public static function toObjectRow($data,$class,$classEmbedPrefix = array()){
        $groupEmbedPrefix = array();
        if(count($classEmbedPrefix) > 0){
            foreach($classEmbedPrefix as $cep){
                $groupEmbedPrefix[] =  $cep->getEmbedPrefix();
            }
           
        }
        
        
        
        if(Box_Tools::adaRecord($data)){
            return Box_Tools::toObjectsc(str_replace("_","", $class->getEmbedPrefix()), $data,TRUE,$groupEmbedPrefix);
        }
        return FALSE;
    }
    
    public static function toObjectResult($data,$class,$classEmbedPrefix = array()){
        $groupEmbedPrefix = array();
        if(count($classEmbedPrefix) > 0){
            foreach($classEmbedPrefix as $cep){
                $groupEmbedPrefix[] =  $cep->getEmbedPrefix();
            }
            
          
           
        }
        
        
        
        if(Box_Tools::adaRecord($data)){
            return Box_Tools::toObjectsc(str_replace("_","", $class->getEmbedPrefix()), $data,FALSE,$groupEmbedPrefix);
        }
        return FALSE;
    }

    public static function globalParamsExistLeave(Box_Kouti_Session $session) {
        //$hasil = array("status" => false, "msg" => "Checking global paramaters", "parameters" => []);
		$hasil = array("status" => false, "msg" => "Checking global paramaters", "parameters" => array());
        /// first check system config
        // jika menggunakan global params dari system maka tidak menarik global params dari database
        if (!Box_Config::SYS_USEDB_GLOBALPARAMS) {
            $hasil["status"] = true;
            $hasil["msg"] = "PARAMETERS FROM SYSTEM CONFIG";
            $hasil["parameters"] = array(
                Box_GlobalParams::P_NLEAVE_QUOTA => Box_GlobalParamsValue::P_NLEAVE_QUOTA,
                Box_GlobalParams::P_BLEAVE_QUOTA => Box_GlobalParamsValue::P_BLEAVE_QUOTA
            );
        } else {

            $params = new Hrd_Models_Leave_Param($session);





            $msg = "";

            $hasil["status"] = TRUE;
            $hasil["msg"] = "SUCCESS GET PARAMETERS";
            $hasil["parameters"] = array(
                Box_GlobalParams::P_NLEAVE_QUOTA => $params->getNormalQuote(),
                Box_GlobalParams::P_BLEAVE_QUOTA => $params->getBigQuote()
            );
        }
        return $hasil;
    }

    public static function dateDifference($date_1, $date_2, $differenceFormat = '%a') {
        $datetime1 = date_create($date_1);
        $datetime2 = date_create($date_2);

        $interval = date_diff($datetime1, $datetime2);

        return $interval->format($differenceFormat);
    }

    public static function timeDifference($timeStart, $timeEnd) {
        $x = new DateTime();
        $y = new DateTime();
        $x->setTimestamp(strtotime($timeStart));
        $y->setTimestamp(strtotime($timeEnd));
        $diff = date_diff($x, $y);

        $str = $diff->h . ":" . $diff->i . ":" . $diff->s;
        return $str;
    }

    public static function timeDifferenceB($timeStart, $timeEnd) {
        $x = new DateTime();
        $y = new DateTime();
        $x->setTimestamp(strtotime($timeStart));
        $y->setTimestamp(strtotime($timeEnd));
        $diff = date_diff($x, $y);
        return $diff;
    }

    public static function getJumlahBulanKerja($hireDate, $prosesDate) {
        $date = new DateTime($hireDate);
        $datetime2 = new DateTime($prosesDate);




        if (strtotime($hireDate) >= strtotime($prosesDate)) {
            return 0;
        }

        $day = (int) $date->format('d');        
          // set ke awal bulan
        $date->setDate($date->format("Y"), $date->format("m"), 1);        
        if ($day > 15) { // jika masuk kerja di atas 1/2 bulan makan hitungan bermulai tgl 1 bulan berikutnya
            $date->add(new DateInterval('P1M'));
        }      
        // date diff

        $interval = $date->diff($datetime2);

        $addMonth = $interval->format('%y') > 0 ? 12 * $interval->format('%y') : 0;
        unset($date);
        unset($datetime2);
        return $addMonth + $interval->format('%m');
    }

    public static function timeDatePart($string, $time) {
        $str = explode(":", $time);

        if (!is_array($str)) {
            return 0;
        }
        if (count($str) > 0) {
            if ($string == "hh") {
                return $str[0];
            } else if ($string == "ii") {
                return $str[1];
            } else if ($string == "ss") {
                return $str[2];
            }
        }
        return 0;
    }

    public static function dateDatePart($string, $time) {
        $str = explode("-", $time);

        if (!is_array($str)) {
            return 0;
        }
        if (count($str) > 0) {
            if ($string == "y") {
                return $str[0];
            } else if ($string == "m") {
                return $str[1];
            } else if ($string == "d") {
                return $str[2];
            }
        }
        return 0;
    }

    public static function timeAdd($time1, $time2) {

        if($time1==""){
            $time1 = "00:00:00";
        }
        if($time2==""){
            $time2 = "00:00:00";
        }

        $add = strtotime($time2);
        $date = new DateTime($time1);
        $date->add(new DateInterval('PT' . date('H', $add) . 'H' . date('i', $add) . 'M' . date('s', $add) . 'S'));
        $str = $date->format('H:i:s');
        return $str;
    }

    public static function dateAdd($time1, DateTime $time2) {

        $add = strtotime($time2);
        $date = new DateTime($time1);
        $date->add(new DateInterval('PT' . $time2->format("") . 'H' . date('i', $add) . 'M' . date('s', $add) . 'S'));
        $str = $date->format('H:i:s');
        return $str;
    }

    public static function validMonth($month) {
        if ($month > 0 && $month <= 12) {
            return TRUE;
        }
        return FALSE;
    }

    public static function validYear($year) {
        if ($year >= Box_Config::MIN_TAHUN && $year <= Box_Config::MAX_TAHUN) {
            return TRUE;
        }
        return FALSE;
    }

    /* penambah angka nol di depan angka => misal => 1 menjadi 01 */

    public static function akda($x) {

        // x = me.intval(x);
        $x = intval($x);
        return $x < 10 ? "0" . $x : $x;
    }

    /* penambah angka nol di depan angka => misal => 1 menjadi 001 */

    public static function akdab($x) {

        $x = intval($x);
        if ($x < 10) {
            return "00" . $x;
        } else if ($x < 100 && $x >= 10) {
            return "0" . $x;
        } else {
            return $x;
        }
        return $x < 10 ? "0" . $x : $x;
    }

    public static function splitMonthYear($monthyear) {

        $month = 0;
        $year = 0;
        $temp = explode("/", $monthyear);
        if (count($temp) == 2) {
            $month = intval($temp[0]);
            $year = intval($temp[1]);
        }
        return array($month, $year);
    }

    public static function indoMonthText($monthNumber) {
        $d = 'Januari';
        switch ($monthNumber) {
            case 1: $d = 'Januari';
                break;
            case 2: $d = 'Februari';
                break;
            case 3: $d = 'Maret';
                break;
            case 4: $d = 'April';
                break;
            case 5: $d = 'Mei';
                break;
            case 6: $d = 'Juni';
                break;
            case 7: $d = 'Juli';
                break;
            case 8: $d = 'Agustus';
                break;
            case 9: $d = 'September';
                break;
            case 10: $d = 'Oktober';
                break;
            case 11: $d = 'November';
                break;
            case 12: $d = 'Desember';
                break;
        }
        return $d;
    }

    public static function hitungHari($date1, $date2) {
        
    }

}

?>