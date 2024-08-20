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
class Hrd_Models_Training_Trainingbudget_Dao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {
    public function save(Hrd_Models_Training_Trainingbudget_Trainingbudget $d) {
        $hasil = 0;
        
        $hasil = $this->dbTable->SPUpdate('sp_trainingbudget_create',
                $d->getAddBy(),
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $d->getPeriode(),
                $d->getApplyBudget(),
                $d->getEmployeeStatusId(),
                $d->getBandingId(),
                $d->getDepartmentId(),
                $d->getBudget(),
                $d->getTrainingBudgetProgramId()
                ); 
        
        return $hasil;
    }
    
    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Training_Trainingbudget_Trainingbudget $d){
        $hasil = 0;
        
        $hasil = $this->dbTable->SPExecute('sp_trainingbudget_read',
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $d->getPeriode(),
                $d->getApplyBudget(),
                $d->getBandingId(),
                $d->getDepartmentId(),
                $d->getBudget(),
                $r->getPage(), $r->getLimit());
        return $hasil;
    }
    
    public function getAllWoPL(Hrd_Models_Training_Trainingbudget_Trainingbudget $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_trainingbudget_read',
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $d->getPeriode(),
                $d->getApplyBudget(),
                $d->getBandingId(),
                $d->getDepartmentId(),
                $d->getBudget(),
                $d->getBandingId(),1,99999);
        return $hasil;
    }

    public function getAllcompetency(Hrd_Models_Training_Trainingbudget_Trainingbudget $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_trainingbudget_read',
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $d->getPeriode(),
                $d->getApplyBudget(),
                $d->getBandingId(),
                $d->getDepartmentId(),
                $d->getBudget(),
                1,99999);
        return $hasil;
    }

    public function update(Hrd_Models_Training_Trainingbudget_Trainingbudget $em) {
        $hasil = 0;
        if ($em->getId() == 0) {
            return $hasil;
        }

        //buat cek budget sebelumnya
        // $trainbudget_sebelum = 0;

        // $getdata = $this->dbTable->SPExecute('sp_trainingbudget_readchooseid',
        //         $em->getProject()->getId(),
        //         $em->getPt()->getId(),
        //         $em->getId(),1,99999);

        // if($getdata[1])
        // {
        //     $item = $getdata[1][0];
        //     if($item['apply_check'] == 1)
        //     {
        //         $trainbudget_sebelum = $item['budget'];
        //     }
        // }

        if($em->getApplyCheck() == 0) //kalau udh diapply gk bisa diubah
        {       
            $hasil = $this->dbTable->SPUpdate('sp_trainingbudget_update', $em->getAddBy(), $em->getId(), 
                    $em->getPeriode(),
                    $em->getApplyBudget(),
                    $em->getEmployeeStatusId(),
                    $em->getBandingId(),
                    $em->getDepartmentId(),
                    $em->getBudget(),
                    $em->getTrainingBudgetProgramId()
                );

            $update_transaksi = $this->dbTable->SPUpdate('sp_trainingbudgetrecord_updateempsingle',
                                                        $em->getAddBy(),
                                                        $em->getProject()->getId(),
                                                        $em->getPt()->getId(),
                                                        $em->getPeriode(),
                                                        $em->getId()
                                                        );

            $update = $this->dbTable->SPUpdate('sp_trainingbudget_updateapply_update',
                                   $em->getAddBy(),
                                   $em->getId()
                               ); 
        }

        //buat update budget di BUdget Program
        // if($trainbudget_sebelum > 0)
        // {
        //     $get_budgetprogram = $this->dbTable->SPExecute('sp_trainingbudgetprogram_readdetail',
        //                             $em->getProject()->getId(),
        //                             $em->getPt()->getId(),
        //                             $em->getTrainingBudgetProgramId(),1,9999);

        //     if($get_budgetprogram[0][0]['totalRow'] > 0){

        //         $budget_awal = $get_budgetprogram[1][0]['budget'];
        //         $budget_used = $get_budgetprogram[1][0]['budget_used'];

        //         $total_budget_used = $budget_used - $trainbudget_sebelum;
        //         $grand_total = ($budget_awal - $budget_used) + $trainbudget_sebelum;

        //         if($grand_total < 0){
        //             $hasil = 0;
        //         }else{
        //             if($get_budgetprogram[1][0]['modion']){
        //                 $tanggal_awal = date('Y-m-d',strtotime($get_budgetprogram[1][0]['modion']));
        //             }else{
        //                 $tanggal_awal = date('Y-m-d',strtotime($get_budgetprogram[1][0]['addon']));
        //             }

        //             $notes = $get_budgetprogram[1][0]['notes'];
        //             $notes .= 'Budget sebelumnya: '.number_format(($budget_awal - $budget_used),2).' ('.$tanggal_awal.')<br>'.
        //                      'Budget yang dikembalikan: '.number_format($trainbudget_sebelum,2).'<br>'.
        //                      'Budget setelahnya: '.number_format($grand_total,2).' ('.date('Y-m-d').')<br>'.
        //                      '----- <br>';

        //             $update_budgetprogram = $this->dbTable->SPUpdate('sp_trainingbudgetprogram_updateapply', 
        //                 $em->getAddBy(), 
        //                 $em->getTrainingBudgetProgramId(), 
        //                 $total_budget_used,
        //                 $notes
        //             );
        //         }
        //     }
        //  }

        return $hasil;
    }

    public function processapplybudget(Hrd_Models_Training_Trainingbudget_Trainingbudget $d, Box_Models_App_HasilRequestRead $r, $session, $data){

        $hasil = 0;
        $alreadyapply = 0;
        

        $getdata = $this->dbTable->SPExecute('sp_trainingbudget_readchooseperiode',
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $data['choose_periode'],1,99999);
        
        if($getdata[1]){

            // if($data['employeestatusapply_id'] == '99'){
            //     $update_transaksi = $this->dbTable->SPUpdate('sp_trainingbudgetrecord_update',
            //                         $session->getUserId(),
            //                         $d->getProject()->getId(),
            //                         $d->getPt()->getId(),
            //                         $data['choose_periode']
            //                         ); 
            //     foreach($getdata[1] as $key => $item){
                    
            //         $alreadyapply = 0;
            //         if($item['apply_budget'] == 1 && !empty($item['banding_id'])){
            //             $getemp = $this->dbTable->SPExecute('sp_trainingbudget_reademployee',
            //                         $d->getProject()->getId(),
            //                         $d->getPt()->getId(),
            //                         $item['banding_id'],
            //                         '',
            //                         '');
            //             $descemp = 'Generate from Apply Periode by Banding';
            //         }elseif($item['apply_budget'] == 2 && !empty($item['department_id'])){
            //             $getemp = $this->dbTable->SPExecute('sp_trainingbudget_reademployee',
            //                         $d->getProject()->getId(),
            //                         $d->getPt()->getId(),
            //                         '',
            //                         $item['department_id'],
            //                         '');
            //             $descemp = 'Generate from Apply Periode by Department';
            //         }elseif($item['apply_budget'] == 3 && !empty($item['department_id']) && !empty($item['banding_id']) ){
            //             $getemp = $this->dbTable->SPExecute('sp_trainingbudget_reademployee',
            //                         $d->getProject()->getId(),
            //                         $d->getPt()->getId(),
            //                         $item['banding_id'],
            //                         $item['department_id'],
            //                         '');
            //             $descemp = 'Generate from Apply Periode by Banding & Department';
            //         }else{
            //             $getemp = 0;
            //             $descemp = '';
            //         }
                    

            //         if($getemp[0]){

            //             $readapply = $this->dbTable->SPExecute('sp_trainingbudget_readapply',
            //                         $d->getProject()->getId(),
            //                         $d->getPt()->getId(),
            //                         $item['trainingbudget_id']);

            //             $updateapply = $this->dbTable->SPUpdate('sp_trainingbudget_updateapply',
            //                             $session->getUserId(),
            //                             $item['trainingbudget_id']
            //                         );
                        
            //             foreach($getemp[0] as $key_emp => $item_emp){

            //                 $insertemp = $this->dbTable->SPUpdate('sp_trainingbudgetrecord_create',
            //                                 $session->getUserId(),
            //                                 $d->getProject()->getId(),
            //                                 $d->getPt()->getId(),
            //                                 $data['choose_periode'],
            //                                 $item_emp['employee_id'],
            //                                 $item_emp['banding_id'],
            //                                 $item_emp['department_id'],
            //                                 $item_emp['employeestatus_id'],
            //                                 $item['budget'],
            //                                 $descemp,
            //                                 '1',
            //                                 $item['trainingbudget_id'],
            //                                 '',
            //                                 ''
            //                                 ); 
            //             }

            //         }

            //     }
            // }else{
            //     foreach($getdata[1] as $key => $item){
            //         if($item['apply_budget'] == 1 && !empty($item['banding_id'])){
            //             $getemp = $this->dbTable->SPExecute('sp_trainingbudget_reademployee',
            //                         $d->getProject()->getId(),
            //                         $d->getPt()->getId(),
            //                         $item['banding_id'],
            //                         '',
            //                         $item['employeestatus_id']);
            //             $descemp = 'Generate from Apply Periode by Banding';
            //         }elseif($item['apply_budget'] == 2 && !empty($item['department_id'])){
            //             $getemp = $this->dbTable->SPExecute('sp_trainingbudget_reademployee',
            //                     $d->getProject()->getId(),
            //                     $d->getPt()->getId(),
            //                     '',
            //                     $item['department_id'],
            //                     $item['employeestatus_id']);
            //             $descemp = 'Generate from Apply Periode by Department';
            //         }elseif($item['apply_budget'] == 3 && !empty($item['department_id']) && !empty($item['banding_id']) ){
            //             $getemp = $this->dbTable->SPExecute('sp_trainingbudget_reademployee',
            //                         $d->getProject()->getId(),
            //                         $d->getPt()->getId(),
            //                         $item['banding_id'],
            //                         $item['department_id'],
            //                         $item['employeestatus_id']);
            //             $descemp = 'Generate from Apply Periode by Banding & Department';
            //         }else{
            //             $getemp = 0;
            //             $descemp = '';
            //         }
            //         if($getemp[0]){
            //             $readapply = $this->dbTable->SPExecute('sp_trainingbudget_readapply',
            //                     $d->getProject()->getId(),
            //                     $d->getPt()->getId(),
            //                     $item['trainingbudget_id']);

            //             foreach($getemp[0] as $key_emp => $item_emp){
            //                 $update_transaksi = $this->dbTable->SPUpdate('sp_trainingbudgetrecord_updateemp',
            //                                     $session->getUserId(),
            //                                     $d->getProject()->getId(),
            //                                     $d->getPt()->getId(),
            //                                     $data['choose_periode'],
            //                                     $item_emp['employee_id']
            //                                     ); 
            //                 $insertemp = $this->dbTable->SPUpdate('sp_trainingbudgetrecord_create',
            //                             $session->getUserId(),
            //                             $d->getProject()->getId(),
            //                             $d->getPt()->getId(),
            //                             $data['choose_periode'],
            //                             $item_emp['employee_id'],
            //                             $item_emp['banding_id'],
            //                             $item_emp['department_id'],
            //                             $item_emp['employeestatus_id'],
            //                             $item['budget'],
            //                             $descemp,
            //                             '1',
            //                             $item['trainingbudget_id'],
            //                             '',
            //                             ''
            //                             ); 

            //             }
            //             $updateapply = $this->dbTable->SPUpdate('sp_trainingbudget_updateapply',
            //                             $session->getUserId(),
            //                             $item['trainingbudget_id']
            //                         );

            //         }
            //     }
            // }


                foreach($getdata[1] as $key => $item){
                    
                    if($data['employeestatusapply_id'] == '99'){
                        $employeestatus_id = '';
                    }else{
                        $employeestatus_id = $item['employeestatus_id'];
                    }

                    if($item['employeestatus_id'] == $data['employeestatusapply_id']){

                        if($item['apply_budget'] == 1 && !empty($item['banding_id'])){
                            $getemp = $this->dbTable->SPExecute('sp_trainingbudget_reademployee',
                                        $d->getProject()->getId(),
                                        $d->getPt()->getId(),
                                        $item['banding_id'],
                                        '',
                                        $employeestatus_id);
                            $descemp = 'Generate from Apply Periode by Banding';
                        }elseif($item['apply_budget'] == 2 && !empty($item['department_id'])){
                            $getemp = $this->dbTable->SPExecute('sp_trainingbudget_reademployee',
                                    $d->getProject()->getId(),
                                    $d->getPt()->getId(),
                                    '',
                                    $item['department_id'],
                                    $employeestatus_id);
                            $descemp = 'Generate from Apply Periode by Department';
                        }elseif($item['apply_budget'] == 3 && !empty($item['department_id']) && !empty($item['banding_id']) ){
                            $getemp = $this->dbTable->SPExecute('sp_trainingbudget_reademployee',
                                        $d->getProject()->getId(),
                                        $d->getPt()->getId(),
                                        $item['banding_id'],
                                        $item['department_id'],
                                        $employeestatus_id);
                            $descemp = 'Generate from Apply Periode by Banding & Department';
                        }else{
                            $getemp = 0;
                            $descemp = '';
                        }

                        if($getemp[0]){
                            $readapply = $this->dbTable->SPExecute('sp_trainingbudget_readapply',
                                    $d->getProject()->getId(),
                                    $d->getPt()->getId(),
                                    $item['trainingbudget_id']);

                            foreach($getemp[0] as $key_emp => $item_emp){
                                $update_transaksi = $this->dbTable->SPUpdate('sp_trainingbudgetrecord_updateemp',
                                                    $session->getUserId(),
                                                    $d->getProject()->getId(),
                                                    $d->getPt()->getId(),
                                                    $data['choose_periode'],
                                                    $item_emp['employee_id']
                                                    ); 
                                $insertemp = $this->dbTable->SPUpdate('sp_trainingbudgetrecord_create',
                                            $session->getUserId(),
                                            $d->getProject()->getId(),
                                            $d->getPt()->getId(),
                                            $data['choose_periode'],
                                            $item_emp['employee_id'],
                                            $item_emp['banding_id'],
                                            $item_emp['department_id'],
                                            $item_emp['employeestatus_id'],
                                            $item['budget'],
                                            $descemp,
                                            '1',
                                            $item['trainingbudget_id'],
                                            '',
                                            ''
                                            ); 

                            }

                        }
                            $updateapply = $this->dbTable->SPUpdate('sp_trainingbudget_updateapply',
                                            $session->getUserId(),
                                            $item['trainingbudget_id']
                                        );
                    }
                }
            // print_r($getdata[1]);die();
            //tulis budget
            // foreach($getdata[1] as $key => $item){
        
            //     $alreadyapply = 0;
            //     if($item['apply_budget'] == 1 && !empty($item['banding_id'])){
            //         $getemp = $this->dbTable->SPExecute('sp_trainingbudget_reademployee',
            //                     $d->getProject()->getId(),
            //                     $d->getPt()->getId(),
            //                     $item['banding_id'],
            //                     '',
            //                     '');
            //         $descemp = 'Generate from Apply Periode by Banding';
            //     }elseif($item['apply_budget'] == 2 && !empty($item['department_id'])){
            //         $getemp = $this->dbTable->SPExecute('sp_trainingbudget_reademployee',
            //                     $d->getProject()->getId(),
            //                     $d->getPt()->getId(),
            //                     '',
            //                     $item['department_id'],
            //                     '');
            //         $descemp = 'Generate from Apply Periode by Department';
            //     }else{
            //         $getemp = 0;
            //         $descemp = '';
            //     }

            //     if($getemp[0]){

            //         $readapply = $this->dbTable->SPExecute('sp_trainingbudget_readapply',
            //                     $d->getProject()->getId(),
            //                     $d->getPt()->getId(),
            //                     $item['trainingbudget_id']);

            //         $updateapply = $this->dbTable->SPUpdate('sp_trainingbudget_updateapply',
            //                         $session->getUserId(),
            //                         $item['trainingbudget_id']
            //                     );


            //         // if($readapply[0][0]['totalRow'] == 0){
            //         //     $update_transaksi = '';
            //         //     $updateapply = $this->dbTable->SPUpdate('sp_trainingbudget_updateapply',
            //         //                     $session->getUserId(),
            //         //                     $item['trainingbudget_id']
            //         //                 ); 

            //         // }else{
            //         //     $update_transaksi = $this->dbTable->SPUpdate('sp_trainingbudgetrecord_update',
            //         //                     $session->getUserId(),
            //         //                     $d->getProject()->getId(),
            //         //                     $d->getPt()->getId(),
            //         //                     $data['choose_periode']
            //         //                     ); 
            //         //     $updateapply = $this->dbTable->SPUpdate('sp_trainingbudget_updateapply_edit',
            //         //                     $session->getUserId(),
            //         //                     $item['trainingbudget_id']
            //         //                 ); 
            //         // }

            //         foreach($getemp[0] as $key_emp => $item_emp){
                        
                       
            //             $insertemp = $this->dbTable->SPUpdate('sp_trainingbudgetrecord_create',
            //                             $session->getUserId(),
            //                             $d->getProject()->getId(),
            //                             $d->getPt()->getId(),
            //                             $data['choose_periode'],
            //                             $item_emp['employee_id'],
            //                             $item['budget'],
            //                             $descemp,
            //                             '1'
            //                             ); 

                        
            //         }

            //     }

            // }
            
       $hasil = 1;
        }

        return $hasil;
    }

    // public function processapplybudgetv2(Hrd_Models_Training_Trainingbudget_Trainingbudget $d, Box_Models_App_HasilRequestRead $r, $session, $trainingbudget_id){

    //     $hasil = 0;
    //     $alreadyapply = 0;
    //     $total_all_budget = 0;
    //     $total_after_budget = 0;
    //     $grand_total = 0;
        

    //     $getdata = $this->dbTable->SPExecute('sp_trainingbudget_readchooseid',
    //             $d->getProject()->getId(),
    //             $d->getPt()->getId(),
    //             $trainingbudget_id,1,99999);
        
    //     if($getdata[1]){
    //         $item = $getdata[1][0];
    //         //kalau udh di apply gk bisa di apply lagi
    //         if($item['apply_check'] == 0)
    //         {
                
    //             // foreach($getdata[1] as $key => $item){
                    
    //                 if($item['employeestatus_id'] == '99'){
    //                     $employeestatus_id = '';
    //                 }else{
    //                     $employeestatus_id = $item['employeestatus_id'];
    //                 }

    //                 // if($item['employeestatus_id'] == $data['employeestatusapply_id']){

    //                     if($item['apply_budget'] == 1 && !empty($item['banding_id'])){
    //                         $getemp = $this->dbTable->SPExecute('sp_trainingbudget_reademployee',
    //                                     $d->getProject()->getId(),
    //                                     $d->getPt()->getId(),
    //                                     $item['banding_id'],
    //                                     '',
    //                                     $employeestatus_id);
    //                         $descemp = 'Generate from Apply Periode by Banding';
    //                     }elseif($item['apply_budget'] == 2 && !empty($item['department_id'])){
    //                         $getemp = $this->dbTable->SPExecute('sp_trainingbudget_reademployee',
    //                                 $d->getProject()->getId(),
    //                                 $d->getPt()->getId(),
    //                                 '',
    //                                 $item['department_id'],
    //                                 $employeestatus_id);
    //                         $descemp = 'Generate from Apply Periode by Department';
    //                     }elseif($item['apply_budget'] == 3 && !empty($item['department_id']) && !empty($item['banding_id']) ){
    //                         $getemp = $this->dbTable->SPExecute('sp_trainingbudget_reademployee',
    //                                     $d->getProject()->getId(),
    //                                     $d->getPt()->getId(),
    //                                     $item['banding_id'],
    //                                     $item['department_id'],
    //                                     $employeestatus_id);
    //                         $descemp = 'Generate from Apply Periode by Banding & Department';
    //                     }else{
    //                         $getemp = 0;
    //                         $descemp = '';
    //                     }

    //                     if($getemp[0]){
    //                         $readapply = $this->dbTable->SPExecute('sp_trainingbudget_readapply',
    //                                 $d->getProject()->getId(),
    //                                 $d->getPt()->getId(),
    //                                 $item['trainingbudget_id']);

    //                         foreach($getemp[0] as $key_emp => $item_emp){
    //                             $update_transaksi = $this->dbTable->SPUpdate('sp_trainingbudgetrecord_updateemp',
    //                                                 $session->getUserId(),
    //                                                 $d->getProject()->getId(),
    //                                                 $d->getPt()->getId(),
    //                                                 $item['periode'],
    //                                                 $item_emp['employee_id']
    //                                                 ); 
    //                             $insertemp = $this->dbTable->SPUpdate('sp_trainingbudgetrecord_create',
    //                                         $session->getUserId(),
    //                                         $d->getProject()->getId(),
    //                                         $d->getPt()->getId(),
    //                                         $item['periode'],
    //                                         $item_emp['employee_id'],
    //                                         $item_emp['banding_id'],
    //                                         $item_emp['department_id'],
    //                                         $item_emp['employeestatus_id'],
    //                                         $item['budget'],
    //                                         $descemp,
    //                                         '1',
    //                                         $item['trainingbudget_id'],
    //                                         '',
    //                                         ''
    //                                         ); 

    //                         }

    //                     }
    //                 // }
    //             // }
           
    //         $get_budgetprogram = $this->dbTable->SPExecute('sp_trainingbudgetprogram_readdetail',
    //                             $item['project_id'],
    //                             $item['pt_id'],
    //                             $item['trainingbudgetprogram_id'],1,9999);

    //         if($get_budgetprogram[0][0]['totalRow'] > 0){

    //             $budget_awal = $get_budgetprogram[1][0]['budget'];
    //             // $get_allbudget = $this->dbTable->SPExecute('sp_trainingbudget_readall',
    //             //                 $item['project_id'],
    //             //                 $item['pt_id'],
    //             //                 $item['trainingbudgetprogram_id'],1,9999);
    //             $budget_used = $get_budgetprogram[1][0]['budget_used'];
    //             // if($get_allbudget[0][0]['totalRow'] > 0){

    //             //     foreach($get_allbudget[1] as $key_budget => $item_budget){
    //             //         $total_all_budget += $item_budget['budget'];
    //             //     }

    //             //     // $grand_total = $budget_awal - $total_all_budget;
                
    //             // }
    //             // else{

    //             //     $grand_total = $budget_awal;

    //             // }

    //             $total_budget_used = $budget_used + $item['budget'];
    //             $grand_total = $budget_awal - $total_budget_used;


    //             if($grand_total < 0){
    //                 $hasil = 0;
    //             }else{
    //                 if($get_budgetprogram[1][0]['modion']){
    //                     $tanggal_awal = date('Y-m-d',strtotime($get_budgetprogram[1][0]['modion']));
    //                 }else{
    //                     $tanggal_awal = date('Y-m-d',strtotime($get_budgetprogram[1][0]['addon']));
    //                 }

    //                 $notes = $get_budgetprogram[1][0]['notes'];
    //                 $notes .= 'Budget sebelumnya: '.number_format(($budget_awal - $budget_used),2).' ('.$tanggal_awal.')<br>'.
    //                          'Budget yang digunakan: '.number_format($item['budget'],2).'<br>'.
    //                          'Budget setelahnya: '.number_format($grand_total,2).' ('.date('Y-m-d').')<br>'.
    //                          '----- <br>';

    //             // var_dump($notes); exit();

    //                 $hasil = $this->dbTable->SPUpdate('sp_trainingbudgetprogram_updateapply', 
    //                             $session->getUserId(), 
    //                             $item['trainingbudgetprogram_id'], 
    //                             $budget_awal,
    //                             $total_budget_used,
    //                             $notes
    //                             );

    //                 if($hasil){


    //                         $updateapply = $this->dbTable->SPUpdate('sp_trainingbudget_updateapply',
    //                                         $session->getUserId(),
    //                                         $item['trainingbudget_id']
    //                                     );
    //                 }
    //             }
    //         }

    //    // $hasil = 1;
    //     }
    // }

    //     return $hasil;
    // }

    //UPDATED BY ANAS 28042022
    public function processapplybudgetv2(Hrd_Models_Training_Trainingbudget_Trainingbudget $d, Box_Models_App_HasilRequestRead $r, $session, $trainingbudget_id){

        $hasil = 0;
        $alreadyapply = 0;
        $total_all_budget = 0;
        $total_after_budget = 0;
        $grand_total = 0;

        $errorMsg = "Success";        

        $getdata = $this->dbTable->SPExecute('sp_trainingbudget_readchooseid',
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $trainingbudget_id,1,99999);
        
        if($getdata[1]){
            $item = $getdata[1][0];
            //kalau udh di apply gk bisa di apply lagi
            if($item['apply_check'] == 0)
            {           
                $get_budgetprogram = $this->dbTable->SPExecute('sp_trainingbudgetprogram_readdetail',
                                    $item['project_id'],
                                    $item['pt_id'],
                                    $item['trainingbudgetprogram_id'],1,9999);

                if($get_budgetprogram[0][0]['totalRow'] > 0){

                    $budget_awal = $get_budgetprogram[1][0]['budget'];
                    $budget_used = $get_budgetprogram[1][0]['budget_used'];

                    $total_budget_used = $budget_used + $item['budget'];
                    $grand_total = $budget_awal - $total_budget_used;

                    if($grand_total < 0){ //jika sisa budget tidak cukup maka tidak bisa apply training budget
                        $hasil = 0;
                        $errorMsg = "Budget yang diapply tidak boleh melebihi sisa budget";
                    }else{
                        if($get_budgetprogram[1][0]['modion']){
                            $tanggal_awal = date('Y-m-d',strtotime($get_budgetprogram[1][0]['modion']));
                        }else{
                            $tanggal_awal = date('Y-m-d',strtotime($get_budgetprogram[1][0]['addon']));
                        }

                        $notes = $get_budgetprogram[1][0]['notes'];
                        $notes .= 'Budget sebelumnya: '.number_format(($budget_awal - $budget_used),2).' ('.$tanggal_awal.')<br>'.
                                 'Budget yang digunakan: '.number_format($item['budget'],2).'<br>'.
                                 'Budget setelahnya: '.number_format($grand_total,2).' ('.date('Y-m-d').')<br>'.
                                 '----- <br>';

                        $hasil = $this->dbTable->SPUpdate('sp_trainingbudgetprogram_updateapply', 
                                    $session->getUserId(), 
                                    $item['trainingbudgetprogram_id'], 
                                    $budget_awal,
                                    $total_budget_used,
                                    $notes
                                    );

                        if($hasil){

                            $updateapply = $this->dbTable->SPUpdate('sp_trainingbudget_updateapply',
                                            $session->getUserId(),
                                            $item['trainingbudget_id']
                                        );
                            
                            //JIKA BUDGET MASIH ADA MAKA UPDATE DATA KARYAWAN
                            if($item['employeestatus_id'] == '99'){
                                $employeestatus_id = '';
                            }else{
                                $employeestatus_id = $item['employeestatus_id'];
                            }

                            if($item['apply_budget'] == 1 && !empty($item['banding_id'])){
                                $getemp = $this->dbTable->SPExecute('sp_trainingbudget_reademployee',
                                            $d->getProject()->getId(),
                                            $d->getPt()->getId(),
                                            $item['banding_id'],
                                            '',
                                            $employeestatus_id);
                                $descemp = 'Generate from Apply Periode by Banding';
                            }elseif($item['apply_budget'] == 2 && !empty($item['department_id'])){
                                $getemp = $this->dbTable->SPExecute('sp_trainingbudget_reademployee',
                                        $d->getProject()->getId(),
                                        $d->getPt()->getId(),
                                        '',
                                        $item['department_id'],
                                        $employeestatus_id);
                                $descemp = 'Generate from Apply Periode by Department';
                            }elseif($item['apply_budget'] == 3 && !empty($item['department_id']) && !empty($item['banding_id']) ){
                                $getemp = $this->dbTable->SPExecute('sp_trainingbudget_reademployee',
                                            $d->getProject()->getId(),
                                            $d->getPt()->getId(),
                                            $item['banding_id'],
                                            $item['department_id'],
                                            $employeestatus_id);
                                $descemp = 'Generate from Apply Periode by Banding & Department';
                            }
                            //added by anas 28042022
                            elseif($item['apply_budget'] == 99){
                                $getemp = $this->dbTable->SPExecute('sp_trainingbudget_reademployee',
                                        $d->getProject()->getId(),
                                        $d->getPt()->getId(),
                                        '',
                                        '',
                                        $employeestatus_id);
                                $descemp = 'Generate from Apply Periode by ALL';
                            }
                            //end added by anas
                            else{
                                $getemp = 0;
                                $descemp = '';
                            }

                            if($getemp[0]){
                                $readapply = $this->dbTable->SPExecute('sp_trainingbudget_readapply',
                                        $d->getProject()->getId(),
                                        $d->getPt()->getId(),
                                        $item['trainingbudget_id']);

                                foreach($getemp[0] as $key_emp => $item_emp){
                                    $update_transaksi = $this->dbTable->SPUpdate('sp_trainingbudgetrecord_updateemp',
                                                        $session->getUserId(),
                                                        $d->getProject()->getId(),
                                                        $d->getPt()->getId(),
                                                        $item['periode'],
                                                        $item_emp['employee_id']
                                                        ); 
                                    $insertemp = $this->dbTable->SPUpdate('sp_trainingbudgetrecord_create',
                                                $session->getUserId(),
                                                $d->getProject()->getId(),
                                                $d->getPt()->getId(),
                                                $item['periode'],
                                                $item_emp['employee_id'],
                                                $item_emp['banding_id'],
                                                $item_emp['department_id'],
                                                $item_emp['employeestatus_id'],
                                                $item['budget'],
                                                $descemp,
                                                '1',
                                                $item['trainingbudget_id'],
                                                '',
                                                ''
                                                ); 
                                }

                            }
                        }
                    }
                }
            }
            else
            {
                $hasil = 0;
                $errorMsg = "Budget sudah terapply";
            }
        }

        // return $hasil;
        
        //updated by anas 28042022 | biar bisa ada pesan error
        $data['return'] = $hasil;
        $data['errorMsg'] = $errorMsg;
        return $data;
    }

    // public function getAllWoPL(Hrd_Models_Training_Trainingbudget_Trainingbudget $d){
    //     $hasil = 0;
    //     $hasil = $this->dbTable->SPExecute('sp_trainingbudget_read',
    //             $d->getProject()->getId(),
    //             $d->getPt()->getId(),
    //             $d->getPeriode(),
    //             $d->getBudget(),
    //             $d->getBandingId(),1,99999);
    //     return $hasil;
    // }

    // public function getAllPeriode(Hrd_Models_Training_Trainingperiode_Trainingperiode $d){
    //     $hasil = 0;
    //     $hasil = $this->dbTable->SPExecute('sp_trainingperiode_read',
    //             $d->getProject(),
    //             $d->getPt(),1,9999);
    //     return $hasil;
    // }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $temp_more = $decan->getString();
        $explode_more = explode('~', $temp_more);
        foreach($explode_more as $key => $item){
            $destroy_transaksi = $this->dbTable->SPUpdate('sp_trainingbudget_destroyemp',
                                                    $session->getUserId(),
                                                    $item
                                                    );

            
            $row = $this->dbTable->SPUpdate('sp_trainingbudget_destroy', $item, $session->getUserId());


        }
        // $row = $this->dbTable->SPUpdate('sp_trainingbudget_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }
}
