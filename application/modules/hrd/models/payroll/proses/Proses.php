<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Proses
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Payroll_Proses_Proses {

    private $status;
    private $msg;

    public function __construct() {
        $this->status = FALSE;
        $this->msg = "...";
    }

    /* @returun boolean */

    public function run(Box_Models_App_Session $sesion, $month, $year) {

        $allProsesGaji = array();

        $groupBId = $this->validate($sesion, $month, $year);

        if (!$groupBId) {
            return FALSE;
        }


        $hasilB = $this->prosesGROUPB($sesion, $groupBId,$month,$year);
        if (is_array($hasilB)) {
            $allProsesGaji = $hasilB;
        }

        $hasilX = $this->prosesGROUPX($sesion, $month, $year);
        if (is_array($hasilX)) {
            $allProsesGaji = array_merge($allProsesGaji, $hasilX);
        }
        
        $hasilZ = $this->prosesGROUPZ($sesion,$month,$year);
        if(is_array($hasilZ)){
            $allProsesGaji = array_merge($allProsesGaji,$hasilZ);
        }
        
        if(count($allProsesGaji)==0){
            $this->msg = "Tidak ada data gaji yang terproses";
            return FALSE;
        }

        

       

        return $allProsesGaji;


        /// check master gaji
    }

    /* setup payroll untuk GROUP B */

    private function getSetupPayroll() {
        $dao = new Hrd_Models_Payroll_Setup_Dao();
        $sp = new Hrd_Models_Payroll_Setup_Setup();
    }

    /* cek jika ada group B di group payroll */

    private function getGroupBPayroll() {
        $dao = new Hrd_Models_Master_GroupPayrollDao();
        $gp = new Hrd_Models_Master_GroupPayroll();
        $hasil = $dao->getAllWOPL($gp);
        if (!Box_Tools::adaRecord($hasil)) {
            return 0;
        }

        $allGp = Box_Tools::toObjects("grouppayroll", $hasil);
        foreach ($allGp as $gp) {
            if ($gp->getCode() == Box_Config::GROUPPAYROLL_B) {
                return $gp->getId();
            }
        }

        return 0;
    }

    /* proses yang mengolah komponen gaji yang ada di setup payroll berdasarkan master gaji karyawan */

    private function prosesGROUPB(Box_Models_App_Session $sesion, $groupId,$month,$year) {

        /// get setup payroll
        $dao = new Hrd_Models_Payroll_Setup_Dao();
        $sp = new Hrd_Models_Payroll_Setup_Setup();
        $sp->getGroupPay()->setId($groupId);
        $sp->setProject($sesion->getProject());
        $sp->setPt($sesion->getPt());
        $hasil = $dao->getAllWOPL($sp);

        if (!Box_Tools::adaRecord($hasil)) {
            return FALSE;
        }

        /////////// get all master gaji
        $daoMG = new Hrd_Models_Payroll_Gaji_Dao();
        $mg = new Hrd_Models_Payroll_Gaji_Gaji();
        $mg->setProject($sesion->getProject());
        $mg->setPt($sesion->getPt());
        $dataMg = $daoMG->getAllWOPL($mg);
        if (!Box_Tools::adaRecord($dataMg)) {
            return FALSE;
        }


        $allMG = Box_Tools::toObjects("gaji", $dataMg);
        // $allSp = Box_Tools::toObjects("setuppayroll", $hasil);
        $allSp = Box_Tools::toObjectsb("setuppayroll", $hasil, FALSE, array("komponengaji_"));

        $pgb = new Hrd_Models_Payroll_Proses_ProsesGroupB($month,$year);


        return $pgb->run($allSp, $allMG);
    }

    /* proses yang mengolah semua komponen yang ada di transfer data (import data) */

    private function prosesGROUPX(Box_Models_App_Session $sesion, $month, $year) {
        /// get transfer data
        $dao = new Hrd_Models_Payroll_Transfer_Dao();
        $t = new Hrd_Models_Payroll_Transfer_Transfer();
        $t->setMonth($month);
        $t->setYear($year);
        $t->setProject($sesion->getProject());
        $t->setPt($sesion->getPt());
        $hasil = $dao->getAllDetailByPeriod($t);
        $allProsesGaji = array();

        if (Box_Tools::adaRecord($hasil)) {
            $allTransfer = Box_Tools::toObjects("transferdetail", $hasil);
            foreach ($allTransfer as $td) {
                $pg = new Hrd_Models_Payroll_Proses_Gaji();
                $pg->setEmployee($td->getEmployee());
                $pg->setKomponen($td->getTransfer()->getKomponenGaji());
                $pg->setValue($td->getValue());
                $pg->setGroup(Box_Config::GROUPPAYROLL_X);
            
                
                $allProsesGaji[] = $pg;
            }
            
            return $allProsesGaji;
           
        }
        return FALSE;
    }
    
    
    /* proses yang mengolah semua komponen yang ada di tunjangan tetap */
    private function prosesGROUPZ(Box_Models_App_Session $sesion,$month,$year) {
        //get tunjangan tetap
        $dao = new Hrd_Models_Payroll_Tunjangan_Dao();
        $tt = new Hrd_Models_Payroll_Tunjangan_TunjanganTetap();
        $tt->setProject($sesion->getProject());
        $tt->setPt($sesion->getPt());
        $hasil = $dao->getAllB($tt);
        unset($tt);
        if(Box_Tools::adaRecord($hasil)){
            $allTT = Box_Tools::toObjects("tunjangantetap", $hasil);
            $allProsesGaji = array();
            foreach($allTT as $tt){
                $pg = new Hrd_Models_Payroll_Proses_Gaji();
                $pg->setEmployee($tt->getEmployee());
                $pg->setKomponen($tt->getKomponenGaji());
                $pg->setValue($tt->getValue());
           
                $pg->setGroup(Box_Config::GROUPPAYROLL_Z);
                $allProsesGaji[] = $pg;
            }
            return $allProsesGaji;
        }
        
        return FALSE;
    }
    

    /* @return boolean */

    private function validate(Box_Models_App_Session $sesion, $month, $year) {
        $month = intval($month);
        $year = intval($year);

        $groupB = $this->getGroupBPayroll();

        if (!Box_Tools::validMonth($month)) {
            $this->msg = "Bulan tidak valid";
            return FALSE;
        }
        if (!Box_Tools::validYear($year)) {
            $this->msg = "Tahun tidak valid";
            return FALSE;
        }

        if ($groupB == 0) {
            $this->msg = "Tidak ada group payroll";
            return FALSE;
        }




        return $groupB;
    }

    public function getMsg() {
        return $this->msg;
    }

}
