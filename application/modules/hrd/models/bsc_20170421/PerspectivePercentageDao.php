<?php 

class Hrd_Models_Bsc_PerspectivePercentageDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {

    public function save(Hrd_Models_Bsc_PerspectivePercentage $d) {
        $hasil  = 0;
        $fromDC = $d->getDCResult();
		 
		 $headerdID = $d->headerId;
		 if($headerdID){
		 	return $this->update($d);
		 }
		
         //var_dump($fromDC); exit();
		 $head_param = $d->getArrayTable();
        $hasil  = $this->dbTable->SPUpdate(
           'bsc_sp_perspective_percentage_create',
            $d->getAddBy(),
            $fromDC['perspective_percentage_detail_id'],
            $head_param['project_id'],
            $head_param['pt_id'],
            $head_param['department_id'],
            $fromDC['perspective_perspective_id'],
            $fromDC['percentage'],
            $head_param['year_periode'],
            $head_param['periode_start'],
            $head_param['periode_end'],
			$head_param['description'] 
        );        

        return $hasil;
    }

    public function update(Hrd_Models_Bsc_PerspectivePercentage $d) {
        $hasil = 0;
		$fromDC = $d->getDCResult();
		//var_dump($fromDC); exit();
		$head_param = $d->getArrayTable();
		
           $hasil = $this->dbTable->SPUpdate(
            'bsc_sp_perspective_percentage_update', 
            $d->getAddBy(),
            $d->headerId,
            $fromDC['perspective_percentage_detail_id'],
            $head_param['project_id'],
            $head_param['pt_id'],
            $head_param['department_id'],
            $fromDC['perspective_perspective_id'],
            $fromDC['percentage'],
            $head_param['year_periode'],
            $head_param['periode_start'],
            $head_param['periode_end'],
			$head_param['description']       
        );

		//var_dump($this->dbTable);
        return $hasil;
    }

    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Bsc_PerspectivePercentage $d) {
        $hasil = 0;        
        $hasil = $this->dbTable->SPExecute(
            'bsc_sp_perspective_percentage_read', 
            $r->getPage(), 
            $r->getLimit(),
            $d->projectId,
            $d->ptId,
            $d->departmentId
        );
     
        return $hasil;
    }

    public function getDetailData(Box_Models_App_HasilRequestRead $r, $perspective_percentage_id) {
        $hasil  = 0;
        $hasil  = $this->dbTable->SPExecute(
            'bsc_sp_perspective_percentage_detail_read',
            $perspective_percentage_id
        );

        return $hasil;
    }

    public function deleteOne($id,$userId) {
        $row = 0;
        $row = $this->dbTable->SPUpdate(
            'bsc_sp_perspective_percentage_destroy',
            $id,
            $userId
        );

        return $row;
    }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate(
            'bsc_sp_perspective_percentage_destroy', 
            $decan->getString(), 
            $session->getUserId()
        );

        return $row;
    }

    public function codeExist(Hrd_Models_Bsc_PerspectivePercentage $d) {
        $hasil  = array();
        $fromDC = $d->getDCResult();
        $hasil  = $this->dbTable->SPExecute(
            'bsc_sp_perspective_percentage_codeexist_read',
            $fromDC['project_id'],
            $fromDC['pt_id'],
            $fromDC['department_id']
        );

        return $hasil;
    }
	
	public function getNewDetail() {
        $hasil = 0;        
        $hasil = $this->dbTable->SPExecute(
            'bsc_sp_perspectivefordetail_v2_read', 
            0
        );
     
        return $hasil;
    }
}

?>