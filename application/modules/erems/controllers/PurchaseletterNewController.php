<?php
class Erems_PurchaseletterNewController extends Zend_Controller_Action {

    function init() {
        $action = $this->getRequest()->getActionName();
        if($action != 'status'){
            $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
            if($this->session->getUserId() == null)
                {
                    throw new Zend_Controller_Action_Exception('This page does not exist', 404);
                }
        }
    }

    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $model = new Erems_Models_PurchaseletterNew_PurchaseletterNew();

        $post_data['pricelist_id']       = $this->getRequest()->getPost('pricelist_id');
        $post_data['unit_id']            = $this->getRequest()->getPost('unit_id');
        $post_data['unit_number']        = $this->getRequest()->getPost('unit_number');
        $post_data['start']              = $this->getRequest()->getPost('start');
        $post_data['limit']              = $this->getRequest()->getPost('limit');
        $post_data['page']               = $this->getRequest()->getPost('page');
        $post_data['mode_read']          = $this->getRequest()->getPost('mode_read');
        $post_data['cluster_id']         = $this->getRequest()->getPost('cluster_id');
        $post_data['type_id']            = $this->getRequest()->getPost('type_id');
        $post_data['code']               = $this->getRequest()->getPost('code');
        $post_data['name']               = $this->getRequest()->getPost('name');
        $post_data['birthdate']          = $this->getRequest()->getPost('birthdate');
        $post_data['address']            = $this->getRequest()->getPost('address');
        $post_data['mobile_phone']       = $this->getRequest()->getPost('mobile_phone');
        $post_data['home_phone']         = $this->getRequest()->getPost('home_phone');
        $post_data['block']              = $this->getRequest()->getPost('block');
        $post_data['description']        = $this->getRequest()->getPost('description');
        $post_data['customer_id']        = $this->getRequest()->getPost('customer_id');
        $post_data['cluster_cluster_id'] = $this->getRequest()->getPost('cluster_cluster_id');
            
        $post_data['purchaseletter_no']           = $this->getRequest()->getPost('purchaseletter_no');
        $post_data['customer_name']               = $this->getRequest()->getPost('customer_name');
        $post_data['salesman']                    = $this->getRequest()->getPost('salesman');
        $post_data['purchase_date_bot']           = $this->getRequest()->getPost('purchase_date_bot');
        $post_data['purchase_date_top']           = $this->getRequest()->getPost('purchase_date_top');
        $post_data['unit_virtualaccount_bca']     = $this->getRequest()->getPost('unit_virtualaccount_bca');
        $post_data['unit_virtualaccount_mandiri'] = $this->getRequest()->getPost('unit_virtualaccount_mandiri');
        $post_data['is_draft']                    = $this->getRequest()->getPost('is_draft');
        $post_data['deleted']                     = $this->getRequest()->getPost('deleted');
        
        $post_data['komisidistributionchannel_id'] = $this->getRequest()->getPost('komisidistributionchannel_id');
        $post_data['komisi_pencairan_detail_id']   = $this->getRequest()->getPost('komisi_pencairan_detail_id');
        $post_data['periode_angsuran']             = $this->getRequest()->getPost('periode_angsuran');
        $post_data['jenis_angsuran']               = $this->getRequest()->getPost('jenis_angsuran');

        $post_data['pricetype_id']      = $this->getRequest()->getPost('pricetype_id');
        $post_data['koefisien_id']      = $this->getRequest()->getPost('koefisien_id');
        $post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
        $post_data['purchase_date']     = $this->getRequest()->getPost('purchase_date');

        $post_data['a']     = $this->getRequest()->getPost('a');
        $post_data['b']     = $this->getRequest()->getPost('b');

        $post_data['data']          = $this->getRequest()->getPost('data');
        $post_data['reschedule_id'] = $this->getRequest()->getPost('reschedule_id');

        $post_data['template'] = $this->getRequest()->getPost('template');

        $statusUnit = Erems_Box_Config::UNITSTATUS_STOCK.'~'.Erems_Box_Config::UNITSTATUS_AVAILABLE;

        if($this->getRequest()->getPost('mode_read') == 'detailGenco'){
            return $this->gencoRead();
            exit;
        }

