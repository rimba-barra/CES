<?php

/**
 * Description of Type
 *
 * @author MIS
 */
class Erems_Models_App_Masterdata_Type extends Erems_Box_Models_App_Masterdata_Masterdata {

    private $ses;
    private $isdropdown = 0;

    public function getSes() {
        return $this->ses;
    }

    public function setSes($ses) {
        $this->ses = $ses;
    }

    public function getIsdropdown() {
        return $this->isdropdown;
    }

    public function setIsdropdown($int) {
        $this->isdropdown = $int;
    }

    public function getDao() {
        $dao = new Erems_Models_Master_TypeDao();
        if($this->ses){
            $dao->setSes($this->ses);
        }
        return $dao;
    }

    public function getTableClass() {
        return new Erems_Models_Master_TypeTran();
    }

    public function getTableClassName() {
        return "typetran";
    }

    public function prosesData(\Erems_Box_Models_App_AbDao $dao, \Erems_Box_Models_ObjectEmbedData $objectEmbedata, \Erems_Box_Models_App_Models_ReadWorms $app) {
        return $dao->getAllSimple();
    }

    public function getMethod($object) {
    	if($this->getIsdropdown()){
    		return $this->getDao()->getAllDropdown();
    	}
    	else{
        	return $this->getDao()->getAllSimple();
    	}
    }






   /* public function prosesData(Erems_Box_Models_App_AbDao $dao,Erems_Box_Models_ObjectEmbedData $objectEmbedata,Erems_Models_App_Models_ReadWorms $app) {

        return $dao->getAllSimple();
    }*/
}

?>
