<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of PlafonKaryawanDao
 *
 * @author MIS
 */
class Hrd_Models_Parameterclaim_ParameterclaimDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {
    public function save(Hrd_Models_Parameterclaim_Parameterclaim $d,  Box_Models_App_Session $ses) {
        $hasil = 0;
        
       // $details = $d->getDCResult();
        print_r('a');die();
        
        $hasil = $this->dbTable->SPUpdate('sp_plafonkaryawan_create', $ses->getUser()->getId(),
                $ses->getProject()->getId(),
                $ses->getPt()->getId(),
                $d->getEmployee()->getId(),
                $d->getYear(),
                $d->getYearlyGlobal(),
                $d->getYearlyObat(),
                $d->getYearlyDokter(),
                $d->getYearlyGigi(),
                $d->getYearlyLab(),
                $d->getRawatInap(),
                $d->getPersalinanNormal(),
                $d->getPersalinanAbnormal(),
                $d->getKehamilan(),
                $d->getKeluargaBerencana(),
                $d->getCheckUp(),
                $d->getLensa(),
                $d->getFrame(),
                $d->getLainLain(),
                $d->getIsGlobal()
                );
        
        
       
        
        return $hasil;
    }

    public function proses_saveParam(\Box_Kouti_InterSession $session, Hrd_Models_Parameterclaim_Parameterclaim $d, $data){
        $hasil = 0;

        $temp_groupId = explode('~', $data["ids_groupId"]);
        $temp_groupMin = explode('~', $data["ids_groupMin"]);
        $temp_groupFreq = explode('~', $data["ids_groupFreq"]);
        $temp_groupMinSpecial = explode('~', $data["ids_groupMinSpecial"]);
        $temp_groupFreqSpecial = explode('~', $data["ids_groupFreqSpecial"]);

        if($data["parameterjenispengobatan_id"]){
            $hasil = $this->dbTable->SPUpdate('sp_parameterclaim_update',
                    $session->getUserId(),
                    $data["parameterjenispengobatan_id"],
                    $d->getProject()->getId(),
                    $d->getPt()->getId(),
                    $data["masterjenispengobatan_id"],
                    $data["sex"],
                    $data["employeestatus_id"],
                    $data["claimbasedon_id"],
                    $data["claimupdate_id"],
                    $data["min_workingmonth"],
                    $data["maxclaim"]
                    ); 

                    foreach($temp_groupId as $key => $item){
                        if($item){
                            if($temp_groupMin[$key] == 'undefined'){
                                $temp_groupMin[$key] = 0;
                            }
                            if($temp_groupFreq[$key] == 'undefined'){
                                $temp_groupFreq[$key] = 0;
                            }
                            if($temp_groupMinSpecial[$key] == 'undefined'){
                                $temp_groupMinSpecial[$key] = 0;
                            }
                            if($temp_groupFreqSpecial[$key] == 'undefined'){
                                $temp_groupFreqSpecial[$key] = 0;
                            }

                            $hasil_group = $this->dbTable->SPUpdate('sp_parameterjenispengobatan_golongan_update',
                                            $session->getUserId(),
                                            $data["parameterjenispengobatan_id"],
                                            $item,
                                            $temp_groupMin[$key],
                                            $temp_groupFreq[$key],
                                            $temp_groupMinSpecial[$key],
                                            $temp_groupFreqSpecial[$key]
                                            );
                        }
                    }
               
            
        }else{

            $hasil = $this->dbTable->SPUpdate('sp_parameterclaim_create',
                    $session->getUserId(),
                    $d->getProject()->getId(),
                    $d->getPt()->getId(),
                    $data["masterjenispengobatan_id"],
                    $data["sex"],
                    $data["employeestatus_id"],
                    $data["claimbasedon_id"],
                    $data["claimupdate_id"],
                    $data["min_workingmonth"],
                    $data["maxclaim"]
                    );

                    foreach($temp_groupId as $key => $item){
                        if($item){
                            if($temp_groupMin[$key] == 'undefined'){
                                $temp_groupMin[$key] = 0;
                            }
                            if($temp_groupFreq[$key] == 'undefined'){
                                $temp_groupFreq[$key] = 0;
                            }
                            if($temp_groupMinSpecial[$key] == 'undefined'){
                                $temp_groupMinSpecial[$key] = 0;
                            }
                            if($temp_groupFreqSpecial[$key] == 'undefined'){
                                $temp_groupFreqSpecial[$key] = 0;
                            }
                            
                            $hasil_group = $this->dbTable->SPUpdate('sp_parameterjenispengobatan_golongan_create',
                                            $session->getUserId(),
                                            $hasil,
                                            $item,
                                            $temp_groupMin[$key],
                                            $temp_groupFreq[$key],
                                            $temp_groupMinSpecial[$key],
                                            $temp_groupFreqSpecial[$key]
                                            );
                        }
                    }
        }
        
        return $hasil;
    }
    
