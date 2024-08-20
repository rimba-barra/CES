<?php


/**
 * Description of Dao
 *
 * @author tommytoban
 */
class Cashier_Models_Sales_Reason_Dao extends Cashier_Box_Models_App_AbDao {
    public function getAllCNReason(Cashier_Models_Sales_Reason_GantiNama $rcn){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_changenamereason_read');
        return $hasil; 
    }
    public function getAllCKReason(Cashier_Models_Sales_Reason_MoveReason $rcn){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_changekavlingreason_read');
        return $hasil; 
    }
    
    public function getALLCReason(Cashier_Models_Sales_Reason_CancelReason $rcr){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_cancelreasonb_read');
        return $hasil; 
    }
}

?>
