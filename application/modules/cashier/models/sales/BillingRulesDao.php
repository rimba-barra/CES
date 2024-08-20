<?php

/**
 * Description of BillingRulesDao
 *
 * @author tommytoban
 */
class Cashier_Models_Sales_BillingRulesDao extends Cashier_Box_Models_App_AbDao {
    public function getAll(Cashier_Models_Sales_BillingRules $br){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_billingrulesb_read',0,$br->getProject()->getId(),$br->getPt()->getId());
		
        return $hasil; 
    }
}
