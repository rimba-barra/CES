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
class Hrd_Models_Training_Trainingbudgetadjustment_Dao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {
    public function save(Hrd_Models_Training_Trainingbudgetadjustment_Trainingbudgetadjustment $d) {
        $hasil = 0;
        
        $hasil = $this->dbTable->SPUpdate('sp_trainingbudgetadjustment_create',
                $d->getAddBy(),
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $d->getPeriode(),
                $d->getCaptionId(),
                $d->getEmployeeId(),
                $d->getMinus(),
                $d->getAdjustment(),
                $d->getNotes(),
                $d->getApplyAdjustmentTo(),
                $d->getBudgetProgramId()
                ); 

        // if($d->getEmployeeId()){
        //     $descemp = '[Adjustment] '.$d->getNotes();
        //     if($d->getMinus()){
        //         $adj = '-'.$d->getAdjustment();
        //     }else{
        //         $adj = $d->getAdjustment();
        //     }
            
        //     $insertbudgetrec = $this->dbTable->SPUpdate('sp_trainingbudgetrecord_create',
        //                        $d->getAddBy(),
        //                        $d->getProject()->getId(),
        //                        $d->getPt()->getId(),
        //                        $d->getPeriode(),
        //                        $d->getEmployeeId(),
        //                        '',
        //                        '',
        //                        '',
        //                        $adj,
        //                        $descemp,
        //                        '99',
        //                        '',
        //                        '',
        //                        $hasil
        //                        ); 
        // }

        return $hasil;
    }

    // public function processapplybudget(Hrd_Models_Training_Trainingbudget_Trainingbudget $d, Box_Models_App_HasilRequestRead $r, $session, $data){

    //     $hasil = 0;
    //     $insertemp = $this->dbTable->SPUpdate('sp_trainingbudgetrecord_create',
    //                                     $session->getUserId(),
    //                                     $d->getProject()->getId(),
    //                                     $d->getPt()->getId(),
    //                                     $data['choose_periode'],
    //                                     $item_emp['employee_id'],
    //                                     $item['budget'],
    //                                     $descemp,
    //                                     '1'
    //                                     ); 

