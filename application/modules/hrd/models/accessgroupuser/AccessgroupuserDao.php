<?php

/**
 * Description of AccessgroupuserDao
 *
 * @author MIS
 */
class Hrd_Models_Accessgroupuser_AccessgroupuserDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {

    public function save(Hrd_Models_Accessgroupuser_Accessgroupuser $d) {
        $hasil = 0;
        $dataheader 		= $d->getArrayTable();
        $countheaderdata	= $d->accessgroup_user_id;
        if ($countheaderdata) {
                return $this->update($d);
        }
        $hasil = $this->dbTable->SPUpdate(
                        'sp_accessgroup_user_create', 
                        $d->getAddBy(), 
                        $dataheader['project_id'],
                        $dataheader['pt_id'],
                        $dataheader['accessgroup_id'], 
                        $d->getEmployee_id());
        return $hasil;
    }

    public function update(Hrd_Models_Accessgroupuser_Accessgroupuser $d) {
        $hasil = 0;
        $dataheader = $d->getArrayTable();
		$hasil = $this->dbTable->SPUpdate(
				'sp_accessgroup_user_update', $d->getAddBy(), $d->accessgroup_user_id, $dataheader['accessgroup_id'], $dataheader['employee_id']);
        return $hasil;
    }

    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Accessgroupuser_Accessgroupuser $d) {
        $hasil = 0;
		
        $hasil = $this->dbTable->SPExecute('sp_accessgroup_user_read', $r->getPage(), $r->getLimit(), $d->getProjectId(), $d->getPtId(), $d->getEmployee_name());
		//var_dump($this->dbTable);
        //var_dump($hasil);
		//die();
		return $hasil;
    }

    public function getAllWoPL(Hrd_Models_Accessgroupuser_Accessgroupuser $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_accessgroup_user_read', 1, 9999, $d->getAccessgroupuser());
        return $hasil;
    }
	/*
    public function getdataByid($id) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute(
                'sp_accessgroup_user_getbyid', $id
        );
        return $hasil;
    }*/	

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_accessgroup_user_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }
	
    public function codeExist(Hrd_Models_Accessgroupuser_Accessgroupuser $d) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute(
            'sp_accessgroup_userempexists_read', 
            $d->accessgroup_user_id, 
            $d->employee_id, 
			$d->getProjectId(), 
			$d->getPtId()
        );
		
        return $hasil;
    }
	
    public function approveAccessgroupuser($session, $accessgroup_user_id) {
    
        $obj = new Hrd_Models_Accessgroupuser_Accessgroupuser();
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_accessgroup_user_approve', 
			$session->getUser()->getId(), 
            $accessgroup_user_id, 
			$obj->getProjectId(), 
			$obj->getPtId()
        ); 
        return $hasil;
    }
	
    public function rejectAccessgroupuser($session, $accessgroup_user_id) {    
        $obj = new Hrd_Models_Accessgroupuser_Accessgroupuser();
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_accessgroup_user_reject', 
			$session->getUser()->getId(), 
            $accessgroup_user_id, 
			$obj->getProjectId(), 
			$obj->getPtId()
        );  
        return $hasil;
    }
	
    public function getUserroot($session) {
        $obj = new Hrd_Models_Accessgroupuser_Accessgroupuser();
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute(
            'sp_accessgroup_user_userroot', 
			$session->getProject()->getId(), 
			$session->getPt()->getId()
        );
        //var_dump($this->dbTable);
		//var_dump($hasil);
        return $hasil;
    }
	
    function sendemailAccessgroupuser($session, $all_id) {
        $obj 		= new Hrd_Models_Accessgroupuser_Accessgroupuser();
	$user_id 	= $session->getUser()->getId();
        $result 	= $this->getUserroot($session);
	$count 		= count($result[0]);
		
	$all_id_sp 	= str_replace(',','~',$all_id);
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_accessgroup_user_submitforapp', 
            $user_id, 
            $all_id_sp
        );
		
        $hasil_selected	= $this->dbTable->SPExecute('sp_accessgroup_user_selected', $all_id);
        $count_user = count($hasil_selected[0]);
        $need_approval	= '';
        for($i = 0; $i < $count_user; $i++){
                $employee_name = $hasil_selected[0][$i]['employee_name'];
                $need_approval .= "&bull; $employee_name<br>";
        }
		
	$count_success = 0;
        if ($count > 0) {
						
            $i = 0;
            $all_email = '';
            for($i = 0; $i < $count; $i++){
				
                    $row = $result[0][$i];
                    $email_ciputra = $row['email_ciputra'];				
                    $message = '<html><body>';
                    $message .= '<p>Dear Bapak / Ibu,</p>';
                    $message .= "<p>Terdapat User Monitoring performance management yang memerlukan approval dari Bapak / Ibu : </p>".$need_approval;	
                    $message .= "<p><a href='".$_SERVER['HTTP_HOST']."'>Klik Disini</a></p>";
                    $message .= "Ciputra Enterprise system<br>";
                    $message .= "*Email informasi ini digenerate automatis oleh Ciputra Enterprise system";
                    $message .= "</body></html>";				
                    $sender = 'ces@ciputra.co.id';
                    $to = $email_ciputra;
                    //$to = 'wulan.sari@ciputra.co.id';
                    $mail = $obj->get_mail();
                    $mail->setData()->setFrom($sender);
                    $mail->setData()->setBodyHtml($message);
                    $mail->setData()->addTo($to, strtoupper($row['employee_name']));
                    $mail->setData()->setSubject('[PM] Permohonan Approval User Monitoring');
                    if ($mail->setData()->send()) {
                            $count_success++;
                            //echo 'success';
                    } else {
                            //echo 'failed';
                    }
            }	
        }
		
        if($count_success == $count){
                return 1;
        } else{
                return 0;
        }
    }
	
    public function checkLevel($session) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_accessgroup_user_checklevel', $session->getUserId(), $session->getProjectId(), $session->getPtId());
        //var_dump($this->dbTable);
		//var_dump($hasil);
		
        return $hasil;
    }
}

?>
