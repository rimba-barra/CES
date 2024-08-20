<?php

require_once dirname(__DIR__) . '../library/apli/ApliController.php';

class Erems_KomisitranController extends ApliController {

    public function printpdfRead() {

        $params = $this->getRequest()->getPost();

        $session = Apli::getSession();

        $genco = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($session->getProject()->getId(), $session->getPt()->getId());




        $pdf = NULL;

        $hasil = FALSE;
        $ids = '1';
      //  $dataKomisi = array('1');
        $allKomisi = array();
        
         $dao = new Erems_Models_Komisi_Dao();
        $komisi = new Erems_Models_Komisi_KomisiTran();

        $komisi->setId($params["komisitran_id"]);
        
        $dataKomisi = $dao->getOne($komisi->getId());
        $dataKomisi = $dataKomisi[0][0];
        
     
        
        // pisahkan ke dalam 2 array
          $fieldKomisi = array('ybs', 'sales_co', 'head_sales', 'head_adm', 'team', 'kas', 'manager_marketing');
          $moneyField = array();
          foreach($fieldKomisi as $row){
              $moneyField[] = "komisipph_".$row;
              $moneyField[] = "komisinilai_".$row;
              $moneyField[] = "komisidpp_".$row;
              $moneyField[] = "komisibayar_".$row;
          }
          $moneyField[] = "total_komisipersen"; $moneyField[] = "total_komisinilai"; $moneyField[] = "total_komisidpp"; $moneyField[] = "total_komisibayar";
          $moneyField[] = "price_harga_neto"; $moneyField[] = "harganetto_klaim"; $moneyField[] = "harga_total_jual"; $moneyField[] = "pl_total_payment";
          $moneyField[] = "pl_persen_payment";
         
          
          $dateField = array();
          $dateField[] = "purchase_date"; $dateField[] = "komisitran_date";$dateField[] = "pl_payment_date_terakhir";
          
        $fields = array();
        $values = array();
        foreach($dataKomisi as $k=>$v){
            $fields[] = "{{".$k."}}";
            
            if(in_array($k,$moneyField)){
                $values[] = number_format($v, 2);
            }else if(in_array($k,$dateField)){
                $values[] = date("d-m-Y", strtotime($v));
            }else{
                $values[] = $v;
            }
        }
        
        $fields[] = "{{terbilang}}";
        $values[] = Erems_Box_Library_Terbilang::terbilang($dataKomisi['komisibayar_ybs'], 3);
        
        
        
      
        $template = file_get_contents(APPLICATION_PATH . '/../public/app/erems/uploads/html/komisi/default.html', true);
        $konten = str_replace($fields, $values, $template);
        
        $hasil = TRUE;
        





        return array(
            "data" => array(
                "HASIL" => $hasil,
            //    "FILE" =>"app/erems/uploads/pdf/komisi/".$pdf->getFileName(),
                "KONTEN"=>$konten
            )
        );
    }

    public function forminitRead() {
        return array(
            "data" => "foo"
        );
    }

    public function getnomorRead() {


        $params = $this->getRequest()->getPost();

        $session = Apli::getSession();

        $tahun = date(date("Y", strtotime($params["tanggal"])));

        $dao = new Erems_Models_Komisi_Dao();
        $lastNomor = $dao->getNomorAkhir($session->getProject()->getId(), $session->getPt()->getId(), $tahun);

        if (count($lastNomor[0]) > 0) {
            $lastNomor = $lastNomor[0][0]["nomor_akhir"];
        } else {
            $lastNomor = 0;
        }
        
       


        //  var_dump($lastNomor);
        // var_dump($tanggal);
        $pNomor = array(
            "tahun" => $tahun,
            "bulan" => date(date("n", strtotime($params["tanggal"]))),
            "nomor_baru" => $lastNomor + 1
        );
        $nomor = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($session->getProject()->getId(), $session->getPt()->getId())->formatNomorKomisi($pNomor);


        return array(
            "DATA" => $nomor,
			"MODELKOMISI" => Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($session->getProject()->getId(), $session->getPt()->getId())->getModelKomisi()
		);
    }

