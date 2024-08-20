<?php

/**
 * 
 *
 * @author MIS
 */
class Hrd_EditgajiController extends Box_Models_App_Hermes_AbstractController {

    private $moduleName = 'editgaji';

    protected function testingFlag() {
        return FALSE;
    }

    public function allRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'editgaji', array('employee'), array());
        $dao = new Hrd_Models_Payroll_Editgaji_Dao();
        $eg = new Hrd_Models_Payroll_Editgaji_Editgaji();
        $eg->setProject($this->getAppSession()->getProject());
        $eg->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAll($this->getAppRequest(),$eg);

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function mainCreate() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setUseProcess(FALSE);

        $data = $this->getAppData();
        $hasilSave = FALSE;
        $msg = "Process...";
        $eg = new Hrd_Models_Payroll_Editgaji_Editgaji();
        $eg->setArrayTable($data);
        $eg->setProject($this->getAppSession()->getProject());
        $eg->setPt($this->getAppSession()->getPt());
        if ($eg->getEmployee()->getId()==0) {
             $msg = "Karyawan tidak valid"; 
        } else {
           $dao = new Hrd_Models_Payroll_Editgaji_Dao();
           $hasilSave = $dao->save($eg);
           $msg = "Success";
        }


        $dm->setHasil(array("msg" => $msg, "status" => $hasilSave ? TRUE : FALSE));
        return $dm;
    }
    
    
    public function prosesRead() {
        $hasil = FALSE;
        $params = $this->getAppData();
    
        $msg = "Proses...";
        
        /// ambil semua edit gaji
        $dao = new Hrd_Models_Payroll_Editgaji_Dao();
        $eg = new Hrd_Models_Payroll_Editgaji_Editgaji();
        $eg->setProject($this->getAppSession()->getProject());
        $eg->setPt($this->getAppSession()->getPt());
        
        $allEg = $dao->getAllWOPL($eg);
        unset($eg);
        $allGaji = array();
        if(Box_Tools::adaRecord($allEg)){
            $date = new DateTime();
     
            $allEg = Box_Tools::toObjects("editgaji",$allEg,FALSE);
            foreach($allEg as $eg){
                
                // cek jika ada perubahan gaji dan periode masih berlaku
                if($eg->getGajiBaru() > 0 && $eg->getPeriode() <= $date->format("Y-m-d")){
                   
                    $gaji = new Hrd_Models_Payroll_Gaji_Gaji();
                    $gaji->setEmployee($eg->getEmployee());
                    $gaji->setGaji($eg->getGajiBaru());
                    $allGaji[] = $gaji;
               }
            }
        }
        
        // cek jika ada yg masuk dalam perubahan gaji
        if(count($allGaji) > 0){
            $decan = Box_Tools::toDecan($allGaji);
            
            $hasil = $dao->updateGaji($this->getAppSession(), $decan);
        }
        
        $arrayRespon = array("STATUS" => $hasil, "MSG" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }

    

    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_Processor();
    }

}

?>
