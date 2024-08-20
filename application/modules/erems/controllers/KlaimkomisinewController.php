<?php

class Erems_KlaimkomisinewController extends Zend_Controller_Action {

	function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $model_klaimkomisinew = new Erems_Models_Klaimkomisinew();
        
        $post_data['mode_read'] = $this->getRequest()->getPost('mode_read');
        
        if($post_data['mode_read'] == 'detail_grid'){
            $post_data['start'] = $this->getRequest()->getPost('start');
            $post_data['limit'] = $this->getRequest()->getPost('limit');

            $post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
            $post_data['page'] = $this->getRequest()->getPost('page');
            $result = $model_klaimkomisinew->klaimkomisinewdetailRead($post_data);            
        } else if($post_data['mode_read'] == 'detail_grid_komisi_cair'){
            $post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
            $result = $model_klaimkomisinew->klaimkomisinewdetailKomisiCairRead($post_data);            
        } else {
            $post_data['start'] = $this->getRequest()->getPost('start');
            $post_data['limit'] = $this->getRequest()->getPost('limit');

            $post_data['unit_number'] = $this->getRequest()->getPost('unit_number');
            $post_data['cluster_id'] = $this->getRequest()->getPost('cluster_id');
            $post_data['block_id'] = $this->getRequest()->getPost('block_id');
            $post_data['customer_name'] = $this->getRequest()->getPost('customer_name');
            $post_data['page'] = $this->getRequest()->getPost('page');

            
            $result = $model_klaimkomisinew->klaimkomisinewRead($post_data);
        }
            
        
        

        
		
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
		$model_klaimkomisinew = new Erems_Models_Klaimkomisinew();
        
