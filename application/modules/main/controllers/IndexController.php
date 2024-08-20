<?php

class IndexController extends Zend_Controller_Action {

	protected $isLoggedIn = false;
	protected $appBaseUrl;
	protected $modelAuth;
	protected $GeneralModel;

	function init() {
		$this->isLoggedIn   = $this->_helper->session->isLoggedIn();
		$this->appBaseUrl   = $this->getRequest()->getScheme() . '://' . $this->getRequest()->getHttpHost() . $this->getRequest()->getBaseUrl() . '/';
		$this->GeneralModel = new Main_Models_Globalparam;
	}

	function indexAction() {
		$tRequest = $mode = $this->getRequest()->getParam('trequest');
		if (isset($tRequest)) {
			$fgpass = new Main_Models_ForgetPassword();
			$fgpass->updataPassword($this, $tRequest);
			//  $this->view->pesan = "We couldn't find a CES account associated with werwer.";
			//  $this->view->searchkey = "34535345";
			//  $this->_helper->viewRenderer('updatepassword');
		}
		//end add by tommy on 20180903

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

		$globalparam = $this->GeneralModel->getLabelOperational();
		$this->view->globalparam    = isset($globalparam[0][0]) ? $globalparam[0][0] : '';
		$this->view->apps_title     = $this->_helper->config->apps['title'];
		$this->view->apps_company   = $this->_helper->config->apps['company'];
		$this->view->apps_version   = $this->_helper->config->apps['version'];
		$this->view->apps_copyright = $this->_helper->config->apps['copyright'];
		$this->view->appBaseUrl     = $this->appBaseUrl;
	}

