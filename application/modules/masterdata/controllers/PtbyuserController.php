<?php

class Masterdata_PtbyuserController extends Zend_Controller_Action
{
	function readAction()
	{
		$this->getResponse()->setHeader('Content-Type', 'application/json');
		
		$result = array('data'=>array(), 'success'=>false);	
				
		$post_data = $this->getRequest()->getParams();
		$model_ptbyuser = new Masterdata_Models_Ptbyuser();		
		$result = $model_ptbyuser->ptbyuserRead($post_data);	
		
		echo Zend_Json::encode($result);	
		
		$this->_helper->viewRenderer->setNoRender(true);
	}
}