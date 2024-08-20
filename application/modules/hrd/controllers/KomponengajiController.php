<?php

/**
 * Description of DepartmentController
 *
 * @author MIS
 */
class Hrd_KomponengajiController extends Hrd_Models_App_Template_AbstractMasterController {

    public function _getMainDataModel() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Box_Models_App_DataListCreator('', 'komponengaji', array(), array()));
        $dm->setObject(new Hrd_Models_Payroll_Komponen_Komponen());
        $dm->setDao(new Hrd_Models_Payroll_Komponen_Dao());
        $dm->setValidator(new Hrd_Models_Payroll_Komponen_Validator());
        $dm->setIdProperty("komponengaji_id");
        return $dm;
    }

    public function processcsvfileRead() {
        $data = $this->getAppData();
        $success = FALSE;
        $msg = "...";
        $fn = $data["file_name"];
  
        $allKomponen = array();
        $fn = realpath(APPLICATION_PATH . '/../' . Box_Config::KOMPONENGAJICSV_PATH . $fn);
        if (file_exists($fn)) {
            if (($handle = fopen($fn, "r")) !== FALSE) {
                while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
                    $num = count($data);
                    //  echo "<p> $num fields in line $row: <br /></p>\n";
                   
                    $komponenGaji = new Hrd_Models_Payroll_Komponen_Komponen();
                    $komponenGaji->setCode($data[0]);
                    $komponenGaji->setDescription($data[1]);
                    $komponenGaji->setPphBaris($data[2]);
                    $komponenGaji->setPlusMinus($data[3]);
                    $komponenGaji->setKpph($data[4]);
                    $komponenGaji->setTunjanganPotongan($data[5]);
                    
                    $allKomponen[] = $komponenGaji;
                    
                }
                fclose($handle);
            } else {
                $msg = "Tidak bisa membuka file";
            }
        } else {
         
            $msg = "Tidak ada file csv";
        }
        
        if(count($allKomponen) > 0){
            $decan = Box_Tools::toDecan($allKomponen);
            
         
       
            $dao = new Hrd_Models_Payroll_Komponen_Dao();
            $success = $dao->saveMulti($this->getAppSession(), $decan);
        }


        return Box_Tools::instantRead(array(
                    "HASIL" => $success,
                    "MSG" => $msg
        ));
    }

    public function uploadRead() {

        $ses = $this->getAppSession();


        $data = $this->getAppData();

        $msg = '???';
        $success = FALSE;
        $modeUpload = $data["type"];
        $fileUpload = NULL;
        if ($modeUpload == "csv") {
            $fileUpload = new Box_Models_App_FileUpload("/" . Box_Config::KOMPONENGAJICSV_PATH, "masterkomponengaji_" . $ses->getProject()->getId() . "_" . $ses->getPt()->getId(), "csv");
        }
        $fileUpload->run();
        if (!$fileUpload->isSuccess()) {
            $msg = $fileUpload->getErrorMsg();
        } else {
            $success = TRUE;
            $msg = $fileUpload->getFileName();
        }

        $arrayRespon = array("HASIL" => $success, "MSG" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }

}

?>
