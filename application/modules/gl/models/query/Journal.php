<?php

class Gl_Models_Query_Journal extends Zend_Db_Table_Abstract {

    protected $_schema;
    protected $_name;
    protected $session;

    function init() {
        //start setup
        date_default_timezone_set('Asia/Jakarta');
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_schema = $this->session->getSelectedDbApp() . '.dbo';
        $this->_model = new Gl_Models_Generalmodel_Modelsp();
        $this->_helper = new Gl_Models_Function_Helperdata();
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
        $this->_th_jurnal = 'th_jurnal';
        $this->_td_jurnaldetail = 'td_jurnaldetail';
        $this->_td_jurnalsubdetail = 'td_jurnalsubdetail';
        //end table from db
        //
        //start create temporary for report        
        //end create temporary for report                
    }

    public function txt($param) {
        return $this->_helper->textforquery($param);
    }

    public function getjournaldetail_id($param) {
        $flag = $param['flag'];
        $journal_id = $param['journal_id'];
        $kelsub_id = $param['kelsub_id'];
        $coa_id = $param['coa_id'];
        $coa = $this->txt($param['coa']);
        $kelsub = $this->txt($param['kelsub']);
        $sort = $param['sort'];
        $type = $this->txt($param['type']);
        $keterangan = $this->txt($param['keterangan']);
        $amount = $param['amount'];
        $journaldetail_id = $param['journaldetail_id'];

        if ($flag == 'create') {
            $where = "
                    WHERE 
                        project_id=$this->_project_id
                        AND pt_id =$this->_pt_id 
                        AND active = $this->_active
                        AND deleted = $this->_delete
                        AND journal_id = $journal_id
                        AND kelsub_id = $kelsub_id
                        AND coa_id = $coa_id
                        AND coa = $coa
                        AND kelsub = $kelsub
                        AND sort = $sort
                        AND type = $type
                        AND amount = $amount   
                     ";
        } else {
            $where = "
                    WHERE 
                        project_id=$this->_project_id
                        AND pt_id =$this->_pt_id 
                        AND journaldetail_id = $journaldetail_id                      
                     ";
        }

        $sql = "SELECT * FROM $this->_td_jurnaldetail  $where ";
        $result = $this->_model->customefromquery($sql);
        return $result[0][0];
    }

}
