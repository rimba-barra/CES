<?php

class Erems_Models_Master_TypeDao extends Erems_Box_Models_App_AbDao implements Erems_Box_Models_App_BlackHole  {

    private $ses;

    public function getSes() {
        return $this->ses;
    }

    public function setSes($ses) {
        $this->ses = $ses;
    }

    public function getAll(Erems_Box_Models_App_HasilRequestRead $r){
        $hasil = array();

        // if($this->ses){
            $ses = $this->ses;
            $hasil = $this->dbTable->SPExecute('sp_typeb_read',$ses->getProject()->getId(),$ses->getPt()->getId(),$r->getPage(),$r->getLimit(),
                   intval($r->getOthersValue("productcategory_id"))==999?0:$r->getOthersValue("productcategory_id"),
                    intval($r->getOthersValue("cluster_id"))==999?0:$r->getOthersValue("cluster_id"),
                    $r->getOthersValue("type_name"),$r->getOthersValue("code"));
        // }

        return $hasil;
    }

    public function getAllSimple(){
        $hasil = array();
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	$hasil = $this->dbTable->SPExecute('sp_typeb_read',$this->session->getCurrentProjectId(),$this->session->getCurrentPtId(),1,99999);

        //if($this->ses){
        //    $ses = $this->ses;

        //    $hasil = $this->dbTable->SPExecute('sp_typeb_read',$ses->getProject()->getId(),$ses->getPt()->getId(),1,99999);
        //}

        return $hasil;
    }

    public function getAllDropdown(){
        $hasil = array();
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
		$hasil = $this->dbTable->SPExecute('sp_typeb_read_dropdown',$this->session->getCurrentProjectId(),$this->session->getCurrentPtId());
        return $hasil;
    }

    public function getAttribute(Erems_Models_Master_Type $type){
       $hasil = array();
       if($type->getId()==0){
           return $hasil;
       }
       $hasil = $this->dbTable->SPExecute("sp_typeattributeb_read",$type->getId());
       return $hasil;
    }

    public function getAttributeDefault(){
       $hasil = array();

       $hasil = $this->dbTable->SPExecute("sp_typeattributedefault_read");

       return $hasil;
    }

    public function save(Erems_Models_Master_TypeTran $type){
        $row = 0;
        if(!$type->getAddBy()){
            return $row;
        }

        $dcResult = $type->getDCResult();
        if(count($dcResult)==0){
            $dcResult = array("typeattribute_id"=>"","value"=>"","attribute_id"=>"","attributevalue_id"=>"");
        }

        $row = $this->dbTable->SPUpdate('sp_typeb_create',
            $type->getCode(),
            $type->getProductCategory()->getId(),
            $type->getCluster()->getId(),
            $type->getName(),
            $type->getPropertyInfo()->getLandSize(),
            $type->getPropertyInfo()->getBuildingSize(),
            $type->getPropertyInfo()->getFloor(),
            $type->getPropertyInfo()->getFloorSize(),
            $type->getPropertyInfo()->getBedroom(),
            $type->getPropertyInfo()->getBathroom(),
            $type->getPropertyInfo()->getElectricity(),
            $type->getBuildingClass(),
            $type->getSalesGroup(),
            $type->getDescription(),
            $type->getAddBy(),
            $dcResult["typeattribute_id"],
            $dcResult["attribute_id"],
            $dcResult["attributevalue_id"],
            $dcResult["value"],
            $type->getPropertyInfo()->getWidth(),
            $type->getPropertyInfo()->getLong(),
            $type->getPurposeID(),
            $type->getLaunchingStart(),
            $type->getLaunchingEnd()
        );

        $this->rename_file_image($row, $type->getCode(), $type->getFloorplan_leftaccess(), $type->getFloorplan_rightaccess());

        return $row;
    }

