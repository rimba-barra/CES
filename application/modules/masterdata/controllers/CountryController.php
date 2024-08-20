<?php

class Masterdata_CountryController extends Zend_Controller_Action
{
	function readAction()
	{
		$this->getResponse()->setHeader('Content-Type', 'application/json');
		
		$result = array('data'=>array(), 'total'=>0, 'success'=>false);
		
		$post_data['start'] = $this->getRequest()->getPost('start');
		$post_data['limit'] = $this->getRequest()->getPost('limit');	
		
		$post_data['country_id'] = $this->getRequest()->getPost('country_id');
		$post_data['country_name'] = $this->getRequest()->getPost('country_name');
		
		$model_country = new Masterdata_Models_Country();		
		$result = $model_country->countryRead($post_data);		
		
		echo Zend_Json::encode($result);		
		
		$this->_helper->viewRenderer->setNoRender(true);
	}
	
	function createAction()
	{
		$this->getResponse()->setHeader('Content-Type', 'application/json');					
		
		$result = array('data'=>array(), 'total'=>0, 'success'=>false);
		
		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));		
		
		$model_country = new Masterdata_Models_Country();		
		$result = $model_country->countryCreate($post_data);
		
		echo Zend_Json::encode($result);		
		
		$this->_helper->viewRenderer->setNoRender(true);
	}
	
	function updateAction()
	{
		$this->getResponse()->setHeader('Content-Type', 'application/json');					
		
		$result = array('data'=>array(), 'total'=>0, 'success'=>false);
		
		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));		
		
		$model_country = new Masterdata_Models_Country();		
		$result = $model_country->countryUpdate($post_data);				
		
		echo Zend_Json::encode($result);		
		
		$this->_helper->viewRenderer->setNoRender(true);
	}
	
	function deleteAction()
	{
		$this->getResponse()->setHeader('Content-Type', 'application/json');					
		
		$result = array('data'=>array(), 'total'=>0, 'success'=>false);
		
		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));	
		
		$model_country = new Masterdata_Models_Country();		
		$result = $model_country->countryDelete($post_data);				
		
		echo Zend_Json::encode($result);		
		
		$this->_helper->viewRenderer->setNoRender(true);
	}
}