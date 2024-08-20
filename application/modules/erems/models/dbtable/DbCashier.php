<?php

class Erems_Models_Dbtable_DbCashier extends Zend_Db_Table_Abstract {

    protected $_schema = 'cashier';
    private $dbError = null;
    protected $_name = 'th_expense';
    private $preparedSql;

    public function SPUpdate($args = '') {
        $row = 0;
        $args = func_get_args();
        $stmt = $this->runSP($this->convertParams($args));
        if ($stmt === NULL) {
            return $row;
        }

        $row = (int) $stmt;
        return $row;
    }

    public function SPExecute($args) {
        $args = func_get_args();
        $stmt = (array)$this->runSP($this->convertParams($args), TRUE);
        
        return $stmt;
    }

    private function convertParams($args) {
        $hasil = '';
        if (is_array($args)) {
            $hasil = array('sp_name' => NULL, 'params' => NULL);
            $spname = ($this->_schema ? $this->_schema . '.' : '') . $args[0];
            $param = '';
            $hasil['sp_name'] = $spname;

            if (count($args) > 1) {

                $args = array_slice($args, 1);
                $param = implode('%$%', $args);
                $param = " '" . str_replace("%$%", "', '", $param) . "' ";
                $hasil['params'] = $param;
            }
        }
        return $hasil;
    }

    /* @params boolean $execute
     * TRUE => return array 
     * FALSE => return int 1/0
     *  */

    protected function runSP($converParams, $execute = FALSE) {

        if (is_array($converParams)) {

            switch ($this->_adapterName) {
                case 'mysql':
                    $sql = 'CALL ' . $converParams['sp_name'] . ' (' . $converParams['params'] . ')';
                    break;

                case ($this->_adapterName == 'mssql' || $this->_adapterName == 'sqlsrv'):
                    $sql = 'EXEC ' . $converParams['sp_name'] . ' ' . $converParams['params'];
                    break;

                default:
                    return;
                    break;
            }
            $this->preparedSql = $sql;
            $stmt = NULL;
            try {
                $stmt = $this->_db->query($sql);
            } catch (Exception $e) {
                $this->dbError = $e;
            }
            if ($stmt == NULL)
                return 0;

            $result = 0;
            if ($execute) { /*@ RETURN ARRAY */
                $hasil = array();
                try {
                  
                     $hasil[] = $stmt->fetchAll();
                   while($stmt->nextRowset()){
                       $hasil[] = $stmt->fetchAll(); 
                   }
              
               
                } catch (Zend_Db_Exception $e) {
                    $this->dbError = 'Zend_Db_Exception: ' . $e->getMessage();
                } catch (Exception $er) {
                    $this->dbError = 'Exception: ' . $e->getMessage();
                }
                $result = $hasil;
            } else { /*@ RETURN INT $rowResult 1/0 */
                try {
                    // get nilai variable @RESULT dari SQL SERVER untuk STATUS CREATE/UPDATE
                    $rowResult = 0;
                    while ($row = $stmt->fetch()) {
                        $hasil = (array) $row;
                    }
                    if (key_exists('result', $hasil)) {
                        $rowResult = (int) $hasil['result'];
                    }
                } catch (Zend_Db_Exception $e) {
                    $this->dbError = 'Zend_Db_Exception: ' . $e->getMessage();
                } catch (Exception $er) {
                    $this->dbError = 'Exception: ' . $e->getMessage();
                }
                $result = $rowResult;
            }
            return $result;
        }
    }
    
    public function getPreparedSql(){
        return $this->preparedSql;
    }

    public function getDbError() {
        return $this->dbError;
    }

    public function getErrorMsg() {
        $er = $this->dbError;
        $msg = NULL;
        if ($this->dbError === NULL) {
            return $msg;
        }
        $msg = $er->getMessage();
        return $msg;
    }

    public function printDbError() {
        echo "<pre>";
        var_dump($this->getDbError());
        echo "</pre>";
    }

   private function convertParamsToArr($args) {
        $hasil = '';
        if (is_array($args)) {
            $hasil = array('sp_name' => NULL, 'params' => NULL);
            $spname = $args[0];
        
            $hasil['sp_name'] = $spname;

            if (count($args) > 1) {

                $args = array_slice($args, 1);
                $hasil['params'] = $args;
            }
        }
        return $hasil;
    }
    
    public function spToQuery($args){
        
        $args = func_get_args();
        $args = $this->convertParamsToArr($args);
        
        $spName = $args["sp_name"];
        $paramsQuery = $args["params"];
        
       
        $config = $this->_db->getConfig();
        $config["dbname"] = "erems";
        $this->_db = new Zend_Db_Adapter_Sqlsrv($config);


        $stmt = $this->_db->query(" SELECT definition FROM erems.sys.sql_modules 
                                    WHERE object_id = OBJECT_ID('erems.dbo.".$spName."')
                                      ");
 
          $res = $stmt->fetchAll();
          $res = $res[0]['definition'];
            
          $query = substr($res,  stripos($res, 'BEGIN'));

          $stmt = $this->_db->query("
                select  
                   'Parameter_name' = name, 
                   'Type'   = type_name(user_type_id)  
                   --'Length'   = max_length
                from erems.sys.parameters where object_id = object_id('erems.dbo.".$spName."')
          ");

           $res = $stmt->fetchAll();

           //s: checker & validator
           for ($i=0; $i < sizeof($res) ; $i++) { 
               $qParamname = $res[$i]['Parameter_name'];
               $qType = $res[$i]['Type'];
               $pq = $paramsQuery[$i];
               if($qType=="int" && $pq==""){
                    $paramsQuery[$i]=0;
               }
           }
           //e: checker & validator

           $params  = array();
           $params2 = array();
           foreach ($res as $par) {
                $params[]   = $par['Parameter_name'];
                $params2[]  = "'+".$par['Parameter_name']."+'";
           }

        $query = str_replace($params2, $paramsQuery, $query);
        $query = str_replace($params, $paramsQuery, $query);

        //print_r($query);die();

        $stmt = $this->_db->query($query);


        $hasil[] = $stmt->fetchAll();
        while ($stmt->nextRowset()) {
            $hasil[] = $stmt->fetchAll();
        }

        return $hasil;
    }
}

?>