<?php


/**
 * Description of OptionSelector
 *
 * @author MIS
 */
class Hrd_Models_Absent_OptionSelector {
    private $msg;
    private $hasil;
    private $process;
    private $dataRequest;
    public function __construct($dataRequest=array(),Hrd_Models_Absent_OptionSelectorProcess $process) {
       $this->dataRequest = $dataRequest;
       $this->process = $process; 
    }
    
    public function run(Box_Models_App_Session $ses,  Box_Models_App_HasilRequestRead $request){
        
        if(!$this->dataRequest || !$this->process){
            return FALSE;
        }
        
        $data = $this->dataRequest;
        
        $process = $data["process"];
        
        $hasil = FALSE;
        $msg = "Processing...";

        switch ($process) {
            case 'employee':
                $employeeId = intval($data["employee_id"]);

                $absent = new Hrd_Models_Absent();

                $absent->setMonth($data["month"]);
                $absent->setYear($data["year"]);
                $absent->getEmployee()->setId($employeeId);

                
                $this->process->run($absent, $ses, $request);
                $hasil = $this->process->getHasil();
                $msg = $this->process->getMsg();


                break;
            case 'department':

                $absent = new Hrd_Models_Absent();
                $absent->setMonth($data["month"]);
                $absent->setYear($data["year"]);

               
                $this->process->run($absent, $ses, $request);
                $hasil = $this->process->getHasil();
                $msg = $this->process->getMsg();

                break;
            case 'all':

                $absent = new Hrd_Models_Absent();
                $absent->setMonth($data["month"]);
                $absent->setYear($data["year"]);

                
                $this->process->run($absent, $ses,$request);
                $hasil = $this->process->getHasil();
                $msg = $this->process->getMsg();

                break;
        }
        $this->hasil = $hasil;
        $this->msg = $msg;
    }
    
    public function getMsg() {
        return $this->msg;
    }


    public function getHasil() {
        return $this->hasil;
    }

    


}

?>
