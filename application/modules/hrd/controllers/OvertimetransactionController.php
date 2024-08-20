<?php

/**
 * Description of AbsentrecordController
 *
 * @author MIS
 */
class Hrd_OvertimetransactionController extends Box_Models_App_Hermes_AbstractController {

    protected function testingFlag() {
        return FALSE;
    }

    public function allRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'overtime', array('employee','department','shifttype'));
        $dao = new Hrd_Models_Overtime_Dao();
        $header = new Hrd_Models_Overtime_Overtime();
        $employee = new Hrd_Models_Employee_Employee();
        $employee->setArrayTable($this->getAppData());
        //$this->setArrayTable($leave,$this->getAppData());
        $header->setArrayTable($this->getAppData());
        $header->setProject($this->getAppSession()->getProject());
        $header->setPt($this->getAppSession()->getPt());
        
        $data = $this->getAppData();
        $start = $data['start_date'];
        $end = $data['end_date'];
        
        $hasil = $dao->getAllWithEmployeeFilter($this->getAppRequest(), $header, $employee, $start, $end);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    
    public function shiftinfoRead() {
     
        $dao = new Hrd_Models_Overtime_Dao();
        $header = new Hrd_Models_Overtime_Header();

        $header->setArrayTable($this->getAppData());
        $header->setProject($this->getAppSession()->getProject());
        $header->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getShiftInformation($header);
        
        return Box_Tools::instantRead(array(
            "HASIL"=>$hasil
        ));
        
    }
    
     public function deleteRead(){
         $data = $this->getAppData();
         $dao = new Hrd_Models_Overtime_Dao();
         $success = $dao->deleteOne($data["id"],$this->getAppSession()->getUser()->getId());
         
         // added by wulan 20200508
         if($success){

            $rows = $dao->getOvertimeByid($data["id"]);
            $ref_lembur_id = $rows[0][0]['ref_lembur_id'];
            
            $project_id = $this->getAppSession()->getProject()->getId();
            $daoconfig = new Hrd_Models_Intranet_ConfigDao();
            $dataconfig = $daoconfig->getProjectconfig($project_id);
            $configintranet = $dataconfig[0][0]['dbintranet_name'];
            
            
            $dao = new Hrd_Models_Intranet_OvertimeDao();
            $hasil = $dao->updateStatusNo($configintranet, $ref_lembur_id);
         }
         
        return Box_Tools::instantRead(array(
                "SUCCESS" => $success
        ));
    }
    
    public function parameterRead(){
        
        /// get paramater
        $obj = new Hrd_Models_Parameters_Overtimevariable();
        $dao = new Hrd_Models_Master_GeneralParameterDao();
        $obj->setProject($this->getAppSession()->getProject());
        $obj->setPt($this->getAppSession()->getPt());
        $allParams = $dao->getValues($obj);
    
        // get index lembur
        $iDao = new Hrd_Models_Overtime_Index_Dao();
        $x =new Hrd_Models_Overtime_Index_Index();
        
        $dma = new Hrd_Models_App_Mastertable_Department();
        $da = $dma->prosesDataWithSession($this->getAppSession(), TRUE);
       
        $x->setArrayTable($this->getAppData());
        $x->setProject($this->getAppSession()->getProject());
        $x->setPt($this->getAppSession()->getPt());
        $allIndex = $iDao->getAllWOPL($x);
        
        
        
        return Box_Tools::instantRead(array(
            "HASIL"=>1
        ),array(
            $allParams[1],
            Box_Tools::printToObjectsWM($allIndex[1],"overtimeindex"),
            $da
            
        ));
    }
    
    /*
     public function parameterRead(){
      
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'overtimevariable', array(), array());
        $obj = new Hrd_Models_Parameters_Overtimevariable();
        $dao = new Hrd_Models_Master_GeneralParameterDao();
        $obj->setProject($this->getAppSession()->getProject());
        $obj->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getValues($obj);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
     */

    public function employeeRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'employee', array('department'), array());
        $dao = new Hrd_Models_Master_EmployeeDao();
        $employee = new Hrd_Models_Master_EmployeePersonal();
        //$employee->setArrayTable($this->getAppData());
        $this->setArrayTable($employee, $this->getAppData());

        $employee->setProject($this->getAppSession()->getProject());
        $employee->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAllEP($this->getAppRequest(), $employee);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function parametersRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'overtimevariable', array(), array());
        $obj = new Hrd_Models_Parameters_Overtimevariable();
        $dao = new Hrd_Models_Master_GeneralParameterDao();
        $obj->setProject($this->getAppSession()->getProject());
        $obj->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getValues($obj);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    
    public function detailRead(){
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'overtime', array(), array());
        $obj = new Hrd_Models_Overtime_Header();
        $dao = new Hrd_Models_Overtime_Dao();
        $this->setArrayTable($obj,$this->getAppData());
        $hasil = $dao->getOvertimes($this->getAppRequest(),$obj);
      
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function calculateRead() {       
        /// begin calculate
        $data = $this->getAppData();
        $overtimeBefore = new Hrd_Models_Overtime_Overtime(Box_Config::OVERTIME_TAKENTIME_BEFOREIN);
        $overtimeAfter = new Hrd_Models_Overtime_Overtime(Box_Config::OVERTIME_TAKENTIME_AFTEROUT);
        
        $this->setArrayTable($overtimeBefore,$data);
        $this->setArrayTable($overtimeAfter,$data);
        $overtimeAfter->setStartTime($data["start_time_after"]);
        $overtimeAfter->setEndTime($data["end_time_after"]);
        $overtimeAfter->setDayType(Box_Config::OVERTIME_DAYTYPE_GENERAL);
        $overtimeBefore->setDayType(Box_Config::OVERTIME_DAYTYPE_GENERAL);
       
    
        $calculator = new Hrd_Models_Overtime_Calculator($this->getAppSession());
        $calculator->run($overtimeBefore);
        $overtimeBefore = $calculator->getOvertime();
        // end calculate 
      
        $calculator->run($overtimeAfter);
        $overtimeAfter = $calculator->getOvertime();

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'overtime', array(), array());
        $dm->setDirectResult(TRUE);
        
        $dm->setDataList($dataList);
        $dm->setHasil(array($overtimeBefore,$overtimeAfter));
        return $dm;
    }

    public function mainCreate() {
   
        $dm = new Box_Models_App_Hermes_DataModel();
        $obj = new Hrd_Models_Overtime_Overtime();
        
        $data = $this->getAppData();
        $dm->setDao(new Hrd_Models_Overtime_Dao());
        $data['confirm_alert_time'] = 1;
        //if($data['confirm_alert_time'] != 1){
            $dm->setValidator(new Hrd_Models_Overtime_Validator("header",$obj));
       // }
        $dm->setObject($obj);

        return $dm;
    }
    
    /* main alternative*/
    
    public function mainaltCreate() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $obj = new Hrd_Models_Overtime_Header();
       
        $dm->setDao(new Hrd_Models_Overtime_Dao());
        $dm->setValidator(new Hrd_Models_Overtime_Validator("header",$obj));
        $dm->setObject($obj);

        return $dm;
    }
    

    public function calculateCreate() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $obj = new Hrd_Models_Overtime_Overtime();

        $dm->setDao(new Hrd_Models_Leave_Dao());
        $dm->setValidator(new Hrd_Models_Overtime_Validator());
        $dm->setObject($obj);

        return $dm;
    }

    public function mainDelete() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setObject(new Hrd_Models_Overtime_Header());
        $dm->setDao(new Hrd_Models_Overtime_Dao());
        $dm->setIdProperty("overtimeheader_id");
        return $dm;
    }
    
  
    
   

    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_OvertimeProcessor();
    }
    
    /* start added by ahmad riadi 14022018 */
     public function checkconfigintranetRead() {
        $project_id = $this->getAppSession()->getProject()->getId();
        $dao = new Hrd_Models_Intranet_ConfigDao();
        $data = $dao->getProjectconfig($project_id);
        if(!empty($data[0])){
            return Box_Tools::instantRead(array("HASIL" => 1,), array($data[0][0]));
        }else{
            return Box_Tools::instantRead(array("HASIL" => 1,), array());
        }        
    }
    
    public function employeeprojectptRead() {
        $obj = new Hrd_Models_App_Mastertable_Employee();
        $data = $obj->prosesDataWithSession($this->getAppSession(), TRUE);
        return Box_Tools::instantRead(array("HASIL" => 1,), array($data));
    }

    public function invalidabsentinitRead() {
        $ma = new Hrd_Models_App_Mastertable_Department();
        $aa = $ma->prosesDataWithSession($this->getAppSession(), TRUE);
        return Box_Tools::instantRead(array(
                    "HASIL" => 1,
              ), array($aa));
    }
    public function getdataovertimeintranetRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'intranetovertime', array(), array());
        $dao = new Hrd_Models_Intranet_OvertimeDao();
        $obj = new Hrd_Models_Intranet_Overtime();
        $obj->setArrayTable($this->getAppData());
        $data = $this->getAppData();
        $project_id = $this->getAppSession()->getProject()->getId();
        $pt_id = $this->getAppSession()->getPt()->getId();
        $hasil = $dao->getAll($project_id, $pt_id, 'default', $data['configintranet'], $data['limit'], $data['start'], null);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    // wulan edit 20190903
    public function getdataovertimeintranetgetdetailRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'intranetovertime', array(), array());
        $dao = new Hrd_Models_Intranet_OvertimeDao();
        $obj = new Hrd_Models_Intranet_Overtime();
        $obj->setArrayTable($this->getAppData());
        $data = $this->getAppData();
        $project_id = $this->getAppSession()->getProject()->getId();
        $pt_id = $this->getAppSession()->getPt()->getId();
        
        $project_id = $this->getAppSession()->getProject()->getId();
        $daoconfig = new Hrd_Models_Intranet_ConfigDao();
        $dataconfig = $daoconfig->getProjectconfig($project_id);
        $configintranet = $dataconfig[0][0]['dbintranet_name'];
        
        $hasil = $dao->getdetailAll($data['ref_lembur_id'], $configintranet);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    // end wulan edit 20190903
    public function getdatafilterovertimeintranetRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'intranetovertime', array(), array());
        //$dao = new Hrd_Models_Intranet_OvertimeDao();
        $dao = new Hrd_Models_Intranet_OvertimenewDao();
        $obj = new Hrd_Models_Intranet_Overtime();
        $obj->setArrayTable($this->getAppData());
        $data = $this->getAppData();
        $param = $data['paramdata'];
        
        $project_id = $this->getAppSession()->getProject()->getId();
        $pt_id = $this->getAppSession()->getPt()->getId();
        $hasil = $dao->getAll($project_id, $pt_id, 'filter', $data['configintranet'], $data['limit'], $data['start'], $param);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    public function getdataovertimeapiRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'intranetovertime', array(), array());
        $dao = new Hrd_Models_Intranet_OvertimeDao();
        $obj = new Hrd_Models_Intranet_Overtime();
        $obj->setArrayTable($this->getAppData());
        $data = $this->getAppData();
        $project_id = $this->getAppSession()->getProject()->getId();
        $pt_id = $this->getAppSession()->getPt()->getId();
        $hasil = $dao->getAllApi($project_id, $pt_id, $data['page'], $data['limit'], $data['start'], null);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    
    public function getdatafilterovertimeapiRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'intranetovertime', array(), array());
        $dao = new Hrd_Models_Intranet_OvertimeDao();
        $obj = new Hrd_Models_Intranet_Overtime();
        $obj->setArrayTable($this->getAppData());
        $data = $this->getAppData();
        $param = $data['paramdata'];        
        $project_id = $this->getAppSession()->getProject()->getId();
        $pt_id = $this->getAppSession()->getPt()->getId();
        $hasil = $dao->getAllApi($project_id, $pt_id, $data['page'], $data['limit'], $data['start'], $param);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    /* end added by ahmad riadi 14022018 */
    
    // edited by wulan sari 20181220
    public function deleteovertimeintranetRead() {
        $dao = new Hrd_Models_Intranet_OvertimeDao();
        //$obj = new Hrd_Models_Intranet_Overtime();
        //$obj->setArrayTable($this->getAppData());
                
        $project_id = $this->getAppSession()->getProject()->getId();
        $pt_id = $this->getAppSession()->getPt()->getId();
        $data = $this->getAppData();
        $hasil = $dao->deleteovertimeintranet($data['configintranet'], $data['lembur_id']);
        
        return Box_Tools::instantRead(array(
            "HASIL"=>$hasil
        ));
        
    }
    
    // end edited by wulan sari 20181220

    // edit by wulan sari 20190208    
    public function sendemailRead() {
        $data = $this->getAppData();	
        $dao = new Hrd_Models_Overtime_Dao();	
        
        if($data["employee_id"] == 0){
            $hasil_selected = $dao->getEmailJam(0, $data["intranet_reportto_id"], $this->getAppSession()->getUser()->getId(), $data["overtime_id"], $data["intranet_hrd_comment"]);            
        } else {
            $hasil_selected = $dao->getEmail($data["employee_id"], $data["intranet_reportto_id"], $this->getAppSession()->getUser()->getId(), $data["overtime_id"], $data["intranet_hrd_comment"]);
        }
        
        /// send email
        $count_user     = count($hasil_selected[0]);
        $count_success  = 0;
        $need_approval	= '';
        for($i = 0; $i < $count_user; $i++){
            $employee_name = $hasil_selected[0][$i]['employee_name'];
            $email = $hasil_selected[0][$i]['email_ciputra'];
            if(isset($email)){
                try {
                    
                    $message = '<html><body>';
                    $message .= '<p>Dear Bapak / Ibu,</p>';
                    $message .= "<p>Bersama ini kami informasikan bahwa terkait lembur, terdapat komentar dari HRD sebagai berikut : </p> ";
                    $message .= $data["intranet_hrd_comment"];
                    $message .= "<br><br>Human Capital -- Ciputra Group<br><br><br>";
                    $message .= "*Email informasi ini digenerate automatis oleh Ciputra Enterprise System";
                    $message .= "</body></html>";				
                    //$sender = 'ces@ciputra.co.id';
                    $sender = 'no.reply@ciputra.com';
                    $to = $email;
                    //$to = 'wulan.sari@ciputra.co.id';
                    $mail = new Hrd_Models_General_Email();
                    $mail->setData()->setFrom($sender);
                    $mail->setData()->setBodyHtml($message);
                    $mail->setData()->addTo($to, strtoupper($employee_name));
                    $mail->setData()->setSubject('[HCMS] Overtime');                
                    $mail->setData()->send();
                    $count_success++;                    
                } catch (Zend_Mail_Transport_Exception $e) {
                    echo $e->message();
                }
            }
            unset($email);
        }
        
        $success = 0;
        
        if($count_success == $count_user){
              $success = 1;
        } else{
              $success = 0;
        }        
        /// end send email
        
        return Box_Tools::instantRead(array(
        	"SUCCESS" => $success
        ));
    }
    // end edit by wulan sari 20190208
    
    
}

?>
