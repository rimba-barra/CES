<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Gl_Models_Function_Helperdata extends Zend_Db_Table_Abstract {

    protected $session;

    public function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_model = new Gl_Models_Prosesposting_Modelsp;
    }
    
    public function textforquery($text){
        return "''".$text."''";
    }

    public function convertArrayToXML($array) {
        $return = "<?xml version='1.0' encoding='ISO-8859-1'?><PhpJsonXmlArrayStringInterchanger>";
        $return.=$this->parseArray($array);
        $return.="</PhpJsonXmlArrayStringInterchanger>";
        return $return;
    }

    private function parseArray($array) {
        if (is_array($array)) {
            foreach ($array as $k => $v) {
                if (trim($k) == "") {
                    $this->errorLog[] = "Array needs to be associative as parameter in function: " . __FUNCTION__ . " on line: " . __LINE__ . " in filename= " . __FILE__;
                    return false;
                } else {
                    if (is_numeric($k)) {
                        $k = "nodeValue$k";
                    }
                    if (is_array($v)) {
                        $return.="<$k>" . $this->parseArray($v) . "</$k>";
                    } else {
                        $return.="<$k>$v</$k>";
                    }
                }
            }
        } else {
            $this->errorLog[] = "Invalid array in function: " . __FUNCTION__ . " on line: " . __LINE__ . " in filename= " . __FILE__;
            return false;
        }
        return $return;
    }

    public function rangeActiveYear() {
        $tmp = explode("_", $this->session->getSelectedDbApp());
        $rdate = $this->_model->getendofpostingdate();

        $day = date('d', strtotime("+1 day", strtotime($rdate['voucher_date'])));
        $month = date('m', strtotime("+1 month", strtotime($rdate['voucher_date'])));
        $year = $tmp[1];

        $countday = $this->sum_day($month, $year);
        $countday2 = $this->sum_day(12, $year);

        $date0 = date('d') . "-" . date('m') . "-" . $year;
        $date1 = $day . "-" . $month . "-" . $year;
        $date2 = $countday . "-" . $month . "-" . $year;
        $date3 = $countday2 . "-" . 12 . "-" . $year;

        $onedate = date('d-m-Y', strtotime($date0));
        $from = date('d-m-Y', strtotime($date1));
        $until = date('d-m-Y', strtotime($date2));
        $enddescmonth = date('d-m-Y', strtotime($date3));

        $record = array(
            "onedate" => $onedate,
            "fromdate" => $from,
            "untildate" => $until,
            "yeardb" => $year,
            "enddecember" => $enddescmonth,
        );
        return $record;
    }

    public function rangeCurrentYear() {

        $rdate = $this->_model->getendofpostingdate();

        $day = date('d', strtotime("+1 day", strtotime($rdate['voucher_date'])));
        $month = date('m', strtotime("+1 month", strtotime($rdate['voucher_date'])));
        $year = date('Y');

        $countday = $this->sum_day($month, $year);
        $countday2 = $this->sum_day(12, $year);

        $date0 = date('d') . "-" . date('m') . "-" . $year;
        $date1 = $day . "-" . $month . "-" . $year;
        $date2 = $countday . "-" . $month . "-" . $year;
        $date3 = $countday2 . "-" . 12 . "-" . $year;

        $onedate = date('d-m-Y', strtotime($date0));
        $from = date('d-m-Y', strtotime($date1));
        $until = date('d-m-Y', strtotime($date2));
        $enddescmonth = date('d-m-Y', strtotime($date3));

        $record = array(
            "onedate" => $onedate,
            "fromdate" => $from,
            "untildate" => $until,
            "yeardb" => $year,
            "enddecember" => $enddescmonth,
        );
        return $record;
    }
    
    function getFromanduntildate($param){        
        $countday = $this->sum_day($param["month"], $param["year"]);        
        $date1 =  "01-" . $param["month"] . "-" . $param["year"];
        $date2 = $countday . "-" . $param["month"] . "-" . $param["year"];
        
        $countdaydesc = $this->sum_day(12, $param["year"]);
        $decemberend = $countdaydesc . "-" . 12 . "-" . $param["year"];
        
        $from = date('d-m-Y', strtotime($date1));
        $until = date('d-m-Y', strtotime($date2));
        
        $record = array(
            "fromdate" => $from,
            "untildate" => $until, 
            "enddecember" => $decemberend,
        );
        
        return $record;
        
    }
    
    public function sum_day($bulan = 0, $tahun = '') {
        if ($bulan < 1 OR $bulan > 12) {
            return 0;
        }
        if (!is_numeric($tahun) OR strlen($tahun) != 4) {
            $tahun = date('Y');
        }
        if ($bulan == 2) {
            if ($tahun % 400 == 0 OR ( $tahun % 4 == 0 AND $tahun % 100 != 0)) {
                return 29;
            }
        }
        $jumlah_hari = array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
        return $jumlah_hari[$bulan - 1];
    }

    public function countMonth($fromdate, $untildate) {
        $from = new DateTime($fromdate);
        $until = new DateTime($untildate);
        $diff = $from->diff($until);
        $months = $diff->y * 12 + $diff->m + $diff->d / 30;
        return (int) round($months);
    }

}