	function initializerAction() {
		$script = '';
		if ($this->isLoggedIn) {
			$btab_sessid = isset($_COOKIE['btab_sessid']) ? $_COOKIE['btab_sessid'] : time();
			$this->_helper->session->setActiveTab($btab_sessid);
			$script .= "btab_sessid='" . $btab_sessid . "';loggedRoutine();";
		} 
		else {
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

		$url_portal = isset($_COOKIE['url_portal']) ? base64_decode($_COOKIE['url_portal']) : '';

		// if(isset($_COOKIE['module_name'])){ //// add by erwin 
		// 	setcookie("module_name", "", time() - 3600, '/');
		// }

		// if(isset($_COOKIE['url_module'])){ //// add by erwin 
		// 	setcookie("url_module", "", time() - 3600, '/');
		// }

		// if(isset($_COOKIE['url_portal'])){ //// add by erwin 
		// 	setcookie("url_portal", "", time() - 3600, '/');
		// }

		// if(isset($_COOKIE['_CG'])){ //// add by erwin 
		// 	$domain = Main_Box_Tools::get_domain();
		// 	setcookie("_CG", "", time() - 3600, '/', $domain);
		// }
	}

	function forgetpasswordAction() {
		$mode = $this->getRequest()->getPost('mode');
		$this->view->searchkey = "";

		$fpassNameSpace = new Zend_Session_Namespace('Forgetpasswordses');

		if ($mode == "searchuser") {
			$authModel = new Main_Models_Auth();
			$userKey   = $this->getRequest()->getPost('searchkey');
			$hasil     = $authModel->getUserByKey($userKey);

			$emailList = array();
			if (is_array($hasil)) {
				if (count($hasil) > 0) {
					$count = 1;
					foreach ($hasil as $row) {
						$emailList[] = array(
							"teks"    => 'Email a link to ' . $row["user_email"],
							"nomor"   => $count,
							"email"   => $row["user_email"],
							"name"    => $row["name"],
							"user_id" => $row["user_id"]
						);
						$count++;
					}
				}
			}

			if (count($emailList) == 0) {
				$this->view->pesan     = "We couldn't find a CES account associated with " . $userKey . ".";
				$this->view->searchkey = $userKey;
				$this->_helper->viewRenderer('forgetpassword');
			} else {
				$fpassNameSpace->emailList = $emailList;
				$this->view->email_list = $emailList;
				$this->_helper->viewRenderer('forgetpasswordsearch');
			}
		} 
		else if ($mode == "sendemail") {
			$nomor       = $this->getRequest()->getPost('nomor');
			$tipeRequest = $this->getRequest()->getPost('tipe_request');

			$found  = FALSE;
			$pesan  = "";
			$email  = "";
			$name   = "";
			$userId = 0;
			foreach ($fpassNameSpace->emailList as $row) {
				if ($row["nomor"] == $nomor) {
					$found  = TRUE;
					$pesan  = $row["email"];
					$email  = $row["email"];
					$name   = $row["name"];
					$userId = $row["user_id"];
				}
			}

			$statusSentMail = FALSE;

			if (!$found) {
				$pesan = "Invalid request";
			} 
			else if ($found && $tipeRequest == "resend") {
				$this->view->pesan = "";
				$this->view->nomor = $nomor;
				$this->_helper->viewRenderer('forgetpasswordemailsent');
			} 
			else {
				/// generate token 
				$fp = new Main_Models_ForgetPassword();
				$generateToken = $fp->generateToken($userId);

				if ($generateToken["hasil"] == TRUE) {
					$dataSave          = $generateToken["data_save"][0];
					$urlChangePassword = $fp->getUrl($dataSave["code"], $dataSave["token_id"]);

					try {
						$message = '<html><body>';
						$message .= '<p><b>Hi ' . ucwords($name) . '</b></p>';
						$message .= '<p>Reset your password, and we\'ll get you on your way.</p>';
						$message .= '<p>To change your CES password, click <a href="' . $urlChangePassword . '">here</a> or paste the following link into your browser:</p>';
						$message .= '<p>' . $urlChangePassword . '</p>';
						$message .= '<p>This link will expire in 30 minutes, so be sure to use it right away.</p>';
						$message .= '<p><br/><br/>Thank you for using CES! <br/>';
						$message .= 'The CES Team</p>';
						$message .= "</body></html>";

						$mail = new Main_Models_Email();
						$mail->getMail()->setFrom('mis.kpjkt@ciputra.co.id');
						$mail->getMail()->setBodyHtml(nl2br($message));
						$mail->getMail()->addTo($email, $name);

						$mail->getMail()->setSubject('Request Forget Password');
						$mail->getMail()->send();

						$statusSentMail = TRUE;
					} 
					catch (Zend_Mail_Exception $e) {
						$statusSentMail = FALSE;
					}

					$this->view->pesan = !$statusSentMail ? "Something problem when sending email." : "";
					$this->view->nomor = $nomor;
					$this->_helper->viewRenderer('forgetpasswordemailsent');
				} 
				else {
					$this->view->pesan = $generateToken["pesan"];
					$this->_helper->viewRenderer('forgetpassword');
				}
			}
		} 
		else {
			unset($fpassNameSpace->emailList);

			$email = $this->getRequest()->getPost('email');
			$code  = $this->getRequest()->getPost('code');

			$mailsent = false;
			$msg      = '';
			if ($email) {
				$mailexists = true;
				if (!$mailexists) {
					$msg = 'Email not registered !';
				} 
				else {
					$mailsent = true;
					if (!$mailsent) {
						$msg = 'Unable to send email ! Please try again !';
					} 
					else {
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
	}

	function passwordAction() {
		$code  = $this->getRequest()->getPost('code');
		$email = $this->getRequest()->getPost('email');
		$pas1  = $this->getRequest()->getPost('pas1');
		$pas2  = $this->getRequest()->getPost('pas2');
		$msg   = '';

		if ($pas1) {
			$error = false;
			if (!$code || !$email || strcmp($pas1, $pas2)) {
				$error = true;
				$msg   = 'Data Error !';
			} 
		}

		$this->view->ldap          = (int) ($this->_helper->config->apps['login']['ldap']['active'] ? $this->_helper->config->apps['login']['ldap']['active'] : 0);
		$this->view->passminlength = $this->_helper->config->apps['password']['minlength'];
		$this->view->code          = $code;
		$this->view->email         = $email;
		$this->view->errmsg        = $msg;
	}

	## ADD BY RH 20220334 ##
	function forcelogoutAction() {
		if ($this->getRequest()->getPost('action') == "force") {
			$post_usr = trim($this->getRequest()->getPost('usr'));
			$post_pas = $this->getRequest()->getPost('pas');
			if ($post_usr && $post_pas) {
				$model_auth = new Main_Models_Auth();
				$result = $model_auth->login($post_usr, $post_pas, $userdata, "force");
				if (is_array($result)) {
					switch ($result[0]) {
						case 1:
							$this->view->pesan = 'Authentication failed!';
							break;
						case 2:
							$script = "";
							break;
						case 3:
							$script = '';
							break;
					}
				} else {
					$model_auth->forcelogout($userdata['user_id']);
					$this->_helper->session->set('msg', 'Force logout success !');
					$script = "loadBasePage({actionName:'login', loadermsg:'Logging you out, please wait ...'});";
					echo '<script type="text/javascript">' . $script . '</script>';
					$this->_helper->viewRenderer->setNoRender(true);
				}
			}
		}
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
					$user['user_id']       = $userdata['user_id'];
					$user['user_name']     = $userdata['user_name'];
					$user['user_fullname'] = $userdata['user_fullname'];
					$user['pass_enc']      = md5($post_pas);
					if ($user['pass_enc'] == '8b72fd0e67474217c9d6d945d6253524') {
						$user['pass_default'] = 1;
					} else {
						$user['pass_default'] = 0;
					}
					$user['ldap'] = (int) ($this->_helper->config->apps['login']['ldap']['active'] ? $this->_helper->config->apps['login']['ldap']['active'] : 0);
					$this->_helper->session->setLogin($user);
					$this->_helper->session->setUserPassDefault($user['pass_default']);

					setcookie('uid', $user['user_id'], 0, '/');

					// $domain = Main_Box_Tools::get_domain();
					// if($domain){
					// 	$cook = base64_encode(Zend_Json::encode(array(
					// 		'PHPSESSID'  => $this->_helper->session->getSessionId(),
					// 		'session'    => base64_encode(Zend_Json::encode($this->_helper->session->get('user'))),
					// 		'url_portal' => base64_encode($this->appBaseUrl)
					// 	)));
					// 	setcookie('_CG', $cook, 0, '/', $domain);
					// }
				}
			}
		}
		echo '<script type="text/javascript">' . $script . '</script>';
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function mainAction() {
		$this->view->apps_title                  = $this->_helper->config->apps['title'];
		$this->view->apps_copyright              = $this->_helper->config->apps['copyright'];
		$this->view->apps_version                = $this->_helper->config->apps['version'];
		$this->view->apps_timeout                = $this->_helper->config->apps['timeout'];
		$this->view->apps_timeoutwarning         = $this->_helper->config->apps['timeoutwarning'];
		$this->view->apps_timeoutwarninginterval = $this->_helper->config->apps['timeoutwarninginterval'];
		$this->view->apps_passminlength          = $this->_helper->config->apps['password']['minlength'];
		$this->view->apps_uid                    = $this->_helper->session->getUserId();
		$this->view->apps_loginname              = $this->_helper->session->getUserName();
		$this->view->apps_username               = $this->_helper->session->getUserFullName() ? $this->_helper->session->getUserFullName() : $this->view->apps_loginname;
		$this->view->apps_token                  = $this->_helper->session->getUserPassEnc();
		$this->view->apps_ldap                   = (int) $this->_helper->config->apps['login']['ldap']['active'];

		if ($this->_helper->session->isExists('module')) {
			$currentmodule['url'] = 'main/index/home/apps/' . $this->_helper->session->getCurrentModuleId() . ($this->_helper->session->getCurrentProjectPtId() ? '/code/' . $this->_helper->session->getCurrentProjectPtId() : '');
			$currentmodule['name'] = $this->_helper->session->getCurrentModuleName();
			$this->view->currentmodule = $currentmodule;
		}

		$model_auth = new Main_Models_Auth();
		$datamodule = $model_auth->getUserApps();

		$url_portal = isset($_COOKIE['url_portal']) && $_COOKIE['url_portal'] ? base64_decode($_COOKIE['url_portal']) : '';

		$modulemenu    = array();
		$modulemenuRaw = array();
		$modules       = array();
		$group         = array();
		$pt            = array();
		$project       = array();
		$projectpt     = array();

		foreach ($datamodule as $key => $val) {
			$module_id           = $val['apps_id'];
			$module_name         = $val['apps_basename'];
			$apps_name           = $val['apps_name'];
			$url_address         = $val['url_address'];

			//////// disetting kosong $url_address jika baseurl != urlportalnya
			if($url_address && $this->appBaseUrl == $url_address){
				$url_address = '';
			}

			$modulemenu[$module_id]['text'] = new Zend_Json_Expr('Ext.util.Format.ellipsis("' . strtoupper($apps_name) . '", 28)');
			if (strlen($apps_name) >= 33) {
				$modulemenu[$module_id]['tooltip'] = $apps_name;
			}
			$appIconPath = 'app/' . $module_name . '/resources/images/icons/_index.png';

			$modulemenu[$module_id]['icon'] = (is_file(APPLICATION_PATH . '/../public/' . $appIconPath) ? $appIconPath : 'app/main/images/icons/application.png');

			if (empty($val['is_login_thirdparty'])) {
				// $modulemenu[$module_id]['disabled'] = ($val['disabled'] || !is_dir(APPLICATION_PATH . '/modules/' . $module_name) || !is_dir(APPLICATION_PATH . '/../public/app/' . $module_name));
				$modulemenu[$module_id]['disabled'] = $val['disabled'];

				if (!$modulemenu[$module_id]['disabled']) {
					unset($modulemenu[$module_id]['disabled']);
					$mod_url = 'main/index/home/apps/' . $module_id;

					if ($val['projectpt_menu']) {
						$is_portal   = 0;
						$handler_url = $mod_url . '/code/' . $val['projectpt_id'];

						if($url_address){ //// jika ada url sidenya
							$jsn = base64_encode(Zend_Json::encode(array(
										'PHPSESSID'       => $this->_helper->session->getSessionId(),
										'session'         => $this->_helper->session->get('user'),
										'is_login_portal' => 1,
										'url_portal'      => ($url_portal ? $url_portal : $this->appBaseUrl),
										'url_module'      => $handler_url,
										'module_name'     => strtoupper($module_name),
									)));

							$is_portal   = 1;
							$handler_url = '
								loadportalURL({ 
									url : "'. $url_address . '", 
									key : "' . $jsn . '"
								});';

							$handler_module = new Zend_Json_Expr('function(){' . $handler_url . '}');

							$handler_module_projectpt = $handler_module;
						}
						else{
							$handler_module = new Zend_Json_Expr("function(){ 
								openModule({
									moduleName : this.tooltip||this.text, 
									url        : '" . $handler_url . "'
								});  
							}");

							$handler_module_projectpt = new Zend_Json_Expr("function(){
								openModule({
									moduleName : this.parentMenu.parentMenu.parentMenu.activeItem.tooltip||this.parentMenu.parentMenu.parentMenu.activeItem.text, 
									url        : '" . $handler_url . "'
								}); 
							}");
						}

						$modulemenu[$module_id]['handler'] = $handler_module;

						$modulemenu[$module_id]['menu'][$val['project_id']]['text'] = strtoupper($val['project_name']);
						$modulemenu[$module_id]['menu'][$val['project_id']]['icon'] = 'app/main/images/icons/char-dot-blue.png';

						$modulemenu[$module_id]['menu'][$val['project_id']]['menu'][$val['pt_id']]['text']    = strtoupper($val['pt_name']);
						$modulemenu[$module_id]['menu'][$val['project_id']]['menu'][$val['pt_id']]['icon']    = 'app/main/images/icons/char-dot-orange.png';
						$modulemenu[$module_id]['menu'][$val['project_id']]['menu'][$val['pt_id']]['handler'] = $handler_module_projectpt;

						$modulemenu[$module_id]['project'] = count($modulemenu[$module_id]['menu']);
						$modulemenu[$module_id]['pt']      = count($modulemenu[$module_id]['menu'][$val['project_id']]['menu']);

						$modulemenuRaw[] = [
							'module_name'              => strtoupper($module_name),
							'project_name'             => strtoupper($val['project_name']) . ' (' . strtoupper($val['pt_name']) . ')',
							'module_name_project_name' => strtoupper($module_name) . ' - ' . strtoupper($val['project_name']) . ' (' . strtoupper($val['pt_name']) . ')',
							'url'                      => $handler_url,
							'is_portal'                => $is_portal,
						];
					} 
					else {
						if($url_address){ //// jika ada url sidenya
							$handler_module = new Zend_Json_Expr("function(){ 
								loadportalURL({ 
									url : '" . $url_address . "', 
									key : btoa('" . Zend_Json::encode(array(
										'PHPSESSID'       => $this->_helper->session->getSessionId(),
										'session'         => $this->_helper->session->get('user'),
										'is_login_portal' => 1,
										'url_portal'      => ($url_portal ? $url_portal : $this->appBaseUrl),
										'url_module'      =>  'main/index/home/apps/' . $module_id,
										'module_name'     => strtoupper($module_name),
									)) . "'),
								}); 
							}");
						}
						else{
							$handler_module = new Zend_Json_Expr("function(){ 
								openModule({
									moduleName : this.tooltip||this.text, 
									url        : 'main/index/home/apps/" . $module_id . "'
								}); 
							}");
						}

						$modulemenu[$module_id]['handler'] = $handler_module;
					}
				}
			} 
			else {
				$modulemenu[$module_id]['handler'] = new Zend_Json_Expr("function(){ 
					loadOtherURL({
						moduleName : this.tooltip||this.text, 
						url        : '" . $url_address . "', 
						url_host   : '" . $this->_helper->config->apps['login']['thirdparty'] . "', 
						key        : '" . $this->sEncrypt($this->_helper->session->getUserId(), $this->_helper->session->getUserName(), '') . "'
					}); 
				}");
			}

			$modules[$module_id] = array(
				'name'   => $apps_name, 
				'script' => $module_name
			);

			$projectpt[$val['projectpt_id']][$module_id] = array(
				'project' => $val['project_id'], 
				'pt'      => $val['pt_id'], 
				'group'   => $val['group_id'], 
				'apps'    => $module_id, 
				'is_cpms' => $val['is_cpms']
			);
			
			$project[$val['project_id']] = $val['project_name'];
			$pt[$val['pt_id']]           = $val['pt_name'];
			$group[$val['group_id']]     = $val['group_name'];
		}

		$this->view->apps_userpassdefault = 0;
		if (true) {
			try {
				$this->view->apps_userpassdefault = isset($_SESSION["Ciputra"]["common"]["user"]["pass_default"]) ? intval($_SESSION["Ciputra"]["common"]["user"]["pass_default"]) : 0;
			} catch (Exception $e) {
				$this->view->apps_userpassdefault = 0;
			}
		}

		$this->_helper->session->set('modules', $modules);
		$this->_helper->session->set('group', $group);
		$this->_helper->session->set('pt', $pt);
		$this->_helper->session->set('project', $project);
		$this->_helper->session->set('projectpt', $projectpt);

		$this->view->modulemenu    = Zend_Json::encode(array_values($this->buildMainMenu($modulemenu)), false, array('enableJsonExprFinder' => true));
		$this->view->modulemenuRaw = Zend_Json::encode($modulemenuRaw, false, array('enableJsonExprFinder' => true));

		if(isset($_COOKIE['url_module']) && isset($_COOKIE['module_name'])){ //// add by erwin (auto loaded module)
			echo '
				<script type="text/javascript">
					var t_out = setTimeout(function () {
						currentmodule.url  = atob(decodeURIComponent(getCookie("url_module")));
						currentmodule.name = atob(decodeURIComponent(getCookie("module_name")));

						deleteCookie("url_module");
						deleteCookie("module_name");

						clearTimeout(t_out);
					}, 10);
				</script>';
		}
	}

	function tosAction() {}

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
		$this->_helper->session->remove('subholding_id');
		$this->_helper->session->remove('subholding_sub');

		$req['apps'] = $this->getRequest()->getParam('apps');
		$req['code'] = $this->getRequest()->getParam('code');

		$projectpt = $this->_helper->session->getProjectPtAndModule((int) $req['code'], (int) $req['apps']);

		$this->_helper->session->projectpt = $req['code'];
		$this->_helper->session->project   = $projectpt['project']['id'];
		$this->_helper->session->pt        = $projectpt['pt']['id'];
		$this->_helper->session->group     = $projectpt['group']['id'];
		$this->_helper->session->module    = $req['apps'];

		$info['apps_name']       = $this->_helper->session->getModuleName($req['apps']);
		$info['apps_module']     = $this->_helper->session->getModuleScript($req['apps']);
		$info['project_pt_name'] = $req['code'] ? $projectpt['project']['name'] . '<span style="color:#f9f90e;margin:0 10;font-size:1.2em;">&bullet;</span>' . $projectpt['pt']['name'] : '';
		$info['group_name']      = '[ ' . strtoupper($this->_helper->session->getCurrentGroupName()) . ' ]';
		$info['text_running']    = '';

		$this->_helper->session->modulebase = $info['apps_module'];

		try {
			$module_config = Zend_Registry::get($info['apps_module'] . '_config');
			$info['apps_version'] = isset($module_config['module']['version']) ? $module_config['module']['version'] : '';
		} 
		catch (Exception $e) {
			$info['apps_version'] = '';
		}

		$model_auth = new Main_Models_Auth();
		$depend = $model_auth->getAppsDepend($req['apps']);
		$appsdepend = '';

		$ctrlNotikasi = array();
		$ctrlNotikasiRes = array(); // hasil notifikasi 
		if (intval($req['apps']) == 5) { // khusus erems
			$menuInitialShow = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($projectpt["project"]["id"], $projectpt["pt"]["id"])->getListPopupInitial();
			$ctrlNotikasi    = isset($menuInitialShow[$projectpt['group']['id']]) ? $menuInitialShow[$projectpt['group']['id']] : [];
		}

		if (is_array($depend)) {
			foreach ($depend as $val) {
				if ($val['active']) {
					$appsdepend .= ucfirst($val['depend_basename']) . ":'app/" . $val['depend_basename'] . "',";
				}
			} $appsdepend = preg_replace('/(,)$/', '', $appsdepend);
		}

		$menudata = $model_auth->getUserMenu($req['apps'], $req['code']);

		$controllers = array();
		$optimizeLoader = 0;
		$dependController = [];
		if (intval($req['apps']) == 5) {
			$dependController = Zend_Json::encode(Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($projectpt["project"]["id"], $projectpt["pt"]["id"])->getDependControllerOptimize(), false, array('enableJsonExprFinder' => true));
//			$enableNotifikasi = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($projectpt["project"]["id"], $projectpt["pt"]["id"])->isUseNotifikasi();
//			if (!$enableNotifikasi) {
//				$ctrlNotikasi = array();
//			}

			$info['text_running'] = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($projectpt["project"]["id"], $projectpt["pt"]["id"])->getTextRunning();

			$spesialMenu = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($projectpt["project"]["id"], $projectpt["pt"]["id"])->getSpecialMenu();

			#### OPTIMIZE BY RH  20211209 #######
			if (count($menudata)) {
				$controllers[] = 'Init';
				$modelPopup = new Main_Models_Popup();
				$result = $modelPopup->popupData();
				foreach ($result['data'] as $key => $value) {
					$controllers[] = $value['controller'];
				}
//				$controllers = [
//					'Townplanning',
//					'Masteruploadlivestock',
//					'Masterproductcategory',
//					'Mastertype',
//					'Masterattribute',
//					'Masterblock',
//					'Masterposisi',
//					'Masterpurpose',
//					'Mastercluster',
//					'Masterside',
//					
//					
//					'Clusterfacilities',
//					'Projectfacilities',
//					'Facilitiestype',
//					'Masterkaryawan'
//				];
				$settingOptimizeErems = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($projectpt["project"]["id"], $projectpt["pt"]["id"])->getSettingOptimizeEREMS();
				$settingProjectId = ['all', $projectpt["project"]["id"]];
				$settingGroupName = ['all', strtoupper($this->_helper->session->getCurrentGroupName())];
				if (
						count(array_intersect($settingProjectId, $settingOptimizeErems['projectid'])) > 0 &&
						count(array_intersect($settingGroupName, $settingOptimizeErems['group_name'])) > 0
				) {
					$optimizeLoader = 1;
				}
//				echo count($menudata) - 260;
//				echo "<br/>";
//				echo count($menudata) - 270;
//				die;
//				for ($i = count($menudata) - 260; $i >= 0; $i--) {
				for ($i = count($menudata) - 1; $i >= 0; $i--) {
					$showMenu = 1;
					if (key_exists($menudata[$i]["menu_name"], $spesialMenu)) {
						if ($spesialMenu[$menudata[$i]["menu_name"]] == 0) {
							unset($menudata[$i]);
							$showMenu = 0;
						}
					}

					if ($showMenu == 1) {
						$val = $menudata[$i];
						$con = $val['controller_name'];
//						if ($i >= 260 && $i <= 270) {
//							echo "'".$con."',";
//							echo "<br/>";
//						}
						if ($con && is_file(APPLICATION_PATH . '/../public/app/' . $info['apps_module'] . '/controller/' . $con . '.js')) {
							if (
									count(array_intersect($settingProjectId, $settingOptimizeErems['projectid'])) == 0 ||
									count(array_intersect($settingGroupName, $settingOptimizeErems['group_name'])) == 0
							) {
								$controllers[] = $con;
//								echo "'" . $con . "',";
//								echo "<br/>";
							}
						}
					}

					// added by tommy 20180214
					if (in_array($con, $ctrlNotikasi)) {
						$ctrlNotikasiRes[] = $menudata[$i];
					}
					//end added by tommy 20180214
				}
				$menu = Zend_Json::encode($this->buildHomeMenu($menudata), false, array('enableJsonExprFinder' => true));
			} else {
				$menu = "{text:'--- No Menu ---', disabled:true}";
			}
//            if (count($menudata)) {
//                for ($i = count($menudata) - 1; $i >= 0; $i--) {
//                    $showMenu = 1;
//                    if (key_exists($menudata[$i]["menu_name"], $spesialMenu)) {
//                        if ($spesialMenu[$menudata[$i]["menu_name"]] == 0) {
//                            unset($menudata[$i]);
//                            $showMenu = 0;
//                        }
//                    }
//
//                    if ($showMenu == 1) {
//                        $val = $menudata[$i];
//                        $con = $val['controller_name'];
//                        if ($con && is_file(APPLICATION_PATH . '/../public/app/' . $info['apps_module'] . '/controller/' . $con . '.js')) {
//                            $controllers[] = $con;
//                        }
//                    }
//                    
//                    // added by tommy 20180214
//                    if(in_array($con, $ctrlNotikasi)){
//                        $ctrlNotikasiRes[] = $menudata[$i];
//                    }
//                    //end added by tommy 20180214
//                }
//                $menu = Zend_Json::encode($this->buildHomeMenu($menudata), false, array('enableJsonExprFinder' => true));
//            } else {
//                $menu = "{text:'--- No Menu ---', disabled:true}";
//            }
			#### END OPTIMIZE BY RH  20211209 #######
		} else {
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
		$this->view->optimizeLoader = $optimizeLoader;
		$this->view->dependControllerOptimize = $dependController;
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
		$this->view->currentprojectname = $this->_helper->session->getCurrentProjectName();
		$this->view->currentptname = $this->_helper->session->getCurrentPtName();
		$this->view->projectiscpms = $this->_helper->session->getProjectIsCPMS();

		/// validation added by tommy 2018/01/24
		if (intval($req['apps']) <> 5) { // erems tidak pakai modul ini
			//start added by tirtha 16 maret 2016, edited by ahmad riadi 10-10-2017
			$model_authdbapps = new Main_Models_Authdbapps();
			$rs_authdbapps = $model_authdbapps->getDbApps();
			if (count($rs_authdbapps)) {
				foreach ($rs_authdbapps as $key => $val) {
					if ($key == 0) {
						$app_tb = $this->_helper->session->getCurrentModuleScript();
						$project_tb = $this->_helper->session->getCurrentProjectId();
						$pt_tb = $this->_helper->session->getCurrentPtId();
						$sess_name = $app_tb . '_' . $project_tb . '_' . $pt_tb;

						if (!isset($this->session->common[$sess_name])) {
							$this->_helper->session->set($sess_name, $val['dbapps_year']);
						}
						if (!isset($this->session->common['selected_dbapps'])) {
							$this->_helper->session->set('selected_dbapps', $val['dbapps_dbname']);
							$this->_helper->session->modulebase = $val['dbapps_dbname'];
						}
					}
				}
				$this->view->setyearlistapp = $rs_authdbapps;
				$this->view->setyearapp = $this->_helper->session->getSelectedDbApp();
			}
			//end added by tirtha 16 maret 2016
		}


		// start added by ahmad riadi 31-01-2018
		$dataproject = $this->GeneralModel->getdataProjectbyID($this->_helper->session->getCurrentProjectId());
		if (!isset($this->session->common['subholding_id'])) {
			$this->_helper->session->set('subholding_id', $dataproject['subholding_id']);
			$this->_helper->session->set('subholding_sub', $dataproject['subholding_subname']);
			$this->view->currentsubholdingid = $dataproject['subholding_id'];
			$this->view->currentsubholdingsub = $dataproject['subholding_subname'];
		} else {
			$this->view->currentsubholdingid = 0;
			$this->view->currentsubholdingsub = null;
		}
		// end added by ahmad riadi 31-01-2018
		//added by tommy 20180214
		$this->view->appSpecialFunc = "";
		if (intval($req['apps']) == 5) { // khusus erems
			$this->view->appSpecialFunc = $this->ambilNotifikasiAplikasi($ctrlNotikasiRes);
		}
		//end added by tommy 20180214

		unset($appsdepend, $controllers, $menu, $objects, $actions, $info);
	}

	private function ambilNotifikasiAplikasi($ctrlNotikasiRes) {
		$notifikasiStr = "";
		$count = 0;
		foreach ($ctrlNotikasiRes as $menu) {
			if ($menu["controller_name"] != "") {
				$notifikasiStr .= "openPage({id:'notifikasiId" . $count . "', title:'" . $menu["menu_caption"] . "', icon: '" . $menu["menu_icon"] . "', iconCls: 'icon-notification', sender: this, controller: '" . $menu["controller_name"] . "', widget: '" . $menu["widget"] . "'});";
			}
			$count++;
		}
		return $notifikasiStr;
	}

	function selectedyearappAction() {
		$app     = $this->_helper->session->getCurrentModuleScript();
		$project = $this->_helper->session->getCurrentProjectId();
		$pt      = $this->_helper->session->getCurrentPtId();

		$year     = $this->getRequest()->getPost('year');
		$database = $this->getRequest()->getPost('database');

		$sess_name = $app . '_' . $project . '_' . $pt;

		$this->_helper->session->set($sess_name, $year);
		$this->_helper->session->set('selected_dbapps', $database);
		$this->_helper->session->modulebase = $database;

		exit;
	}

	function logoutprocessAction() {
		$isLoggedIn = $this->_helper->session->isLoggedIn();
		if ($isLoggedIn) {
			$model_auth = new Main_Models_Auth();
			$result = $model_auth->logout();
		}
		$this->_helper->session->setLogout();

		$url_portal   = isset($_COOKIE['url_portal']) ? base64_decode($_COOKIE['url_portal']) : '';
		$redirect_url = $this->appBaseUrl;

		if($url_portal != '' && $url_portal != $redirect_url){
			$redirect_url = $url_portal;
			if (!isset($_COOKIE['uid'])) {
				$this->_helper->session->destroy();
			}

			// if(isset($_COOKIE['module_name'])){ //// add by erwin 
			// 	setcookie("module_name", "", time() - 3600, '/');
			// }

			// if(isset($_COOKIE['url_module'])){ //// add by erwin 
			// 	setcookie("url_module", "", time() - 3600, '/');
			// }

			// if(isset($_COOKIE['url_portal'])){ //// add by erwin 
			// 	setcookie("url_portal", "", time() - 3600, '/');
			// }

			// if(isset($_COOKIE['_CG'])){ //// add by erwin 
			// 	$domain = Main_Box_Tools::get_domain();
			// 	setcookie("_CG", "", time() - 3600, '/', $domain);
			// }
		}

		echo '
			<script type="text/javascript">
				var redirect_url = "' . $redirect_url . '";

				const journal_formdatavalues = localStorage.getItem("journal_formdatavalues");
				const journal_griddetailstore = localStorage.getItem("journal_griddetailstore");
				const journal_localStoresubdetailcoa = localStorage.getItem("journal_localStoresubdetailcoa");

				localStorage.clear();
		
				localStorage.setItem("journal_formdatavalues",journal_formdatavalues);
				localStorage.setItem("journal_griddetailstore",journal_griddetailstore);
				localStorage.setItem("journal_localStoresubdetailcoa",journal_localStoresubdetailcoa); 

				normalleave=1;

				var t_out = setTimeout(function () {
					top.window.location.assign(redirect_url);
					clearTimeout(t_out);
				}, 10);
			</script>';

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
							if($this->_helper->session->getCurrentModuleId() == 5){
								if($a['controller_name'] == 'Approvalpricelistopen'){
									$jml_notif_approve_pricelist = Erems_Box_Tools::notifApprovalpricelist();
									if($jml_notif_approve_pricelist > 0){
										$b['text'] = $b['text'] . '&nbsp;&nbsp;&nbsp;<span style="color: #ffffff;background-color: #ff8d00;padding: 3px;border-radius: 50%; -moz-border-radius: 50%; -webkit-border-radius: 50%; font-size:10px; font-weight:bold;" id="item-notif-pricelistopen">' . $jml_notif_approve_pricelist . '</span>';
									}
								}
							}
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

	public function myViewRenderer($viewName) {
		$this->_helper->viewRenderer($viewName);
	}

	public function myViewNoRender() {
		$this->_helper->viewRenderer->setNoRender(true);
	}

	protected function sEncrypt($user_id, $user, $password) {
		$salt = date('dMY') . "*20nEVX\69t09@A4a>/Us78g";
		//$text = $salt . $user .'~#~'. $password;
		$text = $salt . $user_id . '~#~' . $user;
		$data = trim(base64_encode(mcrypt_encrypt(MCRYPT_RIJNDAEL_256, $salt, $text, MCRYPT_MODE_ECB, mcrypt_create_iv(mcrypt_get_iv_size(MCRYPT_RIJNDAEL_256, MCRYPT_MODE_ECB), MCRYPT_RAND))));
		return base64_encode($data);
	}

}