    public function masterkomisioneRead() {


        $params = $this->getRequest()->getPost();

        $dao = new Erems_Models_Komisi_Master_Dao();
        $komisi = new Erems_Models_Komisi_Master_MasterKomisi();

        $komisi->setId($params["komisi_id"]);

        return array(
            "DATA" => $dao->getOne($komisi->getId())
        );
    }

    public function masterkomisilistRead() {


        $params = $this->getRequest()->getPost();

        $sesBox = Apli::getSession();

        $dao = new Erems_Models_Komisi_Master_Dao();
        $komisi = new Erems_Models_Komisi_Master_MasterKomisi();
        $komisi->setArrayTable($params);
        $komisi->setProject($sesBox->getProject());
        $komisi->setPt($sesBox->getPt());

        $hasil = $dao->getAll(Apli::getRequest($params), $komisi);

        return array(
            "DATA" => $hasil
        );
    }

    public function purchaseletteroneRead() {


        $params = $this->getRequest()->getPost();

        $pl = new Erems_Models_Purchaseletter_PurchaseLetter();
        $pl->setId(intval($params["purchaseletter_id"]));
        $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
        $hasil = $dao->getOne($pl->getId());

        return array(
            "DATA" => $hasil
        );
    }

    public function purchaseletterlistRead() {


        $params = $this->getRequest()->getPost();

        $sesBox = Apli::getSession();

        $dao = new Erems_Models_Komisi_Dao();

        $pl = new Erems_Models_Purchaseletter_PurchaseLetter();
        //$pl->setArrayTable($params);
        $pl->getCustomer()->setName($params["customer_name"]);
        $pl->getUnit()->setNumber($params["unit_number"]);
        $hasil = $dao->getAllPurchaseletter(Apli::getRequest($params), $sesBox, $pl);

        return array(
            "DATA" => $hasil
        );
    }

    public function detailRead() {
        $params = $this->getRequest()->getPost();

        $dao = new Erems_Models_Komisi_Dao();
        $komisi = new Erems_Models_Komisi_KomisiTran();

        $komisi->setId($params["komisitran_id"]);

        return array(
            "komisitran" => $dao->getOne($komisi->getId()),
        );
    }

    public function hapusRead() {
        $session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $params = $this->getRequest()->getPost();

        $dao = new Erems_Models_Komisi_Dao();

        $sesBox = Apli::getSession();

        $ids = array(intval($params["komisitran_id"]));
        $ids = implode("~", $ids);

        //  $decan->set
        $hapus = $dao->delete($ids, $sesBox);

        return array(
            "status" => $hapus
        );
    }

    public function allRead() {

        $session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $session->report_path = APPLICATION_PATH . '/../public/app/erems/report/';

        $params = $this->getRequest()->getPost();

        $eremsReq = new Erems_Box_Models_App_HasilRequestRead(array());
        $start = $params["start"];
        $page = $start > 0 ? ($start / $params["limit"]) + 1 : 1;
        $eremsReq->setArrayForm($params);
        $eremsReq->setPage($page);
        $eremsReq->setLimit($params["limit"]);

        $sesBox = new Erems_Box_Models_App_Session();
        $sesBox->getProject()->setId($session->getCurrentProjectId());
        $sesBox->getPt()->setId($session->getCurrentPtId());

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'komisitran', array('unitb', 'purchaseletter', 'komisi'), array());
        $dao = new Erems_Models_Komisi_Dao();
        $komisi = new Erems_Models_Komisi_KomisiTran();
        $komisi->setArrayTable($params);
        $komisi->setProject($sesBox->getProject());
        $komisi->setPt($sesBox->getPt());



        $hasil = $dao->getAll($eremsReq, $komisi);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        $dl = $dm->getDataList();
        $dl->setDataDao($hasil);

        $hasilData = Apli::prosesDao($dm->getDataList());

