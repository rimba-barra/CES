<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of EmployeeValidator
 *
 * @author MIS
 */
class Hrd_Models_Performancemanagement_PeriodeprosesValidator extends Box_Models_App_Validator {
    public function run(Hrd_Models_Performancemanagement_Periodeproses $d){
        $msg = "";
        if(!$d->statusperiode_id){
            $msg = "Status should be selected";
        }
		else if(!$d->tahun){
            $msg = "Tahun should be filled";
        }
		else if(!$d->start_periode){
            $msg = "Start Period should be filled";
        }
		else  if(!$d->end_periode){
            $msg = "End Period should be filled";
        }
		else{
			$dm = new Hrd_Models_Performancemanagement_PeriodeprosesDao();
			// wulan edit
			$hasil_check = $dm->checkExist($d->statusperiode_id, $d->tahun, $d->getId(), $d->getPtId(), $d->getProjectId());
			if($hasil_check[0][0]["result"] > 0){
				$msg = "Selected status already exist in this year";
			} else {
				$this->setStatus(TRUE);
			}
            
        }
        $this->setMsg($msg);
		//$this->setStatus(TRUE);
    }
}

?>
