<?php
/**
 * Description of DepartmentDao
 *
 * @author MIS
 */
class Hrd_Models_Performancemanagement_PeriodeprosesDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {
    public function save(Hrd_Models_Performancemanagement_Periodeproses $d) { //var_dump($d);
        $hasil = 0;
		// wulan edit
        $hasil = $this->dbTable->SPUpdate('sp_periodeproses_create',$d->getAddBy(),$d->statusperiode_id,$d->tahun,$d->start_periode,$d->end_periode,$d->getProjectId(),$d->getPtId());  
       	//var_dump($hasil);
        return $hasil;
    }
    
    public function getAll(Box_Models_App_HasilRequestRead $r,  Hrd_Models_Performancemanagement_Periodeproses $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_periodeproses_read', $r->getPage(), $r->getLimit(), $d->getProjectId(), $d->getPtId());
        return $hasil;
    }
	
	public function getAllStatusPeriode(Hrd_Models_Performancemanagement_Statusperiode $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_statusperiode_read',1,9999);
        return $hasil;
    }
    
    /*public function getAllWOPL(Hrd_Models_Master_Department $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_department_read',1,9999,$d->getName());
        return $hasil;
    }*/

    public function update(Hrd_Models_Performancemanagement_Periodeproses $em) {
        $hasil = 0;
        if ($em->getId() == 0) {
            return $hasil;
        }
       
        $hasil = $this->dbTable->SPUpdate('sp_periodeproses_update', $em->getAddBy(), $em->getId(), 
                $em->statusperiode_id,$em->tahun,$em->start_periode,$em->end_periode);
        return $hasil;
    }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_periodeproses_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }
	
	public function checkExist($statusperiod_id, $tahun, $periodeproses, $pt_id, $project_id){
        $hasil = 0;
				
		// wulan edit
        $hasil = $this->dbTable->SPExecute('sp_periodeproses_check', $statusperiod_id, $tahun, $periodeproses, $pt_id, $project_id);
        return $hasil;
    }
}

?>
