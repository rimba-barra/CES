<?php

class Erems_MastergirikController extends Zend_Controller_Action
{
	protected $model;
	protected $result = array('total'=>0, 'success'=>false, 'data'=>array());
	
	function init()
	{
		$this->getResponse()->setHeader('Content-Type', 'application/json');
		$this->model = new Erems_Models_Mastergirik();
	}
		
	function readAction()
	{
		$read_type_mode = ($this->getRequest()->getPost('read_type_mode') ? $this->getRequest()->getPost('read_type_mode') : '');
		
		if($read_type_mode == 'detail'){
			$post_data['datasearch'] = $this->getRequest()->getPost('datasearch');
			$this->result = $this->model->datadetailRead($post_data);
		} else {
			$this->result = $this->model->dataRead($this->getRequest()->getPost());
		}
		echo Zend_Json::encode($this->result);
		$this->_helper->viewRenderer->setNoRender(true);		
	}
	
	function createAction()
	{	
		$this->result = $this->model->dataCreate($this->getRequest()->getPost());
		echo Zend_Json::encode($this->result);
		$this->_helper->viewRenderer->setNoRender(true);
	}
	
	function updateAction()
	{
		$this->result = $this->model->dataUpdate($this->getRequest()->getPost());
		echo Zend_Json::encode($this->result);
		$this->_helper->viewRenderer->setNoRender(true);
	}
	
	function deleteAction()
	{		
		$this->result = $this->model->dataDelete($this->getRequest()->getPost());
		echo Zend_Json::encode($this->result);
		$this->_helper->viewRenderer->setNoRender(true);		
	}
	
	function printAction()
	{
		$report_fn = 'report_master_mastergirik.mrt';
		echo $report_fn && (file_exists($this->_helper->session->report_path.$report_fn) || file_exists($this->_helper->session->report_path.$this->_helper->session->getCurrentProjectId().'-'.$this->_helper->session->getCurrentPtId().'/'.$report_fn)) ? $report_fn : 'ERROR';
		$this->_helper->viewRenderer->setNoRender(true);		
	}
}