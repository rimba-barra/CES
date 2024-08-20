<?php

class Main_Helpers_Session extends Zend_Controller_Action_Helper_Abstract
{
	protected $session;
	protected $sessid;
	
	function init()
	{
		$this->session = new Zend_Session_Namespace('Ciputra');
		$this->getActiveTab();				
	}
	
	function destroy()
	{
		@Zend_Session::destroy(true);
		unset($this->session);
	}
	
	
	function __set($name='', $value='')
	{		
		if ($name && $value && $this->sessid){ $this->session->{$this->sessid}[$name] = $value; }
	}
	
	
	function __get($name='')
	{		
		return ($name && $this->sessid && isset($this->session->{$this->sessid}[$name]) ? $this->session->{$this->sessid}[$name] : '');
	}
			
	function getSessionId()
	{
		return Zend_Session::getId();
	}
	
	function setActiveTab($sessid='')
	{
		if ($sessid){ $this->set('btab_sessid', $sessid); $this->session->{$sessid}['time'] = time(); }
		foreach($this->session as $key=>$array){ if (strcasecmp($key,'common')!=0){ if ((time()-(int)$array['time']>=30)){ unset($this->session->{$key}); } } }
	}
	
	/*
	function setBtabSessid($sessid='')
	{
		$this->sessid = $sessid;
	}
	*/

	function getAllSession(){
		return $this->session->common ? $this->session->common : false;
	}
	
	function getActiveTab()
	{
		$this->sessid = $this->getRequest()->getPost('btab_sessid');
		$this->sessid = $this->sessid ? $this->sessid : $this->sessid = $this->get('btab_sessid');
	}
	
	function isExists($var='')
	{
		return ($this->sessid && $var ? isset($this->session->{$this->sessid}[$var]) : false);
	}
	
	function isExistsCommon($var='')
	{
		return ($var ? isset($this->session->common[$var]) : false);
	}
	
	function remove($var='')
	{
		if ($var) { unset($this->session->{$this->sessid}[$var]); }
	}		
	
	function removeCommon($var='')
	{
		if ($var) unset($this->session->common[$var]);
	}
	
	function set($name='', $value='')
	{
		if ($name && $value){ $this->session->common[$name] = $value; }
	}
	
	function get($name)
	{
		return (isset($this->session->common) && $name && isset($this->session->common[$name]) ? $this->session->common[$name] : '');
	}
	
	function setLogin($user=array())
	{
		$this->set('user', $user);
	}
	
	function setLogout()
	{
		$this->removeCommon('user');
	}
	
	function isLoggedIn()
	{
		return (isset($this->session->common) && isset($this->session->common['user']) && is_array($this->session->common['user']) && count($this->session->common['user'])); 
	}
	
	function getUserId()
	{
		return $this->session->common['user']['user_id'];
	}
	
	function getUserName()
	{
		return $this->session->common['user']['user_name'];
	}
	
	function getUserPass()
	{
		return $this->session->common['user']['user_pass'];
	}
	
	function setUserPass($pass='')
	{
		if ($pass) { $this->session->common['user']['user_pass'] = $pass; }
	}
		
	function getUserFullName()
	{
		return $this->session->common['user']['user_fullname'];
	}
	
	function setUserFullName($name='')
	{
		if ($name) { $this->session->common['user']['user_fullname'] = $name; }
	}
	
	function getUserPassEnc()
	{
		return $this->session->common['user']['pass_enc'];
	}
	
	function setUserPassEnc($pass='')
	{
		if ($pass) { $this->session->common['user']['pass_enc'] = $pass; }
	}

	function getUserPassDefault()
	{
		return $this->session->common['user']['pass_default'];
	}
	
	function setUserPassDefault($pass=0)
	{
		if ($pass) { $this->session->common['user']['pass_default'] = $pass; }
	}
	
	function getProjectPt($projectptid=0)
	{
		$projectpt = $this->session->common['projectpt'][$projectptid];
		$projectid = $projectpt['project'];
		$ptid = $projectpt['pt'];
		$groupid = $projectpt['group'];
		$result['project']['id'] = $projectid;
		$result['project']['name'] = $this->getProjectName($projectid);
		$result['project']['is_cpms'] = $projectpt['is_cpms'];
		$result['pt']['id'] = $ptid;
		$result['pt']['name'] = $this->getPtName($ptid);
		$result['group']['id'] = $groupid;
		$result['group']['name'] = $this->getGroupName($groupid);
               // var_dump($result);
                
		return $result;
	}
        
