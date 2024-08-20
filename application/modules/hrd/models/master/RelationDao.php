<?php

/**
 * Description of RelationDao
 *
 * @author MIS
 */
class Hrd_Models_Master_RelationDao extends Box_Models_App_AbDao{
    public function getAll(Box_Models_App_HasilRequestRead $r,$employeeId,Hrd_Models_Master_Relation $rl) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_relation_read', $r->getPage(), $r->getLimit(),$employeeId,$rl->getRelationType()->getId());
   
        return $hasil;
    }
}

?>