    //     return $hasil;
    // }
    
    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Training_Trainingbudgetadjustment_Trainingbudgetadjustment $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_trainingbudgetadjustment_read',
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $d->getPeriode(),
                $d->getCaptionId(),
                $d->getEmployeeId(),
                $d->getMinus(),
                $d->getAdjustment(),
                $d->getNotes(),
                $r->getPage(), $r->getLimit());
        return $hasil;
    }
    
    public function getAllWoPL(Hrd_Models_Training_Trainingbudgetadjustment_Trainingbudgetadjustment $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_trainingbudgetadjustment_read',
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $d->getPeriode(),
                $d->getCaptionId(),
                $d->getEmployeeId(),
                $d->getMinus(),
                $d->getAdjustment(),
                $d->getNotes(),1,99999);
        return $hasil;
    }

    public function getAllWoPLKP(Hrd_Models_Training_Trainingbudgetadjustment_Trainingbudgetadjustment $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_trainingcaption_read',
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                '',
                '',1,99999);
        
        return $hasil;
    }

    public function update(Hrd_Models_Training_Trainingbudgetadjustment_Trainingbudgetadjustment $em) {
        $hasil = 0;
        if ($em->getId() == 0) {
            return $hasil;
        }
        $hasil = $this->dbTable->SPUpdate('sp_trainingbudgetadjustment_update', $em->getAddBy(), $em->getId(), 
                $em->getPeriode(),
                $em->getCaptionId(),
                $em->getEmployeeId(),
                $em->getMinus(),
                $em->getAdjustment(),
                $em->getNotes(),
                $em->getApplyAdjustmentTo(),
                $em->getBudgetProgramId()
                );

        $update_transaksi = $this->dbTable->SPUpdate('sp_trainingbudgetadjustment_updateemp',
                                                    $em->getAddBy(),
                                                    $em->getProject()->getId(),
                                                    $em->getPt()->getId(),
                                                    $em->getPeriode(),
                                                    $em->getEmployeeId(),
                                                    $em->getId()
                                                    );

        $update = $this->dbTable->SPUpdate('sp_trainingbudgetadjustment_updateapply_update',
                               $em->getAddBy(),
                               $em->getId(),
                               $em->getPeriode()
                           ); 

        // if($em->getEmployeeId()){

        //     $updatebudgetrec = $this->dbTable->SPUpdate('sp_trainingbudgetrecord_updateempadjust',
        //                                             $em->getAddBy(),
        //                                             $em->getProject()->getId(),
        //                                             $em->getPt()->getId(),
        //                                             $em->getPeriode(),
        //                                             $em->getEmployeeId(),
        //                                             $hasil
        //                                             ); 
            
        //     $descemp = '[Adjustment] '.$em->getNotes();
        //     if($em->getMinus()){
        //         $adj = '-'.$em->getAdjustment();
        //     }else{
        //         $adj = $em->getAdjustment();
        //     }
            
        //     $insertbudgetrec = $this->dbTable->SPUpdate('sp_trainingbudgetrecord_create',
        //                        $em->getAddBy(),
        //                        $em->getProject()->getId(),
        //                        $em->getPt()->getId(),
        //                        $em->getPeriode(),
        //                        $em->getEmployeeId(),
        //                        '',
        //                        '',
        //                        '',
        //                        $adj,
        //                        $descemp,
        //                        '99',
        //                        '',
        //                        '',
        //                        $hasil
        //                        ); 
        // }

        return $hasil;
    }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;

        // $row = $this->dbTable->SPUpdate('sp_trainingbudgetadjustment_destroy', $decan->getString(), $session->getUserId());
        
        $temp_more = $decan->getString();
        $explode_more = explode('~', $temp_more);

        foreach($explode_more as $key => $item_id){
            // destroy transaksi employee

            $destroy_transaksi = $this->dbTable->SPUpdate('sp_trainingbudgetadjustment_destroyemp',
                                                    $session->getUserId(),
                                                    $item_id
                                                    );

            //update transaksi budget program
            // $get_budgetprogram = $this->dbTable->SPExecute('sp_trainingbudgetadjustment_readbudgetprogram',
            //                     $item_id,1,9999);

            // $get_budgetprogram_detail = $this->dbTable->SPExecute('sp_trainingbudgetprogram_readdetailbyid',
            //                     $get_budgetprogram[1][0]['trainingbudgetprogram_id'],1,9999);
            

            // if($get_budgetprogram_detail[0][0]['totalRow'] > 0){

            //     $total_all_budget = 0;
            //     $item = $get_budgetprogram_detail[1][0];
            //     $budget_awal = $get_budgetprogram_detail[1][0]['budget'];
            //     $get_allbudget = $this->dbTable->SPExecute('sp_trainingbudget_readall',
            //                     $item['project_id'],
            //                     $item['pt_id'],
            //                     $item['trainingbudgetprogram_id'],1,9999);

            //     if($get_allbudget[0][0]['totalRow'] > 0){

            //         foreach($get_allbudget[1] as $key_budget => $item_budget){
            //             $total_all_budget += $item_budget['budget'];
            //         }

            //         $grand_total = $budget_awal - $total_all_budget;
                
            //     }else{

            //         $grand_total = $budget_awal;

            //     }

            //     $total_after_adjustment = $grand_total - $get_budgetprogram[1][0]['adjustment'];
                
            //     if($total_after_adjustment < 0){
            //         $hasil = 0;
            //     }else{
            //         if($get_budgetprogram_detail[1][0]['modion']){
            //             $tanggal_awal = date('Y-m-d',strtotime($get_budgetprogram_detail[1][0]['modion']));
            //         }else{
            //             $tanggal_awal = date('Y-m-d',strtotime($get_budgetprogram_detail[1][0]['addon']));
            //         }

            //         $notes = $get_budgetprogram_detail[1][0]['notes'];
            //         $notes .= 'Budget sebelumnya: '.number_format($budget_awal,2).' ('.$tanggal_awal.')<br>'.
            //                  'Budget tambahan (dihapus): -'.number_format($get_budgetprogram[1][0]['adjustment'],2).'<br>'.
            //                  'Budget setelahnya: '.number_format($total_after_adjustment,2).' ('.date('Y-m-d').')<br>'.
            //                  '----- <br>';


            //         $hasil = $this->dbTable->SPUpdate('sp_trainingbudgetprogram_updateapply', 
            //                     $session->getUserId(), 
            //                     $item['trainingbudgetprogram_id'], 
            //                     $total_after_adjustment,
            //                     $notes
            //                     );

            //     }
            // }

            $row = $this->dbTable->SPUpdate('sp_trainingbudgetadjustment_destroy', $item_id, $session->getUserId());


        }

        return $row;

    }

//     public function applyAdjustment(Hrd_Models_Training_Trainingbudgetadjustment_Trainingbudgetadjustment $d, $session, $trainingbudgetadjustment_id) {
//         $hasil = 0;
//         $total_all_budget = 0;
//         $budget_awal= 0;
//         $grand_total = 0;
//         $notes = '';

