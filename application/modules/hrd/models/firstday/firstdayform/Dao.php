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
class Hrd_Models_Firstday_Firstdayform_Dao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {
    public function save(Hrd_Models_Firstday_Firstdayform_Firstdayform $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_firstdayform_create',
                $d->getAddBy(),
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $d->getQuestion(),
                $d->getQuestionActive(),
                $d->getSort()); 
        
        
        return $hasil;
    }
    
    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Firstday_Firstdayform_Firstdayform $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_firstdayform_read',
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $d->getQuestion(),
                $d->getQuestionActive(),
                $r->getPage(), 
                $r->getLimit());

        return $hasil;
    }
    
    public function getAllWoPL(Hrd_Models_Firstday_Firstdayform_Firstdayform $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_firstdayform_read',
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $d->getQuestion(),
                $d->getQuestionActive(),
                1,
                99999);

        return $hasil;
    }

    public function getAllWoPLKP(Hrd_Models_Firstday_Firstdayform_Firstdayform $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_firstdayform_read',
                $d->getProject(),
                $d->getPt(),
                $d->getQuestion(),
                $d->getQuestionActive(),
                1,
                99999);

        return $hasil;
    }

    public function update(Hrd_Models_Firstday_Firstdayform_Firstdayform $em) {
        $hasil = 0;
        if ($em->getId() == 0) {
            return $hasil;
        }
       
        $hasil = $this->dbTable->SPUpdate('sp_firstdayform_update', 
                $em->getAddBy(), 
                $em->getId(), 
                $em->getQuestion(),
                $em->getQuestionActive(),
                $em->getSort());

        return $hasil;
    }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $temp_more = $decan->getString();
        $explode_more = explode('~', $temp_more);

        $allemp = $this->dbTable->SPExecute('sp_firstdayemployee_read',
                $session->getProjectId(),
                $session->getPtId(),
                1, 9999);

        $temp_readtrans = '';
        foreach($allemp[1] as $key => $item){
            $readtrans = $this->dbTable->SPExecute('sp_firstdayemployee_readdetail', 
                            $session->getProjectId(),
                            $session->getPtId(),
                            $item['employee_id'],
                            1,25
            );
            if($readtrans[0][0]['totalRow'] > 0){
                $temp_readtrans[] = $readtrans[1];
            }
        }

        foreach($explode_more as $key_more => $item_more){
            $count_used = 0;
            if(count($temp_readtrans) > 0 && $temp_readtrans){
                foreach($temp_readtrans as $key_t => $item_t){
                    $data = $item_t[0];
                    $data_answer = $data['firstdayform_answer'];
                    $data_jsondecode = json_decode($data_answer);
                    foreach($data_jsondecode as $key_data => $item_data){
                        if($item_data->firstdayform_id == $item_more){
                            $count_used++;
                        }
                    }
                }
            }

            if($count_used == '0'){
                $row = $this->dbTable->SPUpdate('sp_firstdayform_destroy', $item_more, $session->getUserId());
            }
        }

        return $row;
    }

    public function getAllJustActiveWOPL(Hrd_Models_Firstday_Firstdayform_Firstdayform $em) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_firstdayform_read',
                 $em->getProject()->getId(), 
                 $em->getPt()->getId(), 
                 $em->getQuestion(), 
                 1,
                 1, 
                 99999);

        return $hasil;
    }

    public function getallemployee_transaction(Hrd_Models_Firstday_Firstdayform_Firstdayform $em) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_firstdayform_reademptrans',
                 $em->getProject()->getId(), 
                 $em->getPt()->getId(), 
                 1, 
                 99999);

        $hasil_ques = $this->dbTable->SPExecute('sp_firstdayform_read', 
                        $em->getProject()->getId(),
                        $em->getPt()->getId(),
                        '',
                        1,
                        1,9999
                        );
        $total_ques = $hasil_ques[0][0]['totalRow'];

        $temp_hasil = '';

        $rownum = 0;
        if($hasil[0][0]['totalRow'] > 0){
            foreach($hasil[1] as $key => $item){
                $answer = $item['firstdayform_answer'];
                $answer_decode = json_decode($answer);
                $total_answer = 0;

                foreach($answer_decode as $key_ans => $item_ans){
                    $total_answer++;
                }

                // if($total_ques != $total_answer){
                    $rownum++;
                    $temp_hasil[] = array(
                                        'RowNum'        => $rownum,
                                        'employee_id'   => $item['employee_id'],
                                        'employee_name' => $item['employee_name'],
                                        'project_id'    => $item['project_id'],
                                        'pt_id'         => $item['pt_id']
                                );
                // }
            }
        }
        
        $result[0][0]['totalRow'] = $rownum;
        $result[1] = $temp_hasil;
        $hasil = $result;

        return $hasil;
    }

    public function getemptrans(Hrd_Models_Firstday_Firstdayform_Firstdayform $d, $session, $data, $employee_id){

        $hasil = 0;
        
        $hasil = $this->dbTable->SPExecute('sp_firstdayemployee_readdetail', 
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $employee_id,
                1,25
            );
        
        return $hasil;
    }

    public function updateDetail(Hrd_Models_Firstday_Firstdayform_Firstdayform $d, $session, $data,$jsonString,$employee_id){

        $hasil = 0;

        $hasil = $this->dbTable->SPUpdate('sp_firstdayemployee_update', 
                $session->getUserId(), $d->getId(), 
                $employee_id,
                $jsonString);

        $get_emp = 0;
        $log_res = 0;
        if($hasil){
            $get_emp = $this->dbTable->SPExecute('sp_firstdayemployee_readlastlog',
                    $d->getProject()->getId(),
                    $d->getPt()->getId(),
                    $employee_id);

            if($get_emp){
                $log_res = $this->dbTable->SPUpdate('sp_firstdayemployee_createlog', 
                            $get_emp[0][0]['firstdayform_answer_id'],
                            'UPDATE',
                            $d->getProject()->getId(),
                            $d->getPt()->getId(), 
                            $employee_id,
                            $jsonString,
                            '0',
                            $session->getUserId() 
                        );
            }
        }
        
        return $hasil;
    }

}
