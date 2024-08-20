<?php

/**
 * Description of CitraClubDao
 *
 * @author MIS
 */
class Erems_Models_Master_CitraClubDao extends Erems_Box_Models_App_AbDao implements Erems_Box_Models_App_BlackHole {

    private $request;
    private $citraClub;

    public function setRequest($r) {
        $this->request = $r;
    }

    public function setCitraClub($r) {
        $this->citraClub = $r;
    }

    public function getAll($object) {
        if ($object instanceof Erems_Models_Master_CitraClub) {
            return $this->getAllOld($object);
        } else if($object instanceof Erems_Box_Models_App_HasilRequestRead){
            $hasil = array();
            $cc = $this->citraClub;
            $code = array_key_exists("code", $this->request)?$this->request["code"]:"";
            $name = array_key_exists("clubname", $this->request)?$this->request["clubname"]:"";
     
            $hasil = $this->dbTable->SPExecute('sp_citraclubb_read', $cc->getPt()->getId(),$cc->getProject()->getId(),$object->getPage(),$object->getLimit(),$code,$name);
            return $hasil;
        }
    }

    public function getAllDropdown($projectid, $ptid) {
        $res = $this->dbTable->SPExecute('sp_citraclub_read_dropdown', $ptid, $projectid);
        $hasil = array();
        if(isset($res[0]) && count($res[0])){
            $hasil = $res[0];
        }
        return $hasil;
    }

    public function getAllOld(Erems_Models_Master_CitraClub $cc) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_citraclubb_read', $cc->getPt()->getId(),$cc->getProject()->getId());
        
        return $hasil;
    }

    public function save(Erems_Models_Master_CitraClub $pc) {
        $hasil = 0;





        $hasil = $this->dbTable->SPUpdate('sp_citraclubb_create', $pc->getAddBy(), $pc->getProject()->getId(), $pc->getPt()->getId(), $pc->getCode(), $pc->getName(), $pc->getDescription());


        return $hasil;
    }

    public function codeExist(Erems_Models_Master_CitraClub $ft) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_citraclubcodeexist_read',  $ft->getPt()->getId(),$ft->getProject()->getId(),$ft->getCode());

        return $hasil;
    }

    //sp_projectfacilitiestcodeexist_read

    public function update(Erems_Models_Master_CitraClub $pc) {
        $hasil = 0;

        $hasil = $this->dbTable->SPUpdate('sp_citraclubb_update', $pc->getAddBy(), $pc->getId(), $pc->getCode(), $pc->getName(), $pc->getDescription());



        return $hasil;
    }

    public function directDelete(\Erems_Box_Models_App_Decan $decan, \Erems_Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_citraclubb_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }

}

?>
