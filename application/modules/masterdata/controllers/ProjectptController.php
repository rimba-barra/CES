<?php

class Masterdata_ProjectptController extends Zend_Controller_Action
{
	function readAction()
	{
		$this->getResponse()->setHeader('Content-Type', 'application/json');
		
		$result = array('data'=>array(), 'total'=>0, 'success'=>false);
		
		$post_data['start'] = $this->getRequest()->getPost('start');
		$post_data['limit'] = $this->getRequest()->getPost('limit');	

		$post_data['projectpt_id'] = $this->getRequest()->getPost('projectpt_id');
		$post_data['project_id'] = $this->getRequest()->getPost('project_id');
		$post_data['pt_id'] = $this->getRequest()->getPost('pt_id');
		
		$model = new Masterdata_Models_Projectpt();		
		$result = $model->projectptRead($post_data);		
		
		echo Zend_Json::encode($result);	
		
		$this->_helper->viewRenderer->setNoRender(true);
	}
	
	function createAction()
	{
		$this->getResponse()->setHeader('Content-Type', 'application/json');					
		
		$result = array('data'=>array(), 'total'=>0, 'success'=>false);
		
		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));		
		
		$model = new Masterdata_Models_Projectpt();		
		$result = $model->projectptCreate($post_data);
		
		echo Zend_Json::encode($result);	
		
		$this->_helper->viewRenderer->setNoRender(true);
	}
	
	function updateAction()
	{
		$this->getResponse()->setHeader('Content-Type', 'application/json');					
		
		$result = array('data'=>array(), 'total'=>0, 'success'=>false);
		
		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));		
		
		$model = new Masterdata_Models_Projectpt();		
		$result = $model->projectptUpdate($post_data);				
		
		echo Zend_Json::encode($result);		
		
		$this->_helper->viewRenderer->setNoRender(true);
	}
	
	function deleteAction()
	{
		$this->getResponse()->setHeader('Content-Type', 'application/json');					
		
		$result = array('data'=>array(), 'total'=>0, 'success'=>false);
		
		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));	
		
		$model = new Masterdata_Models_Projectpt();		
		$result = $model->projectptDelete($post_data);				
		
		echo Zend_Json::encode($result);		
		
		$this->_helper->viewRenderer->setNoRender(true);
	}
}