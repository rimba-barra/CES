<?php

/**
 * Description of DepartmentController
 *
 * @author MIS
 */
class Hrd_FirstdayformController extends Hrd_Models_App_Template_AbstractMasterController {

    public function _getMainDataModel() {

        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Box_Models_App_DataListCreator('', 'firstdayform', array(), array()));
        $dm->setObject(new Hrd_Models_Firstday_Firstdayform_Firstdayform());
        $dm->setDao(new Hrd_Models_Firstday_Firstdayform_Dao());
        $dm->setValidator(new Hrd_Models_Firstday_Firstdayform_Validator());
        $dm->setIdProperty("firstdayform_id");
        return $dm;
    }

    public function getemployeeRead(){
    	$em = new Hrd_Models_Firstday_Firstdayform_Firstdayform();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Firstday_Firstdayform_Dao();
        
        $hasil = $dao->getallemployee_transaction($em, $this->getAppSession(), $this->getAppData());
        
        
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'employeeb', array(),array());
        
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        
        return $dm;
    }

    public function getquestionRead(){
    	$em = new Hrd_Models_Firstday_Firstdayform_Firstdayform();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Firstday_Firstdayform_Dao();
        
        $hasil = $dao->getAllWoPL($em, $this->getAppSession(), $this->getAppData());
        
        
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'firstdayform', array(),array());
        
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        
        return $dm;
    }

    public function generatetransactionRead(){
    	$em = new Hrd_Models_Firstday_Firstdayform_Firstdayform();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Firstday_Firstdayform_Dao();

        $data = $this->getAppData();
        $temp_emp = explode('~', $data['employee_id']);
        $temp_fdf = explode('~', $data['firstdayform_id']);

        //cek per orang
        foreach($temp_emp as $key_emp => $item_emp){
        	if($item_emp){
                $temp_check = '';
        		$hasil_emp = $dao->getemptrans($em, $this->getAppSession(), $this->getAppData(), $item_emp);
        		$emp_trans = $hasil_emp[1][0]['firstdayform_answer'];
        		$emp_decode = json_decode($emp_trans);

        		//cek yang lama dan baru
        		foreach($temp_fdf as $key_new => $item_new){
        			if($item_new){
	        			$i_check = 0;
	        			foreach($emp_decode as $key_old => $item_old){
	        				if($item_old->firstdayform_id == $item_new){
	        					$i_check++;
	        				}
	        			}
	        			$temp_check[] = array(
	        								'firstdayform_id_new' => $item_new,
	        								'i_check'			  => $i_check
	        							);
        			}
        		}

        		//gabungin yang lama dan yang baru
        		$temp_res = '';
        		foreach($emp_decode as $key_old1 => $item_old1){
        			$temp_res[] = array(
        										'firstdayform_id' => $item_old1->firstdayform_id,
        										'answer'		  => $item_old1->answer
        								);
        		}
        		foreach($temp_check as $key_cek => $item_cek){
        				if($item_cek['i_check'] < 1){
        					$temp_res[] = array(
        										'firstdayform_id' => $item_cek['firstdayform_id_new'],
        										'answer'		  => 0
        								);
        				}
        		}
        		$jsonencode_answer = json_encode($temp_res);
        		$hasil = $dao->updateDetail($em, $this->getAppSession(), $this->getAppData(),$jsonencode_answer, $item_emp);
        	}
        }

        return Box_Tools::instantRead(array("HASIL" => 1,), array());
    }
}

?>
