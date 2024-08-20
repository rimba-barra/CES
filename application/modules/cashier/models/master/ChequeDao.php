<?php

/**
 * Description of CoaConfigDao
 *
 * @author MIS
 */
class Cashier_Models_Master_ChequeDao extends Cashier_Box_Models_App_AbDaoCashier implements Cashier_Box_Models_App_BlackHole {

    public function save(Cashier_Models_Master_Cheque $cs, Cashier_Box_Models_App_HasilRequestRead $req) {

        $row = 0;

        if (!$cs->getAddBy()) {
            return $row;
        }

        $row = $this->dbTable->SPUpdate('sp_cheque_create',
                    $cs->getProject()->getId(),
                    $cs->getPt()->getId(),
                    $cs->getAddBy(),
                    $req->getXmlData()
                );

        return $row;
    }

    public function update(Cashier_Models_Master_Cheque $cs, Cashier_Box_Models_App_HasilRequestRead $req) {


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

    public function getByProjectPtWithPageSearch(Cashier_Models_Master_Cheque $ct, Cashier_Box_Models_App_HasilRequestRead $request, $ses) {
        $hasil = array();
        $project = $ct->getProject()->getId();
        $pt = $ct->getPt()->getId();
        if ($project == 0 || $pt == 0) {
            return $hasil;
        }
        $ptId = (empty($request->getOthersValue("pt_id"))) ? $pt : $request->getOthersValue("pt_id");

        $hasil = $this->dbTable->SPExecute('sp_all_read', $request->getModeRead(), $request->getModule(), $ct->getProject()->getId(), intval($ptId), $request->getPage(), $request->getLimit(), $request->getXmlValue(), $ses->getProject()->getId(), $ses->getUser()->getId());


        return $hasil;
    }

    public function directDelete(Cashier_Box_Models_App_Decan $decan, Cashier_Box_Kouti_InterSession $session) {
        $row = 0;
        //$row = $this->dbTable->SPUpdate('sp_coa_config_destroy', $decan->getString(), $session->getUserId());

        return $row;
    }

    public function deleteData($user, $budgetdeletedId, Cashier_Box_Models_App_HasilRequestRead $req) {
        $row = 0;
        if (!$user) {
            return $row;
        }
    
        $row = $this->dbTable->SPUpdate('sp_all_destroy', $req->getModeRead(), $req->getModule(), intval($user), $budgetdeletedId);
        return $row;
    }

    public function codeExist(Cashier_Models_Master_Cheque $ft, Cashier_Box_Models_App_HasilRequestRead $request) {
        $hasil = 0;
        $tempId = 0;

        if($ft->getChequeType()=="IN") {
            $tempId = $request->getDataArrayValue('bank_bank_id');
        }
        else {
            $tempId = $request->getDataArrayValue('voucherprefix_voucherprefix_id');
        }
        $hasil = $this->dbTable->SPExecute('sp_validator_read',
                $request->getModeRead(), 
                $request->getModule(),
                $ft->getProject()->getId(),
                $request->getDataArrayValue('pt_pt_id'),
                $ft->getCheque_no(),
                $tempId,
                $ft->getSeries());

        return $hasil;
    }
    
    public function codeExistDetail(Cashier_Models_Transaction_ChequeDetail $ft, Cashier_Box_Models_App_HasilRequestRead $request) {
        $hasil = 0;

        $hasil = $this->dbTable->SPExecute('sp_validator_read',
                $request->getModeRead(), 
                'chequedetail',
                $ft->getProject()->getId(),
                $ft->getPt()->getId(),
                $ft->getKasbank()->getId(),
                $ft->getCheque()->getId(),
                $request->getDataArrayValue("cheque_cheque_type"));
        return $hasil;
    }
    
     public function savedetail(Cashier_Models_Transaction_ChequeDetail $cs, Cashier_Box_Models_App_HasilRequestRead $req) {
        $row = 0;
        if (!$cs->getAddBy()) {
            return $row;
        }
        $row = $this->dbTable->SPUpdate('sp_chequedetail_create',
                    $cs->getProject()->getId(),
                    $cs->getPt()->getId(),
                    $cs->getAddBy(),
                    $req->getXmlData()
                );
        return $row;
    }
    
    public function updateIssuedDate(Cashier_Models_Master_Cheque $cs, Cashier_Box_Models_App_HasilRequestRead $req, $ses) {

     
        $row = 0;
        if (!$cs->getId()) {
            return $row;
        }
        
            $row = $this->dbTable->SPUpdate('sp_all_update',
                $req->getModeUpdate(),
                $req->getModule(),
                $cs->getProject()->getId(),
                $cs->getPt()->getId(),
                $cs->getAddBy(),
                $req->getXmlData()
                );
 
        return $row;
    }
    
    
     public function voidcheque(Cashier_Models_Master_Cheque $cs, Cashier_Box_Models_App_HasilRequestRead $req, $ses) {

        $row = 0;
        if (!$cs->getId()) {
            return $row;
        }
        
            $row = $this->dbTable->SPUpdate('sp_all_update',
                $req->getModeUpdate(),
                $req->getModule(),
                $cs->getProject()->getId(),
                $cs->getPt()->getId(),
                $cs->getAddBy(),
                $req->getXmlData()
                );
 
        return $row;
    }


    public function deletevouchervalidation($hideparam, $ids, Cashier_Models_Master_Cheque $cs)
    {
        $hasil = $this->dbTable->SPExecute('sp_validator_read', $hideparam, $hideparam, $cs->getProject()->getId(), $cs->getPt()->getId(), $ids);
        return $hasil;
    }
    //[]

    public function canceledcheque(Cashier_Models_Master_Cheque $cs, Cashier_Box_Models_App_HasilRequestRead $req, $ses) {

        $row = 0;
        if (!$cs->getId()) {
            return $row;
        }
        
            $row = $this->dbTable->SPUpdate('sp_all_update',
                $req->getModeUpdate(),
                $req->getModule(),
                $cs->getProject()->getId(),
                $cs->getPt()->getId(),
                $cs->getAddBy(),
                $req->getXmlData()
                );
 
        return $row;
    }
}

?>
