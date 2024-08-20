<?php
class Cashier_Models_Master_Writeoffapvbypass extends Zend_Db_Table_Abstract {

    protected $_schema = 'cashier';
    protected $_name = 'th_writeoff_special';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }
    function updatestatuswo($param){
        $return['success'] = 'Gagal';
    	try{
			$data = array (
				$param['writeoff_id'],
				$param['status'],
				0,
				'',
				$param['approveid'],1
			);

			$result = $this->execSP3('sp_writeoff_approve', $data);
			$return['data'] = $result[0][0];

			if(!isset($result[0][0]['result'])){		
                                if( $result[0][0]['result']==1){
                                    
                                    $return['success'] = true;
                                    $return['result'] = $result[0][0]['result'];
                                }else{
                                    
                                    $return['success'] = false;
                                    $return['result'] = $result[0][0]['result'];
                                }
			}
			else{
				$return['success'] = false;
			}				
		} catch(Exception $e) { 
            var_dump($e->getMessage());				
		}
		return $return;
    }

}