        return array(
            "model" => Apli::generateExtJSModel($dm->getDataList()),
            "data" => $hasilData["data"],
            "totalRow" => $hasilData["row"]
        );
    }

    public function initRead() {

        $session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $session->report_path = APPLICATION_PATH . '/../public/app/erems/report/';

        $params = $this->getRequest()->getPost();



        $sesBox = new Erems_Box_Models_App_Session();
        $sesBox->getProject()->setId($session->getCurrentProjectId());
        $sesBox->getPt()->setId($session->getCurrentPtId());




        $mc = new Erems_Models_App_Masterdata_Cluster();
        $ac = $mc->prosesDataWithSession($sesBox, TRUE);



        $pmDao = new Erems_Models_Master_AppDao();
        $pmdl = new Erems_Box_Models_App_DataListCreator('', 'paymentmethod', array(), array());
        $pmDlData = $pmDao->getAllPaymentMethod();

        $blDao = new Erems_Models_Master_BlockDao();
        $bldl = new Erems_Box_Models_App_DataListCreator('', 'blockb', array(), array());
        $bl = new Erems_Models_Master_BlockTran();
        $bl->getProject()->setId($session->getCurrentProjectId());
        $bl->getPt()->setId($session->getCurrentPtId());

        $blData = $blDao->getByCPP($bl);

        $clDao = new Erems_Models_Master_ClusterDao();
        $cl = new Erems_Models_Master_ClusterTran();
        $cl->getProject()->setId($session->getCurrentProjectId());
        $cl->getPt()->setId($session->getCurrentPtId());
        $cldl = new Erems_Box_Models_App_DataListCreator('', 'clusterb', array(), array());
        $clData = $clDao->getByProjectPt($cl);
        // var_dump($clDao->getByProjectPt($cl));


        return array(
            "data" => array(
                "paymentmethods" => array(
                    "model" => Apli::generateExtJSModel($pmdl),
                    "data" => $pmDlData[1],
                ),
                "blocks" => array(
                    "model" => Apli::generateExtJSModel($bldl),
                    "data" => $blData[1],
                ),
                "clusters" => array(
                    "model" => Apli::generateExtJSModel($cldl),
                    "data" => $clData[1],
                )
            )
        );
    }

    public function saveRead() {

        $params = $this->getRequest()->getPost();
        $data = json_decode($params["data"], TRUE);


        $sesBox = Apli::getSession();

        $komisi = new Erems_Models_Komisi_KomisiTran();
        $komisi->setArrayTable($data);
        $komisi->setProject($sesBox->getProject());
        $komisi->setPt($sesBox->getPt());
        $komisi->setAddBy($sesBox->getUser()->getId());


        $validator = new Erems_Models_Komisi_Validator();
        $validator->run($komisi);

        $msg = $validator->getMsg();
        $status = $validator->getStatus();

        if ($validator->getStatus()) {
            $dao = new Erems_Models_Komisi_Dao();
            $hasilSave = 0;

            $hasilSave = $dao->save($komisi);


            if ($hasilSave <= 0) {
                $status = FALSE;
                $msg = "Terjadi kesalahan pada saat menyimpan permintaan komisi.";
            } else {
                $status = TRUE;
            }
        }

        return array(
            "STATUS" => $status,
            "MSG" => $msg
        );
    }

    public function updateRead() {
        $params = $this->getRequest()->getPost();
        $data = json_decode($params["data"], TRUE);


        $sesBox = Apli::getSession();

        $komisi = new Erems_Models_Komisi_KomisiTran();
        $komisi->setArrayTable($data);
        $komisi->setProject($sesBox->getProject());
        $komisi->setPt($sesBox->getPt());
        $komisi->setModiBy($sesBox->getUser()->getId());


        $validator = new Erems_Models_Komisi_Validator();
        $validator->run($komisi);

        $msg = $validator->getMsg();
        $status = $validator->getStatus();

        if ($validator->getStatus()) {
            $dao = new Erems_Models_Komisi_Dao();
            $hasilSave = 0;

            $hasilSave = $dao->update($komisi);


            if ($hasilSave <= 0) {
                $status = FALSE;
                $msg = "Terjadi kesalahan pada saat menyimpan permintaan komisi.";
            } else {
                $status = TRUE;
            }
        }

        return array(
            "STATUS" => $status,
            "MSG" => $msg
        );
    }

}