//         $get = $this->dbTable->SPExecute('sp_trainingbudgetadjustment_readdetail',
//                 $d->getProject()->getId(),
//                 $d->getPt()->getId(),
//                 $trainingbudgetadjustment_id,
//                 1, 1);

//         $item = $get[1][0];

//         //kalau sudah di apply tidak bisa diapply lagi
//         if($item['apply_check'] == 0)
//         {
//             if($item['employee_id']){
//                 $descemp = '[Adjustment] '.$item['notes'];
//                 if($item['minus']){
//                     $adj = '-'.$item['adjustment'];
//                 }else{
//                     $adj = $item['adjustment'];
//                 }

//                 $update_transaksi = $this->dbTable->SPUpdate('sp_trainingbudgetadjustment_updateemp',
//                                                         $session->getUserId(),
//                                                         $item['project_id'],
//                                                         $item['pt_id'],
//                                                         $item['periode'],
//                                                         $item['employee_id'],
//                                                         $trainingbudgetadjustment_id
//                                                         );
                
//                 $hasil = $this->dbTable->SPUpdate('sp_trainingbudgetrecord_create',
//                                    $session->getUserId(),
//                                    $item['project_id'],
//                                    $item['pt_id'],
//                                    $item['periode'],
//                                    $item['employee_id'],
//                                    '',
//                                    '',
//                                    '',
//                                    $adj,
//                                    $descemp,
//                                    '99',
//                                    '',
//                                    '',
//                                    $trainingbudgetadjustment_id
//                                    ); 

//                 if($hasil){
//                     $update = $this->dbTable->SPUpdate('sp_trainingbudgetadjustment_updateapply',
//                                    $session->getUserId(),
//                                    $trainingbudgetadjustment_id,
//                                    $item['periode']
//                                ); 
//                 }
//             }elseif($item['trainingbudgetprogram_id']){

//                 $get_budgetprogram = $this->dbTable->SPExecute('sp_trainingbudgetprogram_readdetail',
//                                     $item['project_id'],
//                                     $item['pt_id'],
//                                     $item['trainingbudgetprogram_id'],1,9999);

//                 if($get_budgetprogram[0][0]['totalRow'] > 0){

//                     if($item['minus']){
//                         $nilaiadj = '-'.$item['adjustment'];
//                     }else{
//                         $nilaiadj = $item['adjustment'];
//                     }

//                     $budget_awal = $get_budgetprogram[1][0]['budget'];
//                     $budget_used = $get_budgetprogram[1][0]['budget_used'];

//                     // $get_allbudget = $this->dbTable->SPExecute('sp_trainingbudget_readall',
//                     //                 $item['project_id'],
//                     //                 $item['pt_id'],
//                     //                 $item['trainingbudgetprogram_id'],1,9999);

//                     // if($get_allbudget[0][0]['totalRow'] > 0){

//                     //     foreach($get_allbudget[1] as $key_budget => $item_budget){
//                     //         $total_all_budget += $item_budget['budget'];
//                     //     }

//                     //     $grand_total = $budget_awal - $total_all_budget;
                    
//                     // }else{

//                     //     $grand_total = $budget_awal;

//                     // }

                    
//                     // $total_after_adjustment = $grand_total + $item['adjustment'];

//                     // $total_after_adjustment = ($budget_awal + $item['adjustment']) - $item['minus'];
                    
//                     $total_budget_awal = $budget_awal + $nilaiadj;
//                     $grand_total = $total_budget_awal - $budget_used;
// // var_dump($budget_awal);
// // var_dump($total_budget_awal);
// // var_dump($grand_total);
// // exit();

//                     if($grand_total < 0){
//                         $hasil = 0;
//                     }else{
//                         if($get_budgetprogram[1][0]['modion']){
//                             $tanggal_awal = date('Y-m-d',strtotime($get_budgetprogram[1][0]['modion']));
//                         }else{
//                             $tanggal_awal = date('Y-m-d',strtotime($get_budgetprogram[1][0]['addon']));
//                         }

//                         $notes = $get_budgetprogram[1][0]['notes'];
//                         $notes .= 'Budget sebelumnya: '.number_format(($budget_awal - $budget_used),2).' ('.$tanggal_awal.')<br>'.
//                                  'Budget tambahan / pengurangan: '.number_format($nilaiadj,2).'<br>'.
//                                  'Budget setelahnya: '.number_format($grand_total,2).' ('.date('Y-m-d').')<br>'.
//                                  '----- <br>';
//                         $hasil = $this->dbTable->SPUpdate('sp_trainingbudgetprogram_updateapply', 
//                                     $session->getUserId(), 
//                                     $item['trainingbudgetprogram_id'], 
//                                     $total_budget_awal,
//                                     $budget_used,
//                                     $notes
//                                     );

