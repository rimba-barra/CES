<?php

class Erems_MasterparameterglobalController extends Zend_Controller_Action {

    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);


        $modeRead = $this->getRequest()->getPost('mode_read');

        if ($modeRead) {
            if ($modeRead == 'checkuseronline') {

                $ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');

                $dao = new Erems_Models_Master_UserDao();
                $hasil = $dao->getUserOnline();
                $hasil = $hasil[1];
                $result['data'] = array('users' => $hasil, 'admin_id' => $ses->getUserId());
            } else if ($modeRead == "gxml") {
                $msg = "";

                $status = FALSE;

                /// load data from db
                $ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
                $dao = new Erems_Models_Master_ParameterDao();
                $dbResult = $dao->getAllOld($ses->getCurrentProjectId(), $ses->getCurrentPtId());

                if (key_exists(0, $dbResult)) {
                    if (count($dbResult[0]) > 0) {
                        $allParam = $dbResult[0];
                        $xmlstr = '<?xml version="1.0" encoding="UTF-8"?><params></params>';

                        $xml = new SimpleXMLElement($xmlstr);
                        foreach ($allParam as $p) {
                            $param = $xml->addChild('param');
                            $param->addChild("parametername", $p["parametername"]);
                            $param->addChild("value", $p["value"]);
                            $param->addChild("datatype", $p["datatype"]);
                            $param->addChild("description", $p["description"]);
                        }


                        $status = $xml->asXML(APPLICATION_PATH . '/../public/app/erems/config/parameterglobal.xml');
                    } else {
                        $msg = "Tidak ada data";
                    }
                } else {
                    $msg = "Error pada saat load data";
                }




                $result = array("msg" => $msg, "status" => $status);
            } else if ($modeRead == "dxml") {
                $msg = '';
                $status = FALSE;
                
                $ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');

                $file = APPLICATION_PATH . '/../public/app/erems/config/parameterglobal.xml';
                if (file_exists($file)) {
                    
                    $msg = "File opened";
                    $xml = simplexml_load_file($file);
                    
                    
                    $newParams = array();

                    for ($i = 0; $i < $xml->count(); $i++) {
                        $xx = $xml->param[$i];
                        if ($xx instanceof SimpleXMLElement) {
                            $newParam = new Erems_Models_Master_Parameter();

                            foreach ($xx->children() as $k => $v) {

                                //  var_dump($xx->$k);
                                if ($k == "parametername") {
                                    $newParam->setName($xx->$k);
                                } else if ($k == "value") {
                                    $newParam->setValue($xx->$k);
                                }
                            }

                            $newParams[] = $newParam;

                            
                            
                            
                        }

                        //  var_dump($xml->param[$i]->get);
                    }
                    
                    $de = new Erems_Box_Delien_DelimiterEnhancer();
                            $decan = new Erems_Box_Models_App_DecanForObject($newParams);
                            $de->setDelimiterCandidate($decan);
                            $de->generate();
                            
                    $dao = new Erems_Models_Master_ParameterDao();
                    
                    
               
                    $status = $dao->generate($decan,$ses->getUserId(),$ses->getCurrentProjectId(), $ses->getCurrentPtId());
                    
                } else {
                    $msg = 'Failed to open file.';
                }

                $result = array("data" => array("msg" => $msg, "status" => $status));
            } else if ($modeRead == "checkuser") {
                $msg = 'Invalid user';
                $status = FALSE;
                $ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
                //if ($ses->getUserId() == Erems_Box_AuthorizeConfig::DATA_CREATOR) {
                if ($ses->getUserId() == Erems_Box_Projectptconfig_ProjectPtConfigSelector::getAuthorizeUser($ses->getCurrentProjectId(), $ses->getCurrentPtId(),"DATA_CREATOR")) {
                    $status = TRUE;
                    $msg = 'Valid user';
                }
                $result = array("data" => array("msg" => $msg, "status" => $status));
            }
        } else {
            $post_data['start'] = $this->getRequest()->getPost('start');
            $post_data['limit'] = $this->getRequest()->getPost('limit');
            $post_data['parametername'] = $this->getRequest()->getPost('parametername');
            $post_data['value'] = $this->getRequest()->getPost('value');
            $post_data['datatype'] = $this->getRequest()->getPost('datatype');
            $post_data['description'] = $this->getRequest()->getPost('description');
            $model_masterparameterglobal = new Erems_Models_Masterparameterglobal();
            $result = $model_masterparameterglobal->masterparameterglobalRead($post_data);
        }



        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {



        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model_masterparameterglobal = new Erems_Models_Masterparameterglobal();
        $result = $model_masterparameterglobal->masterparameterglobalCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_masterparameterglobal = new Erems_Models_Masterparameterglobal();
        $result = $mode_masterparameterglobal->masterparameterglobalUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_masterparameterglobal = new Erems_Models_Masterparameterglobal();
        $result = $mode_masterparameterglobal->masterparameterglobalDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>