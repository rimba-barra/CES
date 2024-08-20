<?php

class Cashier_Models_Generalmodel_Modelsp_bak extends Zend_Db_Table_Abstract {

    protected $_schema;
    protected $_name;
    protected $session;
    private $db = null;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_schema = $this->session->getSelectedDbApp() . '.dbo';

        // ==== LOCAL CONNECTION =============
        $_serverName = "MIS-PC";
        $_user = "sa";
        $_pass = "123";
        $_db = $this->session->getSelectedDbApp();

        $_connInfo = array("UID" => $_user, "PWD" => $_pass, "Database" => $_db);
        $this->db = sqlsrv_connect($_serverName, $_connInfo);

        if ($this->db === false) {
            echo "Unable to connect.</br><br>";
            die(print_r(sqlsrv_errors(), true));
        }
    }

    public function checkregisterdatabase($module, $newdb, $newyeardb) {
        $data = array(
            $module,
            $newdb,
            $newyeardb
        );
        $result = $this->execSP3('sp_checkregisterdatabase', $data);
        return $result;
    }

    public function registerdatabase($module, $newdb, $newyeardb) {
        $data = array(
            $module,
            $newdb,
            $newyeardb,
            $this->session->getUserId()
        );
        //$this->execSP3('sp_registerdatabase', $data);
    }

    public function createdatabase($dbbackup, $filebak, $newdb, $newmdf, $newldf) {
        $fbak = str_replace('/', '\\', $filebak);
        $logdb = $dbbackup . '_log';
        $mdf = str_replace('/', '\\', $newmdf);
        $ldf = str_replace('/', '\\', $newldf);

        $this->createbackup($dbbackup, $fbak);
        $this->createrestore($newdb, $fbak, $dbbackup, $logdb, $mdf, $ldf);


        //$param = array($dbbackup,$fbak);
        //$this->execSP3('sp_setbackup', $param);
        //$this->execSP3('sp_setbackup', $param);

        /*
          $data = array(
          $dbbackup,
          $dbbackup.'_log',
          str_replace('/','\\',$filebak),
          $newdb,
          str_replace('/','\\',$newmdf),
          str_replace('/','\\',$newldf)
          );
          $this->execSP3('sp_createdatabase', $data);
         */


        /*
          $sql = "
          BACKUP DATABASE $dbbackup
          TO DISK = '$fbak' with FORMAT
          ";
          $this->_db->query($sql);

          $sql2 = "
          RESTORE DATABASE $newdb
          FROM DISK = '$fbak'
          WITH REPLACE,
          MOVE '$dbbackup' TO '$mdf',
          MOVE '$logdb' TO '$ldf'

          ";
          $this->_db->query($sql2);

          /*
          //cara manual ke sql server
          $prefix = $dbbackup.'.dbo.m_prefix';
          $sql = "select * from $prefix where project_id=1 and pt_id=1";
          $stmt = $this->_db->query($sql);
          print_r($stmt->fetchAll());
         * 
         */
    }

    function createbackup($dbbackup, $fbak) {
        $sql = "              
                BACKUP DATABASE $dbbackup
                TO DISK = '$fbak' with FORMAT
            ";

        sqlsrv_configure("WarningsReturnAsErrors", 0);
        if (($stmt = sqlsrv_query($this->db, $sql))) {
            do {
                /* print_r(sqlsrv_errors());
                  echo " * ---End of result --- *\r\n"; */
            } while (sqlsrv_next_result($stmt));
            sqlsrv_free_stmt($stmt);
        }
        sqlsrv_configure("WarningsReturnAsErrors", 1);
    }

    function createrestore($newdb, $fbak, $dbbackup, $logdb, $mdf, $ldf) {
        $sql = "               
                RESTORE DATABASE $newdb
                FROM DISK = '$fbak'
                WITH REPLACE,
                MOVE '$dbbackup' TO '$mdf',
                MOVE '$logdb' TO '$ldf'
                
            ";

        sqlsrv_configure("WarningsReturnAsErrors", 0);
        if (($stmt = sqlsrv_query($this->db, $sql))) {
            do {
                /* print_r(sqlsrv_errors());
                  echo " * ---End of result --- *\r\n"; */
            } while (sqlsrv_next_result($stmt));
            sqlsrv_free_stmt($stmt);
        }
        sqlsrv_configure("WarningsReturnAsErrors", 1);
    }

}