//                         if($hasil){
//                             $update = $this->dbTable->SPUpdate('sp_trainingbudgetadjustment_updateapply',
//                                            $session->getUserId(),
//                                            $trainingbudgetadjustment_id,
//                                            $item['periode']
//                                        ); 
//                         }
//                     }


//                 }
//             }
//         }
//         return $hasil;
//     }

    //UPDATED BY ANAS 28042022 | tambah errormsg
    public function applyAdjustment(Hrd_Models_Training_Trainingbudgetadjustment_Trainingbudgetadjustment $d, $session, $trainingbudgetadjustment_id) {
        $hasil = 0;
        $total_all_budget = 0;
        $budget_awal= 0;
        $grand_total = 0;
        $notes = '';

        $errorMsg = "Success";      

        $get = $this->dbTable->SPExecute('sp_trainingbudgetadjustment_readdetail',
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $trainingbudgetadjustment_id,
                1, 1);

        $item = $get[1][0];

        //kalau sudah di apply tidak bisa diapply lagi
        if($item['apply_check'] == 0)
        {
            if($item['employee_id']){
                $descemp = '[Adjustment] '.$item['notes'];
                if($item['minus']){
                    $adj = '-'.$item['adjustment'];
                }else{
                    $adj = $item['adjustment'];
                }

                $update_transaksi = $this->dbTable->SPUpdate('sp_trainingbudgetadjustment_updateemp',
                                                        $session->getUserId(),
                                                        $item['project_id'],
                                                        $item['pt_id'],
                                                        $item['periode'],
                                                        $item['employee_id'],
                                                        $trainingbudgetadjustment_id
                                                        );
                
                $hasil = $this->dbTable->SPUpdate('sp_trainingbudgetrecord_create',
                                   $session->getUserId(),
                                   $item['project_id'],
                                   $item['pt_id'],
                                   $item['periode'],
                                   $item['employee_id'],
                                   '',
                                   '',
                                   '',
                                   $adj,
                                   $descemp,
                                   '99',
                                   '',
                                   '',
                                   $trainingbudgetadjustment_id
                                   ); 

                if($hasil){
                    $update = $this->dbTable->SPUpdate('sp_trainingbudgetadjustment_updateapply',
                                   $session->getUserId(),
                                   $trainingbudgetadjustment_id,
                                   $item['periode']
                               ); 
                }
            }elseif($item['trainingbudgetprogram_id']){

                $get_budgetprogram = $this->dbTable->SPExecute('sp_trainingbudgetprogram_readdetail',
                                    $item['project_id'],
                                    $item['pt_id'],
                                    $item['trainingbudgetprogram_id'],1,9999);

                if($get_budgetprogram[0][0]['totalRow'] > 0){

                    if($item['minus']){
                        $nilaiadj = '-'.$item['adjustment'];
                    }else{
                        $nilaiadj = $item['adjustment'];
                    }

                    $budget_awal = $get_budgetprogram[1][0]['budget'];
                    $budget_used = $get_budgetprogram[1][0]['budget_used'];
                    
                    $total_budget_awal = $budget_awal + $nilaiadj;
                    $grand_total = $total_budget_awal - $budget_used;

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
                                 'Budget tambahan / pengurangan: '.number_format($nilaiadj,2).'<br>'.
                                 'Budget setelahnya: '.number_format($grand_total,2).' ('.date('Y-m-d').')<br>'.
                                 '----- <br>';
                        $hasil = $this->dbTable->SPUpdate('sp_trainingbudgetprogram_updateapply', 
                                    $session->getUserId(), 
                                    $item['trainingbudgetprogram_id'], 
                                    $total_budget_awal,
                                    $budget_used,
                                    $notes
                                    );

                        if($hasil){
                            $update = $this->dbTable->SPUpdate('sp_trainingbudgetadjustment_updateapply',
                                           $session->getUserId(),
                                           $trainingbudgetadjustment_id,
                                           $item['periode']
                                       ); 
                        }
                    }

                }
            }
        }
        // return $hasil;
        //updated by anas 28042022 | biar bisa ada pesan error
        $data['return'] = $hasil;
        $data['errorMsg'] = $errorMsg;

        return $data;
    }


    public function getBudgetProgram(Hrd_Models_Training_Trainingbudgetadjustment_Trainingbudgetadjustment $d, $periode){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_trainingbudgetprogram_read',
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $periode,
                '',
                '',
                1, 9999);
        return $hasil;
    }
}
