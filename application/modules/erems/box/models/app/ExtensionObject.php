<?php

/**
 * Description of ExtensionObject
 *
 * @author tommytoban
 */
class Erems_Box_Models_App_ExtensionObject extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Converter_EmbedData, Erems_Box_Kouti_ObjectTable {

    private $variables;
    protected $embedPrefix;
    protected $groupedEmbed;
    protected $arrayTable;

    public function __construct($defaultVariable=array()) {
        $this->embedPrefix = "eo_";
        $this->variables = array();
        $this->groupedEmbed = array();
        
        foreach($defaultVariable as $row=>$key){
            $this->variables[$key] = NULL;
        }
        $this->arrayTable = $this->getArrayTable();
    }

    public function getVariables() {
        return $this->variables;
    }

    public function setVariables($variables) {
        $this->variables = $variables;
    }

    public function set($name, $value) {
        $this->arrayTable[$name] = $value;
    }

    public function get($name) {
        if(array_key_exists($name,$this->variables)){
             return $this->variables[$name];
        }
        return NULL;
       
    }

    public function getPrefixTable() {
        return $this->embedPrefix;
    }

    public function getArrayTable() {
        if(!$this->arrayTable){
            return $this->variables;
        }
        return $this->arrayTable;
    }

    public function setArrayTable($dataArray=NULL) {
        $v = $this->arrayTable;
        
        foreach($v as $key=>$value){
            if(isset($dataArray[$key])){
                $this->arrayTable[$key] = $dataArray[$key];
            }
        }
        
    }

    public function getArrayEmbed($ar = NULL) {
        $ar = $ar == NULL ? array() : $ar;
        $fixPrefix = str_replace("_", "", $this->getPrefixTable());
        $printAr = $this->getArrayTable();
        $datAr = array();
        foreach ($printAr as $row => $value) {
           // if ($value != NULL) {
                $datAr[$row] = $value;
           // }
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
    
    public function setParamByIndexArray($name, $value) {
       
        if (key_exists($name, $this->arrayTable)) {
            $this->arrayTable[$name] = $value;
        }
    }
    
    public function getMappingArray($embed = FALSE) {
        $fixPrefix = str_replace("_", "", $this->getPrefixTable());
        $ar = $this->getArrayTable();
        $newAr = array();
        foreach ($ar as $k => $v) {
            $text = $fixPrefix . "." . $k;
            $nameKey = $embed ? $fixPrefix . "_" . $k : $k;
            $newAr[] = array("name" => $nameKey, "mapping" => $text);
        }
        return $newAr;
    }

}

?>
