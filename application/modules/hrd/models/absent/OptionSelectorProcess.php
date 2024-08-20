<?php

/**
 * Description of OptionSelectorProcess
 *
 * @author MIS
 */
abstract class Hrd_Models_Absent_OptionSelectorProcess {
    protected $hasil;
    protected $msg;
    
    public function getHasil() {
        return $this->hasil;
    }

    public function getMsg() {
        return $this->msg;
    }
    
    public function run(\Hrd_Models_Absent $absent, \Box_Models_App_Session $ses, \Box_Models_App_HasilRequestRead $request) {
        /// get absent sheet
        $dao = new Hrd_Models_AbsentDao();

        $absent->setProject($ses->getProject());
        $absent->setPt($ses->getPt());

        $creator = new Box_Models_App_Creator();

        $absents = $dao->getAbsentSheet($absent, $request);
        $absents = Hrd_Models_Absent_Tools::buildObjects($creator, "date", $absents, 0);

        // get shift type data
        $dao = new Hrd_Models_Master_ShiftTypeDao();
        $shifTypes = $dao->getAll($request, new Hrd_Models_Master_ShiftType());
        $shifTypes = Hrd_Models_Absent_Tools::buildObjects($creator, "shifttype", $shifTypes, 1);

        /// attach absent with shift type data
        if (count($absents) == 0) {
            $this->hasil = FALSE;
            $this->msg = "No absent sheet found";
        } else if (count($shifTypes) == 0) {
            $this->hasil = FALSE;
            $this->msg = "No shift type data found";
        } else {



          

            $newAbsent = new Hrd_Models_Absent();
            foreach ($absents as $rowAbs) {
                foreach ($shifTypes as $rowShift) {
                    if ($rowAbs->getShiftType()->getId() == $rowShift->getId()) {
                        $this->attachProcess($rowAbs, $rowShift);

                        $newAbsent->addDetail($rowAbs);
                    }
                }
            }



            $de = new Box_Delien_DelimiterEnhancer();
            $de->setDelimiterCandidate($newAbsent);
            $de->generate();
            
            if($this->isDebugging()){
                var_dump($newAbsent->getDCResult());

                die();
            }
            


            $dao = new Hrd_Models_AbsentDao();
            $hasil = $this->getDaoUpdateMethod($dao,$newAbsent, $ses);
            if ($hasil) {
                $this->hasil = TRUE;
                $this->msg = $this->getDaoSuccesMsg();
            } else {
                $this->hasil = FALSE;
                $this->msg = "Error when updating absent sheet";
            }
        }
    }
    
    abstract function attachProcess(Hrd_Models_Master_General_Date $absentDetail,  Hrd_Models_Master_ShiftType $st);
    /*@return string*/
    abstract function getDaoSuccesMsg();
    
    /*@return result of dao update*/
    abstract function getDaoUpdateMethod(Hrd_Models_AbsentDao $absentDao,  Hrd_Models_Absent $absent,Box_Models_App_Session $ses);
    
    /*@return boolean*/
    abstract function isDebugging();
}

?>
