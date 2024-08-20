<?php

/**
 * Description of ClaimDao
 *
 * @author MIS
 */
class Hrd_Models_Claim_ClaimDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {
    public function save(Hrd_Models_Claim_Claim $d) {
        $hasil = 0;
       
        $hasil = $this->dbTable->SPUpdate('sp_klaim_create', $d->getAddBy(), $d->getProject()->getId(),
                $d->getPt()->getId(), $d->getEmployee()->getId(),
                $d->getYear(),$d->getType()->getId(),
                $d->getDate(),$d->getReceiptDate(),$d->getDoctor(),
                $d->getHospital(),$d->getPharmacy(),$d->getDescription(),
                $d->getInpatient(),$d->getTotal(),$d->getSubject(),$d->getIsPaid(),
                $d->getClaimValue(),$d->getPercentPengganti(),
                $d->getAmountPengganti(),$d->getTotalKlaim(),
                $d->getSaldo(),$d->getPlafon()

                ,$d->getNoClaim(),$d->getPayDate());
        
        return $hasil;
    }

    public function update(Hrd_Models_Claim_Claim $d) {
        $hasil = 0;

        //   $d->setSelectedRelation("overtimes");

        $hasil = $this->dbTable->SPUpdate('sp_klaim_update', $d->getAddBy(),
                $d->getId(),$d->getType()->getId(),$d->getDate(),$d->getReceiptDate(),
                $d->getDoctor(),$d->getHospital(),$d->getPharmacy(),$d->getDescription(),
                $d->getInpatient(),$d->getTotal(),$d->getSubject(),$d->getIsPaid(),$d->getClaimValue(),$d->getPercentPengganti(),
                $d->getAmountPengganti(),$d->getTotalKlaim(),
                $d->getSaldo(),$d->getPlafon()

                ,$d->getNoClaim(),$d->getPayDate());

        return $hasil;
    }

    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Claim_Claim $d) {
        $hasil = 0;
        
        $hasil = $this->dbTable->SPExecute('sp_klaim_read', $r->getPage(), $r->getLimit(),$d->getProject()->getId(),$d->getPt()->getId(),$d->getEmployee()->getId(),$d->getYear());
     
        return $hasil;
    }
    
    
    public function getAllWOPL(Hrd_Models_Claim_Claim $d) {
        $hasil = 0;
        
        $hasil = $this->dbTable->SPExecute('sp_klaim_read',1,99999,$d->getProject()->getId(),$d->getPt()->getId(),$d->getEmployee()->getId(),$d->getYear());
     
        return $hasil;
    }

    public function checkPlafon($session) {
        $hasil = 0;
        
        $ptkp = $this->dbTable->SPExecute('sp_ptkp_read',
                                            1,
                                            9999,
                                            '',
                                            '');

        $group = $this->dbTable->SPExecute('sp_group_read',
                                            $session->getProjectId(),
                                            $session->getPtId(),
                                            1,
                                            9999,
                                            '',
                                            '');

        $jenis = $this->dbTable->SPExecute('sp_jenispengobatan_read2',1,25,'RAWAT JALAN');

        $empty = '';

        foreach($group[1] as $keygroup => $itemgroup){
            foreach($ptkp[1] as $keyptkp => $itemptkp){
                // $getplafon = $this->dbTable->SPExecute('sp_plafonpengobatan_read',
                //                                             1,
                //                                             25,
                //                                             $session->getProjectId(),
                //                                             $session->getPtId(),
                //                                             date('Y'),
                //                                             $itemgroup['group_id'],
                //                                             $jenis[1][0]['jenispengobatan_id'],
                //                                             $itemptkp['ptkp_id']
                //                                         );
                $getplafon = $this->dbTable->SPExecute('sp_plafonpengobatan_bydate_read',
                                                            1,
                                                            25,
                                                            $session->getProjectId(),
                                                            $session->getPtId(),
                                                            '',
                                                            date('Y-m-d'),
                                                            $itemgroup['group_id'],
                                                            $jenis[1][0]['jenispengobatan_id'],
                                                            $itemptkp['ptkp_id']
                                                        );
                // print_r($getplafon);die();
                if(!array_key_exists('0', $getplafon[1])){
                    if(empty($empty)){
                        $empty .= 'Silahkan tambahkan Table Plafon Pengobatan dengan Jenis Rawat untuk golongan-ptkp berikut ini: ';
                        $empty .= $itemgroup['code'].' - '.$itemptkp['code'];
                    }else{
                        $empty .= ', '.$itemgroup['code'].' - '.$itemptkp['code'];
                    }
                }
            }
        }
     
        return $empty;
    }

    public function getClaimCheck($session,$data_excel,$data) {
        $hasil = 0;
        
        //update by michael 2022-10-27, krn report dari mandiri inhealth cuma bisa dikasih ke KP, tidak ke project, jadi req Bu Shirley untuk di lepas project pt nya, supaya uploadnya dari KP aja

        // $hasil = $this->dbTable->SPExecute('sp_klaim_upload_readcheck',$session->getProjectId(),$session->getPtId(),$data_excel['no_claim'],$data_excel['nik_group']);

        $hasil = $this->dbTable->SPExecute('sp_klaim_upload_readcheck','','',$data_excel['no_claim'],$data_excel['nik_group']);
     
        return $hasil;
    }

    public function uploadClaim($session,$data_excel,$data) {

        $hasil = '';

        $message = '';

        //update by michael 2022-10-27, krn report dari mandiri inhealth cuma bisa dikasih ke KP, tidak ke project, jadi req Bu Shirley untuk di lepas project pt nya, supaya uploadnya dari KP aja

        // $employee = $this->dbTable->SPExecute('sp_get_employee_from_nikgroup_read',$data_excel['nik_group'],$session->getProjectId(),$session->getPtId());

        $employee = $this->dbTable->SPExecute('sp_get_employee_from_nikgroup_read',$data_excel['nik_group'],'','');

        $jenis = $this->dbTable->SPExecute('sp_jenispengobatan_read2',1,25,'RAWAT JALAN');
        
        if($data_excel['member_id'] == '3'){
            $data_excel['member_id'] = 'D';
        }elseif($data_excel['member_id'] == '2'){
            $data_excel['member_id'] = 'W';
        }else{
            $data_excel['member_id'] = 'S';
        }

        if(array_key_exists('0', $employee[0])){

            //cari periode yg sesuai dengan tanggal kwitansi

            // $getyear_bydate = $this->dbTable->SPExecute('sp_plafonpengobatan_bydate_read',
            //                                                 1,
            //                                                 10,
            //                                                 $session->getProjectId(),
            //                                                 $session->getPtId(),
            //                                                 '',
            //                                                 $data_excel['in_date'],
            //                                                 $employee[0][0]['group_id'],
            //                                                 $jenis[1][0]['jenispengobatan_id'],
            //                                                 $employee[0][0]['ptkp_id']
            //                                             );

            //update by michael 2022-10-27, krn report dari mandiri inhealth cuma bisa dikasih ke KP, tidak ke project, jadi req Bu Shirley untuk di lepas project pt nya, supaya uploadnya dari KP aja

            // $getyear_bydate = $this->dbTable->SPExecute('sp_plafonpengobatan_bydate_read',
            //                                                 1,
            //                                                 10,
            //                                                 $session->getProjectId(),
            //                                                 $session->getPtId(),
            //                                                 '',
            //                                                 $data_excel['in_date'],
            //                                                 $employee[0][0]['group_id'],
            //                                                 $jenis[1][0]['jenispengobatan_id'],
            //                                                 $employee[0][0]['ptkp_claim_id']
            //                                             );

            //baca project pt id employee
            $project_id_employee = $employee[0][0]['project_id'];
            $pt_id_employee = $employee[0][0]['pt_id'];

            $getyear_bydate = $this->dbTable->SPExecute('sp_plafonpengobatan_bydate_read',
                                                            1,
                                                            10,
                                                            $project_id_employee,
                                                            $pt_id_employee,
                                                            '',
                                                            $data_excel['in_date'],
                                                            $employee[0][0]['group_id'],
                                                            $jenis[1][0]['jenispengobatan_id'],
                                                            $employee[0][0]['ptkp_claim_id']
                                                        );

            if(array_key_exists('0', $getyear_bydate[1])){

                $periode_bydate = $getyear_bydate[1][0]['year'];

                //$allclaim = $this->dbTable->SPExecute('sp_klaim_read',1,99999,$session->getProjectId(),$session->getPtId(),$employee[0][0]['employee_id'],date('Y',strtotime($data_excel['in_date'])));

                //update by michael 2022-10-27, krn report dari mandiri inhealth cuma bisa dikasih ke KP, tidak ke project, jadi req Bu Shirley untuk di lepas project pt nya, supaya uploadnya dari KP aja

                // $allclaim = $this->dbTable->SPExecute('sp_klaim_byjenis_read',1,99999,$session->getProjectId(),$session->getPtId(),$employee[0][0]['employee_id'],$periode_bydate,30);

                $allclaim = $this->dbTable->SPExecute('sp_klaim_byjenis_read',1,99999,$project_id_employee,$pt_id_employee,$employee[0][0]['employee_id'],$periode_bydate,30);

                $totalclaim = 0;
                $totalsaldo = 0;
                $plafon = 0;

                if(array_key_exists('0', $allclaim[1])){
                    $lastclaim = end($allclaim);
                    
                    $totalclaim = $lastclaim[0]['total_klaim'];
                    $totalclaim += $data_excel['biaya_dibayarkan'];

                    $totalsaldo = $lastclaim[0]['saldo'];
                    $totalsaldo -= $data_excel['biaya_dibayarkan'];

                    $plafon = $lastclaim[0]['plafon'];

                }else{
                    $totalclaim += $data_excel['biaya_dibayarkan'];

                    // $getplafon = $this->dbTable->SPExecute('sp_plafonpengobatan_read',
                    //                                         1,
                    //                                         25,
                    //                                         $session->getProjectId(),
                    //                                         $session->getPtId(),
                    //                                         date('Y',strtotime($data_excel['in_date'])),
                    //                                         $employee[0][0]['group_id'],
                    //                                         $jenis[1][0]['jenispengobatan_id'],
                    //                                         $employee[0][0]['ptkp_id']
                    //                                     );

                    // baca ptkp claim id

                    // $getplafon = $this->dbTable->SPExecute('sp_plafonpengobatan_read',
                    //                                         1,
                    //                                         25,
                    //                                         $session->getProjectId(),
                    //                                         $session->getPtId(),
                    //                                         $periode_bydate,
                    //                                         $employee[0][0]['group_id'],
                    //                                         $jenis[1][0]['jenispengobatan_id'],
                    //                                         $employee[0][0]['ptkp_id']
                    //                                     );

                    //update by michael 2022-10-27, krn report dari mandiri inhealth cuma bisa dikasih ke KP, tidak ke project, jadi req Bu Shirley untuk di lepas project pt nya, supaya uploadnya dari KP aja

                    // $getplafon = $this->dbTable->SPExecute('sp_plafonpengobatan_read',
                    //                                         1,
                    //                                         25,
                    //                                         $session->getProjectId(),
                    //                                         $session->getPtId(),
                    //                                         $periode_bydate,
                    //                                         $employee[0][0]['group_id'],
                    //                                         $jenis[1][0]['jenispengobatan_id'],
                    //                                         $employee[0][0]['ptkp_claim_id']
                    //                                     );

                    $getplafon = $this->dbTable->SPExecute('sp_plafonpengobatan_read',
                                                            1,
                                                            25,
                                                            $project_id_employee,
                                                            $pt_id_employee,
                                                            $periode_bydate,
                                                            $employee[0][0]['group_id'],
                                                            $jenis[1][0]['jenispengobatan_id'],
                                                            $employee[0][0]['ptkp_claim_id']
                                                        );

                    $plafon = $getplafon[1][0]['value'];

                    $totalsaldo = $plafon;
                    $totalsaldo -= $data_excel['biaya_dibayarkan'];
                }
                
                if($data['action'] == 'insert'){
                    // $hasil = $this->dbTable->SPUpdate('sp_klaim_create', 
                    //     $session->getuserId(), 
                    //     $session->getProjectId(),
                    //     $session->getPtId(),
                    //     $employee[0][0]['employee_id'],
                    //     date('Y',strtotime($data_excel['in_date'])),
                    //     $jenis[1][0]['jenispengobatan_id'],
                    //     $data_excel['register_date'],
                    //     $data_excel['in_date'],
                    //     $data_excel['nama_provider'],
                    //     $data_excel['nama_provider'],
                    //     '',
                    //     $data_excel['description'].' (No Claim: '.$data_excel['no_claim'].')',
                    //     '',
                    //     $data_excel['biaya_dibayarkan'],
                    //     $data_excel['member_id'],
                    //     1,
                    //     $data_excel['biaya_ajuan'],
                    //     '',
                    //     $data_excel['biaya_dibayarkan'],
                    //     $totalclaim,
                    //     $totalsaldo,
                    //     $plafon,
                    //     $data_excel['no_claim'],
                    //     $data_excel['out_date']);

                    //update by michael 2022-10-27, krn report dari mandiri inhealth cuma bisa dikasih ke KP, tidak ke project, jadi req Bu Shirley untuk di lepas project pt nya, supaya uploadnya dari KP aja

                    // $hasil = $this->dbTable->SPUpdate('sp_klaim_create', 
                    //     $session->getuserId(), 
                    //     $session->getProjectId(),
                    //     $session->getPtId(),
                    //     $employee[0][0]['employee_id'],
                    //     $periode_bydate,
                    //     $jenis[1][0]['jenispengobatan_id'],
                    //     $data_excel['register_date'],
                    //     $data_excel['in_date'],
                    //     $data_excel['nama_provider'],
                    //     $data_excel['nama_provider'],
                    //     '',
                    //     $data_excel['description'].' (No Claim: '.$data_excel['no_claim'].')',
                    //     '',
                    //     $data_excel['biaya_dibayarkan'],
                    //     $data_excel['member_id'],
                    //     1,
                    //     $data_excel['biaya_ajuan'],
                    //     '',
                    //     $data_excel['biaya_dibayarkan'],
                    //     $totalclaim,
                    //     $totalsaldo,
                    //     $plafon,
                    //     $data_excel['no_claim'],
                    //     $data_excel['out_date']);

                    $hasil = $this->dbTable->SPUpdate('sp_klaim_create', 
                        $session->getuserId(), 
                        $project_id_employee,
                        $pt_id_employee,
                        $employee[0][0]['employee_id'],
                        $periode_bydate,
                        $jenis[1][0]['jenispengobatan_id'],
                        $data_excel['register_date'],
                        $data_excel['in_date'],
                        $data_excel['nama_provider'],
                        $data_excel['nama_provider'],
                        '',
                        $data_excel['description'].' (No Claim: '.$data_excel['no_claim'].')',
                        '',
                        $data_excel['biaya_dibayarkan'],
                        $data_excel['member_id'],
                        1,
                        $data_excel['biaya_ajuan'],
                        '',
                        $data_excel['biaya_dibayarkan'],
                        $totalclaim,
                        $totalsaldo,
                        $plafon,
                        $data_excel['no_claim'],
                        $data_excel['out_date']);
                }else{

                    //update by michael 2022-10-27, krn report dari mandiri inhealth cuma bisa dikasih ke KP, tidak ke project, jadi req Bu Shirley untuk di lepas project pt nya, supaya uploadnya dari KP aja

                    // $hasil = $this->dbTable->SPUpdate('sp_klaim_update', 
                    //     $session->getuserId(),
                    //     $data['klaimpengobatan_id'],
                    //     $jenis[1][0]['jenispengobatan_id'],
                    //     $data_excel['register_date'],
                    //     $data_excel['in_date'],
                    //     $data_excel['nama_provider'],
                    //     $data_excel['nama_provider'],
                    //     '',
                    //     $data_excel['description'].' (No Claim: '.$data_excel['no_claim'].')',
                    //     '',
                    //     $data_excel['biaya_dibayarkan'],
                    //     $data_excel['member_id'],
                    //     1,
                    //     $data_excel['biaya_ajuan'],
                    //     '',
                    //     $data_excel['biaya_dibayarkan'],
                    //     // $totalclaim,
                    //     // $totalsaldo,
                    //     // $plafon,
                    //     $data['total_klaim'],
                    //     $data['saldo'],
                    //     $data['plafon'],
                    //     $data_excel['no_claim'],
                    //     $data_excel['out_date']);

                    $hasil = $this->dbTable->SPUpdate('sp_klaim_update', 
                        $session->getuserId(),
                        $data['klaimpengobatan_id'],
                        $jenis[1][0]['jenispengobatan_id'],
                        $data_excel['register_date'],
                        $data_excel['in_date'],
                        $data_excel['nama_provider'],
                        $data_excel['nama_provider'],
                        '',
                        $data_excel['description'].' (No Claim: '.$data_excel['no_claim'].')',
                        '',
                        $data_excel['biaya_dibayarkan'],
                        $data_excel['member_id'],
                        1,
                        $data_excel['biaya_ajuan'],
                        '',
                        $data_excel['biaya_dibayarkan'],
                        // $totalclaim,
                        // $totalsaldo,
                        // $plafon,
                        $data['total_klaim'],
                        $data['saldo'],
                        $data['plafon'],
                        $data_excel['no_claim'],
                        $data_excel['out_date']);
                }

            }else{
                $message = 'not_found_plafon';
                $hasil = $message;
            }

        }else{
                $message = 'not_found';
                $hasil = $message;
        }
        
        return $hasil;

    }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;

        $row = $this->dbTable->SPUpdate('sp_klaim_destroy', $decan->getString(), $session->getUserId());

        return $row;
    }

    public function getdataReportformatrj($param, $session) {    
        
   
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

        $param['start_date'] = date('Y-m-d',strtotime($param['start_date']));
        $param['end_date'] = date('Y-m-d',strtotime($param['end_date']));

        // if($param['is_active'] == '999'){
        //     $param['is_active'] = 0;
        // } 

        // if($param['status'] == '999'){
        //     $param['status'] = 0;
        // } 

        if($param['alokasibiaya_id'] == '999'){
            $param['alokasibiaya_id'] = 0;
        } 

        if($param['department_id'] == '999'){
            $param['department_id'] = 0;
        } 

        if($param['employee_id'] == '999'){
            $param['employee_id'] = 0;
        } 

        if($param['jenispengobatan_id'] == '999'){
            $param['jenispengobatan_id'] = 0;
        } 

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_report_claim_formatrj', 
                                            '',
                                            '',
                                            $param['start_date'],
                                            $param['end_date'],
                                            $param['is_active'],
                                            $param['status'],
                                            $param['alokasibiaya_id'],
                                            $param['department_id'],
                                            $param['employee_id'],
                                            $param['jenispengobatan_id'],
                                            $session->getUserId()
                                           );
        if (!empty($hasil[0])) {
            return $hasil[0];
        } else {
            return false;
        }
    }

    public function getAllBrowse(Box_Models_App_HasilRequestRead $r,$session, $data) {    
        
        $param = json_decode($data['paramdata'],TRUE);
        if (isset($param['employee_id'])) {
            if($param['employee_id'] > 0){
                $param['employee_id'] = $param['employee_id'];
            }else{
                $param['employee_id'] = 0;
            }             
        } else {
           $param['employee_id'] = 0;            
        }

        if (isset($param['department_id'])) {
            if($param['department_id'] > 0){
                $param['department_id'] = $param['department_id'];
            }else{
                $param['department_id'] = 0;
            }             
        } else {
           $param['department_id'] = 0;            
        }

        if (isset($param['fromdateklaim']) && $param['fromdateklaim'] != '') {
            $param['fromdateklaim'] = date('Y-m-d',strtotime($param['fromdateklaim']));            
        } else {
           $param['fromdateklaim'] = '2000-01-01';            
        }

        if (isset($param['untildateklaim']) && $param['untildateklaim'] != '') {
            $param['untildateklaim'] = date('Y-m-d',strtotime($param['untildateklaim']));            
        } else {
           $param['untildateklaim'] = '2999-12-31';            
        }

        if (isset($param['fromdatekwitansi']) && $param['fromdatekwitansi'] != '') {
            $param['fromdatekwitansi'] = date('Y-m-d',strtotime($param['fromdatekwitansi']));            
        } else {
           $param['fromdatekwitansi'] = '2000-01-01';            
        }

        if (isset($param['untildatekwitansi']) && $param['untildatekwitansi'] != '') {
            $param['untildatekwitansi'] = date('Y-m-d',strtotime($param['untildatekwitansi']));            
        } else {
           $param['untildatekwitansi'] = '2999-12-31';            
        }

        if($param['hrd_check'] == 'YES'){
            $param['hrd_check'] = 1;
        }else{
            $param['hrd_check'] = 0;
        }


        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_klaim_browse_read', 
                                            $r->getPage(), 
                                            $r->getLimit(),
                                            $data['project_id'],
                                            $data['pt_id'],
                                            $param['employee_id'],
                                            $param['department_id'],
                                            $param['fromdateklaim'],
                                            $param['untildateklaim'],
                                            $param['fromdatekwitansi'],
                                            $param['untildatekwitansi'],
                                            $param['hrd_check']
                                           );
        if (!empty($hasil)) {
            return $hasil;
        } else {
            return false;
        }
    }

    public function getDetailBrowse(Box_Models_App_HasilRequestRead $r,$session, $data) {    
        
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_klaim_browse_readdetail', 
                                            $session->getProjectId(),
                                            $session->getPtId(),
                                            $data['id'],
                                            $data['jenispengobatan_id']
                                           );
        if (!empty($hasil[0])) {
            return $hasil[0][0];
        } else {
            return false;
        }
    }

    public function processBrowse(Box_Models_App_HasilRequestRead $r,$session, $data) {    

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_klaim_browse_update', 
                                            $session->getuserId(), 
                                            $session->getProjectId(),
                                            $session->getPtId(),
                                            $data['klaimpengobatan_id'],
                                            $data['jenispengobatan_id'],
                                            $data['employee_id'],

                                            $data['kwitansi_date'],
                                            $data['claim_date'],
                                            $data['docter_name'],
                                            $data['hospital_name'],
                                            $data['apotic_name'],
                                            $data['description'],
                                            $data['rawat_inap'],
                                            $data['claim_subject'],

                                            $data['total'],
                                            $data['plafon'],
                                            $data['percent_pengganti'],
                                            $data['amount_pengganti'],
                                            $data['claim_value'],
                                            $data['total_klaim'],
                                            $data['saldo'],

                                            $data['paid'],
                                            $data['pay_date'],
                                            $data['hrd_comment'],
                                            $data['is_show'],
                                            $data['is_block'],

                                            $data['notes'],

                                            $data['nama_pasien'],
                                            $data['year']
                                           );
        if (!empty($hasil[0])) {

            $this->sendemail($session,$data);

            return $hasil[0][0];
        } else {
            return false;
        }
    }

    public function rejectBrowse(Box_Models_App_HasilRequestRead $r,$session, $data) {    
        
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_klaim_browse_update_reject', 
                                            $session->getuserId(), 
                                            $session->getProjectId(),
                                            $session->getPtId(),
                                            $data['klaimpengobatan_id'],
                                            $data['jenispengobatan_id'],
                                            $data['employee_id'],

                                            $data['kwitansi_date'],
                                            $data['claim_date'],
                                            $data['docter_name'],
                                            $data['hospital_name'],
                                            $data['apotic_name'],
                                            $data['description'],
                                            $data['rawat_inap'],
                                            $data['claim_subject'],

                                            $data['total'],
                                            $data['plafon'],
                                            $data['percent_pengganti'],
                                            $data['amount_pengganti'],
                                            $data['claim_value'],
                                            $data['total_klaim'],
                                            $data['saldo'],

                                            $data['paid'],
                                            $data['pay_date'],
                                            $data['hrd_comment'],
                                            $data['is_show'],
                                            $data['is_block'],

                                            $data['notes'],

                                            $data['nama_pasien'],
                                            $data['year']
                                           );
        if (!empty($hasil[0])) {

            $this->sendemail($session,$data);

            return $hasil[0][0];
        } else {
            return false;
        }
    }

    public function processKacamataBrowse(Box_Models_App_HasilRequestRead $r,$session, $data) {    
        
        if(empty($data['ki_minus'])){
            $data['ki_minus'] = '0.00';
        }
        if(empty($data['ka_minus'])){
            $data['ka_minus'] = '0.00';
        }
        if(empty($data['ki_plus'])){
            $data['ki_plus'] = '0.00';
        }
        if(empty($data['ka_plus'])){
            $data['ka_plus'] = '0.00';
        }
        if(empty($data['ki_silinder'])){
            $data['ki_silinder'] = '0.00';
        }
        if(empty($data['ka_silinder'])){
            $data['ka_silinder'] = '0.00';
        }

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_klaim_kacamata_browse_update', 
                                            $session->getuserId(), 
                                            $session->getProjectId(),
                                            $session->getPtId(),
                                            $data['klaimpengobatan_id'],
                                            $data['jenispengobatan_id'],
                                            $data['employee_id'],

                                            $data['kwitansi_date'],
                                            $data['claim_date'],
                                            $data['keterangan'],
                                            $data['rekomendasi_dokter'],
                                            $data['tipe_klaim_lensa'],
                                            $data['ki_minus'],
                                            $data['ka_minus'],
                                            $data['ki_plus'],
                                            $data['ka_plus'],
                                            $data['ki_silinder'],
                                            $data['ka_silinder'],

                                            $data['total'],
                                            $data['plafon'],
                                            $data['percent_pengganti'],
                                            $data['amount_pengganti'],
                                            $data['claim_value'],
                                            $data['total_klaim'],
                                            $data['saldo'],

                                            $data['paid'],
                                            $data['pay_date'],
                                            $data['hrd_comment'],
                                            $data['is_show'],
                                            $data['is_block'],

                                            $data['notes'],

                                            $data['nama_optik']
                                           );
        if (!empty($hasil[0])) {

            $data['description'] = $data['keterangan'];

            $this->sendemail($session,$data);

            return $hasil[0][0];
        } else {
            return false;
        }
    }

    public function rejectKacamataBrowse(Box_Models_App_HasilRequestRead $r,$session, $data) {    
        
        if(empty($data['ki_minus'])){
            $data['ki_minus'] = '0.00';
        }
        if(empty($data['ka_minus'])){
            $data['ka_minus'] = '0.00';
        }
        if(empty($data['ki_plus'])){
            $data['ki_plus'] = '0.00';
        }
        if(empty($data['ka_plus'])){
            $data['ka_plus'] = '0.00';
        }
        if(empty($data['ki_silinder'])){
            $data['ki_silinder'] = '0.00';
        }
        if(empty($data['ka_silinder'])){
            $data['ka_silinder'] = '0.00';
        }

        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_klaim_kacamata_browse_update_reject', 
                                            $session->getuserId(), 
                                            $session->getProjectId(),
                                            $session->getPtId(),
                                            $data['klaimpengobatan_id'],
                                            $data['tipe_klaim'],
                                            $data['employee_id'],

                                            $data['kwitansi_date'],
                                            $data['claim_date'],
                                            $data['keterangan'],
                                            $data['rekomendasi_dokter'],
                                            $data['tipe_klaim_lensa'],
                                            $data['ki_minus'],
                                            $data['ka_minus'],
                                            $data['ki_plus'],
                                            $data['ka_plus'],
                                            $data['ki_silinder'],
                                            $data['ka_silinder'],

                                            $data['total'],
                                            $data['plafon'],
                                            $data['percent_pengganti'],
                                            $data['amount_pengganti'],
                                            $data['claim_value'],
                                            $data['total_klaim'],
                                            $data['saldo'],

                                            $data['paid'],
                                            $data['pay_date'],
                                            $data['hrd_comment'],
                                            $data['is_show'],
                                            $data['is_block'],

                                            $data['notes'],

                                            $data['nama_optik']
                                           );
        if (!empty($hasil[0])) {

            $data['description'] = $data['keterangan'];
            
            $this->sendemail($session,$data);
            
            return $hasil[0][0];
        } else {
            return false;
        }
    }

    public function sendemail($session,$data){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_employee_read_byid', 
                                                $data['employee_id']
                                               );
        $hasil_detail = 0;
        $hasil_detail = $this->dbTable->SPExecute('sp_klaim_browse_readdetail', 
                                            $session->getProjectId(),
                                            $session->getPtId(),
                                            $data['klaimpengobatan_id'],
                                            $data['jenispengobatan_id']
                                           );

        if(isset($data) && !empty($hasil[0]) && !empty($hasil_detail[0])){
            
                try {
                    
                    $message_status = '';

                    $message = '<html><body>';
                   
                    $message .= '<p>Dear Bapak / Ibu,</p>';
                    $message .= "<p>Terdapat pengajuan claim yang dibuat oleh user dari INTRANET REQUEST SYSTEM :</p>";
                    $message .= "<p>Nama    : <strong>" . strtoupper($hasil[0][0]['employee_name']) . "</strong><br>";
                    $message .= "Tgl Masuk  : <strong>" . date('d F Y', strtotime($hasil[0][0]['hire_date'])) . "</strong><br>";
                    $message .= "Departemen : <strong>" . $hasil[0][0]['department_code'] . "</strong><br>";
                    $message .= "Jabatan    : <strong>" . $hasil[0][0]['position_position'] . "</strong><br>";
                    $message .= "Tipe klaim : <strong>" . $hasil_detail[0][0]['jenispengobatan'] . "</strong><br>";
                    $message .= "<p>Deskripsi  :<br>";
                    $message .= "<strong>" . nl2br($data['description']) . "</strong></p>";

                    //HRD COMMENT
                    if($data['hrd_comment']){
                        $message_status .= "<p>&nbsp;</p>";
                        $message_status .= "<p>Telah dilakukan pengecekan oleh bagian HRD, <br>";
                        $message_status .= "Keterangan HRD :<br>";
                        $message_status .= "<strong>" . nl2br($data['hrd_comment']) . "</strong></p>";
                    }

                    //EDIT
                    if($data['is_show'] == 'true' && $data['is_block'] == 'false'){
                        $subject_email = '[Pengajuan Claim - Edit] No. Claim #' . $data['klaimpengobatan_id'] . ' - ' . $hasil_detail[0][0]['jenispengobatan'];

                        $message_status .= "<p>&nbsp;</p>";
                        $message_status .= "<p>Silahkan <b>Edit</b> kembali Pengajuan Claim Anda. <br>";

                        $message = $message.$message_status;
                    }

                    //BLOCK
                    if($data['is_show'] == 'true' && $data['is_block'] == 'true'){
                        $subject_email = '[Pengajuan Claim - Reject] No. Claim #' . $data['klaimpengobatan_id'] . ' - ' . $hasil_detail[0][0]['jenispengobatan'];

                        $message = $message.$message_status;
                    }

                    //BLOCK
                    if($data['is_show'] == 'false' && $data['is_block'] == 'true'){
                        $subject_email = '[Pengajuan Claim - Reject] No. Claim #' . $data['klaimpengobatan_id'] . ' - ' . $hasil_detail[0][0]['jenispengobatan'];

                        $message = $message.$message_status;
                    }

                    //PROSES
                    if($data['is_show'] == 'false' && $data['is_block'] == 'false'){
                        $subject_email = '[Pengajuan Claim - Approve] No. Claim #' . $data['klaimpengobatan_id'] . ' - ' . $hasil_detail[0][0]['jenispengobatan'];

                        $message_status = '';
                        
                        $message_status .= "<p>&nbsp;</p>";
                        $message_status .= "<p>Pengajuan Claim Anda sudah di <b>Approve</b> oleh HC, dan sedang dilanjutkan untuk proses pembayarannya. <br>";

                        $message = $message.$message_status;
                    }

                    $message .= "<p>&nbsp;</p>";
                    $message .= "<p>Regards,</p>";
                    $message .= "Intranet Request system";
                    $message .= "</body></html>";                              
                    //$sender = 'ces@ciputra.co.id';
                    $sender = 'no.reply@ciputra.com';
                    $to = $hasil[0][0]['email_ciputra'];
                    $employee_name = $hasil[0][0]['employee_name'];
                    //$to = 'wulan.sari@ciputra.co.id';
                    $mail = new Hrd_Models_General_Email();
                    $mail->setData()->setFrom($sender);
                    $mail->setData()->setBodyHtml($message);
                    $mail->setData()->addTo($to, strtoupper($employee_name));
                    $mail->setData()->setSubject($subject_email);                
                    $mail->setData()->send();              
                } catch (Zend_Mail_Transport_Exception $e) {
                    echo $e->message();
                }
        }
        
        unset($data);
    }

    public function getAllPfams(Box_Models_App_HasilRequestRead $r,$session, $data) {    
        
        $param = json_decode($data['paramdata'],TRUE);
        if (isset($param['employee_id'])) {
            if($param['employee_id'] > 0){
                $param['employee_id'] = $param['employee_id'];
            }else{
                $param['employee_id'] = 0;
            }             
        } else {
           $param['employee_id'] = 0;            
        }

        if (isset($param['department_id'])) {
            if($param['department_id'] > 0){
                $param['department_id'] = $param['department_id'];
            }else{
                $param['department_id'] = 0;
            }             
        } else {
           $param['department_id'] = 0;            
        }

        if (isset($param['fromdateklaim']) && $param['fromdateklaim'] != '') {
            $param['fromdateklaim'] = date('Y-m-d',strtotime($param['fromdateklaim']));            
        } else {
           $param['fromdateklaim'] = '2000-01-01';            
        }

        if (isset($param['untildateklaim']) && $param['untildateklaim'] != '') {
            $param['untildateklaim'] = date('Y-m-d',strtotime($param['untildateklaim']));            
        } else {
           $param['untildateklaim'] = '2999-12-31';            
        }

        if (isset($param['fromdatekwitansi']) && $param['fromdatekwitansi'] != '') {
            $param['fromdatekwitansi'] = date('Y-m-d',strtotime($param['fromdatekwitansi']));            
        } else {
           $param['fromdatekwitansi'] = '2000-01-01';            
        }

        if (isset($param['untildatekwitansi']) && $param['untildatekwitansi'] != '') {
            $param['untildatekwitansi'] = date('Y-m-d',strtotime($param['untildatekwitansi']));            
        } else {
           $param['untildatekwitansi'] = '2999-12-31';            
        }

        if($param['fams_process'] == 'YES'){
            $param['fams_process'] = 1;
        }else{
            $param['fams_process'] = 0;
        }


        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_klaim_pfams_read', 
                                            $r->getPage(), 
                                            $r->getLimit(),
                                            $data['project_id'],
                                            $data['pt_id'],
                                            $param['employee_id'],
                                            $param['department_id'],
                                            $param['fromdateklaim'],
                                            $param['untildateklaim'],
                                            $param['fromdatekwitansi'],
                                            $param['untildatekwitansi'],
                                            $param['fams_process'],
                                            $param['fams_status']
                                           );
        if (!empty($hasil)) {
            return $hasil;
        } else {
            return false;
        }
    }

    public function getDeptFams(Box_Models_App_HasilRequestRead $r,$session, $data) { 
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_klaim_pfams_deptaccess_read', 
                                            1, 
                                            9999,
                                            $data['project_id'],
                                            $data['pt_id'],
                                            $data['user_id']
                                           );
        if (!empty($hasil)) {
            return $hasil;
        } else {
            return false;
        }
    }

    public function getProjectName(Box_Models_App_HasilRequestRead $r,$session, $data) { 
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_project_byid_read', 
                                            $data['project_id']
                                           );
        if (!empty($hasil)) {
            return $hasil;
        } else {
            return false;
        }
    }

    public function getPtName(Box_Models_App_HasilRequestRead $r,$session, $data) { 
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_pt_byid_read', 
                                            $data['pt_id']
                                           );
        if (!empty($hasil)) {
            return $hasil;
        } else {
            return false;
        }
    }

    public function getAPI(Box_Models_App_HasilRequestRead $r,$session, $data) { 
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_api_read', 
                                            1,
                                            1,
                                            'cashier_vocherdepartment'
                                           );

        if (!empty($hasil)) {
            return $hasil;
        } else {
            return false;
        }
    }

    public function getAPI_token(Box_Models_App_HasilRequestRead $r,$session, $data) { 
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_api_read', 
                                            1,
                                            1,
                                            'cashier_token'
                                           );

        if (!empty($hasil)) {
            return $hasil;
        } else {
            return false;
        }
    }

    public function getLastProcess(Box_Models_App_HasilRequestRead $r,$session, $data) { 
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_klaim_pfams_total_read', 
                                            $data['project_id'],
                                            $data['pt_id']
                                           );

        if (!empty($hasil)) {
            return $hasil;
        } else {
            return false;
        }
    }

    public function processFams(Box_Models_App_HasilRequestRead $r,$session, $data, $item) { 
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_klaim_pfams_update', 
                                            $session->getuserId(),
                                            $data['project_id'],
                                            $data['pt_id'],
                                            $item['klaimpengobatan_kacamata_id'],
                                            $item['jenispengobatan_id'],
                                            $item['employee_id'],
                                            $data['voucher_no'],
                                            $data['uploaduniquenumber']
                                           );

        if (!empty($hasil)) {
            return $hasil;
        } else {
            return false;
        }
    }

    public function getAllPfams_voucherno(Box_Models_App_HasilRequestRead $r,$session, $data) {    
        
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_klaim_pfams_deleted_read', 
                                            $r->getPage(), 
                                            $r->getLimit(),
                                            $data['project_id'],
                                            $data['pt_id'],
                                            $data['voucher_no']
                                           );
        if (!empty($hasil)) {
            return $hasil;
        } else {
            return false;
        }
    }

    public function deleteFams(Box_Models_App_HasilRequestRead $r,$session, $data, $item, $item_param) { 
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_klaim_pfams_deleted_update', 
                                            $session->getuserId(),
                                            $data['project_id'],
                                            $data['pt_id'],
                                            $item_param['klaimpengobatan_kacamata_id'],
                                            $item_param['jenispengobatan_id'],
                                            $item_param['employee_id'],
                                            $data['voucher_no'],
                                            $item,
                                            $data['description']
                                           );

        if (!empty($hasil)) {
            return $hasil;
        } else {
            return false;
        }
    }

    
    public function paidFams() { 
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_klaim_pfams_paid_update'
                                           );

        if (!empty($hasil)) {
            return $hasil;
        } else {
            return false;
        }
    }
    
    
    
}

?>
