<?php

class IndexController extends Zend_Controller_Action {

    protected $isLoggedIn = false;
    protected $appBaseUrl;
    protected $modelAuth;

    function init() {
        $baseUrl = $this->getRequest()->getScheme() . '://' . $this->getRequest()->getHttpHost();
        $this->isLoggedIn = $this->_helper->session->isLoggedIn();
        $this->appBaseUrl = $baseUrl . $this->getRequest()->getBaseUrl() . '/';
    }

    function indexAction() {

        $http_user_agent = get_browser($_SERVER['HTTP_USER_AGENT']);
        $browserng = 0;
        $this->view->isChrome = strcasecmp('chrome', $http_user_agent->browser) === 0;
        $userAgentRestrictMode = $this->_helper->config->useragent['restrict']['mode'];
        if ($userAgentRestrictMode && $this->_helper->config->useragent['restrict']['active']) {
            $userAgent['allow'] = isset($this->_helper->config->useragent['allow']) ? $this->_helper->config->useragent['allow'] : null;
            $userAgent['block'] = isset($this->_helper->config->useragent['block']) ? $this->_helper->config->useragent['block'] : null;
            if (!is_array($userAgent[$userAgentRestrictMode]))
                return;
            $userAgentArray = $userAgent[$userAgentRestrictMode];
            foreach ($userAgentArray as $browser) {
                if (($userAgentRestrictMode == 'block' && strcasecmp($browser['browser'], $http_user_agent->browser) == 0) || ($userAgentRestrictMode == 'allow' && strcasecmp($browser['browser'], $http_user_agent->browser) != 0))
                    $browserng++;
            }
            if (($userAgentRestrictMode == 'block' && $browserng) || ($userAgentRestrictMode == 'allow' && $browserng >= count($userAgent['allow']))) {
                $this->view->validuseragent = is_array($userAgent['allow']) ? $userAgent['allow'] : $browserng;
                $this->_helper->session->destroy();
            }
        }
        $this->view->apps_title = $this->_helper->config->apps['title'];
        $this->view->apps_company = $this->_helper->config->apps['company'];
        $this->view->apps_version = $this->_helper->config->apps['version'];
        $this->view->apps_copyright = $this->_helper->config->apps['copyright'];
        $this->view->appBaseUrl = $this->appBaseUrl;
    }

