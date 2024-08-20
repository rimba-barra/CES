<?php

class Gl_Models_Query_Subaccountgroup extends Zend_Db_Table_Abstract {

    protected $_schema;
    protected $_name;
    protected $session;
    private $_showdata = null;
    private $_showdatasum = null;
    private $_groupby = null;
    private $_groupbysum = null;

    function init() {
        //start setup
        date_default_timezone_set('Asia/Jakarta');
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_schema = $this->session->getSelectedDbApp() . '.dbo';
        $this->_model = new Gl_Models_Generalmodel_Modelsp();
        //end setup
        //start paramter
        $this->_project_id = $this->session->getCurrentProjectId();
        $this->_pt_id = $this->session->getCurrentPtId();
        $this->_user_id = $this->session->getUserId();
        $this->_curdate = date('Y-m-d');
        $this->_curdatetime = date('Y-m-d H:i:s');
        $this->_active = 1;
        $this->_delete = 0;
        //end parameter    
        //start table from db
        $this->_m_coa = 'm_coa';
        $this->_m_prefix = 'm_prefix';
        $this->_m_kelsub = 'm_kelsub';
        $this->_m_subgl = 'm_subgl';
        $this->_m_summary = 'm_summary';
        $this->_th_jurnal = 'th_jurnal';
        $this->_td_jurnaldetail = 'td_jurnaldetail';
        $this->_td_jurnalsubdetail = 'td_jurnalsubdetail';

        //end table from db
        //start create temporary for report           
        //end create temporary for report                
    }

    function getkelsub_in($kelsub_id,$pt_id) {
        $sql = "
            
                SELECT COUNT(kelsub_id) AS RECORD_TOTAL FROM $this->_m_kelsub 
                WHERE
                        active=1
                    and deleted=0
                    and pt_id=$pt_id
                    and kelsub_id IN ($kelsub_id)                       

                SELECT  *  FROM $this->_m_kelsub 	 
                WHERE
                        active=1
                    and deleted=0
                    and pt_id=$pt_id
                    and kelsub_id IN ($kelsub_id)  
                ORDER BY kelsub ASC           
            ";

        $result = $this->_model->customefromquery($sql);
        $return = null;
        if ($result[0][0]['RECORD_TOTAL'] > 0) {          
            $return = $result;
        }
        return $return;
    }
//added by iqbal 9 july 2019
    function getfilteraccgroup($param) {
        
        $pt_id = $param['pt_id'];
        $fromcoa = $param['fromcoa'];
        $untilcoa = $param['untilcoa'];
        $project_id = $param['project_id'];

        $kelsub_id = "SELECT a.kelsub_id FROM $this->_m_coa a
                                    LEFT JOIN $this->_m_kelsub b ON a.kelsub_id = b.kelsub_id
                                    WHERE
                                        a.active=1
                                        and a.deleted=0
                                     
                                        and a.pt_id=$pt_id
                                        and a.project_id=$project_id
                                        and a.coa between ''$fromcoa'' and ''$untilcoa''  
                                        and b.kelsub is not null";

        $sql = "
            
                SELECT COUNT(kelsub_id) AS RECORD_TOTAL FROM $this->_m_kelsub 
                WHERE
                        active=1
                    and deleted=0
                    and pt_id=$pt_id
                    and project_id=$project_id
                    and kelsub_id IN ($kelsub_id)     


                SELECT  *  FROM $this->_m_kelsub     
                WHERE
                        active=1
                    and deleted=0
                    and pt_id=$pt_id
                    and project_id=$project_id
                    and kelsub_id IN (  
                                    $kelsub_id)  
                ORDER BY kelsub ASC           
            "; 

        $result = $this->_model->customefromquery($sql);
        $return = null;
        if ($result[0][0]['RECORD_TOTAL'] > 0) {          
            $return = $result;
        }
        return $return;
    }
//end added

}
