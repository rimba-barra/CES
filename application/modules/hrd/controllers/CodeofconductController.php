<?php

class Hrd_CodeofconductController extends Box_Models_App_Hermes_WingedController {

    protected function testingFlag() {
        return FALSE;
    }
	
    public function allRead() {	   
        $ses = $this->getAppSession();
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'codeofconduct', array(), array('details'));
		$dao = new Hrd_Models_Master_Codeofconduct_CodeofconductDao();
		$obj = new Hrd_Models_Master_Codeofconduct_Codeofconduct();
        $obj->setArrayTable($this->getAppData());
        $obj->project_id = $ses->getProject()->getId(); // set project id sesuai session
        $hasil = $dao->getAll($this->getAppRequest(), $obj);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function headerdataRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        $masterproject = new Hrd_Models_App_Mastertable_Project();
        $allproject = $masterproject->prosesDataWithSession($this->getAppSession(), TRUE);
        $dm->setHasil(array($allproject, $allpt));
        return $dm;
    }

    protected function getMainDao() {
        return new Hrd_Models_Master_Codeofconduct_CodeofconductDao();
    }

    protected function getMainFieldID() {
        return "codeofconduct_id"; //prefix id header
    }

    protected function getMainObject() {
        return new Hrd_Models_Master_Codeofconduct_Codeofconduct();
    }

    protected function getMainValidator() {
        return new Hrd_Models_Master_Codeofconduct_CodeofconductValidator();
    }

//    protected function getDefaultProcessor() {
//        return new Hrd_Models_App_Box_Processor();
//    }
//    public function maindataRead(){
//         $data = $this->getAppData();
//         $dao = new Hrd_Models_Master_Codeofconduct_CodeofconductDao();
//         $success = $dao->getdataByid($data["codeofconduct_id"]);
//        return Box_Tools::instantRead(array(
//                "SUCCESS" => $success
//        ));
//    }
     
    public function uploadRead() {

        $ses = $this->getAppSession();
        $data = $this->getAppData();
        $msg = '???';
        $success = FALSE;
        $modeUpload = $data["type"];
        $fileUpload = NULL;
        
        $project_id = $ses->getProject()->getId();
        if ($modeUpload == "pdf") {
            $fileUpload = new Box_Models_App_FileUpload("/" . Box_Config::CODEOFCONDUCT_PDF_PATH, 'Codeofconduct_'.$project_id.'_'.date('Ymd'), "pdf");
        } 
        $fileUpload->run();
        if (!$fileUpload->isSuccess()) {
            $msg = $fileUpload->getErrorMsg();
        } else {
            $success = TRUE;
            $msg = $fileUpload->getFileName();
        }

        $arrayRespon = array("HASIL" => $success, "MSG" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }
    
    public function getemployeeRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'codeofconductemployee', array(), array());
        $dao = new Hrd_Models_Master_Codeofconduct_CodeofconductDao();
        $obj = new Hrd_Models_Master_Codeofconduct_Employee();
        $obj->setArrayTable($this->getAppData());
        $hasil = $dao->getEmployee($this->getAppRequest(), $obj);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
        
    public function getprojectRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'codeofconductproject', array(), array());
        $dao = new Hrd_Models_Master_Codeofconduct_CodeofconductDao();
        $obj = new Hrd_Models_Master_Codeofconduct_Project();
        $obj->setArrayTable($this->getAppData());
        $hasil = $dao->getProject($this->getAppRequest(), $obj);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    
    public function sendemailRead() {
        $data = $this->getAppData();	
        $dao = $this->getMainDao();	
        $hasil_selected = $dao->getEmail($data["all_id"]);
        
        $all_id_sp = $data["all_id"];
        $count  = count(explode(',', $all_id_sp));
        $tipe = $data["tipe"];
        
        /// send email
        $count_user     = count($hasil_selected[0]);
        $count_success  = 0;
        $need_approval	= '';
        for($i = 0; $i < $count_user; $i++){
            $employee_name = $hasil_selected[0][$i]['employee_name'];
            if($tipe == 'email'){
                $email = $hasil_selected[0][$i]['email'];                
            } else {
                $email = $hasil_selected[0][$i]['email_ciputra'];
            }
            
            if(isset($email)){
                try {
                    
                    $message = '<html><body>';
                    $message .= '<p>Dear Bapak / Ibu,</p>';                    
                    $message .= "<p>Bersama ini kami informasikan kepada Bapak/Ibu untuk membaca dan melakukan persetujuan terhadap kode tata laku (Code of Conduct). ";
                    $message .= "Bapak/Ibu dapat membacanya melalui Intranet --> HCMS --> Code of Conduct atau ";		
                    $message .= "<a href='https://intranet.ciputragroup.com/syshrdv22/index.php/codeofconduct' style='color:#ff0000'>Klik Disini</a>. ";	
                    $message .= "Setelah Bapak/Ibu selesai membaca, silahkan klik tombol ".'"Accept"'." sebagai tanda persetujuan. Terima kasih.</p>";
                    $message .= "Human Capital -- Ciputra Group<br><br><br>";
                    $message .= "*Email informasi ini digenerate otomatis oleh Ciputra Enterprise System";
                    $message .= "</body></html>";				
                    //$sender = 'ces@ciputra.co.id';
                    $sender = 'no.reply@ciputra.com';
                    $to = $email;
                    //$to = 'wulan.sari@ciputra.co.id';
                    $mail = new Hrd_Models_General_Email();
                    $mail->setData()->setFrom($sender);
                    $mail->setData()->setBodyHtml($message);
                    $mail->setData()->addTo($to, strtoupper($employee_name));
                    $mail->setData()->setSubject('[HCMS] Code of conduct');                
                    $mail->setData()->send();
                    $count_success++;                    
                } catch (Zend_Mail_Transport_Exception $e) {
                    echo $e->message();
                }
            }
            unset($email);
        }
        
        $success = 0;
        
        if($count_success == $count){
              $success = 1;
        } else{
              $success = 0;
        }        
        /// end send email
        
        return Box_Tools::instantRead(array(
        	"SUCCESS" => $success
        ));
    }
    
    
    public function copyRead() {
        $data = $this->getAppData();	
        $dao = $this->getMainDao();	
        $obj = new Hrd_Models_Master_Codeofconduct_Codeofconduct();
        
        $id             = $data["codeofconduct_id"];
        $all_id_sp      = $data["all_id"];
        $id_projects    = explode(',', $all_id_sp);
        $count          = count($id_projects);     
        
        $success        = 0;            
        $count_success  = 0;
        for($i = 0; $i < $count; $i++){
            $id_project = $id_projects[$i];
            $dao->copy($id, $id_project, $obj);
            $count_success ++;
        }
        
        $success = 0;        
        if($count_success == $count){
              $success = 1;
        } else{
              $success = 0;
        }        
        
        return Box_Tools::instantRead(array(
        	"SUCCESS" => $success
        ));
    }
    
    public function exportdataRead() {
        $obj = new Hrd_Models_Report_Exportcodeofconduct();
        //$post_data = Zend_Json::decode($_POST['data']);
        $post_data = Zend_Json::decode(Zend_Controller_Action::getRequest()->getPost('data'));
        
        $result = $obj->exceldata($post_data);  
        $hasil = TRUE;
        $arrayRespon = array(
            "HASIL" => $hasil);
        return Box_Tools::instantRead($arrayRespon, array($result));
        
    }
}

?>