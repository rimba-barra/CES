<?php

class Erems_RecommendedtocancelController extends Zend_Controller_Action {

    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $model = new Erems_Models_Recommendedtocancel();

		$post_data['start'] = $this->getRequest()->getPost('start');
		$post_data['limit'] = $this->getRequest()->getPost('limit');
		
		$post_data['cluster_id'] = $this->getRequest()->getPost('cluster_id');
		$post_data['block_id'] = $this->getRequest()->getPost('block_id');
		$post_data['unit_number'] = $this->getRequest()->getPost('unit_number');
		$post_data['customer_name'] = $this->getRequest()->getPost('customer_name');
		$post_data['purchase_startdate'] = $this->getRequest()->getPost('purchase_startdate');
		$post_data['purchase_enddate'] = $this->getRequest()->getPost('purchase_enddate');
		$post_data['pricetype_id'] = $this->getRequest()->getPost('pricetype_id');

        $read_type_mode = ($this->getRequest()->getPost('read_type_mode') ? $this->getRequest()->getPost('read_type_mode') : ''); // added by rico 06042023
		
        if($read_type_mode == 'printout_document'){  // added by rico 06042023
            $post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
            $post_data['purchaseletter_bankkpr_id'] = $this->getRequest()->getPost('purchaseletter_bankkpr_id');

            // $rs = $model->printout_documentRead($post_data);
            // $result = $rs['data'][0];

            $result = $this->printout_document();
        }else{
		  $result = $model->recommendedtocancelRead($post_data);  
        }

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model_bankkpr = new Erems_Models_Recommendedtocancel();
        $result = $model_bankkpr->bankkprCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_bankkpr = new Erems_Models_Recommendedtocancel();
        $result = $mode_bankkpr->bankkprUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_bankkpr = new Erems_Models_Recommendedtocancel();
        $result = $mode_bankkpr->bankkprDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
	
	function printAction(){
		$report_fn = 'Recommendedtocancelexport.mrt';
				
		echo ($report_fn && file_exists($this->_helper->session->report_path.$report_fn)) ? $report_fn : 'ERROR';
				
		$this->_helper->viewRenderer->setNoRender(true);
	}

    // added by rico 13022023
    function printout_document() {
        $model = new Erems_Models_Recommendedtocancel();

        $post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
        $post_data['purchaseletter_bankkpr_id'] = $this->getRequest()->getPost('purchaseletter_bankkpr_id');
        $document_name = $this->getRequest()->getPost('document_name');

        $rs = $model->printout_documentRead($post_data);

        if (count($rs['data']) > 0) {
            $resultdata = $rs['data'][0];

            $result['success'] = false;

            $data = array();

            foreach ($resultdata as $field => $value) {
                $data[$field] = $value;
            }

            $data["rp"] = str_replace('\n ', '          ', $data["rp"]);
            $data["nominal"] = str_replace('\n ', '          ', $data["nominal"]);

            $data["scheduletype"] = str_replace('\n ', '                                                                                                 ', $data["scheduletype"]);
            $data["nomorurut"] = str_replace('\n ', '          ', $data["nomorurut"]);
            $data["duetgl"] = str_replace('\n ', '                  ', $data["duetgl"]);

            $p = new Erems_Box_Library_MyWordParser();
            $fileSrc = 'recommendedtocancel/' . $document_name;

            $finalFile = 'RECOMMENDEDTOCANCEL_DOC_' . time() . '.docx';
            $ok = $p->printDoc($fileSrc, $finalFile, $data);
            $pathUrl = $p->getUrl();

            if ($ok) {
                $result['success'] = true;
                $result['url'] = $pathUrl;
            } else {
                $result['success'] = false;
            }
        } else {
            $result['success'] = false;
        }

        return $result;
    }

}

?>