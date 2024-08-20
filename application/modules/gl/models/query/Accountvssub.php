<?php

class Gl_Models_Query_Accountvssub extends Zend_Db_Table_Abstract {

    protected $_schema;
    protected $_name;
    protected $session;

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
        $this->_flag_item = 'I';
        $this->_flag_total = 'T';
        //end parameter    
        //start table from db
        $this->_m_coa = 'm_coa';
        $this->_m_prefix = 'm_prefix';
        $this->_th_jurnal = 'th_jurnal';
        $this->_td_jurnaldetail = 'td_jurnaldetail';
        $this->_m_coa = 'm_coa';
        //end table from db
        //start create temporary for report
        $this->_tmp = '##tmp_' . $this->_user_id;
        //end create temporary for report                
    }

    public function getdata($param) {
        $fromdate = date('Y-m-d', strtotime($param['fromdate']));
        $untildate = date('Y-m-d', strtotime($param['untildate']));
        $statusposting = $param['is_post'];
        
        $sql = "IF OBJECT_ID(''tempdb..$this->_tmp'') IS NOT NULL
                DROP TABLE $this->_tmp
                CREATE TABLE $this->_tmp (
                                        rpt_id int identity primary key,			
                                        project_id int,
                                        pt_id int,
                                        journal_id int,	
                                        journal_detail int,	
                                        voucher_no varchar(20),	
                                        voucher_date varchar(20),
                                        coa varchar(20),
                                        type varchar(2),  
                                        level int,	
                                        is_post int,
                                        status varchar(100),
                                        flag  varchar(255),
                                        amountheader money,	
                                        amountdetail money,	
                                        amountsubdetail money,
                                        note varchar(255)
                 ) 
                INSERT INTO $this->_tmp
                Exec sp_accountvssub_read $this->_project_id,$this->_pt_id,''$fromdate'',''$untildate'',$statusposting
                SELECT * FROM $this->_tmp
                ";
        $result = $this->_model->customefromquery($sql);
        return $result[1];
    }

}
