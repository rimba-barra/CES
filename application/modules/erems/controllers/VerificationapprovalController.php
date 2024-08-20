<?php

class Erems_VerificationapprovalController extends Zend_Controller_Action {

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}

	function readAction() {
		$req = $this->getRequest();
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$model = new Erems_Models_Verificationapproval();
		if ($req->getPost('mode') == 'asset') {
			$result = $this->getasset();
		}
		else if ($req->getPost('mode') == 'gettemplate') {
			$result = $this->gettemplate();
		}
		else if ($req->getPost('mode') == 'purchaseletterlist') {
			$result = $model->purchaseletterlistRead($req);
		} 
		else {
			$result = $model->verificationapprovalRead($this->getRequest());
		}
		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function getasset(){
		$mv           = new Erems_Models_Masterverification();
		$mv_data      = $mv->masterverificationRead();
		$verification = $mv_data['success'] ? $mv_data['data'] : array();

		$mvd                 = new Erems_Models_Masterverificationdetail();
		$mvd_data            = $mvd->masterverificationdetailRead();
		$verification_detail = $mvd_data['success'] ? $mvd_data['data'] : array();

		$ms = new Erems_Models_Verificationapproval();
        $rs_salesman = $ms->employeeRead(array('jabatan' => 7));
        
        $request_by_1 = array();
        if($rs_salesman['success']){
            if(count($rs_salesman['data']) > 0){
                foreach ($rs_salesman['data'] as $key => $val) {
                    $request_by_1[] = array(
                        'request_by_1'      => $val['reff_id'],
                        'request_by_1_name' => $val['reff_name'],
                    );
                }
            }
        }
        
        $model_app   = new Erems_Models_Approvallevel();
        $rs_req_2    = $model_app->getAllRead(array('modul' => 'verification_02'));
        $rs_approval = $model_app->getAllRead(array('modul' => 'verification_approve'));

		$isApproval2     = false;
		$isApprovalFinal = false;

        $request_by_2 = array();
        if($rs_req_2['success']){
            if(count($rs_req_2['data']) > 0){
                foreach ($rs_req_2['data'] as $key => $val) {
                    $request_by_2[] = array(
                        'request_by_2'          => $val['user_id'],
                        'request_by_2_name'     => $val['name'],
                        'request_by_2_position' => $val['position'],
                    );

                    if($this->session->getUserId() == $val['user_id']){
						$isApproval2 = true;
                    }
                }
            }
        }

        $approved_by = array();
        if($rs_approval['success']){
            if(count($rs_approval['data']) > 0){
                foreach ($rs_approval['data'] as $key => $val) {
                    $approved_by[] = array(
                        'approved_by'      => $val['user_id'],
                        'approved_by_name' => $val['name'],
                    );

                    if($this->session->getUserId() == $val['user_id']){
						$isApprovalFinal = true;
                    }
                }
            }
        }

        $printOut = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId())->printOutVericationApproval();

        return array(
            'verification'        => $verification,
            'verification_detail' => $verification_detail,
            'request_by_1'        => $request_by_1,
            'request_by_2'        => $request_by_2,
            'approved_by'         => $approved_by,
            'isApproval2'         => $isApproval2, 
            'isApprovalFinal'     => $isApprovalFinal,
            'print_type'          => $printOut['file_type'],
            'print_file'          => $printOut['file_name'],
        );
	}

	function gettemplate(){
		$req   = $this->getRequest();
		$model = new Erems_Models_Verificationapproval();

		$template_ketentuan = $req->getPost('template_ketentuan');
		$template_alasan    = $req->getPost('template_alasan');

		$data = $model->detailpurchaseletterRead($req);
		if(isset($data['data']['main'][0]) && count($data['data']['main'][0]) > 0){
            foreach ($data['data']['main'][0] as $key => $val) {
                if($val && in_array($key, array('purchase_date', 'akadrealisation_date', 'sppjb_date'))){
                    $val = Erems_Box_Tools::formatDate($val);
                }
                else if($val && in_array($key, array('harga_total_jual'))){
                    $val = number_format($val, 2, '.', ',');
                }
                else if($val && in_array($key, array('progress_bayar', 'progress'))){
                    $val = number_format($val, 0, '.', ',');
                }
                $template_ketentuan = str_replace("#".$key."#", $val, $template_ketentuan);
                $template_alasan = str_replace("#".$key."#", $val, $template_alasan);
            }
        }

        if(isset($data['data']['detail']) && count($data['data']['detail']) > 0){
            $open_tag  = '[open_table]';
            $close_tag = '[close_table]';
            $row_tag   = Erems_Box_Tools::get_string_between($template_ketentuan, $open_tag, $close_tag);

            $schedule = '';
            $exp_row  = explode('|', $row_tag);
            foreach ($data['data']['detail'] as $key1 => $val1) {
                for($i=0; $i<count($exp_row); $i++){
                    $str_code = str_replace("#", '', $exp_row[$i]);
                    
                    if(isset($val1[$str_code])){
                        $v = $val1[$str_code];
                        if(in_array($str_code, array('duedate'))){ 
                            $v = Erems_Box_Tools::formatDate($v);
                        }
                        else if($v && in_array($str_code, array('amount', 'remaining_balance'))){
                            $v = number_format($v, 2, '.', ',');
                        }
                        $schedule .= $v;
                        
                        if($str_code == 'no'){ $schedule .= '.'; }
                        if($i < (count($exp_row)-1)){ $schedule .= '     '; }
                    }
                }
$schedule .= '
';
            }
            $template_ketentuan = str_replace($open_tag.$row_tag.$close_tag, $schedule, $template_ketentuan);
        }

		$ketentuan = $template_ketentuan;
        $alasan    = $template_alasan;

        return array(
            'ketentuan' => $ketentuan,
            'alasan'    => $alasan
        );
	}

	function createAction() {

		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
		$model = new Erems_Models_Verificationapproval();
		$result = $model->verificationapprovalCreate($post_data);

		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function updateAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$model = new Erems_Models_Verificationapproval();
		$result = $model->verificationapprovalUpdate($post_data);

		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

	function deleteAction() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');

		$result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

		$model = new Erems_Models_Verificationapproval();
		$result = $model->verificationapprovalDelete($post_data);
		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

    function printAction(){
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $req = $this->getRequest();

        $model = new Erems_Models_Verificationapproval();
        $rs = $model->verificationapprovaldetailRead($req);

        if($rs['success'] == true){
            $word = new Erems_Box_Library_MyWordParser();

            $data = array();
            foreach ($rs['data'][0] as $key => $val) {
                $data[$key] = Erems_Box_Tools::convert_entercode_printing($val);
            }

            $fileSrc   = $req->getPost('doc_name') . '.' . $req->getPost('doc_type');
            $finalFile = 'FormulirPersetujuan_' . time() . '.' . $req->getPost('doc_type');

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