    public function update(Erems_Models_Master_TypeTran $type,Erems_Box_Models_App_Decan $decan){
        $row = 0;
        if(!$type->getAddBy()){
            return $row;
        }

        $dcResult = $type->getDCResult();
        if(count($dcResult)==0){
            $dcResult = array("typeattribute_id"=>"","value"=>"","attribute_id"=>"","attributevalue_id"=>"");
        }

        $row = $this->dbTable->SPUpdate('sp_typeb_update',
            $type->getId(),
            $type->getCode(),
            $type->getProductCategory()->getId(),
            $type->getCluster()->getId(),
            $type->getName(),
            $type->getPropertyInfo()->getLandSize(),
            $type->getPropertyInfo()->getBuildingSize(),
            $type->getPropertyInfo()->getFloor(),
            $type->getPropertyInfo()->getFloorSize(),
            $type->getPropertyInfo()->getBedroom(),
            $type->getPropertyInfo()->getBathroom(),
            $type->getPropertyInfo()->getElectricity(),
            $type->getBuildingClass(),
            $type->getSalesGroup(),
            $type->getDescription(),
            $type->getModiBy(),
            $dcResult["typeattribute_id"],
            $dcResult["attribute_id"],
            $dcResult["attributevalue_id"],
            $dcResult["value"],
            $decan->getString(),
            $type->getPropertyInfo()->getWidth(),
            $type->getPropertyInfo()->getLong(),
            $type->getPurposeID(),
            $type->getLaunchingStart(),
            $type->getLaunchingEnd()
        );

        $this->rename_file_image($type->getId(), $type->getCode(), $type->getFloorplan_leftaccess(), $type->getFloorplan_rightaccess());

        return $row;
    }

    public function codeExist($code){
        $resultCode = false;
        $hasil = $this->dbTable->SPExecute('sp_typecodeexist_read',$code);

        if(is_array($hasil[0])){
            $resultCode = $hasil[0][0]['code_exist'];
        }

        return $resultCode;
    }

    public function directDelete(Erems_Box_Models_App_Decan $decan, Erems_Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_typeb_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }

    public function rename_file_image($type_id=0, $code='', $name_1='', $name_2=''){
        if($type_id > 0){
            try {
                $folder_image = APPLICATION_PATH . '/..' . '/public/app/erems/uploads/mastertype';
                $upt_fn_image = false;

                $name_left = $name_1;
                if($name_left && strpos($name_left, 'tmp') !== false){
                    $dirOld = $folder_image . '/' . $name_1;
                    if(file_exists($dirOld)){
                        $exp       = explode('.', $name_left);
                        $new       = 'leftaccess_'.$type_id.'_'.$code.'_'.date('Ymd');
                        $name_left = $new . '.' . $exp[1];
                        $dirNew    = $folder_image . '/' . $name_left;

                        $paths = glob($folder_image . '/' . $new . '.*');
                        foreach ($paths as $path) {
                            $file = dirname($path) . '/' . basename($path);
                            if (file_exists($file)) {
                                Unlink($file);
                            }
                        }

                        copy($dirOld, $dirNew);
                        if (file_exists($dirOld)) {
                            Unlink($dirOld);
                        }

                        $upt_fn_image = true;
                    }
                }

                $name_right = $name_2;
                if($name_right && strpos($name_right, 'tmp') !== false){
                    $dirOld = $folder_image . '/' . $name_2;
                    if(file_exists($dirOld)){
                        $exp       = explode('.', $name_right);
                        $new       = 'rightaccess_'.$type_id.'_'.$code.'_'.date('Ymd');
                        $name_right = $new . '.' . $exp[1];
                        $dirNew    = $folder_image . '/' . $name_right;

                        $paths = glob($folder_image . '/' . $new . '.*');
                        foreach ($paths as $path) {
                            $file = dirname($path) . '/' . basename($path);
                            if (file_exists($file)) {
                                Unlink($file);
                            }
                        }

                        copy($dirOld, $dirNew);
                        if (file_exists($dirOld)) {
                            Unlink($dirOld);
                        }

                        $upt_fn_image = true;
                    }
                }

                if($upt_fn_image){
                    $this->dbTable->SPUpdate('sp_typeb_rename_image', $type_id, $name_left, $name_right);
                }
            } catch (Exception $e) {
                var_dump($e->getMessage());
            }
        }
    }
}
?>
