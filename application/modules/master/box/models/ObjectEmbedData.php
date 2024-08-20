<?php

/**
 * Description of ObjectEmbedData
 *
 * @author MIS
 */
class Master_Box_Models_ObjectEmbedData extends Master_Box_Models_TemplateDataObject implements Master_Box_Converter_EmbedData, Master_Box_Kouti_ObjectTable {

    protected $arrayTable;
    protected $embedPrefix;
    protected $groupedEmbed;
    /* added 4 maret 2014 */
    /* @type string */
    protected $fieldPrefix;

    public function __construct() {
        parent::__construct();

        $this->arrayTable = $this->getArrayTable();
        $this->groupedEmbed = array();
        $this->fieldPrefix = "";
    }

    public function setGroupedEmbed($g) {
        $this->groupedEmbed = $g;
    }

    public function getPrefixTable() {
        return $this->embedPrefix;
    }

    public function getArrayTable() {
        
    }

    public function setArrayTable($dataArray) {
        
    }

    public function setParamByIndexArray($name, $value) {

        /*
          if (key_exists($name, $this->arrayTable)) {
          $this->arrayTable[$name] = $value;
          }
         */
        if (is_array($this->arrayTable)) {
            if (key_exists($name, $this->arrayTable)) {
                $this->arrayTable[$name] = $value;
            }
        }
    }

    public function getArrayEmbed($ar = NULL) {
        $ar = $ar == NULL ? array() : $ar;
        $fixPrefix = str_replace("_", "", $this->getPrefixTable());
        $printAr = $this->getArrayTable();
        $datAr = array();
        foreach ($printAr as $row => $value) {
            if ($value != NULL) {
                $datAr[$row] = $value;
            }
        }
        $ar[$fixPrefix] = $datAr;
        $this->prosesGroupedEmbed($ar);
        return $ar;
    }

    public function prosesGroupedEmbed(&$ar) {
        $ge = $this->groupedEmbed;
        if (is_array($ge)) {
            foreach ($ge as $row) {
                $ar = $row->getArrayEmbed($ar);
            }
        }
    }

    /* @param string $prefixTable
     * if $embed == TRUE , add prefix table to the name
     */
    /* modified 30 April 2014 */

    public function getMappingArray($embed = FALSE) {
        $fixPrefix = str_replace("_", "", $this->getPrefixTable());
        $ar = $this->getArrayTable();
        $newAr = array();
        $df = $this->getDatefields();
        $dcf = $this->getDecimalfields();
        if (!is_array($ar))
            return $newAr;
        foreach ($ar as $k => $v) {
            $text = $fixPrefix . "." . $k;
            $nameKey = $embed ? $fixPrefix . "_" . $k : $k;
            $x = array("name" => $nameKey, "mapping" => $text);
            $y = array();
            if (in_array($k, $df)) {
                $y = array("type" => "date", "dateFormat" => "Y-m-d H:i:s.u");
            }
            if (in_array($k, $dcf)) {
                $y = array("type" => "decimal");
            }
            $x = array_merge($x, $y);
            $newAr[] = $x;
        }
        return $newAr;
    }

    public function getEmbedPrefix() {
        return $this->embedPrefix;
    }

    public function setEmbedPrefix($embedPrefix) {
        $this->embedPrefix = $embedPrefix;
    }

    /* added 4 maret 2014 */

    public function getFieldPrefix() {
        return $this->fieldPrefix;
    }

    public function setFieldPrefix($fieldPrefix) {
        $this->fieldPrefix = $fieldPrefix;
    }

    /* added 23 april 2014 */

    protected final function toDateTime($date) {
        $date = (string) $date;
        $x = '';
        if (strlen($date) > 0) {
            $x = date('Y-m-d h:m:s', strtotime($date));
        }
        return $x;
    }

    protected function getDatefields() {
        return array();
    }

    protected function getDecimalfields() {
        return array();
    }

    // ignore default date from sql server '1900-01-01'
    protected function ignoredd($dateString) {
        return $dateString == '1900-01-01' ? NULL : $dateString;
    }
    
    

}

?>