        switch (($post_data['mode_read'])) {
            case 'unitlist':
                $result = $model->unitlistRead($post_data,$statusUnit);
                break; 
            case 'unitdetail':
                $result = $model->unitOneRead($post_data);
                break;
            case 'customerlist':
                $result = $model->customerlistRead($post_data);
                break;
            case 'browsedetail':
                $result = $model->browsedetailRead($post_data);
                break;
            case 'selectedcustomer':
                $result = $model->selectedcustomerRead($post_data);
                break;
            case 'initiateDataDefault':
                $result = $model->initiateDataDefaultRead($post_data);
                break;
            case 'komisiPencairanCb':
                $result = $model->komisiPencairanCbRead($post_data);
                break;
            case 'komisiPencairanGrid':
                $result = $model->komisiPencairanGridRead($post_data);
                break;
            case 'pricelistCb':
                $result = $model->pricelistCbRead($post_data);
                break;
            case 'pricetypeCb':
                $result = $model->pricetypeCbRead($post_data);
                break;
            case 'pricelistkoefisieneCb':
                $result = $model->pricelistkoefisieneCbRead($post_data);
                break;
            case 'pricelistkoefisieneFill':
                $result = $model->pricelistkoefisieneFillRead($post_data);
                break;
            case 'dataGenco':
                $result = $model->dataGenco($post_data);
                break;
            case 'detailOneRead':
                $result = $model->detailOneRead($post_data);
                break;
            case 'detailKomisiOneRead':
                $result = $model->detailKomisiOneRead($post_data);
                break;
            case 'detailScheduleOneRead':
                $result = $model->detailScheduleOneRead($post_data);
                break;
            case 'checkauthorize':
                $result = $model->checkauthorize($post_data);
                break;
            case 'authlogin':
                $result = $model->authlogin($post_data);
                break;
            case 'reschedule':
                $result = $model->reschedule($post_data);
                break;
            case 'reschedulesch':
                $result = $model->getScheduleById($post_data);
                break;
            case 'reschedule_create':
                $result = $model->createReschedule($post_data);
                break;
            case 'scheduleadvanceinit':
                $result = $model->scheduleadvanceinit($post_data);
                break;
            case 'approvereschedule':
                $result = $model->approveReschedule($post_data);
                break;
            case 'deletereschedule':
                $result = $model->deletedReschedule($post_data);
                break;
            case 'printout':
                    return $this->printoutRead($post_data);
                exit;
                break;
            case 'paymentscheme':
                    return $this->paymentschemeRead($post_data);
                exit;
                break;
            case 'apiaci':
                    $post_data['apiaci'] = 0;
                    $result = $model->apiaci($post_data);
                break;
            case 'apiacis':
                    $post_data['apiaci'] = 1;
                    $result = $model->apiaci($post_data);
                break;
            default:
                $result = $model->purchaseLetterRead($post_data);
                break;
        }
        // print_r($result);exit;
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Erems_Models_PurchaseletterNew_PurchaseletterNew();
        $result = $model->purchaseLetterCreate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Erems_Models_PurchaseletterNew_PurchaseletterNew();
        $result = $model->purchaseLetterDelete($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    private function modelDataParser($resultQuery){
        
        $result = false;
        if(is_array($resultQuery)){
            $getKeyModel = array();
            $model = array();
    
            $getKeyModel = array_keys($resultQuery['data'][0]);
            foreach ($getKeyModel as $value) {
                $arrpush['name'] = $value;
                $arrpush['mapping'] = $value;
                array_push($model, $arrpush);
            }

            $result['totalRow'] = $resultQuery['total'];
            $result['data'] = $resultQuery['data'];
            $result['model'] = $model;
        }

        return $result;
    }

    function gencoRead(){
        $otherAT = array("data" => array(
                "NOPTKP" => Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId())->NOPTKP()
        ));
        echo Zend_Json::encode($otherAT);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function printoutRead($param) {
        $testingSession = new Erems_Box_Models_App_Session();
        $testingSession->setSession('user', $this->session->getUserId());
        $testingSession->setSession('pt', $this->session->getCurrentPtId());
        $testingSession->setSession('project', $this->session->getCurrentProjectId());
        $testingSession->setSession('group', $this->session->getCurrentGroupId());

        $genco = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId());
        /// get global params
        $paramsRequestResult = Erems_Box_Tools::globalParamsExistNew($testingSession, "PURCHASELETTER");

        $model = new Erems_Models_PurchaseletterNew_PurchaseletterNew();

        $hasil = $model->printout($param);
        $hasil = $hasil[1][0];

        //for checking file existing
        $checkFile = 'SP_' . str_replace('/', '', $hasil['purchaseletter_no']) . '.pdf';
        $checkFile = str_replace(' ', '', $checkFile);
        if(file_exists('app/erems/printb/'.$checkFile)){
            $otherAT = array(array(
                    "PRINTOUT" => TRUE,
                    "MSG" => "",
                    "URL" => 'app/erems/printb/'.$checkFile
            ));
            echo Zend_Json::encode($otherAT);

            $this->_helper->viewRenderer->setNoRender(true);
        }
        else{
            // get schedule 
            $hasilSch = $model->getScheduleById($param);
            $hasilSch = $hasilSch['dataPrintout'];
            $umSch = array();
            $fixSch = array();
            $tempSisaAngsuranCode = "";
            foreach ($hasilSch as $k => $sch) {
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
            $msg = "";
            $p = new Erems_Box_Library_MyWordParser();
            $wpdf = new Erems_Box_Library_WordToPdf();
            $p->useTable = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId())->getPrintoutPLMT();
            $p->addLoopingField(array('duedate', 'amount', 'count', 'code'), count($fixSch[1987]));
            $p->addLoopingField(array('tjdate', 'tjamount'), count($fixSch[Erems_Box_Config::SCHTYPE_TANDAJADI]));
            $p->addLoopingField(array('umdate', 'umamount', 'umcount'), count($fixSch[Erems_Box_Config::SCHTYPE_UANGMUKA]));
            
            $data = $hasil;
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
                        $count[0]++;
                    } else if ($k == Erems_Box_Config::SCHTYPE_UANGMUKA) {
                        $data['umcount' . $count[1]] = $count[1];
                        $data['umdate' . $count[1]] = Erems_Box_Tools::formatDate($sch['duedate'], 'd M Y');
                        $data['umamount' . $count[1]] = Erems_Box_Tools::toCurrency($sch['amount']);
                        $makstglUM = Erems_Box_Tools::formatDate($sch['duedate'], 'd M Y');
                        $totalUangMuka += $sch['amount'];
                        $count[1]++;
                    } else {
                        $data['count' . $count[2]] = $count[2];
                        $data['duedate' . $count[2]] = $genco->getDueDateSchedulePrintout(Erems_Box_Tools::formatDate($sch['duedate'], 'd M Y'), $sch);
                        $data['amount' . $count[2]] = Erems_Box_Tools::toCurrency($sch['amount']);
                        $data['code' . $count[2]] = $sch['scheduletype_scheduletype'];
                        $tempSisaAngsuranCode = $sch['scheduletype_scheduletype'];

                        $totalAngsuran += $sch['amount'];
                        $totalAngsuran2 += $sch['amount'];
                        $count[2]++;
                    }
                }
            }

            // untuk cetakan citraland ambon
            $data['kosong'] = " ";
            $totalRowForAmbonScheduleList = 1;
            $countTandaJadi = $count[0] - 1;
            $countUangMuka = $count[1] - 1;
            $countAngsuran = $count[2] - 1;
            if ($countUangMuka >= 12 ){
                $data['premi_note'] = "Biaya premi asuransi jiwa untuk proteksi pembayaran Uang Muka dari PT Asuransi Ciputra Indonesia (CiputraLife)";
            }else{
                $data['premi_note'] = "";
            }

            $data["count_uangmuka"] = $countUangMuka;
            $data["count_angsuran"] = $countAngsuran;
            $data["unit_floor_size"] = $data["unit_floor_size"] + 0;
            $data["unit_building_size"] = $data["unit_building_size"] + 0;
            $data["unit_land_size"] = $data["unit_land_size"] + 0;

            if ($totalTandaJadi > 0) {
                $data['schlistd' . $totalRowForAmbonScheduleList] = "Membayar uang tanda jadi sebesar";
                // $data['schlista'.$totalRowForAmbonScheduleList] = "Membayar uang tanda jadi sebesar";
                $data['schlistb' . $totalRowForAmbonScheduleList] = Erems_Box_Tools::toCurrency($totalTandaJadi);
                if ($countTandaJadi > 1) {
                    $data['schlistc' . $totalRowForAmbonScheduleList] = "Dicicil " . $countTandaJadi . " x Setiap Tanggal " . date("d", strtotime($data['tjdate1'])) . " mulai dari Bulan " . date("m", strtotime($data['tjdate1'])) . " " . date("Y", strtotime($data['tjdate1'])) . " – " . date("m", strtotime($data['tjdate' . $countTandaJadi])) . " " . date("Y", strtotime($data['tjdate' . $countTandaJadi])) . " @Rp. " . $data['tjamount' . $countTandaJadi];
                } else {
                    $data['schlistc' . $totalRowForAmbonScheduleList] = $data['tjdate1'];
                }
                $totalRowForAmbonScheduleList++;
            }
            if ($totalUangMuka > 0) {
                $data['schlistd' . $totalRowForAmbonScheduleList] = "Membayar uang muka sebesar";
                $data['schlistb' . $totalRowForAmbonScheduleList] = Erems_Box_Tools::toCurrency($totalUangMuka);
                if ($countUangMuka > 1) {
                    $data['schlistc' . $totalRowForAmbonScheduleList] = "Dicicil " . $countUangMuka . " x Setiap Tanggal " . date("d", strtotime($data['umdate1'])) . " mulai dari Bulan " . date("m", strtotime($data['umdate1'])) . " " . date("Y", strtotime($data['umdate1'])) . " – " . date("m", strtotime($data['umdate' . $countUangMuka])) . " " . date("Y", strtotime($data['umdate' . $countUangMuka])) . " @Rp. " . $data['umamount' . $countUangMuka];
                } else {
                    $data['schlistc' . $totalRowForAmbonScheduleList] = $data['umdate1'];
                }

                $totalRowForAmbonScheduleList++;
            }
            if ($totalAngsuran > 0) {
                $data['schlistd' . $totalRowForAmbonScheduleList] = "Membayar sisa harga sebesar";
                $data['schlistb' . $totalRowForAmbonScheduleList] = Erems_Box_Tools::toCurrency($totalAngsuran);
                if ($countAngsuran > 1) {
                    $data['schlistc' . $totalRowForAmbonScheduleList] = "Dicicil " . $countAngsuran . " x Setiap Tanggal " . date("d", strtotime($data['duedate1'])) . " mulai dari Bulan " . date("m", strtotime($data['duedate1'])) . " " . date("Y", strtotime($data['duedate1'])) . " – " . date("m", strtotime($data['duedate' . $countAngsuran])) . " " . date("Y", strtotime($data['duedate' . $countAngsuran])) . " @Rp. " . $data['amount' . $countAngsuran];
                } else {
                    $data['schlistc' . $totalRowForAmbonScheduleList] = $data['duedate1'];
                }
                $totalRowForAmbonScheduleList++;
            }

            $p->addLoopingField(array('schlistd', 'schlistb', 'schlistc'), $totalRowForAmbonScheduleList - 1);
            $count = array(1, 1, 1);
            $totalAngsuran = 0.0;
            $tmpamount2_ = 0.0;
            $countx = 0;
            $init = 0;
            $idx = 0;

            foreach ($fixSch as $k => $schGroup) {
                foreach ($schGroup as $sch) {
                    if ($k !== Erems_Box_Config::SCHTYPE_TANDAJADI && $k !== Erems_Box_Config::SCHTYPE_UANGMUKA) {
                        $data['count2_' . $count[2]] = $count[2];
                        $data['duedate2_' . $count[2]] = $sch['duedate'];
                        $data['amount2_' . $count[2]] = $sch['amount'];
                        $data['code2_' . $count[2]] = $sch['scheduletype_scheduletype'];
                        $tempSisaAngsuranCode = $sch['scheduletype_scheduletype'];
                        if ($init == 0) {
                            $countx = $countx + 1;
                            $tmpamount2_ = $data['amount2_' . $count[2]];
                            $init = 1;
                        } else {
                            if ($tmpamount2_ == $data['amount2_' . $count[2]]) {
                                $countx = $countx + 1;
                                $tmpamount2_ = $data['amount2_' . $count[2]];
                                $data['count2_' . $count[2]] = $countx;
                            } else {
                                $data['simplecount'][$idx]['payment_from'] = $init;
                                $data['simplecount'][$idx]['payment_until'] = $count[2] - 1;
                                $data['simplecount'][$idx]['amount'] = $tmpamount2_;
                                $data['simplecount'][$idx]['total'] = $countx;
                                $data['simplecount'][$idx]['duedate_until'] = Erems_Box_Tools::formatDate($data['duedate2_' . ($count[2] - 1)], 'd M Y');
                                $data['simplecount'][$idx]['duedate_from'] = Erems_Box_Tools::formatDate($data['duedate2_' . ($count[2] - $countx)], 'd M Y');

                                $finaldate = $data['duedate2_' . $count[2]];
                                $idx++;
                                $init = $count[2];
                                $tmpamount2_ = $data['amount2_' . $count[2]];
                                $countx = 1;
                            }
                        }
                        $totalAngsuran += $sch['amount2_'];
                        $count[2] ++;
                    }
                    //end
                    $data['simplecount'][$idx]['payment_until'] = $count[2] - 1;
                    $data['simplecount'][$idx]['amount'] = $tmpamount2_;
                    $data['simplecount'][$idx]['total'] = $countx;
                    $data['simplecount'][$idx]['duedate_until'] = Erems_Box_Tools::formatDate($finaldate, 'd M Y');
                    //end
                }
            }

            //------ generate words
            $br = "                                                                         
                                                                     
                        ";
            $words .= " ";
            $cnt = $count[2] - 1;
            if ($cnt > 1) {
                $words .= "Yang akan diatur sebagai berikut :" . $br;
                $words .= "Diangsur " . $cnt . " x  " . $br;
            }
            foreach ($data['simplecount'] as $dsc) {
                //echo $words;
                $c_amount = Erems_Box_Tools::toCurrency($dsc['amount']);
                if (array_key_exists('payment_from', $dsc)) {
                    $words .= "Angs. " . $dsc['payment_from'] . " s/d " . $dsc['payment_until'] . " @ Rp " . $c_amount . ",-/bln Mulai " . $dsc['duedate_from'] . " s/d  " . $dsc['duedate_until'] . "  " . $br;
                } else {
                    if ($cnt > 1) {
                        if ($dsc['duedate_until'] == "01 Jan 1970") { //if nilai schedule INH sama semua
                            $duedate2_1 = Erems_Box_Tools::formatDate($data['duedate2_1'], 'd M Y'); //angs 1
                            $dsc['duedate_until'] = Erems_Box_Tools::formatDate($sch['duedate'], 'd M Y');
                            $words .= "Angs. 1-" . $dsc['payment_until'] . " @ Rp " . $c_amount . ",-/bln Angs. 1 dibayar tgl " . $duedate2_1 . " - Angs. " . $dsc['payment_until'] . " dibayar tgl " . $dsc['duedate_until'];
                        } else {
                            $words .= "Angs. " . $dsc['payment_until'] . " @ Rp " . $c_amount . ",-/bln dibayar tgl " . $dsc['duedate_until'];
                        }
                    } else {
                        $words .= "";
                    }
                }
            }
            $words .= " ";
            $data["simplecountwords"] = $words;
            //End of simplecountwords

            $data["total_um"] = Erems_Box_Tools::toCurrency($totalUangMuka);
            $data["last_um_date"] = $makstglUM;
            $data["uangmukacount"] = $count[1] - 1;
            $data["amountcount"] = $count[2] - 1; /// sisa cicilan time
            $data["amountdateawal"] = $data['duedate1'];
            $data["amountdateakhir"] = isset($data['duedate' . ($count[2] - 1)]) ? $data['duedate' . ($count[2] - 1)] : $data["amountdateawal"];
            $angsuranPerBulan = doubleval($data['total_angsuran']) / $count[2];
            $angsuranPerBulanText = Erems_Box_Tools::toCurrency($angsuranPerBulan);
            $data["total_ppn"] = doubleval($data["price_harga_ppntanah"]) + doubleval($data["price_harga_ppnbangunan"]);
            $data["total_ppn"] = Erems_Box_Tools::toCurrency($data["total_ppn"]);
            $data["total_ppn2"] = doubleval($data["price_harga_ppntanah"]) + doubleval($data["price_harga_ppnbangunan"]) + doubleval($data["price_ppnbm"]);
            $data["total_ppn2asuransi"] = doubleval($data["total_ppn2"]) + doubleval($data["biaya_asuransi"]);
            $data["total_ppn2"] = Erems_Box_Tools::toCurrency($data["total_ppn2"]);
            $data["total_ppn2asuransi"] = Erems_Box_Tools::toCurrency($data["total_ppn2asuransi"]);
            $data["total_diskon"] = doubleval($data["price_harga_dischargadasar"]) + doubleval($data["price_harga_dischargatanah"]) + doubleval($data["price_harga_dischargabangunan"]) + doubleval($data["harga_salesdisc"]);
            $currencyList = array(
                'price_harga_jual', 'price_harga_netto', 'price_harga_ppntanah'
            );
            foreach ($currencyList as $field) {
                $data[$field] = Erems_Box_Tools::toCurrency($data[$field]);
            }
            $data['purchase_date'] = Erems_Box_Tools::formatDate($data['purchase_date']);
            // building/land size int
            $data['unit_building_size_int'] = intval($hasil['unit_building_size']);
            $data['unit_land_size_int'] = intval($hasil['unit_land_size']);
            $data['unit_floor_size_int'] = intval($hasil['unit_floor_size']);
            /// terbilang
            $data['terbilanglt'] = Erems_Box_Library_Terbilang::terbilang($hasil['unit_land_size'], 3);
            $data['terbilanglb'] = Erems_Box_Library_Terbilang::terbilang($hasil['unit_building_size'], 3);
            $data['terbilangtot'] = Erems_Box_Library_Terbilang::terbilang(ceil($hasil['harga_total_jual']), 3);
            $data['terbilangtjt'] = Erems_Box_Library_Terbilang::terbilang($hasil['tanggal_jatuh_tempo'], 3);
            $data['terbilangtla'] = Erems_Box_Library_Terbilang::terbilang($hasil['total_lama_angsuran'], 3);

            $data['total_angsuran'] = Erems_Box_Tools::toCurrency($data['total_angsuran']);
            $data['angsuranperbulan'] = Erems_Box_Tools::toCurrency($hasil['angsuran_per_bulan']);
            $data['terbilangapb'] = Erems_Box_Library_Terbilang::terbilang($hasil['angsuran_per_bulan'], 3);
            $data['aagd'] = Erems_Box_Tools::formatDate($hasil['awal_angsuran'], 'd M Y');
            $data['bagd'] = Erems_Box_Tools::formatDate($hasil['akhir_angsuran'], 'd M Y');

            $tempulz = $hasil["unit_land_size"] + 0;
            $tempubz = $hasil["unit_building_size"] + 0;
            $tempufz = $hasil["unit_floor_size"] + 0;
            
            $data['terbilangluasfloor'] = Erems_Box_Library_TerbilangB::terbilangUSelessZero($tempufz, 3, "");

            $globalParams = new Erems_Box_GlobalParamsNew();
            $data['msignname'] = strtoupper($paramsRequestResult["parameters"][$globalParams->PURCHASELETTER_PRINTOUT_MARKETINGSIGNNAME]);
            $data['fsignname'] = strtoupper($paramsRequestResult["parameters"][$globalParams->PURCHASELETTER_PRINTOUT_FINANCESIGNNAME]);
            $data["total"] = Erems_Box_Tools::toCurrency($hasil["harga_total_jual"]);
            $data['pt_name'] = $hasil["pt_name"];
            $data["customer_name"] = strtoupper($hasil["customer_name"]);
            $data["salesman_employee_name"] = strtoupper($hasil["salesman_employee_name"]);
            $data["pt_rekening"] = strtoupper($hasil["pt_rekening"]);
            $data["kodeangsuran"] = $tempSisaAngsuranCode;

            //add for tallasa makasar
            $data["ajbbbn"] = Erems_Box_Tools::toCurrency($data["price_harga_bbnsertifikat"] + $data["price_harga_bajb"]);

            $data["ajbbphtbpnbpasuransi"] = Erems_Box_Tools::toCurrency($data["price_harga_bajb"] + $data["price_harga_bphtb"] + $data["harga_paket_tambahan"] + doubleval($data["biaya_asuransi"]));

            $data["ajbbphtbpnbpbbnasuransi"] = Erems_Box_Tools::toCurrency(doubleval($data["price_harga_bajb"]) + doubleval($data["price_harga_bphtb"]) + doubleval($data["price_harga_bbnsertifikat"]) + doubleval($data["harga_paket_tambahan"]) + doubleval($data["biaya_asuransi"]));

            // add for palembang 29-01-2019
            $data["bphtbbbnbajb"] = Erems_Box_Tools::toCurrency($data["price_harga_bajb"] + $data["price_harga_bbnsertifikat"] + $data["price_harga_bphtb"]);
            
            // add for palu
            $data["ajbbphtbpnbp"] = Erems_Box_Tools::toCurrency($data["price_harga_bajb"] + $data["price_harga_bphtb"] + $data["harga_paket_tambahan"]);
            $data["ajbbbnbphtbpnbp"] = Erems_Box_Tools::toCurrency($data["price_harga_bajb"] + $data["price_harga_bbnsertifikat"] + $data["price_harga_bphtb"] + $data["harga_paket_tambahan"]);
            $data["price_harga_jualdasar"] = Erems_Box_Tools::toCurrency($data["price_harga_jualdasar"]);
            $data["harga_total_jual"] = Erems_Box_Tools::toCurrency($data["harga_total_jual"]);
            $data["price_paket_tambahan"] = Erems_Box_Tools::toCurrency($data["harga_paket_tambahan"] + 0);
            $data["price_asuransi"] = Erems_Box_Tools::toCurrency($data["biaya_asuransi"] + 0);
            $data["price_administrasi"] = Erems_Box_Tools::toCurrency($data["harga_administrasi"] + 0);
            $data["ajbbbnbphtbpnbppmutu"] = Erems_Box_Tools::toCurrency($data["price_harga_bajb"] + $data["price_harga_bbnsertifikat"] + $data["price_harga_bphtb"] + $data["harga_paket_tambahan"] + $data["harga_pmutu"]);
            
            // add for medan
            $data["ajbhtp"] = Erems_Box_Tools::toCurrency($data["price_harga_bajb"] + $data["harga_paket_tambahan"]);
            
            // modiby imaam 20190322
            $data["biayalain"] = Erems_Box_Tools::toCurrency($data["price_harga_lain_lain"]);

            $data["billingrules_tandajadi"] = Erems_Box_Tools::toCurrency($totalTandaJadi);
            $data["billingrules_uangmuka"] = Erems_Box_Tools::toCurrency($totalUangMuka);
            $data["billingrules_angsuran"] = Erems_Box_Tools::toCurrency($totalAngsuran2);
            $data["price_harga_bphtb"] = Erems_Box_Tools::toCurrency($data["price_harga_bphtb"]);
            $data["price_harga_bajb"] = Erems_Box_Tools::toCurrency($data["price_harga_bajb"]);
            $data["price_harga_bbnsertifikat"] = Erems_Box_Tools::toCurrency($data["price_harga_bbnsertifikat"]);

            //spesial Tallasa Makassar 
            $data["ketentuan_dua"] = "";
            if (strtoupper($data["pricetype_pricetype"]) == "KPR") {
                $data["ketentuan_dua"] = "KPR akad mulai " . $data["amountdateawal"];
            } else {
                $data["ketentuan_dua"] = $data["pricetype_pricetype"] . "  " . $data["amountcount"] . " kali Mulai " . $data["amountdateawal"] . "  s/d " . $data["amountdateakhir"];
            }

            /// simple 
            $data["salem_name"] = $data["salesman_employee_name"];
            $data["unit_electricity"] = intval($data["unit_electricity"]);
            $data["keterangan_bayar"] = $data["keterangan_bayar"];

            // addon 20180920
            $data["bulantahunserahterima"] = date("m Y", strtotime($data["rencana_serahterima_date"]));
            $tempBulantahunserahterima = explode(" ", $data["bulantahunserahterima"]);
            $tempBulantahunserahterima = Erems_Box_Tools::indoMonthText(intval($tempBulantahunserahterima[0])) . " " . $tempBulantahunserahterima[1];
            $data["bulantahunserahterima"] = $tempBulantahunserahterima;

            $data["customer_home_phone"] = strlen($data["customer_home_phone"]) <= 0 ? "                        " : $data["customer_home_phone"];
            // addon 20180711
            $daoTotalRev = new Erems_Models_Sales_Change_Dao();
            // addon 20190611
            $data["purchase_date2"] = $data["purchase_date2"];
            $data["purchase_date_hari"] = $data["purchase_date_hari"];
            $data["purchase_date_tanggal"] = $data["purchase_date_tanggal"];
            $data["purchase_date_bulanname"] = $data["purchase_date_bulanname"];
            $data["purchase_date_tahun"] = $data["purchase_date_tahun"];
            
            $hasilTotalRev = $daoTotalRev->getTotalRevisi($data["purchaseletter_id"]);

            $hasilTotalRev = $hasilTotalRev[1][0]["total_revisi"];
            $data["total_revisi"] = $hasilTotalRev > 0 ? "Revisi ke - " . $hasilTotalRev : "";

            // Template SPT daftar Tagihan Ke Samping ( Horizontal )
            $isSPTHorizontalSchedule = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId())->getIsSPTHorizontalSchedule();
            if ($isSPTHorizontalSchedule) {
                $maxRecord = 80;
                //reset
                for ($i = 1; $i <= $maxRecord; $i++) {
                    $data["no" . $i] = NULL;
                    $data["tgltagih" . $i] = NULL;
                    $data["niltagih" . $i] = NULL;

                    /// versi sederhana
                    $data["n" . $i] = NULL;
                    $data["tg" . $i] = NULL;
                    $data["nt" . $i] = NULL;
                    $data["r" . $i] = NULL; // rp
                }
                $count = 1;
                $is80 = FALSE; // jika tagihanan mencapai >= 80 record
                $total80 = 0;
                $tgl80 = 0;

                // fill schedule
                foreach ($fixSch as $k => $schGroup) {
                    foreach ($schGroup as $sch) {
                        $data["no" . $count] = $count;
                        $data["tgltagih" . $count] = Erems_Box_Tools::formatDate($sch['duedate'], 'd M Y') . " Rp";
                        $data["niltagih" . $count] = Erems_Box_Tools::toCurrency($sch['amount']);
                        /// versi sederhana
                        $data["n" . $count] = $count;
                        $data["tg" . $count] = Erems_Box_Tools::formatDate($sch['duedate'], 'd M Y');
                        if ($sch["scheduletype_scheduletype"] == "KPR") {
                            $data["tg" . $count] = "KPR";
                        }
                        $data["nt" . $count] = Erems_Box_Tools::toCurrency($sch['amount']);
                        $data["r" . $count] = "Rp.";
                        if ($count >= $maxRecord) {
                            $is80 = TRUE;
                            $total80 += $sch['amount'];
                            $tgl80 = $sch['duedate'];
                        }
                        $count++;
                    }
                }
                if ($is80) {
                    $data["no80"] = "s/d";
                    $data["tgltagih80"] = Erems_Box_Tools::formatDate($tgl80, 'd M Y') . " Rp";
                    $data["niltagih80"] = Erems_Box_Tools::toCurrency($total80);
                    $data["r80"] = "Rp.";

                    /// versi sederhana
                    $data["no80"] = "s/d";
                    $data["tg80"] = Erems_Box_Tools::formatDate($tgl80, 'd M Y');
                    $data["nt80"] = Erems_Box_Tools::toCurrency($total80);
                }
            }

            // request SH1 on 2018-12-19
            $tempVABCA = $data["virtualaccount_bca"];
            $tempVAMandiri = $data["virtualaccount_mandiri"];
            $data["virtualaccount_bca"] = strlen($tempVABCA) <= 0 ? " " : "BCA Virtual Acc ( BCA VA) : " . $tempVABCA;
            $data["virtualaccount_mandiri"] = strlen($tempVAMandiri) <= 0 ? " " : "Mandiri Virtual Acc (MVA) : " . $tempVAMandiri;
            $data["virtualaccount_bcab"] = strlen($tempVABCA) <= 0 ? " " : "Nomor Virtual Account BCA : " . $tempVABCA;
            $data["virtualaccount_mandirib"] = strlen($tempVAMandiri) <= 0 ? " " : "Nomor Virtual Account BANK MANDIRI : " . $tempVAMandiri;

            $generalConfig = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId());
            $fileBangunan = $generalConfig->getTemplatePurchaseletterBangunanPrint();
            $fileKavling = $generalConfig->getTemplatePurchaseletterKavlingPrint();
            $fileSrc = $data['productcategory_productcategory_id'] == Erems_Box_Config::PRODUCTCATEGORY_BANGUNGAN ? $fileBangunan : $fileKavling;
            $fileSrc = intval($hasil["ppatk_badanhukum"]) == 1 ? $generalConfig->getTemplatePurchaseletterBadanUsahaPrint() : $fileSrc;

            $paramsTemplate = array("file" => $param["template"], "data" => $data);
            $fileSrc = $generalConfig->getFinalTemplatePurchaseletter($paramsTemplate);
            // SPT NEW Concept 
            $processSptPrintoutCentralized = $model->process($testingSession,$genco,$p,$paramsTemplate, $fileSrc, $data);
            $fileSrc = $processSptPrintoutCentralized["fileSrc"];
            $data = $processSptPrintoutCentralized["data"];
            //end SPT NEW Concept 
            if ($fileSrc) {
                $finalFile = 'SP_' . str_replace('/', '', $hasil['purchaseletter_no']) . '.docx';
                $finalFile = str_replace(' ', '', $finalFile);
                $ok = $p->printDoc($fileSrc, $finalFile, $data);
                if (!$ok) {
                    $msg = "ERR : " . $p->error;
                }
            } else {
                $msg = "ERR : Tidak ada file template cetakan";
            }
            if ($generalConfig->getFormatFileSPT() == "pdf") {
                $wpdf->convert($p->getUrl());
                $pathUrl = str_replace(".docx", ".pdf", $p->getUrl());
            } else {
                $pathUrl = $p->getUrl();
            }
            $otherAT = array(array(
                    "PRINTOUT" => TRUE,
                    "MSG" => $msg,
                    "URL" => $pathUrl
            ));
            echo Zend_Json::encode($otherAT);

            $this->_helper->viewRenderer->setNoRender(true);
        }
    }

    function paymentschemeRead($param) {

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $data = $this->getRequest()->getPost();
        $template = $data["template"];

        //$ps = new Erems_Models_Purchaseletter_PaymentScheme(Erems_Box_FileManager::$paymentScheme[$this->getAppSession()->getProject()->getId() . '_' . $this->getAppSession()->getPt()->getId()]);
        //$ps = new Erems_Models_Purchaseletter_PaymentScheme(Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(),$this->getAppSession()->getPt()->getId())->getTplSPTPaymentScheme());
        $ps = new Erems_Models_Purchaseletter_PaymentScheme($template);

        $ps->process($data);



        $msg = 'Payment Scheme';
        $otherAT = array(array(
                "PRINTOUT" => TRUE,
                "MSG" => $msg,
                "URL" => $ps->getUrl()
        ));



        $dm->setHasil(array($otherAT));


        return $dm;
    }

}
?>