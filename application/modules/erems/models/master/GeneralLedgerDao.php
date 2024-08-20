<?php


/**
 * Description of Erems_Models_Master_GeneralLedgerDao
 *
 * @author semy
 */
class Erems_Models_Master_GeneralLedgerDao extends Erems_Box_Models_App_AbDao {
    public function getAll(Erems_Models_Master_GeneralLedger $sl){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_gl_coa_read',$sl->getProject()->getId(),$sl->getPt()->getId());

        return $hasil; 
    }
}
