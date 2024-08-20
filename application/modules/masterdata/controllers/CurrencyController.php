<?php

class Masterdata_CurrencyController extends Zend_Controller_Action
{
	function readAction()
	{
		$this->getResponse()->setHeader('Content-Type', 'application/json');
		
		$result = array('data'=>array(), 'total'=>0, 'success'=>false);
		
		$post_data['start'] = $this->getRequest()->getPost('start');
		$post_data['limit'] = $this->getRequest()->getPost('limit');	

		$post_data['currency_id'] = $this->getRequest()->getPost('currency_id');
		$post_data['currency_name'] = $this->getRequest()->getPost('currency_name');
		
		$model_currency = new Masterdata_Models_Currency();		
		$result = $model_currency->currencyRead($post_data);		
				
		echo Zend_Json::encode($result);	
		
		$this->_helper->viewRenderer->setNoRender(true);
	}
	
	function createAction()
	{
		$this->getResponse()->setHeader('Content-Type', 'application/json');					
		
		$result = array('data'=>array(), 'total'=>0, 'success'=>false);
		
		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));		
		
		$model_currency = new Masterdata_Models_Currency();		
		$result = $model_currency->currencyCreate($post_data);
		
		echo Zend_Json::encode($result);		
		
		$this->_helper->viewRenderer->setNoRender(true);
	}
	
	function updateAction()
	{
		$this->getResponse()->setHeader('Content-Type', 'application/json');					
		
		$result = array('data'=>array(), 'total'=>0, 'success'=>false);
		
		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));		
		
		$model_currency = new Masterdata_Models_Currency();		
		$result = $model_currency->currencyUpdate($post_data);				
		
		echo Zend_Json::encode($result);		
		
		$this->_helper->viewRenderer->setNoRender(true);
	}
	
	function deleteAction()
	{
		$this->getResponse()->setHeader('Content-Type', 'application/json');					
		
		$result = array('data'=>array(), 'total'=>0, 'success'=>false);
		
		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));	
		
		$model_currency = new Masterdata_Models_Currency();		
		$result = $model_currency->currencyDelete($post_data);				
		
		echo Zend_Json::encode($result);		
		
		$this->_helper->viewRenderer->setNoRender(true);
	}
}