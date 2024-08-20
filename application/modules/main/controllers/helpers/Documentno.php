<?php

/* --------------------------------------------------
 * HELPER untuk generate Document Numbering
 * 
 * Helper ini akan membantu pembuatan format document numbering
 * proses akan membaca table setting format pd table M_DOCUMENTNUMBER
 * 
 * Table M_DOCUMENTNUMBER berisi format field berikut :
 * --------------------------------------------------------
 * FIELD NAME          |  DATA TYPE        
 * ----------------------------------------
 * documentnumber_id    int
 * apps_id              int
 * module_name          varchar(200)
 * reset_type           varchar(2)
 * format               varchar(200)
 * year                 int
 * month                int
 * day                  int
 * counter              int
 * project_id           int
 * pt_id                int
 * description          varchar(255)
 * addon                datetime
 * addby                int
 * modion               datetime
 * modiby               int
 * active               bit
 * inactiveon           datetime
 * inactiveby           int
 * reactiveon           datetime
 * reactiveby           int
 * deleted              bit
 * deletedon            datetime
 * deletedby            int
 * is_default           bit
 * 
 * PRIVATE FUNCTION 
 * --------------------------
 * month_to_roman             : Convert numeric bulan kedalam format angka Romawi
 * update_documentNo          : Update counter document number
 * create_documentNo          : Buat document number format kedalam table setting  
 * create_dynamicNo           : Buat dynamic document number format kedalam table setting
 * 
 * PUBLIC FUNCTION
 * -------------------------   
 * get_documentNo             : Generate Document number format untuk type General* 
 * get_dynamicNo              : Generate Document number format untuk type Dynamic  
 * get_AdvanceNo              : Generate Document number format untuk type Advance

 * 
 * CONTOH PENGUNAAN
 * -------------------------
 * 
 * 
 * 
 * 
 * 
 * Created By   : Jerry Peter (PT. Ciputra Development, MIS Dept)
 * LastUpdate   : 29 Mei 2016    
 * 
  ---------------------------------------------------- */

class Main_Helpers_Documentno extends Zend_Controller_Action_Helper_Abstract {

    protected $session;

