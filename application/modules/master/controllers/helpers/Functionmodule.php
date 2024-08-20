<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
class Master_Helpers_Functionmodule extends Zend_Controller_Action_Helper_Abstract {
    protected $_session = null;
    protected $_publichpath = 'app/cashier';
    public function init() {
        $this->_session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
       
    } 
       
    function generatefile() {
        $filephp = basename(__FILE__, '.php');
        $filename = $filephp . '.js';
        $content_to_write = "contoh content file";
        $dir = $this->foldermodel();
        if (is_dir($dir) === false) {
            mkdir($dir);
        }
        if (!file_exists($dir . '/' . $filename)) {
            $filedata = fopen($dir . '/' . $filename, "w");
            fwrite($filedata, $content_to_write);
            fclose($filedata);
        }
    }
    
    function foldercontroller(){
        return $this->_publichpath.'/controller';
    }    
    function foldermodel(){
        return $this->_publichpath.'/model';
    }
    function folderstore(){
        return $this->_publichpath.'/store';
    }    
    function folderview(){
        return $this->_publichpath.'/view';
    }    
    function getpublicfolder(){
        return getcwd().$this->_publichpath;        
    }
    function getNameFile(){
         return basename(__FILE__,'.php');
    }
    
    function getpublicfolder_model(){
        $result = $this->getpublicfolder().'\model';
        return $result;
    }
    
    function getpublicfolder_store(){
        $result = $this->getpublicfolder().'\store';
        return $result;
    }        

    public function txt($text) {
        return "''" . $this->clean_specialcaracter($text) . "''";
    }
    public function textforquery($text) {
        return "''" . $text . "''";
    }

    public function array_to_xml($array, $level = 1) {
        // default level 0
        $xml = ($level == 0) ? '<?xml version="1.0" encoding="ISO-8859-1"?>' . PHP_EOL : '';
        $tab = str_pad('', $level, '  ', STR_PAD_LEFT);
        foreach ($array as $node => $value) {
            $xml .= "{$tab}<{$node}>";
            if (!is_array($value)) {
                $xml .= $this->clean_specialcaracter($value);
            } else {
                $level++;               
                $xml .= PHP_EOL . $this->array_to_xml($value, $level) . $tab;
            }
            $xml .= "</{$node}>" . PHP_EOL;
        }        
        return '<root>'.$xml.'</root>';
    }
    function clean_specialcaracter($string) {
        $string = str_replace('&', '&amp;', $string); 
        $string = str_replace('<', '&lt;', $string); 
        $string = str_replace('>', '&gt;', $string); 
        $string = str_replace('"', '&quot;', $string); 
        $string = str_replace("'", '`', $string); 
        return $string; 
     }

    public function getindex_array($array, $field, $search) {
        //example 
        foreach ($array as $key => $row) {
            if (trim(strtolower($row[$field])) === trim(strtolower($search)))
                return $key;
        }
        return false;
    }

    public function extract_array($array) {
        $keydata = array();
        $values = array();
        $setdata = array();
        $where = array();

        foreach ($array as $key => $value) {
            $keydata[] = $key;
            $values[] = $value;
            $setdata[] = $key . '=' . $value;
            $where[] = ' AND ' . $key . '=' . $value;
        }

        $wherefix = "
                        WHERE 
                                active =1 
                            AND deleted =0 
                            AND project_id =$this->_project_id 
                            AND pt_id=$this->_pt_id 
                     ";

        $setwhere = $wherefix . implode(" ", $where);

        $return = array(
            "key" => implode(",", $keydata),
            "values" => implode(",", $values),
            "setdata" => implode(",", $setdata),
            "whereset" => $setwhere,
            "wherefix" => $wherefix,
        );

        return $return;
    }
    
    public function rangebackDate($date) {
        $backmonthdate = date('Y-m-d', strtotime("-1 month", strtotime($date)));
        $tmpdate = explode("-", $backmonthdate);
        $year = $tmpdate[0];
        $month = $tmpdate[1];
        $day = $tmpdate[2];   
        $startdatemonth = date('Y-m-d', strtotime($year . '-' . $month . '-01'));
        $enddatemonth = date('Y-m-t', strtotime($backmonthdate));
        
        $return = array(
            "fromdate"=>$startdatemonth,
            "untildate"=>$enddatemonth,
        );
        
        return $return;
        
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
