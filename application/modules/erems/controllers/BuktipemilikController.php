<?php

class Erems_BuktipemilikController extends Zend_Controller_Action {

	function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);
		
		$read_type_mode = ($this->getRequest()->getPost('read_type_mode') ? $this->getRequest()->getPost('read_type_mode') : '');
		$post_data['read_type_mode'] = $this->getRequest()->getPost('read_type_mode');

        $model_buktipemilik = new Erems_Models_Buktipemilik();
        
		//detail HGB AJB
		$post_data['is_hgbajb'] = $this->getRequest()->getPost('is_hgbajb');

		if($post_data['is_hgbajb'] == 'yes'){
            $post_data['start']                = 0;
            $post_data['limit']                = 0;
            $post_data['buktipemilik_id']      = $this->getRequest()->getPost('buktipemilik_id');
            $post_data['temp_buktipemilik_id'] = $this->getRequest()->getPost('temp_buktipemilik_id');
			
			$result = $model_buktipemilik->hgbajbRead($post_data);
		}
		else if($post_data['read_type_mode'] == 'printout_document'){
            $document_name = $this->getRequest()->getPost('document_name');
            $hgbajb_id     = $this->getRequest()->getPost('id');

			$result = $this->printajb($hgbajb_id);
		}
		else if($read_type_mode == 'customer_document'){
            $post_data['customer_id'] = $this->getRequest()->getPost('customer_id');
            $post_data['start']       = $this->getRequest()->getPost('start');
            $post_data['limit']       = $this->getRequest()->getPost('limit');
            $post_data['page']        = $this->getRequest()->getPost('page');
			
            $result = $model_buktipemilik->buktipemilikcustomerdocumentRead($post_data);
		}
        else if($read_type_mode == 'assets'){
            $model_dropdown = new Erems_Models_Dropdown();

            $result_cluster = $model_dropdown->cluster($this->getRequest());
            $result_cluster = $result_cluster['success'] ? $result_cluster['data'] : array();

            $result_projectpt = $model_dropdown->projectpt($this->getRequest());
            $result_projectpt = $result_projectpt['success'] ? $result_projectpt['data'] : array();

            $result_block = $model_dropdown->block($this->getRequest());
            $result_block = $result_block['success'] ? $result_block['data'] : array();

            $result_posisi = $model_dropdown->posisi($this->getRequest());
            $result_posisi = $result_posisi['success'] ? $result_posisi['data'] : array();

            $result_productcategory = $model_dropdown->productcategory($this->getRequest());
            $result_productcategory = $result_productcategory['success'] ? $result_productcategory['data'] : array();

            $result_type = $model_dropdown->type($this->getRequest());
            $result_type = $result_type['success'] ? $result_type['data'] : array();

            $result_notaris = $model_dropdown->notaris($this->getRequest());
            $result_notaris = $result_notaris['success'] ? $result_notaris['data'] : array();

            $genco = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId());

            $post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
            $result_cek_um = $model_buktipemilik->cekum($post_data);

            $result = array(
                'cek_um'               => $result_cek_um,
                'validasium_config'    => $genco->validasiumakad(),
                'subholding_config'    => $genco->activateSh1Features('girik_buktipemilik'),
                'get_subholding'       => $this->session->getcurrentSubholdingid(),
                'cluster'              => $result_cluster,
                'block'                => $result_block,
                'projectpt'            => $result_projectpt,
                'posisi'               => $result_posisi,
                'productcategory'      => $result_productcategory,
                'type'                 => $result_type,
                'notaris'              => $result_notaris,
                'imb_pecahan_readonly' => $genco->imb_pecahan_readonly()
            );
        }
		else{
            $post_data['start'] = $this->getRequest()->getPost('start');
            $post_data['limit'] = $this->getRequest()->getPost('limit');
            $post_data['page']  = $this->getRequest()->getPost('page');
			
            $post_data['cluster_id'] = $this->getRequest()->getPost('cluster_id');
            $post_data['pt_id']      = $this->getRequest()->getPost('pt_id');
            $post_data['block_id']   = $this->getRequest()->getPost('block_id');
            $post_data['unit_id']    = $this->getRequest()->getPost('unit_id');
			
            $post_data['unit_number']   = $this->getRequest()->getPost('unit_number');
            $post_data['customer_name'] = $this->getRequest()->getPost('customer_name');
			
            $post_data['position_id']        = $this->getRequest()->getPost('position_id');
            $post_data['productcategory_id'] = $this->getRequest()->getPost('productcategory_id');
            $post_data['type_id']            = $this->getRequest()->getPost('type_id');
            $post_data['unitstatus_id']      = $this->getRequest()->getPost('unitstatus_id');
			
			$result = $model_buktipemilik->buktipemilikRead($post_data);
		}
		
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model_buktipemilik = new Erems_Models_Buktipemilik();
        $result = $model_buktipemilik->buktipemilikCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_buktipemilik = new Erems_Models_Buktipemilik();
        $result = $mode_buktipemilik->buktipemilikUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_buktipemilik = new Erems_Models_Buktipemilik();
        $result = $mode_buktipemilik->buktipemilikDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

	function printajb($hgbajb_id){
        $model = new Erems_Models_Buktipemilik();
        $document_name = $this->getRequest()->getPost('document_name');
        $post_data['hgbajb_id'] = $hgbajb_id;
        $rs = $model->printhgbajbRead($post_data);
       
        $resultdata = $rs['data'][0];
        
        $result['success'] = false;

        $data = array();
        if(count($resultdata) > 0){
			foreach($resultdata as $field => $val){
				$data[$field] = $val;
			}
            // var_dump($data['pt_gsgu_date']);
            // var_dump($data['pt_hgb_date']);
            // var_dump($data['tgl_berakhir_pt']);
            // die();
            if(empty($data['pt_gsgu_date']) || date_format(date_create($data['pt_gsgu_date']),"Y") <= 1900 ) {
                $data['pt_gsgu_date'] = '';
            } else {
                $data['pt_gsgu_date'] = date_format(date_create($data['pt_gsgu_date']),"d/m/Y");
            }

            if(empty($data['pt_hgb_date']) || date_format(date_create($data['pt_hgb_date']),"Y") <= 1900 ) {
                $data['pt_hgb_date'] = '';
            } else {
                $data['pt_hgb_date'] = date_format(date_create($data['pt_hgb_date']),"d/m/Y");
            }

            if(empty($data['tgl_berakhir_pt']) || date_format(date_create($data['tgl_berakhir_pt']),"Y") <= 1900 ) {
                $data['tgl_berakhir_pt'] = '';
            } else {
                $data['tgl_berakhir_pt'] = date_format(date_create($data['tgl_berakhir_pt']),"d/m/Y");
            }

			// $data['pt_gsgu_date'] = empty($data['pt_gsgu_date']) OR ? '' : date_format(date_create($data['pt_gsgu_date']),"d/m/Y");
			// $data['pt_hgb_date'] = empty($data['pt_hgb_date']) ? '' : date_format(date_create($data['pt_hgb_date']),"d/m/Y");
			// $data['tgl_berakhir_pt'] = empty($data['tgl_berakhir_pt']) ? '' : date_format(date_create($data['tgl_berakhir_pt']),"d/m/Y");

			$data['harga_netto'] = number_format($data['harga_netto']);
			// $data['pt_gsgu_date'] = date_format(date_create($data['pt_gsgu_date']),"d/m/Y");
			// $data['pt_hgb_date'] = date_format(date_create($data['pt_hgb_date']),"d/m/Y");
			// $data['tgl_berakhir_pt'] = date_format(date_create($data['tgl_berakhir_pt']),"d/m/Y");
                
                
                $p = new Erems_Box_Library_MyWordParser();
                $wpdf = new Erems_Box_Library_WordToPdf();
                $fileSrc = 'penjadwalanajb/'.$document_name;
                
               $finalFile = 'SURAT_PENJADWALAN_AJB'.time().'.docx';
                $ok = $p->printDoc($fileSrc, $finalFile, $data);

            $pathUrl = $p->getUrl();

                if($ok){
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