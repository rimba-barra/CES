<?php

/**
 * Description of SetupShiftManual
 *
 * @author MIS
 */
class Hrd_Models_Absent_ProcessLate {
    private $msg;
    private $hasil;
    
    /*@return void*/
    public function run(Hrd_Models_Absent $absent,  Box_Models_App_Session $ses,  Box_Models_App_HasilRequestRead $request) {
        /// get absent sheet
        $dao = new Hrd_Models_AbsentDao();
       
        $absent->setProject($ses->getProject());
        $absent->setPt($ses->getPt());
        
        $creator = new Box_Models_App_Creator();

        $absents = $dao->getAbsentSheet($absent,$request);
        $absents = Hrd_Models_Absent_Tools::buildObjects($creator, "date", $absents, 0);

        // get shift type data
        $dao = new Hrd_Models_Master_ShiftTypeDao();
        $tipeShift = new Hrd_Models_Master_ShiftType();
        $tipeShift->setProject($ses->getProject());
        $tipeShift->setPt($ses->getPt());
        $shifTypes = $dao->getAllWOPL($tipeShift);
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
                   // var_dump($rowAbs->getShiftType()->getId(),$rowShift->getId());
                    if ($rowAbs->getShiftType()->getId() == $rowShift->getId()) {
                       
                        Hrd_Models_Absent_Tools::attachLate($rowAbs, $rowShift->getInTime(), $rowShift);

                        $newAbsent->addDetail($rowAbs);
                    }
                }
            }
            
           

            $de = new Box_Delien_DelimiterEnhancer();
            $de->setDelimiterCandidate($newAbsent);
            $de->generate();
            
           

            $dao = new Hrd_Models_AbsentDao();
            $hasil = $dao->updateLate($newAbsent, $ses);
            if ($hasil) {
                $this->hasil = TRUE;
                $this->msg = "Success process late";
            } else {
                $this->hasil = FALSE;
                $this->msg = "Error when updating absent sheet";
            }
        }
    }
    
    public function getMsg() {
        return $this->msg;
    }

    public function getHasil() {
        return $this->hasil;
    }



}

?>
