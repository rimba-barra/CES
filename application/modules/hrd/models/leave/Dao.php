<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Dao
 *
 * @author MIS
 */
class Hrd_Models_Leave_Dao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole{
    public function save(Hrd_Models_Leave_Leave $d,$dates,$hasilJatahCuti,$jatahCutiKaryawan) {
        $hasil = 0;
        
      
        
        if(count($hasilJatahCuti) == 0){
            $hasilJatahCuti["rest"] = "";
            $hasilJatahCuti["leaveentitlements_id"] = "";
        }
        
        //added by michael 2022-06-08 karena cuti bersama dari Bu Shirley mau supaya bisa dipotong cuti tahunan/cuti besar, soalnya dulu cuma cuti tahunan aja
        if($d->getDari() && $d->getDari() == 'cutibersama'){
            $d->getAbsentType()->setId('99');
        }
     
        $hasil = $this->dbTable->SPUpdate('sp_leave_create',$d->getAddBy(),
                $d->getStartDate(),$d->getEndDate(),$d->getAbsentType()->getId(),
                $d->getEmployee()->getId(),$d->getProject()->getId(),$d->getPt()->getId(),
                $d->getNote(),$dates,$d->getDuration(),$d->getIsHalfDay(),
                $hasilJatahCuti["leaveentitlements_id"],
                $hasilJatahCuti["rest"],
                $jatahCutiKaryawan,
		$d->getDescription()

		);      
        
        #var_dump($this->dbTable);exit;
        return $hasil;
    }
    
    #addby wulan sari 2020 12 29     
    public function save2(Hrd_Models_Leave_Leave $d,$dates,$hasilJatahCuti,$jatahCutiKaryawan) {
        $hasil = 0;
        
      
        
        if(count($hasilJatahCuti) == 0){
            $hasilJatahCuti["rest"] = "";
            $hasilJatahCuti["leaveentitlements_id"] = "";
        }
        
        
  
     
        $hasil = $this->dbTable->SPUpdate('sp_leave_cutibersama2_create',$d->getAddBy(),
                $d->getStartDate(),$d->getEndDate(),$d->getAbsentType()->getId(),
                $d->getEmployee()->getId(),$d->getProject()->getId(),$d->getPt()->getId(),
                $d->getNote(),$dates,$d->getDuration(),$d->getIsHalfDay(),
                $hasilJatahCuti["leaveentitlements_id"],
                $hasilJatahCuti["rest"],
                $jatahCutiKaryawan,
		$d->getDescription()

		);      
        
        #var_dump($this->dbTable);exit;
        return $hasil;
    }
    
    //* Simpan dengan id hak cuti yang sudah di definisikan 
    //@param $hakcutiAmount = jumlah pengurang hak cuti */
    public function saveWithDefinedLeaveEnt(Hrd_Models_Leave_Leave $d,$dates,$hakCutiBerkurang,$hakCutiAmount) {
        $hasil = 0;

     
        $hasil = $this->dbTable->SPUpdate('sp_leave_defined_hakcuti_create',$d->getAddBy(),
                $d->getStartDate(),$d->getEndDate(),$d->getAbsentType()->getId(),
                $d->getEmployee()->getId(),$d->getProject()->getId(),$d->getPt()->getId(),
                $d->getNote(),$dates,$d->getDuration(),$d->getIsHalfDay(),
                $hakCutiBerkurang["id"],$hakCutiBerkurang["rest"],$hakCutiAmount);      
        
      
        return $hasil;
    }
    
    /* CUTI yang tidak potong hak cuti */
    public function saveTanpaUpdateHakCuti(Hrd_Models_Leave_Leave $d,$dates) {
        $hasil = 0;
        
       $hasilJatahCuti = array("rest"=>"","leaveentitlements_id"=>"");
     
        $hasil = $this->dbTable->SPUpdate('sp_leave_create',$d->getAddBy(),
                $d->getStartDate(),$d->getEndDate(),$d->getAbsentType()->getId(),
                $d->getEmployee()->getId(),$d->getProject()->getId(),$d->getPt()->getId(),
                $d->getNote(),$dates,$d->getDuration(),$d->getIsHalfDay(),
                "",
                "");      
        
      
        return $hasil;
    }
    
