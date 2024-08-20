<?php

class Erems_NetpresentvalueController extends Zend_Controller_Action {

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}

	function readAction() {
		$req = $this->getRequest();
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$model = new Erems_Models_Netpresentvalue();
		if ($req->getPost('mode') == 'asset') {
			$result = $this->getasset();
		}
		else if ($req->getPost('mode') == 'purchaseletterlist') {
			$result = $model->purchaseletterlistRead($req);
		} 
        else if (in_array($req->getPost('mode'), array('getschedule', 'getdetailstandard', 'getdetailrealisasi'))) {
        	$rq = array();
        	foreach ($req->getPost() as $key => $val) {
        		$rq[$key] = $val;
        	}
        	$result = $model->netpresentvaluedetailRead($rq);
        }
		else {
            $result = $model->netpresentvalueRead($req);
        }
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function getasset(){
    	$model = new Erems_Models_Netpresentvalue();

		$printOutNPV = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId())->printOutNPV();

        return array(
			'user_id'       => $this->session->getUserId(),
			'discount_year' => $model->get_discount_rate_year(),
			'print_type'    => $printOutNPV['file_type'],
			'print_file'    => $printOutNPV['file_name'],
        );
	}

	function createAction() {

		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
		$model = new Erems_Models_Netpresentvalue();
		$result = $model->netpresentvalueCreate($post_data);

		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function updateAction() {
	}

	function deleteAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$model = new Erems_Models_Netpresentvalue();
		$result = $model->netpresentvalueDelete($post_data);
		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

    function printAction(){
    	$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

    	$req = $this->getRequest();

		$npv_id   = $req->getPost('npv_id');
		$doc_name = $req->getPost('doc_name');
		$doc_type = $req->getPost('doc_type');

		$model = new Erems_Models_Netpresentvalue();

		$rq = array();
    	foreach ($req->getPost() as $key => $val) {
    		$rq[$key] = $val;
    	}

		$rs = $model->netpresentvaluedetailRead($rq);
		if($rs['success'] == true){
			$word = new Erems_Box_Library_MyWordParser();

			$rq['mode'] = 'getdetailstandard';
			$rss = $model->netpresentvaluedetailRead($rq);
			
			$rq['mode'] = 'getdetailrealisasi';
			$rsr = $model->netpresentvaluedetailRead($rq);

			$data = array();

			$data['npv_no']           = $rs['data'][0]['npv_no'];
			$data['cluster']          = $rs['data'][0]['cluster'];
			$data['unit_number']      = $rs['data'][0]['unit_number'];
			$data['customer_name']    = $rs['data'][0]['customer_name'];
			$data['npv_nilai_persen'] = Erems_Box_Tools::toCurrency((float)$rs['data'][0]['npv_nilai_persen']);
			$data['createdby_name']   = ucwords($rs['data'][0]['createdby_name']);
			$data['project_name']     = $rs['data'][0]['project_name'];
			$data['print_date']       = date('d-M-Y H:i:s');


			$std_record_no = '';
			$std_duedate   = '';
			$std_npv_value = '';

			if($rss['success'] == true){
				foreach($rss['data'] as $key1 => $val1){
					if(isset($val1['record_no'])){
						$std_record_no .= $val1['record_no'] . '             ';
					}
					
					if(isset($val1['duedate'])){
						$std_duedate .= Erems_Box_Tools::formatDate($val1['duedate'], 'd-M-Y') . '             ';
					}

					if(isset($val1['npv_value'])){
						$std_npv_value .= Erems_Box_Tools::toCurrency((float)$val1['npv_value']) . '             ';
					}
				}
			}

			$data['n1']  = $std_record_no;
			$data['tg1'] = $std_duedate;
			$data['r1']  = $std_npv_value;
			$data['nt1'] = '';

			$real_record_no = '';
			$real_duedate   = '';
			$real_npv_value = '';
			if($rsr['success'] == true){
				foreach($rsr['data'] as $key2 => $val2){
					if(isset($val2['record_no'])){
						$real_record_no .= $val2['record_no'] . '             ';
					}
					
					if(isset($val2['duedate'])){
						$real_duedate .= Erems_Box_Tools::formatDate($val2['duedate'], 'd-M-Y') . '             ';
					}

					if(isset($val2['npv_value'])){
						$real_npv_value .= Erems_Box_Tools::toCurrency((float)$val2['npv_value']) . '             ';
					}
				}
			}

			$data['n21']  = $real_record_no;
			$data['tg21'] = $real_duedate;
			$data['r21']  = $real_npv_value;

			$fileSrc   = $req->getPost('doc_name') . '.' . $req->getPost('doc_type');
			$finalFile = 'NPV_' . time() . '.' . $req->getPost('doc_type');

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