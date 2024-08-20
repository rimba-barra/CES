<?php

/**
 * Description of Salesman
 *
 * @author MIS
 */
class Erems_Models_Komisi_DistributionchannelDao extends Zend_Db_Table_Abstract {
    protected $_schema = 'erems';
    // protected $_name = 'm_koefisien';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    public function KomisiDistributionChannelRead($param) {
        $return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$this->session->getCurrentProjectId(), 
					$this->session->getCurrentPtId(),
					1,//$param['start'], 
					25//$param['limit']
				);	
				$result = $this->execSP3('sp_purchaseletter_komisi_distributionchannel_read', $data);
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
                var_dump($e->getMessage());				
			}
		}		
		return $return;
    }

    // public function __construct() {
    //     parent::__construct();
    //     $this->embedPrefix = "salesman_";
    //     $this->getJabatan()->setId(Erems_Box_Config::POSITION_ID_SALESMAN);
    // }
}

?>
