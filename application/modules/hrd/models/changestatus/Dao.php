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
class Hrd_Models_Changestatus_Dao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {
    public function save(Hrd_Models_Changestatus_Changestatus $d) {
        $hasil = 0;
        $type = 0;
        
        $spName = "sp_changestatus_create";
        if($d->getType()==Box_Config::CHANGESTATUSTYPE_PROMOSI){
			$type = 'promosi';
            $spName = "sp_changestatus_create";
        }else if($d->getType()==Box_Config::CHANGESTATUSTYPE_ROTASI){
			$type = 'rotasi';
            $spName = "sp_changestatusrotasi_create";
        }else if($d->getType()==Box_Config::CHANGESTATUSTYPE_MUTASI){
			$type = 'mutasi';
            $spName = "sp_changestatus_create";
        }
        

        $hasil = $this->dbTable->SPUpdate($spName, $d->getAddBy(),$d->getType(),$d->getProject()->getId(),
                $d->getPt()->getId(), $d->getEmployee()->getId(),
                $d->getIsApprove(),$d->getSkNumber(),$d->getEffectiveDate(),$d->getNewGroup()->getId(),
                $d->getOldGroup()->getId(),$d->getNewPosition()->getId(),
                $d->getOldPosition()->getId(),$d->getNewProject()->getId(),$d->getOldProject()->getId(),
                $d->getNewDepartment()->getId(),$d->getOldDepartment()->getId(),$d->getNewCostCenter1(),
                $d->getOldCostCenter1(),$d->getNewCostCenter2(),$d->getOldCostCenter2(),
                $d->getNewCostCenter3(),$d->getOldCostCenter3(),$d->getNewDivision()->getId(),$d->getOldDivision()->getId(),$d->getChangeMode(),$d->getNewAtasanId(),$d->getNewAtasanName(),$d->getIsAtasanKaryawan());
      
		if($hasil){
			$this->sendEmailNotification($d, $type);
		}
		
        return $hasil;
    }

    public function update(Hrd_Models_Changestatus_Changestatus $d) {
        $hasil = 0;
        $type = 0;

        //   $d->setSelectedRelation("overtimes");
        $spName = "";
        
        if($d->getType()==Box_Config::CHANGESTATUSTYPE_PROMOSI){
			$type = 'promosi';
            $spName = "sp_changestatus_update";
        }else if($d->getType()==Box_Config::CHANGESTATUSTYPE_ROTASI){
			$type = 'rotasi';
            $spName = "sp_changestatusrotasi_update";
        }else if($d->getType()==Box_Config::CHANGESTATUSTYPE_MUTASI){
			$type = 'mutasi';
            $spName = "sp_changestatusmutasi_update";
        }
        
        $hasil = $this->dbTable->SPUpdate($spName, $d->getAddBy(),
                $d->getId(),$d->getEmployee()->getId(),
                $d->getIsApprove(),$d->getSkNumber(),$d->getEffectiveDate(),$d->getNewGroup()->getId(),
                $d->getOldGroup()->getId(),$d->getNewPosition()->getId(),
                $d->getOldPosition()->getId(),$d->getNewProject()->getId(),$d->getOldProject()->getId(),
                $d->getNewDepartment()->getId(),$d->getOldDepartment()->getId(),$d->getNewCostCenter1(),
                $d->getOldCostCenter1(),$d->getNewCostCenter2(),$d->getOldCostCenter2(),
                $d->getNewCostCenter3(),$d->getOldCostCenter3(),$d->getNewDivision()->getId(),$d->getOldDivision()->getId(),$d->getChangeMode(),$d->getNewAtasanId(),$d->getNewAtasanName(),$d->getIsAtasanKaryawan());

		if($hasil){
			$this->sendEmailNotification($d, $type);
		}
		
        return $hasil;
    }

    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Changestatus_Changestatus $d) {
        $hasil = 0;
        
        $hasil = $this->dbTable->SPExecute('sp_changestatus_read', $r->getPage(), $r->getLimit(),$d->getProject()->getId(),$d->getPt()->getId(),$d->getType());
     
        return $hasil;
    }
    
    public function getByEmployeeWOPL(Hrd_Models_Changestatus_Changestatus $d) {
        $hasil = 0;
        
        
        //$hasil = $this->dbTable->SPExecute('sp_changestatus_read',1,99999,$d->getProject()->getId(),$d->getPt()->getId(),$d->getType(),$d->getEmployee()->getId());
        // golongan muncul berdasarkan akses user
        $ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $userId = $ses->getUserId();
        $hasil = $this->dbTable->SPExecute('sp_changestatus_read_byaccess',$userId,1,99999,$d->getProject()->getId(),$d->getPt()->getId(),$d->getType(),$d->getEmployee()->getId());
     
        return $hasil;
    }
    
    public function getOne(Hrd_Models_Changestatus_Changestatus $d) {
        $hasil = 0;
        
        $hasil = $this->dbTable->SPExecute('sp_changestatus_one_read',1,1,$d->getId());
     
        return $hasil;
    }

    public function deleteOne($id,$userId) {
        $row = 0;

        $row = $this->dbTable->SPUpdate('sp_changestatus_destroy',$id,$userId);

        return $row;
    }
  

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;

        $row = $this->dbTable->SPUpdate('sp_changestatus_destroy', $decan->getString(), $session->getUserId());

        return $row;
    }
	
    public function sendEmailNotification($d, $type) {
		$project_id = $d->getProjectId();
		$pt_id 		= $d->getPtId();
		
        $result = 0;
        $result = $this->dbTable->SPExecute(
            'sp_changestatus_email',
			$project_id, 
			$pt_id, 
			$type
        );
        //var_dump($this->dbTable);
		//var_dump($result);
		
		$employee_name = $d->getEmployeeName();
		$message = '<html><body>';
		$message .= '<p>Dear Bapak / Ibu,</p>';	
		$subject = '';
		if($type == 'promosi'){	
			$subject = 'Notifikasi Promosi Demosi';
			$message .= "<p>Karyawan atas nama ".$employee_name." mendapatkan promosi/demosi.</p>";
			
		} else if($type == 'rotasi'){
			$subject = 'Notifikasi Rotasi';
			$message .= "<p>Karyawan atas nama ".$employee_name." mendapatkan rotasi.</p>";
			
		} else if($type == 'mutasi'){
			$subject = 'Notifikasi Mutasi';
			$message .= "<p>Karyawan atas nama ".$employee_name." mendapatkan mutasi.</p>";
		}	
		$message .= "<br>Ciputra Enterprise system<br>";
		$message .= "*Email informasi ini digenerate automatis oleh Ciputra Enterprise system";
		$message .= "</body></html>";	
					
		$sender = 'ces@ciputra.co.id';
		$mail = $d->get_mail();
		$mail->setData()->setFrom($sender);
		$mail->setData()->setBodyHtml($message);
		$count = count($result[0]);
		$i = 0;
		$all_email = '';
		for($i = 0; $i < $count; $i++){	
			$row = $result[0][$i];
			$email_ciputra = $row['email_ciputra'];		
			$employee_name = $row['employee_name'];				
			$mail->setData()->addTo($email_ciputra, $employee_name);
		}
		$mail->setData()->setSubject($subject);
		$mail->setData()->send();
		
        //return $result;
    }
}
