<?php

class Erems_Models_Reward_RewardDao extends Erems_Box_Models_App_AbDao {

    public function getAll(Erems_Box_Models_App_HasilRequestRead $r, Erems_Models_Reward_Reward $hs) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_gen_mreward_read', $hs->getProject()->getId(), $hs->getPt()->getId(), $r->getPage(), $r->getLimit(),0,$hs->getCode()
        );
        return $hasil;
    }
    
    public function getAllWOPL($projectId,$ptId,$groupId=-1) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_gen_mreward_read',$projectId,$ptId,1,9999,0,'',$groupId);
        return $hasil;
    }

    public function getOne(Erems_Models_Reward_Reward $hs) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_gen_mreward_read', $hs->getProject()->getId(), $hs->getPt()->getId(), 1, 1, $hs->getId()
        );
        return $hasil;
    }

    public function save(Erems_Models_Reward_Reward $hs) {
        $hasil = 0;

        $hasil = $this->dbTable->SPUpdate('sp_gen_mreward_create', $hs->getAddBy(), $hs->getProject()->getId(), $hs->getPt()->getId(), $hs->getCode(), $hs->getGroup_id(), $hs->getName());


        return $hasil;
    }

    public function update(Erems_Models_Reward_Reward $hs) {
        $hasil = 0;

        if ($hs->getId() == 0) {
            return 0;
        }

        $hasil = $this->dbTable->SPUpdate('sp_gen_mreward_update', $hs->getModiBy(), $hs->getId(), $hs->getCode(), $hs->getGroup_id(), $hs->getName()
        );

    

        return $hasil;
    }

    public function delete($ids, Erems_Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_gen_mreward_destroy', $ids, $session->getUserId());
        return $row;
    }

}
