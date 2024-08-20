<?php

class Erems_NotifikasimoduleController extends Zend_Controller_Action{
	protected $model;
	protected $result = array('total'=>0, 'success'=>false, 'data'=>array());
	
	function init(){
		$this->getResponse()->setHeader('Content-Type', 'application/json');
		$this->model = new Erems_Models_Notifikasiuser();
	}
		
	function readAction(){
		$this->result = $this->model->getModule($this->getRequest()->getPost());
		echo Zend_Json::encode($this->result);
		$this->_helper->viewRenderer->setNoRender(true);		
	}
}