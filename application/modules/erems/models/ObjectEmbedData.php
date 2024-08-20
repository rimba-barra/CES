<?php

/**
 * Description of ObjectEmbedData
 *
 * @author MIS
 */
class Erems_Models_ObjectEmbedData extends Erems_Models_TemplateDataObject implements Erems_Converter_EmbedData, Erems_Kouti_ObjectTable {

    protected $arrayTable;
    protected $embedPrefix;
    protected $groupedEmbed;
    /*added 4 maret 2014*/
    /*@type string*/
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
      
        if (key_exists($name, $this->arrayTable)) {
            $this->arrayTable[$name] = $value;
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
        foreach ($ge as $row) {
            $ar = $row->getArrayEmbed($ar);
        }
    }

    /* @param string $prefixTable
     * if $embed == TRUE , add prefix table to the name
     */
    /* modified 25 Juni 2014 */
    public function getMappingArray($embed = FALSE) {
        $fixPrefix = str_replace("_", "", $this->getPrefixTable());
        $ar = $this->getArrayTable();
        $newAr = array();
        $df = $this->getDatefields();
        if(!is_array($ar))return $newAr;
        foreach ($ar as $k => $v) {
            $text = $fixPrefix . "." . $k;
            $nameKey = $embed ? $fixPrefix . "_" . $k : $k;
            $x = array("name" => $nameKey, "mapping" => $text);
            $y = array();
            if(in_array($k,$df)){
                $y = array("type"=>"date");
            }
            $x = array_merge($x,$y);
            $newAr[] = $x;
        }
        return $newAr;
    }
    /*
    public function getMappingArray($embed = FALSE) {
        $fixPrefix = str_replace("_", "", $this->getPrefixTable());
        $ar = $this->getArrayTable();
        $newAr = array();
        if(!is_array($ar))return $newAr;
        foreach ($ar as $k => $v) {
            $text = $fixPrefix . "." . $k;
            $nameKey = $embed ? $fixPrefix . "_" . $k : $k;
            $newAr[] = array("name" => $nameKey, "mapping" => $text);
        }
        return $newAr;
    }
     * 
     */
    
    public function getEmbedPrefix() {
        return $this->embedPrefix;
    }

    public function setEmbedPrefix($embedPrefix) {
        $this->embedPrefix = $embedPrefix;
    }

    /*added 4 maret 2014*/
    public function getFieldPrefix() {
        return $this->fieldPrefix;
    }

    public function setFieldPrefix($fieldPrefix) {
        $this->fieldPrefix = $fieldPrefix;
    }
    
    protected function getDatefields(){
        return array();
    }

  


    
    

}

?>
