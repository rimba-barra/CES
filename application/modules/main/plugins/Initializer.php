<?php
class Main_Plugins_Initializer extends Zend_Controller_Plugin_Abstract
{	
	function routeStartup(Zend_Controller_Request_Abstract $request){}
	
	function routeShutdown(Zend_Controller_Request_Abstract $request)
	{
		$session = Zend_Controller_Action_HelperBroker::getStaticHelper('Session');	
		$front   = Zend_Controller_Front::getInstance();				

		$appBaseUrl = $request->getScheme().'://'.$request->getHttpHost().$request->getBaseUrl() . '/' ;
		$bootstrap  = $front->getParam('bootstrap');
		$config     = $bootstrap->getOptions();
		
		$req['module']     = $request->getModuleName();
		$req['controller'] = $request->getControllerName();
		$req['action']     = strtolower($request->getActionName());	

		// if(isset($_POST['is_login_portal'])){ //// jika bukan dari portal 
		// 	if($_POST['is_login_portal'] == 1){
		// 		$_SERVER['HTTP_REFERER'] = $appBaseUrl;
		// 		if(isset($_POST['session']) && isset($_POST['PHPSESSID']) && !$session->isLoggedIn()){
		// 			Zend_Session::setId($_POST['PHPSESSID']);

		// 			$ses = Zend_Json::decode($_POST['session']);
		// 			$session->setLogin($ses);
		// 			$session->setUserPassDefault($ses['pass_default']);

		// 			setcookie('uid', $ses['user_id'], 0, '/');

		// 			if($appBaseUrl != base64_decode($_POST['url_portal'])){
		// 				if(!isset($_COOKIE['url_module']) && isset($_POST['url_module'])){ setcookie('url_module', $_POST['url_module'], 0, '/'); }
		// 				if(!isset($_COOKIE['module_name']) && isset($_POST['module_name'])){ setcookie('module_name', $_POST['module_name'], 0, '/'); }
		// 				if(!isset($_COOKIE['url_portal']) && isset($_POST['url_portal'])){ setcookie('url_portal', $_POST['url_portal'], 0, '/'); }
		// 			}
		// 		}
		// 	}
		// }

		$req['isDirect'] = !isset($_SERVER['HTTP_REFERER']) || (isset($_SERVER['HTTP_REFERER']) && stripos($_SERVER['HTTP_REFERER'],$appBaseUrl)===false);	

		$isDefaultModule     = $req['module'] == $front->getDefaultModule();
		$isDefaultController = $req['controller'] == $front->getDefaultControllerName();

		$isAction['index']         = $isDefaultModule && $isDefaultController && $req['action']=='index';
		$isAction['initializer']   = $isDefaultModule && $isDefaultController && $req['action']=='initializer';
		$isAction['main']          = $isDefaultModule && $isDefaultController && $req['action']=='main';
		$isAction['login']         = $isDefaultModule && $isDefaultController && $req['action']=='login';		
		$isAction['loginprocess']  = $isDefaultModule && $isDefaultController && $req['action']=='loginprocess';
		$isAction['logoutprocess'] = $isDefaultModule && $isDefaultController && $req['action']=='logoutprocess';
		$isAction['extendsession'] = $isDefaultModule && $isDefaultController && $req['action']=='extendsession';
		
		$ua = $bootstrap->getResource('useragent');		
		if ($ua->getDevice()->getType()=='mobile')
		{
			$viewRenderer = Zend_Controller_Action_HelperBroker::getStaticHelper('viewRenderer');
			if (null === $viewRenderer->view) $viewRenderer->initView();
			$view = $viewRenderer->view; $view->setScriptPath(sprintf('%s/modules/%s/views/scripts.mobile', APPLICATION_PATH, $req['module']));
		}

		$session->init();
		$isLoggedIn = $session->isLoggedIn();
		
		if($req['module'] == 'erems' && $req['controller'] == 'bypass' && ($req['action'] == 'status' || $req['action'] == 'general')){
			goto pass;			
		}

		if($req['module'] == 'erems' && $req['action'] == 'printout'){
			goto pass;
		}

		// bypass masterpricelist dan reward for approval
		if(($req['controller'] == 'masterpricelist' || $req['controller'] == 'reward') && $req['module'] == 'erems' && $req['action'] == 'status'){ // Edited Erwin.S 20042021
			goto pass;			
		}
        if($req['controller'] == 'writeoffapvbypass' && $req['module'] == 'cashier' && $req['action'] == 'status'){
			goto pass;			
		}

		if (!$isAction['index'])
		{	
			if ($req['isDirect'])
			{ 

				if($req['module'] == 'erems' && $req['controller'] == 'approvalpricelist' && $req['action'] == 'status'){
					$exp   = explode('/', $_SERVER['REQUEST_URI']);
			        $indx  = count($exp) > 0 ? count($exp)-1 : 0;
			        $check = $exp[$indx];

			        $queryString = explode('&',base64_decode($check));

			        $param = array();
			        foreach ($queryString as $key => $value) {
			            list($k,$v) = explode('=',$value);
			            $param[$k] = $v;
			        }

					$module_menu = Zend_Json::encode(array(
		                'controller' => $param['modulesmenu'],
		                'data'       => array('pricelist_id' => $param['pricelist_id'])
		            ));

		            if(!isset($_COOKIE['url_module'])){ setcookie('url_module', base64_encode('main/index/home/apps/'.$param['moduleid'].'/code/'.$param['projectptid']), 0, '/'); }
		            if(!isset($_COOKIE['module_name'])){ setcookie('module_name', base64_encode($param['modulename']), 0, '/'); }
		            if(!isset($_COOKIE['module_menu'])){ setcookie('module_menu', base64_encode($module_menu), 0, '/'); }
				}
				else{
					$this->_response->setRedirect($appBaseUrl)->sendHeaders()->sendResponse(); exit; 
				}
			}

			if ($bootstrap->hasPluginResource('multidb'))
			{
				$dbResource = $bootstrap->getPluginResource('multidb');
				$db = $dbResource->getDb(isset($config['dbwebsec']['dbResourceName'])?$config['dbwebsec']['dbResourceName']:'dbmain');
			} 
			else 
			{
				$dbResource = $bootstrap->getPluginResource('db');
				$db = $dbResource->getDbAdapter();
			}

			if ($db) 
			{ 
				try 
				{ 
					$db->getConnection(); $db->closeConnection(); Zend_Registry::set('dbmain', $db);					
				} 
				catch (Exception $e)
				{ 
					Zend_Registry::set('dbmainnotconnected',1);
					if (!$isAction['login'])
					{ 
						//$session->set('msg', 'Database connection failed !');						
						if ($isLoggedIn || (!$isLoggedIn && !$isAction['login'] && !$isAction['initializer'])) { goto sendlogout; }
					}
				}			
			}	

			if ($isLoggedIn && !$isAction['login'] && !$isAction['loginprocess'] && !$isAction['logoutprocess'] && !$isAction['initializer'])
			{	
				if (!isset($_COOKIE['uid']) || !$session->isLoggedIn()){ $session->set('msg', 'Session has lost !');  goto sendlogout; }

				$currentpage['url_full'] = str_ireplace($appBaseUrl, '', $request->getRequestUri());
				$currentpage['url'] = $req['module'].'/'.$req['controller'].'/'.$req['action'];

				$auth = new Main_Models_Auth();
				
				$result = $auth->auth(($isDefaultModule||stripos($currentpage['url_full'],'.js')!==false?'':$currentpage['url']), $returndata);				
				if ($result!==true){  $session->set('msg', $result); goto sendlogout; }
					
				$auth->setUserActivity($currentpage['url_full']);
				
				$lastactivity = $returndata['last_activity_time'];
				
				setcookie('utime', $lastactivity, 0, '/');
				
				if (stripos($req['action'],'print')!==false)
				{
					$appsPublicPath = APPLICATION_PATH.'/../public/app/'.$this->getRequest()->getModuleName().'/';					
					$session->report_path = $appsPublicPath.'report/';
					$session->export_path = $appsPublicPath.'export/';					
				}

				if (!$isAction['extendsession'])
				{
					$session->currentpage = $currentpage;
					if (!$isDefaultModule)
					{
						if ($request->getPost('winId'))
						{
							$objects = $auth->getPageObjects($currentpage['url']);							
							$viewRenderer = Zend_Controller_Action_HelperBroker::getExistingHelper('ViewRenderer');
							$viewRenderer->initView();
							$view = $viewRenderer->view;
							$view->addHelperPath('main/view/helpers', 'Main_View_Helpers');
							$view->assign('winId', $request->getPost('winId')); 
						}
					}
				}
			}			
		}
		goto pass;

		sendlogout:

		if (!$isAction['logoutprocess'])
		{
			$this->_response->setRedirect($appBaseUrl.$front->getDefaultModule().'/'.$front->getDefaultControllerName().'/logoutprocess')->sendHeaders()->sendResponse(); 
			exit;
		}
		pass:
	}
	
	function dispatchLoopStartup(Zend_Controller_Request_Abstract $request){}	
	function preDispatch(Zend_Controller_Request_Abstract $request){}	
    function postDispatch(Zend_Controller_Request_Abstract $request){}	
	function dispatchLoopShutdown(){}
}