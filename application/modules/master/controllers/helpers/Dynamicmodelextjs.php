<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
class Master_Helpers_Dynamicmodelextjs extends Zend_Controller_Action_Helper_Abstract {
    protected $_session = null;
    protected $_publichpath = 'app/cashier';
    protected $_general = null;
    public function init() {
        $this->_session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }
    public function buildExtModel($table) {
        $general = new Master_Models_General_Generaldata();
        $result = $general->field_data($table);        
        $mf = '[';
        foreach ($result as $row) {
             $mf .= "{";
             $mf .= "name:"."'".$row['COLUMN_NAME']."',";
             $mf .= "type:"."'".$this->getType($row['DATA_TYPE'])."'";
             $mf .= "},";                
        } 
        $mf = mb_substr($mf, 0, -1);
        $mf .= ']'; 
        return $mf;        
    }

    protected function getType($sqltype) {
        switch ($sqltype) {
            case 'int':
            case 'bigint':
            case 'smallint':
            case 'tinyint':
                $type = 'int';
                break;
            case 'decimal':
                $type = 'float';
                break;
            case 'money':
                $type = 'number';
                break;
            case 'bit':
                $type = 'boolean';
                break;
            case 'varchar':
            case 'char':
                $type = 'string';
                break;
            case 'date':
            case 'datetime':
            case 'timestamp':
                $type = 'date';
                break;
            default:
                $type = 'auto';
        }
        return $type;
    }

}
