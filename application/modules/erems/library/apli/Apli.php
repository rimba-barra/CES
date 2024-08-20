<?php

/**
 * Description of Apli
 *
 * @author TOMMY-MIS
 */
class Apli {

    function hello() {
        return "Hello";
    }

    function printJson($controller, $result) {
        $controller->getResponse()->setHeader('Content-Type', 'application/json');

        echo Zend_Json::encode($result);

        $controller->noRender();
    }

    function read($controller) {
        $params = $controller->getRequest()->getPost();
        $modeRead = $params["mode_read"];
        if (strlen($params["mode_read"]) > 0) {
            $methodName = $modeRead . 'Read';
            if (method_exists($controller, $methodName)) {
                $this->printJson($controller, $controller->$methodName());
            }
        }
        // var_dump($params);
    }

    public static function generateExtJSModel($dataList) {

        $v = $dataList;

        $groupEmbede = new Erems_Box_Models_App_EmbedGroup();
        $groupEmbede->setMember($v->getEmbedMember());
        $x = array_merge($v->getMaster()->getMappingArray(), $groupEmbede->getModel());

        
        
        foreach ($v->getAksesoris() as $row) {
            $row = (string) $row;
            $x = array_merge($x, array(array("name" => $row)));
        }
        $auModels = $x;

        //  $hasil->setData($auModels);
        return $auModels;
    }

    public static function prosesDao($dataList) {
        $dl = NULL;


        $row = 0;
        $x = array();
        if (count($dataList->getDataDao()) > 0) {
            $dl = $dataList;
            // $dl->setDataDao($dataDao);
            $x = array();
            foreach ($dl->getList() as $row) {

                $x[] = $row->getArrayEmbed();
            }
            $row = $dl->getTotalRow();
        }

        return array(
            "row" => $dl->getTotalRow(),
            "data" => $x
        );

        //$this->hasil->setTotalRow($row);
        // $this->hasil->setData($x);
    }

    public static function getRequest($params) {

        $eremsReq = new Erems_Box_Models_App_HasilRequestRead(array());
        $start = isset($params["start"]) ? $params["start"] : 1;
        $limit = isset($params["limit"]) ? $params["limit"] : 25;
        $page = $start > 0 ? ($start / $limit) + 1 : 1;
        $eremsReq->setArrayForm($params);
        $eremsReq->setPage($page);
        $eremsReq->setLimit($limit);

        return $eremsReq;
    }

    public static function getSession() {
        $session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $session->report_path = APPLICATION_PATH . '/../public/app/erems/report/';

       
        
        $URL = $_SERVER["REQUEST_URI"];
        $URLARR = explode("/",$URL);
        $controllerName = false;
        if($URLARR){
            if(count($URLARR) >= 2){
                $controllerName = $URLARR[count($URLARR)-2];
            }
        }
        
        

        $sesBox = new Erems_Box_Models_App_Session();
        $sesBox->getProject()->setId($session->getCurrentProjectId());
        $sesBox->getPt()->setId($session->getCurrentPtId());
        $sesBox->getUser()->setId($session->getUserId());
        $sesBox->setGroupId($session->getCurrentGroupId());
        $sesBox->controllerName = $controllerName;
        $sesBox->appsId = $session->getCurrentModuleId();
        

        return $sesBox;
    }

    function create($controller) {
        $params = $controller->getRequest()->getPost();
        $modeRead = $params["mode_read"];
        if (strlen($params["mode_read"]) > 0) {
            $methodName = $modeRead . 'Create';
            if (method_exists($controller, $methodName)) {
                $this->printJson($controller, $controller->$methodName());
            }
        }
    }

    function update($controller) {
        $params = $controller->getRequest()->getPost();
        $modeRead = $params["mode_read"];
        if (strlen($params["mode_read"]) > 0) {
            $methodName = $modeRead . 'Update';
            if (method_exists($controller, $methodName)) {
                $this->printJson($controller, $controller->$methodName());
            }
        }
    }

    function delete($controller) {
        $params = $controller->getRequest()->getPost();
        $modeRead = $params["mode_read"];
        if (strlen($params["mode_read"]) > 0) {
            $methodName = $modeRead . 'Delete';
            if (method_exists($controller, $methodName)) {
                $this->printJson($controller, $controller->$methodName());
            }
        }
    }

    public static function getDataModel($hasilDb, $creatorName, $creatorFriends = array()) {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', $creatorName, $creatorFriends, array());

        $dm->setDataList($dataList);
        $dm->setHasil($hasilDb);


        return array(
            "model" => Apli::generateExtJSModel($dm->getDataList()),
            "data" => $hasilDb[1],
            "totalRow" => $hasilDb[0][0]["totalRow"]
        );
    }

    public static function getDataModelB($hasilDb, $creatorName, $creatorFriends = array()) {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', $creatorName, $creatorFriends, array());

        var_dump($hasilDb);
        $dm->setDataList($dataList);
        $dm->setHasil($hasilDb);


        $hasilData = Apli::prosesDao($dm->getDataList());

        return array(
            "model" => Apli::generateExtJSModel($dm->getDataList()),
            "data" => $hasilData["data"],
            "totalRow" => $hasilData["row"]
        );
    }

    public static function generateDelimiterArray($dataArray) {
        $count = 0;
        $delimiterAr = array();
        foreach ($dataArray as $v) {
            if ($count == 0) {
                foreach ($v as $k => $vv) {
                    $delimiterAr[$k] = array($vv);
                }
            } else {
                foreach ($v as $k => $vv) {

                    $delimiterAr[$k][] = $vv;
                }
            }

            $count++;
        }
        
        foreach($delimiterAr as $k=>$v){
            $delimiterAr[$k] = implode("~",$v);
        }
        
        return $delimiterAr;
    }
    
    public static function instantRead($dataArray) {
        return array(
            "model" =>NULL,
            "data" =>$dataArray
        );
    }

}
