<?php

class Masterdata_CityController extends Zend_Controller_Action
{
	protected $model;
	protected $result = array('data'=>array(), 'total'=>0, 'success'=>false);
	
	function init()
	{
		$this->getResponse()->setHeader('Content-Type', 'application/json');		
		$this->model = new Masterdata_Models_City();
	}
		
	function readAction()
	{					
		$post_data['start'] = $this->getRequest()->getPost('start');
		$post_data['limit'] = $this->getRequest()->getPost('limit');	
		
		$post_data['city_id'] = $this->getRequest()->getPost('city_id');
		$post_data['city_name'] = $this->getRequest()->getPost('city_name');
		$post_data['province_id'] = $this->getRequest()->getPost('province_id');
		$post_data['country_id'] = $this->getRequest()->getPost('country_id');
			
		$this->result = $this->model->dataRead($post_data);
		echo Zend_Json::encode($this->result);		
		$this->_helper->viewRenderer->setNoRender(true);		
	}
	
	function createAction()
	{	
		$this->result = $this->model->dataCreate(Zend_Json::decode($this->getRequest()->getPost('data')));		
		echo Zend_Json::encode($this->result);		
		$this->_helper->viewRenderer->setNoRender(true);
	}
	
	function updateAction()
	{
		$this->result = $this->model->dataUpdate(Zend_Json::decode($this->getRequest()->getPost('data')));		
		echo Zend_Json::encode($this->result);		
		$this->_helper->viewRenderer->setNoRender(true);
	}
	
	function deleteAction()
	{
		$this->result = $this->model->dataDelete(Zend_Json::decode($this->getRequest()->getPost('data')));		
		echo Zend_Json::encode($this->result);		
		$this->_helper->viewRenderer->setNoRender(true);
	}
}