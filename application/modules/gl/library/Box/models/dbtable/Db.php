<?php

class Gl_Box_Models_Dbtable_Db extends Zend_Db_Table_Abstract {
   // protected $_schema = 'gl';
    protected $_schema; //edited by ahmad riadi 2016-03-24
    private $dbError = null;
    protected $_name = 'th_expense';
    private $preparedSql;

    //added by ahmad riadi 2016-03-24 only gl for custome this version
    function init() {
                $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
		$this->_schema = $this->session->getSelectedDbApp().'.dbo';
    }
    
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
        $stmt = (array) $this->runSP($this->convertParams($args), TRUE);

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
            if ($execute) { /* @ RETURN ARRAY */
                $hasil = array();
                try {

                    $hasil[] = $stmt->fetchAll();
                    while ($stmt->nextRowset()) {
                        $hasil[] = $stmt->fetchAll();
                    }
                } catch (Zend_Db_Exception $e) {
                    $this->dbError = 'Zend_Db_Exception: ' . $e->getMessage();
                } catch (Exception $er) {
                    $this->dbError = 'Exception: ' . $e->getMessage();
                }
                $result = $hasil;
            } else { /* @ RETURN INT $rowResult 1/0 */
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

    public function getPreparedSql() {
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

}

?>