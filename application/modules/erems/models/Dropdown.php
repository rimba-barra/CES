<?php

class Erems_Models_Dropdown extends Zend_Db_Table_Abstract {

	protected $_schema = 'erems';
	protected $_name   = 'th_';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    ////// Added by erwin ///////
    public function cluster($req) {
        $return['success'] = false;
        try {
			$resultcount = $this->execSP('sp_cluster_count', $req->getPost('code'), $req->getPost('cluster'), $req->getPost('description'), $this->session->getCurrentProjectId(), $this->session->getCurrentPtId());
			$resultdata  = $this->execSP('sp_cluster_read', $req->getPost('code'), $req->getPost('cluster'), $req->getPost('description'), $this->session->getCurrentProjectId(), $this->session->getCurrentPtId());

			$return['total']   = $resultcount[0]['RECORD_TOTAL'];
			$return['data']    = $resultdata;
			$return['success'] = true;
        } catch (Exception $e) { }
        return $return;
    }

    public function projectpt($req){
		$arr_projectpt = array(
            'start'        => $req->getPost('start'), 
            'limit'        => $req->getPost('limit'), 
            'projectpt_id' => $req->getPost('projectpt_id'), 
            'project_id'   => $req->getPost('project_id'), 
            'pt_id'        => $req->getPost('pt_id'), 
        );
		$model  = new Masterdata_Models_Projectpt();		
		$return = $model->projectptRead($arr_projectpt);
		return $return;
	}

	public function block($req) {
        $return['success'] = false;
        try {
			$resultcount = $this->execSP('sp_block_count', $req->getPost('code'), $req->getPost('block'), $req->getPost('description'), $req->getPost('cluster_id'), $this->session->getCurrentProjectId(), $this->session->getCurrentPtId());
			$resultdata  = $this->execSP('sp_block_read', $req->getPost('code'), $req->getPost('block'), $req->getPost('description'), $req->getPost('cluster_id'), $this->session->getCurrentProjectId(), $this->session->getCurrentPtId());

			$return['total']   = $resultcount[0]['RECORD_TOTAL'];
			$return['data']    = $resultdata;
			$return['success'] = true;
        } catch (Exception $e) { }
        return $return;
    }

    public function posisi($req) {
		$return['success'] = false;
		try {		
			$resultcount = $this->execSP('sp_masterposisi_count', $req->getPost('code'), $req->getPost('position'), $req->getPost('description'), $req->getPost('cluster_id'), $this->session->getCurrentProjectId(), $this->session->getCurrentPtId());
			$resultdata  = $this->execSP('sp_masterposisi_read', $req->getPost('code'), $req->getPost('position'), $req->getPost('description'), $req->getPost('cluster_id'), $this->session->getCurrentProjectId(), $this->session->getCurrentPtId());
			
			$return['total']   = $resultcount[0]['RECORD_TOTAL'];
			$return['data']    = $resultdata;			
			$return['success'] = true;
		} catch(Exception $e) { }
		return $return;
	}

	public function productcategory($req) {
        $return['success'] = false;
        try {
			$resultcount = $this->execSP('sp_productcategory_count', $req->getPost('code'), $req->getPost('productcategory'), $req->getPost('description'), $this->session->getCurrentProjectId(), $this->session->getCurrentPtId());
			$resultdata  = $this->execSP('sp_productcategory_read', $req->getPost('code'), $req->getPost('productcategory'), $req->getPost('description'), $this->session->getCurrentProjectId(), $this->session->getCurrentPtId());

			$return['total']   = $resultcount[0]['RECORD_TOTAL'];
			$return['data']    = $resultdata;
			$return['success'] = true;
        } catch (Exception $e) { }
        return $return;
    }

	public function notaris($req) {
        $return['success'] = false;
        try {
			$resultcount = $this->execSP('sp_notaris_count', $req->getPost('code'), $req->getPost('notaris'), $req->getPost('alamat'), $req->getPost('city_id'), $req->getPost('country_id'), $this->session->getCurrentProjectId(), $this->session->getCurrentPtId());
			$resultdata = $this->execSP('sp_notaris_read', $req->getPost('code'), $req->getPost('notaris'), $req->getPost('alamat'), $req->getPost('city_id'), $req->getPost('country_id'), $req->getPost('start'), $req->getPost('limit'), $this->session->getCurrentProjectId(), $this->session->getCurrentPtId());

			$return['total']   = $resultcount[0]['RECORD_TOTAL'];
			$return['data']    = $resultdata;
			$return['success'] = true;
        } catch (Exception $e) { }
        return $return;
    }

    public function type($req){
    	$return['success'] = false;
        try {
    		$data = array(
    			$this->session->getCurrentProjectId(), 
        		$this->session->getCurrentPtId(), 
        		1, // page 
                999999, // limit
        		// 0, // limit
        		intval($req->getPost('productcategory_id')) == 999 ? 0 : $req->getPost('productcategory_id'),
        		intval($req->getPost('cluster_id')) == 999 ? 0 : $req->getPost('cluster_id'),
        		$req->getPost('type_name'),
        		$req->getPost('code')
    		);
    		$result = $this->execSP3('sp_typeb_read', $data);

    		$return['total']   = $result[0][0]['totalRow'];
			$return['data']    = $result[1];
			$return['success'] = true;
        } catch (Exception $e) { }
        return $return;
    }
}
?>