    function initializerAction() {
        $script = '';
        if ($this->isLoggedIn) {
            $btab_sessid = isset($_COOKIE['btab_sessid']) ? $_COOKIE['btab_sessid'] : time();
            $this->_helper->session->setActiveTab($btab_sessid);
            $script .= "btab_sessid='" . $btab_sessid . "';loggedRoutine();";
        } else {
            $script .= 'unLoggedRoutine();';
        }
        echo '<script type="text/javascript">' . $script . '</script>';
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function loginAction() {
        if (!Zend_Registry::isRegistered('dbmainnotconnected')) {
            $this->view->dbmainconnected = 1;
        }
        if ($this->_helper->session->isExistsCommon('msg')) {
            $this->view->msg = $this->_helper->session->get('msg');
            $this->_helper->session->removeCommon('msg');
        }
        if (!isset($_COOKIE['uid'])) {
            $this->_helper->session->destroy();
        }
    }

    function forgetpasswordAction() {
        $email = $this->getRequest()->getPost('email');
        $code = $this->getRequest()->getPost('code');
        $mailsent = false;
        $msg = '';

        if ($email) {
            $mailexists = true;
            if (!$mailexists) {
                $msg = 'Email not registered !';
            } else {
                $mailsent = true;
                if (!$mailsent) {
                    $msg = 'Unable to send email ! Please try again !';
                } else {
                    if ($code) {
                        $msg = 'New code has been sent to your email !';
                    }
                }
            }
        }

        $this->view->email = $email;
        $this->view->mailsent = $mailsent;
        $this->view->msg = $msg;
    }

    function passwordAction() {
        $code = $this->getRequest()->getPost('code');
        $email = $this->getRequest()->getPost('email');
        $pas1 = $this->getRequest()->getPost('pas1');
        $pas2 = $this->getRequest()->getPost('pas2');
        $msg = '';

        if ($pas1) {
            $error = false;
            if (!$code || !$email || strcmp($pas1, $pas2)) {
                $error = true;
                $msg = 'Data Error !';
            } else {
                
            }
            if (!$error) {
                
            }
        }

        $this->view->ldap = (int) ($this->_helper->config->apps['login']['ldap']['active'] ? $this->_helper->config->apps['login']['ldap']['active'] : 0);
        $this->view->passminlength = $this->_helper->config->apps['password']['minlength'];
        $this->view->code = $code;
        $this->view->email = $email;
        $this->view->errmsg = $msg;
    }

    function loginprocessAction() {
        $post_usr = trim($this->getRequest()->getPost('usr'));
        $post_pas = $this->getRequest()->getPost('pas');
        $script = "loadBasePage({actionName:'initializer', loadermsg:'Logging you in, please wait ...'});";
        if ($this->isLoggedIn && isset($_COOKIE['uid'])) {
            if (strcmp($this->_helper->session->getUserName(), $post_usr) == 0) {
                if (strcmp($this->_helper->session->getUserPassEnc(), md5($post_pas)) != 0) {
                    $this->_helper->session->set('msg', 'Login failed !');
                    $script = "loadBasePage({actionName:'login', loadermsg:'Logging you in, please wait ...'});";
                }
            } else {
                $this->_helper->session->set('msg', 'Another user has already signed in from the same browser !');
                $script = "loadBasePage({actionName:'login', loadermsg:'Logging you in, please wait ...'});";
            }
        } else {
            if ($post_usr && $post_pas) {
                $model_auth = new Main_Models_Auth();
                $result = $model_auth->login($post_usr, $post_pas, $userdata);
                if (is_array($result)) {
                    switch ($result[0]) {
                        case 1:
                            $this->_helper->session->set('msg', $result[1]);
                            $script = "loadBasePage({actionName:'login', loadermsg:'Logging you in, please wait ...'});";
                            break;
                        case 2:
                            $script = "";
                            break;
                        case 3:
                            $script = '';
                            break;
                    }
                } else {
                    $user['user_id'] = $userdata['user_id'];
                    $user['user_name'] = $userdata['user_name'];
                    $user['user_fullname'] = $userdata['user_fullname'];
                    $user['pass_enc'] = md5($post_pas);
                    $user['ldap'] = (int) ($this->_helper->config->apps['login']['ldap']['active'] ? $this->_helper->config->apps['login']['ldap']['active'] : 0);
                    $this->_helper->session->setLogin($user);
                    setcookie('uid', $user['user_id'], 0, '/');
                }
            }
        }
        echo '<script type="text/javascript">' . $script . '</script>';
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function mainAction() {
        $this->view->apps_title = $this->_helper->config->apps['title'];
        $this->view->apps_copyright = $this->_helper->config->apps['copyright'];
        $this->view->apps_version = $this->_helper->config->apps['version'];
        $this->view->apps_timeout = $this->_helper->config->apps['timeout'];
        $this->view->apps_timeoutwarning = $this->_helper->config->apps['timeoutwarning'];
        $this->view->apps_timeoutwarninginterval = $this->_helper->config->apps['timeoutwarninginterval'];
        $this->view->apps_passminlength = $this->_helper->config->apps['password']['minlength'];
        $user_fullname = $this->_helper->session->getUserFullName();
        $this->view->apps_uid = $this->_helper->session->getUserId();
        $this->view->apps_loginname = $this->_helper->session->getUserName();
        $this->view->apps_username = $user_fullname ? $user_fullname : $this->view->apps_loginname;
        $this->view->apps_token = $this->_helper->session->getUserPassEnc();
        $this->view->apps_ldap = (int) $this->_helper->config->apps['login']['ldap']['active'];
        if ($this->_helper->session->isExists('module')) {
            $currentmodule['url'] = 'main/index/home/apps/' . $this->_helper->session->getCurrentModuleId() . ($this->_helper->session->getCurrentProjectPtId() ? '/code/' . $this->_helper->session->getCurrentProjectPtId() : '');
            $currentmodule['name'] = $this->_helper->session->getCurrentModuleName();
            $this->view->currentmodule = $currentmodule;
        }

        $model_auth = new Main_Models_Auth();
        $datamodule = $model_auth->getUserApps();

        $modulemenu = array();
        $modules = array();
        $group = array();
        $pt = array();
        $project = array();
        $projectpt = array();

        foreach ($datamodule as $key => $val) {
            $module_id = $val['apps_id'];
            $module_name = $val['apps_basename'];
            $apps_name = $val['apps_name'];
            $modulemenu[$module_id]['text'] = new Zend_Json_Expr('Ext.util.Format.ellipsis("' . strtoupper($apps_name) . '", 33)');
            if (strlen($apps_name) >= 33) {
                $modulemenu[$module_id]['tooltip'] = $apps_name;
            }
            $appIconPath = 'app/' . $module_name . '/resources/images/icons/_index.png';
            $modulemenu[$module_id]['icon'] = (is_file(APPLICATION_PATH . '/../public/' . $appIconPath) ? $appIconPath : 'app/main/images/icons/application.png');
            $modulemenu[$module_id]['disabled'] = ($val['disabled'] || !is_dir(APPLICATION_PATH . '/modules/' . $module_name) || !is_dir(APPLICATION_PATH . '/../public/app/' . $module_name));
            if (!$modulemenu[$module_id]['disabled']) {
                unset($modulemenu[$module_id]['disabled']);
                if ($val['projectpt_menu']) {
                    $modulemenu[$module_id]['handler'] = new Zend_Json_Expr("function(){ openModule({moduleName:this.tooltip||this.text, url:'main/index/home/apps/" . $module_id . "/code/" . $val['projectpt_id'] . "'});  }");
                    //$modulemenu[$module_id]['handler'] = new Zend_Json_Expr("function(){ openModule({moduleName:this.tooltip||this.text, url:'main/index/home/apps/".$module_id."/code/".$val['group_id']."'});  }");
                    $modulemenu[$module_id]['menu'][$val['project_id']]['text'] = strtoupper($val['project_name']);
                    $modulemenu[$module_id]['menu'][$val['project_id']]['icon'] = 'app/main/images/icons/char-dot-blue.png';
                    $modulemenu[$module_id]['menu'][$val['project_id']]['menu'][$val['pt_id']]['text'] = strtoupper($val['pt_name']);
                    $modulemenu[$module_id]['menu'][$val['project_id']]['menu'][$val['pt_id']]['icon'] = 'app/main/images/icons/char-dot-orange.png';
                    $modulemenu[$module_id]['menu'][$val['project_id']]['menu'][$val['pt_id']]['handler'] = new Zend_Json_Expr("function(){ openModule({moduleName:this.parentMenu.parentMenu.parentMenu.activeItem.tooltip||this.parentMenu.parentMenu.parentMenu.activeItem.text, url:'main/index/home/apps/" . $module_id . "/code/" . $val['projectpt_id'] . "'}); }");
                    $modulemenu[$module_id]['project'] = count($modulemenu[$module_id]['menu']);
                    $modulemenu[$module_id]['pt'] = count($modulemenu[$module_id]['menu'][$val['project_id']]['menu']);
                } else {
                    $modulemenu[$module_id]['handler'] = new Zend_Json_Expr("function(){ openModule({moduleName:this.tooltip||this.text, url:'main/index/home/apps/" . $module_id . "'}); }");
                }
            }

            //$_apps_[$module_id][$val['group_id']][$val['projectpt_id']]['project'] = $val['project_name'];
            //$_apps_[$module_id][$val['group_id']][$val['projectpt_id']]['pt'] = $val['pt_name'];

            $modules[$module_id] = array('name' => $apps_name, 'script' => $module_name);
                        
                        // mark by tommy on 20170117
			//$projectpt[$val['projectpt_id']] = array('project'=>$val['project_id'], 'pt'=>$val['pt_id'], 'group'=>$val['group_id'], 'apps'=>$module_id);
			
                        // add by tommy on 20170117
                        $projectpt[$val['projectpt_id']][$module_id] = array('project'=>$val['project_id'], 'pt'=>$val['pt_id'], 'group'=>$val['group_id'], 'apps'=>$module_id);
                         
                        
            $project[$val['project_id']] = $val['project_name'];
            $pt[$val['pt_id']] = $val['pt_name'];
            $group[$val['group_id']] = $val['group_name'];
        }

        //$this->_helper->session->set('_apps_', $_apps_);		
        $this->_helper->session->set('modules', $modules);
        $this->_helper->session->set('group', $group);
        $this->_helper->session->set('pt', $pt);
        $this->_helper->session->set('project', $project);
        $this->_helper->session->set('projectpt', $projectpt);

        $this->view->modulemenu = Zend_Json::encode(array_values($this->buildMainMenu($modulemenu)), false, array('enableJsonExprFinder' => true));
    }

    function tosAction() {
        
    }

    function extendsessionAction() {
        $model_auth = new Main_Models_Auth();
        $model_auth->setUserActivity($this->_helper->session->currentpage['url_full']);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function changepasswordAction() {
        $newpass = $this->getRequest()->getPost('pas2');
        $model_auth = new Main_Models_Auth();
        $result = $model_auth->changePassword($newpass);
        if ($result) {
            $newpass = md5($newpass);
            $this->_helper->session->setUserPassEnc($newpass);
            echo '{"success":true}';
        } else {
            echo '{"success":false}';
        }
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function homeAction() {
        $this->_helper->session->remove('projectpt');
        $this->_helper->session->remove('project');
        $this->_helper->session->remove('pt');
        $this->_helper->session->remove('group');
        $this->_helper->session->remove('module');
        $this->_helper->session->remove('modulebase');

        $req['apps'] = $this->getRequest()->getParam('apps');
        $req['code'] = $this->getRequest()->getParam('code');

		//$projectpt = $this->_helper->session->getProjectPt((int)$req['code']);
                $projectpt = $this->_helper->session->getProjectPtAndModule((int)$req['code'],(int)$req['apps']);

        $this->_helper->session->projectpt = $req['code'];
        //$this->_helper->session->groupid = $req['code'];
        $this->_helper->session->project = $projectpt['project']['id'];
        $this->_helper->session->pt = $projectpt['pt']['id'];
        $this->_helper->session->group = $projectpt['group']['id'];
        $this->_helper->session->module = $req['apps'];

        $info['apps_name'] = $this->_helper->session->getModuleName($req['apps']);
        $info['apps_module'] = $this->_helper->session->getModuleScript($req['apps']);
        $info['project_pt_name'] = $req['code'] ? $projectpt['project']['name'] . '<span style="color:#f9f90e;margin:0 10;font-size:1.2em;">&bullet;</span>' . $projectpt['pt']['name'] : '';
        $info['group_name'] = '[ ' . strtoupper($this->_helper->session->getCurrentGroupName()) . ' ]';

        $this->_helper->session->modulebase = $info['apps_module'];

        try {
            $module_config = Zend_Registry::get($info['apps_module'] . '_config');
            $info['apps_version'] = isset($module_config['module']['version']) ? $module_config['module']['version'] : '';
        } catch (Exception $e) {
            $info['apps_version'] = '';
        }
        $model_auth = new Main_Models_Auth();
        $depend = $model_auth->getAppsDepend($req['apps']);
        $appsdepend = '';
        if (is_array($depend)) {
            foreach ($depend as $val) {
                if ($val['active']) {
                    $appsdepend .= ucfirst($val['depend_basename']) . ":'app/" . $val['depend_basename'] . "',";
                }
            } $appsdepend = preg_replace('/(,)$/', '', $appsdepend);
        }

        $menudata = $model_auth->getUserMenu($req['apps'], $req['code']);

        $controllers = array();
        if (count($menudata)) {
            foreach ($menudata as $val) {
                $con = $val['controller_name'];
                if ($con && is_file(APPLICATION_PATH . '/../public/app/' . $info['apps_module'] . '/controller/' . $con . '.js')) {
                    $controllers[] = $con;
                }
            } $menu = Zend_Json::encode($this->buildHomeMenu($menudata), false, array('enableJsonExprFinder' => true));
        } else {
            $menu = "{text:'--- No Menu ---', disabled:true}";
        } 
        
       // $controllers = Zend_Json::encode(array_unique($controllers), false, array('enableJsonExprFinder' => true)); // marked 9 Feb 2016


        $controllers = Zend_Json::encode($controllers); // added 9 Feb 2016


        $actiondata = $model_auth->getUserAction($req['apps'], $req['code']);
        $actions = array();
        foreach ($actiondata as $arr) {
            if (!$arr['disabled']) {
                $actions[$arr['action_name']] = $arr['action_basename'];
            }
        }
        $actions = Zend_Json::encode($actions, false, array('enableJsonExprFinder' => true));

        $object = $model_auth->getUserObject($req['apps'], $req['code']);
        $objects = Zend_Json::encode($this->buildObjectsArray($object), false, array('enableJsonExprFinder' => true));

        $this->view->appsdepend = $appsdepend;
        $this->view->menu = $menu;
        $this->view->controllers = $controllers;
        $this->view->actions = $actions;
        $this->view->objects = $objects;

        $this->view->info = $info;
        $appIconPath = 'app/' . $info['apps_module'] . '/resources/images/icons/_index.png';
        $stylePath = 'app/' . $info['apps_module'] . '/resources/js-css/style.css';
        $styleIconPath = 'app/' . $info['apps_module'] . '/resources/js-css/style-icon.css';

        $this->view->currentmoduleicon = is_file(APPLICATION_PATH . '/../public/' . $appIconPath) ? $appIconPath : 'app/main/images/icons/application.png';
        $this->view->currentstyle = is_file(APPLICATION_PATH . '/../public/' . $stylePath) ? $stylePath : '';
        $this->view->currentstyleicon = is_file(APPLICATION_PATH . '/../public/' . $styleIconPath) ? $styleIconPath : '';
        $this->view->currentgroup = $this->_helper->session->getCurrentGroupId();
        $this->view->currentprojectpt = $this->_helper->session->getCurrentProjectPtId();
        $this->view->currentproject = $this->_helper->session->getCurrentProjectId();
        $this->view->currentpt = $this->_helper->session->getCurrentPtId();

        unset($appsdepend, $controllers, $menu, $objects, $actions, $info);
    }

    function logoutprocessAction() {
        $isLoggedIn = $this->_helper->session->isLoggedIn();
        if ($isLoggedIn) {
            $model_auth = new Main_Models_Auth();
            $result = $model_auth->logout();
        }
        $this->_helper->session->setLogout();
        //echo '<script type="text/javascript">loadInitializer();</script>';
        echo '<script id="logout" type="text/javascript">normalleave=1;top.window.location.reload(true);</script>';
        $this->_helper->viewRenderer->setNoRender(true);
    }

    protected function buildMainMenu($arr) {
        foreach ($arr as $key => $value) {
            if (is_array($value)) {
                if (isset($value['project'], $value['pt'])) {
                    if ($value['project'] < 2 && $value['pt'] < 2) {
                        unset($value['project'], $value['pt'], $value['menu']);
                    } else {
                        unset($value['handler']);
                    }
                }
                $arr[$key] = $this->buildMainMenu($value);
            }
        }
        if (isset($arr['menu'])) {
            $arr['menu'] = array_values($arr['menu']);
        }
        return $arr;
    }

    protected function buildHomeMenu(&$arr, $id = 0) {
        $result = array();
        foreach ($arr as $a) {
            $b = array();
            if ($id == $a['menu_parent']) {
                $b['text'] = $a['menu_caption'];
                if ($b['text'] == '-') {
                    $b['xtype'] = 'menuseparator';
                } else {
                    $b['itemId'] = $a['menu_name'];
                    if ($a['disabled']) {
                        $b['disabled'] = true;
                    }
                    if ($a['menu_icon']) {
                        $b['icon'] = $a['menu_icon'];
                    } else {
                        if ($a['menu_icon_cls']) {
                            $b['iconCls'] = $a['menu_icon_cls'];
                        }
                    }
                    $submenu = $this->buildHomeMenu($arr, $a['menu_id']);
                    if (count($submenu)) {
                        $b['menu']['items'] = $submenu;
                    } else {
                        $b['leaf'] = true;
                        if ($a['widget']) {
                            $b['handler'] = new Zend_Json_Expr("function(){openPage({id:this.itemId, title:this.text, icon:this.icon, iconCls:this.iconCls, sender:this, controller:'" . $a['controller_name'] . "', widget:'" . $a['widget'] . "', " . $a['menu_args'] . "});}");
                        }
                    }
                }
                $result[] = $b;
            }
        }
        return $result;
    }

    protected function buildObjectsArray(&$arr, $id = 0) {
        $result = array();
        foreach ($arr as $a) {
            $b = array();
            if ($id == $a['object_parent'] && !$a['disabled']) {
                $submenu = $this->buildObjectsArray($arr, $a['object_id']);
                if (count($submenu)) {
                    $b[$a['object_name']] = $submenu;
                } else {
                    $b = $a['object_name'];
                }
                $result[] = $b;
            }
        }
        return $result;
    }

}