<?php

/**
 * Description of AbDao
 *
 * @author MIS
 */
abstract class Box_Models_App_AbDao {
     protected $dbTable;
     public function __construct() {
        $this->dbTable = new Box_Models_Dbtable_Db();
     
    }
}

?>
