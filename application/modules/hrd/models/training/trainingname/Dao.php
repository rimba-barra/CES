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
class Hrd_Models_Training_Trainingname_Dao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {
    public function save(Hrd_Models_Training_Trainingname_Trainingname $d) {
        $hasil = 0;
        
            
        if($d->getId()){
            $this->update($d);
        }else{
            $hasil = $this->dbTable->SPUpdate('sp_trainingname_create',
                    $d->getAddBy(),
                    $d->getProject()->getId(),
                    $d->getPt()->getId(),
                    $d->getTrainingName(),
                    $d->getVendor(),
                    $d->getSkill(),
                    $d->getType(),
                    $d->getCertificate(),
                    $d->getTrainingCaptionId()
                    ); 
            
            return $hasil;
        }
    }
    
    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Training_Trainingname_Trainingname $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_trainingname_read',
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $d->getTrainingName(),
                $d->getVendor(),
                $d->getSkill(),
                $d->getType(),
                $d->getCertificate(),
                $d->getTrainingCaptionId(),
                $r->getPage(), $r->getLimit());
        return $hasil;
    }
    
    public function getAllWoPL(Hrd_Models_Training_Trainingname_Trainingname $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_trainingname_read',
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $d->getTrainingName(),
                $d->getVendor(),
                $d->getSkill(),
                $d->getType(),
                $d->getCertificate(),
                $d->getTrainingCaptionId(),1,99999);
        return $hasil;
    }

    public function gettrainingname(Hrd_Models_Training_Trainingname_Trainingname $d, $session, $data){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_trainingname_read',
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $d->getTrainingName(),
                $d->getVendor(),
                $d->getSkill(),
                $d->getType(),
                $d->getCertificate(),
                $d->getTrainingCaptionId(),1,99999);
        return $hasil;
    }

    public function copytrainingname(Hrd_Models_Training_Trainingname_Trainingname $d, $session, $data) {
        $hasil = 0;
        
        $hasil = $this->dbTable->SPUpdate('sp_trainingname_createcopy',
                $session->getUserId(),
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $data['trainingname'],
                $data['vendor'],
                $data['skill'],
                $data['type'],
                $data['certificate'],
                $data['trainingcaption_id'],
                $data['trainingname_id']
                ); 

        $get_detail = $this->dbTable->SPExecute('sp_trainingname_competencyexist_read',
                              $data['trainingname_id']);

        foreach($get_detail[0] as $key_detail => $item_detail){
            if($item_detail['competency_name_id']){
                $input_competencycopy = $this->dbTable->SPUpdate('sp_trainingname_competency_create',
                                        $hasil,
                                        $item_detail['competency_name_id']);
            }
        }

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
                    }
                }
                
            }
        }
        
        return $hasil;
    }

    public function getcompetencynames(Hrd_Models_Training_Trainingname_Trainingname $d, $session, $data){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute(
                    'sp_competencynames_read', 
                    1, 
                    9999,
                    '',
                    '',
                    '',
                    ''
                );
        return $hasil;
    }

    public function saveheader(Hrd_Models_Training_Trainingname_Trainingname $d, $session, $data){

        $hasil = 0;

        if($data['trainingname_id'] == '0'){
            
            $hasil = $this->dbTable->SPUpdate('sp_trainingname_create',
                    $session->getUserId(),
                    $d->getProject()->getId(),
                    $d->getPt()->getId(),
                    $data['trainingname'],
                    '',
                    '',
                    '',
                    '',
                    ''
                    ); 
        }else{

            $hasil = $this->dbTable->SPUpdate('sp_trainingname_update', 
                $session->getUserId(),
                $data['trainingname_id'],
                $data['trainingname'],
                '',
                '',
                '',
                '',
                '');
        }

        return $hasil;
    }
    
    public function processcompetencytrainingname(Hrd_Models_Training_Trainingname_Trainingname $d, $session, $data) {
        $hasil = 0;

        $trainingname_id = $data['trainingname_id'];

        if($trainingname_id == 0){
            $save = $this->saveheader($d,$session,$data);
            $trainingname_id = $save;
        }


        $ex_com = explode('~', $data['competency_name_id']);
        foreach($ex_com as $key => $item){
        $same = '';
            if($item){
                $get_detail = $this->dbTable->SPExecute('sp_trainingname_competencyexist_read',
                              $trainingname_id);

                if($get_detail[0]){
                    foreach($get_detail[0] as $key_detail => $item_detail){
                        if($item_detail['competency_name_id'] == $item){
                            $same=$item_detail['competency_name_id'];
                        }
                    }
                }

                if($same){
                    $hasil = $trainingname_id;
                }else{
                    $hasil = $this->dbTable->SPUpdate('sp_trainingname_competency_create',
                                $trainingname_id,
                                $item);
                }
                        
            }
        }
        if($hasil){
            $hasil = $trainingname_id;
        }
        
        return $hasil;
    }

    public function processdeletecompetencytrainingname(Hrd_Models_Training_Trainingname_Trainingname $d, $session, $data){
        $hasil = 0;
        $trainingname_id = $data['trainingname_id'];
        $ex_com = explode('~', $data['competency_name_id']);
        foreach($ex_com as $key => $item){
            $hasil = $this->dbTable->SPUpdate(
                        'sp_trainingnamecompetency_update', 
                        $trainingname_id,
                        $item
                    );
        }

        return $hasil;
    }

    public function getcompetencyexist(Hrd_Models_Training_Trainingname_Trainingname $d, $session, $data){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute(
                    'sp_trainingnamecompetency_readexist', 
                    $data['trainingname_id']
                );
        
        return $hasil;
    }
    
    public function update(Hrd_Models_Training_Trainingname_Trainingname $em) {
        $hasil = 0;
        if ($em->getId() == 0) {
            return $hasil;
        }
       
        $hasil = $this->dbTable->SPUpdate('sp_trainingname_update', $em->getAddBy(), $em->getId(), 
                $em->getTrainingName(),
                $em->getVendor(),
                $em->getSkill(),
                $em->getType(),
                $em->getCertificate(),
                $em->getTrainingCaptionId());
        return $hasil;
    }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_trainingname_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }
}
