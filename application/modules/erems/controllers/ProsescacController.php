<?php

class Erems_ProsescacController extends Erems_Models_App_Template_AbstractMasterController {

    public function _getMainDataModel() {
        $dao = new Erems_Models_Cac_ProsesDao();
        //  $dao->setSession($this->getAppSession());
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Erems_Box_Models_App_DataListCreator('', 'prosescac', array('cac'), array()));
        $dm->setObject(new Erems_Models_Cac_Proses());
        $dm->setDao($dao);
        $dm->setValidator(NULL);
        $dm->setIdProperty("prosescac_id");
        return $dm;
    }

    public function mainCreate() {

 
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setObject(NULL);
        $dm->setDao(NULL);
        $dm->setValidator(NULL);

        return $dm;
    }

    public function allRead() {
        $data = $this->getAppData();
        $dm = $this->_getMainDataModel();
        if ($dm instanceof Erems_Box_Models_App_Hermes_DataModel) {
            $dataList = $dm->getDataList();
            $dao = $dm->getDao();
            $obj = $dm->getObject();
            $obj->setArrayTable($data);


            if ($obj instanceof Erems_Box_Models_Master_InterProjectPt) {
                $ses = $this->getAppSession();
                $obj->setProject($ses->getProject());
                $obj->setPt($ses->getPt());
            }

            $prosesFilter = new Erems_Models_Cac_Proses();

            $prosesFilter->setProject($this->getAppSession()->getProject());
            $prosesFilter->setPt($this->getAppSession()->getPt());
            $hasil = $dao->getAll($this->getAppRequest(), $prosesFilter, $data);

            $dm->setDataList($dataList);
            $dm->setHasil($hasil);
        }

        return $dm;
    }

    public function prosescacRead() {




        $hasil = FALSE;
        $msg = "Proses...";

        $data = $this->getAppData();
        $date = $data["proses_date"];
       
        $periodeStart = $data["periode_start"];
        $periodeEnd = $data["periode_end"];


        
        $dao = new Erems_Models_Cac_ProsesDao();
        
        $pCacFilter = new Erems_Models_Cac_Proses();
        $pCacFilter->setProject($this->getAppSession()->getProject());
        $pCacFilter->setPt($this->getAppSession()->getPt());
        $pCacFilter->setPeriodeStart($periodeStart);
        $pCacFilter->setPeriodeEnd($periodeEnd);
        
        ////////////////////////// JUMLAH BY TANGGAL PROSES ////////////////
        $jmlByTglProses = $dao->getJumlahByTglProses($this->getAppSession()->getProject()->getId(),
                $this->getAppSession()->getPt()->getId()
                ,$date);
        
        
        
        /////////////////////////// DATA PURCHASELETTER .//////////
        
        $purchaseCAC = $dao->getTransaksi($pCacFilter);
        
       
      //  var_dump(count($purchaseCAC[0]));
      //  die();
       
        if(intval($jmlByTglProses["0"]["0"]["totalRow"]) > 0){
            $msg = "Transaksi untuk tanggal ".date("d-m-Y",  strtotime($date))." sudah ada.";
        }else if (count($purchaseCAC[0]) > 0) {
            
            


            /// global parameter
            $paramsRequestResult = Erems_Box_Tools::globalParamsExistProsesCAC($this->getAppSession());
      

            if ($paramsRequestResult["status"]) {
                ////////////////// PROSES ////////////////////
                $transaksi = new Erems_Models_Cac_Transaksi();
                $transaksi->dataPenjualan = $purchaseCAC[0];
                $transaksi->setKelipatan( (double) $paramsRequestResult["parameters"]["PROSESCAC_NILAI_KELIPATAN"]);
                $transaksi->setNomorAwal(count($purchaseCAC[1])==0?1:$purchaseCAC[1][0]['nomor_terakhir']);
                $transaksi->proses();

                //  var_dump($purchaseCAC);
                /// header
                $header = $transaksi->getHasilHeader();
                $allHeader = array();
                foreach ($header as $key => $value) {
                    $newHeader = new Erems_Models_Cac_Proses();
                    $newHeader->getCac()->setId($key);
                    $newHeader->setSalesPrice($value["harga_sales"]);
                    $newHeader->setHargaJualTotal($value["total_jual"]);
                    $newHeader->setPoint($value["point"]);
                    $newHeader->setHargaNetto($value["netto"]);
                    
                    $allHeader[] = $newHeader;
                }
                $decanHeader = Erems_Box_Tools::toDecan($allHeader);
                //var_dump($decanHeader->getDCResult());
                /// detail
                $detail = $transaksi->getHasilDetail();
                $allDetail = array();
                foreach ($detail as $row) {
                    $newDetail = new Erems_Models_Cac_Detail();
                    $newDetail->getPurchaseletter()->setId($row["purchase_id"]);
                    $newDetail->setPoint($row["point"]);
                    $newDetail->getCac()->setId($row["cac"]);
                    $newDetail->setProsesDate($date);
                    $allDetail[] = $newDetail;
                }
                $decanDetail = Erems_Box_Tools::toDecan($allDetail);
                //var_dump($decanDetail->getDCResult());


                $nomor = $transaksi->getHasilNomor();
                $allNomor = array();
                foreach ($nomor as $row) {
                    $newNomor = new Erems_Models_Cac_Nomor();
                    $newNomor->setNomor($row["nomor"]);
                    $newNomor->getPurchaseletter()->setId($row["purchase_id"]);
                    $newNomor->getCac()->setId($row["cac"]);
                    $allNomor[] = $newNomor;
                }
                $decanNomor = Erems_Box_Tools::toDecan($allNomor);
                //var_dump($decanNomor->getDCResult());

                $hasil = $dao->save($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId(), $this->getAppSession()->getUser()->getId(), $date, $periodeStart, $periodeEnd, $decanHeader->getDCResult(), $decanDetail->getDCResult(), $decanNomor->getDCResult());
           
                /// update header
                $sum = $dao->getSumHeader($this->getAppSession()->getProject()->getId(),$this->getAppSession()->getPt()->getId());
                
                $sum = Erems_Box_Tools::toObjectResult($sum,new Erems_Models_Cac_Proses());
                $decanSum  = Erems_Box_Tools::toDecan($sum);
                $hasil = $dao->saveSumHeader($this->getAppSession()->getProject()->getId(),$this->getAppSession()->getPt()->getId(),$this->getAppSession()->getUser()->getId(), $decanSum->getDCResult());
                
                
                
                
               
            }else{
                $msg = $paramsRequestResult["msg"];
            }
         
        } else {
            
            
            $msg = "Tidak ada data transaksi dalam periode ini atau purchaseletter sudah di proses cac.";
        }

        $arrayRespon = array("HASIL" => $hasil,
            "MSG" => $msg);
        return Erems_Box_Tools::instantRead($arrayRespon, array());
    }

    public function cacdetailRead() {

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'prosescacdetail', array('unitb', 'clusterb', 'purchaselettertransaction', 'price','pricetype'), array());

        $dao = new Erems_Models_Cac_ProsesDao();
        $data = $this->getAppData();

        $hasil = $dao->getDetail($this->getAppRequest(), intval($data["prosescac_id"]));
        // $hasil = array();
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);


        return $dm;
    }

    public function cacnomorRead() {

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'prosescacnomor', array(), array());

        $dao = new Erems_Models_Cac_ProsesDao();
        $data = $this->getAppData();

        $hasil = $dao->getNomor($this->getAppRequest(), intval($data["prosescacdetail_id"]));


        $dm->setDataList($dataList);
        $dm->setHasil($hasil);


        return $dm;
    }

}

?>
