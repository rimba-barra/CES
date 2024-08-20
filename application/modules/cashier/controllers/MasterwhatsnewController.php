<?php

class Cashier_MasterwhatsnewController extends Zend_Controller_Action
{
	protected $model;
	protected $result = array('total'=>0, 'success'=>false, 'data'=>array());
	
	function init()
	{
		$this->getResponse()->setHeader('Content-Type', 'application/json');
		$this->model = new Cashier_Models_Masterwhatsnew();
	}
		
	function readAction()
	{
		$this->result = $this->model->dataRead($this->getRequest()->getPost());
		echo Zend_Json::encode($this->result);
		$this->_helper->viewRenderer->setNoRender(true);		
	}
	
	function createAction()
	{	
		if(isset($_FILES['image-upload'])){
			$this->uploadProccess();
			die();
		}
		$this->result = $this->model->dataCreate($this->getRequest()->getPost());
		echo Zend_Json::encode($this->result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function uploadProccess() {

        $upload = new Zend_File_Transfer_Adapter_Http();
		
		$files = $upload->getFileInfo('image-upload');
		
		foreach ($files as $file => $info) 
		{
			$filename = $info['name'];
			if($filename)
			{
				$filetype = explode('.',$filename);
				$fileallowed = array('jpg','jpeg','png','tif','gif','JPG','JPEG','PNG','TIF','GIF');
				$new_file_name = preg_replace('/[\s]|[^A-Za-z0-9_]/','',$filetype[0]);
				$time = explode('.',microtime());
				$postfix = substr($time[1],0,5);
				$imageName = "whatsnew_".$new_file_name."_".$postfix.".".$filetype[1];
				if(!(in_array($filetype[1],$fileallowed)))
				{	
					$msg = 'File type must images';
					$imageName = '';
					$success = false;
				}	
				else 
				{
					$upload->addFilter('Rename', array('target' => APPLICATION_PATH . '/../public/app/cashier/uploads/whatsnew/' . $imageName, 'overwrite' => true));
					$success = false;
					$msg = '';
			
					try {
						$upload->receive();
						$success = true;
						$msg = 'success';
					} catch (Zend_File_Transfer_Exception $e) {
						$msg = $e->message();
						$imageName = '';
						$success = false;
					}
				}
			}
		}
		
		$this->getResponse()->setHeader('Content-Type', 'text/html; charset=utf-8');
		$result = array('data' => array(), 'total' => 0, 'success' => $success, 'msg' => $msg, 'imageName' => $imageName);
		echo Zend_Json::encode($result);
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
		$report_fn = 'report_master_masterdownline.mrt';
		echo $report_fn && (file_exists($this->_helper->session->report_path.$report_fn) || file_exists($this->_helper->session->report_path.$this->_helper->session->getCurrentProjectId().'-'.$this->_helper->session->getCurrentPtId().'/'.$report_fn)) ? $report_fn : 'ERROR';
		$this->_helper->viewRenderer->setNoRender(true);		
	}
}