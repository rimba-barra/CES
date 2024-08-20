<?php

/**
 * Description of UsermonitoringlevelDao
 *
 * @author MIS
 */
class Hrd_Models_Performancemanagement_UsermonitoringlevelDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {

    public function save(Hrd_Models_Performancemanagement_Usermonitoringlevel $d) {
        $hasil = 0;
        $dataheader 		= $d->getArrayTable();
        $countheaderdata	= $d->access_id;
		if ($countheaderdata) {
			return $this->update($d);
		}
        
		$hasil = $this->dbTable->SPUpdate(
				'sp_usermonitoringlevel_create', 
				$d->getAddBy(), 
				$dataheader['project_id'],
				$dataheader['pt_id'],
				$dataheader['accesslevel_id'], 
				$d->getEmployee_id(), 
				$dataheader['access_commitee']);
        return $hasil;
    }

    public function update(Hrd_Models_Performancemanagement_Usermonitoringlevel $d) {
        $hasil = 0;
        $dataheader = $d->getArrayTable();
		$hasil = $this->dbTable->SPUpdate(
				'sp_usermonitoringlevel_update', $d->getAddBy(), $d->access_id, $dataheader['accesslevel_id'], $dataheader['employee_id'], $dataheader['access_commitee']);
        return $hasil;
    }

    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Performancemanagement_Usermonitoringlevel $d) {
        $hasil = 0;
		
        $hasil = $this->dbTable->SPExecute('sp_usermonitoringlevel_read', $r->getPage(), $r->getLimit(), $d->getProjectId(), $d->getPtId(), $d->getEmployee_name());
		//var_dump($this->dbTable);
        //var_dump($hasil);
		//die();
		return $hasil;
    }

    public function getAllWoPL(Hrd_Models_Performancemanagement_Usermonitoringlevel $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_usermonitoringlevel_read', 1, 9999, $d->getUsermonitoringlevel());
        return $hasil;
    }
	/*
    public function getdataByid($id) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute(
                'sp_usermonitoringlevel_getbyid', $id
        );
        return $hasil;
    }*/	

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_usermonitoringlevel_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }
	
    public function codeExist(Hrd_Models_Performancemanagement_Usermonitoringlevel $d) {
        $hasil = array();
		
        $hasil = $this->dbTable->SPExecute(
            'sp_usermonitoringlevelempexists_read', 
            $d->access_id, 
            $d->employee_id, 
			$d->getProjectId(), 
			$d->getPtId()
        );
		
        return $hasil;
    }
	
    public function approveUsermonitoringlevel($session, $access_id) {
    
        $obj = new Hrd_Models_Performancemanagement_Usermonitoringlevel();
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_usermonitoringlevel_approve', 
			$session->getUser()->getId(), 
            $access_id, 
			$obj->getProjectId(), 
			$obj->getPtId()
        ); 
        return $hasil;
    }
	
    public function rejectUsermonitoringlevel($session, $access_id) {    
        $obj = new Hrd_Models_Performancemanagement_Usermonitoringlevel();
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_usermonitoringlevel_reject', 
			$session->getUser()->getId(), 
            $access_id, 
			$obj->getProjectId(), 
			$obj->getPtId()
        );  
        return $hasil;
    }
	
    public function getUserroot($session) {
        $obj = new Hrd_Models_Performancemanagement_Usermonitoringlevel();
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute(
            'sp_usermonitoringlevel_userroot', 
			$session->getProject()->getId(), 
			$session->getPt()->getId()
        );
        //var_dump($this->dbTable);
		//var_dump($hasil);
        return $hasil;
    }
	
    function sendemailUsermonitoringlevel($session, $all_id) {
        $obj 		= new Hrd_Models_Performancemanagement_Usermonitoringlevel();
		$user_id 	= $session->getUser()->getId();
        $result 	= $this->getUserroot($session);
		$count 		= count($result[0]);
		
		$all_id_sp 	= str_replace(',','~',$all_id);
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_usermonitoringlevel_submitforapp', 
			$user_id, 
            $all_id_sp
        );
		
		$hasil_selected	= $this->dbTable->SPExecute('sp_usermonitoringlevel_selected', $all_id);
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
        $hasil = $this->dbTable->SPExecute('sp_usermonitoringlevel_checklevel', $session->getUserId(), $session->getProjectId(), $session->getPtId());
        //var_dump($this->dbTable);
		//var_dump($hasil);
		
        return $hasil;
    }
}

?>
