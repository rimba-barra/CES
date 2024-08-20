<?php

class Erems_SpkController extends Erems_Models_App_Controller {

    function readAction() {

        

        $spkDataList = new Erems_Models_App_DataListCreator('', 'spktransaction', array('spktype', 'contractor'));
        $spkTypeDataList = new Erems_Models_App_DataListCreator('', 'spktype', array());
        $contractorDataList = new Erems_Models_App_DataListCreator('', 'contractor', array());
        $spkList = new Erems_Models_App_DataListCreator('', 'spktransaction', array('spktype', 'contractor', 'cluster', 'block', 'unit'), array("spkdetail", "deletedRows"));
        $spkDetailList = new Erems_Models_App_DataListCreator('', 'spkdetail', array('unitb', 'clusterb', 'blockb'));
        $clusterDataList = new Erems_Models_App_DataListCreator('', 'clusterb', array());
        $blockDataList = new Erems_Models_App_DataListCreator('', 'blockb', array('clusterb'));
        $globalParamsList = new Erems_Models_App_DataListCreator('', 'parameter',array());
        $unitDataList = new Erems_Models_App_DataListCreator('', 'unitb', array('clusterb', 'blockb','extensionobject'),array(),array('spk_count','spk_active'));
        $contractorProfileDataList = new Erems_Models_App_DataListCreator('', 'contractorprofile', array());
        $app = new Erems_Models_App_Models_Read($this);
       // $app = new Erems_Models_App_Models_Read($this,'read_all');
        $app->registerDataList('list_spk', $spkDataList);
        $app->registerDataList('spktype', $spkTypeDataList);
        $app->registerDataList('contractor', $contractorDataList);
        $app->registerDataList('main_list', $spkList);
        $app->registerDataList('cluster', $clusterDataList);
        $app->registerDataList('block', $blockDataList);
        $app->registerDataList('unit', $unitDataList);
        $app->registerDataList('spkdetail', $spkDetailList);
        $app->registerDataList('global_params', $globalParamsList);
        $app->registerDataList('contractorprofile', $contractorProfileDataList);

        $mr = $app->getModeRead();
        $r = $app->getRequest();
        $dao = new Erems_Models_Spk_SpkDao();
        switch ($mr) {
            case "spktype":
                $hasil = $dao->getType();
                $app->prosesDao('spktype', $hasil);
                break;
            case "contractor":
                $hasil = $dao->getContractor();
                $app->prosesDao('contractor', $hasil);
                break;
            case "contractordetail":
                $dao = new Erems_Models_Master_ContractorDao();
                $ct = new Erems_Models_Master_Contractor();
                $ct->setArrayTable($app->getData());
                $hasil = $dao->getById($ct);
                $app->prosesDao('contractorprofile', $hasil);
                break;
            case "detail":
                $spk = new Erems_Models_Spk_Spk();
                $spk->setArrayTable($app->getData());
                $hasil = $dao->getDetailBySpk($spk);
                $app->prosesDao('spkdetail', $hasil);
                break;
            case "all":

                $hasil = $dao->getAll($r);
                $app->prosesDao('main_list', $hasil);
                break;
            case "globalparams":
                $spkParams = new Erems_Models_Spk_SpkParams($app->getSession());
           
                $app->prosesDao('global_params',$spkParams->getHasil());
                break;
            case "cluster":
                $dao = new Erems_Models_Master_ClusterDao();
                $ct = new Erems_Models_Master_ClusterTran();
                $ct->setProject($app->getSession()->getProject());
                $ct->setPt($app->getSession()->getPt());
                $hasil = $dao->getByProjectPt($ct);
                $app->prosesDao('cluster', $hasil);
                break;
            case "block":
                $dao = new Erems_Models_Master_BlockDao();
                $bt = new Erems_Models_Master_BlockTran();
                $bt->setProject($app->getSession()->getProject());
                $bt->setPt($app->getSession()->getPt());
                $hasil = $dao->getByCPP($bt);
                $app->prosesDao('block', $hasil);
                break;
            case "unit":
                $dao = new Erems_Models_Unit_UnitDao();
                $u = new Erems_Models_Unit_UnitTran();
                $u->setProject($app->getSession()->getProject());
                $u->setPt($app->getSession()->getPt());
                $hasil = $dao->getAllSpkCount($u);
                
                $app->prosesDao('unit', $hasil);
                break;
        }
        $app->run();
    }