        function getProjectPtAndModule($projectptid=0,$moduleId=0)
	{
                
        
		$projectpt = $this->session->common['projectpt'][$projectptid][$moduleId];
		$projectid = $projectpt['project'];
		$ptid = $projectpt['pt'];
		$groupid = $projectpt['group'];
		$result['project']['id'] = $projectid;
		$result['project']['name'] = $this->getProjectName($projectid);
		$result['project']['is_cpms'] = $projectpt['is_cpms'];
		$result['pt']['id'] = $ptid;
		$result['pt']['name'] = $this->getPtName($ptid);
		$result['group']['id'] = $groupid;
		$result['group']['name'] = $this->getGroupName($groupid);   
               // var_dump($result);
                
		return $result;
	}
	
	function getProjectName($projectid=0)
	{
		if ($projectid) { return $this->session->common['project'][$projectid]; }
	}
	
	function getPtName($ptid=0)
	{
		if ($ptid) { return $this->session->common['pt'][$ptid]; }
	}
	
	function getGroupName($groupid=0)
	{
		if ($groupid) { return $this->session->common['group'][$groupid]; }
	}
	
	function getModuleName($moduleid=0)
	{
		if ($moduleid) { return $this->session->common['modules'][$moduleid]['name']; }
	}
	
	function getModuleScript($moduleid=0)
	{
		if ($moduleid) { return $this->session->common['modules'][$moduleid]['script']; }
	}
	
	function getCurrentProjectPtId()
	{
		return isset($this->session->{$this->sessid}['projectpt']) ? $this->session->{$this->sessid}['projectpt'] : 0;
	}
	
	function getCurrentProjectPt()
	{
		return $this->getProjectPt($this->getCurrentProjectPtId());
	}
	
	function getCurrentProjectId()
	{
		return isset($this->session->{$this->sessid}['project']) ? $this->session->{$this->sessid}['project'] : 0;
	}
	
	function getCurrentProjectName()
	{
		return $this->getProjectName($this->getCurrentProjectId());
	}
	
	function getCurrentPtId()
	{
		return isset($this->session->{$this->sessid}['pt']) ? $this->session->{$this->sessid}['pt'] : 0;
	}
	
	function getCurrentPtName()
	{
		return $this->getPtName($this->getCurrentPtId());
	}
	
	function getCurrentGroupId()
	{
		return isset($this->session->{$this->sessid}['group']) ? $this->session->{$this->sessid}['group'] : 0;
	}
	
	function getCurrentGroupName()
	{
		return $this->getGroupName($this->getCurrentGroupId());
	}
	
	function getCurrentModuleId()
	{
		return isset($this->session->{$this->sessid}['module']) ? $this->session->{$this->sessid}['module'] : 0;
	}
	
	function getCurrentModuleName()
	{
		return $this->getModuleName($this->getCurrentModuleId());
	}
	
	function getCurrentModuleScript()
	{
		return $this->getModuleScript($this->getCurrentModuleId());
	}	
	 function getSelectedDbApp()
	{
		return $this->session->common['selected_dbapps'];
	}

	/* start added by ahmad riadi */
	function getSelectedYearApp()
	{
		$app = $this->getCurrentModuleScript();
		$project = $this->getCurrentProjectId();
		$pt = $this->getCurrentPtId();
		
		$sess_name = $app.'_'.$project.'_'.$pt;
		
		return $this->session->common[$sess_name];
	}
         /* end added by ahmad riadi */

            /* start added by ahmad riadi 31-01-2018 */
    function getcurrentSubholdingid()
	{
		return isset($this->session->common['subholding_id']) ? intval($this->session->common['subholding_id']) : 0;
	}
	function getcurrentSubholdingsub()
	{
		return isset($this->session->common['subholding_sub']) ? strval($this->session->common['subholding_sub']) : null;
	}
        /* end added by ahmad riadi 31-01-2018 */

	function getProjectIsCPMS(){
		$projectptmodule = $this->getProjectPtAndModule($this->getCurrentProjectPtId(), $this->getCurrentModuleId());
		return $projectptmodule['project']['is_cpms'];
	}       
}