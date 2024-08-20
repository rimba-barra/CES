<?php

/**
 * Description of AbDao
 *
 * @author TOMMY-MIS
 */
class Master_Models_App_AbDao {
    protected $dbTable;
     public function __construct() {
        $this->dbTable = new Master_Models_App_Db();
     
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
