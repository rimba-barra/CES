<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ProsesGroupB
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Payroll_Proses_ProsesGroupB {

    private $allProsesGaji;
    private $month;
    private $year;

    public function __construct($month,$year) {
        $this->allProsesGaji = array();
        $this->month = $month;
        $this->year = $year;
    }

    public function run($allSetup = array(), $allMasterGaji = array()) {
        foreach ($allMasterGaji as $mg) {
            if ($mg instanceof Hrd_Models_Payroll_Gaji_Gaji) {
                foreach ($allSetup as $setup) {
                    if ($setup instanceof Hrd_Models_Payroll_Setup_Setup) {
                        $this->prosesDanaPensiun($mg, $setup);
                        $this->prosesAstek($mg, $setup);
                        // var_dump($setup->getKomponen()->getArrayTable());
                    }
                }
            }
        }

        return $this->allProsesGaji;
    }

    

    private function prosesDanaPensiun(Hrd_Models_Payroll_Gaji_Gaji $mg, Hrd_Models_Payroll_Setup_Setup $sp) {
        if ($mg->getIsDanaPensiun()) {
            if ($sp->getKomponen()->getCode() == Box_Config::KOMPONENGAJI_CODE_DANAPENSIUNCOMPANY) {
                $this->addProsesGaji($mg, $sp,($mg->getDapenPerusahaan() / 100) * $mg->getGaji());
            }
            if ($sp->getKomponen()->getCode() == Box_Config::KOMPONENGAJI_CODE_DANAPENSIUNKARYAWAN) {
                $this->addProsesGaji($mg, $sp,($mg->getDapenKaryawan() / 100) * $mg->getGaji());
            }
        }
    }
    
    private function prosesAstek(Hrd_Models_Payroll_Gaji_Gaji $mg, Hrd_Models_Payroll_Setup_Setup $sp) {
        if ($mg->getIsAstek()) {
            if ($sp->getKomponen()->getCode() == Box_Config::KOMPONENGAJI_CODE_JAMINANKECELEKAAN) {
                $this->addProsesGaji($mg, $sp,($mg->getAstekKecelakaan() / 100) * $mg->getGaji());
            }
            if ($sp->getKomponen()->getCode() == Box_Config::KOMPONENGAJI_CODE_JAMINANKEMATIAN) {
                $this->addProsesGaji($mg, $sp,($mg->getAstekKematian() / 100) * $mg->getGaji());
            }
        }
    }

    private function addProsesGaji($mg,$sp,$value) {
        $pg = new Hrd_Models_Payroll_Proses_Gaji();
        $pg->setEmployee($mg->getEmployee());
        $pg->setKomponen($sp->getKomponen());
        $pg->setValue($value);
        $pg->setGroup(Box_Config::GROUPPAYROLL_B);
        $this->allProsesGaji[] = $pg;
    }

}
