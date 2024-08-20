<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Validator
 *
 * @author MIS
 */
class Hrd_Models_Parameters_Validator extends Box_Models_App_Validator{
    private $moduleName;
    public function __construct($moduleName = NULL) {
        parent::__construct();
        $this->moduleName = $moduleName;
    }
    
    public function run($object){
        $moduleName = $this->moduleName;
        switch($moduleName){
            case "overtimevariable":
                $this->runOvertimeVariable($object);
                break;
        }
    }
    
    public function runOvertimeVariable(Hrd_Models_Parameters_Overtimevariable $d){
        $msg = "";
     
        $this->setStatus(TRUE);
        $this->setMsg($msg);
    }
}

?>
