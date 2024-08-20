<?php

/**
 * Description of SetupShiftManual
 *
 * @author MIS
 */
class Hrd_Models_Absent_SetupShiftManual {
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

                        Hrd_Models_Absent_Tools::attachTimeByShiftType($rowAbs, $rowShift->getInTime(), TRUE);
                        Hrd_Models_Absent_Tools::attachTimeByShiftType($rowAbs, $rowShift->getOutTime(), FALSE);

                        $newAbsent->addDetail($rowAbs);
                    }
                }
            }

            $de = new Box_Delien_DelimiterEnhancer();
            $de->setDelimiterCandidate($newAbsent);
            $de->generate();



            $dao = new Hrd_Models_AbsentDao();
            $hasil = $dao->updateAbsentByShiftType($newAbsent, $ses);
            if ($hasil) {
                $this->hasil = TRUE;
                $this->msg = "Success setup shift";
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
