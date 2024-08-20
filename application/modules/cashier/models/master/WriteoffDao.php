<?php

/**
 * Description of CoaConfigDao
 *
 * @author MIS
 */
class Cashier_Models_Master_WriteoffDao extends Cashier_Box_Models_App_AbDaoCashier implements Cashier_Box_Models_App_BlackHole {

    
    public function save(Cashier_Models_Master_Writeoff $cs, Cashier_Box_Models_App_HasilRequestRead $req, $writeoffdetail) {

        $row = 0;

        if (!$cs->getAddBy()) {
            return $row;
        }

        $row = $this->dbTable->SPUpdate('sp_writeoff_denda_new',
                    $writeoffdetail['schedule_id'],
                    $cs->getPurchaseletter_id(),
                    $cs->getNote(),
                    $cs->getAddby(),
                    $writeoffdetail['writeoff'],
                    $writeoffdetail['persentase_writeoff'],
                    $cs->getIs_special_wo()
                );
//        var_dump($this->dbTable);
        return $row;
    }
    public function directDelete(Cashier_Box_Models_App_Decan $decan, Cashier_Box_Kouti_InterSession $session) {
        $row = 0;
        //$row = $this->dbTable->SPUpdate('sp_coa_config_destroy', $decan->getString(), $session->getUserId());

        return $row;
    }

    public function update(Cashier_Models_Master_Pemutihan $cs, Cashier_Box_Models_App_HasilRequestRead $req) {


        $row = 0;
        if (!$cs->getId()) {
            return $row;
        }
    
            $row = $this->dbTable->SPUpdate('sp_cheque_update', 
                    $cs->getProject()->getId(),
                    $cs->getPt()->getId(),
                    $cs->getAddBy(),
                    $req->getXmlData()
            );
      
        return $row;
    }
    public function prosesapvrjct($param) {

//            var_dump($param);
            $row = 0;
            $row = $this->dbTable->SPUpdate('sp_writeoff_approve', 
                    $param['writeoff_id'],
                    $param['action'],$param['execuser'],$param['note']
            );
      
        return $row;
    }

    public function getByProjectPtWithPageSearch(Cashier_Models_Master_Writeoff $ct, Cashier_Box_Models_App_HasilRequestRead $request, $ses) {
        $hasil = array();
        $project = $ct->getProject()->getId();
        $pt = $ct->getPt()->getId();
        if ($project == 0 || $pt == 0) {
            return $hasil;
        }
        $ptId = (empty($request->getOthersValue("pt_id"))) ? $pt : $request->getOthersValue("pt_id");

        $hasil = $this->dbTable->SPExecute('sp_all_read', $request->getModeRead(), $request->getModule(), $request->getOthersValue("project_id"), intval($ptId), $request->getPage(), $request->getLimit(), $request->getXmlValue(), $ses->getProject()->getId(), $ses->getUser()->getId());
//        var_dump($this->dbTable);

        return $hasil;
    }

    public function getByProjectPtWithPageSearchApproval(Cashier_Models_Master_Writeoff $ct, Cashier_Box_Models_App_HasilRequestRead $request, $ses) {
        $hasil = array();
        $project = $ct->getProject()->getId();
        $pt = $ct->getPt()->getId();
        if ($project == 0 || $pt == 0) {
            return $hasil;
        }
        $ptId = (empty($request->getOthersValue("pt_id"))) ? $pt : $request->getOthersValue("pt_id");

        $hasil = $this->dbTable->SPExecute('sp_all_read', $request->getModeRead(), 'writeoffapproval', $request->getOthersValue("project_id"), intval($ptId), $request->getPage(), $request->getLimit(), $request->getXmlValue(), $ses->getProject()->getId(), $ses->getUser()->getId());
//        var_dump($this->dbTable);

        return $hasil;
    }

    public function deleteData($user, $budgetdeletedId, Cashier_Box_Models_App_HasilRequestRead $req) {
        $row = 0;
        if (!$user) {
            return $row;
        }
    
        $row = $this->dbTable->SPUpdate('sp_writeoff_destroy', 
                $budgetdeletedId,intval($user)
        );
//        var_dump($this->dbTable);
        return $row;
    }
    public function getDetailwriteoff(Cashier_Models_Master_Writeoffdetail $ct, Cashier_Box_Models_App_HasilRequestRead $request) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_all_read', $request->getModeRead(), $request->getModule(), $request->getOthersValue("project_id"), intval($request->getOthersValue("pt_id")), $request->getPage(), $request->getLimit(), $request->getXmlValue());
        return $hasil;
    }
    public function validation(Cashier_Models_Master_Writeoff $ft, Cashier_Box_Models_App_HasilRequestRead $request,$amount) {
        $hasil = 0;
        
        $requestdecode = json_decode($request->getOthersValue('data'));
        $hasil = $this->dbTable->SPExecute('sp_validator_read', $request->getModeRead(), $request->getModule(), $ft->getProject_id(), $ft->getPt_id(), $ft->getAddby(), $amount
        );

        return $hasil;
    }
    public function validationlimit($project_id,$pt_id) {
        $hasil = 0;
        
        $hasil = $this->dbTable->SPExecute('sp_validator_read','all', 'writeoffchecklimit', $project_id, $pt_id,0,0,0
        );
//        var_dump($this->dbTable);

        return $hasil;
    }
    public function validationsudahpernah($schedule_id) {
        $hasil = 0;
        
        $hasil = $this->dbTable->SPExecute('sp_validator_read','all', 'writeoffsudahpernah', 0, 0,$schedule_id,0,0
        );
//        var_dump($this->dbTable);

        return $hasil;
    }

    public function validationlimitcase($purchaseletter_id,$total) {
        $hasil = 0;
        
        $hasil = $this->dbTable->SPExecute('sp_validator_read','all', 'writeofflimitcase', 0, 0,$purchaseletter_id,$total,0
        );
//        var_dump($this->dbTable);

        return $hasil;
    }
    public function getdetailwo($writeoff_id) {
        $hasil = array();
        
        $hasil = $this->dbTable->SPExecute('sp_writeoff_getdetail',$writeoff_id
        );
//        var_dump($this->dbTable);

        return $hasil;
    }
}

?>
