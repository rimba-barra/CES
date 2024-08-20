<?php

class Erems_GantinamaController extends Erems_Box_Models_App_Hermes_AbstractController {

    protected function testingFlag() {
        return FALSE;
    }
    
    public function allRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'changename', array('purchaseletter', 'unitb','clusterb','blockb',
            'changenamereason','purchaseletterrevision', array('customer', 'customernew_'), array('customer', 'customerold_')),array("deletedRows"));
        $dao = new Erems_Models_Sales_Change_Dao();
        $unit = new Erems_Models_Unit_UnitTran();
        $unit->setProject($this->getAppSession()->getProject());
        $unit->setPt($this->getAppSession()->getPt());
        $data = $this->getAppData();
        $cn = new Erems_Models_Sales_Change_ChangeName();
        $cn->getPurchaseletter()->setNomor($data["purchaseletter_purchaseletter_no"]);
       
        $hasil = $dao->getAllFillter($unit,$this->getAppRequest(),$cn,$this->getAppSession(),$data["unit_number"],$data["customer_name"]);
        
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        return $dm;
    }
    
    public function printinfoRead() {        
        // DATA CHANGE NAME
        $params = $this->getAppData();
        $dao = new Erems_Models_Sales_Change_Dao();
        $cn = new Erems_Models_Sales_Change_ChangeName();
        $cn->setId(intval($params["changename_id"]));
        $cn = $dao->getOneCN($cn);
      
        $cn = Erems_Box_Tools::toObjectRow($cn,new Erems_Models_Sales_Change_ChangeName());
   
        // END DATA CHANGE NAME

        $genco = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId());
        
        $adCNParam = $genco->getAdendumCNParameter();
        $formatCNAd = $adCNParam["FORMAT"];
        $nomor = $formatCNAd;
        
        if(strlen($cn->getAdendumNomor())===0){
            $nomorAkhir = $dao->getNomorAkhirAdendumCN($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId(),$adCNParam["COUNTER_POS"],$adCNParam["COUNTER_LEN"]);
            $nomorAkhir = intval($nomorAkhir[0][0]["nomor_akhir"]);
            $nomorAkhir = $nomorAkhir+1;
            $nomor = str_replace("[COUNTER]",str_pad($nomorAkhir, $adCNParam["COUNTER_LEN"], "0", STR_PAD_LEFT), $formatCNAd);
            $nomor = str_replace("[MONTH_ROMAWI]",Erems_Box_Tools::romawiMonthText(date("m")), $nomor);
            $nomor = str_replace("[TAHUN]",date("Y"), $nomor);
            
            $cn->setAdendumNomor($nomor);
        }

        $arrayRespon = array(
            "NOTHING"=>"NOTHING"
        );
        return Erems_Box_Tools::instantRead($arrayRespon, array($cn));
    }
    
    
    public function initRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        
        $params = array(
            "data_purchaseletter"=>array("productcategory_productcategory_id"=>0)
        );
        
        $template = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(),$this->getAppSession()->getPt()->getId())->getCNAdendumFile($params);
        $template = is_array($template)?$template : array(array("value" =>$template, "text" => "Adendum Template"));
             
        $otherAT = array(array(        
            "TEMPLATEPRINTOUT"=>$template,
            //added by anas 08092021
            "getPurcheletterSendWa" => Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId())->getPurcheletterSendWa(),
            "getPurcheletterSendWaText" => Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId())->getPurcheletterSendWaText(),
            "getValidasiGantiNamaSPPJB" => Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId())->ValidasiGantiNamaSPPJB(),

        ));

        $dm->setHasil(array($otherAT));
        return $dm;
    }

    public function printoutRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $params = $this->getAppData();
        $cn = new Erems_Models_Sales_Change_ChangeName();
        $cn->setArrayTable($this->getAppData());
        $dao = new Erems_Models_Sales_Change_Dao();
        
        /// BEGIN UPDATE INFO PRINT 
        $cn->setModiBy($this->getAppSession()->getUser()->getId());
        
        $validator = new Erems_Models_Sales_Change_Validator();
        $validator->setSession($this->getAppSession());
        $validator->runChangeNameInfoPrint($cn);
        $msgInfoPrint = $validator->getMsg();
        $statusInfoPrint = $validator->getStatus();
        
        if($statusInfoPrint){
            $hasilUpdateInfo = $dao->updateInfoPrintCN($cn);
        }
        
        /// END UPDATE INFO PRINT
        $hasil = $dao->getOneForPrintout($cn);
        $hasil = $hasil[1][0];
        /// terbilang

       // $data['terbilanglt'] = Erems_Box_Library_Terbilang::terbilang($hasil['unit_land_size'], 3);
        $data = $hasil;
        
        $cpDate = $hasil['changename_date'];
      
        $time = strtotime($cpDate);
        $data['hari'] = Erems_Box_Tools::indoDayText(date('D', $time));
        $data['tgl'] = Erems_Box_Library_Terbilang::terbilang(date('j',$time), 2,'');
        $data['tahun'] = Erems_Box_Library_Terbilang::terbilang(date('Y',$time), 2,'');
        $data['bln'] = Erems_Box_Tools::indoMonthText(date('n',$time));
        
        $dateList = array(
            'customernew_birthdate', 'changename_date', 'sppjb_sppjb_date'
        );

        foreach ($dateList as $field) {
            $data[$field] = Erems_Box_Tools::formatDate($data[$field]);
           
        }
        $data['terbilanghj'] = Erems_Box_Library_Terbilang::terbilang($data['purchaseletter_harga_jual'], 3);
        $data['purchaseletter_harga_jual'] = Erems_Box_Tools::toCurrency($data['purchaseletter_harga_jual']);
        
        $data['sumber_dana'] = '';
        $data['status_kerabat'] = '';
        $data['nama_kerabat'] = '';
        $data['wakil_pengembang'] = '';
      
        //parameterSPPJB
        $daopsppjb = new Erems_Models_Master_GeneralDao();
        $paramSppjb = new Erems_Models_Legal_ParameterSPPJB();
        $paramSppjb->setArrayTable($this->getAppData());
        $hasilpsppjb = $daopsppjb->getParameterSPPJB($this->getAppRequest(), $this->getAppSession()->getProject()->getId(),$this->getAppSession()->getPt()->getId(),$paramSppjb);
        $hasilpsppjb = Erems_Box_Tools::toObjectRow($hasilpsppjb,new Erems_Models_Legal_ParameterSPPJB());
        
        if($hasilpsppjb instanceof  Erems_Models_Legal_ParameterSPPJB){
            $data["parametersppjb_akta_no"] = $hasilpsppjb->getAktaNo();
            $data["parametersppjb_akta_date"] = Erems_Box_Tools::formatDate($hasilpsppjb->getAktaDate());
            $data["parametersppjb_name_02"] = $hasilpsppjb->getName02();
            $data["parametersppjb_name_01"] = $hasilpsppjb->getName01();
            $data["parametersppjb_position_01"] = $hasilpsppjb->getPosition01();
            $data["parametersppjb_address_01"] = $hasilpsppjb->getAddress01();
			$data["parametersppjb_position_02"] = $hasilpsppjb->getPosition02();
            $data["parametersppjb_address_02"] = $hasilpsppjb->getAddress02();
            $data["parametersppjb_notaris"] = $hasilpsppjb->getNotaris();
        }
        
        //var_dump($hasilpsppjb->getArrayTable());
        $data["purchaseletter_harga_total_jual_text"] = Erems_Box_Tools::toCurrency($data['purchaseletter_harga_total_jual']);
        $data["purchaseletter_harga_total_jual_terbilang"] = Erems_Box_Library_Terbilang::terbilang($data['purchaseletter_harga_total_jual'], 3);
        
        $data["persetujuan_relasi"] = strtolower($data["persetujuan_relasi"]);
	//var_dump($data);	
        //die();
        
        
        /*
        $fileBangunan = 'SURAT_PENGALIHANHAK_BAN.docx';
        $fileKavling = 'SURAT_PENGALIHANHAK_KAV.docx';
        $fileSrc = $data['productcategory_productcategory_id']==Erems_Box_Config::PRODUCTCATEGORY_BANGUNGAN?$fileBangunan:$fileKavling;
        
        
        $finalFile = 'CN_'.str_replace('/','', $hasil['purchaseletter_purchaseletter_no']).'.docx';
      
         */

        /*
        $genco = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId());
        $fileSrc = $genco->getCNAdendumFile(array(
            "data_purchaseletter" => $data
        ));
         
         */
        
         $genco = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId());
        
        /////// TAGIHAN 
        $daoPL = new Erems_Models_Purchaseletter_PurchaseLetterDao();
        $hasilPL = $daoPL->getOneForPrintout($hasil["purchaseletter_purchaseletter_id"]);
        $hasilPL = $hasilPL[1][0];
        
        $data["total_ppn"] = doubleval($hasilPL["price_harga_ppntanah"]) + doubleval($hasilPL["price_harga_ppnbangunan"]);
        
        $data["pricetype_pricetype"]=$hasilPL["pricetype_pricetype"];
        $data["customer_KTP_address"]=$hasilPL["customer_KTP_address"];
        $data["price_harga_netto"]=Erems_Box_Tools::toCurrency($hasilPL["price_harga_netto"]);
        $data["total_ppn"]=Erems_Box_Tools::toCurrency($data["total_ppn"]);
        $data["harga_total_jual"]=Erems_Box_Tools::toCurrency($hasilPL["harga_total_jual"]);
        $data["total"] = Erems_Box_Tools::toCurrency($hasilPL["harga_total_jual"]);

        $data['terbilangluastanah'] = Erems_Box_Library_Terbilang::terbilang($hasilPL["unit_land_size"], 3, "");
        $data['terbilangluasbangunan'] = Erems_Box_Library_Terbilang::terbilang($hasilPL["unit_building_size"], 3, "");
            
        $pl = new Erems_Models_Purchaseletter_PurchaseLetter();
        $pl->setId($hasil["purchaseletter_purchaseletter_id"]);

        $hasilPLSch = $daoPL->getScheduleById($pl);

        $hasilPLSch = $hasilPLSch[1];

        $umSch = array();

        $fixSch = array();

        $tempSisaAngsuranCode = "";


        foreach ($hasilPLSch as $k => $sch) {

            if ($sch['scheduletype_scheduletype_id'] == Erems_Box_Config::SCHTYPE_TANDAJADI) {
                if (key_exists(Erems_Box_Config::SCHTYPE_TANDAJADI, $fixSch)) {
                    $fixSch[Erems_Box_Config::SCHTYPE_TANDAJADI][] = $sch;
                } else {
                    $fixSch[Erems_Box_Config::SCHTYPE_TANDAJADI] = array();
                    $fixSch[Erems_Box_Config::SCHTYPE_TANDAJADI][] = $sch;
                }
            } else if ($sch['scheduletype_scheduletype_id'] == Erems_Box_Config::SCHTYPE_UANGMUKA) {
                if (key_exists(Erems_Box_Config::SCHTYPE_UANGMUKA, $fixSch)) {
                    $fixSch[Erems_Box_Config::SCHTYPE_UANGMUKA][] = $sch;
                } else {
                    $fixSch[Erems_Box_Config::SCHTYPE_UANGMUKA] = array();
                    $fixSch[Erems_Box_Config::SCHTYPE_UANGMUKA][] = $sch;
                }
            } else {
                if (key_exists(1987, $fixSch)) {
                    $fixSch[1987][] = $sch;
                } else {
                    $fixSch[1987] = array();
                    $fixSch[1987][] = $sch;
                }
            }
        }
        
        $count = array(1, 1, 1);

        $totalAngsuran = 0.0;
        $totalUangMuka = 0.0;
        $totalTandaJadi = 0.0;
        $totalAngsuran2 = 0.0;
        
        foreach ($fixSch as $k => $schGroup) {
            foreach ($schGroup as $sch) {


                if ($k == Erems_Box_Config::SCHTYPE_TANDAJADI) {
                    $data['tjdate' . $count[0]] = Erems_Box_Tools::formatDate($sch['duedate'], 'd M Y');
                    $data['tjamount' . $count[0]] = Erems_Box_Tools::toCurrency($sch['amount']);
                    $totalTandaJadi += $sch['amount'];
                    $count[0] ++;
                } else if ($k == Erems_Box_Config::SCHTYPE_UANGMUKA) {
                    $data['umcount' . $count[1]] = $count[1];
                    $data['umdate' . $count[1]] = Erems_Box_Tools::formatDate($sch['duedate'], 'd M Y');
                    $data['umamount' . $count[1]] = Erems_Box_Tools::toCurrency($sch['amount']);
                    $makstglUM = Erems_Box_Tools::formatDate($sch['duedate'], 'd M Y');
                    $totalUangMuka += $sch['amount'];
                    $count[1] ++;
                } else {
                    $data['count' . $count[2]] = $count[2];
                    // $data['duedate' . $count[2]] = Erems_Box_Tools::formatDate($sch['duedate'], 'd M Y');
                    $data['duedate' . $count[2]] = $genco->getDueDateSchedulePrintout(Erems_Box_Tools::formatDate($sch['duedate'], 'd M Y'), $sch);
                    $data['amount' . $count[2]] = Erems_Box_Tools::toCurrency($sch['amount']);
                    $data['code' . $count[2]] = $sch['scheduletype_scheduletype'];
                    $tempSisaAngsuranCode = $sch['scheduletype_scheduletype'];

                    $totalAngsuran += $sch['amount'];
                    $totalAngsuran2 += $sch['amount'];
                    $count[2] ++;
                }
            }
        }
        
         $data["kodeangsuran"] = $tempSisaAngsuranCode;
        ////// END TAGIHAN        
       
        $fileSrc = $params["template"];
        
        $finalFile = 'CN_' . str_replace('/', '', $hasil['purchaseletter_purchaseletter_no']) . '.docx';

        $p = new Erems_Box_Library_MyWordParser();
        $wpdf = new Erems_Box_Library_WordToPdf();
        
        $p->useTable = 2;
        
        $p->addLoopingField(array('duedate', 'amount', 'count', 'code'), count($fixSch[1987]));
        $p->addLoopingField(array('tjdate', 'tjamount'), count($fixSch[Erems_Box_Config::SCHTYPE_TANDAJADI]));
        $p->addLoopingField(array('umdate', 'umamount', 'umcount'), count($fixSch[Erems_Box_Config::SCHTYPE_UANGMUKA]));

        $ok = $p->printDoc($fileSrc, $finalFile, $data);
        
        if (!$ok) {
            $msg = "ERR : " . $p->error;
        }

        if($genco->getFormatFileSPT()=="pdf"){
            $wpdf->convert($p->getUrl());
            $pathUrl = str_replace(".docx",".pdf",$p->getUrl());
        }else{
            $pathUrl = $p->getUrl();
        }

        $otherAT = array(array(
                "PRINTOUT" => TRUE,
                "MSG" => $msg,
                "URL" => $pathUrl,
                "MSG_INFOPRINT"=>$msgInfoPrint,
                "STATUS_INFOPRINT"=>$statusInfoPrint
        ));



        $dm->setHasil(array($otherAT));

        return $dm;
    }

    public function detailRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $creator = new Erems_Box_Models_App_Creator();

        //===== MASTERDATA == //
        $masterRsn = new Erems_Models_App_Masterdata_ReasonCN();
        $allRCN = $masterRsn->prosesDataWithSession($this->getAppSession(), TRUE);
        
        $paramsRequestResult = Erems_Box_Tools::globalParamsExistChangeName($this->getAppSession());
        
        $projectId = $this->getAppSession()->getProject()->getId();
        $ptId = $this->getAppSession()->getPt()->getId();
        
        /// PT NAME
        $pt = new Erems_Box_Models_Master_Pt();
        $appDao = new Erems_Models_Master_AppDao();
        $project = new Erems_Box_Models_Master_Project();

        if (Erems_Box_Config::IS_PROJECTPT_CONSTANT) {
            $pt->setName('CONSTANT_PT');
        } else {
            $ptInfo = $appDao->getPt($this->getAppSession()->getPt()->getId());
            $pt->setArrayTable($ptInfo[0][0]);
            $projectInfo = $appDao->getProject($this->getAppSession()->getProject()->getId());
            $project->setArrayTable($projectInfo[0][0]);
        }
        
        
        $isCollectionUser = FALSE;
        $collApproveUser = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($projectId, $ptId)->getCollectionApproveUser();
        $collApproveUser = isset($collApproveUser["CHANGENAME_APPROVEUSER"])?$collApproveUser["CHANGENAME_APPROVEUSER"]:0;
        $isCollectionUser = Erems_Box_Tools::integerOrArray($this->getAppSession()->getUser()->getId(), $collApproveUser);
        
        //Rizal 2 Mei 2019
        /// Pengalihan Hak