        foreach ($post_data['data_purchaseletter_id'] as $key => $value) {
            $post_data['purchaseletter_id'] = $value;
            $post_data['pricetype_id'] = $post_data['pricetype_id'][$key];
        
//        var_dump($post_data);die();
        
            $updatedata = $model_klaimkomisinew->klaimkomisinewGetupdate($post_data);
            $validasi  = $model_klaimkomisinew->klaimkomisinewValidasi($post_data);
            $validasi2 = $model_klaimkomisinew->klaimkomisinewValidasi2($post_data);
//            var_dump($validasi); die();
            $existdata = $model_klaimkomisinew->klaimkomisinewExist($post_data);
            $valid_tgl = !empty ($validasi[$key]['tandatangan_date']) ? date_format(new DateTime($validasi[$key]['tandatangan_date']),"Y") : 0  ;
            
            if($existdata['exist1'] > 0) {
                if($validasi2[0]['is_akad'] == 1 && $validasi2[0]['is_uangmuka'] == 0 && $validasi2[0]['is_sppjb'] == 0 ){
                    if(!empty ($validasi[$key]['is_alreadyakad'])){
                        $result = $model_klaimkomisinew->klaimkomisinewUpdate1($updatedata);
                    }else {
                        $result = array('data' => array(), 'total' => 0, 'success' => true);
                    }
                } else if($validasi2[0]['is_sppjb'] == 1 && $validasi2[0]['is_uangmuka'] == 0 && $validasi2[0]['is_akad'] == 0){
                    if(!empty ($validasi[$key]['tandatangan_date']) && $valid_tgl > 1900){
                        $result = $model_klaimkomisinew->klaimkomisinewUpdate1($updatedata);
                    }else {
                        $result = array('data' => array(), 'total' => 0, 'success' => true);
                    }
                } else if($validasi2[0]['is_sppjb'] == 1 && $validasi2[0]['is_akad'] == 1 && $validasi2[0]['is_uangmuka'] == 0) {
                    if(!empty ($validasi[$key]['tandatangan_date']) && !empty ($validasi[$key]['is_alreadyakad']) && $valid_tgl > 1900){
                        $result = $model_klaimkomisinew->klaimkomisinewUpdate1($updatedata);
                    }else {
                        $result = array('data' => array(), 'total' => 0, 'success' => true);
                    }
                } else if($validasi2[0]['is_sppjb'] == 1 && $validasi2[0]['is_akad'] == 1 && $validasi2[0]['is_uangmuka'] == 1) {
                    if(!empty ($validasi[$key]['tandatangan_date']) && !empty ($validasi[$key]['is_alreadyakad']) && $valid_tgl > 1900){
                        $updatedata2 = $model_klaimkomisinew->klaimkomisinewGetupdate2($post_data);
                        $result = $model_klaimkomisinew->klaimkomisinewUpdate1($updatedata2);
                    }else {
                        $result = array('data' => array(), 'total' => 0, 'success' => true);
                    }
                } else if($validasi2[0]['is_sppjb'] == 1 && $validasi2[0]['is_uangmuka'] == 1 && $validasi2[0]['is_akad'] == 0) {
                    if(!empty ($validasi[$key]['tandatangan_date']) && $valid_tgl > 1900){
                        $updatedata2 = $model_klaimkomisinew->klaimkomisinewGetupdate2($post_data);
                        $result = $model_klaimkomisinew->klaimkomisinewUpdate1($updatedata2);
                    }else {
                        $result = array('data' => array(), 'total' => 0, 'success' => true);
                    }
                } else if($validasi2[0]['is_akad'] == 1 && $validasi2[0]['is_uangmuka'] == 1 && $validasi2[0]['is_sppjb'] == 0) {
                    if(!empty ($validasi[$key]['is_alreadyakad'])){
                        $updatedata2 = $model_klaimkomisinew->klaimkomisinewGetupdate2($post_data);
                        $result = $model_klaimkomisinew->klaimkomisinewUpdate1($updatedata2);
                    }else {
                        $result = array('data' => array(), 'total' => 0, 'success' => true);
                    }
                }else if($validasi2[0]['is_uangmuka'] == 1 && $validasi2[0]['is_sppjb'] == 0 && $validasi2[0]['is_akad'] == 0){
                    $updatedata2 = $model_klaimkomisinew->klaimkomisinewGetupdate2($post_data);
                    $result = $model_klaimkomisinew->klaimkomisinewUpdate1($updatedata2);
                } else{
                    $result = $model_klaimkomisinew->klaimkomisinewUpdate1($updatedata);
                }

            }else if($existdata['exist2'] > 0 && $existdata['exist1'] == 0) {
                if($validasi2[0]['is_akad'] == 1 && $validasi2[0]['is_uangmuka'] == 0 && $validasi2[0]['is_sppjb'] == 0){
                    if(!empty ($validasi[$key]['is_alreadyakad'])){
                        $result = $model_klaimkomisinew->klaimkomisinewUpdate2($updatedata);
                    }else {
                        $result = array('data' => array(), 'total' => 0, 'success' => true);
                    }
                } else if($validasi2[0]['is_sppjb'] == 1 && $validasi2[0]['is_uangmuka'] == 0 && $validasi2[0]['is_akad'] == 0){
                    if(!empty ($validasi[$key]['tandatangan_date']) && $valid_tgl > 1900){
                        $result = $model_klaimkomisinew->klaimkomisinewUpdate2($updatedata);
                    }else {
                        $result = array('data' => array(), 'total' => 0, 'success' => true);
                    }
                } else if($validasi2[0]['is_sppjb'] == 1 && $validasi2[0]['is_akad'] == 1 && $validasi2[0]['is_uangmuka'] == 0) {
                    if(!empty ($validasi[$key]['tandatangan_date']) && !empty ($validasi[$key]['is_alreadyakad']) && $valid_tgl > 1900){
                        $result = $model_klaimkomisinew->klaimkomisinewUpdate2($updatedata);
                    }else {
                        $result = array('data' => array(), 'total' => 0, 'success' => true);
                    }
                } else if($validasi2[0]['is_sppjb'] == 1 && $validasi2[0]['is_akad'] == 1 && $validasi2[0]['is_uangmuka'] == 1) {
                    if(!empty ($validasi[$key]['tandatangan_date']) && !empty ($validasi[$key]['is_alreadyakad']) && $valid_tgl > 1900){
                        $updatedata2 = $model_klaimkomisinew->klaimkomisinewGetupdate2($post_data);
                        $result = $model_klaimkomisinew->klaimkomisinewUpdate2($updatedata2);
                    }else {
                        $result = array('data' => array(), 'total' => 0, 'success' => true);
                    }
                } else if($validasi2[0]['is_sppjb'] == 1 && $validasi2[0]['is_uangmuka'] == 1 && $validasi2[0]['is_akad'] == 0) {
                    if(!empty ($validasi[$key]['tandatangan_date']) && $valid_tgl > 1900){
                        $updatedata2 = $model_klaimkomisinew->klaimkomisinewGetupdate2($post_data);
                        $result = $model_klaimkomisinew->klaimkomisinewUpdate2($updatedata2);
                    }else {
                        $result = array('data' => array(), 'total' => 0, 'success' => true);
                    }
                } else if($validasi2[0]['is_akad'] == 1 && $validasi2[0]['is_uangmuka'] == 1 && $validasi2[0]['is_sppjb'] == 0) {
                    if(!empty ($validasi[$key]['is_alreadyakad'])){
                        $updatedata2 = $model_klaimkomisinew->klaimkomisinewGetupdate2($post_data);
                        $result = $model_klaimkomisinew->klaimkomisinewUpdate2($updatedata2);
                    }else {
                        $result = array('data' => array(), 'total' => 0, 'success' => true);
                    }
                } else if($validasi2[0]['is_uangmuka'] == 1 && $validasi2[0]['is_sppjb'] == 0 && $validasi2[0]['is_akad'] == 0){
                    $updatedata2 = $model_klaimkomisinew->klaimkomisinewGetupdate2($post_data);
                    $result = $model_klaimkomisinew->klaimkomisinewUpdate2($updatedata2);
                } else{
                    $result = $model_klaimkomisinew->klaimkomisinewUpdate2($updatedata);
                }  
            }else {
                $data = $model_klaimkomisinew->klaimkomisinewDetail($post_data); 
                if($validasi2[0]['is_akad'] == 1 && $validasi2[0]['is_uangmuka'] == 0 && $validasi2[0]['is_sppjb'] == 0){
                    if(!empty ($validasi[$key]['is_alreadyakad'])){
                        $result = $model_klaimkomisinew->klaimkomisinewCreate($data);  
                    }else {
                        $result = array('data' => array(), 'total' => 0, 'success' => true);
                    }
                } else if($validasi2[0]['is_sppjb'] == 1 && $validasi2[0]['is_uangmuka'] == 0 && $validasi2[0]['is_akad'] == 0){
                    if(!empty ($validasi[$key]['tandatangan_date']) && $valid_tgl > 1900){
                        $result = $model_klaimkomisinew->klaimkomisinewCreate($data);  
                    }else {
                        $result = array('data' => array(), 'total' => 0, 'success' => true);
                    }
                } else if($validasi2[0]['is_sppjb'] == 1 && $validasi2[0]['is_akad'] == 1 && $validasi2[0]['is_uangmuka'] == 0) {
                    if(!empty ($validasi[$key]['tandatangan_date']) && !empty ($validasi[$key]['is_alreadyakad']) && $valid_tgl > 1900){
                        $result = $model_klaimkomisinew->klaimkomisinewCreate($data);
                    }else {
                        $result = array('data' => array(), 'total' => 0, 'success' => true);
                    }
                } else if($validasi2[0]['is_sppjb'] == 1 && $validasi2[0]['is_akad'] == 1 && $validasi2[0]['is_uangmuka'] == 1) {
                    if(!empty ($validasi[$key]['tandatangan_date']) && !empty ($validasi[$key]['is_alreadyakad']) && $valid_tgl > 1900){
                        $data2 = $model_klaimkomisinew->klaimkomisinewDetail2($post_data); 
                        $result = $model_klaimkomisinew->klaimkomisinewCreate($data2);
                    }else {
                        $result = array('data' => array(), 'total' => 0, 'success' => true);
                    }
                } else if($validasi2[0]['is_sppjb'] == 1 && $validasi2[0]['is_uangmuka'] == 1 && $validasi2[0]['is_akad'] == 0) {
                    if(!empty ($validasi[$key]['tandatangan_date']) && $valid_tgl > 1900){
                        $data2 = $model_klaimkomisinew->klaimkomisinewDetail2($post_data); 
                        $result = $model_klaimkomisinew->klaimkomisinewCreate($data2);
                    }else {
                        $result = array('data' => array(), 'total' => 0, 'success' => true);
                    }
                } else if($validasi2[0]['is_akad'] == 1 && $validasi2[0]['is_uangmuka'] == 1 && $validasi2[0]['is_sppjb'] == 0) {
                    if(!empty ($validasi[$key]['is_alreadyakad'])){
                        $data2 = $model_klaimkomisinew->klaimkomisinewDetail2($post_data); 
                        $result = $model_klaimkomisinew->klaimkomisinewCreate($data2);
                    }else {
                        $result = array('data' => array(), 'total' => 0, 'success' => true);
                    }
                } else if($validasi2[0]['is_uangmuka'] == 1 && $validasi2[0]['is_sppjb'] == 0 && $validasi2[0]['is_akad'] == 0){
                    $data2 = $model_klaimkomisinew->klaimkomisinewDetail2($post_data); 
                    $result = $model_klaimkomisinew->klaimkomisinewCreate($data2);  
                } else{
                    $result = $model_klaimkomisinew->klaimkomisinewCreate($data);  
                }      
            }
    //        $data = $model_klaimkomisinew->klaimkomisinewDetail($post_data);  
            
        
        }

        
		if (!isset($post_data['from']) || $post_data['from'] != 'permintaanKomisi') {
			echo Zend_Json::encode($result);
			$this->_helper->viewRenderer->setNoRender(true);
		}
	}

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        
//        var_dump($post_data);die();
        $model_klaimkomisinew = new Erems_Models_Klaimkomisinew();
        $result = $model_klaimkomisinew->klaimkomisinewUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        
    //    var_dump($post_data);        die();
        $model_klaimkomisinew = new Erems_Models_Klaimkomisinew();
        $result = $model_klaimkomisinew->klaimkomisinewDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
    
    
    

}

?>