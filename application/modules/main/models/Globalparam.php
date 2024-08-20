<?php

class Main_Models_Globalparam extends Zend_Db_Table_Abstract {

    protected $_schema = 'dbmaster';
    protected $_name = 'm_globalparam';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

   /*

    function getLabelOperational() {
       $result = $this->execSP3('sp_globalparam_read', array('label_operational'));
       return $result;
    }
   */	

  // start added by ahmad riadi 31-01-2018   
  public function getdataProjectbyID($project_id) {
	error_reporting(0);
        $return['success'] = false;
        try {
            $data = $this->execSP3('sp_project_byid_read', array($project_id));
            $return = $data[0][0];
        } catch (Exception $e) {
            //var_dump($e);
        }
        return $return;
    }

    public function getdataPtbyID($pt_id) {
	error_reporting(0);
        $return['success'] = false;
        try {
            $data = $this->execSP3('sp_pt_byid_read', array($pt_id));
            $return = $data[0][0];
        } catch (Exception $e) {
            //var_dump($e);
        }
        return $return;
    }
     // end added by ahmad riadi 31-01-2018 

   function getLabelOperational() {
        $return['success'] = false;
        try {
            $return = $this->execSP3('sp_globalparam_read', array('label_operational'));
        } catch (Exception $e) {
            //var_dump($e);
        }
        return $return;
    }	

    

}

?>