    public function saveProses($cutis = array(),$jatahCutis = array(),$karyawans = array()) {
        $hasil = 0;
        
     
        $hasil = $this->dbTable->SPUpdate('sp_leave_proses',
                $jatahCutis["leaveentitlements_id"],$jatahCutis["rest"],
                $cutis["leave_id"],$cutis["bind"],
                $karyawans["employee_id"],$karyawans["sisa"]);      
      
        return $hasil;
    }
    
    
    public function saveCutiBersama($project,$pt,$leaveGroup,$leave,$listAbsentRecord,$listHakCuti,$listTransaksiCuti) {
        $hasil = 0;
        
  
   
       
     
        $hasil = $this->dbTable->SPUpdate('sp_leave_cutibersamab_create',
                $leave->getAddBy(),
                $project,$pt,$leaveGroup,
                $listAbsentRecord["date"],
                $listAbsentRecord["absenttype_code"],
                $listAbsentRecord["absent_employee_id"],
                $listAbsentRecord["description"],
                $listHakCuti["employee_employee_id"],
                $listHakCuti["start_use"],
                $listHakCuti["rest"],
                $listTransaksiCuti["start_date"],
                $listTransaksiCuti["end_date"],
                $listTransaksiCuti["note"],
                $listTransaksiCuti["duration"],
                $listTransaksiCuti["employee_employee_id"],
                $listTransaksiCuti["absenttype_code"]
                ); 
        
     
      
        return $hasil;
    }
    
    public function saveKadaluarsa($cutis = array(),$jatahCutis = array(),$karyawans = array()) {
        $hasil = 0;
        
     
        $hasil = $this->dbTable->SPUpdate('sp_leave_proses',
                $jatahCutis["leaveentitlements_id"],$jatahCutis["rest"],
                $cutis["leave_id"],$cutis["bind"],
                $karyawans["employee_id"],$karyawans["sisa"]);      
      
        return $hasil;
    }
    
    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Leave_Leave $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_leave_read', $r->getPage(), $r->getLimit(),$d->getProject()->getId(),$d->getPt()->getId());
  