//        $pHak = new Erems_Models_Pengalihanhak();
//        $parampHak = array("purchaseletter_id"=>'');
//        $parampHak['changeownership_id']= ''; 
//        $parampHak['purchaseletter_id']= ''; 
//        $parampHak['cluster_id']= ''; 
//        $parampHak['block_id']= ''; 
//        $parampHak['unit_number']= '';
//        $parampHak['customer_name']= ''; 
//        $parampHak['changeownershipreason_id']= ''; 
//        $parampHak['changeownership_startdate']= ''; 
//        $parampHak['changeownership_enddate']= ''; 
//        $parampHak['description']= '';
//        $parampHak['start']= ''; 
//        $parampHak['limit']= '';
//        $mappingpHak = array();
//        $mappingpHak[0] = array('mapping'=>'changeownership.changeownership_id','name'=>'changeownership_id');
//        $mappingpHak[1] = array('mapping'=>'changeownership.changeownership_no','name'=>'changeownership_no');
//        $mappingpHak[2] = array('mapping'=>'changeownership.nomor_setor_pajak','name'=>'nomor_setor_pajak');
//        $mappingpHak[3] = array('mapping'=>'changeownership.biaya','name'=>'biaya');
//        $mappingpHak[4] = array('mapping'=>'changeownership.purchaseletter_id','name'=>'purchaseletter_id');
//        $allpHak = $pHak->pengalihanhakRead($parampHak);
//        $allpHak = json_decode(json_encode(array("data"=>$allpHak['data'],"model"=>$mappingpHak)));
        //
    
        $otherAT = array(array(
                "GLOBALPARAMSEXIST" => $paramsRequestResult["status"],
                "GLOBALPARAMSMSG" => $paramsRequestResult["msg"],
                "GLOBALPARAMSPARAMS" => $paramsRequestResult["parameters"],
                "PT_NAME"=>$pt->getName(),
                //"APPROVALUSER" => $this->getAppSession()->getUser()->getId() == Erems_Box_AuthorizeConfig::CHANGENAME_APPROVEUSER ? TRUE : FALSE
                "APPROVALUSER" => Erems_Box_Tools::integerOrArray($this->getAppSession()->getUser()->getId(), Erems_Box_Projectptconfig_ProjectPtConfigSelector::getAuthorizeUser($projectId,$ptId, "CHANGENAME_APPROVEUSER")),
                "ISCOLLECTIONAPPROVE"=> Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($projectId, $ptId)->isCollectionApprove(),
                "ISCOLLECTIONUSER"=>$isCollectionUser,
                "verification_approval"=> Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($projectId, $ptId)->validasish3b()

        ));
        
        //$isAuthorizerUser = Erems_Box_Tools::integerOrArray($this->getAppSession()->getUser()->getId(), Erems_Box_Projectptconfig_ProjectPtConfigSelector::getAuthorizeUser($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId(), "CHANGEKAVLING_APPROVEUSER"));
        
        //Rizal 2 Mei 2019
        //$dm->setHasil(array($allRCN,$otherAT,array($allpHak)));
        //
        $dm->setHasil(array($allRCN,$otherAT));

        return $dm;
    }

    public function maindetailRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'changename', array('purchaseletter','changenamereason',
            'customerprofile','unittran', 'unitstatus', 'clusterb', 'blockb','city',array('city','city2_'),
            'productcategory', 'type','purchaseletterrevision',array('customerprofile','customernew_')),array('approvemode','deletedRows'));
        $cn = new Erems_Models_Sales_Change_ChangeName();
        $cn->setArrayTable($this->getAppData());
        $dao = new Erems_Models_Sales_Change_Dao();
        
        $hasil = $dao->getOneCN($cn);

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        
        return $dm;
    }

    public function customerlistRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'customer', array('city'));

        $dao = new Erems_Models_Master_CustomerDao();
        $hasil = $dao->getAllByFilter($this->getAppRequest(),$this->getAppSession());

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        return $dm;
    }

    public function parametersppjbRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'parametersppjb', array());

        $dao = new Erems_Models_Master_GeneralDao();
        $hasil = $dao->getParameterSPPJB($this->getAppRequest(), $this->getAppSession()->getProject()->getId(),$this->getAppSession()->getPt()->getId(),new Erems_Models_Legal_ParameterSPPJB());

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        return $dm;
    }
    
    public function selectedparametersppjbRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'parametersppjb', array());

        $dao = new Erems_Models_Master_GeneralDao();
        $paramSppjb = new Erems_Models_Legal_ParameterSPPJB();
        $paramSppjb->setArrayTable($this->getAppData());
        $hasil = $dao->getParameterSPPJB($this->getAppRequest(), $this->getAppSession()->getProject()->getId(),$this->getAppSession()->getPt()->getId(),$paramSppjb);

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        return $dm;
    }

    public function unitlistRead() {      
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'unitb', array('unitstatus', 'clusterb', 'blockb', 'productcategory', 'type','customer','purchaseletter'));
        $data = $this->getAppData();
        $dao = new Erems_Models_Sales_Change_Dao();
        $unitTran = new Erems_Models_Unit_UnitTran();
        $unitTran->setArrayTable($data);
        $unitTran->setProject($this->getAppSession()->getProject());
        $unitTran->setPt($this->getAppSession()->getPt());
        $unitTran->setStatus(Erems_Box_Config::UNITSTATUS_SOLD);
        $unitTran->getBlock()->setId(Erems_Box_Tools::cleanComboData($data,'block_id'));
        $hasil = $dao->getAllUnitCN($this->getAppRequest(), $unitTran);

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        return $dm;
    }

    public function selectedunitRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'purchaselettertransaction', array('customerprofile', 'unittran', 'unitstatus', 'clusterb', 'blockb', 'productcategory', 'type', 'salesman', 'citraclub', 'mediapromotion', 'saleslocation', 'collector', 'price', 'billingrulestran', 'bank', 'pricetype','city'));

        $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
        $hasil = array();
        /// check purchaseletter by unit id

        $unit = new Erems_Models_Unit_Unit();
        $unit->setArrayTable($this->getAppData());
        $pHasil = $dao->getOneByUnit($unit);

        if (count($pHasil[1]) > 0) {
            $pl = new Erems_Models_Purchaseletter_PurchaseLetter();
            $pl->setArrayTable($pHasil[1][0]);

            $hasil = $dao->getOne($pl->getId());
        }

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        return $dm;
    }

    public function selectedcustomerRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'customerprofile', array('city'));

        $dao = new Erems_Models_Master_CustomerDao();
        $hasil = $dao->getById($this->getAppRequest());

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        return $dm;
    }
    
     public function checkrevisiRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
    
        $daoChange = new Erems_Models_Sales_Change_Dao();
        $pl = new Erems_Models_Purchaseletter_PurchaseLetter();
        $pl->setArrayTable($this->getAppData());
        /*
       
        $checkRevisi = $daoChange->getRevision($pl, Erems_Box_Config::REVISIONTYPE_CHANGENAME);
        $nonApproveCount = 0;
     
        if ($checkRevisi) {

            if ($checkRevisi[0]) {

                foreach ($checkRevisi[0] as $row) {
                    $revision = new Erems_Models_Sales_Revision();
                    $revision->setArrayTable($row);

                    if (!$revision->getApprove()->getFlag() && !$revision->getReject()->getFlag()) {
                        $nonApproveCount++;
                    }
                    
                   
                }
            }
        }
          
         */
        
        //addon 20180712 , check request tiga sekawan dan cancelation
      
        $revisiAndCancel = $daoChange->getRevisiAndCancelRequest($pl->getId());

        $otherAT = array(array(
            // "NONAPPROVEEXIST" => $nonApproveCount >0?TRUE:FALSE,
            "TIGASEKAWANANDCANCEL"=>$revisiAndCancel[1]
        ));

        $dm->setHasil(array($otherAT));

        return $dm;
    }

    public function mainCreate() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $obj = new Erems_Models_Sales_Change_ChangeName();
        $validator = new Erems_Models_Sales_Change_Validator();
       // $validator->setType("CN");
        $data = $this->getAppData();
        $isApproveMode = isset($data["approvemode"]) ? $data["approvemode"] : FALSE;
        $this->getProcessor()->setDocStatus($isApproveMode);
      
        $validator->setType($isApproveMode ? "CNAPPROVE" : "CN");
        $validator->setSession($this->getAppSession());
        $dm->setDao(new Erems_Models_Sales_Change_Dao());
        $dm->setValidator($validator);
        $dm->setObject($obj);

        return $dm;
    }
    
    public function mainDelete() {
        $dao = new Erems_Models_Sales_Change_Dao();
        $dao->setType("CN");
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setObject(new Erems_Models_Sales_Change_ChangeName());
        $dm->setDao($dao);
        $dm->setIdProperty("changename_id");
        return $dm;
    }
    
    public function browsedetailRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $creator = new Erems_Box_Models_App_Creator();

        //===== MASTERDATA == //
        $b = new Erems_Models_App_Masterdata_Block();
        $ab = $b->prosesDataWithSession($this->getAppSession(), TRUE);

        $dm->setHasil(array($ab));

        return $dm;
    }

    protected function getDefaultProcessor() {
        return new Erems_Models_App_Box_ChangeNameProcessor();
    }
    
    public function verificationapprovalRead() {
//        $dm = new Erems_Box_Models_App_Hermes_DataModel();
//        $dataList = new Erems_Box_Models_App_DataListCreator('', 'customerprofile', array('city'));
        // $projectId = $this->getAppSession()->getProject()->getId();
        // $ptId = $this->getAppSession()->getPt()->getId();
        // var_dump($this->getAppSession()); die();
        $dao = new Erems_Models_Approvalverification();
        $hasil = $dao->getapprovalRead($this->getAppRequest(),$this->getAppSession());
//        var_dump($hasil); die();
//        $dm->setDataList($dataList);
//        $dm->setHasil($hasil);
        echo Zend_Json::encode($hasil);
        die();
    }
    
    // added by rico 07032023
    public function validasisppjbRead() {
        $dao = new Erems_Models_Sales_Change_Dao();
        $hasil = $dao->checkSppjb($this->getAppRequest(),$this->getAppSession());

        echo Zend_Json::encode($hasil);
        die();
    }

}

?>
