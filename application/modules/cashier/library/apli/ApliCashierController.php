<?php

require_once 'ApliController.php';

/**
 * Description of ApliController
 *
 * @author TOMMY-MIS
 */
class ApliCashierController extends ApliController {

    private $dao;
    private $validator;
    private $object;
    private $propertyId;
    private $model;
    private $submodel;
    private $subarray;
    private $initProject = FALSE;

    function getInitProject() {
        return $this->initProject;
    }

    function setInitProject($initProject) {
        $this->initProject = $initProject;
    }

    function getModel() {
        return $this->model;
    }

    function getSubmodel() {
        return $this->submodel;
    }

    function getSubarray() {
        return $this->subarray;
    }

    function setModel($model) {
        $this->model = $model;
    }

    function setSubmodel($submodel) {
        $this->submodel = $submodel;
    }

    function setSubarray($subarray) {
        $this->subarray = $subarray;
    }

    function getPropertyId() {
        return $this->propertyId;
    }

    function setPropertyId($propertyId) {
        $this->propertyId = $propertyId;
    }

    function getDao() {
        return $this->dao;
    }

    function getValidator() {
        return $this->validator;
    }

    function getObject() {
        return $this->object;
    }

    function setDao($dao) {
        $this->dao = $dao;
    }

    function setValidator($validator) {
        $this->validator = $validator;
    }

    function setObject($object) {
        $this->object = $object;
    }

    function readAction() {
        $apli = new Apli();
        $apli->read($this);
    }

    function updateAction() {
        $apli = new Apli();
        $apli->update($this);
    }

    function createAction() {
        $apli = new Apli();
        $apli->create($this);
    }

    function deleteAction() {
        $apli = new Apli();
        $apli->delete($this);
    }

    public function customrequestRead() {
        $params = $this->getRequest()->getPost();
        $model = $params['model'];
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $dao = new Cashier_Models_Transaction_VoucherDao();
        $hasil = $dao->getCustomRead('', $request, $session);
        $getModel = array();
        if (array_key_exists('submodel', $params)) {
            $submodel = json_decode($params['submodel'], true);
            $getModel = Apli::generateExtJSModelDirectWithDetail($model, $submodel);
        } else {
            if ($model) {
                $getModel = Apli::generateExtJSModelDirect($model);
            } else {
                $getModel = $params['paramname'];
            }
        }
        
        if(isset($hasil[0])){
            $newhasil = $hasil[0];
        }else{
            $newhasil = null;
        }
        return array(
            "data" => array(
                $params['paramname'] => array(
                    "model" => $getModel,
                    "data" => $newhasil 
                ),
            ),
        );
    }

    public function getptRead() {
        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $dao = new Cashier_Models_Master_DefaultDao();
        $request->setModule("global");
        $hasil = $dao->getCustomRead('', $request, $session);
        return array(
            "data" => $hasil[0]
        );
    }

    public function getvouchergenerateRead() {
        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $request->setModule("global");
        $dao = new Cashier_Models_Master_DefaultDao();
        $val = 0;
        $data = $dao->getCustomRead('', $request, $session);

        if (count($data[0]) > 0) {
            $val = array("value" => $data[0][0]['value']);
        } else {
            $val = array("value" => 0);
        }
        return array(
            "data" => $val,
        );
    }

    function noRender() {
        $this->_helper->viewRenderer->setNoRender(true);
    }

    public function mainCreate() {

        $this->allRead();
        $params = $this->getRequest()->getPost();
        $request = Apli::getRequest($params);
        $data = Apli::getAppdata($params);
        $session = Apli::getSession();
        $objectCreator = $this->getObject();
        Cashier_Box_Tools::setArrayTable($objectCreator, $data);
        $objectCreator->setAddBy($session->getUser()->getId());
        $objectCreator->setProjectPt($session->getProject(), $session->getPt());
        $validator = $this->getValidator();
        $validator->appRequest = $request;
        $validator->session = $session;
        $validator->action = $this->getRequest()->getActionName();
        $validator->controller = $this;
        $validator->run($objectCreator);
        return array(
            "success" => $validator->getStatus(),
            "msg" => $validator->getMsg(),
            $this->getPropertyId() => $validator->getReturnId(),
        );
    }

    public function mainUpdate() {
        $params = $this->getRequest()->getPost();
        $request = Apli::getRequest($params);
        $session = Apli::getSession();
        $data = Apli::getAppdata($params);
        $objectCreator = $this->getObject();
        Cashier_Box_Tools::setArrayTable($objectCreator, $data);
        $objectCreator->setProjectPt($session->getProject(), $session->getPt());
        $validator = $this->getValidator();
        $validator->appRequest = $request;
        $validator->session = $session;
        $validator->action = $this->getRequest()->getActionName();
        $validator->run($objectCreator);
        return array(
            "success" => $validator->getStatus(),
            "msg" => $validator->getMsg()
        );
    }

