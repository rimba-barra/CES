<?php

/**
 * Description of Tools
 *
 * @author MIS
 */
class Master_Box_Tools {

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
        $de = new Master_Box_Delien_DelimiterEnhancer();
        $decan = new Master_Box_Models_App_DecanForObject($dataArray);
        $de->setDelimiterCandidate($decan);
        $de->generate();
        return $decan;
    }

    public static function setArrayTable(Master_Box_Kouti_Remora $remora, $data) {

        $converter = new Master_Box_Models_App_Converter($data);
        $a = $remora->grouped();
        $converter->process($a);

        $remora->fillData($data);
    }

    // added 9 Maret 2015
    /*
     * Membuat array object dari yang isi datanya dari hasil db 
     */
    public static function dbResultToObjects($hasilDb, $className) {



        if (!is_array($hasilDb)) {
            return FALSE;
        }
        if (!key_exists(1, $hasilDb)) {
            return FALSE;
        }
        if (count($hasilDb[1]) < 1) {
            return FALSE;
        }

        $creator = new Master_Box_Models_App_Creator();
        $ar = array();


        foreach ($hasilDb[1] as $row) {
            $newObj = $creator->create($className);
            $newObj->setArrayTable($row);
            $ar[] = $newObj;
        }


        return $ar;
    }

    public static function dbResultToObjectsTree($hasilDb, $className) {



        if (!is_array($hasilDb)) {
            return FALSE;
        }
        if (!key_exists(1, $hasilDb)) {
            return FALSE;
        }
        if (count($hasilDb[1]) < 1) {
            return FALSE;
        }

        $creator = new Master_Box_Models_App_Creator();
        $ar = array();


        foreach ($hasilDb[1] as $row) {
            $newObj = $creator->create($className);
            Master_Box_Tools::setArrayTable($newObj, $row);

            $ar[] = $newObj;
        }


        return $ar;
    }

    public static function cleanDate($dateString) {
        if (strlen($dateString) > 5) {

            $ar = explode("T", $dateString);
            if (count($ar) == 2) {

                $dateString = $ar[0];
            }
        }

        return $dateString;
    }

    public static function cleanInt($request) {
        return intval($request) == 999 ? 0 : $request; // 999 = ALL
    }

    public static function globalParamsExist(Master_Box_Kouti_Session $session) {
        $hasil = array("status" => false, "msg" => "Checking global paramaters", "parameters" => []);
        /// first check system config
        // jika menggunakan global params dari system maka tidak menarik global params dari database
        if (!Master_Box_Config::SYS_USEDB_GLOBALPARAMS) {
            $hasil["status"] = true;
            $hasil["msg"] = "PARAMETERS FROM SYSTEM CONFIG";
            $hasil["parameters"] = array(
                Master_Box_GlobalParams::CHANGEPRICE_APPROVAL => Master_Box_GlobalParamsValue::CHANGEPRICE_APPROVAL,
                Master_Box_GlobalParams::CHANGEPRICE_SENDMAIL => Master_Box_GlobalParamsValue::CHANGEPRICE_APPROVE_GROUPID,
                Master_Box_GlobalParams::CHANGEPRICE_APPROVE_GROUPID => Master_Box_GlobalParamsValue::CHANGEPRICE_SENDMAIL
            );
        } else {

            $changePriceParams = new Master_Models_Sales_Change_ChangeParams($session);
            $dataParams = array();
            $msg = "";
            if ($changePriceParams->getUseAprroval() != NULL) {
                $dataParams[Master_Box_GlobalParams::CHANGEPRICE_APPROVAL] = $changePriceParams->getUseAprroval();
            } else {
                $msg .="," . Master_Box_GlobalParams::CHANGEPRICE_APPROVAL;
            }
            if ($changePriceParams->getSendMail() != NULL) {
                $dataParams[Master_Box_GlobalParams::CHANGEPRICE_SENDMAIL] = $changePriceParams->getSendMail();
            } else {
                $msg .="," . Master_Box_GlobalParams::CHANGEPRICE_SENDMAIL;
            }
            if ($changePriceParams->getGroupApproval() != NULL) {
                $dataParams[Master_Box_GlobalParams::CHANGEPRICE_APPROVE_GROUPID] = $changePriceParams->getGroupApproval();
            } else {
                $msg .="," . Master_Box_GlobalParams::CHANGEPRICE_APPROVE_GROUPID;
            }
            if (count($dataParams) == 3) {
                $hasil["status"] = TRUE;
                $hasil["msg"] = "SUCCESS GET PARAMETERS";
                $hasil["parameters"] = $dataParams;
            } else {
                $hasil["msg"] = "Parameter " . $msg . " tidak ada";
            }
            // $app->prosesDao('global_params',$spkParams->getHasil());
        }
        return $hasil;
    }

    public static function globalParamsExistSpk(Master_Box_Kouti_Session $session) {
        $hasil = array("status" => false, "msg" => "Checking global paramaters", "parameters" => []);
        /// first check system config
        // jika menggunakan global params dari system maka tidak menarik global params dari database
        if (!Master_Box_Config::SYS_USEDB_GLOBALPARAMS) {
            $hasil["status"] = true;
            $hasil["msg"] = "PARAMETERS FROM SYSTEM CONFIG";
            $hasil["parameters"] = array(
                Master_Box_GlobalParams::SPK_ACTIVE_EACH_UNIT => Master_Box_GlobalParamsValue::SPK_ACTIVE_EACH_UNIT,
                Master_Box_GlobalParams::SPK_MAX_EACH_UNIT => Master_Box_GlobalParamsValue::SPK_MAX_EACH_UNIT,
                Master_Box_GlobalParams::SPK_MAX_UNIT_NUMBER => Master_Box_GlobalParamsValue::SPK_MAX_UNIT_NUMBER
            );
        } else {

            $spkParams = new Master_Models_Spk_SpkParams($session);





            $msg = "";

            $hasil["status"] = TRUE;
            $hasil["msg"] = "SUCCESS GET PARAMETERS";
            $hasil["parameters"] = array(
                Master_Box_GlobalParams::SPK_ACTIVE_EACH_UNIT => $spkParams->getMaxActivePerUnit(),
                Master_Box_GlobalParams::SPK_MAX_EACH_UNIT => $spkParams->getMaxPerUnit(),
                Master_Box_GlobalParams::SPK_MAX_UNIT_NUMBER => $spkParams->getMaxUnit()
            );
        }
        return $hasil;
    }

    public static function globalParamsExistChangeName(Master_Box_Kouti_Session $session) {
        $hasil = array("status" => false, "msg" => "Checking global paramaters", "parameters" => []);
        /// first check system config
        // jika menggunakan global params dari system maka tidak menarik global params dari database
        if (!Master_Box_Config::SYS_USEDB_GLOBALPARAMS) {
            $hasil["status"] = true;
            $hasil["msg"] = "PARAMETERS FROM SYSTEM CONFIG";
            $hasil["parameters"] = array(
                Master_Box_GlobalParams::CHANGENAME_APPROVAL => Master_Box_GlobalParamsValue::CHANGENAME_APPROVAL,
                Master_Box_GlobalParams::CHANGENAME_APPROVE_GROUPID => Master_Box_GlobalParamsValue::CHANGENAME_APPROVE_GROUPID,
                Master_Box_GlobalParams::CHANGENAME_SENDMAIL => Master_Box_GlobalParamsValue::CHANGENAME_SENDMAIL
            );
        } else {

            $params = new Master_Models_Sales_Change_ChangeNameParams($session);





            $msg = "";

            $hasil["status"] = TRUE;
            $hasil["msg"] = "SUCCESS GET PARAMETERS";
            $hasil["parameters"] = array(
                Master_Box_GlobalParams::CHANGENAME_APPROVAL => $params->getIsApproval(),
                Master_Box_GlobalParams::CHANGENAME_APPROVE_GROUPID => $params->getGroup(),
                Master_Box_GlobalParams::CHANGENAME_SENDMAIL => $params->getSendMail()
            );
        }
        return $hasil;
    }

    /// added 25 February 2015
    public static function globalParamsExistPayment(Master_Box_Kouti_Session $session) {
        $hasil = array("status" => false, "msg" => "Checking global paramaters", "parameters" => []);
        /// first check system config
        // jika menggunakan global params dari system maka tidak menarik global params dari database
        if (!Master_Box_Config::SYS_USEDB_GLOBALPARAMS) {
            $hasil["status"] = true;
            $hasil["msg"] = "PARAMETERS FROM SYSTEM CONFIG";
            $hasil["parameters"] = array(
                Master_Box_GlobalParams::PAYMENT_FINE_PERMIL => Master_Box_GlobalParamsValue::PAYMENT_FINE_PERMIL,
                Master_Box_GlobalParams::PAYMENT_TOLERANCE_LIMIT => Master_Box_GlobalParamsValue::PAYMENT_TOLERANCE_LIMIT
            );
        } else {

            $params = new Master_Models_Payment_Params($session);





            $msg = "";

            $hasil["status"] = TRUE;
            $hasil["msg"] = "SUCCESS GET PARAMETERS";
            $hasil["parameters"] = array(
                Master_Box_GlobalParams::PAYMENT_FINE_PERMIL => $params->getFinePermil(),
                Master_Box_GlobalParams::PAYMENT_TOLERANCE_LIMIT => $params->getToleranceLimit(),
                Master_Box_GlobalParams::PAYMENT_NONLINKPAY_DESC => $params->getNonLinkPayDesc(),
                Master_Box_GlobalParams::PAYMENT_OTHERPAY_DESC => $params->getOtherPayDesc()
            );
        }
        return $hasil;
    }

    // added 26 Mei 2015
    public static function globalParamsExistMasterCustomer(Master_Box_Kouti_Session $session) {
        $hasil = array("status" => false, "msg" => "Checking global paramaters", "parameters" => []);
        /// first check system config
        // jika menggunakan global params dari system maka tidak menarik global params dari database
        if (!Master_Box_Config::SYS_USEDB_GLOBALPARAMS) {
            $hasil["status"] = true;
            $hasil["msg"] = "PARAMETERS FROM SYSTEM CONFIG";
            $hasil["parameters"] = array(
                Master_Box_GlobalParams::MASTERCUSTOMER_MANDATORYFIELDS => Master_Box_GlobalParamsValue::MASTERCUSTOMER_MANDATORYFIELDS
            );
        } else {

            $params = new Master_Models_Customer_Params($session);

            $msg = "";

            $hasil["status"] = TRUE;
            $hasil["msg"] = "SUCCESS GET PARAMETERS";
            $hasil["parameters"] = array(
                Master_Box_GlobalParams::MASTERCUSTOMER_MANDATORYFIELDS => $params->getMandatoryFieldsCheck()
            );
        }
        return $hasil;
    }

    /// added 19 Januari 2017
    public static function globalParamsExistNew(Master_Box_Kouti_Session $session,$prefix) {
        $hasil = array("status" => false, "msg" => "Checking global paramaters", "parameters" => []);
        

            $params = new Master_Models_Parameter_ParamBuilder($session,$prefix);
            $msg = "";

            $hasil["status"] = TRUE;
            $hasil["msg"] = "SUCCESS GET PARAMETERS";
            $hasil["parameters"] = $params->getResult();
        
        return $hasil;
    }
    
    
    public static function globalParamsExistPurchaseletter(Master_Box_Kouti_Session $session) {
        $hasil = array("status" => false, "msg" => "Checking global paramaters", "parameters" => []);
        /// first check system config
        // jika menggunakan global params dari system maka tidak menarik global params dari database
        if (!Master_Box_Config::SYS_USEDB_GLOBALPARAMS) {
            $hasil["status"] = true;
            $hasil["msg"] = "PARAMETERS FROM SYSTEM CONFIG";
            $hasil["parameters"] = array(
                Master_Box_GlobalParams::PURCHASELETTER_CASH_DESC => Master_Box_GlobalParamsValue::PURCHASELETTER_CASH_DESC,
                Master_Box_GlobalParams::PURCHASELETTER_INHOUSE_DESC => Master_Box_GlobalParamsValue::PURCHASELETTER_INHOUSE_DESC,
                Master_Box_GlobalParams::PURCHASELETTER_KPR_DESC => Master_Box_GlobalParamsValue::PURCHASELETTER_KPR_DESC,
                Master_Box_GlobalParams::PURCHASELETTER_ENABLE_EDITNUMBER => 0,
                Master_Box_GlobalParams::PURCHASELETTER_SUPERUSER_GROUPID=>0
            );
        } else {

            $params = new Master_Models_Purchaseletter_Params($session);





            $msg = "";

            $hasil["status"] = TRUE;
            $hasil["msg"] = "SUCCESS GET PARAMETERS";
            $hasil["parameters"] = array(
                Master_Box_GlobalParams::PURCHASELETTER_CASH_DESC => $params->getCashDesc(),
                Master_Box_GlobalParams::PURCHASELETTER_INHOUSE_DESC => $params->getInhouseDesc(),
                Master_Box_GlobalParams::PURCHASELETTER_KPR_DESC => $params->getKprDesc(),
                Master_Box_GlobalParams::PURCHASELETTER_BIAYA_AKTAJUALBELI => $params->getBiayaAktaJualBeli(),
                Master_Box_GlobalParams::PURCHASELETTER_BIAYA_BALIKNAMA => $params->getBiayaBalikNama(),
                Master_Box_GlobalParams::PURCHASELETTER_BIAYA_PEROLEHANHAK => $params->getBiayaPerolehanHak(),
                Master_Box_GlobalParams::PURCHASELETTER_STATUS_PROJECT => $params->getStatusProject(),
                Master_Box_GlobalParams::PURCHASELETTER_ENABLE_EDITNUMBER => $params->getEnableEditNumber(),
                Master_Box_GlobalParams::PURCHASELETTER_SUPERUSER_GROUPID => $params->getSuperUserGroupId()
            );
        }
        return $hasil;
    }

    public static function globalParamsExistChangeKavling(Master_Box_Kouti_Session $session) {
        $hasil = array("status" => false, "msg" => "Checking global paramaters", "parameters" => []);
        /// first check system config
        // jika menggunakan global params dari system maka tidak menarik global params dari database
        if (!Master_Box_Config::SYS_USEDB_GLOBALPARAMS) {
            $hasil["status"] = true;
            $hasil["msg"] = "PARAMETERS FROM SYSTEM CONFIG";
            $hasil["parameters"] = array(
                Master_Box_GlobalParams::CHANGEKAVLING_APPROVAL => Master_Box_GlobalParamsValue::CHANGEKAVLING_APPROVAL,
                Master_Box_GlobalParams::CHANGEKAVLING_APPROVE_GROUPID => Master_Box_GlobalParamsValue::CHANGEKAVLING_APPROVE_GROUPID,
                Master_Box_GlobalParams::CHANGEKAVLING_SENDMAIL => Master_Box_GlobalParamsValue::CHANGEKAVLING_SENDMAIL
            );
        } else {

            $params = new Master_Models_Sales_Change_ChangeKavlingParams($session);





            $msg = "";

            $hasil["status"] = TRUE;
            $hasil["msg"] = "SUCCESS GET PARAMETERS";
            $hasil["parameters"] = array(
                Master_Box_GlobalParams::CHANGEKAVLING_APPROVAL => $params->getIsApproval(),
                Master_Box_GlobalParams::CHANGEKAVLING_APPROVE_GROUPID => $params->getGroup(),
                Master_Box_GlobalParams::CHANGEKAVLING_SENDMAIL => $params->getSendMail()
            );
        }
        return $hasil;
    }

    public static function globalParamsExistConstruction(Master_Box_Kouti_Session $session) {
        $hasil = array("status" => false, "msg" => "Checking global paramaters", "parameters" => []);
        /// first check system config
        // jika menggunakan global params dari system maka tidak menarik global params dari database
        if (!Master_Box_Config::SYS_USEDB_GLOBALPARAMS) {
            $hasil["status"] = true;
            $hasil["msg"] = "PARAMETERS FROM SYSTEM CONFIG";
            $hasil["parameters"] = array(
                Master_Box_GlobalParams::CONSTRUCTION_SEND_MAIL => Master_Box_GlobalParamsValue::CONSTRUCTION_SEND_MAIL
            );
        } else {

            $params = new Master_Models_Construction_Params($session);





            $msg = "";

            $hasil["status"] = TRUE;
            $hasil["msg"] = "SUCCESS GET PARAMETERS";
            $hasil["parameters"] = array(
                Master_Box_GlobalParams::CONSTRUCTION_SEND_MAIL => $params->getSendMail(),
            );
        }
        return $hasil;
    }

    public static function globalParamsExistMarketingStock(Master_Box_Kouti_Session $session) {
        $hasil = array("status" => false, "msg" => "Checking global paramaters", "parameters" => []);
        /// first check system config
        // jika menggunakan global params dari system maka tidak menarik global params dari database
        if (!Master_Box_Config::SYS_USEDB_GLOBALPARAMS) {
            $hasil["status"] = true;
            $hasil["msg"] = "PARAMETERS FROM SYSTEM CONFIG";
            $hasil["parameters"] = array(
                Master_Box_GlobalParams::MARKETINGSTOCK_PPNBM => Master_Box_GlobalParamsValue::MARKETINGSTOCK_PPNBM,
                Master_Box_GlobalParams::MARKETINGSTOCK_PPH22 => Master_Box_GlobalParamsValue::MARKETINGSTOCK_PPH22
            );
        } else {

            $params = new Master_Models_Marketingstock_Params($session);





            $msg = "";

            $hasil["status"] = TRUE;
            $hasil["msg"] = "SUCCESS GET PARAMETERS";
            $hasil["parameters"] = array(
                Master_Box_GlobalParams::MARKETINGSTOCK_PPNBM => $params->getPpnbm(),
                Master_Box_GlobalParams::MARKETINGSTOCK_PPH22 => $params->getPph22()
            );
        }
        return $hasil;
    }
    
    public static function globalParamsExistProsesCAC(Master_Box_Kouti_Session $session) {
        $hasil = array("status" => false, "msg" => "Checking global paramaters", "parameters" => []);
        /// first check system config
        // jika menggunakan global params dari system maka tidak menarik global params dari database
        if (!Master_Box_Config::SYS_USEDB_GLOBALPARAMS) {
            $hasil["status"] = true;
            $hasil["msg"] = "PARAMETERS FROM SYSTEM CONFIG";
            $hasil["parameters"] = array(
                Master_Box_GlobalParams::PROSESCAC_NILAI_KELIPATAN => Master_Box_GlobalParamsValue::PROSESCAC_NILAI_KELIPATAN
            );
        } else {

            $params = new Master_Models_Cac_Params($session);





            $msg = "";

            $hasil["status"] = TRUE;
            $hasil["msg"] = "SUCCESS GET PARAMETERS";
            $hasil["parameters"] = array(
                Master_Box_GlobalParams::PROSESCAC_NILAI_KELIPATAN => $params->getNilaiKelipatan()
            );
        }
        return $hasil;
    }
    
    public static function globalParamsExistGeneral(Master_Box_Kouti_Session $session) {
        $hasil = array("status" => false, "msg" => "Checking global paramaters", "parameters" => []);
        /// first check system config
        // jika menggunakan global params dari system maka tidak menarik global params dari database
        if (!Master_Box_Config::SYS_USEDB_GLOBALPARAMS) {
            $hasil["status"] = true;
            $hasil["msg"] = "PARAMETERS FROM SYSTEM CONFIG";
            $hasil["parameters"] = array(
                'GENERAL' => 'GENERAL_VALUE'
            );
        } else {

            $params = new Master_Models_General_Params($session);

            $msg = "";

            $hasil["status"] = TRUE;
            $hasil["msg"] = "SUCCESS GET PARAMETERS";
            $hasil["parameters"] = array(
                Master_Box_GlobalParams::GENERAL_PROSESSP_SP1_HARI => $params->getProsesSp1Hari(),
                 Master_Box_GlobalParams::GENERAL_PROSESSP_SP2_HARI => $params->getProsesSp2Hari(),
                 Master_Box_GlobalParams::GENERAL_PROSESSP_SP3_HARI => $params->getProsesSp3Hari(),
                 Master_Box_GlobalParams::GENERAL_PROSESSP_SP4_HARI => $params->getProsesSp4Hari()
                
            );
        }
        return $hasil;
    }

    public static function toCurrency($value) {
        $currency = new Zend_Currency(
                array(
            'value' => $value,
            'script' => 'Latn',
            'symbol' => ' ',
                )
        );
        return $currency;
    }

    public static function formatDate($date, $format = 'd-m-Y') {
        return date($format, strtotime($date));
    }

    public static function indoDayText($dayLetter) {
        $d = 'Senin';
        switch ($dayLetter) {
            case 'Sun': $d = 'Minggu';
                break;
            case 'Min': $d = 'Senin';
                break;
            case 'Tue': $d = 'Selasa';
                break;
            case 'Wed': $d = 'Rabu';
                break;
            case 'Thu': $d = 'Kamis';
                break;
            case 'Fri': $d = 'Jumat';
                break;
            case 'Sat': $d = 'Sabtu';
                break;
        }
        return $d;
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
    
    public static function romawiMonthText($monthNumber,$isUppercase=TRUE) {
        
        $d = 'XXXXX';
        switch ($monthNumber) {
            case 1: $d = 'I';
                break;
            case 2: $d = 'II';
                break;
            case 3: $d = 'III';
                break;
            case 4: $d = 'IV';
                break;
            case 5: $d = 'V';
                break;
            case 6: $d = 'VI';
                break;
            case 7: $d = 'VII';
                break;
            case 8: $d = 'VIII';
                break;
            case 9: $d = 'IX';
                break;
            case 10: $d = 'X';
                break;
            case 11: $d = 'XI';
                break;
            case 12: $d = 'XII';
                break;
        }
        $d = $isUppercase?$d:strtolower($d);
        return $d;
    }

    //////////////////////////////////////////////////////////////////////
    //@author : SunilKmCharde php.net
//PARA: Date Should In YYYY-MM-DD Format
//RESULT FORMAT:
// '%y Year %m Month %d Day %h Hours %i Minute %s Seconds'        =>  1 Year 3 Month 14 Day 11 Hours 49 Minute 36 Seconds
// '%y Year %m Month %d Day'                                    =>  1 Year 3 Month 14 Days
// '%m Month %d Day'                                            =>  3 Month 14 Day
// '%d Day %h Hours'                                            =>  14 Day 11 Hours
// '%d Day'                                                        =>  14 Days
// '%h Hours %i Minute %s Seconds'                                =>  11 Hours 49 Minute 36 Seconds
// '%i Minute %s Seconds'                                        =>  49 Minute 36 Seconds
// '%h Hours                                                    =>  11 Hours
// '%a Days                                                        =>  468 Days
//////////////////////////////////////////////////////////////////////
    public static function dateDifference($date_1, $date_2, $differenceFormat = '%a') {
        $datetime1 = date_create($date_1);
        $datetime2 = date_create($date_2);

        $interval = date_diff($datetime1, $datetime2);

        return $interval->format($differenceFormat);
    }

    public static function cleanComboData($data, $fieldName) {
        $id = isset($data[$fieldName]) ? $data[$fieldName] : 0;

        $id = intval($id) == 999 ? 0 : $id;
        return $id;
    }

    public static function potongKalimat($maxStr=50,$text="sample") {
        

        $ar = array();
        $ar2 = array();
        $posisiSpasi = -1;
        $count = 0;
        $foundText = false;
        while (strlen($text) > 0) {
            $posisiSpasi = -1;
            $foundText = false;
            $ar[] = substr($text, 0, $maxStr);
            // cari spasi
            $posisiSpasi = strrpos($ar[$count], " ");


            if ($posisiSpasi > -1) {



                $foundText = substr($ar[$count], $posisiSpasi, strlen($ar[$count]));



                if ($text !== $ar[$count]) {
                    // $text = $foundText."".$text;
                    $text = $foundText . "" . $text;
                    //  $ar[$count] = substr($ar[$count],0,$posisiSpasi);
                    $ar2[$count] = substr($ar[$count], 0, $posisiSpasi);
                } else {
                    $ar2[$count] = $ar[$count];
                }
            } else {
                $ar2[$count] = $ar[$count];
            }



            $text = str_replace($ar[$count], "", $text);
            $count++;
        }
        
        return $ar2;
    }
    
    public static function akda($x) {

        // x = me.intval(x);
        $x = intval($x);
        return $x < 10 ? "0" . $x : $x;
    }
    
    /* added 9 Mei 2016*/
    public static function codeExist($dataDao, Master_Box_Models_ObjectEmbedData $object, $fieldId) {
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
    
    public static function toObjectsc($objectName, $data, $isSingleRecord = FALSE, $groupEmbedPrefix = array()) {
        $objects = array();
        if (!key_exists(1, $data)) {
            return false;
        }
        $creator = new Master_Box_Models_App_Creator();
        $converter = new Master_Box_Models_App_Converter($data);
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
        
        
        
        if(Master_Box_Tools::adaRecord($data)){
            return Master_Box_Tools::toObjectsc(str_replace("_","", $class->getEmbedPrefix()), $data,TRUE,$groupEmbedPrefix);
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
        
        
        
        if(Master_Box_Tools::adaRecord($data)){
            return Master_Box_Tools::toObjectsc(str_replace("_","", $class->getEmbedPrefix()), $data,FALSE,$groupEmbedPrefix);
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

    public static function paymentPrintPDF($data,$session,$sortkasbank_id,$formatAr,$pdfObject=NULL){
     $pdf = NULL;
        $hasil = FALSE;

            $pdf = isset($pdfObject)?$pdfObject:Master_Models_Transaction_PrintPdfSelector::getLib($session['project_id'], $session['pt_id']);


            $pdf->run($session, $data,$sortkasbank_id,$formatAr);

            $hasil = TRUE;
       // }
        
        return array(
            "hasil"=>$hasil,
            "file"=>$pdf->getFileName()
        );
    }

    public static function validasiTanggalPurchase($purchaseDate, $hariClosing = 4) {
        $msg = "Proses validasi tanggal.";
        $hasil = FALSE;
        // $hariClosing = 4; // tanggal closing

        $tanggalClosing = new DateTime("1900-01-01 00:00:00.000000");
        $tanggalSekarang = new DateTime("1900-01-01 00:00:00.000000");
        $tanggalSekarang->setDate(date("Y"), date("m"), date("d"));
        $tanggalPurchase = new DateTime($purchaseDate);
        $tanggalAwalBulanIni = new DateTime("1900-01-01 00:00:00.000000");
        $tanggalAwalBulanSebelum = new DateTime("1900-01-01 00:00:00.000000"); // bulan sebelum bulan sekarang
        $tanggalAwalBulanSebelum->setDate(date("Y"), date("m"), date("d"));
        $tanggalAwalBulanSebelum->sub(new DateInterval('P1M'));
        $tanggalClosingMin1 = new DateTime("1900-01-01 00:00:00.000000");

        $tahunSekarang = $tanggalSekarang->format("Y");
        $bulanSekarang = $tanggalSekarang->format("m");
        $hariSekarang = $tanggalSekarang->format("d");

        $tanggalClosing->setDate($tahunSekarang, $bulanSekarang, $hariClosing);
        $tanggalClosingMin1->setDate($tahunSekarang, $bulanSekarang, $hariClosing);
        $tanggalClosingMin1->sub(new DateInterval('P1D'));
        $tanggalAwalBulanIni->setDate($tahunSekarang, $bulanSekarang, 1);


        $tanggalAwalBulanSebelum->setDate($tanggalAwalBulanSebelum->format("Y"), $tanggalAwalBulanSebelum->format("m"), 1);
        $interval = $tanggalClosing->diff($tanggalPurchase);


        if ($hariClosing > 0) {


         


            // tanggal sama abaikan
            if ($tanggalPurchase <= $tanggalSekarang) {
                if ($tanggalSekarang > $tanggalClosing) {
               
                  
                    if ($tanggalPurchase >= $tanggalAwalBulanIni && $tanggalPurchase <= $tanggalSekarang) {
                $hasil = TRUE;
                $msg = "Sukses";
        
                    } else {
                 
                        //  $msg = "Tanggal purchase harus di antara " . $tanggalAwalBulanIni->format("d-m-Y") . " dan " . $tanggalSekarang->format("d-m-Y");
                        $msg = "Tanggal transaksi harus di antara " . $tanggalAwalBulanIni->format("d-m-Y") . " dan " . $tanggalSekarang->format("d-m-Y");
                    }
                } else if($tanggalSekarang==$tanggalClosing){
                    if ($tanggalPurchase >= $tanggalAwalBulanSebelum && $tanggalPurchase <=  $tanggalSekarang) {
                        $hasil = TRUE;
                        $msg = "Sukses";
            } else {
                        //  $msg = "Tanggal purchase harus di antara " . $tanggalAwalBulanIni->format("d-m-Y") . " dan " . $tanggalSekarang->format("d-m-Y");
                        $msg = "Tanggal transaksi harus di antara " . $tanggalAwalBulanSebelum->format("d-m-Y") . " dan " . $tanggalSekarang->format("d-m-Y");
                    }

                   
                }else{
                    if ($tanggalPurchase >= $tanggalAwalBulanSebelum && $tanggalPurchase <=  $tanggalClosingMin1) {
                        $hasil = TRUE;
                        $msg = "Sukses";
                    } else {
                        //  $msg = "Tanggal purchase harus di antara " . $tanggalAwalBulanIni->format("d-m-Y") . " dan " . $tanggalSekarang->format("d-m-Y");
                        $msg = "Tanggal transaksi harus di antara " . $tanggalAwalBulanSebelum->format("d-m-Y") . " dan " . $tanggalClosingMin1->format("d-m-Y");
                    }
                }
            } else {
                $msg = "Tanggal transaksi harus lebih kecil sama dengan " . $tanggalSekarang->format("d-m-Y");
            }


                /*
                if ($tanggalPurchase > $tanggalClosing) {
                    if ($tanggalAwalBulanIni <= $tanggalPurchase && $tanggalPurchase <= $tanggalSekarang) {
                        $hasil = TRUE;
                        $msg = "Sukses";
                    } else {
                        //  $msg = "Tanggal purchase harus di antara " . $tanggalAwalBulanIni->format("d-m-Y") . " dan " . $tanggalSekarang->format("d-m-Y");
                        $msg = "Tanggal transaksi harus di antara " . $tanggalAwalBulanSebelum->format("d-m-Y") . " dan " . $tanggalSekarang->format("d-m-Y");
                    }
                } else {

                    if ($tanggalAwalBulanSebelum <= $tanggalPurchase && $tanggalPurchase <= $tanggalClosingMin1) {
                        $hasil = TRUE;

                        $msg = "Sukses";
                    } else {
                        $msg = "Tanggal transaksi harus di antara " . $tanggalAwalBulanSebelum->format("d-m-Y") . " dan " . $tanggalSekarang->format("d-m-Y");

                        //$msg = "Tanggal purchase harus di antara " . $tanggalAwalBulanSebelum->format("d-m-Y") . " dan " . $tanggalClosingMin1->format("d-m-Y");
                    }
                }
                 
                 */
            
        } else {
            
            if ($tanggalPurchase <= $tanggalSekarang) {
                $hasil = TRUE;

                $msg = "Sukses";
               
            } else {
                $msg = "Tanggal transaksi harus lebih kecil sama dengan ". $tanggalSekarang->format("d-m-Y");

            }
        }






        return array(
            "HASIL" => $hasil,
            "MSG" => $msg
        );
    }

    /* jika $pembanding integer maka return integer, jika $pembanding array , maka cek $nilai termasuk di dalam array $pembanding tersebut atau gak */

    public static function integerOrArray($nilai, $pembanding) {
        $hasil = FALSE;
        if (is_array($pembanding)) {
            $hasil = in_array($nilai, $pembanding);
        } else {
            $hasil = $nilai == $pembanding ? TRUE : FALSE;
        }
        return $hasil;
    }

    public static function arrayInArrayNested($value,$field,$array){
        $hasil = FALSE;
        foreach($array as $row){
            if($row[$field]==$value){
                $hasil = TRUE;
                break;
            }
        }
        return $hasil;
    }

	
	//RESERVATION
    public static function globalParamsExistReservation(Master_Box_Kouti_Session $session) {
        $hasil = array("status" => false, "msg" => "Checking global paramaters", "parameters" => []);
        /// first check system config
        // jika menggunakan global params dari system maka tidak menarik global params dari database
        if (!Master_Box_Config::SYS_USEDB_GLOBALPARAMS) {
            $hasil["status"] = true;
            $hasil["msg"] = "PARAMETERS FROM SYSTEM CONFIG";
            $hasil["parameters"] = array(
                Master_Box_GlobalParams::RESERVATION_APPROVAL => Master_Box_GlobalParamsValue::RESERVATION_APPROVAL,
                Master_Box_GlobalParams::RESERVATION_APPROVE_GROUPID => Master_Box_GlobalParamsValue::RESERVATION_APPROVE_GROUPID,
                Master_Box_GlobalParams::RESERVATION_SENDMAIL => Master_Box_GlobalParamsValue::RESERVATION_SENDMAIL
            );
        } else {

            $params = new Master_Models_Sales_Change_ChangeNameParams($session);





            $msg = "";

            $hasil["status"] = TRUE;
            $hasil["msg"] = "SUCCESS GET PARAMETERS";
            $hasil["parameters"] = array(
                Master_Box_GlobalParams::CHANGENAME_APPROVAL => $params->getIsApproval(),
                Master_Box_GlobalParams::CHANGENAME_APPROVE_GROUPID => $params->getGroup(),
                Master_Box_GlobalParams::CHANGENAME_SENDMAIL => $params->getSendMail()
            );
        }
        return $hasil;
    }

    public static function getCurrentUserInfo(){
        return $_SESSION["Ciputra"]["common"]["user"];
    }
    
    public static function unformatMoney($moneyAmount){
        return preg_replace("/[^0-9.]/", '',$moneyAmount);
    }

}

?>
