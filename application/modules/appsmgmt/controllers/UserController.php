<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Appsmgmt_UserController extends Zend_Controller_Action
{
        //addby imaam on 20191017
	public function init(){
            $this->_helper->viewRenderer->setNoRender(true);
            $this->_helper->removeHelper('viewRenderer');
            Zend_Controller_Front::getInstance()->setParam('noViewRenderer', true);
            if(!isset($_SESSION['Ciputra'])){
                die; //tanpa session STOP
            }
	}

	function readAction()
	{
		$this->getResponse()->setHeader('Content-Type', 'application/json');
		$result = array('data'=>array(), 'total'=>0, 'success'=>false);
		
		$post_data['page'] = $this->getRequest()->getPost('page');
		$post_data['limit'] = $this->getRequest()->getPost('limit');	
		
		if($post_data['limit']=="0"){
//			$post_data['limit']=25;
		}
			
		$post_data['user_id'] = $this->getRequest()->getPost('user_id');			
		$post_data['search_query'] = $this->getRequest()->getPost('search_query');
		
		$model = new Appsmgmt_Models_User();		
		$result = $model->readData($post_data);		
		
		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}
	
	function createAction()
	{		
		$this->getResponse()->setHeader('Content-Type', 'application/json');					
		
		$result = array('data'=>array(), 'total'=>0, 'success'=>false);
		
		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));		
		
		$model = new Appsmgmt_Models_User();		
		$result = $model->createData($post_data);
		
		echo Zend_Json::encode($result);		
		$this->_helper->viewRenderer->setNoRender(true);
	}
	
	function updateAction()
	{
		$this->getResponse()->setHeader('Content-Type', 'application/json');					
		
		$result = array('data'=>array(), 'total'=>0, 'success'=>false);
		
		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));		
				
		$model = new Appsmgmt_Models_User();
		$result = $model->updateData($post_data);	
		
		echo Zend_Json::encode($result);		
		$this->_helper->viewRenderer->setNoRender(true);
	}
	
	function deleteAction()
	{
		$this->getResponse()->setHeader('Content-Type', 'application/json');					
		
		$result = array('data'=>array(), 'total'=>0, 'success'=>false);
		
		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));	
					
		$model = new Appsmgmt_Models_User();		
		$result = $model->deleteData($post_data);								
				
		echo Zend_Json::encode($result);		
		$this->_helper->viewRenderer->setNoRender(true);
	}
	
	function activityreadAction()
	{
		$this->getResponse()->setHeader('Content-Type', 'application/json');
		$result = array('data'=>array(), 'total'=>0, 'success'=>false);
		
		$post_data['start'] = $this->getRequest()->getPost('start');
		$post_data['limit'] = $this->getRequest()->getPost('limit');	
		
		$post_data['user_activity_id'] = $this->getRequest()->getPost('user_activity_id');			
		$post_data['user_id'] = $this->getRequest()->getPost('user_id');			
		$post_data['access_page'] = $this->getRequest()->getPost('access_page');
		$post_data['access_time_start'] = $this->getRequest()->getPost('access_time_start');
		$post_data['access_time_end'] = $this->getRequest()->getPost('access_time_end');
		$post_data['access_session'] = $this->getRequest()->getPost('access_session');
		$post_data['apps_id'] = $this->getRequest()->getPost('apps_id');
		
		$model = new Appsmgmt_Models_Useractivity();		
		$result = $model->readData($post_data);		
		
		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}
	
	function logoutAction()
	{
		$this->getResponse()->setHeader('Content-Type', 'application/json');
		$result = array('data'=>array(), 'total'=>0, 'success'=>false);
		
		$post_data['user_id'] = $this->getRequest()->getPost('user_id');
		
		$model = new Appsmgmt_Models_User();		
		$result = $model->logout($post_data);
		
		echo $result['success'];
		
		$this->_helper->viewRenderer->setNoRender(true);
	}
	
	function changepasswordAction()
	{
		$this->getResponse()->setHeader('Content-Type', 'application/json');
		$result = array('data'=>array(), 'total'=>0, 'success'=>false);
		
		$post_data['user_id'] = $this->getRequest()->getPost('user_id');
		$post_data['user_pass'] = $this->getRequest()->getPost('user_pass');
		
		$model = new Appsmgmt_Models_User();		
		$result = $model->changepassword($post_data);
		
		echo Zend_Json::encode($result);
		
		$this->_helper->viewRenderer->setNoRender(true);
	}
}