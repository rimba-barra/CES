<?php

/**
 * Description of AbsentTypeGroupDao
 *
 * @author MIS
 */
class Hrd_Models_Master_AbsentTypeGroupDao extends Box_Models_App_AbDao  {
    public function getAll(Box_Models_App_HasilRequestRead $r){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_absenttypegroup_read', $r->getPage(), $r->getLimit());
        return $hasil;
    }
}

?>
