<?php

class Hrd_Models_Performancemanagement_MatrixCompetencyDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole  {
    
    public function save(Hrd_Models_Performancemanagement_MatrixCompetency $d) {
        $hasil  = 0;
        $fromDC = $d->getDCResult();
		
		$checkID = '';
		$explode = explode('~', $fromDC['matrixcompetency_id']);
		for($i=0; $i<count($explode); $i++){
			$cn = $explode[$i] == '' ? 'create' : 'update';
		}
		
		if($cn == 'create'){
			$hasil  = $this->dbTable->SPUpdate(
			   'sp_matrixcompetency_create',
				$d->getAddBy(),
				$fromDC['matrixcompetency_id'],
				$fromDC['banding_id'],
				$fromDC['competency_id'],
				$fromDC['level_id'],
				$fromDC['jobfamily_id']         
			);
		} else {
                    //echo 'test'.$fromDC['competencymatrixheader_id'];
			$hasil = $this->dbTable->SPUpdate(
				'sp_matrixcompetency_update',
				$d->getAddBy(),
				$fromDC['competencymatrixheader_id'],
				$fromDC['banding_id'],
				$fromDC['competency_id'],
				$fromDC['level_id'],
				$fromDC['jobfamily_id'],
				$fromDC['matrixcompetency_id']
			);	
                        //var_dump($this->dbTable);
		}

        // var_dump($fromDC);
        // var_dump($hasil);
        return $hasil;
    }

    public function update(Hrd_Models_Performancemanagement_MatrixCompetency $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_matrixcompetency_update',
            $d->getAddBy(),
            $fromDC['competencymatrixheader_id'],
            $fromDC['banding_id'],
            $fromDC['competency_id'],
            $fromDC['level_id'],
            $fromDC['jobfamily_id'],
            $fromDC['matrixcompetency_id'],
            $fromDC['deleted']
        );
        
        return $hasil;
    }

    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Performancemanagement_MatrixCompetency $d) {
        $hasil = 0;        
        $hasil = $this->dbTable->SPExecute(
            'sp_matrixcompetency_read', 
            $r->getPage(), 
            $r->getLimit()
        );

        return $hasil;
    }
    
    public function getDetailData(Box_Models_App_HasilRequestRead $r, $competencymatrixheader_id) {
        // echo "test";
        $hasil  = 0;
        $hasil  = $this->dbTable->SPExecute(
            'sp_matrixcompetencydetail_read',
            $competencymatrixheader_id
        );
        // var_dump($this->dbTable);
        return $hasil;
    }

    public function deleteOne($id,$userId) {
        $row = 0;
        $row = $this->dbTable->SPUpdate(
            'sp_matrixcompetency_destroy',
            $id,
            $userId
        );
        // echo $decan->getString();
        return $row;
    }
  
    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate(
            'sp_matrixcompetency_destroy', 
            $decan->getString(), 
            $session->getUserId()
        );
        
        return $row;
    }

    public function codeExist(Hrd_Models_Performancemanagement_MatrixCompetency $d) {
        $hasil  = array();
        $fromDC = $d->getDCResult();
		
		$explode = explode('~', $fromDC['banding_id']);
		$banding_id = $explode[0];
		$explode = explode('~', $fromDC['jobfamily_id']);
		$jobfamily_id = $explode[0];
                
                
                // added by Wulan Sari 25.04.2018
		$explode = explode('~', $fromDC['competencymatrixheader_id']);
		$competencymatrixheader_id = $explode[0];
                
        
        if($competencymatrixheader_id == ''){ // added by Wulan Sari 25.04.2018
            
            
            $hasil  = $this->dbTable->SPExecute(
                'sp_matrixcompetencycodeexist_read', 
                $banding_id,
                $jobfamily_id
            );
            
        } else {
            
            
            // added by Wulan Sari 25.04.2018
            $hasil  = $this->dbTable->SPExecute(
                'sp_matrixcompetencycodeexist_update_read', 
                $banding_id,
                $jobfamily_id,
                $competencymatrixheader_id
            );
            
            
        }
        return $hasil;
    }
}
