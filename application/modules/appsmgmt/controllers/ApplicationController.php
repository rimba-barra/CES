<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Appsmgmt_ApplicationController extends Zend_Controller_Action {

	//addby imaam on 20191017
	public function init() {
		$this->_helper->viewRenderer->setNoRender(true);
		$this->_helper->removeHelper('viewRenderer');
		Zend_Controller_Front::getInstance()->setParam('noViewRenderer', true);
		if (!isset($_SESSION['Ciputra'])) {
			die; //tanpa session STOP
		}
	}

	function appsreadAction() {
		ini_set("memory_limit", "-1");
		ini_set('max_execution_time', 0);
		$this->getResponse()->setHeader('Content-Type', 'application/json');
		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data['start'] = $this->getRequest()->getPost('start');
		$post_data['limit'] = $this->getRequest()->getPost('limit');

		$post_data['apps_id'] = $this->getRequest()->getPost('apps_id');
		$post_data['apps_name'] = $this->getRequest()->getPost('apps_name');

		$model = new Appsmgmt_Models_Application();
		$result = $model->readData($post_data);

		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function appscreateAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$model = new Appsmgmt_Models_Application();
		$result = $model->createData($post_data);

		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function appsupdateAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$model = new Appsmgmt_Models_Application();
		$result = $model->updateData($post_data);

		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function appsdeleteAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$model = new Appsmgmt_Models_Application();
		$result = $model->deleteData($post_data);

		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function controllerreadAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data['page'] = $this->getRequest()->getPost('page');
		$post_data['limit'] = $this->getRequest()->getPost('limit');

		$post_data['controller_id'] = $this->getRequest()->getPost('controller_id');
		$post_data['controller_name'] = $this->getRequest()->getPost('controller_name');
		$post_data['apps_id'] = $this->getRequest()->getPost('apps_id');

		$model = new Appsmgmt_Models_Controller();
		$result = $model->readData($post_data);

		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function controllercreateAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$model = new Appsmgmt_Models_Controller();
		$result = $model->createData($post_data);

		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function controllerupdateAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$model = new Appsmgmt_Models_Controller();
		$result = $model->updateData($post_data);

		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function controllerdeleteAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$model = new Appsmgmt_Models_Controller();
		$result = $model->deleteData($post_data);

		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function actionreadAction() {
		ini_set("memory_limit", "-1");
		ini_set('max_execution_time', 0);
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data['page'] = $this->getRequest()->getPost('page');
		$post_data['limit'] = $this->getRequest()->getPost('limit');

		$post_data['action_id'] = $this->getRequest()->getPost('action_id');
		$post_data['action_name'] = $this->getRequest()->getPost('action_name');
		$post_data['action_basename'] = $this->getRequest()->getPost('action_basename');
		$post_data['action_url'] = $this->getRequest()->getPost('action_url');
		$post_data['controller_id'] = $this->getRequest()->getPost('controller_id');
		$post_data['apps_id'] = $this->getRequest()->getPost('apps_id');

		$model = new Appsmgmt_Models_Action();
		$result = $model->readData($post_data);

		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function actioncreateAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$model = new Appsmgmt_Models_Action();
		$result = $model->createData($post_data);

		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function actionupdateAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$model = new Appsmgmt_Models_Action();
		$result = $model->updateData($post_data);

		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function actiondeleteAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$model = new Appsmgmt_Models_Action();
		$result = $model->deleteData($post_data);

		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function actionassignAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');
		$result = array('data' => array(), 'total' => 0, 'success' => false);
		$post_data = Zend_Json::decode($this->getRequest()->getPost('data_action'));
		$model = new Appsmgmt_Models_Action();
		$result = $model->assignToGroup($post_data, $this->getRequest()->getPost('group_id'));
		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function objectreadAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data['start'] = $this->getRequest()->getPost('start');
		$post_data['limit'] = $this->getRequest()->getPost('limit');

		$post_data['object_id'] = $this->getRequest()->getPost('object_id');
		$post_data['object_name'] = $this->getRequest()->getPost('object_name');
		$post_data['object_caption'] = $this->getRequest()->getPost('object_caption');
		$post_data['object_type_id'] = $this->getRequest()->getPost('object_type_id');
		$post_data['object_parent'] = $this->getRequest()->getPost('object_parent');
		$post_data['controller_id'] = $this->getRequest()->getPost('controller_id');
		$post_data['action_id'] = $this->getRequest()->getPost('action_id');
		$post_data['object_action'] = $this->getRequest()->getPost('object_action');
		$post_data['apps_id'] = $this->getRequest()->getPost('apps_id');

		$model = new Appsmgmt_Models_Object();
		$result = $model->readData($post_data);

		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function objectcreateAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$model = new Appsmgmt_Models_Object();
		$result = $model->createData($post_data);

		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function objectupdateAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$model = new Appsmgmt_Models_Object();
		$result = $model->updateData($post_data);

		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function objectdeleteAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$model = new Appsmgmt_Models_Object();
		$result = $model->deleteData($post_data);

		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function objecttreereadAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data['start'] = $this->getRequest()->getPost('start');
		$post_data['limit'] = $this->getRequest()->getPost('limit');

		$post_data['object_id'] = $this->getRequest()->getPost('object_id');
		$post_data['object_name'] = $this->getRequest()->getPost('object_name');
		$post_data['object_caption'] = $this->getRequest()->getPost('object_caption');
		$post_data['object_type_id'] = $this->getRequest()->getPost('object_type_id');
		$post_data['object_parent'] = $this->getRequest()->getPost('object_parent');
		$post_data['controller_id'] = $this->getRequest()->getPost('controller_id');
		$post_data['action_id'] = $this->getRequest()->getPost('action_id');
		$post_data['object_action'] = $this->getRequest()->getPost('object_action');
		$post_data['apps_id'] = $this->getRequest()->getPost('apps_id');

		$model = new Appsmgmt_Models_Object();
		$result = $model->readData($post_data);

		$tree = $this->buildTree($result['data'], 0, 'object');

		echo Zend_Json::encode($tree);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function menureadAction() {
		ini_set("memory_limit", "-1");
		ini_set('max_execution_time', 0);
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data['page'] = $this->getRequest()->getPost('page', 1);
		$post_data['limit'] = $this->getRequest()->getPost('limit');

		$post_data['menu_id'] = $this->getRequest()->getPost('menu_id');
		$post_data['menu_name'] = $this->getRequest()->getPost('menu_name');
		$post_data['menu_caption'] = $this->getRequest()->getPost('menu_caption');
		$post_data['menu_parent'] = $this->getRequest()->getPost('menu_parent');
		$post_data['controller_id'] = $this->getRequest()->getPost('controller_id');
		$post_data['widget'] = $this->getRequest()->getPost('widget');
		$post_data['apps_id'] = $this->getRequest()->getPost('apps_id');

		$model = new Appsmgmt_Models_Menu();
		$result = $model->readData($post_data);

		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function menucreateAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$model = new Appsmgmt_Models_Menu();
		$result = $model->createData($post_data);

		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function menuupdateAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$model = new Appsmgmt_Models_Menu();
		$result = $model->updateData($post_data);

		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function menudeleteAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$model = new Appsmgmt_Models_Menu();
		$result = $model->deleteData($post_data);

		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function menutreereadAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data['page'] = $this->getRequest()->getPost('page', 1);
		$post_data['limit'] = $this->getRequest()->getPost('limit', 0);

		$post_data['menu_id'] = $this->getRequest()->getPost('menu_id');
		$post_data['menu_name'] = $this->getRequest()->getPost('menu_name');
		$post_data['menu_caption'] = $this->getRequest()->getPost('menu_caption');
		$post_data['menu_parent'] = $this->getRequest()->getPost('menu_parent');
		$post_data['controller_id'] = $this->getRequest()->getPost('controller_id');
		$post_data['widget'] = $this->getRequest()->getPost('widget');
		$post_data['apps_id'] = $this->getRequest()->getPost('apps_id');

		$model = new Appsmgmt_Models_Menu();
		$result = $model->readData($post_data);

		$tree = $this->buildTree($result['data'], 0, 'menu');

		echo Zend_Json::encode($tree);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function groupreadAction() {
		ini_set("memory_limit", "-1");
		ini_set('max_execution_time', 0);
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data['page'] = $this->getRequest()->getPost('page');
		$post_data['limit'] = $this->getRequest()->getPost('limit');

		$post_data['group_id'] = $this->getRequest()->getPost('group_id');
		$post_data['group_name'] = $this->getRequest()->getPost('group_name');
		$post_data['apps_id'] = $this->getRequest()->getPost('apps_id');

		$model = new Appsmgmt_Models_Group();
		$result = $model->readData($post_data);

		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function groupcreateAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$model = new Appsmgmt_Models_Group();
		$result = $model->createData($post_data);

		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function groupupdateAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$model = new Appsmgmt_Models_Group();
		$result = $model->updateData($post_data);

		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function groupdeleteAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$model = new Appsmgmt_Models_Group();
		$result = $model->deleteData($post_data);

		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function dependencyreadAction() {
		ini_set("memory_limit", "-1");
		ini_set('max_execution_time', 0);
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data['start'] = $this->getRequest()->getPost('start');
		$post_data['limit'] = $this->getRequest()->getPost('limit');

		$post_data['apps_depend_id'] = $this->getRequest()->getPost('apps_depend_id');
		$post_data['apps_id'] = $this->getRequest()->getPost('apps_id');
		$post_data['depend_id'] = $this->getRequest()->getPost('depend_id');

		$model = new Appsmgmt_Models_Dependency();
		$result = $model->readData($post_data);

		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function dependencycreateAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$model = new Appsmgmt_Models_Dependency();
		$result = $model->createData($post_data);

		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function dependencyupdateAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$model = new Appsmgmt_Models_Dependency();
		$result = $model->updateData($post_data);

		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function dependencydeleteAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$model = new Appsmgmt_Models_Dependency();
		$result = $model->deleteData($post_data);

		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function objecttypereadAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data['start'] = $this->getRequest()->getPost('start');
		$post_data['limit'] = $this->getRequest()->getPost('limit');

		$post_data['object_type_id'] = $this->getRequest()->getPost('object_type_id');
		$post_data['object_type_name'] = $this->getRequest()->getPost('object_type_name');

		$model = new Appsmgmt_Models_Objecttype();
		$result = $model->readData($post_data);

		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function objecttypecreateAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$model = new Appsmgmt_Models_Objecttype();
		$result = $model->createData($post_data);

		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function objecttypeupdateAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$model = new Appsmgmt_Models_Objecttype();
		$result = $model->updateData($post_data);

		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	function objecttypedeleteAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$model = new Appsmgmt_Models_Objecttype();
		$result = $model->deleteData($post_data);

		echo Zend_Json::encode($result);
		$this->_helper->viewRenderer->setNoRender(true);
	}

	protected function buildTree(&$arr, $id = 0, $keystr = '') {
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
