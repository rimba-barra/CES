<?php

/**
 * Description of AbDao
 *
 * @author MIS
 */
abstract class Gl_Box_Models_App_AbDao {
     protected $dbTable;
     public function __construct() {
        $this->dbTable = new Gl_Box_Models_Dbtable_Db();
     
    }
}

?>
