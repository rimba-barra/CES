<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Appsmgmt_AccessrightController extends Zend_Controller_Action {

	//addby imaam on 20191017
	public function init() {
		$this->_helper->viewRenderer->setNoRender(true);
		$this->_helper->removeHelper('viewRenderer');
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
		Zend_Controller_Front::getInstance()->setParam('noViewRenderer', true);
		if (!isset($_SESSION['Ciputra'])) {
			die; //tanpa session STOP
		}
	}

	function groupactionreadAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');
		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data['page'] = $this->getRequest()->getPost('page');
		$post_data['limit'] = $this->getRequest()->getPost('limit');

		$post_data['group_action_id'] = $this->getRequest()->getPost('group_action_id');
		$post_data['group_id'] = $this->getRequest()->getPost('group_id');
		$post_data['action_id'] = $this->getRequest()->getPost('action_id');

		$model = new Appsmgmt_Models_Groupaction();
		$result = $model->readData($post_data);

		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function groupactioncreateAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');
		$result = array('data' => array(), 'total' => 0, 'success' => false);
		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
		$post_data['mode_read'] = $this->getRequest()->getPost('mode_read');
		$post_data['group1'] = $this->getRequest()->getPost('group1');
		$post_data['group2'] = $this->getRequest()->getPost('group2');
		$model = new Appsmgmt_Models_Groupaction();

		if ($post_data['mode_read'] == "copyaction") {
			$result = $model->CopyData($post_data);
		} elseif ($post_data['mode_read'] == "copymenu") {
			$result = $model->CopyMenuData($post_data);
		} else {

			$result = $model->createData($post_data);
		}

		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function groupactionupdateAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$model = new Appsmgmt_Models_Groupaction();
		$result = $model->updateData($post_data);

		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function groupactiondeleteAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$model = new Appsmgmt_Models_Groupaction();
		$result = $model->deleteData($post_data);

		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function groupmenureadAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');
		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data['page'] = $this->getRequest()->getPost('page');
		$post_data['limit'] = $this->getRequest()->getPost('limit');

		$post_data['group_menu_id'] = $this->getRequest()->getPost('group_menu_id');
		$post_data['group_id'] = $this->getRequest()->getPost('group_id');
		$post_data['menu_id'] = $this->getRequest()->getPost('menu_id');

		$model = new Appsmgmt_Models_Groupmenu();
		$result = $model->readData($post_data);

		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function groupmenucreateAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$model = new Appsmgmt_Models_Groupmenu();
		$result = $model->createData($post_data);

		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function groupmenuupdateAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$model = new Appsmgmt_Models_Groupmenu();
		$result = $model->updateData($post_data);

		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function groupmenudeleteAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$model = new Appsmgmt_Models_Groupmenu();
		$result = $model->deleteData($post_data);

		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function groupmenutreereadAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data['page'] = $this->getRequest()->getPost('page');
		$post_data['limit'] = $this->getRequest()->getPost('limit');

		$post_data['group_menu_id'] = $this->getRequest()->getPost('group_menu_id');
		$post_data['group_id'] = $this->getRequest()->getPost('group_id');
		$post_data['menu_id'] = $this->getRequest()->getPost('menu_id');

		$model = new Appsmgmt_Models_Groupmenu();
		$result = $model->readData($post_data);

		$tree = $this->buildTree($result['data'], 0, 'menu');

		echo Zend_Json::encode($tree);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function groupuserreadAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');
		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data['page'] = $this->getRequest()->getPost('page');
		$post_data['limit'] = $this->getRequest()->getPost('limit');

		$post_data['group_user_id'] = $this->getRequest()->getPost('group_user_id');
		$post_data['group_id'] = $this->getRequest()->getPost('group_id');
		$post_data['user_id'] = $this->getRequest()->getPost('user_id');
		$post_data['projectpt_id'] = $this->getRequest()->getPost('projectpt_id');

		$model = new Appsmgmt_Models_Groupuser();
		$result = $model->readData($post_data);

		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function groupusercreateAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$model = new Appsmgmt_Models_Groupuser();
		$result = $model->createData($post_data);
		$apps = $model->findApps($post_data['group_id']);
		
		if ($result['success'] && $apps['apps_basename'] == "pim") { ## SYNC KE PIM ##
			$user = $model->findUser($this->getRequest()->getPost('user_id'));
			if (trim($user['user_email']) != "") {
				$conf = APPLICATION_PATH . '/modules/main/configs/main.ini';
				$config = parse_ini_file($conf);

				$bodyAuth = [
					'email' => $config['pim.email'],
					'password' => $config['pim.password'],
					'device_name' => $config['pim.device_name']
				];

				$headerAuth[] = "Accept: application/json";
				$curl = curl_init();
				$url = $config['pim.url'] . 'api/tokens/create';
				curl_setopt_array($curl, array(
					CURLOPT_URL => $url,
					CURLOPT_RETURNTRANSFER => true,
					CURLOPT_ENCODING => '',
					CURLOPT_MAXREDIRS => 10,
					CURLOPT_TIMEOUT => 0,
					CURLOPT_FOLLOWLOCATION => true,
					CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
					CURLOPT_CUSTOMREQUEST => 'POST',
					CURLOPT_POSTFIELDS => $bodyAuth,
					CURLOPT_SSL_VERIFYPEER => false,
					CURLOPT_HTTPHEADER => $headerAuth
				));

				$response = curl_exec($curl);
				curl_close($curl);
				$log = $model->createLog(['url' => $url, 'method' => 'POST', 'send' => 'xxx', 'response' => $response]);

				$resArr = json_decode($response, TRUE);
				if (@$resArr['result'] == 1) {

					$token = $resArr['data']['access_token'];
					$postData = [
						'ces_user_id' => $this->getRequest()->getPost('user_id'),
						'user_login' => $user['user_name'],
						'name' => $user['user_fullname'],
						'password' => '$2y$10$vGOm.yKTtJzrsqs1wjrj3OQ0cqlMItGhdUmgUZ0U33XbBswHn0zlO',
						'email' => $user['user_email'],
						'created_by' => $this->session->getUserId()
					];

					$curl = curl_init();
					$url = $config['pim.url'] . 'api/user/create';
					curl_setopt_array($curl, array(
						CURLOPT_URL => $url,
						CURLOPT_RETURNTRANSFER => true,
						CURLOPT_ENCODING => '',
						CURLOPT_MAXREDIRS => 10,
						CURLOPT_TIMEOUT => 0,
						CURLOPT_FOLLOWLOCATION => true,
						CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
						CURLOPT_CUSTOMREQUEST => 'POST',
						CURLOPT_POSTFIELDS => $postData,
						CURLOPT_HTTPHEADER => array(
							'Accept: application/json',
							'Authorization: Bearer ' . $token
						),
					));

					$response = curl_exec($curl);
					curl_error($curl);

					curl_close($curl);
					$model->createLog(['url' => $url, 'method' => 'POST', 'send' => json_encode($postData), 'response' => $response]);
				}
			}
		}
		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function groupuserupdateAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$model = new Appsmgmt_Models_Groupuser();
		$result = $model->updateData($post_data);

		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function groupuserdeleteAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$model = new Appsmgmt_Models_Groupuser();
		$result = $model->deleteData($post_data);

		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function groupobjectreadAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');
		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data['start'] = $this->getRequest()->getPost('start');
		$post_data['limit'] = $this->getRequest()->getPost('limit');

		$post_data['group_object_id'] = $this->getRequest()->getPost('group_object_id');
		$post_data['group_id'] = $this->getRequest()->getPost('group_id');
		$post_data['object_id'] = $this->getRequest()->getPost('object_id');

		$model = new Appsmgmt_Models_Groupobject();
		$result = $model->readData($post_data);

		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function groupobjectcreateAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$model = new Appsmgmt_Models_Groupobject();
		$result = $model->createData($post_data);

		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function groupobjectupdateAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$model = new Appsmgmt_Models_Groupobject();
		$result = $model->updateData($post_data);

		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function groupobjectdeleteAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$model = new Appsmgmt_Models_Groupobject();
		$result = $model->deleteData($post_data);

		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	protected function buildTree(&$arr, $id = 0, $keystr = '') {
		ini_set("memory_limit", "-1");
		ini_set('max_execution_time', 0);

		$result = array();
		foreach ($arr as $a) {
			$a['iconCls'] = 'tree-no-icon';
			$key = $keystr . '_parent';
			if ($id == $a[$key]) {
				$subtree = $this->buildTree($arr, $a[$keystr . '_id'], $keystr);
				if (count($subtree)) {
					$a['expanded'] = true;
					$a['children'] = $subtree;
				} else {
					$a['leaf'] = true;
				}
				$result[] = $a;
			}
		}
		return $result;
	}

}
