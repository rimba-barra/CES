<?php

/**
 * Description of DepartmentDao
 *
 * @author MIS
 */
class Hrd_Models_Master_GeneralParameterDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {

    public function save(Hrd_Models_Master_GeneralParameter $d) {
        $hasil = 0;

        $hasil = $this->dbTable->SPUpdate('sp_generalparameter_create', $d->getAddBy(), $d->getName(), $d->getModuleName(), $d->getDataType());
        return $hasil;
    }

    public function saveMulti(Box_Models_App_DecanForObject $d, Box_Models_App_Session $ses) {
        $hasil = 0;
        $data = $d->getDCResult();
   
        if (count($data) > 0) {
            $hasil = $this->dbTable->SPUpdate('sp_generalparametermulti_create', $ses->getUser()->getId(), $data["name"], $data["module_name"], $data["value"], $data["has_module"],
                    $ses->getProject()->getId(),$ses->getPt()->getId()
            );
        }
        return $hasil;
    }

    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Master_GeneralParameter $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_generalparameter_read', $r->getPage(), $r->getLimit(), $d->getName(), $d->getModuleName());
        return $hasil;
    }

    public function update(Hrd_Models_Master_GeneralParameter $em) {
        $hasil = 0;
        if ($em->getId() == 0) {
            return $hasil;
        }

        $hasil = $this->dbTable->SPUpdate('sp_generalparameter_update', $em->getAddBy(), $em->getId(), $em->getName(), $em->getModuleName(), $em->getDataType(), $em->getValue());
        return $hasil;
    }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_generalparameter_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }

    public function exist(Hrd_Models_Master_GeneralParameter $d) {
        $exist = 0;
        $dataExist = $this->dbTable->SPExecute('sp_generalparameterexist_read', $d->getName(), $d->getModuleName());

        if ($dataExist[0][0]['found']) {
            $exist = $dataExist[0][0]['found'];
        }
        return $exist;
    }

    ///sp_generalparameterprojectpt_read

    public function getValues(Hrd_Models_App_Parameter $param) {
        $exist = array();
        $hasil = $this->dbTable->SPExecute('sp_generalparameterprojectpt_read', $param->getProject()->getId(), $param->getPt()->getId(), $param->getModuleName());
        //print_r($this->dbTable);

        return Hrd_Models_App_Parameter::rawArrayToCleanArray($hasil);
    }

    public function getModuleList() {
        $exist = array();
        $module = $this->dbTable->SPExecute('sp_generalparametermodulelist_read');


        return $module;
    }

    public function updateParameter(Hrd_Models_App_Parameter $params) {
        $hasil = 0;
        $dcResult = $params->getDCResult();

        $hasil = $this->dbTable->SPUpdate('sp_generalparameterprojectpt_assign', $params->getAddBy(), $params->getProject()->getId(), $params->getPt()->getId(), $dcResult["id"], $dcResult["value"]);
        return $hasil;
    }
    
    public function getParams($moduleName) {
        $exist = array();
        $module = $this->dbTable->SPExecute('sp_generalparametergetparam_read', $moduleName);
        return $module;
    }
    
    /* edit by wulan sari 20190306
    public function getParams($moduleName, Box_Models_App_Session $ses) {
        $exist = array();
        $module = $this->dbTable->SPExecute('sp_generalparametergetparam_read', $moduleName, $ses->getProject()->getId(), $ses->getPt()->getId());
        return $module;
    }*/
    
    /* Untuk ambil parameter hanya di masternya => m_generalparameter yang project pt*/
    public function getParamsByProjectPtWOPLB($moduleName,$project,$pt) {
        $exist = array();
        $module = $this->dbTable->SPExecute('sp_generalparametergetparam_read', $moduleName,$project,$pt);
        return $module;
    }
    
    public function getParamsByProjectPtWOPL($projectId,$ptId,$moduleName) {
        $exist = array();
        $module = $this->dbTable->SPExecute('sp_generalparameterprojectpt_read', $projectId,$ptId,$moduleName,1,99999);
       
        
        return $module;
    }

}

?>
