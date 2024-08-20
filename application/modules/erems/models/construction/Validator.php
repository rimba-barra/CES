<?php

/**
 * Description of Validator
 *
 * @author MIS
 */
class Erems_Models_Construction_Validator extends Erems_Box_Models_App_Validator {

    private $spkType;
    private $params;

    public function setSpkType($st) {
        $this->spkType = $st;
    }

    public function setParams($params){
        $this->params = $params;
    }

    public function run(Erems_Models_Construction_Construction $construction) {
        $msgEr = "Unknown Error.";

        if ($this->spkType == Erems_Box_Config::SPKTYPE_NONUNIT) {
            
            $dao = new Erems_Models_Construction_Dao();
            $hasil = $dao->getTopProgressB($construction);
           
            $topProgress = $hasil[0][0]["progress"];
            
            if($topProgress >= 100 && $construction->getId() != $hasil[0][0]["construction_id"]){
                $msgEr = "Last progress already reach 100%";
            }else if($construction->getProgressPersen() > 100){
                $msgEr = "Max progress is 100";
            }else if(($construction->getProgressPersen() <= $topProgress) && ($hasil[0][0]["construction_id"] != $construction->getId()) && $construction->getId()==0){
                $msgEr = "Progress percent must be higher than the last progress percent";
            }else if (!$construction->getProgressDate()) {
                $msgEr = "Please insert progress date";
            } else if ($construction->getProgressPersen() == 0) {
                $msgEr = "Please insert progress percent";
            } else if ($construction->getSpk()->getId() == 0) {
                $msgEr = "Please insert SPK";
            } else {
                $this->setStatus(TRUE);
            }
        } else {
            $dao = new Erems_Models_Construction_Dao();
            $hasil = $dao->getTopProgressB($construction);
          
            $topProgress = $hasil[0][0]["progress"];
          
            // addon 20170706
            // cek jika kpr maka cek pencairan
            $pencairanAda = FALSE;
            $purchaseKPR = FALSE;
            $adaProgressUnit = FALSE;
           
            $plDao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
            $plId = intval($this->params["purchaseletter_purchaseletter_id"]);
             $pl = $plDao->getOne($plId);
            $priceType = isset($pl[1][0]["pricetype_pricetype"])?$pl[1][0]["pricetype_pricetype"]:"KOSONG";
           
           // var_dump($pl);
           // var_dump($pl[1][0]["pricetype_pricetype"]);
     
            if($priceType=="KPR"){
				
                $purchaseKPR = TRUE;
                $acDao = new Erems_Models_Admincollection_Dao();
                $acData = $acDao->getPencairanKPR($plId);
                $pencairan =$acData[1];
                if(count($pencairan) > 0){
                    $pencairanAda = TRUE;
                }
                
                
                
                ///@addon 20180706 cek jika sudah ada progress
                $dao = new Erems_Models_Construction_Dao();
                
              
                $paramData = $this->params;
               
                $konsReq = new Erems_Box_Models_App_HasilRequestRead(array());
                $konsReq->setPage(1);
                $konsReq->setLimit(9999);
                $konsReq->setOthersValue("spk_id",$paramData["spk_spk_id"]);
                $konsReq->setOthersValue("unit_id",$paramData["unit_unit_id"]);
                $dataKonstruksi = $dao->getBySpkUnit($konsReq);
             
                if(is_array($dataKonstruksi[1])){
                   if(count($dataKonstruksi[1]) > 0){
                       $adaProgressUnit = TRUE;
                   }
                }
           
                
				
				
            }
            //end cek jika kpr maka cek pencairan
            
            // mark on 20180912
           // if ($purchaseKPR && !$pencairanAda && !$adaProgressUnit) {
            //    $msgEr = "Tidak ada data pencairan KPR. Silahkan generate Pencairan KPR terlebih dahulu";
            if($topProgress >= 100 && $construction->getId() != $hasil[0][0]["construction_id"]){
                $msgEr = "Last progress already reach 100%";
            }else if($construction->getProgressPersen() > 100){
                $msgEr = "Max progress is 100";
            }else if(($construction->getProgressPersen() <= $topProgress) && ($hasil[0][0]["construction_id"] != $construction->getId()) && $construction->getId()==0){
                $msgEr = "Progress percent must be higher than the last progress percent";
            }else if (!$construction->getProgressDate()) {
                $msgEr = "Please insert progress date";
            } else if ($construction->getProgressPersen() == 0) {
                $msgEr = "Please insert progress percent";
            } else if ($construction->getSpk()->getId() == 0) {
                $msgEr = "Please insert SPK";
            } else if ($construction->getUnit()->getId() == 0) {
                $msgEr = "Please insert Unit";
            
            } else {
                $this->setStatus(TRUE);
            }
        }




        $this->setMsg($msgEr);
    }

}

?>
