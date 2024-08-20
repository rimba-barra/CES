<?php

/**
 * Description of CoaConfigDao
 *
 * @author MIS
 */
class Cashier_Models_Dao_MastercoaDao extends Cashier_Box_Models_App_AbDaoCashier implements Cashier_Box_Models_App_BlackHole {

    public function save(Cashier_Models_Master_Coa $cs, Cashier_Box_Models_App_HasilRequestRead $req) {

        $row = 0;
        if (!$cs->getAddBy()) {
            return $row;
        }
        $unsetDetailforXml = array('detailpt','id');
        $row = $this->dbTable->SPUpdate('sp_coa_create',
                $cs->getProject()->getId(),
                    $cs->getPt()->getId(),
                    $cs->getAddBy(),
                    $req->getXmlDataUnset($unsetDetailforXml)
                );
        
        return $row;
    }

    public function update(Cashier_Models_Master_Coa $cs, Cashier_Box_Models_App_HasilRequestRead $req) {
        $data = json_decode($req->getOthers()['data'],true);
        $row  = 0;

        if (!$cs->getId()) {
            return $row;
        }

        $project = $cs->getProject()->getId();
        $pt      = $cs->getPt()->getId();

        if ($project == 0 || $pt == 0) {
            return $row;
        }
        $ptId      = (empty($data['pt_pt_id'])) ? $pt : $data['pt_pt_id'];
        $projectId = (empty($data['project_project_id'])) ? $pt : $data['project_project_id'];
        $unsetDetailforXml = array('detailpt','id');
        $row = $this->dbTable->SPUpdate('sp_coa_update', 
                $projectId,
                $ptId,
                $cs->getModiby(),
                $req->getXmlDataUnset($unsetDetailforXml)
        );

        return $row;
    }

    public function getByProjectPtWithPageSearch($ct, Cashier_Box_Models_App_HasilRequestRead $request, $ses) {
        $hasil = array();
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

    public function deleteData($user, $deletedId, Cashier_Box_Models_App_HasilRequestRead $req) {
        $row = 0;
        if (!$user) {
            return $row;
        }
        $row = $this->dbTable->SPUpdate('sp_all_destroy',
                $req->getModeRead(),
                $req->getModule(),
                intval($user),
                $deletedId);

        return $row;
    }

    public function codeExist($ft, Cashier_Box_Models_App_HasilRequestRead $request, $unique) {
        $hasil = 0;
        $data = json_decode($request->getOthers()['data'],true);        
        $hasil = $this->dbTable->SPExecute('sp_validator_read',
                $request->getModeRead(), 
                $request->getModule(),
                $ft->getProject()->getId(),
                $ft->getPt()->getId(),
                $data[$unique],
                $data['pt_pt_id'],
                $data['project_project_id']
                );

        return $hasil;
    }
    
    //GADIPAKE LAGI!
    public function directDelete(Cashier_Box_Models_App_Decan $decan, Cashier_Box_Kouti_InterSession $session) {
        $row = 0;
        //$row = $this->dbTable->SPUpdate('sp_coa_config_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }

}

?>
