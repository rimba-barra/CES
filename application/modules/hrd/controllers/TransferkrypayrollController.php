<?php

/**
 * 
 *
 * @author MIS
 */
class Hrd_TransferkrypayrollController extends Box_Models_App_Hermes_AbstractController {

    private $moduleName = 'transferkrypayroll';

    protected function testingFlag() {
        return FALSE;
    }

    public function allRead() {
        $data = $this->getAppData();
        $success = FALSE;
        $msg = "...";

        return Box_Tools::instantRead(array(
                    "HASIL" => $success,
                    "MSG" => $msg
        ));
    }
    
    public function processRead() {
        $data = $this->getAppData();
        $success = FALSE;
        $msg = "...";
        
        $proc = new Hrd_Models_Payroll_Gaji_TransferEmployeePayroll();
        $proc->run($this->getAppSession());
        if(!$proc->getStatus()){
            $msg = $proc->getMsg();
            
        }else{
            $dao = new Hrd_Models_Payroll_Gaji_Dao();
            $hasil = $dao->saveGenerate($proc->getDecan(),$this->getAppSession());
            $success = $hasil;
        }
        
        return Box_Tools::instantRead(array(
                    "HASIL" => $success,
                    "MSG" => $msg
        ));
    }

    public function mainCreate() {
        $dm = new Box_Models_App_Hermes_DataModel();
        return $dm;
    }

    public function mainDelete() {
        $dm = new Box_Models_App_Hermes_DataModel();
        return $dm;
    }

    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_Processor();
    }

}

?>
