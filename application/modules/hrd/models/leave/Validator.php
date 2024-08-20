<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Validator
 *
 * @author MIS
 */
class Hrd_Models_Leave_Validator extends Box_Models_App_Validator {

    public function run(Hrd_Models_Leave_Leave $d) {
        $msg = "";


        if (!$d->getStartDate()) {
            $msg = "Invalid start date";
        } else if (!$d->getEndDate()) {
            $msg = "Invalid end date";
        } else if (intval($d->getAbsentType()->getId()) == 0) {
            $msg = "Invalid absent type";
        } else if (intval($d->getEmployee()->getId()) == 0) {
            $msg = "Invalid employee";
        } else {
            
            // edit by wulan sari 20190731
            // cek dari range
            $leaveDao = new Hrd_Models_Leave_Dao();
            $hasil = $leaveDao->getCekDateLeave($d);   
            $jml = $hasil[0][0]['jml'];
            $cek_date = 'ok';
            
            if($d->getIsHalfDay() == '1'){
                if($jml > 0.5){
                    $cek_date = 'problem';
                }
            } else {
                if($jml > 0){
                    $cek_date = 'problem';
                }                    
            }            
            // end edit by wulan sari 20190731
            
            /// cek ada di hari off atau gak
            $aDao = new Hrd_Models_AbsentDao();
            $hasil = $aDao->getAbsentSheetByRange($d->getStartDate(), $d->getEndDate(), $d->getEmployee()->getId());
            //var_dump($hasil);

            $hasil = Box_Tools::toObjectsb('date', $hasil, FALSE, array('shifttype_','absenttype_'));
            //var_dump($hasil);
                        

            $validDate = array();
            foreach ($hasil as $date) {
                if ($date instanceof Hrd_Models_Master_General_Date) {
                   
                    if($d->getId()==0){
                        // wulan edit 20181005
                        //if ($date->getShiftType()->getHolyday() == 0 && $date->getShiftType()->getId() > 0 && !in_array($date->getAbsentType()->getId(),array(Box_Config::ABSENTTYPE_LEAVE,  Box_Config::ABSENTTYPE_CUTIBESAR,  Box_Config::ABSENTTYPE_CUTITAHUNAN))) {
                        
                        // wulan edit 20181207
                        // hasil diskusi maka validasi ijin di hari libur dihilangkan
                        //if ($date->getShiftType()->getHolyday() == 0 && $date->getShiftType()->getId() > 0 ) {
                        
                        if ($date->getShiftType()->getId() > 0 ) {
                        
                            $validDate[] = $date;
                        }
                    }else{
                      
                        // wulan edit 20181207
                        // hasil diskusi maka validasi ijin di hari libur dihilangkan
                        //if ($date->getShiftType()->getHolyday() == 0 && $date->getShiftType()->getId() > 0 ) {
                        
                        if ($date->getShiftType()->getId() > 0 ) {
                           
                            $validDate[] = $date;
                        } 
                    }
                    
                }
            }
           
            
            $this->addToStorage($validDate);
            $absent_code = $d->getAbsentType()->getCode();
            
            if(count($validDate) > 0 && $cek_date == 'ok'){ //  || $absent_code == 'I-GAM' || $absent_code == 'I-GAP' || $absent_code == 'I-LAM' || $absent_code == 'I-LAP'
                $this->setStatus(TRUE);
            }else{
                if($cek_date == 'problem'){
                    
                    $array_ijin = array('I-ML', 'I-PA/S', 'I-TM', 'I-KL','I-MK','I-LAM','I-LAP','I-MLL','I-GAM','I-GAP');
                    $cek_ijin = in_array($absent_code, $array_ijin) ? 1 : 0;

                    if($jml > 0 && $cek_ijin){
                        $this->setStatus(TRUE);
                    } else {                    
                        $msg = "Leave already exists";
                    }
                    
                } else {
                    $msg = "Range hari tidak valid";                    
                }
            }
            
        }
        $this->setMsg($msg);
    }

}

?>