    public function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->setsp = new Main_Helpers_Defineconnection();
    }

    private function month_to_roman($month) {
        $_return = $this->number_to_roman($month);
        return $_return;
    }

    private function update_documentNo($docId, $counter) {
        $param = $this->setParamUpdate($docId, $counter);
        $result = $this->setsp->execSP3('sp_docno_update', $param);
        $total = $result[0];
        if ($total < 1) {
            echo "Error in executing query.</br>";
        }
    }

    private function create_documentNo($project_id, $pt_id, $application_id, $module, $docdate) {
        $param = $this->setParamDefault($project_id, $pt_id, $application_id, $module);
        $result = $this->setsp->execSP3('sp_docno_getno_default', $param);
        $_row_count = $result[0][0]['RECORD_TOTAL'];
        if ($_row_count === 0) {
            echo "Error in retrieveing row count.";
        }
        if ($result === false) {
            echo "Error in executing query.</br>";
            var_dump($result);
            die();
        }
        foreach ($result[1] as $_row) {
            $_format = $_row['format'];
            $_reset_type = $_row['reset_type'];
            $_description = $_row['description'];
        }
        $reset = $this->resetType($_reset_type, $docdate);
        $param_insert = $this->setParamInsert($project_id, $pt_id, $application_id, $module, $_format, $_reset_type, $_description, $reset['yeardata'], $reset['monthdata'], $reset['daydata']);
        $this->setsp->execSP3('sp_docno_create', $param_insert);
    }

    private function create_dynamicNo($project_id, $pt_id, $application_id, $module, $var, $docdate) {
        $_module = $module;
        foreach ($var as $_key => $_value) {
            $_module = $_module . "/" . trim($_value);
        }

        $param = $this->setParamDefault($project_id, $pt_id, $application_id, $module);
        $result = $this->setsp->execSP3('sp_docno_getno_default', $param);
        $_row_count = $result[0][0]['RECORD_TOTAL'];

        if ($_row_count === false) {
            echo "Error in retrieveing row count.";
        }

        if ($result === false) {
            echo "Error in executing query.</br>";
            var_dump($result);
            die();
        }

        foreach ($result[1] as $_row) {
            $_format = $_row['format'];
            $_reset_type = $_row['reset_type'];
            $_description = $_row['description'];

            foreach ($var as $_key => $_value) {
                $_format = str_replace("[@$_key]", $_value, $_format);
            }
        }

        //SET DEFAULTS
        if(!isset($_reset_type)){
            $_reset_type = 'M';
        } 
        if(!isset($_description)){
            $_description = 'AUTO GENERATED';
        }
        if(!isset($_format)){
            $_format = 'GEN[XXXX]/[MM]';
        }
        
        $reset = $this->resetType($_reset_type, $docdate);
        $param_insert = $this->setParamInsert($project_id, $pt_id, $application_id, $_module, $_format, $_reset_type, $_description, $reset['yeardata'], $reset['monthdata'], $reset['daydata']);
        $this->setsp->execSP3('sp_docno_create', $param_insert);
    }

    public function get_documentNo($project_id, $pt_id, $application_id, $module, $var, $docdate, $flag) {
        $param = $this->setParamDefault($project_id, $pt_id, $application_id, $module);
        $result = $this->setsp->execSP3('sp_docno_getno_default', $param);
        $_row_count = $result[0][0]['RECORD_TOTAL'];

        if ($result === false) {
            echo "Error in executing query.</br>";
            var_dump($result);
            die();
        }
        if ($_row_count === 0) {
            // Jika query kosong berarti belum ada setting DEFAULT
            echo "Belum ada Setting Document Number Default !!";
            die();
        }

        foreach ($result[1] as $_row_format) {
            $_format = $_row_format['format'];
            foreach ($var as $_key => $_value) {
                $_format = str_replace("[@$_key]", $_value, $_format);
            }
            $_reset_type = strtoupper($_row_format['reset_type']);
            $_pos1 = strpos($_format, '[X');
            $_pos2 = strpos($_format, 'X]');
            $_length = ($_pos2 - $_pos1) * -1;
            $_project_code = $_row_format['project_code'];
            $_pt_code = $_row_format['pt_code'];

            $reset = $this->resetType($_reset_type, $docdate);

            $_year = $reset['yeardata'];
            $_month = $reset['monthdata'];
            $_day = $reset['daydata'];

            $paramcounter = $this->setParamCounter($project_id, $pt_id, $application_id, $module, $_year, $_month, $_day);
            $_result_counter = $this->setsp->execSP3('sp_docno_getno', $paramcounter);
            $_row_count_counter = $_result_counter[0][0]['RECORD_TOTAL'];

            if ($_result_counter === false) {
                echo "Error in executing query.</br>";
                var_dump($_result_counter);
                die();
            }

            if ($_row_count_counter === 0) {
                $_counter = 1;
                // Jika FLAG=1, create document format jika belum ada di system
                if ($flag === '1') {
                    $this->create_documentNo($project_id, $pt_id, $application_id, $module, $docdate);
                }
            } else {
                // -- Baca counter terakhir -- 
                foreach ($_result_counter[1] as $_row_counter) {
                    $_docId = $_row_counter['documentnumber_id'];
                    $_counter = $_row_counter['counter'] + 1;
                    // Jika FLAG=1, updte counter kedalam system
                    if ($flag === '1') {
                        $this->update_documentNo($_docId, $_counter);
                    }
                }
            }
            $stingformat = $this->stringFormat($docdate, $_counter, $_length);
            // --- End: Replace String Format ----
        }
        // -- Ganti @variable dengan data array
        $paramformat = $this->setArrayFormat($_format, $_project_code, $_pt_code, $stingformat);
        return $this->formatdocument($paramformat);
    }

    public function get_dynamicNo($project_id, $pt_id, $application_id, $module, $var, $docdate, $flag) {
        // -- Baca Variable dynamic Array 
        $_module = $module;
        if (!empty($var) || isset($var)) {
            foreach ($var as $_key => $_value) {
                $_module = $_module . "/" . trim($_value);
            }
        }
        $param = $this->setParamModule($project_id, $pt_id, $application_id, $_module);
        $_result_format = $this->setsp->execSP3('sp_docno_getno_default', $param);
        $_row_count_format = $_result_format[0][0]['RECORD_TOTAL'];

        if ($_result_format === false) {
            echo "Error in executing query.</br>";
            var_dump($_result_format);
            die();
        }

        if ($_row_count_format === 0) {
            // -- Jika format dynamic belum ada, cari default awal format 
            // -- QUERY CARI FORMAT DOC DEFAULT AWAL ---
            $paramdefault = $this->setParamDefault($project_id, $pt_id, $application_id, $module);
            $_result_default = $this->setsp->execSP3('sp_docno_getno_default', $paramdefault);
            $_row_count_default = $_result_default[0][0]['RECORD_TOTAL'];
            if ($_result_default === false) {
                echo "Error in executing query.</br>";
                die(print_r(sqlsrv_errors(), true));
            }
            if ($_row_count_default === 0) {
                // Jika query kosong berarti belum ada setting DEFAULT
                echo "Belum ada Setting Document Number Default !!";
                die();
            }
            // Pakai FORMAT DEFAULT untuk proses berikutnya
            $_result_format = $_result_default;
        }

        foreach ($_result_format[1] as $_row_format) {
            $_format = $_row_format['format'];
            //-- Ganti @variable pada format sesuai parameter dikirim
            foreach ($var as $_key => $_value) {
                $_format = str_replace("[@$_key]", $_value, $_format);
            }
            $_reset_type = strtoupper($_row_format['reset_type']);
            $_pos1 = strpos($_format, '[X');
            $_pos2 = strpos($_format, 'X]');
            $_length = ($_pos2 - $_pos1) * -1;
            $_project_code = $_row_format['project_code'];
            $_pt_code = $_row_format['pt_code'];

            $reset = $this->resetType($_reset_type, $docdate);
            $paramcounter = $this->setParamCounter($project_id, $pt_id, $application_id, $_module, $reset['yeardata'], $reset['monthdata'], $reset['daydata']);
            $_result_counter = $this->setsp->execSP3('sp_docno_getno', $paramcounter);
            $_row_count_counter = $_result_counter[0][0]['RECORD_TOTAL'];


            if ($_result_counter === false) {
                echo "Error in executing query.</br>";
                die(print_r(sqlsrv_errors(), true));
            }
            if ($_row_count_counter === 0) {
                // -- Setting belum ada di dalam system, generate dari COUNTER=1
                $_counter = 1;
                //-- Jika FLAG=1, create document format jika belum ada di system
                if ($flag === '1') {
                    $this->create_dynamicNo($project_id, $pt_id, $application_id, $module, $var, $docdate);
                }
            } else {
                // -- Baca counter terakhir jika setting sudah ada didalam system  
                foreach ($_result_counter[1] as $_row_counter) {
                    $_docId = $_row_counter['documentnumber_id'];
                    $_counter = $_row_counter['counter'] + 1;
                    //-- Jika FLAG=1, updte counter kedalam system
                    if ($flag === '1') {
                        $this->update_documentNo($_docId, $_counter);
                    }
                }
            }
            $stingformat = $this->stringFormat($docdate, $_counter, $_length);
        }
        $paramformat = $this->setArrayFormat($_format, $_project_code, $_pt_code, $stingformat);
        return $this->formatdocument($paramformat);
    }

    public function get_advanceNo($project_id, $pt_id, $application_id, $module, $var1, $var2, $docdate, $flag) {
        // -- Baca Variable dynamic Array 
        /*
          contoh :
          formatnya GL/[XXXXX]/[MM][@ClusterName][#BlockCode]
         */
        $_module = $module;
        if (!empty($var1) || isset($var1)) {
            foreach ($var1 as $_key => $_value) {
                $_module = $_module . "/" . trim($_value);
            }
        }
        $param = $this->setParamModule($project_id, $pt_id, $application_id, $_module);
        $_result_format = $this->setsp->execSP3('sp_docno_getno_default', $param);
        $_row_count_format = $_result_format[0][0]['RECORD_TOTAL'];

        if ($_result_format === false) {
            echo "Error in executing query.</br>";
            var_dump($_result_format);
        }

        if ($_row_count_format === 0) {
            // -- Jika format dynamic belum ada, cari default awal format 
            // -- QUERY CARI FORMAT DOC DEFAULT AWAL ---
            $paramdefault = $this->setParamDefault($project_id, $pt_id, $application_id, $module);
            $_result_default = $this->setsp->execSP3('sp_docno_getno_default', $paramdefault);
            $_row_count_default = $_result_default[0][0]['RECORD_TOTAL'];

            if ($_result_default === false) {
                echo "Error in executing query.</br>";
                var_dump($_result_default);
                die();
            }

            if ($_row_count_default === 0) {
                // Jika query kosong berarti belum ada setting DEFAULT
                echo "Belum ada Setting Document Number Default !!";
                die();
            }
            // Pakai FORMAT DEFAULT untuk proses berikutnya
            $_result_format = $_result_default;
        }

        foreach ($_result_format[1] as $_row_format) {
            $_format = $_row_format['format'];
            //-- Ganti @variable pada format sesuai parameter dikirim
            foreach ($var1 as $_key => $_value) {
                $_format = str_replace("[@$_key]", $_value, $_format);
            }
            // Replace #variable dengan data parameter $var2        
            foreach ($var2 as $_key => $_value) {
                $_format = str_replace("[#$_key]", $_value, $_format);
            }
            $_reset_type = strtoupper($_row_format['reset_type']);
            $_pos1 = strpos($_format, '[X');
            $_pos2 = strpos($_format, 'X]');
            $_length = ($_pos2 - $_pos1) * -1;
            $_project_code = $_row_format['project_code'];
            $_pt_code = $_row_format['pt_code'];

            $reset = $this->resetType($_reset_type, $docdate);
            $paramcounter = $this->setParamCounter($project_id, $pt_id, $application_id, $_module, $reset['yeardata'], $reset['monthdata'], $reset['daydata']);
            // QUERY Baca counter terakhir sesuai tanggal document yang diminta $DOCDATE
            $_result_counter = $this->setsp->execSP3('sp_docno_getno', $paramcounter);
            $_row_count_counter = $_result_counter[0][0]['RECORD_TOTAL'];

            if ($_result_counter === false) {
                echo "Error in executing query.</br>";
                var_dump($_result_counter);
                die();
            }

            if ($_row_count_counter === 0) {
                // -- Setting belum ada di dalam system, generate dari COUNTER=1
                $_counter = 1;
                //-- Jika FLAG=1, create document format jika belum ada di system
                if ($flag === '1') {
                    $this->create_dynamicNo($project_id, $pt_id, $application_id, $module, $var1, $docdate);
                }
            } else {
                // -- Baca counter terakhir jika setting sudah ada didalam system  
                foreach ($_result_counter[1] as $_row_counter) {
                    $_docId = $_row_counter['documentnumber_id'];
                    $_counter = $_row_counter['counter'] + 1;

                    //-- Jika FLAG=1, updte counter kedalam system
                    if ($flag === '1') {
                        $this->update_documentNo($_docId, $_counter);
                    }
                }
            }
            $stingformat = $this->stringFormat($docdate, $_counter, $_length);
        }
        $paramformat = $this->setArrayFormat($_format, $_project_code, $_pt_code, $stingformat);
        return $this->formatdocument($paramformat);
    }

    private function stringFormat($docdate, $_counter, $_length) {
        $_docno = substr("000000000000000000000000000000000$_counter", $_length);
        $_docno_x = "[" . str_repeat("x", abs($_length)) . "]";
        $_docno_X = "[" . str_repeat("X", abs($_length)) . "]";

        $_year = $docdate->format('Y');
        $_month = $docdate->format('m');
        $_day = $docdate->format('d');


        // --- Begin: Replace String Format ----
        $_DD = $docdate->format('d');                // Tanggal min 2 digit (ex. 01, 02 .. 31)
        $_dd = $docdate->format('j');                // Tanggal min 1 digit (ex. 1, 2, ... 31)
        $_MM = $docdate->format('m');                // Bulan min 2 Digit (ex. 01, 02 ... 12)
        $_mm = $docdate->format('n');                // Bulan min 1 Digit (ex. 1, 2 ... 12)
        $_MMM = strtoupper($docdate->format('M'));    // Bulan 3 Char (Ex. JAN, FEB .. DES)
        $_MMMM = strtoupper($docdate->format('F'));    // Bulan fullformat (JANUARI, FEBRUARY ... DESEMBER)          
        $_YYYY = $docdate->format('Y');                // Tahun 4 digit (Ex. 2015, 2016 ... dst)
        $_YY = $docdate->format('y');                // Tahun 2 digit (Ex. 15, 16 ... dst)    
        $_R = $this->month_to_roman($docdate->format('n')); // Convert bulan ke angka romawi ( I, II .. XII)         
        // --- End: Replace String Format ----

        $data = array(
            "docno" => $_docno, "docno_x" => $_docno_x, "docno_X" => $_docno_X, "year" => $_year, "month" => $_month, "day" => $_day,
            "DD" => $_DD, "dd" => $_dd, "MM" => $_MM, "mm" => $_mm, "MMM" => $_MMM, "MMMM" => $_MMMM, "YYYY" => $_YYYY, "YY" => $_YY, "R" => $_R
        );
        return $data;
    }

    private function setArrayFormat($_format, $_project_code, $_pt_code, $stingformat) {
        $paramformat = array(
            "format" => $_format,
            "project" => $_project_code,
            "pt" => $_pt_code,
            "YYYY" => $stingformat["YYYY"],
            "YY" => $stingformat["YY"],
            "yyyy" => $stingformat["YYYY"],
            "yy" => $stingformat["YY"],
            "DD" => $stingformat["DD"],
            "dd" => $stingformat["dd"],
            "MM" => $stingformat["MM"],
            "mm" => $stingformat["mm"],
            "MMM" => $stingformat["MMM"],
            "MMMM" => $stingformat["MMMM"],
            "R" => $stingformat["R"],
            "docno_x" => $stingformat["docno_x"],
            "docno_X" => $stingformat["docno_X"],
            "docno" => $stingformat["docno"]
        );
        return $paramformat;
    }

    private function formatdocument($arrparam) {
        $_return = $arrparam['format'];
        $_return = str_replace("[project]", $arrparam['project'], $_return);
        $_return = str_replace("[pt]", $arrparam['pt'], $_return);
        $_return = str_replace("[YYYY]", $arrparam['YYYY'], $_return);
        $_return = str_replace("[YY]", $arrparam['YY'], $_return);
        $_return = str_replace("[yyyy]", $arrparam['yyyy'], $_return);
        $_return = str_replace("[yy]", $arrparam['yy'], $_return);
        $_return = str_replace("[DD]", $arrparam['DD'], $_return);
        $_return = str_replace("[dd]", $arrparam['dd'], $_return);
        $_return = str_replace("[MM]", $arrparam['MM'], $_return);
        $_return = str_replace("[mm]", $arrparam['mm'], $_return);
        $_return = str_replace("[MMM]", $arrparam['MMM'], $_return);
        $_return = str_replace("[MMMM]", $arrparam['MMMM'], $_return);
        $_return = str_replace("[R]", $arrparam['R'], $_return);
        $_return = str_replace($arrparam['docno_x'], $arrparam['docno'], $_return);
        $_return = str_replace($arrparam['docno_X'], $arrparam['docno'], $_return);
        return $_return;
    }

    private function setParamDefault($project_id, $pt_id, $application_id, $module) {
        $param = array(
            $project_id,
            $pt_id,
            $application_id,
            $module
        );
        return $param;
    }

    private function setParamModule($project_id, $pt_id, $application_id, $_module) {
        $param = array(
            $project_id,
            $pt_id,
            $application_id,
            $_module,
        );
        return $param;
    }

    private function setParamCounter($project_id, $pt_id, $application_id, $module, $_year, $_month, $_day) {
        $data = array(
            $project_id,
            $pt_id,
            $application_id,
            $module,
            $_year,
            $_month,
            $_day
        );

        return $data;
    }

    private function setParamInsert($project_id, $pt_id, $application_id, $module, $_format, $_reset_type, $_description, $_year, $_month, $_day) {
        $param_insert = array(
            $project_id,
            $pt_id,
            $application_id,
            $module,
            $_format,
            $_reset_type,
            $_description,
            1,
            $_year,
            $_month,
            $_day,
            $this->session->getUserId()
        );
        return $param_insert;
    }

    private function setParamUpdate($docId, $counter) {
        $param = array(
            $docId,
            $counter
        );
        return $param;
    }

    //added 06-06-2016 - Ahmad Riadi
    function number_to_roman($integer, $upcase = true) {
        $table = array(
            'M' => 1000,
            'CM' => 900,
            'D' => 500,
            'CD' => 400,
            'C' => 100,
            'XC' => 90,
            'L' => 50,
            'XL' => 40,
            'X' => 10,
            'IX' => 9,
            'V' => 5,
            'IV' => 4,
            'I' => 1
        );
        $return = '';
        while ($integer > 0) {
            foreach ($table as $rom => $arb) {
                if ($integer >= $arb) {
                    $integer -= $arb;
                    $return .= $rom;
                    break;
                }
            }
        }
        return $return;
    }

    private function resetType($_reset_type, $docdate) {
        $_year = $docdate->format('Y');
        $_month = $docdate->format('m');
        $_day = $docdate->format('d');

        switch ($_reset_type) {
            case 'X':
                $_year = 0;
                $_month = 0;
                $_day = 0;
                break;
            case 'Y':
                $_year = $docdate->format('Y');
                $_month = 0;
                $_day = 0;
                break;
            case 'M':
                $_year = $docdate->format('Y');
                $_month = $docdate->format('m');
                $_day = 0;
                break;
            case 'D':
                $_year = $docdate->format('Y');
                $_month = $docdate->format('m');
                $_day = $docdate->format('d');
                break;
        }
        $record = array(
            "yeardata" => $_year,
            "monthdata" => $_month,
            "daydata" => $_day,
        );

        return $record;
    }

    public function get_advanceNoNew($project_id, $pt_id, $application_id, $module, $var1, $var2, $docdate, $flag) {
        // -- Baca Variable dynamic Array 
        /*
          contoh :
          formatnya GL/[XXXXX]/[MM][@ClusterName][#BlockCode]
         */
        $_module = $module;

        if (!empty($var1) || isset($var1)) {
            foreach ($var1 as $_key => $_value) {
                $_module = $_module . "/" . trim($_value);
            }
        }
        $param = $this->setParamModule($project_id, $pt_id, $application_id, $_module);
        $_result_format = $this->setsp->execSP3('sp_docno_getno_default', $param);
        $_row_count_format = $_result_format[0][0]['RECORD_TOTAL'];

        if ($_result_format === false) {
            echo "Error in executing query.</br>";
            var_dump($_result_format);
        }

        if ($_row_count_format === 0) {
            // -- Jika format dynamic belum ada, cari default awal format 
            // -- QUERY CARI FORMAT DOC DEFAULT AWAL ---
            $paramdefault = $this->setParamDefault($project_id, $pt_id, $application_id, $module);
            $_result_default = $this->setsp->execSP3('sp_docno_getno_default', $paramdefault);
            $_row_count_default = $_result_default[0][0]['RECORD_TOTAL'];

            if ($_result_default === false) {
                echo "Error in executing query.</br>";
                var_dump($_result_default);
                die();
            }

            if ($_row_count_default === 0) {
                // Jika query kosong berarti belum ada setting DEFAULT
                echo "Belum ada Setting Document Number Default !!";
                die();
            }
            // Pakai FORMAT DEFAULT untuk proses berikutnya
            $_result_format = $_result_default;
        }




        foreach ($_result_format[1] as $_row_format) {
            $_format = $_row_format['format'];
            //-- Ganti @variable pada format sesuai parameter dikirim
            foreach ($var1 as $_key => $_value) {
                $_format = str_replace("[@$_key]", $_value, $_format);
            }
            // Replace #variable dengan data parameter $var2        
            foreach ($var2 as $_key => $_value) {
                $_format = str_replace("[#$_key]", $_value, $_format);
            }


            $_reset_type = strtoupper($_row_format['reset_type']);
            $_pos1 = strpos($_format, '[X');
            $_pos2 = strpos($_format, 'X]');
            $_length = ($_pos2 - $_pos1) * -1;
            $_project_code = $_row_format['project_code'];
            $_pt_code = $_row_format['pt_code'];

            $reset = $this->resetType($_reset_type, $docdate);
            $paramcounter = $this->setParamCounter($project_id, $pt_id, $application_id, $_module, $reset['yeardata'], $reset['monthdata'], $reset['daydata']);
            // QUERY Baca counter terakhir sesuai tanggal document yang diminta $DOCDATE
            $_result_counter = $this->setsp->execSP3('sp_docno_getno', $paramcounter);
            $_row_count_counter = $_result_counter[0][0]['RECORD_TOTAL'];



            if ($_result_counter === false) {
                echo "Error in executing query.</br>";
                var_dump($_result_counter);
                die();
            }

            if ($_row_count_counter === 0) {
                // -- Setting belum ada di dalam system, generate dari COUNTER=1
                $_counter = 1;
                //-- Jika FLAG=1, create document format jika belum ada di system
                if ($flag === '1') {
                    
                    $this->create_dynamicNoNew($project_id, $pt_id, $application_id, $module, $var1, $docdate);
                }
            } else {
                // -- Baca counter terakhir jika setting sudah ada didalam system  
                foreach ($_result_counter[1] as $_row_counter) {
                    $_docId = $_row_counter['documentnumber_id'];
                    $_counter = $_row_counter['counter'] + 1;

                    //-- Jika FLAG=1, updte counter kedalam system
                    if ($flag === '1') {
                        $this->update_documentNo($_docId, $_counter);
                    }
                }
            }
            $stingformat = $this->stringFormat($docdate, $_counter, $_length);
        }
        $paramformat = $this->setArrayFormat($_format, $_project_code, $_pt_code, $stingformat);
        return $this->formatdocument($paramformat);
    }

    private function create_dynamicNoNew($project_id, $pt_id, $application_id, $module, $var, $docdate) {
        $_module = $module;
        foreach ($var as $_key => $_value) {
            $_module = $_module . "/" . trim($_value);
        }
        
        $param = $this->setParamModule($project_id, $pt_id, $application_id, $_module);
        $result = $this->setsp->execSP3('sp_docno_getno_default', $param);
    
        $_row_count = $result[0][0]['RECORD_TOTAL'];
    
        if ($_row_count === false) {
            echo "Error in retrieveing row count.";
        }

        if ($result === false) {
            echo "Error in executing query.</br>";
            var_dump($result);
            die();
        }
       
        foreach ($result[1] as $_row) {
            $_format = $_row['format'];
            $_reset_type = $_row['reset_type'];
            $_description = $_row['description'];

            foreach ($var as $_key => $_value) {
                $_format = str_replace("[@$_key]", $_value, $_format);
            }
        }
        $reset = $this->resetType($_reset_type, $docdate);
        $param_insert = $this->setParamInsert($project_id, $pt_id, $application_id, $_module, $_format, $_reset_type, $_description, $reset['yeardata'], $reset['monthdata'], $reset['daydata']);
        $this->setsp->execSP3('sp_docno_create', $param_insert);
    }

}
