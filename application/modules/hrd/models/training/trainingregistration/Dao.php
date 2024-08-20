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
class Hrd_Models_Training_Trainingregistration_Dao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {
    public function save(Hrd_Models_Training_Trainingregistration_Trainingregistration $d) {
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
    
    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Training_Trainingregistration_Trainingregistration $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_trainingregister_read',
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $d->getTrainingNameId(),
                $d->getPeriode(),
                $r->getPage(), $r->getLimit());
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

    public function getdate(Hrd_Models_Training_Trainingschedule_Trainingschedule $d, Box_Models_App_HasilRequestRead $r, $session, $data, $trainingschedule_id){

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_trainingschedulegeneratedate_readdetail',
                                            $trainingschedule_id,
                                            1,
                                            99999
                            );

        return $hasil;
    }

    public function delDate($ids,Box_Models_App_Session $ses,$trainingScheduleId) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_trainingschedulegeneratedate_destroy',$ses->getUser()->getId(),$ids,$trainingScheduleId);  
        
        return $hasil;
    }

    public function getAllTrainingNameKP(Hrd_Models_Training_Trainingregistration_Trainingregistration $d){
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

    public function getAllSchedule(Hrd_Models_Training_Trainingregistration_Trainingregistration $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_trainingschedule_read',
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                '',
                '',1,99999);
        return $hasil;
    }

    public function getDetailSchedule(Hrd_Models_Training_Trainingregistration_Trainingregistration $d, $data){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_trainingschedule_readdetail',
                $data['trainingschedule_id'],
                $data['periode']);
        return $hasil;
    }

    public function getDetailScheduleEmp(Hrd_Models_Training_Trainingregistration_Trainingregistration $d, $data){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_trainingschedulegenerateemployee_readdetail',
                $data['trainingschedule_id'],
                1,99999);
        return $hasil;
    }

    public function getDetailEmp(Hrd_Models_Training_Trainingregistration_Trainingregistration $d, $data, $ses){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_employeedetail_read',
                $data['employee_id'], $ses->getUser()->getId());
        return $hasil;
    }

    public function getDetailEmpBudget(Hrd_Models_Training_Trainingregistration_Trainingregistration $d, $data){
        $hasil = 0;
        $array[0][0]['budget'] = 0;
        // $hasil = $this->dbTable->SPExecute('sp_trainingempbudget_read',
        //         $data['employee_id'],
        //         $data['choose_periode']);
        $budget_employee_apply    = $this->dbTable->SPExecute('sp_trainingempbudgetapply_read',
                                    $data['employee_id'],
                                    $data['choose_periode']);

        $sum_budget               = 0;
        $start_budget             = 0;
        $mark_budget_apply        = '';

        if($budget_employee_apply[0]){
          foreach($budget_employee_apply[0] as $key => $item){
            $start_budget        += $item['budget'];
            if($item['budget_from'] == 1){
              $mark_budget_apply      = $item['apply_budget'];
            }
          }
          
          $employee_e             = $this->dbTable->SPExecute('sp_employeedetail_read',
                                    $data['employee_id']);
          
          //BANDING
          if($mark_budget_apply == 1){
            $employee_cost        = $this->dbTable->SPExecute('sp_trainingempbudgetcost_read',
                                    $data['employee_id'],
                                    '',
                                    $data['choose_periode']);
          }
          //DEPARTMENT
          else{
            $employee_cost        = $this->dbTable->SPExecute('sp_trainingempbudgetcost_read',
                                    '',
                                    $employee_e[1][0]['department_id'],
                                    $data['choose_periode']);
          }

          $sum_budget           = $start_budget;
          if($employee_cost[0]){
            foreach($employee_cost[0] as $key => $item){
              $sum_budget        += $item['budget'];
            }
          }
            
          $array[0][0]['budget'] = $sum_budget;
          $hasil = $array;
        
        }
        return $hasil;
    }

    public function getDetailEmpBudgetLockBudget(Hrd_Models_Training_Trainingregistration_Trainingregistration $d, $data, $startcost,$trainingcaption_id){
        $hasil = 0;
        $sum_budget               = 0;
        $start_budget             = $startcost;
        $employee_cost            = $this->dbTable->SPExecute('sp_trainingempbudgetcost_read',
                                    '',
                                    '',
                                    $data['periode']);

        if($employee_cost[0]){
        $sum_budget           = $start_budget;

            foreach($employee_cost[0] as $key => $item){
                if($item['trainingcaption_id'] == $trainingcaption_id){
                    $sum_budget        += $item['budget'];
                }
            }
        $array[0][0]['budget'] = $sum_budget;
        $hasil = $array;
        }
            
        return $hasil;
    }

    public function getBudgetType(Hrd_Models_Training_Trainingregistration_Trainingregistration $d){
        $hasil = 0;
        
        $hasil = $this->dbTable->SPExecute('sp_trainingcaption_read',
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                '',
                '',1,99999);
        
        return $hasil;
    }

    public function getBudgetTypeSelection(Hrd_Models_Training_Trainingregistration_Trainingregistration $d, $data){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_trainingbudgetprogram_read',
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $data['periode_budget'],
                $data['trainingcaption_id'],
                '',1,99999);
        
        return $hasil;
    }

    public function getEmpExist(Hrd_Models_Training_Trainingregistration_Trainingregistration $d, $session, $data){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_trainingregisteremployee_readexist',
                                            $data['trainingschedule_id'],
                                            1,
                                            99999
                            );
        return $hasil;
    }


    public function saveOnceEmp(Hrd_Models_Training_Trainingregistration_Trainingregistration $d, $session, $data){

        $hasil = 0;

        $approve = 0;
        if($data['hc_approve_reject'] == 'true'){
            $approve = 1;
        }
        
        $approve_extra = 0;
        if($data['hc_approve_extra'] == 'true'){
            $approve_extra = 1;
        }

        $gettrainingregister = $this->dbTable->SPExecute('sp_trainingregisterget_read',
                                            $data['trainingschedule_id'],
                                            $data['employee_id']
                            );

        if($gettrainingregister[0][0]){
            $trainingregister_id = $gettrainingregister[0][0]['trainingregister_id'];
            $hasil = $this->dbTable->SPUpdate('sp_trainingregistration_updateintranet', 
                $session->getUserId(),
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $trainingregister_id,
                '1',
                '',
                $approve,
                $approve_extra,
                '1'

            );
        }

        // $hasil = $this->dbTable->SPUpdate('sp_trainingregistration_createemp', 
        //         $session->getUserId(),
        //         $d->getProject()->getId(),
        //         $d->getPt()->getId(),
        //         $data['trainingschedule_id'],
        //         $data['employee_id'],
        //         $data['trainingcost'],
        //         $data['accomodation'],
        //         $data['transport'],
        //         $data['totalcost'],
        //         $data['periode_budget'],
        //         $data['balance_budget_employee'],
        //         $data['extra_budget'],
        //         $approve,
        //         $approve_extra,
        //         '1'

        //     );

        return $hasil;
    }

    public function approveIntranet(Hrd_Models_Training_Trainingregistration_Trainingregistration $d, $session, $data){

        $hasil = 0;
        $approve = 0;
        $approve_extra = 0;
        // if($data['hc_approve_reject'] == 'true'){
        //     $approve = 1;
        // }
        
        // if($data['hc_approve_extra'] == 'true'){
        //     $approve_extra = 1;
        // }

        $hasil = $this->dbTable->SPUpdate('sp_trainingregistration_updateintranet', 
                $session->getUserId(),
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $data['trainingregister_id'],
                '1',
                '',
                $approve,
                $approve_extra,
                '1'
            );

        return $hasil;
    }

    public function rejectIntranet(Hrd_Models_Training_Trainingregistration_Trainingregistration $d, $session, $data){

        $hasil = 0;
        
        $hasil = $this->dbTable->SPUpdate('sp_trainingregistration_updateintranet', 
                $session->getUserId(),
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $data['trainingregister_id'],
                '0',
                $data['hc_reject_comment'],
                '0',
                '0',
                '1'
            );

        return $hasil;
    }

    public function getdataintranet(Hrd_Models_Training_Trainingregistration_Trainingregistration $d, $session, $data){

        $hasil = 0;

        $trainingperiodeapply_id = '';
        $employee_id = '';
        $hc_approve_reject = '';
        $tidak_sesuai_budget = '';

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

        if(!empty($data['tidak_sesuai_budget'])){
            $tidak_sesuai_budget = $data['tidak_sesuai_budget'];
            if($tidak_sesuai_budget == -1){
                $tidak_sesuai_budget = 0;
            }
            if($tidak_sesuai_budget == 99){
                $tidak_sesuai_budget = -1;
            }
        }

        $hasil = $this->dbTable->SPExecute('sp_trainingregistrationbrowse_read', 
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $trainingperiodeapply_id,
                $employee_id,
                $hc_approve_reject,
                $tidak_sesuai_budget,
                1,
                9999
            );
        
        return $hasil;
    }  

    public function getcompetencyexist(Hrd_Models_Training_Trainingregistration_Trainingregistration $d, $session, $data){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute(
                    'sp_trainingregistration_intranetcompetency_readexist', 
                    $data['trainingregister_id']
                );
        return $hasil;
    }

    public function getdetailintranet(Hrd_Models_Training_Trainingregistration_Trainingregistration $d, $session, $data){

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_trainingregistrationprocess_read', 
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $data['trainingregister_id'],
                1,
                1
            );
        return $hasil;
    }

    public function update(Hrd_Models_Training_Trainingregistration_Trainingregistration $em) {
        $hasil = 0;

        $check = $this->dbTable->SPExecute('sp_trainingschedulecost_read', 
                $em->getId()
            );
        $data = $check[0][0];
        if($data){
            $hasil = $this->savecost($em, '', $data);
        }else{
            $hasil = 1;
        }
        
        // if ($em->getId() == 0) {
        //     return $hasil;
        // }
       
        // $hasil = $this->dbTable->SPUpdate('sp_trainingschedule_update', $em->getAddBy(), $em->getId(), 
        //         $em->getTrainingNameId(),
        //         $em->getPeriode(),
        //         $em->getBatch(),
        //         $em->getStartDate(),
        //         $em->getEndDate(),
        //         $em->getTimeStart(),
        //         $em->getTimeEnd(),
        //         $em->getPeserta(),
        //         $em->getVenue(),
        //         $em->getDescription());

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

    public function savecost(Hrd_Models_Training_Trainingregistration_Trainingregistration $d, $session, $data){

        $hasil = 0;
        $check = $this->dbTable->SPExecute('sp_trainingschedulecost_read', 
                $data['trainingschedule_id']
            );
        if(empty($check[0])){
            $hasil = $this->dbTable->SPUpdate('sp_trainingschedulecost_create',
                        $data['trainingschedule_id'],
                        $data['training_cost'],
                        $data['accomodation'],
                        $data['transport'],
                        $data['total_cost']
                        ); 
        }else{
            $hasil = $this->dbTable->SPUpdate('sp_trainingschedulecost_update',
                        $data['trainingschedule_id'],
                        $data['training_cost'],
                        $data['accomodation'],
                        $data['transport'],
                        $data['total_cost']
                        ); 
        }
        
        return $hasil;
    }

    public function getcost_exist(Hrd_Models_Training_Trainingregistration_Trainingregistration $d, $session, $data){

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_trainingschedulecost_read', 
                $data['trainingschedule_id']
            );
        
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

    //added by anas 180520222
    public function sendInvitation(Hrd_Models_Training_Trainingregistration_Trainingregistration $d, $data) {
        $obj    = new Hrd_Models_Training_Trainingschedule_Trainingschedule();
        // $str_id = $e_id;
        // $arr_id =  explode("~", $str_id);
        // $employee_id = array();
        // foreach($arr_id as $v_id){
        //     if($v_id){
        //         $employee_id[] = $v_id;
        //     }
        // }

        // $str_name = $e_name;
        // $arr_name =  explode("~", $str_name);
        // $employee_name = array();
        // foreach($arr_name as $v_name){
        //     if($v_name){
        //         $employee_name[] = $v_name;
        //     }
        // }

        // $str_email = $e_email;
        // $arr_email =  explode("~", $str_email);
        // $email_ciputra = array();
        // foreach($arr_email as $v_email){
        //     if($v_email){
        //         $email_ciputra[] = $v_email;
        //     }
        // }

        $hasil = 0;

        $detail = $this->dbTable->SPExecute('sp_trainingschedule_readdetail',
                                            $data['trainingschedule_id'],
                                            ''
                            );

        $detail_info = $detail[0][0];

        $detail_date = $this->dbTable->SPExecute('sp_trainingschedulegeneratedate_readdetail',
                                            $data['trainingschedule_id'],
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
        
        // foreach($employee_id as $key => $item){

        // $check = $this->dbTable->SPExecute('sp_trainingscheduleemailemployee_readexist',
        //                                     $item,
        //                                     $trainingScheduleId
        //                     );

        $detail_regis = $this->dbTable->SPExecute('sp_trainingregistrationprocess_read',
                                            $d->getProject()->getId(),
                                            $d->getPt()->getId(),
                                            $data['trainingregister_id'],
                                            1, 9999
                            );

        if($detail_regis[0][0]['totalRow'] > 0){
            
            $uri_front = '';

            //LOCAL / DEV
            // if (!empty($_SERVER['HTTPS']) && ('on' == $_SERVER['HTTPS'])) {
            //     $uri_front = 'https://';
            // } else {
            //     $uri_front = 'http://';
            // }

            // $uri_front .= $_SERVER['HTTP_HOST'].'/email_calendar/send_calendar_register.php';
            //END DEV
            
            //LIVE
            $uri_front .= "https://intranet.ciputragroup.com/email_calendar/send_calendar_register.php";
            //END LIVE

            $uri = 'employee_id/'.$detail_regis[1][0]['employee_id'].'/employee_name/'.$detail_regis[1][0]['employee_name'].'/email_ciputra/'.$detail_regis[1][0]['email_ciputra'].'/trainingschedule_id/'.$data['trainingschedule_id'];
            $key_value = "1qaz2wsx"; 

            // $encrypted_text = mcrypt_ecb(MCRYPT_DES, $key_value, $uri, MCRYPT_ENCRYPT); 
            // $encrypted_text = base64_encode($encrypted_text);

            $encrypted_text = $this->dec_enc('encrypt', $uri);
            // $encrypted_text = '';
            
            $to = '';
            $body_message = '<html><body>';
            $body_message .= "Dear Bapak / Ibu ".$detail_regis[1][0]['employee_name'].", ";
            $body_message .= "</br></br>";
            $body_message .= "Anda akan mengikuti <b>".$detail_info['trainingname']."</b>.";
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
            $body_message .= "</br></br>";
            $body_message .= "<i><b>Notes</b>: ".$detail_info['description']."</i>";
            $body_message .= "</br></br>";
            // $body_message .= "<b>Harap segera mencatat tanggal tersebut pada Calendar anda, dan pastikan anda datang tepat waktu.</b>";
            $body_message .= "<br/><i><b>Silahkan klik tombol dibawah ini untuk menambahkan event pada Calendar Office anda.</b></i><br/><br/>";
            $body_message .= "<div style='display: inline-block;'>
                                <a style='border: 1px solid #000; padding: 5px 15px; width: 60px; margin-right: 25px; background: #e1e1e1;' href='$uri_front/$encrypted_text'><em>Klik untuk catat di kalendar</em></a>
                              </div>";

            $body_message .= "</br></br>";
            $body_message .= "Demikian informasi ini kami sampaikan atas perhatiannya kami ucapkan terima kasih.<br>
                        Regards,<br/>
                        Human Capital Management System";
            $body_message .= "</br></br>";
            $body_message .= "<b><i>*Jangan membalas email ini*</i></b>";
            $body_message .= "</br>";
            $body_message .= "<i>Email informasi ini digenerate otomatis oleh system</i>";
            $body_message .= "</body></html>";   
            
            $to = $detail_regis[1][0]['email_ciputra'];
            // $to = 'anastasia@ciputra.com';

            if(!empty($to)){
                $mail->setData()->clearRecipients();
                $mail->setData()->setBodyHtml($body_message);
                $mail->setData()->addTo($to);
                $mail->setData()->send();
            }
        }
        // }
        
        $hasil = $detail_info;
        // $hasil = $this->dbTable->SPUpdate('sp_trainingschedulegenerateemployee_invited',$ses->getUser()->getId(),$ids,$trainingScheduleId);  
        
        return $hasil;
    }

    //added by anas 18052022
    function dec_enc($action, $string) {
        $output = false;

        $encrypt_method = "AES-256-CBC";
        $secret_key = '2151ae91210a9ae3eaa9bec9fd82ce95b0ecfbc5';
        $secret_iv = 'faa4762cade124d130ba867298f8e22a6e2ce4e4';

        // hash
        $key = hash('sha256', $secret_key);

        // iv - encrypt method AES-256-CBC expects 16 bytes - else you will get a warning
        $iv = substr(hash('sha256', $secret_iv), 0, 16);

        if ($action == 'encrypt') {
            $output = openssl_encrypt($string, $encrypt_method, $key, 0, $iv);
            $output = base64_encode($output);
        } else if ($action == 'decrypt') {
            $output = openssl_decrypt(base64_decode($string), $encrypt_method, $key, 0, $iv);
        }

        return $output;
    }
}
