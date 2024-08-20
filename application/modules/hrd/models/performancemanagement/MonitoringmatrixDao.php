<?php

/**
 * Description of MonitoringmatrixDao
 *
 * @author MIS
 */
class Hrd_Models_Performancemanagement_MonitoringmatrixDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {

    public function save(Hrd_Models_Performancemanagement_Monitoringmatrix $d) {
        $hasil = 0;
		/*
        $dataheader 		= $d->getArrayTable();
        $countheaderdata	= $d->access_id;
		if ($countheaderdata) {
			return $this->update($d);
		}
        
		$hasil = $this->dbTable->SPUpdate(
				'sp_monitoringmatrix_create', 
				$d->getAddBy(), 
				$dataheader['project_id'],
				$dataheader['pt_id'],
				$dataheader['accesslevel_id'], 
				$d->getEmployee_id());
        return $hasil;
		*/
    }

    public function update(Hrd_Models_Performancemanagement_Monitoringmatrix $d) {
        $hasil = 0;
        $datadetail = $d->getDCResult();
        $dataheader = $d->getArrayTable();
        if (empty($datadetail)) {
            return false;
        } else {
            $hasil = $this->dbTable->SPUpdate(
                    'sp_monitoringmatrix_update', $d->getAddBy(), $dataheader['project_id'], $dataheader['pt_id'], $datadetail['accesslevel_id'], $datadetail['employee_id'], $datadetail['status'], $datadetail['content'], $datadetail['score'], $datadetail['comment_general'], $datadetail['comment_private'], $datadetail['accessmatrix_id'], $datadetail['deleted']
            );
			//var_dump($this->dbTable); // ngecek sql server error
// var_dump($hasil); // ngecek sql server error
        }
        return $hasil;
    }
	
    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Performancemanagement_Monitoringmatrix $d) {
        $hasil = 0;
		
        $hasil = $this->dbTable->SPExecute('sp_monitoringmatrix_read', $r->getPage(), $r->getLimit(), $d->getProjectId(), $d->getPtId(), $d->getAccesslevel());
        //var_dump($hasil);
		//die();
		return $hasil;
    }
	
	public function getDetailData(Box_Models_App_HasilRequestRead $r, Hrd_Models_Performancemanagement_Monitoringmatrix $d) {
		$hasil = 0; 
        $hasil = $this->dbTable->SPExecute(
            'sp_monitoringmatrixdetail_read', 
			$d->getProjectId(), $d->getPtId(), $d->getAccesslevel_id()
        );
// var_dump($this->dbTable); // ngecek sql server error
// var_dump($hasil); // ngecek sql server error
        return $hasil;
    }
	
    public function getEmployeelist(Box_Models_App_HasilRequestRead $r, $session, $data) {
        $obj_setup = new Hrd_Models_General_Setup();
        $hasil = 0;   
		$r->setPage(1);
        $r->setLimit(99999999);	
        $hasil = $this->dbTable->SPExecute('sp_monitoringmatrixemployee_read', $r->getPage(), $r->getLimit(), 
			$session->getProjectId(), $session->getPtId(), $data['project_id'], $data['pt_id'], $data['accesslevel_id'], $data['employee_name'], $data['employee_nik'], $data['banding_id'], '',1);
// var_dump($this->dbTable); // ngecek sql server error
// var_dump($hasil); // ngecek sql server error
        return $hasil;
    }
	
    public function getAllWoPL(Hrd_Models_Performancemanagement_Monitoringmatrix $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_monitoringmatrix_read', 1, 9999, $d->getMonitoringmatrix());
        return $hasil;
    }
	/*
    public function getdataByid($id) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute(
                'sp_monitoringmatrix_getbyid', $id
        );
        return $hasil;
    }*/	

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_monitoringmatrix_destroy', $decan->getString(), $session->getUserId());
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
	
    public function selectemployeeMonitoringmatrix($session, $datadetail) {    
        $obj = new Hrd_Models_Performancemanagement_Monitoringmatrix();
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_monitoringmatrix_selectemployee', 
			$session->getUser()->getId(), 
			$session->getProject()->getId(), 
			$session->getPt()->getId(), 
			$datadetail['accesslevel_id'], 
			$datadetail['employee_id'], 
			$datadetail['status'], 
			$datadetail['content'], 
			$datadetail['score'], 
			$datadetail['comment_general'], 
			$datadetail['comment_private']
        );  
        return $hasil;	
    }
	
    public function approveMonitoringmatrix($session, $datadetail) {    
        $obj = new Hrd_Models_Performancemanagement_Monitoringmatrix();
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_monitoringmatrix_approve', 
			$session->getUser()->getId(), 
			$session->getProject()->getId(), 
			$session->getPt()->getId(), 
			$datadetail['accessmatrix_id'], 
			$datadetail['status'], 
			$datadetail['content'], 
			$datadetail['score'], 
			$datadetail['comment_general'], 
			$datadetail['comment_private']
        );  
		// var_dump($this->dbTable); // ngecek sql server error
		// var_dump($hasil); // ngecek sql server error
        return $hasil;	
    }
	
    public function rejectMonitoringmatrix($session, $datadetail) {    
        $obj = new Hrd_Models_Performancemanagement_Monitoringmatrix();
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_monitoringmatrix_reject', 
			$session->getUser()->getId(), 
			$session->getProject()->getId(), 
			$session->getPt()->getId(), 
			$datadetail['accessmatrix_id']
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
	
    function sendemailMonitoringmatrix($session, $all_id, $accesslevel) {
        $obj 		= new Hrd_Models_Performancemanagement_Monitoringmatrix();
		$user_id 	= $session->getUser()->getId();
        $result 	= $this->getUserroot($session);
		$count 		= count($result[0]);
		
		$all_id_sp 	= str_replace(',','~',$all_id);
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_monitoringmatrix_submitforapp', 
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
				$message .= "<p>Terdapat Monitoring Matrix performance management untuk level ".$accesslevel." yang memerlukan approval dari Bapak / Ibu </p>";	
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
	
    public function saveCopyLevel($session, $accesslevel_id, $accesslevel_id_copy) {
        $obj = new Hrd_Models_Performancemanagement_Monitoringmatrix();
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_monitoringmatrix_copy', 
            $obj->getUserlogin(), 
			$session->getProject()->getId(), 
			$session->getPt()->getId(),
            $accesslevel_id,
            $accesslevel_id_copy           
        );  
        //var_dump($this->dbTable);        
        return $hasil;
    }
    
}

?>
