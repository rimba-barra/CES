<?php

/**
 * Description of BillingRules
 *
 * @author tommytoban
 */
class Erems_Models_App_Masterdata_BillingRules extends Erems_Box_Models_App_Masterdata_Masterdata {
    public function getDao() {
        return new Erems_Models_Sales_BillingRulesDao();
    }

    public function getTableClass() {
        return new Erems_Models_Sales_BillingRulesTran();
    }

    public function getTableClassName() {
        return "billingrulestran";
    }

    public function prosesData(\Erems_Box_Models_App_AbDao $dao, \Erems_Box_Models_ObjectEmbedData $objectEmbedata, \Erems_Box_Models_App_Models_ReadWorms $app) {
        $hasil = $dao->getAll($objectEmbedata);
        return $hasil;
    }

    

   

}