    function createAction() {

        $app = new Erems_Models_App_Models_Create($this);
        // $app = new Erems_Models_App_Models_Create($this, "create_spkwithdetail");
        $spkTrn = new Erems_Models_Spk_SpkTransaction();

        $app->prosesData($spkTrn);

        $validator = new Erems_Models_Spk_Validator();
        $validator->run($spkTrn);
        $msgEr = "";
        if ($validator->getStatus()) {
            $dao = new Erems_Models_Spk_SpkDao();

            $ccValid = $dao->checkCC($spkTrn);
            if ($ccValid['cod'] > 0) {
                $msgEr = "Code already used";
            } else {
                $spkTrn->setAddBy($app->getSession()->getUserId());
                $spkTrn->setDurasi($validator->getDurasi());
                $spkTrn->setNomor(Erems_Models_App_DocPrefixGenerator::get("SPKDOC"));
                // all valid
                if ($spkTrn->getSpkType()->getId() == Erems_Models_App_Config::getv('spk_type_id_unit')) {
                    $msgEr = "On Progress";
                    $spkDetail = $app->getData();
                    $spkDetail = $spkDetail["spkdetail"];
                    /* SPK Params */

                    $spkParams = new Erems_Models_Spk_SpkParams($app->getSession());
                    if (count($spkDetail) > 0) {

                        if ($spkParams->getMaxUnit() > 0) {
                            $countRow = 1;
                           
                            foreach ($spkDetail as $row) {
                                if ($countRow <= $spkParams->getMaxUnit()) {
                                    $spkUnit = new Erems_Models_Spk_SpkDetail();
                                    /* remora */
                                    $d = $row;
                                    $converter = new Erems_Models_App_Converter($d);
                                    $a = $spkUnit->grouped();

                                    $converter->process($a);
                                    $spkUnit->fillData($d);
                                    $spkTrn->addSpkDetail($spkUnit);
                                }

                                $countRow++;
                            }
                            $de = new Erems_Libraries_Delien_DelimiterEnhancer();
                            $de->setDelimiterCandidate($spkTrn);
                            $de->generate();
                            

                            $row = $dao->insertWithUnit($spkTrn);

                            if ($row > 0) {
                                $app->setSuccess(TRUE);
                                $msgEr = "Success";
                            } else {
                                $msgEr = "Error when processing your data";
                            }
                        } else {
                            $msgEr = "Max unit for this SPK is 0";
                        }
                    } else {
                        $msgEr = "Please insert Unit";
                    }
                } else { /// spk type non unit
                    $row = $dao->insertNonUnit($spkTrn);

                    if ($row > 0) {
                        $app->setSuccess(TRUE);
                        $msgEr = "Success";
                    }
                }
            }
        } else {
            $msgEr = $validator->getMsg();
        }

        $app->setMsg($msgEr);

        $app->run();
    }

    function updateAction() {
        $app = new Erems_Models_App_Models_Create($this);
        //  $app = new Erems_Models_App_Models_Create($this, 'update_spkwithunit');
        $msgEr = "Invalid Request";
        $spkTrn = new Erems_Models_Spk_SpkTransaction();

        $app->prosesData($spkTrn);
        if ($spkTrn->getId() > 0) {
            $validator = new Erems_Models_Spk_Validator();
            $validator->run($spkTrn);
            if ($validator->getStatus()) {

                $dao = new Erems_Models_Spk_SpkDao();

                $ccValid = $dao->checkCC($spkTrn);
                if ($ccValid['cod'] != $spkTrn->getId()) {
                    $msgEr = "Code already used";
                } else {

                    $spkTrn->setModiBy($app->getSession()->getUserId());
                    $spkTrn->setDurasi($validator->getDurasi());
                    // all valid
                    if ($spkTrn->getSpkType()->getId() == Erems_Models_App_Config::getv('spk_type_id_unit')) {
                        $msgEr = "On Progress...";

                        $spkDetail = $app->getData();
                        $spkDetail = $spkDetail["spkdetail"];
                        $spkParams = new Erems_Models_Spk_SpkParams($app->getSession());
                        if (count($spkDetail) > 0) {
                            if ($spkParams->getMaxUnit() > 0) {
                                $countRow = 1;
                                foreach ($spkDetail as $row) {
                                    if ($countRow <= $spkParams->getMaxUnit()) {
                                        $spkUnit = new Erems_Models_Spk_SpkDetail();
                                        /* remora */
                                        $d = $row;
                                        $converter = new Erems_Models_App_Converter($d);
                                        $a = $spkUnit->grouped();

                                        $converter->process($a);
                                        $spkUnit->fillData($d);
                                        $spkTrn->addSpkDetail($spkUnit);
                                    }
                                    $countRow++;
                                }
                                $de = new Erems_Libraries_Delien_DelimiterEnhancer();
                                $de->setDelimiterCandidate($spkTrn);
                                $de->generate();


                                /* deleted Rows */
                                $data = $app->getData();

                                $decan = new Erems_Models_App_Decan(explode(",", $data["deletedRows"]));
                                $de->setDelimiterCandidate($decan);
                                $de->generate();

                                $row = $dao->updateWithUnit($spkTrn, $decan);

                                if ($row > 0) {
                                    $app->setSuccess(TRUE);
                                    $msgEr = "Success";
                                }
                            } else {
                                $msgEr = "Max unit for this SPK is 0";
                            }
                        } else {
                            $msgEr = "Please insert Unit";
                        }
                    } else { /// spk type non unit
                        $row = $dao->updateNonUnit($spkTrn);

                        if ($row > 0) {
                            $app->setSuccess(TRUE);
                            $msgEr = "Success";
                        } else {
                            $msgEr = "Something problem when processing your request.";
                        }
                    }
                }
            } else {
                $msgEr = $validator->getMsg();
            }
        } else {
            $msgEr = "Invalid SPK";
        }


        $app->setMsg($msgEr);

        $app->run();
    }

    function deleteAction() {
        $app = new Erems_Models_App_Models_Delete($this);
        $app->setIdProperty('spk_id');
        $app->execute(new Erems_Models_Spk_SpkDao());
        $app->run();
    }

    protected function selectedRequestor(Erems_Kouti_Requestor $requestor) {
        return $requestor->spk();
    }

}

?>