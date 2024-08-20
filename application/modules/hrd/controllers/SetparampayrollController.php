<?php

/**
 * 
 *
 * @author MIS
 */
class Hrd_SetparampayrollController extends Box_Models_App_Hermes_AbstractController {

    private $moduleName = 'employeeparameter';

    protected function testingFlag() {
        return FALSE;
    }

    
    
    
    
    public function allRead(){
        $paramLains = NULL;
        // param lain lain
        
        $dao = new Hrd_Models_Payroll_Param_Dao();
        $p = new Hrd_Models_Payroll_Param_Lainlain();
        $p->setProject($this->getAppSession()->getProject());
        $p->setPt($this->getAppSession()->getPt());
        $params = $dao->getParams($p);
        if(Box_Tools::adaRecord($params)){
            $paramLains = Box_Tools::toObjects('payparamlain', $params,TRUE);
        }
        
     
        
        
        
        return Box_Tools::instantRead(array(
            "HASIL"=>1
        ),array($paramLains
        ));
    }
    
    public function parameterRead(){
        
 
   
        
        $mb = new Hrd_Models_App_Mastertable_KomponenGaji();
        $bb = $mb->prosesDataWithSession($this->getAppSession(), TRUE);
        
        $mc = new Hrd_Models_App_Mastertable_Group();
        $cc = $mc->prosesDataWithSession($this->getAppSession(), TRUE);

        
        return Box_Tools::instantRead(array(
            "HASIL"=>1
        ),array($bb,$cc));
    }
    
    public function ptkpRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'payparamptkp', array(), array());
        $dao = new Hrd_Models_Payroll_Param_Dao();
        $ptkp = new Hrd_Models_Payroll_Param_Ptkp();
        $ptkp->setProject($this->getAppSession()->getProject());
        $ptkp->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAllPtkp($ptkp);

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    
    public function tunjangangroupRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'tunjangangroup', array('group','komponengaji'), array());
        $dao = new Hrd_Models_Payroll_Param_Dao();
        $tg = new Hrd_Models_Payroll_Tunjangan_TunjanganGroup();
        $tg->setArrayTable($this->getAppData());
        
        $tg->setProject($this->getAppSession()->getProject());
        $tg->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAllTunjanganGroup($tg);

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    
    public function pajakRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'payparampajak', array(), array());
        $dao = new Hrd_Models_Payroll_Param_Dao();
        $pajak = new Hrd_Models_Payroll_Param_Pajak();
        $pajak->setProject($this->getAppSession()->getProject());
        $pajak->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAllPajak($pajak);

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    
    public function bayarRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'payparambayar', array('komponengaji'), array());
        $dao = new Hrd_Models_Payroll_Param_Dao();
        $bayar = new Hrd_Models_Payroll_Param_Bayar();
        $bayar->setProject($this->getAppSession()->getProject());
        $bayar->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAllBayar($bayar);

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
        
        $param = new Hrd_Models_Payroll_Param_Lainlain();
        $param->setArrayTable($data);
        $param->setAddBy($this->getAppSession()->getUser()->getId());
        $param->setProject($this->getAppSession()->getProject());
        $param->setPt($this->getAppSession()->getPt());
        
        
        /// ptkp
      
        $dataPtkp = $data["ptkp"];
        $decanPtkp = NULL;
        if(count($dataPtkp) > 0){
            $allPtkp = array();
            foreach ($dataPtkp as $row){
                $ptkp = new Hrd_Models_Payroll_Param_Ptkp();
                $ptkp->setArrayTable($row);
                $allPtkp[] = $ptkp;
            }
            
            $decanPtkp = Box_Tools::toDecan($allPtkp);
            
        }
        
       
        
        /// pajak
      
        $dataPajak = $data["pajak"];
        $decanPajak = NULL;
        if(count($dataPajak) > 0){
            $allPajak = array();
            foreach ($dataPajak as $row){
                $pajak = new Hrd_Models_Payroll_Param_Pajak();
                $pajak->setArrayTable($row);
                $allPajak[] = $pajak;
            }
            
            $decanPajak = Box_Tools::toDecan($allPajak);
            
        }
        
        /// bayar
      
        $dataBayar = $data["bayar"];
        $decanBayar = NULL;
        if(count($dataBayar) > 0){
            $allBayar = array();
            foreach ($dataBayar as $row){
                $bayar = new Hrd_Models_Payroll_Param_Bayar();
                $bayar->setArrayTable($row);
                $allBayar[] = $bayar;
            }
            
            $decanBayar = Box_Tools::toDecan($allBayar);
            
        }
        
        /// bayar
      
        $dataTunjangan = $data["tunjangan"];
        $decanTunjangan = NULL;
        if(count($dataTunjangan) > 0){
            $allTunjangan = array();
            foreach ($dataTunjangan as $row){
                $tunjangan = new Hrd_Models_Payroll_Tunjangan_TunjanganGroup();
                $tunjangan->setArrayTable($row);
                $allTunjangan[] = $tunjangan;
            }
            
            $decanTunjangan = Box_Tools::toDecan($allTunjangan);
            
        }
        
        
        
        $dao = new Hrd_Models_Payroll_Param_Dao();
        
        $hasilSave = $dao->save($param,$decanPtkp,$data["deleted_id"]['ptkp'],$decanPajak,$data["deleted_id"]['pajak'],
                $decanBayar,$data["deleted_id"]['bayar'],
                $decanTunjangan,$data["deleted_id"]['tujago']);
        


        $dm->setHasil(array("msg" => $msg, "status" => $hasilSave ? TRUE : FALSE));
        return $dm;
    }

   /* public function mainDelete() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setObject(new Hrd_Models_Sanction_Sanction());
        $dm->setDao(new Hrd_Models_Sanction_Dao());
        $dm->setIdProperty("sanction_id");
        return $dm;
    }*/

    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_Processor();
    }

}

?>
