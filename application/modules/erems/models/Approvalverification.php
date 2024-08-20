<?php

class Erems_Models_Approvalverification extends Erems_Box_Models_App_AbDao implements Erems_Box_Models_App_BlackHole{

	// protected $_schema = 'erems';
	// protected $_name   = 't_verification_approval';
	// protected $session;

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}
	
	public function getapprovalRead(Erems_Box_Models_App_HasilRequestRead $r, Erems_Box_Models_App_Session $ses){
        
        $hasil = array();
//        if($id==0){
//            return $hasil;
//        }
        // $ses->getProject()->getId()
        // $ses->getPt()->getId()
        // var_dump($ses->getProject()->getId()); die();
        $hasil = $this->dbTable->SPExecute('sp_verificationapproval_read',$r->getOthersValue('purchaseletter_id'),$r->getOthersValue('verification_code'),$ses->getProject()->getId(),$ses->getPt()->getId());
//        var_dump($hasil[0][0]['totalRow']); die();    
        $return['totalRow'] = $hasil[0][0]['totalRow'];
        $return['data'] = $hasil[1];
    
        return $return;
    }

    public function directDelete(\Erems_Box_Models_App_Decan $decan, \Erems_Box_Kouti_InterSession $session) {
        
    }

}

?>