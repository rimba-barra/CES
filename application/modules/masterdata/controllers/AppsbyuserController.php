<?php

class Masterdata_AppsbyuserController extends Zend_Controller_Action
{
	function readAction()
	{
		$this->getResponse()->setHeader('Content-Type', 'application/json');
		
		$result = array('data'=>array(), 'success'=>false);	
				
		$model_appsbyuser = new Masterdata_Models_Appsbyuser();		
		$result = $model_appsbyuser->appsbyuserRead();	
		
		echo Zend_Json::encode($result);	
		
		$this->_helper->viewRenderer->setNoRender(true);
	}
}