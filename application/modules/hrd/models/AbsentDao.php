<?php

/**
 * Description of AbsentDao
 *
 * @author MIS
 */
class Hrd_Models_AbsentDao extends Box_Models_App_AbDao {

    public function getAbsentReportFormatE($projectId,$ptId,$startDate,$endDate) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_report_absent_format_e',$projectId,$ptId,$startDate,$endDate);

        return $hasil;
    }

    public function update(Hrd_Models_Master_General_Date $d) {
        $hasil = 0;
        if ($d->getId() == 0) {
            return $hasil;
        }

        $hasil = $this->dbTable->SPUpdate('sp_absentdetail_update', $d->getAddBy(), $d->getId(), $d->getShiftType()->getId(), $d->getTimeA()->getIn(), $d->getTimeA()->getOut(), $d->getTimeB()->getIn(), $d->getTimeB()->getOut(), $d->getTimeC()->getIn(), $d->getTimeC()->getOut(), $d->getAbsentType()->getId(), $d->getOnDutyProjectId()->getId(), $d->getNote(), $d->getLate());
        
        
        return $hasil;
    }
    
    public function deleteReason($project,$pt,Hrd_Models_Master_General_Date $d,$userId) {
        $hasil = 0;
        if ($d->getId() == 0) {
            return $hasil;
        }

        $hasil = $this->dbTable->SPUpdate('sp_absentdetail_deletereason',$project,$pt,$userId, $d->getId());
        
        
        return $hasil;
    }
    
    public function updateTime(Hrd_Models_Master_General_Date $d) {
        $hasil = 0;
        if ($d->getId() == 0) {
            return $hasil;
        }
        
       

        $hasil = $this->dbTable->SPUpdate('sp_absentdetailtime_update', $d->getAddBy(),$d->getId(),$d->getTimeIn(),$d->getTimeOut(),$d->getTimeA()->getIn(), $d->getTimeA()->getOut(), $d->getTimeB()->getIn(), $d->getTimeB()->getOut(), $d->getTimeC()->getIn(), $d->getTimeC()->getOut(),
                $d->getLate(),$d->getTotalAttendance(),$d->getTimeLost(),$d->getTotalHours(),$d->getNote(),$d->getTotalTransport());
        //var_dump($this->dbTable);
        return $hasil;
    }
    
    // public function updateShiftTypeExcel_v2(Box_Models_App_Session $ses,$month,$year,Box_Models_App_Decan $decan){
    // added by Michael 2021.05.19 
    public function updateShiftTypeExcel_v2(Box_Models_App_Session $ses,$month,$year,Box_Models_App_Decan $decan, $data){
    // added by Michael 2021.05.19 
        ini_set("memory_limit", "-1");
        ini_set('max_execution_time', 0);

        $hasil = 0;
              
        $dcResult = $decan->getDCResult();
                
        $array_id = explode('~', $dcResult["absentdetail_id"]);
        $array_nik = explode('~', $dcResult["late"]);
        $array_date = explode('~', $dcResult["date"]);
        $array_shift = explode('~', $dcResult["shifttype_shifttype_id"]);
        
        // $project_id = $ses->getProject()->getId();
        // $pt_id = $ses->getPt()->getId();

        // added by Michael 2021.05.19 
        $project_id = $data['project_id'];
        $pt_id = $data['pt_id'];
        // end added by Michael 2021.05.19 

        $user_id = $ses->getUser()->getId();
        $this->setting = new Hrd_Models_General_Setup;
        for($i = 0; $i<count($array_id); $i++){
            $nik = $array_nik[$i];
            $day = $array_date[$i];
            $shift = $array_shift[$i];
            
            /*
            $sql = "select absentdetail_id 
                        from th_absent a
                        join (select employee_id, employee_nik from m_employee) b on a.employee_id = b.employee_id
                        join (select absent_id, absentdetail_id, day from td_absentdetail) c on a.absent_id = c.absent_id
                        where a.year = ".$year." 
                        and a.month = ".$month." 
                        and c.day = ".$day." 
                        and b.employee_nik = ''".$nik."''
                        and a.project_id = ''".$project_id."''
                        and a.pt_id = ''".$pt_id."''
                        and a.deleted = 0";
            */
            
            $sql = "select absentdetail_id 
                        from th_absent a
                        join m_employee b on a.employee_id = b.employee_id
                        join td_absentdetail c on a.absent_id = c.absent_id
                        where a.year = ".$year." 
                        and a.month = ".$month." 
                        and c.day = ".$day." 
                        and b.employee_nik = ''".$nik."''
                        and a.project_id = ''".$project_id."''
                        and a.pt_id = ''".$pt_id."''
                        and a.deleted = 0";
            $result = $this->setting->customefromquery($sql);
            if(isset($result[0][0])){
                $absentdetail_id = $result[0][0]['absentdetail_id'];

                if(isset($absentdetail_id) && $absentdetail_id != ''){
                    $sql2 = "
                        update td_absentdetail
                        set shifttype_id = $shift,
                        modion = ''".date('Y-m-d H:i:s')."'',
                        modiby = ".$user_id."  
                        where deleted = 0 
                        and absentdetail_id = ".$absentdetail_id;
                    $result2 = $this->setting->customefromquery($sql2);
                }
                $hasil = $result2[0];
            }
            /* Cara 1
            $sql = "
                update td_absentdetail
		set shifttype_id = $shift,
		modion = ''".date('Y-m-d H:i:s')."'',
		modiby = ".$ses->getUser()->getId()."  
		where deleted = 0 
                and day = ".$day." 
		and absent_id = 
                    isnull((
                        select absent_id 
                        from th_absent a
                        join m_employee b on a.employee_id = b.employee_id
                        where year = ".$year." 
                        and month = ".$month." 
                        and employee_nik = ''".$nik."''
                        and a.project_id = ''".$ses->getProject()->getId()."''
                        and a.pt_id = ''".$ses->getPt()->getId()."''),0)
            ";
            $result = $this->setting->customefromquery($sql);
            echo $sql;
            */
            
            /* Cara 2
            $sql = "select absent_id 
                        from th_absent a
                        join (select employee_id, employee_nik from m_employee) b on a.employee_id = b.employee_id
                        where a.year = ".$year." 
                        and a.month = ".$month." 
                        and b.employee_nik = ''".$nik."''
                        and a.project_id = ''".$ses->getProject()->getId()."''
                        and a.pt_id = ''".$ses->getPt()->getId()."''";
            $result = $this->setting->customefromquery($sql);
            $absent_id = $result[0][0]['absent_id'];
            echo $sql;
            
            $sql = "
                update td_absentdetail
		set shifttype_id = $shift,
		modion = ''".date('Y-m-d H:i:s')."'',
		modiby = ".$ses->getUser()->getId()."  
		where deleted = 0 
                and day = ".$day." 
		and absent_id = ".$absent_id;
            echo $sql;
            $result = $this->setting->customefromquery($sql);
            */
            
        }        
        return $hasil;
    }
    
    /*
    public function updateShiftTypeExcel(Box_Models_App_Session $ses,$month,$year,Box_Models_App_Decan $decan){
        ini_set("memory_limit", "-1");
        ini_set('max_execution_time', 0);

        $hasil = 0;
              
        $dcResult = $decan->getDCResult();
                
        $array_id = explode('~', $dcResult["absentdetail_id"]);
        $array_nik = explode('~', $dcResult["late"]);
        $array_date = explode('~', $dcResult["date"]);
        $array_shift = explode('~', $dcResult["shifttype_shifttype_id"]);
        
        $project_id = $ses->getProject()->getId();
        $pt_id = $ses->getPt()->getId();
        $user_id = $ses->getUser()->getId();
        $this->setting = new Hrd_Models_General_Setup;
        for($i = 0; $i<count($array_id); $i++){
            $nik = $array_nik[$i];
            $day = $array_date[$i];
            $shift = $array_shift[$i];
            
            $sql = "select absentdetail_id 
                        from th_absent a
                        join (select employee_id, employee_nik from m_employee) b on a.employee_id = b.employee_id
                        join (select absent_id, absentdetail_id, day from td_absentdetail) c on a.absent_id = c.absent_id
                        where a.year = ".$year." 
                        and a.month = ".$month." 
                        and c.day = ".$day." 
                        and b.employee_nik = ''".$nik."''
                        and a.project_id = ''".$project_id."''
                        and a.pt_id = ''".$pt_id."''";
            $result = $this->setting->customefromquery($sql);
            if(isset($result[0][0])){
                $absentdetail_id = $result[0][0]['absentdetail_id'];

                if(isset($absentdetail_id) && $absentdetail_id != ''){
                    $sql = "
                        update td_absentdetail
                        set shifttype_id = $shift,
                        modion = ''".date('Y-m-d H:i:s')."'',
                        modiby = ".$user_id."  
                        where deleted = 0 
                        and absentdetail_id = ".$absentdetail_id;
                    $result = $this->setting->customefromquery($sql);
                }
                $hasil = $result[0];
            }
            
        }        
        return $hasil;
    }
    */
    
    public function updateShiftTypeExcel(Box_Models_App_Session $ses,$month,$year,Box_Models_App_Decan $decan){
        $hasil = 0;
        
        $dcResult = $decan->getDCResult();
        
        $hasil = $this->dbTable->SPUpdate('sp_absentdetail_shiftexcel_update',$ses->getUser()->getId(),$ses->getProject()->getId(),$ses->getPt()->getId(),
                $year,$month,
                $dcResult["absentdetail_id"],
                $dcResult["late"],
                $dcResult["date"],
                $dcResult["shifttype_shifttype_id"]);
        
       
        return $hasil;
    }
    
    
    public function fixdate($userId,$month,$year) {
        $hasil = 0;
       
        $hasil = $this->dbTable->SPUpdate('sp_absentdetailfixdate_update',$userId,$month,$year);

        return $hasil;
    }
    
    /* comment by Wulan Sari 2018.04.25
    public function updateShiftType(Box_Models_App_Session $ses,$updateType,$month,$year,$days,$shiftTypeId,$department) {
        $hasil = 0;
       
        $hasil = $this->dbTable->SPUpdate('sp_absentupdateshift_create',$ses->getUser()->getId(),$updateType,
                $ses->getProject()->getId(),$ses->getPt()->getId(),$month,$year,$days,$shiftTypeId,$department);
        return $hasil;
    } */   
    
    // added by Wulan Sari 2018.04.25
    // public function updateShiftType(Box_Models_App_Session $ses,$updateType,$month,$year,$days,$shiftTypeId,$department,$kelompokabsensi) {
    public function updateShiftType(Box_Models_App_Session $ses,$updateType,$month,$year,$days,$shiftTypeId,$department,$kelompokabsensi,$params) {
        $hasil = 0;
       
        // $hasil = $this->dbTable->SPUpdate('sp_absentupdateshift_create',$ses->getUser()->getId(),$updateType,
        //         $ses->getProject()->getId(),$ses->getPt()->getId(),$month,$year,$days,$shiftTypeId,$department,$kelompokabsensi);

        // added by Michael 2021.05.19 
        $hasil = $this->dbTable->SPUpdate('sp_absentupdateshift_create',$ses->getUser()->getId(),$updateType,
                $params['project_id'],$params['pt_id'],$month,$year,$days,$shiftTypeId,$department,$kelompokabsensi);
        // end added by Michael 2021.05.19 

      //  var_dump($this->dbTable);
        return $hasil;
    }
    
    
    public function getAbsentSheet(Hrd_Models_Absent $absent,  Box_Models_App_HasilRequestRead $request){
        
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_absentdetail_read',$absent->getProject()->getId(),$absent->getPt()->getId(),$absent->getMonth(),$absent->getYear(),$absent->getEmployee()->getId(),intval($request->getOthersValue("department_id")),intval($request->getOthersValue("start_date")),intval($request->getOthersValue("end_date")));
        
      

        return $hasil;
    }
    
    // public function getLastPeriod(Box_Models_App_Session $ses){
    public function getLastPeriod(Box_Models_App_Session $ses, $data_params){    
        $hasil = 0;
        
        //#1
        //$hasil = $this->dbTable->SPExecute('sp_absentlastperiod_read',16,89);

        //#2
        // $hasil = $this->dbTable->SPExecute('sp_absentlastperiod_read',$ses->getProject()->getId(),$ses->getPt()->getId());

        // added by Michael 2021.05.19 
        //#3
        $hasil = $this->dbTable->SPExecute('sp_absentlastperiod_read',$data_params['project_id'],$data_params['pt_id']);
        // end added by Michael 2021.05.19 
      

        return $hasil;
    }

    // added by Michael 2021.05.19
    //GET PROJECT & PT ID
    public function getProjectPtId($session,$data) {
        $hasil = '';
        $hasil = $this->dbTable->SPExecute('sp_projectpt_getid_read',
                                            $session->getUserId(),
                                            $session->getGroupId(),
                                            $data['projectpt_id'],
                                            1,
                                            1);

        return $hasil;
    }

    //GET PROJECTPT ID
    public function getProject_Pt_Id($session,$data) {
        $hasil = '';
        $hasil = $this->dbTable->SPExecute('sp_projectpt_get_projectptid_read',
                                            $session->getUserId(),
                                            $session->getGroupId(),
                                            $data['project_id'],
                                            $data['pt_id'],
                                            1,
                                            1);

        return $hasil;
    }
    //reload setupshift
    public function getMasterSetupShiftProjectPt(Hrd_Models_Master_ShiftType $d, $session, $data){
        $hasil = 0;//$r->getPage(), $r->getLimit()
        $hasil = $this->dbTable->SPExecute('sp_shifttype_read',$data['project_id'],$data['pt_id'],1, 250,$d->getName(),$d->getCode());
        return $hasil;
    }
    // end added by Michael 2021.05.19 
    
    public function getAbsentSheetWOPL(Hrd_Models_Absent $absent,$startDate,$endDate){
        
       
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_absentdetailb_read',$absent->getProject()->getId(),$absent->getPt()->getId(),$absent->getEmployee()->getId(),$startDate,$endDate);
        
   

        return $hasil;
    }
    
    public function getAbsentSheetByRange($startDate,$endDate,$employeeId){
        
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_absentbyrangedate_read',$startDate,$endDate,$employeeId);
        
      

        return $hasil;
    }
    
    public function getAbsentSheetByRangeMulti($startDate,$endDate,$employeeIds){
        
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_absentbyrangedate_multi_read',$startDate,$endDate,$employeeIds);
        
        

        return $hasil;
    }

    public function setupShift(Hrd_Models_Absent $absent) {

        $hasil = 0;
        $ar = $absent->getDCResult();
        $hasil = $this->dbTable->SPUpdate('sp_absentdetail_shift_update', $absent->getAddBy(), $ar["absentdetail_id"], $ar["shifttype_shifttype_id"]);
        return $hasil;
    }
    
    public function setupShiftByEmployee(Hrd_Models_Absent $absent,  Box_Models_App_Session $ses) {

        $hasil = 0;
        $dcResult = $absent->getDCResult();
        
     
        
        if($dcResult){
            $hasil = $this->dbTable->SPUpdate('sp_absentupdateshiftbyemployee_create',$ses->getUser()->getId(),$dcResult["absentdetail_id"], $dcResult["shifttype_shifttype_id"]);
          
        }
        return $hasil;
    }

    public function updateByRangeDateAbsentType(Hrd_Models_Absent $absent) {
        $hasil = 0;
        $ar = $absent->getDCResult();
        $ar["parametertlk_parametertlk_id"] = '';

        $hasil = $this->dbTable->SPUpdate('sp_absentdetail_absenttype_update', $absent->getAddBy(), $ar["absentdetail_id"], $ar["absenttype_absenttype_id"], $ar["parametertlk_parametertlk_id"], $ar["description"], $ar["shifttype_shifttype_id"], $ar["in_7_14"], $ar["out_7_14"]);


        return $hasil;
    }
    
    public function updateByRangeDateAbsentTypeB(Hrd_Models_Leave_Leave $leave, $dates) {
        $hasil = 0;
      
        $hasil = $this->dbTable->SPUpdate('sp_absentdetail_updateabsenttype', $leave->getAddBy(),
                $leave->getEmployee()->getId(),
                $leave->getAbsentType()->getId(),$dates,$leave->getNote());
        
        return $hasil;
    }
    
    /* dengan penguranangan hak cuti */
    // public function updateByRangeDateAbsentTypeC(Hrd_Models_Leave_Leave $leave, $dates,$hakCutiId,$hakCutiAmount,$ses, $ar) {
    // added by Michael 2021.05.19
    public function updateByRangeDateAbsentTypeC(Hrd_Models_Leave_Leave $leave, $dates,$hakCutiId,$hakCutiAmount,$ses, $ar) {
    // end added by Michael 2021.05.19
        $hasil = 0;
        
        if(array_key_exists("attachment",$ar)){
            $attachment = $ar['attachment'];
        }else{
            $attachment = '';
        }
        
        $hasil = $this->dbTable->SPUpdate('sp_absentdetail_updateabsenttypekhc', $leave->getAddBy(),
                $leave->getEmployee()->getId(),
                $leave->getAbsentType()->getId(),$dates,$leave->getNote(),
                $hakCutiId,$hakCutiAmount,
                // $ses->getProject()->getId(),$ses->getPt()->getId(),    
                // added by Michael 2021.05.19
                $ar['project_id_ces'],$ar['pt_id_ces'],$attachment
                // end added by Michael 2021.05.19   
            );
        
        return $hasil;
    }
    
    // edit by wulan sari 20190424
    public function updateByRangeDateAbsentTypeLam(Hrd_Models_Leave_Leave $leave, $dates, $hakCutiId, $hakCutiAmount, $ses, $ar) {
        $hasil = 0;
        
        $hasil = $this->dbTable->SPUpdate('sp_absentdetail_updateabsenttypelam', $leave->getAddBy(),
                $leave->getEmployee()->getId(),
                $leave->getAbsentType()->getId(),$dates,$leave->getNote(),
                $hakCutiId,$hakCutiAmount,
                // $ses->getProject()->getId(),$ses->getPt()->getId(),    
                // added by Michael 2021.05.19
                $ar['project_id_ces'],$ar['pt_id_ces'],    
                // end added by Michael 2021.05.19              
                $ar["in_7_14"],$ar["in_15_21"],$ar["in_22_6"],$ar["start_time"]);        
        //var_dump($this->dbTable);
        return $hasil;
    }
    
    public function updateByRangeDateAbsentTypeLap(Hrd_Models_Leave_Leave $leave, $dates, $hakCutiId, $hakCutiAmount, $ses, $ar) {
        $hasil = 0;
        
        $hasil = $this->dbTable->SPUpdate('sp_absentdetail_updateabsenttypelap', $leave->getAddBy(),
                $leave->getEmployee()->getId(),
                $leave->getAbsentType()->getId(),$dates,$leave->getNote(),
                $hakCutiId,$hakCutiAmount,
                // $ses->getProject()->getId(),$ses->getPt()->getId(),    
                // added by Michael 2021.05.19
                $ar['project_id_ces'],$ar['pt_id_ces'],    
                // end added by Michael 2021.05.19
                $ar["out_7_14"],$ar["out_15_21"],$ar["out_22_6"],$ar["end_time"]);
        return $hasil;
    }    
    // end edit by wulan sari 20190424
    
    public function updateByRangeDateAbsentTypeIzinMasukLambat(Hrd_Models_Leave_Leave $leave, $dates) {
        $hasil = 0;
      
        $hasil = $this->dbTable->SPUpdate('sp_absentdetail_updateabsenttype', $leave->getAddBy(),
                $leave->getEmployee()->getId(),
                $leave->getAbsentType()->getId(),$dates,$leave->getNote(),0,0,1);
        
        return $hasil;
    }
        
    public function updateByIzin(Hrd_Models_Leave_Leave $leave, $dates, Hrd_Models_Leave_LeaveEntitlement $le) {
        $hasil = 0;
       
        $hasil = $this->dbTable->SPUpdate('sp_absentdetail_updateabsenttype', $leave->getAddBy(),
                $leave->getEmployee()->getId(),
                $leave->getAbsentType()->getId(),$dates,$leave->getNote(),$le->getId(),$le->getRest());
        
     //   var_dump($this->dbTable);
        
        return $hasil;
    }

    public function updateTlk(Hrd_Models_Absent $absent) {
        $hasil = 0;
        $ar = $absent->getDCResult();

        $ar["absenttype_absenttype_id"] = '';
        $hasil = $this->dbTable->SPUpdate('sp_absentdetail_absenttype_update', $absent->getAddBy(), $ar["absentdetail_id"], $ar["absenttype_absenttype_id"], $ar["parametertlk_parametertlk_id"], $ar["description"], $ar["shifttype_shifttype_id"], $ar["in_7_14"], $ar["out_7_14"]);

        return $hasil;
    }
    
    public function updateTlk2(Box_Models_App_Session $ses,  Box_Models_App_Decan $decan) {
        $hasil = 0;
        $ar = $decan->getDCResult();
        

        $hasil = $this->dbTable->SPUpdate('sp_absentdetailtlk_update', $ses->getUser()->getId(), $ar["absentdetail_id"], $ar["parametertlk_parametertlk_id"],
                $ar["tlk_other"],$ar["tlk_project_type"],
                $ar["in_7_14"],$ar["out_7_14"],
                $ar["in_15_21"],$ar["out_15_21"],
                $ar["in_22_6"],$ar["out_22_6"],
                $ar["time_in"],$ar["time_out"],
                $ar["attendance_total"]);
        //var_dump($this->dbTable);
        return $hasil;
    }

    public function deleteabsentday(Hrd_Models_Master_General_Date $date) {
        $hasil = 0;
        if ($date->getId() == 0 || !$date->getDeleteBy()) {
            return $hasil;
        }
        $hasil = $this->dbTable->SPUpdate('sp_absentdetail_destroy', $date->getDeleteBy(), $date->getId());

        return $hasil;
    }

    public function deletemainabsent(Hrd_Models_Absent $absent) {
        $hasil = 0;
        if ($absent->getId() == 0 || !$absent->getDeleteBy()) {
            return $hasil;
        }
        $hasil = $this->dbTable->SPUpdate('sp_absent_destroy', $absent->getDeleteBy(), $absent->getId());

        return $hasil;
    }

    public function saveNewSheet($data, Box_Models_App_Session $ses) {
        $hasil = 0;
        // $hasil = $this->dbTable->SPUpdate('sp_absent_create', $ses->getUser()->getId(), $ses->getPt()->getId(), $ses->getProject()->getId(), $data["month"], $data["year"], $data["maxday"]);

        // added by Michael 2021.05.19 
        $hasil = $this->dbTable->SPUpdate('sp_absent_create', $ses->getUser()->getId(), $data["pt_id"], $data["project_id"], $data["month"], $data["year"], $data["maxday"]);
        // end added by Michael 2021.05.19 
     
        return $hasil;
    }
    
    public function deleteTemporaryTransfer() {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_absent_deletetransfer');

        return $hasil;
    }

    public function getListEmployee($month, $year) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_absentemployee_read', $month, $year);

        return $hasil;
    }

    // public function getRoster(Hrd_Models_Absent $absent, Box_Models_App_Session $ses) {
    public function getRoster(Hrd_Models_Absent $absent, Box_Models_App_Session $ses, $data_params) {
        $hasil = 0;
        
        // #1
        // comment by Wulan Sari 2018.05.03
        //$hasil = $this->dbTable->SPExecute('sp_absent_read', $absent->getEmployee()->getId(), $absent->getMonth(), $absent->getYear());
        
        // #2
        // added by Wulan Sari 2018.05.03
        // $hasil = $this->dbTable->SPExecute('sp_absent_read', $absent->getEmployee()->getId(), $absent->getMonth(), $absent->getYear(), $ses->getProject()->getId(), $ses->getPt()->getId());

        // added by Michael 2021.05.19 
        // #3
        $hasil = $this->dbTable->SPExecute('sp_absent_read', $absent->getEmployee()->getId(), $absent->getMonth(), $absent->getYear(), $data_params['project_id'], $data_params['pt_id']);

        // end added by Michael 2021.05.19 

        //var_dump($this->dbTable);
        return $hasil;
    }

    // added by Michael 2021.06.15 
    public function getAttachment(Hrd_Models_Absent $absent, Box_Models_App_Session $ses, $data_params) {
        $hasil = 0;
        
        $hasil = $this->dbTable->SPExecute('sp_absent_attachment_read', $data_params['absentdetail_id'] , $absent->getEmployee()->getId(), $absent->getMonth(), $absent->getYear(), $data_params['project_id'], $data_params['pt_id']);

        return $hasil;
    }
    // end added by Michael 2021.06.15 

    public function transferFingerPrint(Hrd_Models_Fingerprint_Header $header, Box_Models_App_Session $ses) {
        $hasil = 0;

        $dcResult = $header->getDCResult();
        
       
      
        if ($dcResult) {
            $hasil = $this->dbTable->SPUpdate('sp_fingerprinttransfer_create', $ses->getUser()->getId(), $ses->getProject()->getId(), $ses->getPt()->getId(), 
                    $dcResult["psnno"], $dcResult["date"],
                    $dcResult["time_in"], $dcResult["time_out"]);
        }
        
        
        
        

        return $hasil;
    }
    
    public function transferFingerPrintB($dcResult, Box_Models_App_Session $ses) {
        $hasil = 0;

        if ($dcResult) {
            $hasil = $this->dbTable->SPUpdate('sp_fingerprinttransfer_create', $ses->getUser()->getId(), $ses->getProject()->getId(), $ses->getPt()->getId(), 
                    $dcResult["psnno"], $dcResult["date"],
                    $dcResult["time_in"], $dcResult["time_out"]);
            
            
            /* Pindah ke function gantishift karena SOP nya berubah, jadi kalau mau gantishift perlu approval dulu
            // wulan edit 20190207 
            // untuk kebutuhan di Ciputra Artpreneur ada karyawan tertentu shift-nya dinamis
            if($ses->getProject()->getId() == 4038 && $ses->getPt()->getId() == 20){
                $hasil2 = $this->dbTable->SPUpdate('sp_absent_updateshift', $ses->getUser()->getId(), $ses->getProject()->getId(), $ses->getPt()->getId(), 
                    $dcResult["psnno"], $dcResult["date"]);
                //var_dump($this->dbTable);
            }
            */   
        }        

        return $hasil;
    }
    
    public function gantishift($dcResult, Box_Models_App_Session $ses) {
        $hasil = 0;
        if($ses->getProject()->getId() == 4038 && $ses->getPt()->getId() == 20){
            $hasil = $this->dbTable->SPUpdate('sp_absent_gantishift', $ses->getUser()->getId(), $ses->getProject()->getId(), $ses->getPt()->getId(), 
                $dcResult["employee_id"], substr($dcResult["daritanggal"], 0, 10), $dcResult["transaction_id"] );
            //var_dump($this->dbTable);
        }
        return $hasil;
    }

    public function getAllFingerPrint(Hrd_Models_Absent $abs) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_fingerprint_read', $abs->getProject()->getId(), $abs->getPt()->getId(), $abs->getMonth(), $abs->getYear());
    
        return $hasil;
    }

    // public function getAllAbsentFingerPrint(Hrd_Models_Absent $abs) {
    // added by Michael 2021.05.19
    public function getAllAbsentFingerPrint(Hrd_Models_Absent $abs, $data) {
    // added by Michael 2021.05.19
        $hasil = 0;
        // $hasil = $this->dbTable->SPExecute('sp_absentdetailforfp_read', $abs->getProject()->getId(), $abs->getPt()->getId(), $abs->getMonth(), $abs->getYear());
        $hasil = $this->dbTable->SPExecute('sp_absentdetailforfp_read', $data['project_id'], $data['pt_id'], $abs->getMonth(), $abs->getYear());

        return $hasil;
    }

    public function updateAbsentByFingerPrint(Hrd_Models_Absent $abs, Box_Models_App_Session $ses) {
        $hasil = 0;
        $dcResult = $abs->getDCResult();
        
       
        
        if ($dcResult) {
       
            $hasil = $this->dbTable->SPExecute('sp_absentupdatebyfingerprint_create', $ses->getUser()->getId(), 
                    $dcResult["absentdetail_id"], $dcResult["in_7_14"], $dcResult["out_7_14"], 
                    $dcResult["in_15_21"], $dcResult["out_15_21"], $dcResult["in_22_6"], 
                    $dcResult["out_22_6"],$dcResult["late"],$dcResult["attendance_total"],$dcResult["total_hours"],
                    $dcResult["time_in"],$dcResult["time_out"],$dcResult["time_lost"],$dcResult["date"]);
        }
        
        
        


        return $hasil;
    }
    
    public function updateAbsentByFingerPrintB($dcResult, Box_Models_App_Session $ses) {
        $hasil = 0;
       
        
       
       
       
        
        if ($dcResult) {
       
            $hasil = $this->dbTable->SPExecute('sp_absentupdatebyfingerprint_create', $ses->getUser()->getId(), 
                    $dcResult["absentdetail_id"], $dcResult["in_7_14"], $dcResult["out_7_14"], 
                    $dcResult["in_15_21"], $dcResult["out_15_21"], $dcResult["in_22_6"], 
                    $dcResult["out_22_6"],$dcResult["late"],$dcResult["attendance_total"],$dcResult["total_hours"],
                    $dcResult["time_in"],$dcResult["time_out"],$dcResult["time_lost"],$dcResult["date"]);
        }
        
        
      


        return $hasil;
    }
    
    public function updateLate(Hrd_Models_Absent $abs, Box_Models_App_Session $ses) {
        $hasil = 0;
        $dcResult = $abs->getDCResult();
        
        
        
        if ($dcResult) {
            $hasil = $this->dbTable->SPExecute('sp_absentupdatelate_create', $ses->getUser()->getId(),
                    $dcResult["absentdetail_id"], $dcResult["late"]);
        }


        return $hasil;
    }
    
    public function updateHal(Hrd_Models_Absent $abs, Box_Models_App_Session $ses) {
        $hasil = 0;
        $dcResult = $abs->getDCResult();
       
        if ($dcResult) {
            $hasil = $this->dbTable->SPExecute('sp_absentupdatehal_create', $ses->getUser()->getId(),
                    $dcResult["absentdetail_id"], $dcResult["total_hours"],$dcResult["time_lost"]);
        }


        return $hasil;
    }
    
    public function updateAttendance(Hrd_Models_Absent $abs, Box_Models_App_Session $ses) {
        $hasil = 0;
        $dcResult = $abs->getDCResult();
        if ($dcResult) {
            $hasil = $this->dbTable->SPExecute('sp_absentupdateattendance_create', $ses->getUser()->getId(),
                    $dcResult["absentdetail_id"], $dcResult["attendance_total"]);
        }


        return $hasil;
    }
    
    public function updateDescCuti($admin, Hrd_Models_Leave_Leave $leave ) {
        $hasil = 0;
       
            $hasil = $this->dbTable->SPExecute('sp_absentdetail_cutidesc_update',$admin,
                    $leave->getEmployee()->getId(),$leave->getStartDate(),
                    $leave->getEndDate(),$leave->getNote());
    
       

        return $hasil;
    }
    
    //
    
    public function updateAbsentByShiftType(Hrd_Models_Absent $abs, Box_Models_App_Session $ses) {
        $hasil = 0;
        $dcResult = $abs->getDCResult();
        if ($dcResult) {
            $hasil = $this->dbTable->SPExecute('sp_absentupdatebyfingerprint_create', $ses->getUser()->getId(), $dcResult["absentdetail_id"], $dcResult["in_7_14"], $dcResult["out_7_14"], $dcResult["in_15_21"], $dcResult["out_15_21"], $dcResult["in_22_6"], $dcResult["out_22_6"]);
        }


        return $hasil;
    }

    // public function getStartParams(Hrd_Models_Absent $absent, $departmentId, $kelompokabsensiId) {
    public function getStartParams(Hrd_Models_Absent $absent, $departmentId, $kelompokabsensiId, $data_params) {
        $hasil = 0;
        // $hasil = $this->dbTable->SPExecute('sp_absentstartparams_read', $absent->getProject()->getId(), $absent->getPt()->getId(),$absent->getYear(),$absent->getMonth(),$departmentId,$kelompokabsensiId);

        // added by Michael 2021.05.19 
        $hasil = $this->dbTable->SPExecute('sp_absentstartparams_read', $data_params['project_id'],$data_params['pt_id'],$absent->getYear(),$absent->getMonth(),$departmentId,$kelompokabsensiId);
        // end added by Michael 2021.05.19

        //var_dump($this->dbTable);
        return $hasil;
    }
    
    // public function getYears(Box_Models_App_Session $ses){
    public function getYears(Box_Models_App_Session $ses, $data_params){
        $hasil = 0;
        // #1
        //   $hasil = $this->dbTable->SPExecute('sp_absentyear_read',2,45);
        
        // #2
        // $hasil = $this->dbTable->SPExecute('sp_absentyear_read',$ses->getProject()->getId(),$ses->getPt()->getId());

        // added by Michael 2021.05.19 
        // #3
        $hasil = $this->dbTable->SPExecute('sp_absentyear_read',$data_params['project_id'],$data_params['pt_id']);
        // end added by Michael 2021.05.19 

        return $hasil;
    }

    // public function getMonths(Hrd_Models_Absent $abs){
    public function getMonths(Hrd_Models_Absent $abs, $data_params){
        $hasil = 0;
        // $hasil = $this->dbTable->SPExecute('sp_absentmonth_read',$abs->getProject()->getId(),$abs->getPt()->getId(),$abs->getYear());

        // added by Michael 2021.05.19 
        $hasil = $this->dbTable->SPExecute('sp_absentmonth_read',$data_params['project_id'],$data_params['pt_id'],$abs->getYear());
        // end added by Michael 2021.05.19 

        return $hasil;
    }
    
    // public function getDepartments(Hrd_Models_Absent $abs){
    public function getDepartments(Hrd_Models_Absent $abs, $data_params){
        $hasil = 0;
        // $hasil = $this->dbTable->SPExecute('sp_absentdepartment_read',$abs->getProject()->getId(),$abs->getPt()->getId(),$abs->getYear(),$abs->getMonth());

        // added by Michael 2021.05.19 
        $hasil = $this->dbTable->SPExecute('sp_absentdepartment_read',$data_params['project_id'],$data_params['pt_id'],$abs->getYear(),$abs->getMonth());
        // end added by Michael 2021.05.19 

        return $hasil;
    }
    
    //sp_absentemployeeb_read
    public function getEmployes(Box_Models_App_Session $ses){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_absentemployeeb_read',$ses->getProject()->getId(),$ses->getPt()->getId());

        return $hasil;
    }
    
    public function getInvalidAbsent($projectId,$ptId,$startDate,$endDate){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_absent_invalidabsent_read',$projectId,$ptId,$startDate,$endDate);
      
        return $hasil;
    }

   
   /* start added by ahmad riadi 02-06-2017 */
    public function getAbsentdetail_byid($id) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_absentdetail_byid_read', $id);
        if (!empty($hasil[0])) {
            return $hasil[0][0];
        } else {
            return array(array("absentdetail_id" => 0));
        }
    }   
    /* end added by ahmad riadi 02-06-2017 */


   /* start added by ahmad riadi 15-06-2017 */
    public function updateForAbsentDetail($dcResult, Box_Models_App_Session $ses) {
        $hasil = 0; 
        if ($dcResult) {       
            $hasil = $this->dbTable->SPExecute('sp_absentupdatebyfingerprint_update', $ses->getUser()->getId(), 
                    $dcResult["absentdetail_id"], $dcResult["in_7_14"], $dcResult["out_7_14"], 
                    $dcResult["in_15_21"], $dcResult["out_15_21"], $dcResult["in_22_6"], 
                    $dcResult["out_22_6"],$dcResult["late"],$dcResult["attendance_total"],$dcResult["total_hours"],
                    $dcResult["time_in"],$dcResult["time_out"],$dcResult["time_lost"],$dcResult["date"],$dcResult["shift_code"],$dcResult["transport_total"]);
        }
        return $hasil;
    }
    
    public function cleardata_Employeeinoffiflate($year,$month,$employee_id, Box_Models_App_Session $ses) {
        $hasil = 0; 
        if ($month) {       
            $hasil = $this->dbTable->SPExecute('sp_absentcleandatainofftimeinoutnotnull_update',
                    $ses->getUser()->getId(), 
		    $year,	
                    $month, 
                    $employee_id
                    );
        }
        return $hasil;
    }    
    /* end added by ahmad riadi 15-06-2017 */


  /* start added by ahmad riadi 16-06-2017 */
    public function Getdataleavehalfinlate($year, $month, $project_id, $pt_id) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_absentdetail_getdataleavehalfinlate',$year,$month, $project_id, $pt_id);
        if (!empty($hasil[0])) {
            return $hasil[0];
        } else {
            return false;
        }
    }
    
    public function cleardata_Employeein_halfleaveiflate($absentdetail_id, $latehour, $losttime, $user_id) {
        $setup = new Hrd_Models_General_Setup();
        $setup->_storeprocedure = 'sp_absentcleandatainhalfleave_update';
        $setup->_param = array(
            'user_id' => $user_id,
            'absentdetail_id' => $absentdetail_id,
            'latehour' => $latehour,
            'losttime' => $losttime,
        );
       $setup->executeSP();  
    }

    /* end added by ahmad riadi 16-06-2017 */
   

   /* start added by ahmad riadi 20-06-2017 */


    public function getAbsentdetail_forlateinfastout_by_id($id) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_absentdetail_permitlateinfastout_byid_read', $id);
        if (!empty($hasil[0])) {
            return $hasil[0][0];
        } else {
            return false;
        }
    }  

    public function cleardata_Employeein_permitlateinfastout($absentdetail_id, $latehour, $losttime, $user_id) {
        $setup = new Hrd_Models_General_Setup();
        $setup->_storeprocedure = 'sp_absentcleanlatelosttime_byid_update';
        $setup->_param = array(
            'user_id' => $user_id,
            'absentdetail_id' => $absentdetail_id,
            'latehour' => $latehour,
            'losttime' => $losttime,
        );
        $setup->executeSP();
    }

   /* end added by ahmad riadi 20-06-2017 */

 
  /* start added by ahmad riadi 22-06-2017 */
    public function getdataReportharian($param) {    
        if($param['department']=='ALL'){
            $param['department_id'] =0;
        } 
   
        if (isset($param['employee_id'])) {
            if($param['employee_id'] > 0){
                $param['employee_id'] = $param['employee_id'];
            }else{
                $param['employee_id'] = 0;
            } 
            
        // added by Wulan Sari 2018.05.02
        } else {
           $param['employee_id'] = 0;            
        }


        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_report_absent_dailyb', 
                                            $param['project_project_id'],
                                            $param['pt_pt_id'],
                                            $param['employee_id'],
                                            $param['department_id'],
                                            $param['status_karyawan'],
                                            $param['start_date'],
                                            $param['end_date'],
                                            $param['include_other'] // added by wulan sari 20200527
                                           );
        if (!empty($hasil[0])) {
            return $hasil[0];
        } else {
            return false;
        }
    }  
   /* end added by ahmad riadi 22-06-2017 */

   // added by Michael 2021.06.25 
    public function getdataReportharianmhl($param) {    
        if($param['department']=='ALL'){
            $param['department_id'] =0;
        } 
   
        if (isset($param['employee_id'])) {
            if($param['employee_id'] > 0){
                $param['employee_id'] = $param['employee_id'];
            }else{
                $param['employee_id'] = 0;
            } 
            
        // added by Wulan Sari 2018.05.02
        } else {
           $param['employee_id'] = 0;            
        }

        $hasil = 0;
        //updated by anas 04012021 - update sp
        $hasil = $this->dbTable->SPExecute('sp_report_absent_dailyb_mhl', 
                                            $param['project_project_id'],
                                            $param['pt_pt_id'],
                                            $param['employee_id'],
                                            $param['department_id'],
                                            $param['status_karyawan'],
                                            $param['start_date'],
                                            $param['end_date'],
                                            $param['include_other'] // added by wulan sari 20200527
                                           );
        if (!empty($hasil[0])) {
            return $hasil[0];
        } else {
            return false;
        }
    }
   // end added by Michael 2021.06.25 

    // added by Michael 2021.08.24 
    public function getdataReportsickleave($param) {    
        if($param['department']=='ALL'){
            $param['department_id'] =0;
        } 
   
        if (isset($param['employee_id'])) {
            if($param['employee_id'] > 0){
                $param['employee_id'] = $param['employee_id'];
            }else{
                $param['employee_id'] = 0;
            } 
            
        // added by Wulan Sari 2018.05.02
        } else {
           $param['employee_id'] = 0;            
        }


        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_report_absent_sickleave', 
                                            $param['project_project_id'],
                                            $param['pt_pt_id'],
                                            $param['employee_id'],
                                            $param['department_id'],
                                            $param['status_karyawan'],
                                            $param['start_date'],
                                            $param['end_date']
                                           );
        if (!empty($hasil[0])) {
            return $hasil[0];
        } else {
            return false;
        }
    }
   // end added by Michael 2021.08.24

   // added by Michael 2021.11.22 
    public function getdataReportsanksiketerlambatan($param) {    
        if($param['department']=='ALL'){
            $param['department_id'] =0;
        } 
   
        if (isset($param['employee_id'])) {
            if($param['employee_id'] > 0){
                $param['employee_id'] = $param['employee_id'];
            }else{
                $param['employee_id'] = 0;
            } 
            
        // added by Wulan Sari 2018.05.02
        } else {
           $param['employee_id'] = 0;            
        }


        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_report_absent_sanksiketerlambatan', 
                                            $param['project_project_id'],
                                            $param['pt_pt_id'],
                                            $param['employee_id'],
                                            $param['department_id'],
                                            $param['status_karyawan'],
                                            $param['start_date'],
                                            $param['end_date']
                                           );
        if (!empty($hasil[0])) {
            return $hasil[0];
        } else {
            return false;
        }
    }

    public function getdataReportpermit($param) {    
        if($param['department']=='ALL'){
            $param['department_id'] =0;
        } 
   
        if (isset($param['employee_id'])) {
            if($param['employee_id'] > 0){
                $param['employee_id'] = $param['employee_id'];
            }else{
                $param['employee_id'] = 0;
            } 
            
        // added by Wulan Sari 2018.05.02
        } else {
           $param['employee_id'] = 0;            
        }


        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_report_absent_permit', 
                                            $param['project_project_id'],
                                            $param['pt_pt_id'],
                                            $param['employee_id'],
                                            $param['department_id'],
                                            $param['status_karyawan'],
                                            $param['start_date'],
                                            $param['end_date']
                                           );
        if (!empty($hasil[0])) {
            return $hasil[0];
        } else {
            return false;
        }
    }
   // end added by Michael 2021.11.22 

   /* start added by ahmad riadi 03-07-2017 */
    public function Getdataleave($year, $month,$project_id,$pt_id) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_absentdetail_getdataleave',$year,$month,$project_id,$pt_id);
        if (!empty($hasil[0])) {
            return $hasil[0];
        } else {
            return false;
        }
    }

    public function Updatenote_absentrecord($absentdetail_id,$note,Box_Models_App_Session $ses) {
        $hasil = 0;        
        $hasil = $this->dbTable->SPExecute('sp_absentdetail_updatenote',
                $ses->getUser()->getId(), 
                $absentdetail_id,	
                $note                  
                );
       
        return $hasil;        
    }
    /* end added by ahmad riadi 03-07-2017 */

    

      /* start added by ahmad riadi 22-09-2017 */
    public function getAbsentType($id) {
        $setup = new Hrd_Models_General_Setup();
        $setup->_tabledata = $setup->_m_absenttype;
        $result = $setup->getdata_standard(array("absenttype_id" => $id));
        $counter = 0;
        $data = null;
        if (!empty($result[0])) {
            $counter = count($result[0][0]);
            $data = $result[0][0];
        }
        return $data;
    }
     /* end added by ahmad riadi 22-09-2017 */




   /* start added by ahmad riadi 06-11-2017 */	
   public function Getabsent_by_empid_date($employee_id, $date) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_getabsent_by_empid_date',$employee_id,$date);
        if (!empty($hasil[1])) {
            return $hasil[1][0];
        } else {
            return false;
        }
    }

   /* end added by ahmad riadi 06-11-2017 */


	
  /* start added by ahmad riadi 08-11-2017 */
   public function Getabsent_in_log($absentdetail_id, $flag) {
        $setup = new Hrd_Models_General_Setup();
        $setup->_tabledata = $setup->_log_td_absentdetail;
        $result = $setup->getdata_standard(
                array(
                    "absentdetail_id" => $absentdetail_id,
                    "log_basedata" => $flag
                )
        );
        $counter = 0;
        $data = null;
        if (!empty($result[0])) {
            $counter = count($result[0]);
            $data = $result[0];
        }
        return $data;
    }


    public function create_logdata_absentdetail($data, $basedadta) {
        $setup = new Hrd_Models_General_Setup();
        $setup->create_log_table($setup->_log_td_absentdetail, $data, $basedadta);
    }
	
    
    // edited by Wulan Sari 24.04.2018
    // #1
    // public function checkProjectPt($pin_satu, Box_Models_App_Session $ses) {

    //#2
    // added by Michael 2021.05.19 
    public function checkProjectPt($pin_satu, Box_Models_App_Session $ses, $data) {
    // end added by Michael 2021.05.19 

        $hasil = 0;
        // $hasil = $this->dbTable->SPExecute('sp_absent_checkprojectpt', $ses->getProject()->getId(), $ses->getPt()->getId(), $pin_satu);

        // added by Michael 2021.05.19
        $hasil = $this->dbTable->SPExecute('sp_absent_checkprojectpt', $data['project_id'], $data['pt_id'], $pin_satu);
        // end added by Michael 2021.05.19

        if(!empty($hasil[0][0])){
            return true;
        } else {
            return false;            
        }
    }
    
    // edited by wulan sari 20181224    
    public function checkSH($project_id) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_absent_checksh', $project_id);
        if (!empty($hasil[0])) {
            return $hasil[0][0];
        } else {
            return false;
        }
    }  
    
    // edited by wulan sari 20192108
    public function updateByRangeDateAbsentTypeRemoveLostime(Hrd_Models_Leave_Leave $leave, $dates) {
        $hasil = 0;
      
        $hasil = $this->dbTable->SPUpdate('sp_absentdetail_updateabsenttyperemovelosttime', $leave->getAddBy(),
                $leave->getEmployee()->getId(),
                $leave->getAbsentType()->getId(),$dates,$leave->getNote(),0,0,1);
        
        return $hasil;
    }
    //end edited by wulan sari 20192108     
    
    // add by wulan sari 20191008
    public function getabsentdetail_id(Hrd_Models_Leave_Leave $leave, $dates) {
        $hasil = $this->dbTable->SPExecute('sp_absentdetail_getid_read',
                $leave->getEmployee()->getId(),$dates); 
               
        if (!empty($hasil[0])) {
            return $hasil[0][0];
        } else {
            return false;
        }
    }
    
    //edit by wulan 20200319    
    public function inoutwfh($dcResult, Box_Models_App_Session $ses) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_absent_inoutwfh', $ses->getUser()->getId(), $ses->getProject()->getId()
                , $ses->getPt()->getId()
                , $dcResult["m"]
                , $dcResult["y"]);
        //var_dump($this->dbTable); exit;
        return $hasil;
    }
    
    // add by wulan sari 20200423    
    public function absent_teams_transfer($admin, $project_id, $pt_id, $start, $end) {                
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_absent_teams_transfer', $admin, $project_id, $pt_id, $start, $end);
        if (!empty($hasil[0])) {
            return $hasil[0][0];
        } else {
            return false;
        }
    }  
    
    // add by wulan 2020 05 02    
    public function update_wfh_attn($m,$y,Box_Models_App_Session $ses) {
        $hasil = 0;        
        $hasil = $this->dbTable->SPExecute('sp_absentdetail_updateattn',
                $ses->getUser()->getId(), 
                $m,
                $y,	
                $ses->getProject()->getId(), 
                $ses->getPt()->getId()
                );
       
        return $hasil;        
    }
    
    // add by wulan 13042021
    public function update_wfh_attn_common($m,$y,Box_Models_App_Session $ses) {
        $hasil = 0;        
        $hasil = $this->dbTable->SPExecute('sp_absentdetail_updateattn_common',
                $ses->getUser()->getId(), 
                $m,
                $y,	
                $ses->getProject()->getId(), 
                $ses->getPt()->getId()
                );
        #var_dump($this->dbTable);
        return $hasil;        
    }

    // add by wulan 2020 07 07    
    public function update_wfh_attn_raya($m,$y,Box_Models_App_Session $ses) {
        $hasil = 0;        
        $hasil = $this->dbTable->SPExecute('sp_absentdetail_updateattn_raya',
                $ses->getUser()->getId(), 
                $m,
                $y,	
                $ses->getProject()->getId(), 
                $ses->getPt()->getId()
                );
        //var_dump($this->dbTable);
        return $hasil;        
    }
        
    public function update_wfh_attn_byid_raya($employee_id, $dates, Box_Models_App_Session $ses) {
        $hasil = 0;        
        $hasil = $this->dbTable->SPExecute('sp_absentdetail_updateattn_byid_raya',
                $ses->getUser()->getId(), 
                $employee_id,
                $dates
                );
        //var_dump($this->dbTable);
       
        return $hasil;        
    }    
    
    // added by wulan sari 20200828
    public function getReasondetail($project_id, $pt_id, $id) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_absentdetail_reason', $project_id, $pt_id, $id);
        return $hasil;
    }
    
    // added by Michael 2021.06.30 
    public function saveheader_cutitambahan(Box_Models_App_Session $ses, $data){    
        $hasil = 0;
        
        $hasil = $this->dbTable->SPExecute('sp_extraleave_create', 
                                            $ses->getUser()->getId(),
                                            $data['project_id'],
                                            $data['pt_id'],
                                            $data['periode'],
                                            $data['leavegroup'],
                                            $data['expired_date'],
                                            $data['amount'],
                                            $data['description']);

        return $hasil;
    }

    public function updateheader_cutitambahan(Box_Models_App_Session $ses, $data){    
        $hasil = 0;
        
        $hasil = $this->dbTable->SPExecute('sp_extraleave_update', 
                                            $ses->getUser()->getId(),
                                            $data['extraleave_id'],
                                            $data['project_id'],
                                            $data['pt_id'],
                                            $data['periode'],
                                            $data['leavegroup'],
                                            $data['expired_date'],
                                            $data['amount'],
                                            $data['description']);

        return $hasil;
    }

    public function getEmployeelist(Box_Models_App_HasilRequestRead $r, $session, $data) {
        $hasil = 0;   
        $r->setPage(1);
        $r->setLimit(99999999); 
        $hasil = $this->dbTable->SPExecute('sp_extraleaveemployee_read', 
                                            $r->getPage(), 
                                            $r->getLimit(), 
                                            $data['project_id'],
                                            $data['pt_id'],
                                            $data['employee_name'], 
                                            $data['employee_nik'], 
                                            $data['department_id'],
                                            $data['extraleave_id'],
                                            1);

        return $hasil;
    }

    public function selectemployee_cutitambahan($session, $data) {    
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_extraleave_selectemployee', 
            $session->getUser()->getId(), 
            $data['project_id'],
            $data['pt_id'],
            $data['extraleave_id'], 
            $data['employee_id']
        );  
        return $hasil;  
    }

    public function removeemployee_cutitambahan($session, $data) {    
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_extraleave_removeemployee', 
            $session->getUser()->getId(), 
            $data['project_id'],
            $data['pt_id'],
            $data['extraleave_id'], 
            $data['employee_id']
        );  
        return $hasil;  
    }

    public function check_leaveentitlements($session, $data) {
        $hasil = 0;   
        $hasil = $this->dbTable->SPExecute('sp_extraleave_leaveentitlements_read', 
                                            $data['project_id'],
                                            $data['pt_id'],
                                            $data['employee_id'], 
                                            $data['periode'], 
                                            $data['leavegroup'],
                                            1,
                                            9999);
        return $hasil;
    }

    public function check_proses($session, $data) {
        $hasil = 0;   
        $hasil = $this->dbTable->SPExecute('sp_extraleave_checkproses_read', 
                                            $data['project_id'],
                                            $data['pt_id'],
                                            $data['extraleave_id'], 
                                            $data['employee_id']);
        return $hasil;
    }

    public function check_proses_empcancel($session, $data) {
        $hasil = 0;   
        $hasil = $this->dbTable->SPExecute('sp_extraleave_checkproses_empcancel_read', 
                                            $data['project_id'],
                                            $data['pt_id'],
                                            $data['extraleave_id']);
        return $hasil;
    }

    public function prosesupdate_cutitambahan($session, $data) {    
        $hasil = 0;

        //tamabahan $data['leaveentitlements_id'], karena cuti policy baru
        $hasil = $this->dbTable->SPUpdate(
            'sp_extraleave_updateleaveentitlements', 
            $data['project_id'],
            $data['pt_id'],
            $data['employee_id'], 
            $data['periode'], 
            $data['leavegroup'], 
            $data['rest_update'], 
            $data['description'], 
            $session->getUser()->getId(),
            $data['leaveentitlements_id']
        );  

        if($hasil){
            $proses = $this->dbTable->SPUpdate(
                        'sp_extraleave_submitprosesemp_update', 
                        $session->getUser()->getId(), 
                        $data['project_id'],
                        $data['pt_id'],
                        $data['extraleave_id'],
                        $data['employee_id']
                    );  
        }

        return $hasil;  
    }

    public function prosescreate_cutitambahan($session, $data) {    
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_leaveentitlements_create', 
            $session->getUser()->getId() ,
            $data['project_id'],
            $data['pt_id'],
            $data['employee_id'], 
            $data['amount'],
            0, 
            $data['leavegroup'], 
            $data['periode'], 
            $data['periode'], 
            0,
            date('Y-m-d', strtotime($data['expired_date'])),
            '', 
            date('Y-m-d', strtotime($data['expired_date']))
        );  

        $hasil = $this->dbTable->SPUpdate(
            'sp_extraleave_updatedescleaveentitlements', 
            $data['project_id'],
            $data['pt_id'],
            $data['employee_id'], 
            $data['periode'], 
            $data['leavegroup'], 
            $data['description'] .' (ExtraLeaveId: '. $data['extraleave_id'].') ', 
            $session->getUser()->getId() 
        );  

        if($hasil){
            $proses = $this->dbTable->SPUpdate(
                        'sp_extraleave_submitprosesemp_update', 
                        $session->getUser()->getId(), 
                        $data['project_id'],
                        $data['pt_id'],
                        $data['extraleave_id'],
                        $data['employee_id']
                    );  
        }

        return $hasil;  
    }

    public function prosesupdate_isproses_cutitambahan($session, $data) {    
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
                        'sp_extraleave_submitproses_update', 
                        $session->getUser()->getId(), 
                        $data['project_id'],
                        $data['pt_id'],
                        $data['extraleave_id']
                    );  

        return $hasil;  
    }

    public function getLoglist(Box_Models_App_HasilRequestRead $r, $session, $data) {
        $hasil = 0;   
        $hasil = $this->dbTable->SPExecute('sp_extraleave_read', 
                                            $data['project_id'],
                                            $data['pt_id'],
                                            $data['periode'], 
                                            $data['leavegroup'],
                                            $data['description']);

        return $hasil;
    }

    public function getviewEmployeelist(Box_Models_App_HasilRequestRead $r, $session, $data) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_extraleavedetail_read', 
                                            $data['extraleave_id']);

        return $hasil;
    }

    public function getviewEmployeelist_isproses(Box_Models_App_HasilRequestRead $r, $session, $data) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_extraleavedetailproses_read', 
                                            $data['extraleave_id']);

        return $hasil;
    }

    public function cancelproses_cutitambahan($session, $data) {    
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_extraleave_cancelproses_update', 
            $session->getUser()->getId(), 
            $data['project_id'],
            $data['pt_id'],
            $data['extraleave_id']
        );  
        return $hasil;  
    }

    public function cancelprosesemp_cutitambahan($session, $data) {    
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_extraleave_cancelprosesemp_update', 
            $session->getUser()->getId(), 
            $data['project_id'],
            $data['pt_id'],
            $data['extraleave_id'],
            $data['employee_id']
        );  
        return $hasil;  
    }

    public function getdetail_cutitambahan($session, $data) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_extraleave_readdetail', 
                                            $data['project_id'],
                                            $data['pt_id'],
                                            $data['extraleave_id']);

        return $hasil;
    }
    
    
    // end added by Michael 2021.06.30 

    // added by Michael 2021.07.16 
    public function saveheader_sanksiketerlambatan(Box_Models_App_Session $ses, $data){    
        $hasil = 0;
        
        $hasil = $this->dbTable->SPExecute('sp_sanksiketerlambatan_create', 
                                            $ses->getUser()->getId(),
                                            $data['project_id'],
                                            $data['pt_id'],
                                            $data['periode'],
                                            $data['periode_month'],
                                            $data['amount'],
                                            $data['description']);

        return $hasil;
    }

    public function updateheader_sanksiketerlambatan(Box_Models_App_Session $ses, $data){    
        $hasil = 0;
        
        $hasil = $this->dbTable->SPExecute('sp_sanksiketerlambatan_update', 
                                            $ses->getUser()->getId(),
                                            $data['sanksiketerlambatan_id'],
                                            $data['project_id'],
                                            $data['pt_id'],
                                            $data['periode'],
                                            $data['periode_month'],
                                            $data['amount'],
                                            $data['description']);

        return $hasil;
    }

    public function getEmployeelist_sanksiketerlambatan(Box_Models_App_HasilRequestRead $r, $session, $data) {
        $hasil = 0;   
        $r->setPage(1);
        $r->setLimit(99999999); 
        $hasil = $this->dbTable->SPExecute('sp_sanksiketerlambatanemployee_read', 
                                            $r->getPage(), 
                                            $r->getLimit(), 
                                            $data['project_id'],
                                            $data['pt_id'],
                                            $data['employee_name'], 
                                            $data['employee_nik'], 
                                            $data['department_id'],
                                            $data['sanksiketerlambatan_id'],
                                            1,
                                            $data['periode'],
                                            $data['periode_month']);

        return $hasil;
    }

    public function selectemployee_sanksiketerlambatan($session, $data) {    
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_sanksiketerlambatan_selectemployee', 
            $session->getUser()->getId(), 
            $data['project_id'],
            $data['pt_id'],
            $data['sanksiketerlambatan_id'], 
            $data['employee_id'],
            $data['total_late'],
            $data['avg_late']
            //added by anas 29012024
            , $data['total_lost'],
            $data['avg_lost']
        );  
        return $hasil;  
    }

    public function removeemployee_sanksiketerlambatan($session, $data) {    
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_sanksiketerlambatan_removeemployee', 
            $session->getUser()->getId(), 
            $data['project_id'],
            $data['pt_id'],
            $data['sanksiketerlambatan_id'], 
            $data['employee_id']
        );  
        return $hasil;  
    }

    public function check_leaveentitlements_sanksiketerlambatan($session, $data) {
        $hasil = 0;   
        $hasil = $this->dbTable->SPExecute('sp_sanksiketerlambatan_leaveentitlements_read', 
                                            $data['project_id'],
                                            $data['pt_id'],
                                            $data['employee_id'], 
                                            $data['periode'], 
                                            $data['periode_month'], 
                                            $data['leavegroup'],
                                            $data['leaveentitlements_id'],
                                            1,
                                            9999);
        return $hasil;
    }

    public function check_leaveentitlements_sanksiketerlambatan_order($session, $data) {
        $hasil = 0;   
        $hasil = $this->dbTable->SPExecute('sp_sanksiketerlambatan_leaveentitlements_read', 
                                            $data['project_id'],
                                            $data['pt_id'],
                                            $data['employee_id'],
                                            $data['periode'], 
                                            $data['periode_month'], 
                                            '',
                                            '',
                                            1,
                                            9999);
        return $hasil;
    }

    public function check_proses_sanksiketerlambatan($session, $data) {
        $hasil = 0;   
        $hasil = $this->dbTable->SPExecute('sp_sanksiketerlambatan_checkproses_read', 
                                            $data['project_id'],
                                            $data['pt_id'],
                                            $data['sanksiketerlambatan_id'], 
                                            $data['employee_id']);
        return $hasil;
    }

    public function check_proses_empcancel_sanksiketerlambatan($session, $data) {
        $hasil = 0;   
        $hasil = $this->dbTable->SPExecute('sp_sanksiketerlambatan_checkproses_empcancel_read', 
                                            $data['project_id'],
                                            $data['pt_id'],
                                            $data['sanksiketerlambatan_id']);
        return $hasil;
    }

    public function prosesupdate_sanksiketerlambatan($session, $data) {    
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_sanksiketerlambatan_updateleaveentitlements', 
            $data['project_id'],
            $data['pt_id'],
            $data['employee_id'], 
            $data['periode'], 
            $data['leavegroup'], 
            $data['rest_update'], 
            $data['description'], 
            $data['leaveentitlements_id'],
            $data['sanksiketerlambatan_id'],
            $session->getUser()->getId() 
        );  

        if($hasil){
            $proses = $this->dbTable->SPUpdate(
                        'sp_sanksiketerlambatan_submitprosesemp_update', 
                        $session->getUser()->getId(), 
                        $data['project_id'],
                        $data['pt_id'],
                        $data['sanksiketerlambatan_id'],
                        $data['employee_id']
                    );  
        }

        return $hasil;  
    }

    public function prosescreate_sanksiketerlambatan($session, $data) {    
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_leaveentitlements_create', 
            $session->getUser()->getId() ,
            $data['project_id'],
            $data['pt_id'],
            $data['employee_id'], 
            $data['amount'],
            0, 
            $data['leavegroup'], 
            $data['periode'], 
            $data['periode'], 
            0,
            date('Y-m-d', strtotime($data['expired_date'])),
            '', 
            date('Y-m-d', strtotime($data['expired_date']))
        );  

        $hasil = $this->dbTable->SPUpdate(
            'sp_sanksiketerlambatan_updatedescleaveentitlements', 
            $data['project_id'],
            $data['pt_id'],
            $data['employee_id'], 
            $data['periode'], 
            $data['leavegroup'], 
            $data['description'] .' (SanksiKeterlambatanId: '. $data['sanksiketerlambatan_id'].') ', 
            $session->getUser()->getId() 
        );  

        if($hasil){
            $proses = $this->dbTable->SPUpdate(
                        'sp_sanksiketerlambatan_submitprosesemp_update', 
                        $session->getUser()->getId(), 
                        $data['project_id'],
                        $data['pt_id'],
                        $data['sanksiketerlambatan_id'],
                        $data['employee_id']
                    );  
        }

        return $hasil;  
    }

    public function prosesupdate_isproses_sanksiketerlambatan($session, $data) {    
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
                        'sp_sanksiketerlambatan_submitproses_update', 
                        $session->getUser()->getId(), 
                        $data['project_id'],
                        $data['pt_id'],
                        $data['sanksiketerlambatan_id']
                    );  

        return $hasil;  
    }

    public function getLoglist_sanksiketerlambatan(Box_Models_App_HasilRequestRead $r, $session, $data) {
        $hasil = 0;   
        $hasil = $this->dbTable->SPExecute('sp_sanksiketerlambatan_read', 
                                            $data['project_id'],
                                            $data['pt_id'],
                                            $data['periode'], 
                                            $data['periode_month'],
                                            $data['description']);

        return $hasil;
    }

    public function getviewEmployeelist_sanksiketerlambatan(Box_Models_App_HasilRequestRead $r, $session, $data) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_sanksiketerlambatandetail_read', 
                                            $data['sanksiketerlambatan_id']);

        return $hasil;
    }

    public function getviewEmployeelist_isproses_sanksiketerlambatan(Box_Models_App_HasilRequestRead $r, $session, $data) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_sanksiketerlambatandetailproses_read', 
                                            $data['sanksiketerlambatan_id']);

        return $hasil;
    }

    public function cancelproses_sanksiketerlambatan($session, $data) {    
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_sanksiketerlambatan_cancelproses_update', 
            $session->getUser()->getId(), 
            $data['project_id'],
            $data['pt_id'],
            $data['sanksiketerlambatan_id']
        );  
        return $hasil;  
    }

    public function cancelprosesemp_sanksiketerlambatan($session, $data) {    
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_sanksiketerlambatan_cancelprosesemp_update', 
            $session->getUser()->getId(), 
            $data['project_id'],
            $data['pt_id'],
            $data['sanksiketerlambatan_id'],
            $data['employee_id']
        );  
        return $hasil;  
    }

    public function getdetail_sanksiketerlambatan($session, $data) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_sanksiketerlambatan_readdetail', 
                                            $data['project_id'],
                                            $data['pt_id'],
                                            $data['sanksiketerlambatan_id']);

        return $hasil;
    }

    public function proses_sanksiketerlambatan_leaveentitlements(Box_Models_App_Session $ses, $data){    
        $hasil = 0;
        
        $hasil = $this->dbTable->SPExecute('sp_sanksiketerlambatan_leaveentitlements_create', 
                                            $ses->getUser()->getId(),
                                            $data['sanksiketerlambatan_id'],
                                            $data['leaveentitlements_id'],
                                            $data['employee_id'],
                                            $data['periode'],
                                            $data['leavegroup'],
                                            $data['amount_sanksiketerlambatan'],
                                            1,
                                            0);

        return $hasil;
    }

    public function get_sanksiketerlambatan_leaveentitlements_use(Box_Models_App_Session $ses, $data) {
        $hasil = 0;   
        $hasil = $this->dbTable->SPExecute('sp_sanksiketerlambatan_leaveentitlements_use_read', 
                                            $data['sanksiketerlambatan_id'],
                                            $data['employee_id']);

        return $hasil;
    }

    public function check_leaveentitlements_sanksiketerlambatan_id($session, $data) {
        $hasil = 0;   
        $hasil = $this->dbTable->SPExecute('sp_sanksiketerlambatan_leaveentitlements_id_read', 
                                            $data['project_id'],
                                            $data['pt_id'],
                                            $data['employee_id'], 
                                            '', 
                                            '',
                                            $data['leaveentitlements_id'],
                                            1,
                                            9999);
        return $hasil;
    }

    public function prosesupdate_sanksiketerlambatan_leaveentitlements($session, $data) {    
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_sanksiketerlambatan_leaveentitlements_cancel_update', 
            $session->getUser()->getId(), 
            $data['sanksiketerlambatan_id'],
            $data['leaveentitlements_id'],
            $data['periode'],
            $data['employee_id']
        );  
        return $hasil;  
    }
    
    // end added by Michael 2021.07.16 

    // added by wulan 22 10 2021
    public function proses_tukarshift($session, $data) {    
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_tukarshift_proses', 
            $session->getUser()->getId(), 
            $data['tukarshift_id']
        );  
        // var_dump($this->dbTable);
        return $hasil;  
    }
    /*
    public function update_citradream($m,$y,Box_Models_App_Session $ses) {
        $hasil = 0;        
        $hasil = $this->dbTable->SPExecute('sp_update_citradream',
                $ses->getUser()->getId(), 
                $m,
                $y,	
                $ses->getProject()->getId(), 
                $ses->getPt()->getId()
                );
       
        return $hasil;        
    }*/

    //added by anas 18112021
    public function updateextraleave($m,$y,Box_Models_App_Session $ses) {
        $hasil = 0;        
        $hasil = $this->dbTable->SPExecute('sp_kompensasi_extraleave_create',
                $ses->getUser()->getId(), 
                $m,
                $y, 
                $ses->getProject()->getId(), 
                $ses->getPt()->getId()
                );
        return $hasil;      
    }
    
    //added by anas 21122021
    public function getdataReportharianmhlRekap($param) {    
        if($param['department']=='ALL'){
            $param['department_id'] =0;
        } 
   
        if (isset($param['employee_id'])) {
            if($param['employee_id'] > 0){
                $param['employee_id'] = $param['employee_id'];
            }else{
                $param['employee_id'] = 0;
            } 
        } else {
           $param['employee_id'] = 0;            
        }

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_report_absent_dailyb_rekap', 
                                            $param['project_project_id'],
                                            $param['pt_pt_id'],
                                            $param['employee_id'],
                                            $param['department_id'],
                                            $param['status_karyawan'],
                                            $param['start_date'],
                                            $param['end_date']
                                           );
        if (!empty($hasil[0])) {
            return $hasil[0];
        } else {
            return false;
        }
    }

    public function getTempAll($session, $post) {
        $hasil = '';

        $hasil = $this->dbTable->SPExecute('sp_temp_all_read', 
            $post['absentdetail_id'], 
            $post['project_id'], 
            $post['pt_id'], 
            $session->getUserId()
        );
        $hasil['message'] = 'Success';

        return $hasil;
    }

    public function getGeneralparametergeteditable($session, $data) {
        $hasil = '';
        $hasil = $this->dbTable->SPExecute('sp_generalparametergeteditable_read', $session->getUserId(), 'absentrecordbylog_editable', $data['absentdetail_id']);
        $hasil['message'] = 'Success';

        return $hasil;
    }

    public function getShiftTime($session, $data) {
        $hasil = '';
        $hasil = $this->dbTable->SPExecute('sp_getshifttime_read', $data['absentdetail_id'], $data['absentdetail_prev_id'], $data['absentdetail_next_id']);
        $hasil['message'] = 'Success';

        return $hasil;
    }

    public function correctionAbsent($session, $data){
        // print_r($data['absentrecorddate']);
        // die();
        $date = explode(" ", $data['absentrecorddate'])[0];
        // $time = explode(" ", $data['absentrecorddate'])[1];
        $d    = explode("/", $date)[0];
        $m    = explode("/", $date)[1];
        $y    = explode("/", $date)[2];
        
        $hasil1 = $this->dbTable->SPExecute('sp_log_absentdetail_create', 
            $session->getUserId(), 
            $data['absentdetail_id'], 
            ($data['timein_type'] == 'in_7_14') ? $data['timein']: NULL,
            ($data['timeout_type'] == 'out_7_14') ? $data['timeout']: NULL,
            ($data['timein_type'] == 'in_15_21') ? $data['timein']: NULL,
            ($data['timeout_type'] == 'out_15_21') ? $data['timeout']: NULL,
            ($data['timein_type'] == 'in_22_06') ? $data['timein']: NULL,
            ($data['timeout_type'] == 'out_22_06') ? $data['timeout']: NULL,
            $data['timein_id'],
            $data['timeout_id'],
            ($data['timein'] != null && $data['timeout'] != null) ? 1: 0,
            $data['reason']
        );

        $hasil2 = $this->dbTable->SPExecute('sp_absentdetail_updateattn_common', $session->getUserId(), $m, $y, $session->getProjectId(), $session->getPtid());

        return ($hasil2 > 0) ? $hasil2: 0;
    }

    public function getLogAbsentdetail($session, $post) {
        $hasil = '';

        $hasil = $this->dbTable->SPExecute('sp_logabsentdetail_read', $session->getUserId(), $post['absentdetail_id'], 1, 25);
        $hasil['message'] = 'Success';

        return $hasil;
    }
    
    public function getPrevNextMonths($session, $data) {
        $hasil = '';
        $hasil = $this->dbTable->SPExecute('sp_absent_prevnext_read', $session->getUserId(), $data['absentdetail_id'], $data['today']);
        $hasil['message'] = 'Success';

        return $hasil;
    }

    public function setTransferAbsent($data){
        $hasil = '';
        $projectId = $data['project_id'];

        $sh = $this->checkSH($projectId);
        $configintranet = $sh['dbintranet_name'];

        $t_absenlog = '';
        $curl_url = '';
        if($configintranet == 'config_sh3a'){
            if ($projectId == 6 || $projectId == 4057){
                $t_absenlog = 't_absenlog_sh3a_mcj';
                $curl_url = 'http://api.ciputragroup.com/proses_absensi/proses_absensi_sh3a_mcj_wum_transfer.php';
            } else if ($projectId == 1002 && $ptId == 4225){
                $t_absenlog = 't_absenlog_sh3a_pkc';
                $curl_url = 'http://api.ciputragroup.com/proses_absensi/proses_absensi_sh3a_pkc_transfer.php';
            } else if (($projectId == 22 && $ptId == 4225) || ($projectId == 2004 && $ptId == 4225) || ($projectId == 22 && $ptId == 12)) {
                $t_absenlog = 't_absenlog_sh3a_cw2';
                $curl_url = 'http://api.ciputragroup.com/proses_absensi/proses_absensi_sh3a_cw2.php';
            } else if (($projectId == 4047 && $ptId == 3165) || ($projectId == 4047 && $ptId == 4225)) {
                $t_absenlog = 't_absenlog_sh3a_ci';
                $curl_url = 'http://api.ciputragroup.com/proses_absensi/proses_absensi_sh3a_ci_transfer.php';
            } else if (($projectId == 4049 && $ptId == 3186) || ($projectId == 4049 && $ptId == 3189) || ($projectId == 4049 && $ptId == 3187) || ($projectId == 4049 && $ptId == 3185) || ($projectId == 4049 && $ptId == 3188)) {
                $t_absenlog = 't_absenlog_sh3a_citradream';
                $curl_url = 'http://api.ciputragroup.com/proses_absensi/proses_absensi_sh3a_citradream_transfer.php';
            } else if (($projectId == 2074 && $ptId == 3166) || ($projectId == 4048 && $ptId == 3178) || ($projectId == 11140 && $ptId == 23465)) {
                $t_absenlog = 't_absenlog_sh3a_cw2';
                $curl_url = 'http://api.ciputragroup.com/proses_absensi/proses_absensi_sh3a_cw2.php';
            } else if ($projectId == 92 && $ptId == 40) {
                $t_absenlog = 't_absenlog_sh3a_hcj';
                $curl_url = 'http://api.ciputragroup.com/proses_absensi/proses_absensi_sh3a_hcj_transfer.php';
            } else if ($projectId == 2012 && $ptId == 2084) {
                $t_absenlog = 't_absenlog_century';
                $curl_url = 'http://api.ciputragroup.com/proses_absensi/proses_absensi_ciputra_transfer.php';
            } else {
                $t_absenlog = 't_absenlog_sh3a';            
                $curl_url = 'http://api.ciputragroup.com/proses_absensi/proses_absensi_sh3a_transfer.php';
            } 
        } else if($configintranet == 'config_sh3b'){
            $t_absenlog = 't_absenlog_sh3b';     
            $curl_url = 'http://api.ciputragroup.com/proses_absensi/proses_absensi_sh3b_transfer.php';
        } else if($configintranet == 'config_sh1a'){
            $t_absenlog = 't_absenlog_citragarden';            
            $curl_url = 'http://api.ciputragroup.com/proses_absensi/proses_absensi_sh1a_transfer.php';
        } else if($configintranet == 'config_kp' && $projectId == 5096 && $ptId == 5232){
            $t_absenlog = 't_absenlog_dummy';            
            // $curl_url = 'http://localhost/apihcmstalenta/hc/read/hospital';
            $curl_url = 'http://api.ciputragroup.com/proses_absensi/proses_absensi_ciputra_transfer.php';
            // $curl_url = 'http://api.ciputragroup.com/proses_absensi/proses_absensi_test.php';
        } else if($configintranet == 'config_art' || $configintranet == 'config_century21'){
            $t_absenlog = 't_absenlog_ciputra';            
            $curl_url = 'http://api.ciputragroup.com/proses_absensi/proses_absensi_ciputra_transfer.php';
        } else{
            $t_absenlog = 't_absenlog_dummy';
            // $curl_url = 'http://api.ciputragroup.com/proses_absensi/proses_absensi_test.php';
            $curl_url = 'http://api.ciputragroup.com/proses_absensi/proses_absensi_ciputra_transfer.php';
        }

        $curl = curl_init();

        curl_setopt_array($curl, array(
          CURLOPT_URL => $curl_url,
          CURLOPT_RETURNTRANSFER => true,
          CURLOPT_ENCODING => '',
          CURLOPT_MAXREDIRS => 10,
          CURLOPT_TIMEOUT => 0,
          CURLOPT_FOLLOWLOCATION => true,
          CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
          CURLOPT_CUSTOMREQUEST => 'POST',
          CURLOPT_POSTFIELDS => '',
          CURLOPT_HTTPHEADER => array(
            'Content-Type: application/json'
          ),
        ));

        $res = curl_exec($curl);

        curl_close($curl);

        $hasil = $this->dbTable->SPExecute('sp_transfer_update', $data['fromDate'], $data['endDate'], $data['project_id'], $data['pt_id'], $t_absenlog);
        $hasil['message'] = 'Success';
        // $hasil['results'] = $res;

        return $hasil;
    }

    //added by anas 15032024 | untuk update losttime sesuai dengan update absent sebelumnya yang doubleclick dan absent inputmanual
    public function updateTime_(Hrd_Models_Master_General_Date $d) {
        $hasil = 0;
        if ($d->getId() == 0) {
            return $hasil;
        }

        $hasil = $this->dbTable->SPUpdate('sp_absentdetail_updatetime', $d->getAddBy(),$d->getId(),$d->getTimeLost());
        return $hasil;
    }
}

?>