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
class Hrd_Models_Master_GroupValidator extends Box_Models_App_Validator {
    public function run(Hrd_Models_Master_Group $d){
        $msg = "";
        
        $dao 	= new Hrd_Models_Master_GroupDao();
        $scode 	= $dao->codeExist($d);
        $sname 	= $dao->nameExist($d);
        $countname = count($sname[0]);
        
        if(strlen($d->getName()) < 1){
            $msg = "Name minimum 1 characters";
        } else if (Box_Tools::codeExist($scode, $d, 'group_id')) {
            $msg 	= "This code is already exists";
        } else if ($countname > 0) {
        	$msg 	= "This group name is already exists";
        } else{
            $this->setStatus(TRUE);
            
        }
        $this->setMsg($msg);
    }
}

?>
