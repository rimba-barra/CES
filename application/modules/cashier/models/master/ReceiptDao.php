<?php

/**
 * Description of CoaConfigDao
 *
 * @author MIS
 */
class Cashier_Models_Master_ReceiptDao extends Cashier_Box_Models_App_AbDaoCashier implements Cashier_Box_Models_App_BlackHole {

    
    public function save(Cashier_Models_Master_Receipt $cs, Cashier_Box_Models_App_HasilRequestRead $req) {

        $row = 0;

        if (!$cs->getAddBy()) {
            return $row;
        }

        $row = $this->dbTable->SPUpdate('sp_master_receipt',
                    'create',
                    $cs->getReceipt_id(),
                    $cs->getProject_id(),
                    $cs->getPt_id(),
                    $cs->getReceipt_no(),
                    $cs->getReceipt_type(),
                    $cs->getPrefix_no(),
                    $cs->getStatus(),
                    $cs->getDescription(),
                    $cs->getCounter_no(),
                    $cs->getAddBy()
                );
//        var_dump($this->dbTable);
        return $row;
    }
    public function directDelete(Cashier_Box_Models_App_Decan $decan, Cashier_Box_Kouti_InterSession $session) {
        $row = 0;
        //$row = $this->dbTable->SPUpdate('sp_coa_config_destroy', $decan->getString(), $session->getUserId());

        return $row;
    }

    public function update(Cashier_Models_Master_Receipt $cs, Cashier_Box_Models_App_HasilRequestRead $req) {


        $row = 0;
        if (!$cs->getReceipt_id()) {
            return $row;
        }
    
        $row = $this->dbTable->SPUpdate('sp_master_receipt',
                    'update',
                    $cs->getReceipt_id(),
                    $cs->getProject_id(),
                    $cs->getPt_id(),
                    $cs->getReceipt_no(),
                    $cs->getReceipt_type(),
                    $cs->getPrefix_no(),
                    $cs->getStatus(),
                    $cs->getDescription(),
                    $cs->getCounter_no(),
                    $cs->getAddBy()
                );
                
        // var_dump($this->dbTable);
        return $row;
    }
    public function getByProjectPtWithPageSearch(Cashier_Models_Master_Receipt $ct, Cashier_Box_Models_App_HasilRequestRead $request, $ses) {
        $hasil   = array();
        $project = $ct->getProject()->getId();
        $pt      = $ct->getPt()->getId();
        if ($project == 0 || $pt == 0) {
            return $hasil;
        }
        $ptId      = (empty($request->getOthersValue("pt_id"))) ? $pt : $request->getOthersValue("pt_id");
        $projectId = (empty($request->getOthersValue("project_id"))) ? $project : $request->getOthersValue("project_id");

        $receipt_no   = (empty($request->getOthersValue("receipt_no"))) ? NULL : $request->getOthersValue("receipt_no");
        $receipt_type = (empty($request->getOthersValue("receipt_type"))) ? NULL : $request->getOthersValue("receipt_type");
        $status       = (empty($request->getOthersValue("status"))) ? NULL : $request->getOthersValue("status");

        // $hasil = $this->dbTable->SPExecute('sp_all_read', $request->getModeRead(), 'masterreceipt', $request->getOthersValue("project_id"), intval($ptId), 
        // $request->getPage(), $request->getLimit(), $request->getXmlValue(), $ses->getProject()->getId(), $ses->getUser()->getId());

        $hasil = $this->dbTable->SPExecute('sp_masterreceipt_read', 
                intval($projectId), 
                intval($ptId), 
                $request->getPage(), 
                $request->getLimit(),
                $ses->getUser()->getId(),
                $receipt_no,
                $receipt_type,
                $status
            );
        return $hasil;
    }
    public function deleteData($user, $budgetdeletedId, $reasondelete) {
        $row = 0;
        if (!$user) {
            return $row;
        }
    
        $row = $this->dbTable->SPUpdate('sp_master_receipt_destroy', 
                $budgetdeletedId,intval($user),$reasondelete
        );
//        var_dump($this->dbTable);
        return $row;
    }
    public function validationreceiptno(Cashier_Models_Master_Receipt $cs, Cashier_Box_Models_App_HasilRequestRead $req) {
        $hasil = 0;
        
        $hasil = $this->dbTable->SPExecute('sp_validator_read','all', 'masterreceiptnoexist', $cs->getProject_id(),
                    $cs->getPt_id(),$cs->getReceipt_no(),
                    $cs->getReceipt_type(),
                    $cs->getPrefix_no(),
                    $cs->getCounter_no()
        );
//        var_dump($this->dbTable);

        return $hasil;
    }
    
    public function void($user, $budgetdeletedId, $reasondelete,$project_id,$pt_id) {
        $row = $this->dbTable->SPUpdate('sp_master_receipt','void',$budgetdeletedId,$project_id,$pt_id,0,0,0,0,0,0,intval($user),0,$reasondelete);
        return $row;
    }

    public function usereceipt($user, $budgetdeletedId, $reasondelete,$project_id,$pt_id) {
        $row = $this->dbTable->SPUpdate('sp_master_receipt','used', $budgetdeletedId,$project_id,$pt_id,0,0,0,0,0,0,intval($user),0,$reasondelete);
        return $row;
    }
}

?>
