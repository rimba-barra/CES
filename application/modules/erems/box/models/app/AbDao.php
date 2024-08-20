<?php

/**
 * Description of AbDao
 *
 * @author MIS
 */
abstract class Erems_Box_Models_App_AbDao {
     protected $dbTable;
     public function __construct() {
        $this->dbTable = new Erems_Box_Models_Dbtable_Db();
     
    }
    
    protected final function toDateTime($date){
        $date = (string)$date;
        $x = '';
        if(strlen($date)>0){
            $x = date('Y-m-d h:m:s', strtotime($date));
        }
        return $x;
    }
}

?>
