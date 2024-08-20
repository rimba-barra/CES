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
class Hrd_Models_Firstday_Firstdayemployee_Dao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {
    public function save(Hrd_Models_Firstday_Firstdayemployee_Firstdayemployee $d) {
        $hasil = 0;
        
        
        return $hasil;
    }
    
    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Firstday_Firstdayemployee_Firstdayemployee $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_firstdayemployee_read',
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $r->getPage(), $r->getLimit());

        $hasil_ques = 0;
        $hasil_ques = $this->dbTable->SPExecute('sp_firstdayform_read', 
                        $d->getProject()->getId(),
                        $d->getPt()->getId(),
                        '',
                        1,
                        1,9999
                        );
        $total_ques = $hasil_ques[0][0]['totalRow'];

        $temp_hasil = '';

        foreach($hasil[1] as $key => $item){
            $getemptrans = '';
        
            $getemptrans = $this->dbTable->SPExecute('sp_firstdayemployee_readdetail', 
                            $d->getProject()->getId(),
                            $d->getPt()->getId(),
                            $item['employee_id'],
                            1,25
                );

            if($getemptrans[0][0]['totalRow'] == 0){
                $temp_hasil[] = array(
                                        'RowNum'        => $item['RowNum'],
                                        'employee_id'   => $item['employee_id'],
                                        'employee_name' => $item['employee_name'],
                                        'total_answer'  => 0,
                                        'total_question'=> $total_ques
                                );
            }else{
                $answer = $getemptrans[1][0]['firstdayform_answer'];
                $answer_decode = json_decode($answer);
                $total_answer = 0;
                $total_answer_sudah = 0;
                foreach($answer_decode as $key_ans => $item_ans){
                    $total_answer++;
                    if($item_ans->answer == 1){
                        $total_answer_sudah++;
                    }
                }
                $temp_hasil[] = array(
                                        'RowNum'        => $item['RowNum'],
                                        'employee_id'   => $item['employee_id'],
                                        'employee_name' => $item['employee_name'],
                                        'total_answer'  => $total_answer_sudah,
                                        'total_question'=> $total_answer
                                );
            }

        }
        
        $result[0][0]['totalRow'] = $hasil[0][0]['totalRow'];
        $result[1] = $temp_hasil;
        $hasil = $result;
        
        return $hasil;
    }

    public function getalltrans(Hrd_Models_Firstday_Firstdayemployee_Firstdayemployee $d, $session, $data){

        $hasil = 0;
        
        $hasil = $this->dbTable->SPExecute('sp_firstdayemployee_readdetail', 
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $data['employee_id'],
                1,25
            );
        
        return $hasil;
    }

    public function getallquestion(Hrd_Models_Firstday_Firstdayemployee_Firstdayemployee $d, $session, $data, $im_firstdayform_id){

        $hasil = 0;
        
        $hasil = $this->dbTable->SPExecute('sp_firstdayemployee_readdetailjson', 
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                //'$im_firstdayform_id',
                1,9999
            );
        
        return $hasil;
    }
    
    public function getAllWoPL(Hrd_Models_Firstday_Firstdayemployee_Firstdayemployee $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_firstdayemployee_read',
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                1,99999);
        return $hasil;
    }

    public function update(Hrd_Models_Firstday_Firstdayemployee_Firstdayemployee $em) {
        $hasil = 0;
        if ($em->getId() == 0) {
            return $hasil;
        }

        $hasil = 1;
        // $hasil = $this->dbTable->SPUpdate('sp_trainingcaption_update', $em->getAddBy(), $em->getId(), 
        //         $em->getCaption(),
        //         $em->getLockBudget());
        return $hasil;
    }

    public function updateDetail(Hrd_Models_Firstday_Firstdayemployee_Firstdayemployee $d, $session, $data,$jsonString){

        $hasil = 0;

        $hasil = $this->dbTable->SPUpdate('sp_firstdayemployee_update', 
                $session->getUserId(), $d->getId(), 
                $data['employee_id'],
                $jsonString);

        $get_emp = 0;
        $log_res = 0;
        if($hasil){
            $get_emp = $this->dbTable->SPExecute('sp_firstdayemployee_readlastlog',
                    $d->getProject()->getId(),
                    $d->getPt()->getId(),
                    $data['employee_id']);

            if($get_emp){
                $log_res = $this->dbTable->SPUpdate('sp_firstdayemployee_createlog', 
                            $get_emp[0][0]['firstdayform_answer_id'],
                            'UPDATE',
                            $d->getProject()->getId(),
                            $d->getPt()->getId(), 
                            $data['employee_id'],
                            $jsonString,
                            '0',
                            $session->getUserId() 
                        );
            }
        }
        
        return $hasil;
    }

    public function createDetail(Hrd_Models_Firstday_Firstdayemployee_Firstdayemployee $d, $session, $data,$jsonString){

        $hasil = 0;

        $hasil = $this->dbTable->SPUpdate('sp_firstdayemployee_create', 
                $session->getUserId(),
                $d->getProject()->getId(),
                $d->getPt()->getId(), 
                $data['employee_id'],
                $jsonString,
                0
                );

        $get_emp = 0;
        $log_res = 0;
        if($hasil){
            $get_emp = $this->dbTable->SPExecute('sp_firstdayemployee_readlastlog',
                    $d->getProject()->getId(),
                    $d->getPt()->getId(),
                    $data['employee_id']);

            if($get_emp){
                $log_res = $this->dbTable->SPUpdate('sp_firstdayemployee_createlog', 
                            $get_emp[0][0]['firstdayform_answer_id'],
                            'CREATE',
                            $d->getProject()->getId(),
                            $d->getPt()->getId(), 
                            $data['employee_id'],
                            $jsonString,
                            '0',
                            $session->getUserId() 
                        );
            }
        }
        
        return $hasil;
    }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        // $row = $this->dbTable->SPUpdate('sp_trainingcaption_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }

    public function getallemployee_transaction(Hrd_Models_Firstday_Firstdayemployee_Firstdayemployee $em) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_firstdayemployee_read',
                 $em->getProject()->getId(), 
                 $em->getPt()->getId(), 
                 1, 
                 99999);

        return $hasil;
    }

    public function getAllWoPLActive(Hrd_Models_Firstday_Firstdayemployee_Firstdayemployee $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_firstdayform_read',
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                '',
                1,
                1,
                99999);

        return $hasil;
    }

    public function getemptrans(Hrd_Models_Firstday_Firstdayemployee_Firstdayemployee $d, $session, $data, $employee_id){

        $hasil = 0;
        
        $hasil = $this->dbTable->SPExecute('sp_firstdayemployee_readdetail', 
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $employee_id,
                1,25
            );
        
        return $hasil;
    }
}
