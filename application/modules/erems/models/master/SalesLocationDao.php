<?php


/**
 * Description of SalesLocationDao
 *
 * @author tommytoban
 */
class Erems_Models_Master_SalesLocationDao extends Erems_Box_Models_App_AbDao {
    public function getAll(Erems_Models_Master_SalesLocation $sl){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_saleslocationb_read',$sl->getProject()->getId(),$sl->getPt()->getId());
        return $hasil; 
    }

    public function getAllDropdown($projectid, $ptid){
        $res = $this->dbTable->SPExecute('sp_saleslocationb_read_dropdown',$projectid, $ptid);
        $hasil = array();
        if(isset($res[0]) && count($res[0])){
            $hasil = $res[0];
        }
        return $hasil; 
    }
}