        return $hasil;
    }
    
    public function getAllByEmployeeWOPL(Hrd_Models_Leave_Leave $d){
        $hasil = 0;
        
      
        $hasil = $this->dbTable->SPExecute('sp_leave_read',1,9999,$d->getProject()->getId(),$d->getPt()->getId(),$d->getId(),$d->getEmployee()->getId());
  
        return $hasil;
    }
    
    public function getAllWOPL(Hrd_Models_Leave_Leave $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_leave_read',1,9999,$d->getProject()->getId(),$d->getPt()->getId(),$d->getId(),$d->getEmployee()->getId());
  
        return $hasil;
    }
    
    public function getAllCutiWOPL(Hrd_Models_Leave_Leave $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_leavekhususcuti_read',1,9999,$d->getProject()->getId(),$d->getPt()->getId(),  Box_Config::ABSENTTYPEGROUP_LEAVE,$d->getId(),$d->getEmployee()->getId());
  
        return $hasil;
    }
    
    public function getDetail(Hrd_Models_Leave_Leave $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_leavedetail_read',$d->getId());
        return $hasil;
    }

    public function update(Hrd_Models_Leave_Leave $em) {
        $hasil = 0;
        if ($em->getId() == 0) {
            return $hasil;
        }
        
        $oldRecord = NULL;
        $oldRecord = $this->getDetail($em);
        $oldLeave = new Hrd_Models_Leave_Leave();
        $oldLeave->setArrayTable($oldRecord[0][0]);
        $oldDayList = Hrd_Models_App_Tools::getDayList($oldLeave->getStartDate(),$oldLeave->getEndDate());
        $dayList = Hrd_Models_App_Tools::getDayList($em->getStartDate(),$em->getEndDate());
 
        $hasil = $this->dbTable->SPUpdate('sp_leave_update', $em->getAddBy(), $em->getId(),$em->getStartDate(),$em->getEndDate(),$em->getAbsentType()->getId(),$em->getEmployee()->getId(),$em->getNote(),$dayList[1][0],$dayList[1][1],$oldDayList[1][0],$oldDayList[1][1],$em->getDuration(),$em->getIsHalfDay(),$em->getDescription());
        
   
        
        return $hasil;
    }

    public function delete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session,  Hrd_Models_Leave_LeaveEntitlement $le) {
        $row = 0;
        
        $ar = explode("~",$decan->getString());

        foreach($ar as $id){
            if(intval($id) != 0){
                $oldRecord = NULL;
                $oldLeave = new Hrd_Models_Leave_Leave();
                $oldLeave->setId($id);
                $oldRecord = $this->getDetail($oldLeave);
                $oldLeave = new Hrd_Models_Leave_Leave();
                $oldLeave->setArrayTable($oldRecord[0][0]);
                $oldDayList = Hrd_Models_App_Tools::getDayList($oldLeave->getStartDate(),$oldLeave->getEndDate());
                $row = $this->dbTable->SPUpdate('sp_leave_destroy',$id, $session->getUserId(),$oldDayList[1][0],$oldDayList[1][1],
                        $le->getRest(),$le->getId());
                
          
            }
        }
        
        return $row;
       
    }  
    
    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        
        $ar = explode("~",$decan->getString());

        foreach($ar as $id){
            if(intval($id) != 0){
                $oldRecord = NULL;
                $oldLeave = new Hrd_Models_Leave_Leave();
                $oldLeave->setId($id);
                $oldRecord = $this->getDetail($oldLeave);
                $oldLeave = new Hrd_Models_Leave_Leave();
                $oldLeave->setArrayTable($oldRecord[0][0]);
                $oldDayList = Hrd_Models_App_Tools::getDayList($oldLeave->getStartDate(),$oldLeave->getEndDate());
                $row = $this->dbTable->SPUpdate('sp_leave_destroy',$id, $session->getUserId(),$oldDayList[1][0],$oldDayList[1][1]
                       );
            }
        }
        
        return $row;
       
    }  
    
    public function recalculateGetAllCuti(Hrd_Models_Leave_Leave $d) {
        $hasil = 0;

        $hasil = $this->dbTable->SPExecute('sp_recalculateleave_read',$d->getProject()->getId(),$d->getPt()->getId(),$d->getEmployee()->getId());

      
        return $hasil;
    }
    
    public function getAllEmployeeWithLeaveQuota(Box_Models_App_HasilRequestRead $r, Hrd_Models_Master_EmployeePersonal $em) {
        $hasil = 0;

        $hasil = $this->dbTable->SPExecute('sp_employeeleavequota_read', $r->getPage(), $r->getLimit(), $em->getProject()->getId(), $em->getPt()->getId(), $em->getName(), $em->getNik(), $em->getDepartment()->getId(),1);

      
        return $hasil;
    }
    
    
    // edit by wulan sari 20190731
    public function getCekDateLeave(Hrd_Models_Leave_Leave $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_absentdetail_cekdateleave',$d->getEmployee()->getId(),$d->getStartDate(),$d->getEndDate(),$d->getIsHalfDay());
        //var_dump($this->dbTable);
        return $hasil;
    }
