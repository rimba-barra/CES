<?php

require_once 'ApliController.php';

/**
 * Description of ApliController
 *
 * @author TOMMY-MIS
 */
class ApliMasterController extends ApliController {

    private $dao;
    private $validator;
    private $object;
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
        $dao = new Master_Models_Transaction_VoucherDao();
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

        return array(
            "data" => array(
                $params['paramname'] => array(
                    "model" => $getModel,
                    "data" => $hasil[0]
                ),
            ),
        );
    }

    public function getptRead() {
        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $dao = new Master_Models_Master_DefaultDao();
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
        $dao = new Master_Models_Master_DefaultDao();
        $val = 0;
        $data = $dao->getCustomRead('', $request, $session);

        if(count($data[0])>0) {
            $val = array("value"=>$data[0][0]['value']);
        }
        else {
            $val = array("value"=>0);
        }
        return array(
            "data" => $val,
        );
    }

    function noRender() {
        $this->_helper->viewRenderer->setNoRender(true);
    }

}
