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
        
        if($result) {
        echo Zend_Json::encode($result);
        }

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
       
    }
    
    function update($controller) {
        $params = $controller->getRequest()->getPost();
        $modeRead = isset($params["mode_update"])?$params["mode_update"]:"";
        if (strlen($modeRead) > 0) {
            $methodName = $modeRead . 'Update';
            if (method_exists($controller, $methodName)) {
                $this->printJson($controller, $controller->$methodName());
            }
        }else{
            $methodName = 'mainUpdate';
            if (method_exists($controller, $methodName)) {
                $this->printJson($controller, $controller->$methodName());
            }
        }
  
    }
    
    function delete($controller) {
        $params = $controller->getRequest()->getPost();
        $modeRead = isset($params["mode_delete"])?$params["mode_delete"]:"";
     
        if (strlen($modeRead) > 0) {
            $methodName = $modeRead . 'Delete';
            if (method_exists($controller, $methodName)) {
                $this->printJson($controller, $controller->$methodName());
            }
        }else{
            $methodName = 'mainDelete';
            if (method_exists($controller, $methodName)) {
                $this->printJson($controller, $controller->$methodName());
            }
        }
       
    }
    
    function create($controller) {
        $params = $controller->getRequest()->getPost();
        $modeRead = isset($params["mode_create"])?$params["mode_create"]:"";
        if (strlen($modeRead) > 0) {
            $methodName = $modeRead . 'Create';
            if (method_exists($controller, $methodName)) {
                $this->printJson($controller, $controller->$methodName());
            }
        }else{
            $methodName = 'mainCreate';
            if (method_exists($controller, $methodName)) {
                $this->printJson($controller, $controller->$methodName());
            }
        }
       
    }
    

    public static function generateExtJSModel($dataList) {

        $v = $dataList;

        $groupEmbede = new Cashier_Box_Models_App_EmbedGroup();
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
    
    public static function generateExtJSModelDirect($creator) {
        
        if(!$creator) {
            return false;
        }
        
        $ct = new Cashier_Box_Models_App_Hermes_DataModel();
        $ct->setDataList(new Cashier_Box_Models_App_DataListCreator('', $creator, array(), array()));
        
        $v = $ct->getDataList();

        $groupEmbede = new Cashier_Box_Models_App_EmbedGroup();
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
    
    public static function generateExtJSModelDirectWithDetail($creator,$detail) {
        
    if(!$creator || !$detail) {
            return false;
        }
        
        $ct = new Cashier_Box_Models_App_Hermes_DataModel();
        $ct->setDataList(new Cashier_Box_Models_App_DataListCreator('', $creator, $detail, array()));
        
        $v = $ct->getDataList();

        $groupEmbede = new Cashier_Box_Models_App_EmbedGroup();
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
    
    public static function generateExtJSModelDirectWithSubDetail($creator,$detail,$sub) {
        
    if(!$creator || !$detail || !$sub) {
            return false;
        }
        
        $ct = new Cashier_Box_Models_App_Hermes_DataModel();
        $ct->setDataList(new Cashier_Box_Models_App_DataListCreator('', $creator, $detail, $sub));
        
        $v = $ct->getDataList();

        $groupEmbede = new Cashier_Box_Models_App_EmbedGroup();
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
            "row"=> $dl->getTotalRow(),
            "data"=>$x
        );

        //$this->hasil->setTotalRow($row);
       // $this->hasil->setData($x);
        
    }
    
    public static function getRequest($params){
        
        $cashierReq = new Cashier_Box_Models_App_HasilRequestRead(array());
        $start = isset($params["start"])?$params["start"]:1;
        $limit = isset($params["limit"])?$params["limit"]:25;
        $page = $start > 0 ? ($start/$limit)+1:1;
        $cashierReq->setArrayForm($params);
        $cashierReq->setPage($page);
        $cashierReq->setLimit($limit);
        return $cashierReq;
    }
    
    public static function getSession(){
        $session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $session->report_path = APPLICATION_PATH . '/../public/app/cashier/report/';

        $sesBox = new Cashier_Box_Models_App_Session();
        $sesBox->getProject()->setId($session->getCurrentProjectId());
        $sesBox->getPt()->setId($session->getCurrentPtId());
        $sesBox->getUser()->setId($session->getUserId());
        
        return $sesBox;
    }
    
    public static function getAppdata($params) {
        $appdata = array();
        $cashierReq = new Cashier_Box_Models_App_HasilRequestRead(array());
        
        if(isset($params['data'])) {
            $paramsd = json_decode($params['data'],true);
            $cashierReq->setArrayForm($paramsd);
            $appdata = $cashierReq->getOthers();     
        }
        
        return $appdata;
    }
    
    public static function getAppdetail($params,$detail) {
       
        $cashierReq = new Cashier_Box_Models_App_HasilRequestRead(array());
        $cashierReq->setArrayForm($params);
        $appdata = json_decode($cashierReq->getOthers()[$detail],true);
        return $appdata;
    
    }
    
    public function getCustomRead($dao,Cashier_Box_Models_App_HasilRequestRead $request, $ses, $modeReads) {
      return $dao->getDefaultCustomRead($request, $ses ,$modeReads);
    }
    
    

}
