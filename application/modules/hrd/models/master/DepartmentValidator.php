<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of EmployeeValidator
 *
 * @author MIS
 */
class Hrd_Models_Master_DepartmentValidator extends Box_Models_App_Validator {
    public function run(Hrd_Models_Master_Department $d){
        $msg = "";
        if(strlen($d->getName()) < 1){
            $msg = "Name minimum 1 characters";
        }else{
             
            
            $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
            $project_id = $this->session->getCurrentProjectId();
            $pt_id = $this->session->getCurrentPtId();
        
            // wulan edit 2020 08 05
            if($d->getId() > 0){           
                $dao = new Hrd_Models_Master_DepartmentDao();
                $exist = $dao->cek_transaksi($d->getId());
                $msg = $exist;
                
                // wulan edit 2020 11 05
                $name_exist = $dao->cek_name_code($d->getId(), 'name', $d->getName(), $project_id, $pt_id);
                $code_exist = $dao->cek_name_code($d->getId(), 'code', $d->getCode(), $project_id, $pt_id);
                
                if($exist > 0){
                    $this->setStatus(FALSE);
                    $msg = "Unable to save. The data may have been used";

                } else if($name_exist > 0){
                    $this->setStatus(FALSE);
                    $msg = "Unable to save. Department Name already exists";
                    
                                        
                } else if($code_exist > 0){
                    $this->setStatus(FALSE);
                    $msg = "Unable to save. Code already exists";                  
                                        
                } else {                
                    $this->setStatus(TRUE);
                    
                }
                
            } else {
                
                // wulan edit 2020 11 05
                $dao = new Hrd_Models_Master_DepartmentDao();
                $name_exist = $dao->cek_name_code(0, 'name', $d->getName(), $project_id, $pt_id);
                $code_exist = $dao->cek_name_code(0, 'code', $d->getCode(), $project_id, $pt_id);
                
                if($name_exist > 0){
                    $this->setStatus(FALSE);
                    $msg = "Unable to save. Department Name already exists";
                                                            
                } else if($code_exist > 0){
                    $this->setStatus(FALSE);
                    $msg = "Unable to save. Code already exists";                  
                                        
                } else {                
                    $this->setStatus(TRUE);
                    
                }
                            }
            // end wulan edit 2020 08 05
            
        }
        
        
        $this->setMsg($msg);
    }
}

?>
