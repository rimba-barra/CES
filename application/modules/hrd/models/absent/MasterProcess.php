<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of MasterProcess
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Absent_MasterProcess {

    private $absentDetail;
    private $shiftTypes;
    private $lostTime;
    private $hal;

    // public function __construct(Box_Models_App_Session $ses) {

    // added by Michael 2021.05.19
    public function __construct(Box_Models_App_Session $ses, $data) {
    // end added by Michael 2021.05.19

        $creator = new Box_Models_App_Creator();
        /* get all shifttype */
        $daost = new Hrd_Models_Master_ShiftTypeDao();
        $filterST = new Hrd_Models_Master_ShiftType();

        // $filterST->setProject($ses->getProject());
        // $filterST->setPt($ses->getPt());

        // added by Michael 2021.05.19
        if($data){
            $project = new Box_Models_Master_Project();
            $project->setId($data['project_id']);

            $pt = new Box_Models_Master_Pt();
            $pt->setId($data['pt_id']);

            $filterST->setProject($project);
            $filterST->setPt($pt);
            
        }else{
            $filterST->setProject($ses->getProject());
            $filterST->setPt($ses->getPt());
        }
        // end added by Michael 2021.05.19

        $shifTypes = $daost->getAllWOPL($filterST);
        $this->shiftTypes = Hrd_Models_Absent_Tools::buildObjects($creator, "shifttype", $shifTypes, 1);
        
        // $lostTime = new Hrd_Models_Absent_LostTime($ses);
        
        // added by Michael 2021.05.19
        $lostTime = new Hrd_Models_Absent_LostTime($ses, $data);
        
        // end added by Michael 2021.05.19
        
        $this->lostTime = $lostTime;
     
        
        // $this->hal = new Hrd_Models_Absent_ProcessHal($ses, $this->shiftTypes);

        // added by Michael 2021.05.19
        $this->hal = new Hrd_Models_Absent_ProcessHal($ses, $this->shiftTypes, $data);
        // end added by Michael 2021.05.19
    }

    public function process(Hrd_Models_Master_General_Date $absentDetail) {
        $this->absentDetail = $absentDetail;
        $this->setTimeZone($absentDetail);
        
        if (count($this->shiftTypes) > 0) {

            foreach ($this->shiftTypes as $st) {
                
                if ($absentDetail->getShiftType()->getId() == $st->getId()) {
           
                    // hitung terlambat
                    Hrd_Models_Absent_Tools::attachLate($absentDetail, $st->getInTime(), $st);

                    // hitung kehadiran
                    Hrd_Models_Absent_Tools::attachAttendance($absentDetail, $st);
                    
                    // total jam kerja
                    $this->hal->attachProcess($absentDetail, $st);
                }
            }
        }
        
      
        
        // hitung time lost
        $absentDetail->setTimeLost($this->lostTime->getAmount($absentDetail->getTimeIn(),$absentDetail->getTimeOut(),$this->shiftTypes,$absentDetail->getShiftType()->getId()));
      
    }

    /// set masuk ke zona mana time in , time out ( zona A, B, C)
    private function setTimeZone(Hrd_Models_Master_General_Date $absentDetail) {
        Hrd_Models_Absent_Tools::attachTimeByShiftType($absentDetail, $absentDetail->getTimeIn(), TRUE);
        Hrd_Models_Absent_Tools::attachTimeByShiftType($absentDetail, $absentDetail->getTimeOut(), FALSE);
    }

}
