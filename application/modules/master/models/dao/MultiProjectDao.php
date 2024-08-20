<?php

/**
 * Description of CoaConfigDao
 *
 * @author MIS
 */
class Master_Models_Dao_MultiProjectDao extends Master_Box_Models_App_AbDao implements Master_Box_Models_App_BlackHole {

    public function save(Master_Models_Master_MultiProject $cs, Master_Box_Models_App_HasilRequestRead $req) {

        $row = 0;

        if (!$cs->getAddBy()) {
            return $row;
        }
 
        $row = $this->dbTable->SPUpdate('sp_multiproject_create',
                $cs->getProject()->getId(),
                    $cs->getPt()->getId(),
                    $cs->getAddBy(),
                    $req->getXmlData()
                );
        

        return $row;
    }

    public function update(Master_Models_Master_MultiProject $cs, Master_Box_Models_App_HasilRequestRead $req) {


        $row = 0;
        if (!$cs->getId()) {
            return $row;
        }
    
            $row = $this->dbTable->SPUpdate('sp_multiproject_update', 
                    $cs->getProject()->getId(),
                    $cs->getPt()->getId(),
                    $cs->getAddBy(),
                    $req->getXmlData()
            );
      
        return $row;
    }

    public function getByProjectPtWithPageSearch(Master_Models_Master_MultiProject $ct, Master_Box_Models_App_HasilRequestRead $request, $ses) {
        $hasil = array();
 
        $hasil = $this->dbTable->SPExecute('sp_all_read', 
                $request->getModeRead(), 
                $request->getModule(),
                0, 
                0,
                $request->getPage(),
                $request->getLimit(),
                $request->getXmlValue(), 
                $ses->getProject()->getId(), 
                $ses->getUser()->getId());

        return $hasil;
    }

    public function directDelete(Master_Box_Models_App_Decan $decan, Master_Box_Kouti_InterSession $session) {
        $row = 0;
        //$row = $this->dbTable->SPUpdate('sp_coa_config_destroy', $decan->getString(), $session->getUserId());

        return $row;
    }

    public function deleteData($user, $budgetdeletedId, Master_Box_Models_App_HasilRequestRead $req) {
        $row = 0;
        if (!$user) {
            return $row;
        }
        $row = $this->dbTable->SPUpdate('sp_all_destroy', $req->getModeRead(), $req->getModule(), intval($user), $budgetdeletedId);

        return $row;
    }

    public function codeExist(Master_Models_Master_MultiProject $ft, Master_Box_Models_App_HasilRequestRead $request) {
        $hasil = 0;
        $project = json_decode($request->getOthers()['data'],true);
        $hasil = $this->dbTable->SPExecute('sp_validator_read',
                $request->getModeRead(), 
                $request->getModule(),
                $ft->getProject()->getId(),
                $ft->getPt()->getId(),
                $ft->getUser()->getId(),
                $project['project_project_id']);

        return $hasil;
    }


    //[]
}

?>
