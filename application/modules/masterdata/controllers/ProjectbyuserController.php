<?php

class Masterdata_ProjectbyuserController extends Zend_Controller_Action
{
	function readAction()
	{
		$this->getResponse()->setHeader('Content-Type', 'application/json');
		
		$result = array('data'=>array(), 'success'=>false);	
				
		$post_data = $this->getRequest()->getParams();
		$model_projectbyuser = new Masterdata_Models_Projectbyuser();		
		$result = $model_projectbyuser->projectbyuserRead($post_data);	

		echo Zend_Json::encode($result);	
		
		$this->_helper->viewRenderer->setNoRender(true);
	}
}