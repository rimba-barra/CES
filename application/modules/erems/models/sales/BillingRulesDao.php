<?php

/**
 * Description of BillingRulesDao
 *
 * @author tommytoban
 */
class Erems_Models_Sales_BillingRulesDao extends Erems_Box_Models_App_AbDao {
    public function getAll(Erems_Models_Sales_BillingRules $br){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_billingrulesb_read',0,$br->getProject()->getId(),$br->getPt()->getId());
        return $hasil; 
    }
    
    public function getAllBallon(Erems_Models_Sales_BillingRules $br){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_billingrulesdetailpl_read',$br->getProject()->getId(),$br->getPt()->getId());
        return $hasil; 
    }
    
    public function getAllbyPriceType($priceType,$br){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_billingrulesb_read',$priceType,$br->getProject()->getId(),$br->getPt()->getId());
        return $hasil;
    }
    public function getAllDropdown($project_id, $pt_id){
        $res = $this->dbTable->SPExecute('sp_billingrulesb_read_dropdown', 0, $project_id, $pt_id);
        $hasil = array();
        if(isset($res[0]) && count($res[0])){
            $hasil = $res[0];
        }
        return $hasil; 
    }

    public function getAllBallonDropdown($project_id, $pt_id){
        $res = $this->dbTable->SPExecute('sp_billingrulesdetailpl_read_dropdown', $project_id, $pt_id);
        $hasil = array();
        if(isset($res[0]) && count($res[0])){
            $hasil = $res[0];
        }
        return $hasil; 
    }
}