    public function saveGen(Box_Models_App_Session $ses,Box_Models_App_DecanForObject $decan,$arData) {
        $hasil = 0;
        
        var_dump($decan->getDCResult());
        
        die();
        
        $data = $decan->getDCResult();
        $hasil = $this->dbTable->SPUpdate('sp_plafonkaryawangenerate_create',
                $ses->getUser()->getId(),
                $ses->getProject()->getId(),
                $ses->getPt()->getId()
                
                );
       
             
        
        return $hasil;
    }
    
    public function getByEmployee(Hrd_Models_Parameterclaim_Parameterclaim $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_plafonkaryawanone_read',$d->getEmployee()->getId(),$d->getProject()->getId(),$d->getPt()->getId(),$d->getYear());
        return $hasil;
    }

    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Parameterclaim_Parameterclaim $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_parameterclaim_read', 
                                            $d->getProject()->getId(), 
                                            $d->getPt()->getId(), 
                                            $r->getPage(), 
                                            $r->getLimit());

        return $hasil;
    }
    
    public function getAllWOPL(Hrd_Models_Parameterclaim_Parameterclaim $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_plafonkaryawanb_read',1,99999,$d->getProject()->getId(),$d->getPt()->getId());
        return $hasil;
    }
    
    public function getAllByYear(Box_Models_App_HasilRequestRead $r, Hrd_Models_Parameterclaim_Parameterclaim $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_plafonkaryawanbyyear_read',$d->getProject()->getId(),$d->getPt()->getId(), $d->getYear());
        return $hasil;
    }

    public function getAllClaimBasedOn($data) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_parameterclaim_basedon_read',1,9999);

        return $hasil;
    }

    public function getAllClaimUpdate($data) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_parameterclaim_update_read',1,9999);
        
        return $hasil;
    }

    public function getAllJenisPengobatan(Hrd_Models_Parameterclaim_Parameterclaim $d, $data) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute(
            'sp_parameterjenispengobatan_golongan_read',
            $data['parameterjenispengobatan_id'],
            $d->getProject()->getId(), 
            $d->getPt()->getId(), 
            1,
            9999
            );
        return $hasil;
    }

    
    
    //sp_plafonkaryawanbyyear_read
    
    public function checkExist(Hrd_Models_Parameterclaim_Parameterclaim $d){
        //
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_plafonpengobatanexist_read',$d->getYear(),$d->getEmployeeGroup()->getId(),$d->getType()->getId());
        return $hasil;
    }
    
    public function getYears(Box_Models_App_Session $ses){
        //
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_plafonkaryawanyear_read',$ses->getProject()->getId(),$ses->getPt()->getId(),1,999);
        return $hasil;
        
        /*
         $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_plafonpengobatanallyear_read',1,100,$ses->getProject()->getId(),$ses->getPt()->getId());
        return $hasil;

                  */
    }
    
    
    public function copyfromold(Box_Models_App_Session $ses) {
        $hasil = 0;
       

        $hasil = $this->dbTable->SPUpdate('sp_plafonpengobatancopy_create',$ses->getUser()->getId(),$ses->getProject()->getId(),$ses->getPt()->getId());
        return $hasil;
    }
   

    public function update(Hrd_Models_Parameterclaim_Parameterclaim $d) {
        $hasil = 0;
        if ($d->getId() == 0) {
            return $hasil;
        }

        $hasil = $this->dbTable->SPUpdate('sp_plafonkaryawan_update', $d->getAddBy(), $d->getId(),$d->getYear(),$d->getStartDate(),$d->getEndDate(),$d->getEmployeeGroup()->getId(),$d->getType()->getId(),$d->getValue());
        return $hasil;
    }
    
    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_plafonkaryawan_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }    
}

?>
