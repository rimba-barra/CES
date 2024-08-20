<?php


/**
 * Description of TrainingDao
 *
 * @author MIS
 */
class Hrd_Models_Training_TrainingDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole , Hrd_Models_App_CodeChecked {
    public function save(Hrd_Models_Training_Training $d,$decanDate) {
        $hasil = 0;

       // var_dump($decanDate->getDCResult());
     
        
        $dcResult = $d->getDCResult();
        $dcResultDate = $decanDate->getDCResult();
        if(count($dcResult) > 0){
            $hasil = $this->dbTable->SPUpdate('sp_registertraining_create',$d->getAddBy(),$d->getProject()->getId(),
                $d->getPt()->getId(),$d->getSchedule()->getId(),$d->getEffectiveDate(),
                $dcResult["trainingdetail_id"],
                $dcResult["employee_employee_id"],
                $dcResult["certificate"],
                $dcResult["training_status"],
                $dcResult["point"],
                $dcResult["duration"],
                $dcResult["grade"],
                    $dcResultDate["trainingdetail_trainingdetail_id"], 
                    $dcResultDate["date"]
                ); 
        }else{
            $hasil = $this->dbTable->SPUpdate('sp_registertraining_create',$d->getAddBy(),$d->getProject()->getId(),
                $d->getPt()->getId(),$d->getSchedule()->getId(),$d->getEffectiveDate()); 
        }
        
     
             
        return $hasil;
    }
    
    public function getAll(Box_Models_App_HasilRequestRead $r,  Hrd_Models_Training_Training $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_registertraining_read',$d->getProject()->getId(),$d->getPt()->getId(),$r->getPage(), $r->getLimit());
        //var_dump($hasil);
        return $hasil;
    }
    
    public function getDetail(Box_Models_App_HasilRequestRead $r, Hrd_Models_Training_TrainingDetail $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_registertrainingdetail_read',$d->getTraining()->getId(),$r->getPage(), $r->getLimit());
        return $hasil;
    }
    
    public function getDetailDate(Box_Models_App_HasilRequestRead $r, Hrd_Models_Training_DetailDate $d){
        //sp_registertrainingdate_read
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_registertrainingdate_read',$d->getTrainingDetail()->getId(),$r->getPage(), $r->getLimit());
        return $hasil;
    }
    
    // get all without page limit *special for combobox
    public function getAllWoP(Hrd_Models_Training_Training $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_registertraining_read', 1,500,$d->getProject()->getId(),$d->getPt()->getId(),$d->getCode());
        return $hasil;
    }
    
    public function getDetailByEmployee($employeeId){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_programtrainingbyemployee_read',$employeeId);
        return $hasil;
    }

    public function update(Hrd_Models_Training_Training $em,Erems_Box_Models_App_Decan $decan) {
        $hasil = 0;
        if ($em->getId() == 0) {
            return $hasil;
        }
        $dcResult = $em->getDCResult();
        if(count($dcResult) > 0){
            $hasil = $this->dbTable->SPUpdate('sp_registertraining_update', $em->getAddBy(), $em->getId(), 
                $em->getSchedule()->getId(),$em->getEffectiveDate(),$decan->getString(),
                $dcResult["trainingdetail_id"],
                $dcResult["employee_employee_id"],
                $dcResult["certificate"],
                $dcResult["training_status"],
                $dcResult["point"],
                $dcResult["duration"],
                $dcResult["grade"]);
        }else{
          $hasil = $this->dbTable->SPUpdate('sp_registertraining_update', $em->getAddBy(), $em->getId(), 
                $em->getSchedule()->getId(),$em->getEffectiveDate(),$decan->getString());  
        }
        
        return $hasil;
    }
    
    //
    public function updateHadir($ids,$isHadir,Box_Models_App_Session $ses,$trainingDetailId) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_registertraininghadir_update',$ses->getUser()->getId(),$ids,$isHadir,$trainingDetailId);  
        
        return $hasil;
    }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_registertraining_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }

    public function codeExist($object) {
        $hasil = 0;
        if($object instanceof Hrd_Models_Training_Training){
             $hasil = $this->dbTable->SPExecute('sp_registertrainingexist_read', $object->getSchedule()->getId(),$object->getProject()->getId(),$object->getPt()->getId());

        }
       
        return $hasil;
    }
}

?>
