<?php

class Masterdata_BankController extends Zend_Controller_Action
{
	function readAction()
	{
		$this->getResponse()->setHeader('Content-Type', 'application/json');
		
		$result = array('data'=>array(), 'total'=>0, 'success'=>false);
		
		$post_data['start'] = $this->getRequest()->getPost('start');
		$post_data['limit'] = $this->getRequest()->getPost('limit');	

		$post_data['bank_id'] = $this->getRequest()->getPost('bank_id');
		$post_data['bank_name'] = $this->getRequest()->getPost('bank_name');
		$post_data['bank_company_name'] = $this->getRequest()->getPost('bank_company_name');
		
		$model = new Masterdata_Models_Bank();		
		$result = $model->readData($post_data);		
		
		echo Zend_Json::encode($result);	
		
		$this->_helper->viewRenderer->setNoRender(true);
	}
	
	function createAction()
	{
		$this->getResponse()->setHeader('Content-Type', 'application/json');					
		
		$result = array('data'=>array(), 'total'=>0, 'success'=>false);
		
		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));		
		
		$model = new Masterdata_Models_Bank();		
		$result = $model->createData($post_data);
		
		echo Zend_Json::encode($result);	
		
		$this->_helper->viewRenderer->setNoRender(true);
	}
	
	function updateAction()
	{
		$this->getResponse()->setHeader('Content-Type', 'application/json');					
		
		$result = array('data'=>array(), 'total'=>0, 'success'=>false);
		
		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));		
		
		$model = new Masterdata_Models_Bank();		
		$result = $model->updateData($post_data);				
		
		echo Zend_Json::encode($result);		
		
		$this->_helper->viewRenderer->setNoRender(true);
	}
	
	function deleteAction()
	{
		$this->getResponse()->setHeader('Content-Type', 'application/json');					
		
		$result = array('data'=>array(), 'total'=>0, 'success'=>false);
		
		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));	
		
		$model = new Masterdata_Models_Bank();		
		$result = $model->deleteData($post_data);				
		
		echo Zend_Json::encode($result);		
		
		$this->_helper->viewRenderer->setNoRender(true);
	}
}