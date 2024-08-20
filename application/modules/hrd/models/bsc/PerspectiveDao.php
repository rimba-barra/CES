<?php 

class Hrd_Models_Bsc_PerspectiveDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {

    public function save(Hrd_Models_Bsc_Perspective $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'bsc_sp_perspective_create',
            $d->getAddBy(),
            $d->perspectivecode,
            $d->perspectivename,
            str_replace("'", '`', $d->perspectivedesc), 
			$d->getProjectId()
        );
        
        return $hasil;
    }

    public function update(Hrd_Models_Bsc_Perspective $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'bsc_sp_perspective_update', 
            $d->getAddBy(),
            $d->getId(),
            $d->perspectivecode,
            $d->perspectivename,
            str_replace("'", '`', $d->perspectivedesc)
        );

        return $hasil;
    }

    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Bsc_Perspective $d) {
        $hasil = 0;        
        $hasil = $this->dbTable->SPExecute(
            'bsc_sp_perspective_read', 
            $r->getPage(), 
            $r->getLimit(),
            $d->perspectivecode,
            $d->perspectivename, 
			$d->getProjectId()
        );
     
        return $hasil;
    }
    
    public function deleteOne($id,$userId) {
        $row = 0;
        $row = $this->dbTable->SPUpdate(
            'bsc_sp_perspective_destroy',
            $id,
            $userId
        );

        return $row;
    }
  
    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate(
            'bsc_sp_perspective_destroy', 
            $decan->getString(), 
            $session->getUserId()
        );

        return $row;
    }

    public function codeExist(Hrd_Models_Bsc_Perspective $d, $projectId) {
        $hasil = array();

        $hasil = $this->dbTable->SPExecute(
            'bsc_sp_perspectivecodeexist_read', 
            $d->perspectivecode,
            $projectId
            );
        // var_dump($this->dbTable); // ngecek sql server error
        // var_dump($hasil); // ngecek sql server error
        return $hasil;
    }
}

?>