<?php

/**
 * Description of AbsentDao
 *
 * @author MIS
 */
class Hrd_Models_AllclaimDao extends Box_Models_App_AbDao {


    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Master_Allclaim $params, $session) {    

        $hasil = $this->dbTable->SPExecute('sp_allclaim_access_read',
        $r->getPage(),
        $r->getLimit(),
        $params->getSubholding_id(),
        $params->getProject_id(),
        $params->getPt_id(),
        $params->getEmployee_name(),
        $params->getJenisPengobatanId(),
        $params->getYear(),
        $session->getUserId(),
        '',
        ''
        );
        
        return $hasil;
    }

    public function getAllClaimExport($params, $session) {  
        $hasil = $this->dbTable->SPExecute('sp_allclaim_access_read', 
            1, 
            99999, 
            implode(",",$params['subholding_id']),
            implode(",",$params['project_id']),
            implode(",",$params['pt_id']),
            $params['employee_name'],
            implode(",",$params['jenispengobatan_id']),
            $params['year'],
            
            //tambah ini untuk validasi hak akses
            $session->getUserId(),
            $session->getGroupId()
        );

        if (!empty($hasil[0])) {
            return $hasil[1];
        } else {
            return false;
        }
    }

    public function getAllExportList() {    
        $hasil = $this->dbTable->SPExecute('sp_allclaim_exportlist_read');

        return $hasil;
    }
}

?>