//put your code here
    
    //added by anas 06122021
    public function saveKompensansiEL(Hrd_Models_Leave_Leave $d,$dates,$hasilJatahCuti,$jatahCutiKaryawan) {
        $hasil = 0;
        
        if(count($hasilJatahCuti) == 0){
            $hasilJatahCuti["rest"] = "";
            $hasilJatahCuti["leaveentitlements_id"] = "";
        }  
        
        $hasil = $this->dbTable->SPUpdate('sp_kompensasi_extraleave_update',$d->getAddBy(),
                $d->getStartDate(),$d->getEndDate(),$d->getAbsentType()->getId(),
                $d->getEmployee()->getId(),$d->getProject()->getId(),$d->getPt()->getId(),
                $d->getNote(),$dates,$d->getDuration(),$d->getIsHalfDay(),
                $hasilJatahCuti["leaveentitlements_id"],
                $hasilJatahCuti["rest"],
                $jatahCutiKaryawan,
                $d->getDescription()
        );      
        
        return $hasil;
    }
    
    //added by anas 06122021
    public function getAllByEmployeeExtraLeave(Hrd_Models_Leave_LeaveEntitlement $d, $startdate, $enddate){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_kompensasi_extraleave_read', $d->getProject()->getId(),$d->getPt()->getId(),1,9999,$d->getEmployee()->getId(),$d->getId(), $startdate, $enddate);
        return $hasil;
    }

    //added by anas 08122021
    public function deleteKompensasiExtraLeave(Box_Models_App_Decan $decan, Box_Kouti_InterSession $session){
        $hasil = 0;

        $hasil = $this->dbTable->SPUpdate('sp_kompensasi_extraleave_destroy',$session->getUserId(), $decan->getString());
        return $hasil;
    }

    //added by michael 20220614 | untuk keperluan Cuti Hotel
    public function getAllParameterTerbit(Box_Models_App_HasilRequestRead $r, Hrd_Models_Leave_ParamCuti $d, $data){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_parametercuti_terbit_read',
                                            1,
                                            9999);
        return $hasil;
    }

    public function getAllParameterExpired(Box_Models_App_HasilRequestRead $r, Hrd_Models_Leave_ParamCutiExpired $d, $data){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_parametercuti_expired_read',
                                            1,
                                            9999);
        return $hasil;
    }

    public function getDetailParameter(Box_Models_App_HasilRequestRead $r, Hrd_Models_Leave_ParamCutiDetail $d, $data){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_parametercuti_read',
                                            $d->getProject()->getId(),
                                            $d->getPt()->getId(),
                                            1,
                                            9999);
        return $hasil;
    }

    public function proses_saveParam(\Box_Kouti_InterSession $session, Hrd_Models_Leave_ParamCutiDetail $d, $data){
        $hasil = 0;

        $temp_bandingId = explode('~', $data["ids_bandingId"]);
        $temp_bandingLeave = explode('~', $data["ids_bandingLeave"]);
        $temp_bandingIdContract = explode('~', $data["ids_bandingIdContract"]);
        $temp_bandingLeaveContract = explode('~', $data["ids_bandingLeaveContract"]);

        if($data["parametercuti_id"]){
            $hasil = $this->dbTable->SPUpdate('sp_parametercuti_update',
                    $session->getUserId(),
                    $data["parametercuti_id"],
                    $d->getProject()->getId(),
                    $d->getPt()->getId(),
                    $data["opsiparam"],
                    $data["parametercuti_terbit_id"],
                    $data["parametercuti_expired_id"],
                    $data["expired_sampai"],
                    $data["is_sama"]
                    ); 

            if($data["opsiparam"] == 2){
                if($data["is_sama"] == 'true'){
                    foreach($temp_bandingId as $key => $item){
                        if($item){
                            $hasil_banding = $this->dbTable->SPUpdate('sp_parametercuti_permanent_banding_update',
                                            $session->getUserId(),
                                            $data["parametercuti_id"],
                                            $item,
                                            $temp_bandingLeave[$key]
                                            );
                            $hasil_banding_contract = $this->dbTable->SPUpdate('sp_parametercuti_contract_banding_update',
                                                    $session->getUserId(),
                                                    $data["parametercuti_id"],
                                                    $item,
                                                    $temp_bandingLeave[$key]
                                                    );
                        }
                    }
                }else{
                    foreach($temp_bandingId as $key => $item){
                        if($item){
                            $hasil_banding = $this->dbTable->SPUpdate('sp_parametercuti_permanent_banding_update',
                                            $session->getUserId(),
                                            $data["parametercuti_id"],
                                            $item,
                                            $temp_bandingLeave[$key]
                                            );
                        }
                    }
                    foreach($temp_bandingIdContract as $key_contract => $item_contract){
                        if($item_contract){
                            $hasil_banding_contract = $this->dbTable->SPUpdate('sp_parametercuti_contract_banding_update',
                                                    $session->getUserId(),
                                                    $data["parametercuti_id"],
                                                    $item_contract,
                                                    $temp_bandingLeaveContract[$key_contract]
                                                    );
                        }
                    }
                }
            }else{

                foreach($temp_bandingId as $key => $item){
                        if($item){
                            $hasil_banding = $this->dbTable->SPUpdate('sp_parametercuti_permanent_banding_destroy',$session->getUserId(), $data["parametercuti_id"], $item);
                        }
                    }
                    foreach($temp_bandingIdContract as $key_contract => $item_contract){
                        if($item_contract){
                            $hasil_banding_contract = $this->dbTable->SPUpdate('sp_parametercuti_contract_banding_destroy',$session->getUserId(), $data["parametercuti_id"], $item_contract);
                        }
                    }
            }
        }else{

            $hasil = $this->dbTable->SPUpdate('sp_parametercuti_create',
                    $session->getUserId(),
                    $d->getProject()->getId(),
                    $d->getPt()->getId(),
                    $data["opsiparam"],
                    $data["parametercuti_terbit_id"],
                    $data["parametercuti_expired_id"],
                    $data["expired_sampai"],
                    $data["is_sama"]
                    );

            if($data["opsiparam"] == 2){
                if($data["is_sama"] == 'true'){
                    foreach($temp_bandingId as $key => $item){
                        if($item){
                            $hasil_banding = $this->dbTable->SPUpdate('sp_parametercuti_permanent_banding_create',
                                            $session->getUserId(),
                                            $hasil,
                                            $item,
                                            $temp_bandingLeave[$key]
                                            );
                            $hasil_banding_contract = $this->dbTable->SPUpdate('sp_parametercuti_contract_banding_create',
                                                    $session->getUserId(),
                                                    $hasil,
                                                    $item,
                                                    $temp_bandingLeave[$key]
                                                    );
                        }
                    }
                }else{
                    foreach($temp_bandingId as $key => $item){
                        if($item){
                            $hasil_banding = $this->dbTable->SPUpdate('sp_parametercuti_permanent_banding_create',
                                            $session->getUserId(),
                                            $hasil,
                                            $item,
                                            $temp_bandingLeave[$key]
                                            );
                        }
                    }
                    foreach($temp_bandingIdContract as $key_contract => $item_contract){
                        if($item_contract){
                            $hasil_banding_contract = $this->dbTable->SPUpdate('sp_parametercuti_contract_banding_create',
                                                    $session->getUserId(),
                                                    $hasil,
                                                    $item_contract,
                                                    $temp_bandingLeaveContract[$key_contract]
                                                    );
                        }
                    }
                }
            }

        }
        
        return $hasil;
    }

    //---

    public function getAllParameterTerbitPh(Box_Models_App_HasilRequestRead $r, Hrd_Models_Leave_ParamCutiPh $d, $data){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_parametercutiph_terbit_read',
                                            1,
                                            9999);
        return $hasil;
    }

    public function getAllParameterExpiredPh(Box_Models_App_HasilRequestRead $r, Hrd_Models_Leave_ParamCutiPhExpired $d, $data){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_parametercutiph_expired_read',
                                            1,
                                            9999);
        return $hasil;
    }

    public function getDetailParameterPh(Box_Models_App_HasilRequestRead $r, Hrd_Models_Leave_ParamCutiPhDetail $d, $data){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_parametercutiph_read',
                                            $d->getProject()->getId(),
                                            $d->getPt()->getId(),
                                            1,
                                            9999);
        return $hasil;
    }

    public function proses_saveParamPh(\Box_Kouti_InterSession $session, Hrd_Models_Leave_ParamCutiPhDetail $d, $data){
        $hasil = 0;

        $temp_bandingId = explode('~', $data["ids_bandingId"]);
        $temp_bandingLeave = explode('~', $data["ids_bandingLeave"]);
        $temp_bandingIdContract = explode('~', $data["ids_bandingIdContract"]);
        $temp_bandingLeaveContract = explode('~', $data["ids_bandingLeaveContract"]);
        $temp_holidayId = explode('~', $data["ids_holidayId"]);
        $temp_holiday = explode('~', $data["ids_holiday"]);
        $temp_bandingspecialId = explode('~', $data["ids_bandingspecialId"]);
        $temp_holidayspecialId = explode('~', $data["ids_holidayspecialId"]);
        $temp_bandingspecialLeave = explode('~', $data["ids_bandingspecialLeave"]);
        $temp_bandingspecialIdContract = explode('~', $data["ids_bandingspecialIdContract"]);
        $temp_holidayspecialIdContract = explode('~', $data["ids_holidayspecialIdContract"]);
        $temp_bandingspecialLeaveContract = explode('~', $data["ids_bandingspecialLeaveContract"]);

        if($data["parametercutiph_id"]){
            $hasil = $this->dbTable->SPUpdate('sp_parametercutiph_update',
                    $session->getUserId(),
                    $data["parametercutiph_id"],
                    $d->getProject()->getId(),
                    $d->getPt()->getId(),
                    $data["opsiparamph"],
                    $data["parametercutiph_terbit_id"],
                    $data["parametercutiph_expired_id"],
                    $data["expired_sampai_ph"],
                    $data["is_sama_ph"]
                    ); 

            if($data["opsiparamph"] == 2){
                foreach($temp_holidayId as $key_holiday => $item_holiday){
                        if($item_holiday){
                            $hasil_holidayname = $this->dbTable->SPUpdate('sp_parametercutiph_holidayname_update',
                                            $session->getUserId(),
                                            $data["parametercutiph_id"],
                                            $item_holiday,
                                            $temp_holiday[$key_holiday]
                                            );
                        }
                }
                if($data["is_sama_ph"] == 'true'){
                    foreach($temp_bandingId as $key => $item){
                        if($item){
                            if(empty($temp_bandingLeave[$key])){ $temp_bandingLeave[$key] = 0;}
                            $hasil_banding = $this->dbTable->SPUpdate('sp_parametercutiph_permanent_banding_update',
                                            $session->getUserId(),
                                            $data["parametercutiph_id"],
                                            $item,
                                            $temp_bandingLeave[$key]
                                            );
                            $hasil_banding_contract = $this->dbTable->SPUpdate('sp_parametercutiph_contract_banding_update',
                                                    $session->getUserId(),
                                                    $data["parametercutiph_id"],
                                                    $item,
                                                    $temp_bandingLeave[$key]
                                                    );
                        }
                    }

                    foreach($temp_bandingspecialId as $key_special => $item_special){
                        if($item_special){
                            if(empty($temp_bandingspecialLeave[$key_special])){ $temp_bandingspecialLeave[$key_special] = 0;}
                            $hasil_banding_special = $this->dbTable->SPUpdate('sp_parametercutiph_permanent_banding_holidayname_update',
                                            $session->getUserId(),
                                            $data["parametercutiph_id"],
                                            $item_special,
                                            $temp_holidayspecialId[$key_special],
                                            $temp_bandingspecialLeave[$key_special]
                                            );
                            $hasil_banding_special_contract = $this->dbTable->SPUpdate('sp_parametercutiph_contract_banding_holidayname_update',
                                                    $session->getUserId(),
                                                    $data["parametercutiph_id"],
                                                    $item_special,
                                                    $temp_holidayspecialId[$key_special],
                                                    $temp_bandingspecialLeave[$key_special]
                                                    );
                        }
                    }
                }else{
                    foreach($temp_bandingId as $key => $item){
                        if($item){
                            if(empty($temp_bandingLeave[$key])){ $temp_bandingLeave[$key] = 0;}
                            $hasil_banding = $this->dbTable->SPUpdate('sp_parametercutiph_permanent_banding_update',
                                            $session->getUserId(),
                                            $data["parametercutiph_id"],
                                            $item,
                                            $temp_bandingLeave[$key]
                                            );
                        }
                    }
                    foreach($temp_bandingIdContract as $key_contract => $item_contract){
                        if($item_contract){
                            if(empty($temp_bandingLeaveContract[$key_contract])){ $temp_bandingLeaveContract[$key_contract] = 0;}
                            $hasil_banding_contract = $this->dbTable->SPUpdate('sp_parametercutiph_contract_banding_update',
                                                    $session->getUserId(),
                                                    $data["parametercutiph_id"],
                                                    $item_contract,
                                                    $temp_bandingLeaveContract[$key_contract]
                                                    );
                        }
                    }

                    foreach($temp_bandingspecialId as $key_special => $item_special){
                        if($item_special){
                            if(empty($temp_bandingLeave[$key_special])){ $temp_bandingLeave[$key_special] = 0;}
                            $hasil_banding_special = $this->dbTable->SPUpdate('sp_parametercutiph_permanent_banding_holidayname_update',
                                            $session->getUserId(),
                                            $data["parametercutiph_id"],
                                            $item_special,
                                            $temp_holidayspecialId[$key_special],
                                            $temp_bandingspecialLeave[$key_special]
                                            );
                        }
                    }
                    
                    foreach($temp_bandingspecialIdContract as $key_contract_special => $item_contract_special){
                        if($item_contract_special){
                            if(empty($temp_bandingLeaveContract[$key_contract_special])){ $temp_bandingLeaveContract[$key_contract_special] = 0;}
                            $hasil_banding_contract_special = $this->dbTable->SPUpdate('sp_parametercutiph_contract_banding_holidayname_update',
                                                    $session->getUserId(),
                                                    $data["parametercutiph_id"],
                                                    $item_contract_special,
                                                    $temp_holidayspecialIdContract[$key_contract_special],
                                                    $temp_bandingspecialLeaveContract[$key_contract_special]
                                                    );
                        }
                    }
                }
            }else{

                foreach($temp_bandingId as $key => $item){
                        if($item){
                            $hasil_banding = $this->dbTable->SPUpdate('sp_parametercutiph_permanent_banding_destroy',$session->getUserId(), $data["parametercutiph_id"], $item);
                        }
                    }
                foreach($temp_bandingIdContract as $key_contract => $item_contract){
                        if($item_contract){
                            $hasil_banding_contract = $this->dbTable->SPUpdate('sp_parametercutiph_contract_banding_destroy',$session->getUserId(), $data["parametercutiph_id"], $item_contract);
                        }
                    }
                foreach($temp_holidayId as $key_holiday => $item_holiday){
                        if($item_holiday){
                            $hasil_holidayname = $this->dbTable->SPUpdate('sp_parametercutiph_holidayname_destroy',$session->getUserId(), $data["parametercutiph_id"], $item_holiday
                                            );
                        }
                }

                foreach($temp_bandingspecialId as $key_special => $item_special){
                        if($item_special){
                            $hasil_banding_special = $this->dbTable->SPUpdate('sp_parametercutiph_permanent_banding_holidayname_destroy',$session->getUserId(), $data["parametercutiph_id"], $item_special);
                        }
                    }
                foreach($temp_bandingspecialIdContract as $key_contract_special => $item_contract_special){
                        if($item_contract_special){
                            $hasil_banding_contract_special = $this->dbTable->SPUpdate('sp_parametercutiph_contract_banding_holidayname_destroy',$session->getUserId(), $data["parametercutiph_id"], $item_contract_special);
                        }
                    }
            }
        }else{

            $hasil = $this->dbTable->SPUpdate('sp_parametercutiph_create',
                    $session->getUserId(),
                    $d->getProject()->getId(),
                    $d->getPt()->getId(),
                    $data["opsiparamph"],
                    $data["parametercutiph_terbit_id"],
                    $data["parametercutiph_expired_id"],
                    $data["expired_sampai_ph"],
                    $data["is_sama_ph"]
                    );

            if($data["opsiparamph"] == 2){
                foreach($temp_holidayId as $key_holiday => $item_holiday){
                        if($item_holiday){
                            if(empty($temp_holiday[$key_holiday])){ $temp_holiday[$key_holiday] = false;}
                            $hasil_holidayname = $this->dbTable->SPUpdate('sp_parametercutiph_holidayname_create',
                                            $session->getUserId(),
                                            $hasil,
                                            $item_holiday,
                                            $temp_holiday[$key_holiday]
                                            );
                        }
                }
                if($data["is_sama_ph"] == 'true'){
                    foreach($temp_bandingId as $key => $item){
                        if($item){
                            if(empty($temp_bandingLeave[$key])){ $temp_bandingLeave[$key] = 0;}
                            $hasil_banding = $this->dbTable->SPUpdate('sp_parametercutiph_permanent_banding_create',
                                            $session->getUserId(),
                                            $hasil,
                                            $item,
                                            $temp_bandingLeave[$key]
                                            );
                            $hasil_banding_contract = $this->dbTable->SPUpdate('sp_parametercutiph_contract_banding_create',
                                                    $session->getUserId(),
                                                    $hasil,
                                                    $item,
                                                    $temp_bandingLeave[$key]
                                                    );
                        }
                    }

                    foreach($temp_bandingspecialId as $key_special => $item_special){
                        if($item_special){
                            if(empty($temp_bandingspecialLeave[$key_special])){ $temp_bandingspecialLeave[$key_special] = 0;}
                            $hasil_banding_special = $this->dbTable->SPUpdate('sp_parametercutiph_permanent_banding_holidayname_create',
                                            $session->getUserId(),
                                            $hasil,
                                            $item_special,
                                            $temp_holidayspecialId[$key_special],
                                            $temp_bandingspecialLeave[$key_special]
                                            );
                            $hasil_banding_special_contract = $this->dbTable->SPUpdate('sp_parametercutiph_contract_banding_holidayname_create',
                                                    $session->getUserId(),
                                                    $hasil,
                                                    $item_special,
                                                    $temp_holidayspecialId[$key_special],
                                                    $temp_bandingspecialLeave[$key_special]
                                                    );
                        }
                    }
                }else{
                    foreach($temp_bandingId as $key => $item){
                        if($item){
                            if(empty($temp_bandingLeave[$key])){ $temp_bandingLeave[$key] = 0;}
                            $hasil_banding = $this->dbTable->SPUpdate('sp_parametercutiph_permanent_banding_create',
                                            $session->getUserId(),
                                            $hasil,
                                            $item,
                                            $temp_bandingLeave[$key]
                                            );
                        }
                    }
                    
                    foreach($temp_bandingIdContract as $key_contract => $item_contract){
                        if($item_contract){
                            if(empty($temp_bandingLeaveContract[$key_contract])){ $temp_bandingLeaveContract[$key_contract] = 0;}
                            $hasil_banding_contract = $this->dbTable->SPUpdate('sp_parametercutiph_contract_banding_create',
                                                    $session->getUserId(),
                                                    $hasil,
                                                    $item_contract,
                                                    $temp_bandingLeaveContract[$key_contract]
                                                    );
                        }
                    }

                    foreach($temp_bandingspecialId as $key_special => $item_special){
                        if($item_special){
                            if(empty($temp_bandingspecialLeave[$key_special])){ $temp_bandingspecialLeave[$key_special] = 0;}
                            $hasil_banding_special = $this->dbTable->SPUpdate('sp_parametercutiph_permanent_banding_holidayname_create',
                                            $session->getUserId(),
                                            $hasil,
                                            $item_special,
                                            $temp_holidayspecialId[$key_special],
                                            $temp_bandingspecialLeave[$key_special]
                                            );
                        }
                    }
                    
                    foreach($temp_bandingspecialIdContract as $key_contract_special => $item_contract_special){
                        if($item_contract_special){
                            if(empty($temp_bandingspecialLeaveContract[$key_contract_special])){ $temp_bandingspecialLeaveContract[$key_contract_special] = 0;}
                            $hasil_banding_contract_special = $this->dbTable->SPUpdate('sp_parametercutiph_contract_banding_holidayname_create',
                                                    $session->getUserId(),
                                                    $hasil,
                                                    $item_contract_special,
                                                    $temp_holidayspecialIdContract[$key_contract_special],
                                                    $temp_bandingspecialLeaveContract[$key_contract_special]
                                                    );
                        }
                    }
                }
                    
            }

        }
        
        return $hasil;
    }

    public function getAllHoliday(Hrd_Models_Leave_ParamHoliday $d, $data){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_holidayname_read',
                                            1,
                                            9999);
        return $hasil;
    }

    public function getAllHolidayParam(Hrd_Models_Leave_ParamHoliday $d, $data){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_parametercutiph_holidayname_read',
                                            $data['parametercutiph_id'],
                                            1,
                                            9999);
        
        return $hasil;
    }
    

}

?>
