<?php

/**
 * Description of CoaConfigDao
 *
 * @author MIS
 */
class Cashier_Models_Master_WriteofflimitDao extends Cashier_Box_Models_App_AbDaoCashier implements Cashier_Box_Models_App_BlackHole {

    
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
    public function proseswriteofflimit($param) {

            $row = 0;
            $row = $this->dbTable->SPExecute('sp_writeofflimit', 
                    $param['writeoff_limit_id'],
                    $param['project_id'],$param['role_id'],$param['writeoff_limit_type_id'],$param['execuser'],$param['limit_percentage'],$param['limit_amount'],'createupdate',$param['send_email']
            );
        return $row;
    }

    public function getByProjectPtWithPageSearch(Cashier_Models_Master_Writeofflimit $ct, Cashier_Box_Models_App_HasilRequestRead $request, $ses) {
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

    public function deleteData($user, $budgetdeletedId, Cashier_Box_Models_App_HasilRequestRead $req) {
        $row = 0;
        if (!$user) {
            return $row;
        }
    
        $row = $this->dbTable->SPUpdate('sp_writeofflimit', 
                $budgetdeletedId,
                '0','0','0',intval($user),'0','0','destroy'
        );
//        var_dump($this->dbTable);
        return $row;
    }

}

?>
