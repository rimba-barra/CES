<?php

/**
 * Description of CoaConfigDao
 *
 * @author MIS
 */
class Cashier_Models_Dao_ConsolidationDao extends Cashier_Box_Models_App_AbDaoCashier implements Cashier_Box_Models_App_BlackHole {

    public function save(Cashier_Models_Master_Consolidation $cs, Cashier_Box_Models_App_HasilRequestRead $req) {

        $row = 0;

        if (!$cs->getAddBy()) {
            return $row;
        }

        $unsetDetailforXml = array('detailpt');
        $unsetDetailforXml = array('type');
        $row = $this->dbTable->SPUpdate('sp_consolidation_create',
                $cs->getProject()->getId(),
                    $cs->getPt()->getId(),
                    $cs->getAddBy(),
                    $req->getXmlDataUnset($unsetDetailforXml),
                    $req->getDataArrayValue("detailpt"),
                    $req->getDataArrayValue("type")
                );

        return $row;
    }

    public function update(Cashier_Models_Master_Consolidation $cs, Cashier_Box_Models_App_HasilRequestRead $req) {


        $row = 0;
        if (!$cs->getConsolidationid()) {
            return $row;
        }
        $unsetDetailforXml = array('detailpt');
        $unsetDetailforXml = array('type');
        $row = $this->dbTable->SPUpdate('sp_consolidation_update', 
                $cs->getProject()->getId(),
                $cs->getPt()->getId(),
                $cs->getAddBy(),
                $req->getXmlDataUnset($unsetDetailforXml),
                $req->getDataArrayValue("detailpt"),
                $req->getDataArrayValue("type")
        );
        return $row;
    }

    public function getByProjectPtWithPageSearch(Cashier_Models_Master_Consolidation $ct, Cashier_Box_Models_App_HasilRequestRead $request, $ses) {
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

    public function codeExist(Cashier_Models_Master_Consolidation $ft, Cashier_Box_Models_App_HasilRequestRead $request) {
        $hasil = 0;
        $project = json_decode($request->getOthers()['data'],true);
        $hasil = $this->dbTable->SPExecute('sp_validator_read',
                $request->getModeRead(), 
                $request->getModule(),
                $ft->getProject()->getId(),
                $ft->getPt()->getId(),
                $ft->getUser()->getId(),
                $project['project_project_id'],
                $ft->getId()
                );

        return $hasil;
    }
     public function getFilterPt(Cashier_Models_Master_Consolidation $ct, Cashier_Box_Models_App_HasilRequestRead $request, $ses) {
        $hasil = 0;
        $project = $ct->getProject()->getId();
        $pt = $ct->getPt()->getId();
        if ($project == 0 || $pt == 0) {
            return $hasil;
        }
        $ptId = (empty($request->getOthersValue("pt_id"))) ? $pt : $request->getOthersValue("pt_id");
        $hasil = $this->dbTable->SPExecute('sp_all_read', 
                $request->getModeRead(), 
                $request->getModule(), 
                $ct->getProject()->getId(),
                intval($ptId), 
                $request->getPage(),
                $request->getLimit(),
                $request->getXmlValue(),
                $ses->getProject()->getId(),
                $ses->getUser()->getId());

        return $hasil;
    }
    
    
    public function getdetailpt(Cashier_Models_Master_Consolidation $ct, Cashier_Box_Models_App_HasilRequestRead $request, $ses) {
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


    //[]
}

?>
