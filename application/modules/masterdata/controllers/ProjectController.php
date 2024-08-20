<?php

class Masterdata_ProjectController extends Zend_Controller_Action
{
	function readAction()
	{
		$this->getResponse()->setHeader('Content-Type', 'application/json');
		
		$result = array('data'=>array(), 'total'=>0, 'success'=>false);
		
		$post_data['start'] = $this->getRequest()->getPost('start');
		$post_data['limit'] = $this->getRequest()->getPost('limit');	

		$post_data['project_id'] = $this->getRequest()->getPost('project_id');
		$post_data['project_name'] = $this->getRequest()->getPost('project_name');
		
		$model = new Masterdata_Models_Project();		
		$result = $model->projectRead($post_data);		
		
		echo Zend_Json::encode($result);	
		
		$this->_helper->viewRenderer->setNoRender(true);
	}
	
	function createAction()
	{
		$this->getResponse()->setHeader('Content-Type', 'application/json');					
		
		$result = array('data'=>array(), 'total'=>0, 'success'=>false);
		
		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));		
		
		$model = new Masterdata_Models_Project();		
		$result = $model->projectCreate($post_data);
		
		echo Zend_Json::encode($result);	
		
		$this->_helper->viewRenderer->setNoRender(true);
	}
	
	function updateAction()
	{
		$this->getResponse()->setHeader('Content-Type', 'application/json');					
		
		$result = array('data'=>array(), 'total'=>0, 'success'=>false);
		
		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));		
		
		$model = new Masterdata_Models_Project();		
		$result = $model->projectUpdate($post_data);				
		
		echo Zend_Json::encode($result);		
		
		$this->_helper->viewRenderer->setNoRender(true);
	}
	
	function deleteAction()
	{
		$this->getResponse()->setHeader('Content-Type', 'application/json');					
		
		$result = array('data'=>array(), 'total'=>0, 'success'=>false);
		
		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));	
		
		$model = new Masterdata_Models_Project();		
		$result = $model->projectDelete($post_data);				
		
		echo Zend_Json::encode($result);		
		
		$this->_helper->viewRenderer->setNoRender(true);
	}
}