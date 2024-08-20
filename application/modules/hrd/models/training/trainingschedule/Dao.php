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
class Hrd_Models_Training_Trainingschedule_Dao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {
    public function save(Hrd_Models_Training_Trainingschedule_Trainingschedule $d) {
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
                    $d->getBudgetProgramId(),
                    $d->getBatch(),
                    $d->getStartDate(),
                    $d->getEndDate(),
                    $d->getTimeStart(),
                    $d->getTimeEnd(),
                    $d->getPeserta(),
                    $d->getVenue(),
                    $d->getDescription(),
                    $d->getEstimated(),
                    $d->getQuota(),
                    $d->getPublish()
                    ); 

            return $hasil;
        }

    }
    
    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Training_Trainingschedule_Trainingschedule $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_trainingschedule_read',
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
                '',1,99999);
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
                $em->getDescription(),
                $em->getEstimated(),
                $em->getQuota(),
                $em->getPublish());
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

        if($data['publish'] == 'true'){
            $data['publish'] = 1;
        }else{
            $data['publish'] = 0;
        }

        if($data['trainingschedule_id'] == '0' || empty($data['trainingschedule_id']) ){
            $hasil = $this->dbTable->SPUpdate('sp_trainingschedule_create',
                $session->getUserId(),
                $session->getProject()->getId(),
                $session->getPt()->getId(),
                $data['trainingname_id'],
                $data['periode'],
                $data['trainingbudgetprogram_id'],
                $data['batch'],
                $data['startdate'],
                $data['enddate'],
                $data['timestart'],
                $data['timeend'],
                $data['peserta'],
                $data['venue'],
                $data['description'],
                $data['estimated'],
                $data['quota'],
                $data['publish'],
                //added by anas 17062022
                $data['duration']
                ); 
        }else{
            
            $hasil = $this->dbTable->SPUpdate('sp_trainingschedule_update', 
                $session->getUserId(),
                $data['trainingschedule_id'],
                $data['trainingname_id'],
                $data['periode'],
                $data['trainingbudgetprogram_id'],
                $data['batch'],
                $data['startdate'],
                $data['enddate'],
                $data['timestart'],
                $data['timeend'],
                $data['peserta'],
                $data['venue'],
                $data['description'],
                $data['estimated'],
                $data['quota'],
                $data['publish'],
                //added by anas 17062022
                $data['duration']
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

    public function invitedemp($e_name,$e_email,$e_id,$ids,Box_Models_App_Session $ses,$trainingScheduleId,$periode) {

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

            $check = $this->dbTable->SPExecute('sp_trainingscheduleemailemployee_readexist',
                                            $item,
                                            $trainingScheduleId
                            );
            
            if($check[0][0]['totalRow'] == 0){

            
                $uri_front = '';

                //LOCAL / DEV
                // if (!empty($_SERVER['HTTPS']) && ('on' == $_SERVER['HTTPS'])) {
                //     $uri_front = 'https://';
                // } else {
                //     $uri_front = 'http://';
                // }

                // $uri_front .= $_SERVER['HTTP_HOST'].'/email_calendar/send_calendar_invite.php';
                //END DEV
                
                //LIVE
                $uri_front .= "https://intranet.ciputragroup.com/email_calendar/send_calendar_invite.php";
                //END LIVE
                
                $uri = 'employee_id/'.$item.'/employee_name/'.$employee_name[$key].'/email_ciputra/'.$email_ciputra[$key].'/trainingschedule_id/'.$trainingScheduleId;
                $key_value = "1qaz2wsx"; 

                // $encrypted_text = mcrypt_ecb(MCRYPT_DES, $key_value, $uri, MCRYPT_ENCRYPT); 
                // $encrypted_text = base64_encode($encrypted_text);

                //updated by anas 18052022
                $encrypted_text = $this->dec_enc('encrypt', $uri);
                // $encrypted_text = '';
                
                $to = '';
                $body_message = '<html><body>';
                $body_message .= "Dear ".$employee_name[$key].", ";
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
                $body_message .= "</br></br>";
                $body_message .= "<i><b>Notes</b>: ".$detail_info['description']."</i>";
                $body_message .= "</br></br>";
                // $body_message .= "<b>Harap segera mencatat tanggal tersebut pada Calendar anda, dan pastikan anda datang tepat waktu.</b>";
                $body_message .= "<br/><i><b>Silahkan klik tombol dibawah ini untuk konfirmasi kedatangan anda, dan Calendar Office anda akan ter-block otomatis.</b></i><br/><br/>";
                $body_message .= "<div style='display: inline-block;'>
                                    <a style='border: 1px solid #000; padding: 5px 15px; width: 60px; margin-right: 25px; background: #e1e1e1;' href='$uri_front/$encrypted_text'><em>Click for Confirmation</em></a>
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
                
                $to = $email_ciputra[$key];

                if(!empty($to)){
                    // $sender = 'no.reply@ciputra.com';
                    // $mail = $obj->get_mail();
                    // $mail->setData()->setFrom($sender);
                    // $mail->setData()->setSubject('[HCMS - Training] '.$detail_info['trainingname']);
                    $mail->setData()->clearRecipients();
                    $mail->setData()->setBodyHtml($body_message);
                    $mail->setData()->addTo($to);
                    $mail->setData()->send();
                }
            }
        }
        
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_trainingschedulegenerateemployee_invited',$ses->getUser()->getId(),$ids,$trainingScheduleId);  
        
        return $hasil;
    }

    //BANDING
     public function getbanding(Hrd_Models_Training_Trainingschedule_Trainingschedule $d, $session, $data){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute(
            'sp_banding_read',
            1,
            9999,
            '',
            ''
            );
        return $hasil;
    }
    
    public function processbandingtrainingschedule(Hrd_Models_Training_Trainingschedule_Trainingschedule $d, Box_Models_App_HasilRequestRead $r, $session, $data) {
        $hasil = 0;

        $trainingschedule_id = $data['trainingschedule_id'];

        if($trainingschedule_id == 0){
            $save = $this->saveheader($d,$r,$session,$data);
            $trainingschedule_id = $save;
        }


        $ex_ban = explode('~', $data['banding_id']);
        foreach($ex_ban as $key => $item){
        $same = '';
            if($item){
                $get_detail = $this->dbTable->SPExecute('sp_trainingschedule_bandingexist_read',
                              $trainingschedule_id);

                if($get_detail[0]){
                    foreach($get_detail[0] as $key_detail => $item_detail){
                        if($item_detail['banding_id'] == $item){
                            $same=$item_detail['banding_id'];
                        }
                    }
                }

                if($same){
                    $hasil = $trainingschedule_id;
                }else{
                    $hasil = $this->dbTable->SPUpdate('sp_trainingschedule_banding_create',
                                $trainingschedule_id,
                                $item);
                }
                        
            }
        }
        if($hasil){
            $hasil = $trainingschedule_id;
        }
        
        return $hasil;
    }

    public function processdeletebandingtrainingschedule(Hrd_Models_Training_Trainingschedule_Trainingschedule $d, $session, $data){
        $hasil = 0;
        $trainingschedule_id = $data['trainingschedule_id'];
        $ex_com = explode('~', $data['banding_id']);
        foreach($ex_com as $key => $item){
            $hasil = $this->dbTable->SPUpdate(
                        'sp_trainingschedulebanding_update', 
                        $trainingschedule_id,
                        $item
                    );
        }

        return $hasil;
    }

    public function getbandingexist(Hrd_Models_Training_Trainingschedule_Trainingschedule $d, $session, $data){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute(
                    'sp_trainingschedulebanding_readexist', 
                    $data['trainingschedule_id']
                );
        
        return $hasil;
    }

    //SHARE PROJECT PT

    public function gettrainingschedule(Hrd_Models_Training_Trainingschedule_Trainingschedule $d, $session, $data){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_trainingschedule_read',
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $d->getTrainingNameId(),
                $d->getPeriode(),1,99999);
        return $hasil;
    }

    public function sharetrainingname(Hrd_Models_Training_Trainingname_Trainingname $d, $session, $data) {
        $hasil = 0;
        
        $ex_tn = explode('~', $data['trainingname_id']);
        $ex_pp = explode('~', $data['projectpt_id']);
        $ex_pr = explode('~', $data['project_id']);
        $ex_pt = explode('~', $data['pt_id']);

        end($ex_pp);
        $last_key_projectpt = key($ex_pp);
        
        foreach($ex_tn as $key_tn => $item_tn){
            if($item_tn){
                $get_detail = $this->dbTable->SPExecute('sp_trainingname_readdetail',
                              $item_tn);

                if($get_detail[0][0]){

                    for ($i=0; $i <= $last_key_projectpt; $i++) { 
                        
                        if(!empty($ex_pr[$i])){

                            $hasil = $this->dbTable->SPUpdate('sp_trainingname_createcopy',
                                    $session->getUserId(),
                                    $ex_pr[$i],
                                    $ex_pt[$i],
                                    $get_detail[0][0]['trainingname'],
                                    $get_detail[0][0]['vendor'],
                                    $get_detail[0][0]['skill'],
                                    $get_detail[0][0]['type'],
                                    $get_detail[0][0]['certificate'],
                                    $get_detail[0][0]['trainingcaption_id'],
                                    $get_detail[0][0]['trainingname_id']
                                    
                                    ); 

                            $get_detail_competency = $this->dbTable->SPExecute('sp_trainingname_competencyexist_read',
                                                                                $get_detail[0][0]['trainingname_id']);
                            
                            foreach($get_detail_competency[0] as $key_detail => $item_detail){
                                if($item_detail['competency_name_id']){
                                    $input_competencycopy = $this->dbTable->SPUpdate('sp_trainingname_competency_create',
                                                            $hasil,
                                                            $item_detail['competency_name_id']);
                                }
                            }
                            $hasiltrainingname_id = $this->sharetrainingschedule($hasil,$item_tn,$session,$data,$ex_pr[$i],$ex_pt[$i]);
                        }
                    }
                }
                
            }
        }
        
        return $hasil;
    }

    public function sharetrainingschedule($trainingname_id,$trainingname_id_source, $session, $data, $project_id, $pt_id) {
        $hasil = 0;
        
        $ex_tn = explode('~', $data['trainingschedule_id']);
        $ex_pp = explode('~', $data['projectpt_id']);
        $ex_pr = explode('~', $data['project_id']);
        $ex_pt = explode('~', $data['pt_id']);

        end($ex_pp);
        $last_key_projectpt = key($ex_pp);
        
        foreach($ex_tn as $key_tn => $item_tn){
            if($item_tn){
                $get_detail = $this->dbTable->SPExecute('sp_trainingschedule_readdetail',
                              $item_tn,
                              '');
                if($get_detail[0][0] && $trainingname_id_source == $get_detail[0][0]['trainingname_id']){
                    
                    // for ($i=0; $i <= $last_key_projectpt; $i++) { 
                        
                        if(!empty($project_id)){
                            $hasil = $this->dbTable->SPUpdate('sp_trainingschedule_createcopy',
                                        $session->getUserId(),
                                        $project_id,
                                        $pt_id,
                                        $trainingname_id,
                                        $get_detail[0][0]['periode'],
                                        $get_detail[0][0]['trainingbudgetprogram_id'],
                                        $get_detail[0][0]['batch'],
                                        $get_detail[0][0]['startdate'],
                                        $get_detail[0][0]['enddate'],
                                        $get_detail[0][0]['timestart'],
                                        $get_detail[0][0]['timeend'],
                                        $get_detail[0][0]['peserta'],
                                        $get_detail[0][0]['venue'],
                                        $get_detail[0][0]['description'],
                                        $get_detail[0][0]['estimated'],
                                        $get_detail[0][0]['trainingschedule_id']
                                        ); 

                            $get_detail_banding = $this->dbTable->SPExecute('sp_trainingschedulebanding_readexist',
                                                                                $get_detail[0][0]['trainingschedule_id']);
                            foreach($get_detail_banding[1] as $key_detail => $item_detail){
                                if($item_detail['banding_id']){
                                    $input_bandingcopy = $this->dbTable->SPUpdate('sp_trainingschedule_banding_create',
                                                            $hasil,
                                                            $item_detail['banding_id']);
                                }
                            }

                            $get_detail_date = $this->dbTable->SPExecute('sp_trainingschedulegeneratedate_readdetail',
                                                                                $get_detail[0][0]['trainingschedule_id'],
                                                                                1,
                                                                                99999);
                            
                            foreach($get_detail_date[1] as $key_detail => $item_detail){
                                if($item_detail['trainingscheduledate']){
                                    $input_datecopy = $this->dbTable->SPUpdate('sp_trainingscheduleganeratedate_create',
                                                            $session->getUserId(),
                                                            $project_id,
                                                            $pt_id,
                                                            $hasil,
                                                            $get_detail[0][0]['startdate'],
                                                            $get_detail[0][0]['enddate'],
                                                            '');
                                }
                            }
                        }
                    // }
                }
                
            }
        }
        
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
