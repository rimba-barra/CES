<?php

class Erems_BookingfeeamountController extends Zend_Controller_Action{
	protected $model;
	protected $result = array('total'=>0, 'success'=>false, 'data'=>array());
	
	function init(){
		$this->getResponse()->setHeader('Content-Type', 'application/json');
		$this->model = new Erems_Models_Vabookingfee();
	}
		
	function readAction(){
		$this->result = $this->model->dataReadAmount($this->getRequest()->getPost());
		echo Zend_Json::encode($this->result);
		$this->_helper->viewRenderer->setNoRender(true);		
	}
}