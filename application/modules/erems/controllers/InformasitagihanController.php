<?php

class Erems_InformasitagihanController extends Zend_Controller_Action {

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
		$this->model   = new Erems_Models_Informasitagihan();
	}

	function readAction() {
		$req = $this->getRequest();
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		if ($req->getPost('mode') == 'asset') {
			$result = $this->getasset();
		}
		else if ($req->getPost('mode') == 'checkData') {
			$result = $this->checkData();
		} 
		else if ($req->getPost('mode') == 'gettagihanpurchaseletter' || $req->getPost('mode') == 'gettagihanschedule') {
			$result = $this->model->informasitagihandetailRead($req);
		} 
		else {
            $result = $this->model->informasitagihanRead($req);
        }
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function checkData(){
		$result = $this->model->checkDatainformasitagihanRead($this->getRequest());
    	return $result;
    }

    function getasset(){
		$printOut = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId())->printOutInformasiTagihan();
        return array(
			'print_type'    => $printOut['file_type'],
			'print_file'    => $printOut['file_name'],
        );
	}

	function createAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result    = array('data' => array(), 'total' => 0, 'success' => false);
		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
		$result    = $this->model->informasitagihanCreate($post_data);

		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function updateAction() {}

	function deleteAction() {}

    function printAction(){
    	$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

    	$req = $this->getRequest();

    	$hasil = $this->model->informasitagihanprintRead($req);

    	if($hasil['success'] == true){
    		$data = array();
    		foreach ($hasil['data'] as $key => $val) {
    			if(in_array($key, array('harga_total_jual', 'total_payment', 'total_remaining_balance', 'total_remaining_denda', 'total_amount', 'permil'))){
    				$val = Erems_Box_Tools::toCurrency($val);
    			}
    			$data[$key] = $val;
    		}

    		foreach ($hasil['param'] as $keyq => $valq) {
				$data[$valq['parametername']] = $valq['value'];
    		}

    		$arr_loop = array();
    		foreach ($hasil['schedule'] as $keys => $vals) {
    			foreach ($vals as $keyf => $valf) {
    				if(in_array($keyf, array('remaining_balance', 'remaining_denda'))){
    					$valf = Erems_Box_Tools::toCurrency($valf);
    				}
    				$data[$keyf . ($keys+1)] = $valf;

    				if($keys == 0){
    					$arr_loop[] = $keyf;
    				}
    			}
    		}

    		$word = new Erems_Box_Library_MyWordParser();
    		$word->useTable = 2;

    		$word->addLoopingField($arr_loop, count($hasil['schedule']));

			$fileSrc   = $req->getPost('doc_name') . '.' . $req->getPost('doc_type');
			$finalFile = 'InformasiTagihan_' . time() . '.' . $req->getPost('doc_type');

			$ok   = $word->printDoc($fileSrc, $finalFile, $data);

			if($ok){
				$result['success'] = true;
				$result['url']     = $word->getUrl();
			}
    	}
                
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
}
?>