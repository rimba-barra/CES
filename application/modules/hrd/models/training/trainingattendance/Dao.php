<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Dao
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Training_Trainingattendance_Dao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {
    public function save(Hrd_Models_Training_Trainingattendance_Trainingattendance $d) {
        $hasil = 0;
        
        if($d->getId()){
            $this->update($d);
        }else{
            $hasil = $this->dbTable->SPUpdate('sp_trainingschedule_create',
                    $d->getAddBy(),
                    $d->getProject()->getId(),
                    $d->getPt()->getId(),
                    $d->getTrainingNameId(),
                    $d->getPeriode(),
                    $d->getBatch(),
                    $d->getStartDate(),
                    $d->getEndDate(),
                    $d->getTimeStart(),
                    $d->getTimeEnd(),
                    $d->getPeserta(),
                    $d->getVenue(),
                    $d->getDescription()
                    ); 

            return $hasil;
        }

    }
    
    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Training_Trainingattendance_Trainingattendance $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_trainingregister_read',
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $d->getTrainingNameId(),
                $d->getPeriode(),
                $r->getPage(), $r->getLimit());
        return $hasil;
    }

    public function gettrainingname(Hrd_Models_Training_Trainingattendance_Trainingattendance $d, $session, $data){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_trainingregister_read',
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $d->getTrainingNameId(),
                $d->getPeriode(),
                1, 99999);
        return $hasil;
    }

    public function getgeneratedate(Hrd_Models_Training_Trainingschedule_Trainingschedule $d, Box_Models_App_HasilRequestRead $r, $session, $data){

        // $hasil = 0;
        // if($data['trainingschedule_id'] == '0'){
        //     $hasil = $this->dbTable->SPUpdate('sp_trainingschedule_create',
        //         $session->getUserId(),
        //         $session->getProject()->getId(),
        //         $session->getPt()->getId(),
        //         $data['trainingname_id'],
        //         $data['periode'],
        //         $data['batch'],
        //         $data['startdate'],
        //         $data['enddate'],
        //         $data['timestart'],
        //         $data['timeend'],
        //         $data['peserta'],
        //         $data['venue'],
        //         $data['description']
        //         ); 
        // }else{
            
        //     $hasil = $this->dbTable->SPUpdate('sp_trainingschedule_update', 
        //         $session->getUserId(),
        //         $data['trainingschedule_id'],
        //         $data['trainingname_id'],
        //         $data['periode'],
        //         $data['batch'],
        //         $data['startdate'],
        //         $data['enddate'],
        //         $data['timestart'],
        //         $data['timeend'],
        //         $data['peserta'],
        //         $data['venue'],
        //         $data['description']
        //     );
        // }

        // if($hasil > 0){

            $hasil = $data['trainingschedule_id'];
            
            $date_already = $this->dbTable->SPExecute('sp_trainingschedulegeneratedate_read',
                            $session->getProject()->getId(),
                            $session->getPt()->getId(),
                            $hasil
                            );
            
            if($date_already[0][0]['totalRow'] > 0){
                $date_input = $this->dbTable->SPUpdate('sp_trainingschedulegeneratedate_update',
                    $session->getUserId(),
                    $hasil
                );
            }

            $date_input = $this->dbTable->SPUpdate('sp_trainingscheduleganeratedate_create',
                        $session->getUserId(),
                        $session->getProject()->getId(),
                        $session->getPt()->getId(),
                        $hasil,
                        $data['startdate'],
                        $data['enddate'],
                        '');
        // }

        return $date_input;
    }
    
    public function getalldate(Hrd_Models_Training_Trainingattendance_Trainingattendance $d, $session, $data){

        $hasil = 0;

        $hasil = $this->dbTable->SPExecute('sp_trainingattendancedate_readintranet',
                                            $data['trainingattendance_id'],
                                            1,
                                            99999
                            );
        
        return $hasil;
    }

    public function getAllDatefromSchedule(Hrd_Models_Training_Trainingattendance_Trainingattendance $d, $session, $data){

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_trainingschedulegeneratedate_readdetail',
                                            $data['trainingschedule_id'],
                                            1,
                                            99999
                            );

        return $hasil;
    }

    public function getallfile(Hrd_Models_Training_Trainingattendance_Trainingattendance $d, $session, $data){

        $hasil = 0;

        $hasil = $this->dbTable->SPExecute('sp_trainingattendancefile_readintranet',
                                            $data['trainingattendance_id'],
                                            1,
                                            99999
                            );
        
        return $hasil;
    }
    // public function getdate(Hrd_Models_Training_Trainingschedule_Trainingschedule $d, Box_Models_App_HasilRequestRead $r, $session, $data, $trainingschedule_id){

    //     $hasil = 0;
    //     $hasil = $this->dbTable->SPExecute('sp_trainingschedulegeneratedate_readdetail',
    //                                         $trainingschedule_id,
    //                                         1,
    //                                         99999
    //                         );

    //     return $hasil;
    // }

    public function delDate($ids,Box_Models_App_Session $ses,$trainingScheduleId) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_trainingschedulegeneratedate_destroy',$ses->getUser()->getId(),$ids,$trainingScheduleId);  
        
        return $hasil;
    }

    public function getAllTrainingNameKP(Hrd_Models_Training_Trainingschedule_Trainingschedule $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_trainingname_read',
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                '',
                '',                
                '',
                '',
                '',
                '',
                1,99999);
        return $hasil;
    }

    public function getAllSchedule(Hrd_Models_Training_Trainingattendance_Trainingattendance $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_trainingschedule_read',
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                '',
                '',1,99999);
        return $hasil;
    }

    public function getDetailSchedule(Hrd_Models_Training_Trainingattendance_Trainingattendance $d, $data){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_trainingschedule_readdetail',
                $data['trainingschedule_id'],
                '');
        return $hasil;
    }

    public function getDetailScheduleRegisterEmp(Hrd_Models_Training_Trainingattendance_Trainingattendance $d, $data){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_trainingattendancegenerateemployee_readdetail',
                $data['trainingschedule_id'],
                1,99999);

        return $hasil;
    }

    public function getEmployeeforClose(Hrd_Models_Training_Trainingattendance_Trainingattendance $d, $data){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_trainingattendanceempforclose_read',
                $data['trainingschedule_id'],
                1,99999);
        
        return $hasil;
    }

    public function getDetailEmp(Hrd_Models_Training_Trainingattendance_Trainingattendance $d, $data, $ses){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_employeedetail_read',
                $data['employee_id'], $ses->getUser()->getId());
        return $hasil;
    }

    public function getDetailAttribut(Hrd_Models_Training_Trainingattendance_Trainingattendance $d, $session, $data){
        $hasil = 0;
        if($data['trainingattendance_id']){
            $hasil = $this->dbTable->SPExecute('sp_trainingattendanceemployee_readattribut',
                    $data['trainingattendance_id'],
                    $data['employee_id']);
        }
        
        return $hasil;
    }

    public function getDetailAttach(Hrd_Models_Training_Trainingattendance_Trainingattendance $d, $session, $data){
        $hasil = 0;
        if($data['trainingattendance_id']){
            $hasil = $this->dbTable->SPExecute('sp_trainingattendancefile_read',
                    $d->getProject()->getId(),
                    $d->getPt()->getId(),
                    $data['trainingattendance_id'],
                    $data['employee_id'],1,9999);
        }
        
        return $hasil;
    }

    public function getDetailDate(Hrd_Models_Training_Trainingattendance_Trainingattendance $d, $session, $data){
        $hasil = 0;
        if($data['trainingattendance_id']){
            $hasil = $this->dbTable->SPExecute('sp_trainingattendancedate_read',
                    $d->getProject()->getId(),
                    $d->getPt()->getId(),
                    $data['trainingattendance_id'],
                    $data['employee_id'],1,9999);
        }
        
        return $hasil;
    }

    public function getDetailDateSchedule(Hrd_Models_Training_Trainingattendance_Trainingattendance $d, $session, $data){
        $hasil = 0;
        if($data['trainingschedule_id']){
            $hasil = $this->dbTable->SPExecute('sp_trainingschedulegeneratedate_readdetail',
                    $data['trainingschedule_id'],
                    1,9999);
        }
        
        return $hasil;
    }

    public function getDetailEmpBudget(Hrd_Models_Training_Trainingattendance_Trainingattendance $d, $data){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_trainingempbudget_read',
                $data['employee_id'],
                $data['choose_periode']);
        
        return $hasil;
    }

    public function getBudgetType(Hrd_Models_Training_Trainingattendance_Trainingattendance $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_trainingcaption_read',
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                '',
                '',1,99999);
        
        return $hasil;
    }

    public function getBudgetTypeSelection(Hrd_Models_Training_Trainingattendance_Trainingattendance $d, $data){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_trainingbudgetprogram_read',
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $data['periode_budget'],
                $data['trainingcaption_id'],
                '',1,99999);
        
        return $hasil;
    }

    public function getEmpExist(Hrd_Models_Training_Trainingattendance_Trainingattendance $d, $session, $data){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_trainingattendanceemployee_readexist',
                                            $data['trainingschedule_id'],
                                            1,
                                            99999
                            );

        return $hasil;
    }

    public function inputattendance(Hrd_Models_Training_Trainingattendance_Trainingattendance $d, $session, $data){
        print_r($data);die();
    }

    public function saveOnceAttendance(Hrd_Models_Training_Trainingattendance_Trainingattendance $d, $session, $data){

        $hasil = 0;

        $check = $this->dbTable->SPExecute('sp_trainingattendance_readcheck', 
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $data['trainingregister_id'],
                $data['employee_id'],
                1,
                999
            );

        if(empty($check[1])){
            $hasil = $this->dbTable->SPUpdate('sp_trainingattendance_createemp', 
                    $session->getUserId(),
                    $d->getProject()->getId(),
                    $d->getPt()->getId(),
                    $data['trainingregister_id'],
                    $data['employee_id'],
                    $data['testimonial'],
                    $data['nilai'],
                    $data['nilai_post'],
                    '0',
                    '1',
                    '1'
            );
        }else{
            $hasil = $this->dbTable->SPUpdate('sp_trainingattendance_updateemp', 
                    $session->getUserId(),
                    $check[1][0]['trainingattendance_id'],
                    $data['trainingregister_id'],
                    $data['employee_id'],
                    $data['testimonial'],
                    $data['nilai'],
                    $data['nilai_post']
            );

        }

        return $hasil;
    }

    public function saveOnceAttendanceDate(Hrd_Models_Training_Trainingattendance_Trainingattendance $d, $session, $data, $attendance_id){

        $hasil = 0;

        $check = $this->dbTable->SPExecute('sp_trainingattendancedate_read', 
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $attendance_id,
                $data['employee_id']
            );
        if(empty($check[0][0])){
            $input = $this->dbTable->SPUpdate('sp_trainingattendancedate_create', 
                    $session->getUserId(),
                    $d->getProject()->getId(),
                    $d->getPt()->getId(),
                    $data['ids'],
                    $attendance_id,
                    $data['employee_id'],
                    // '1'
                    $data['attendance']
            );
        }else{
            $update = $this->dbTable->SPUpdate('sp_trainingattendancedate_update', 
                    $session->getUserId(),
                    $attendance_id,
                    $data['employee_id']
            );
            
            $input = $this->dbTable->SPUpdate('sp_trainingattendancedate_create', 
                    $session->getUserId(),
                    $d->getProject()->getId(),
                    $d->getPt()->getId(),
                    $data['ids'],
                    $attendance_id,
                    $data['employee_id'],
                    // '1'
                    $data['attendance']
            );
        }

        $hasil = $this->dbTable->SPExecute('sp_trainingattendancedate_read', 
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $attendance_id,
                $data['employee_id']
            );
        
        return $hasil;
    }

    public function saveOnceAttendanceFile(Hrd_Models_Training_Trainingattendance_Trainingattendance $d, $session, $data, $attendance_id){

        $hasil = 0;

        $input = $this->dbTable->SPUpdate('sp_trainingattendancefile_create', 
                    $session->getUserId(),
                    $d->getProject()->getId(),
                    $d->getPt()->getId(),
                    $data['file_name'],
                    $attendance_id,
                    $data['employee_id']
            );

        // $check = $this->dbTable->SPExecute('sp_trainingattendancefile_read', 
        //         $d->getProject()->getId(),
        //         $d->getPt()->getId(),
        //         $attendance_id,
        //         $data['employee_id']
        //     );
        // if(empty($check[0][0])){
        //     $input = $this->dbTable->SPUpdate('sp_trainingattendancefile_create', 
        //             $session->getUserId(),
        //             $d->getProject()->getId(),
        //             $d->getPt()->getId(),
        //             $data['file_name'],
        //             $attendance_id,
        //             $data['employee_id']
        //     );
        // }else{
        //     $update = $this->dbTable->SPUpdate('sp_trainingattendancefile_update', 
        //             $session->getUserId(),
        //             $attendance_id,
        //             $data['employee_id']
        //     );
            
        //     $input = $this->dbTable->SPUpdate('sp_trainingattendancefile_create', 
        //             $session->getUserId(),
        //             $d->getProject()->getId(),
        //             $d->getPt()->getId(),
        //             $data['file_name'],
        //             $attendance_id,
        //             $data['employee_id']
        //     );
        // }

        $hasil = $this->dbTable->SPExecute('sp_trainingattendancefile_read', 
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $attendance_id,
                $data['employee_id']
            );
        
        return $hasil;
    }

    public function saveAttendanceFileSchedule(Hrd_Models_Training_Trainingattendance_Trainingattendance $d, $session, $data){

        $hasil = 0;

        $input = $this->dbTable->SPUpdate('sp_trainingattendancefileschedule_create', 
                    $session->getUserId(),
                    $d->getProject()->getId(),
                    $d->getPt()->getId(),
                    $data['file_name'],
                    $data['trainingschedule_id']
            );

        // $check = $this->dbTable->SPExecute('sp_trainingattendancefileschedule_read', 
        //         $d->getProject()->getId(),
        //         $d->getPt()->getId(),
        //         $data['trainingschedule_id']
        //     );
        // if(empty($check[0][0])){
        //     $input = $this->dbTable->SPUpdate('sp_trainingattendancefileschedule_create', 
        //             $session->getUserId(),
        //             $d->getProject()->getId(),
        //             $d->getPt()->getId(),
        //             $data['file_name'],
        //             $data['trainingschedule_id']
        //     );
        // }else{
        //     $update = $this->dbTable->SPUpdate('sp_trainingattendancefileschedule_update', 
        //             $session->getUserId(),
        //             $data['trainingschedule_id']
        //     );
            
        //     $input = $this->dbTable->SPUpdate('sp_trainingattendancefileschedule_create', 
        //             $session->getUserId(),
        //             $d->getProject()->getId(),
        //             $d->getPt()->getId(),
        //             $data['file_name'],
        //             $data['trainingschedule_id']
        //     );
        // }

        $hasil = $this->dbTable->SPExecute('sp_trainingattendancefileschedule_read', 
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $data['trainingschedule_id']
            );
        
        return $hasil;
    }

    public function getScheduleAttachExist(Hrd_Models_Training_Trainingattendance_Trainingattendance $d, $session, $data){

        $hasil = 0;

        $hasil = $this->dbTable->SPExecute('sp_trainingattendancefileschedule_read', 
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $data['trainingschedule_id']
            );
        
        return $hasil;
    }
    

    public function approveIntranet(Hrd_Models_Training_Trainingattendance_Trainingattendance $d, $session, $data){

        $hasil = 0;
        
        $hasil = $this->dbTable->SPUpdate('sp_trainingattendance_updateintranet', 
                $session->getUserId(),
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $data['trainingattendance_id'],
                '1',
                '',
                '1',
                // $data['nilai'],
                // $data['nilai_post']
                '0','0'
            );

        return $hasil;
    }

    public function rejectIntranet(Hrd_Models_Training_Trainingattendance_Trainingattendance $d, $session, $data){

        $hasil = 0;
        
        $hasil = $this->dbTable->SPUpdate('sp_trainingattendance_updateintranet', 
                $session->getUserId(),
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $data['trainingattendance_id'],
                '0',
                $data['hc_reject_comment'],
                '1',
                $data['nilai'],
                $data['nilai_post']
            );

        return $hasil;
    }

    public function closetrainingname(Hrd_Models_Training_Trainingattendance_Trainingattendance $d, $session, $data){

        $hasil = 0;
        
        $explode_employee_budget = '';
        $explode_employee_budget = explode('~', $data['ids_gcb']);
        
        foreach($explode_employee_budget as $key_budget => $item_budget){
            if($item_budget){
                $get_info_emp = $this->dbTable->SPExecute('sp_employee_read_byid', 
                            $item_budget
                );

                $get_info_training = $this->dbTable->SPExecute('sp_trainingbudgetclose_read', 
                                    $data['id_gct']
                                );
                
                $desc = $get_info_training[0][0]['trainingname'].' - Batch '.$get_info_training[0][0]['batch'].' (Periode '.$get_info_training[0][0]['periode'].')';
                $budget_add_minus = '-'.$get_info_training[0][0]['total_cost'];

                $budget = $this->dbTable->SPUpdate('sp_trainingbudgetemployee_updateclose', 
                        $session->getUserId(),
                        $get_info_emp[0][0]['project_id'],
                        $get_info_emp[0][0]['pt_id'],
                        $data['periode'],
                        $get_info_emp[0][0]['employee_id'],
                        $get_info_emp[0][0]['banding_id'],
                        $get_info_emp[0][0]['department_id'],
                        $get_info_emp[0][0]['employeestatus_employeestatus_id'],
                        $budget_add_minus,
                        $desc,
                        2,
                        '',
                        '',
                        $data['id_gct']
                    );
            }
        }

        $explode_employee_star = '';
        $explode_employee_star = explode('~', $data['ids_gcs']);
        
        foreach($explode_employee_star as $key_budget => $item_star){
            if($item_star){
                $get_info_emp = $this->dbTable->SPExecute('sp_employee_read_byid', 
                            $item_star
                );

                
                $get_info_training_competency = $this->dbTable->SPExecute('sp_trainingbudgetclose_readcompetency', 
                                    $data['id_gct']
                                );
                foreach($get_info_training_competency[0] as $key_competency => $item_competency){
                    $competency = $this->dbTable->SPUpdate('sp_trainingstarcompetency_create', 
                        $session->getUserId(),
                        $get_info_emp[0][0]['project_id'],
                        $get_info_emp[0][0]['pt_id'],
                        $data['id_gct'],
                        $get_info_emp[0][0]['employee_id'],
                        $item_competency['competency_name_id']
                    );
                }
            }
        }

        $hasil = $this->dbTable->SPUpdate('sp_trainingattendance_updateclose', 
                $session->getUserId(),
                $data['id_gct']
            );

        return $hasil;
    }

    public function getdataintranet(Hrd_Models_Training_Trainingattendance_Trainingattendance $d, $session, $data){

        $hasil = 0;

        $trainingperiodeapply_id = '';
        $employee_id = '';
        $hc_approve_reject = '';

        if(!empty($data['trainingperiodeapply_id'])){
            $trainingperiodeapply_id = $data['trainingperiodeapply_id'];
        }

        if(!empty($data['employee_id'])){
            $employee_id = $data['employee_id'];
        }

        if(!empty($data['hc_approve_reject'])){
            $hc_approve_reject = $data['hc_approve_reject'];
            if($hc_approve_reject == -1){
                $hc_approve_reject = 0;
            }
            if($hc_approve_reject == 99){
                $hc_approve_reject = -1;
            }
        }

       

        $hasil = $this->dbTable->SPExecute('sp_trainingattendancebrowse_read', 
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $trainingperiodeapply_id,
                $employee_id,
                $hc_approve_reject,
                1,
                9999
            );
        
        return $hasil;
    }

    public function getdetailintranet_attendance(Hrd_Models_Training_Trainingattendance_Trainingattendance $d, $session, $data){

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_trainingattendanceprocess_read', 
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $data['trainingattendance_id'],
                1,
                9999
            );
        
        return $hasil;
    }

    public function getAllCost(Hrd_Models_Training_Trainingattendance_Trainingattendance $d, $session, $data){

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_trainingschedule_allcost_read', 
                $data['trainingschedule_id'],
                1,
                9999
            );
        
        return $hasil;
    }


    public function update(Hrd_Models_Training_Trainingschedule_Trainingschedule $em) {
        $hasil = 0;
        if ($em->getId() == 0) {
            return $hasil;
        }
       
        $hasil = $this->dbTable->SPUpdate('sp_trainingschedule_update', $em->getAddBy(), $em->getId(), 
                $em->getTrainingNameId(),
                $em->getPeriode(),
                $em->getBatch(),
                $em->getStartDate(),
                $em->getEndDate(),
                $em->getTimeStart(),
                $em->getTimeEnd(),
                $em->getPeserta(),
                $em->getVenue(),
                $em->getDescription());
        return $hasil;
    }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_trainingschedule_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }

    public function getEmployeelist(Box_Models_App_HasilRequestRead $r, $session, $data) {
        $obj_setup = new Hrd_Models_General_Setup();
        $hasil = 0;   
        $r->setPage(1);
        $r->setLimit(99999999); 
        $hasil = $this->dbTable->SPExecute('sp_monitoringmatrixemployee_read', $r->getPage(), $r->getLimit(), 
            $session->getProjectId(), $session->getPtId(), $data['project_id'], $data['pt_id'], '', $data['employee_name'], $data['employee_nik'], $data['banding_id'], '',1);
// var_dump($this->dbTable); // ngecek sql server error
// var_dump($hasil); // ngecek sql server error
        return $hasil;
    }

    public function saveheader(Hrd_Models_Training_Trainingschedule_Trainingschedule $d, Box_Models_App_HasilRequestRead $r, $session, $data){

        $hasil = 0;

        if($data['trainingschedule_id'] == '0'){
            
            $hasil = $this->dbTable->SPUpdate('sp_trainingschedule_create',
                $session->getUserId(),
                $session->getProject()->getId(),
                $session->getPt()->getId(),
                $data['trainingname_id'],
                $data['periode'],
                $data['batch'],
                $data['startdate'],
                $data['enddate'],
                $data['timestart'],
                $data['timeend'],
                $data['peserta'],
                $data['venue'],
                $data['description']
                ); 
        }else{
            
            $hasil = $this->dbTable->SPUpdate('sp_trainingschedule_update', 
                $session->getUserId(),
                $data['trainingschedule_id'],
                $data['trainingname_id'],
                $data['periode'],
                $data['batch'],
                $data['startdate'],
                $data['enddate'],
                $data['timestart'],
                $data['timeend'],
                $data['peserta'],
                $data['venue'],
                $data['description']
            );
        }

        return $hasil;
    }

    public function selectemployee($ids,Box_Models_App_Session $ses,$trainingScheduleId) {
        $hasil = 0; 
        
        // $data_already = $this->dbTable->SPExecute('sp_trainingschedulegenerateemployee_read',
        //                     $ses->getProject()->getId(),
        //                     $ses->getPt()->getId(),
        //                     $trainingScheduleId
        //                 );

        // if($data_already > 0){
        //     $data_update = $this->dbTable->SPUpdate('sp_trainingschedulegenerateemployee_update',
        //         $ses->getUser()->getId(),
        //         $trainingScheduleId
        //     );
        // }

        $hasil = $this->dbTable->SPUpdate('sp_trainingschedulegenerateemployee_create',$ses->getUser()->getId(),$ids,$trainingScheduleId); 

        return $hasil;
    }

    public function getemp(Hrd_Models_Training_Trainingschedule_Trainingschedule $d, Box_Models_App_HasilRequestRead $r, $session, $data, $trainingschedule_id){

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_trainingschedulegenerateemployee_readdetail',
                                            $trainingschedule_id,
                                            1,
                                            99999
                            );

        return $hasil;
    }

    public function delemp($ids,Box_Models_App_Session $ses,$trainingScheduleId) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_trainingschedulegenerateemployee_destroy',$ses->getUser()->getId(),$ids,$trainingScheduleId);  
        
        return $hasil;
    }

    public function invitedemp($e_name,$e_email,$e_id,$ids,Box_Models_App_Session $ses,$trainingScheduleId) {
        $obj    = new Hrd_Models_Training_Trainingschedule_Trainingschedule();
        $str_id = $e_id;
        $arr_id =  explode("~", $str_id);
        $employee_id = array();
        foreach($arr_id as $v_id){
            if($v_id){
                $employee_id[] = $v_id;
            }
        }

        $str_name = $e_name;
        $arr_name =  explode("~", $str_name);
        $employee_name = array();
        foreach($arr_name as $v_name){
            if($v_name){
                $employee_name[] = $v_name;
            }
        }

        $str_email = $e_email;
        $arr_email =  explode("~", $str_email);
        $email_ciputra = array();
        foreach($arr_email as $v_email){
            if($v_email){
                $email_ciputra[] = $v_email;
            }
        }

        $detail = $this->dbTable->SPExecute('sp_trainingschedule_readdetail',
                                            $trainingScheduleId,
                                            ''
                            );

        $detail_info = $detail[0][0];

        $detail_date = $this->dbTable->SPExecute('sp_trainingschedulegeneratedate_readdetail',
                                            $trainingScheduleId,
                                            1,
                                            99999
                            );
        $total_date = $detail_date[0][0]['totalRow'];
        krsort($detail_date[1]);
        $date_info = $detail_date[1];
        $body_message = "";
        $sender = 'no.reply@ciputra.com';
        $mail = $obj->get_mail();
        $mail->setData()->setFrom($sender);
        $mail->setData()->setSubject('[HCMS - Training] '.$detail_info['trainingname']);

        foreach($employee_id as $key => $item){
            $to = '';
            $body_message = "Dear Bapak / Ibu ".$employee_name[$key].", ";
            $body_message .= "</br></br>";
            $body_message .= "Anda diundang untuk mengikuti <b>".$detail_info['trainingname']."</b>.";
            $body_message .= "</br>";
            $body_message .= "Periode: <b>".$detail_info['periode']."</b>";
            $body_message .= "</br>";

            if($detail_info['batch']){
                $body_message .= "Batch: <b>".$detail_info['batch']."</b>";
            }

            $body_message .= "</br></br>";
            $body_message .= "<b>".$detail_info['trainingname']."</b> akan berlangsung selama <b>".$total_date." hari</b>. ";
            $body_message .= "</br></br>";

            if($total_date > 1){
                $body_message .= "Pada hari/tanggal sebagai berikut: ";
                $body_message .= "</br>";
            }

            foreach($date_info as $key_date => $item_date){
                $body_message .= "Hari/Tanggal: <b>".date('D, d M Y',strtotime($item_date['trainingscheduledate']))."</b>";
                $body_message .= "</br>";
            }

            $body_message .= "</br>";
            $body_message .= "Acara tersebut akan dimulai dari pukul <b>".date('H:i',strtotime($detail_info['timestart']))." - ".date('H:i',strtotime($detail_info['timeend']))."</b>.";
            $body_message .= "</br>";
            $body_message .= "Acara ini akan berlokasi di <b>".$detail_info['venue']."</b>.";
            $body_message .= "</br>";
            $body_message .= "<b><i>Notes</i>: ".$detail_info['description']."</b>";
            $body_message .= "</br></br>";
            $body_message .= "<b>Harap segera mencatat tanggal tersebut pada Calendar anda, dan pastikan anda datang tepat waktu.</b>";
            $body_message .= "</br></br>";
            $body_message .= "Demikian informasi ini kami sampaikan atas perhatiannya kami ucapkan terima kasih.<br>
                        Regards,<br/>
                        Human Capital Management System";
            $body_message .= "</br></br>";
            $body_message .= "<b><i>*Jangan membalas email ini*</i></b>";
            $body_message .= "</br>";
            $body_message .= "<i>Email informasi ini digenerate otomatis oleh system</i>";
            
            
            $to = $email_ciputra[$key];
            // $to = 'michael@ciputra.com';
            if(!empty($to)){
                $mail->setData()->clearRecipients();
                $mail->setData()->setBodyHtml($body_message);
                $mail->setData()->addTo($to);
                $mail->setData()->send();
            }
            
        }
        
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_trainingschedulegenerateemployee_invited',$ses->getUser()->getId(),$ids,$trainingScheduleId);  
        
        return $hasil;
    }
    
    //added by anas 28042022
    public function deleteAttendanceFile(Hrd_Models_Training_Trainingattendance_Trainingattendance $d, $session, $data){

        $hasil = 0;

        $hasil = $this->dbTable->SPUpdate('sp_trainingattendancefile_delete', 
                    $session->getUserId(),
                    $data['ids']
        );  
        
        return $hasil;
    }

    //added by anas 20062022
    public function getallsurvey(Hrd_Models_Training_Trainingattendance_Trainingattendance $d, $session, $data){

        $hasil = 0;

        $hasil = $this->dbTable->SPExecute('sp_trainingattendancesurvey_readintranet',
                                            $data['trainingattendance_id'],
                                            1,
                                            99999
                            );
        return $hasil;
        // $return['total'] = $hasil[0][0]['totalRow'];
        //         $return['data'] = $hasil[1];
        //         $return['success'] = true;

        // return $return;
    }
}