    public function mainDelete() {
        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $data = json_decode($params['data'], true);
        $user = $session->getUser()->getId();
        $deletedId = array();
        if (count($data) !== count($data, COUNT_RECURSIVE)) {
            foreach ($data as $row => $index) {
                $deletedId[$row] = $index[$this->getPropertyId()];
            }
            $send = implode('~', $deletedId);
        } else {
            $send = $data[$this->getPropertyId()];
        }

        $dao = $this->getDao();
        $hasil = $dao->deleteData($user, $send, $request);
        if ($hasil) {
            $status = TRUE;
        } else {
            $status = FALSE;
        }
        return array(
            "success" => $status,
            "total" => $hasil
        );
    }

    public function allRead() {

        $params = $this->getRequest()->getPost();
        $cashierReq = Apli::getRequest($params);
        $session = Apli::getSession();
        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Cashier_Box_Models_App_DataListCreator('', $this->getModel(), $this->getSubmodel(), $this->getSubarray()
        ));
        $objectCreator = $this->getObject();
        $objectCreator->setProjectPt($session->getProject(), $session->getPt());
        $dao = $this->getDao();
        $dm->setObject($objectCreator);
        $dm->setDao($dao);
        $hasil = $dao->getByProjectPtWithPageSearch($objectCreator, $cashierReq, $session);
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

//    public function detailptRead() {
//
//        $params = $this->getRequest()->getPost();
//        $cashierReq = Apli::getRequest($params);
//        $session = Apli::getSession();
//        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
//        $dm->setDataList(new Cashier_Box_Models_App_DataListCreator('', 'multiprojectdetail', array(), array("")));
//        $objectCreator = $this->getObject();
//        $objectCreator->setProjectPt($session->getProject(), $session->getPt());
//        $dao = $this->getDao();
//        $dm->setObject($objectCreator);
//        $dm->setDao($dao);
//        $hasil = $dao->getdetailpt($objectCreator, $cashierReq, $session);
//        $dm->setHasil($hasil);
//        $dl = $dm->getDataList();
//        $dl->setDataDao($hasil);
//        $hasilData = Apli::prosesDao($dm->getDataList());
//        return array(
//            "model" => Apli::generateExtJSModel($dm->getDataList()),
//            "data" => $hasilData["data"],
//            "totalRow" => $hasilData["row"]
//        );
//    }

    public function initRead() {

        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $dao = $this->getDao();
        
        //OVERIDE PARAM KE GLOBAL di sp_all_read
        $request->setModule('global');
        
        
        if ($this->getInitProject()) {
            $projectHasil = $dao->getCustomRead('detailproject', $request, $session);
            $projectModel = Apli::generateExtJSModelDirect('project');

            return array(
                "data" => array(
                    "project" => array(
                        "model" => $projectModel,
                        "data" => $projectHasil[0]
                    ),
                ),
            );
        } else {
            $ptHasil = $dao->getCustomRead('detailpt', $request, $session);
            $ptModel = Apli::generateExtJSModelDirectWithDetail('pt','project');
            $projectHasil = $dao->getCustomRead('detailproject', $request, $session);
            $projectModel = Apli::generateExtJSModelDirectWithDetail('multiproject', array('user', 'project'));
            return array(
                "data" => array(
                    "pt" => array(
                        "model" => $ptModel,
                        "data" => $ptHasil[0]
                    ),
                    //Rizal
                    "project" => array(
                        "model" => $projectModel,
                        "data" => $projectHasil[0]
                    ),
                ),
            );
        }
    }

    //david
    public function initforcoaRead() {

        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $dao = $this->getDao();
        
        //OVERIDE PARAM KE GLOBAL di sp_all_read
        $request->setModule('global');
        
        
        if ($this->getInitProject()) {
            $projectHasil = $dao->getCustomRead('detailprojectforcoa', $request, $session);
            $projectModel = Apli::generateExtJSModelDirect('project');

            return array(
                "data" => array(
                    "project" => array(
                        "model" => $projectModel,
                        "data" => $projectHasil[0]
                    ),
                ),
            );
        } else {
            $ptHasil = $dao->getCustomRead('detailptforcoa', $request, $session);
            $ptModel = Apli::generateExtJSModelDirectWithDetail('pt','project');
            $projectHasil = $dao->getCustomRead('detailprojectforcoa', $request, $session);
            $projectModel = Apli::generateExtJSModelDirectWithDetail('multiproject', array('user', 'project'));
            return array(
                "data" => array(
                    "pt" => array(
                        "model" => $ptModel,
                        "data" => $ptHasil[0]
                    ),
                    //Rizal
                    "project" => array(
                        "model" => $projectModel,
                        "data" => $projectHasil[0]
                    ),
                ),
            );
        }
    }

}
