<?php

/**
 * Description of AccessgroupdetailDao
 *
 * @author MIS
 */
class Hrd_Models_Accessgroupdetail_AccessgroupdetailDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {

    public function save(Hrd_Models_Accessgroupdetail_Accessgroupdetail $d) {
        $hasil = 0;
		/*
        $dataheader 		= $d->getArrayTable();
        $countheaderdata	= $d->access_id;
		if ($countheaderdata) {
			return $this->update($d);
		}
        
		$hasil = $this->dbTable->SPUpdate(
				'sp_accessgroupdetail_create', 
				$d->getAddBy(), 
				$dataheader['project_id'],
				$dataheader['pt_id'],
				$dataheader['accessgroup_id'], 
				$d->getEmployee_id());
        return $hasil;
		*/
    }

    public function update(Hrd_Models_Accessgroupdetail_Accessgroupdetail $d) {
        $hasil = 0;
        $datadetail = $d->getDCResult();
        $dataheader = $d->getArrayTable();
        if (empty($datadetail)) {
            return false;
        } else {
            $hasil = $this->dbTable->SPUpdate(
                    'sp_accessgroupdetail_update', $d->getAddBy(), $dataheader['project_id'], $dataheader['pt_id'], $datadetail['accessgroup_id'], $datadetail['group_id'], $datadetail['accessgroup_detail_id'], $datadetail['deleted']
            );
			//var_dump($this->dbTable); // ngecek sql server error
// var_dump($hasil); // ngecek sql server error
        }
        return $hasil;
    }
	
    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Accessgroupdetail_Accessgroupdetail $d) {
        $hasil = 0;
		
        $hasil = $this->dbTable->SPExecute('sp_accessgroupdetail_read', $r->getPage(), $r->getLimit(), $d->getProjectId(), $d->getPtId(), $d->getAccessgroup());
        //var_dump($this->dbTable);
		//die();
		return $hasil;
    }
	
    public function getDetailData(Box_Models_App_HasilRequestRead $r, Hrd_Models_Accessgroupdetail_Accessgroupdetail $d) {
	$hasil = 0; 
        $hasil = $this->dbTable->SPExecute(
            'sp_accessgroupdetaildetail_read', 
            $d->getProjectId(), $d->getPtId(), $d->getAccessgroup_id()
        );
// var_dump($this->dbTable); // ngecek sql server error
// var_dump($hasil); // ngecek sql server error
        return $hasil;
    }
	
    public function getGrouplist(Box_Models_App_HasilRequestRead $r, $session, $data) {
        $obj_setup = new Hrd_Models_General_Setup();
        $hasil = 0;   
		$r->setPage(1);
        $r->setLimit(99999999);	
        $hasil = $this->dbTable->SPExecute('sp_accessgroupdetailgroup_read', $r->getPage(), $r->getLimit(), 
			$session->getProjectId(), $session->getPtId(), $data['accessgroup_id'], $data['code'], $data['group']);
// var_dump($this->dbTable); // ngecek sql server error
// var_dump($hasil); // ngecek sql server error
        return $hasil;
    }
	
    public function getAllWoPL(Hrd_Models_Accessgroupdetail_Accessgroupdetail $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_accessgroupdetail_read', 1, 9999, $d->getAccessgroupdetail());
        return $hasil;
    }
	/*
    public function getdataByid($id) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute(
                'sp_accessgroupdetail_getbyid', $id
        );
        return $hasil;
    }*/	

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_accessgroupdetail_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }
	/*
    public function Deletedetail($pmdocument_detail_id,$user_id) {
        $hasil = 0;        
        $hasil = $this->dbTable->SPExecute(
                'sp_packagemanagementdetail_delete', $pmdocument_detail_id,$user_id
        );
        return $hasil;
    }*/
	
    public function selectgroupAccessgroupdetail($session, $datadetail) {    
        $obj = new Hrd_Models_Accessgroupdetail_Accessgroupdetail();
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_accessgroupdetail_selectgroup', 
			$session->getUser()->getId(), 
			$session->getProject()->getId(), 
			$session->getPt()->getId(), 
			$datadetail['accessgroup_id'], 
			$datadetail['group_id']
        );  
        return $hasil;	
    }
	
    public function approveAccessgroupdetail($session, $datadetail) {    
        $obj = new Hrd_Models_Accessgroupdetail_Accessgroupdetail();
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_accessgroupdetail_approve', 
			$session->getUser()->getId(), 
			$session->getProject()->getId(), 
			$session->getPt()->getId(), 
			$datadetail['accessgroup_detail_id']
        );  
        // var_dump($this->dbTable); // ngecek sql server error
        // var_dump($hasil); // ngecek sql server error
        return $hasil;	
    }
	
    public function rejectAccessgroupdetail($session, $datadetail) {    
        $obj = new Hrd_Models_Accessgroupdetail_Accessgroupdetail();
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_accessgroupdetail_reject', 
			$session->getUser()->getId(), 
			$session->getProject()->getId(), 
			$session->getPt()->getId(), 
			$datadetail['accessgroup_detail_id']
        );  
		// var_dump($this->dbTable); // ngecek sql server error
		// var_dump($hasil); // ngecek sql server error
        return $hasil;	
    }
	
    public function getUserroot($session) {
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
	
    function sendemailAccessgroupdetail($session, $all_id, $accessgroup) {
        $obj 		= new Hrd_Models_Accessgroupdetail_Accessgroupdetail();
		$user_id 	= $session->getUser()->getId();
        $result 	= $this->getUserroot($session);
		$count 		= count($result[0]);
		
		$all_id_sp 	= str_replace(',','~',$all_id);
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_accessgroupdetail_submitforapp', 
			$user_id, 
            $all_id_sp
        );
		
		$count_success = 0;
        if ($count > 0) {
						
			$i = 0;
			$all_email = '';
			for($i = 0; $i < $count; $i++){
				
				$row = $result[0][$i];
            	$email_ciputra = $row['email_ciputra'];				
				$message = '<html><body>';
				$message .= '<p>Dear Bapak / Ibu,</p>';
				$message .= "<p>Terdapat Monitoring Matrix performance management untuk level ".$accessgroup." yang memerlukan approval dari Bapak / Ibu </p>";	
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
	
    public function saveCopyLevel($session, $accessgroup_id, $accessgroup_id_copy) {
        $obj = new Hrd_Models_Accessgroupdetail_Accessgroupdetail();
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_accessgroupdetail_copy', 
            $obj->getUserlogin(), 
			$session->getProject()->getId(), 
			$session->getPt()->getId(),
            $accessgroup_id,
            $accessgroup_id_copy           
        );  
        //var_dump($this->dbTable);        
        return $hasil;
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
