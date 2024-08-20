<?php

/**
 * Description of CoaConfigDao
 *
 * @author MIS
 */
class Cashier_Models_Master_PemutihanDao extends Cashier_Box_Models_App_AbDaoCashier implements Cashier_Box_Models_App_BlackHole {

    
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
    public function prosespemutihan($param) {

//            var_dump($param);
            $row = 0;
            $row = $this->dbTable->SPUpdate('sp_pemutihan_create', 
                    $param['fp_no'],
                    $param['schedule_id'],
                    $param['user_id'],
                    $param['note'],
                    $param['createjurnal']
            );
      
        return $row;
    }

    public function getByProjectPtWithPageSearch(Cashier_Models_Master_Pemutihan $ct, Cashier_Box_Models_App_HasilRequestRead $request, $ses) {
        $hasil = array();
        $project = $ct->getProject()->getId();
        $pt = $ct->getPt()->getId();
        if ($project == 0 || $pt == 0) {
            return $hasil;
        }
        $ptId = (empty($request->getOthersValue("pt_id"))) ? $pt : $request->getOthersValue("pt_id");

        $hasil = $this->dbTable->SPExecute('sp_all_read', $request->getModeRead(), $request->getModule(), $ct->getProject()->getId(), intval($ptId), $request->getPage(), $request->getLimit(), $request->getXmlValue(), $ses->getProject()->getId(), $ses->getUser()->getId());
//        var_dump($this->dbTable); 

        return $hasil;
    }

    public function deleteData($user, $budgetdeletedId, Cashier_Box_Models_App_HasilRequestRead $req) {
        $row = 0;
        if (!$user) {
            return $row;
        }
    
        $row = $this->dbTable->SPUpdate('sp_pemutihan_destroy', $budgetdeletedId, intval($user));
        return $row;
    }

    function checkcoaconfig($param) {

        $result = $this->dbTable->SPExecute('sp_validator_read', $param['hideparam'], 'pemutihan', $param['project_id'], $param['pt_id'], '');
        return $result;
    }
}

?>
