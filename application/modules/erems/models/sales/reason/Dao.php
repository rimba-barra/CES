<?php


/**
 * Description of Dao
 *
 * @author tommytoban
 */
class Erems_Models_Sales_Reason_Dao extends Erems_Box_Models_App_AbDao {
    public function getAllCNReason(Erems_Models_Sales_Reason_GantiNama $rcn){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_changenamereason_read');
        return $hasil; 
    }
    public function getAllCKReason(Erems_Models_Sales_Reason_MoveReason $rcn){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_changekavlingreason_read');
        return $hasil; 
    }
    
    public function getALLCReason(Erems_Models_Sales_Reason_CancelReason $rcr){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_cancelreasonb_read');
        return $hasil; 
    }
}

?>
