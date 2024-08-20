<?php

class Gl_Models_Query_Coa extends Zend_Db_Table_Abstract {

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
        $this->_m_kelsub = 'm_kelsub';
        //end table from db
        //start create temporary for report        
        //end create temporary for report                
    }
    public function getcoakelsubnotnull() {
        $sql = "SELECT * FROM $this->_m_coa 
                WHERE 
                    project_id=$this->_project_id
                    AND pt_id =$this->_pt_id 
                    AND active = 1
                    AND deleted = 0
                    AND kelsub_id is not null
                ";
        $result = $this->_model->customefromquery($sql);
        return $result;
    }
    public function getcoacashflow() {
        $sql = "
                SELECT 	
                    DISTINCT b.coa_id,c.coa,c.name
                FROM $this->_th_jurnal a
                LEFT JOIN $this->_td_jurnaldetail b ON a.journal_id = b.journal_id
                LEFT JOIN $this->_m_coa c ON b.coa_id = c.coa_id
                LEFT JOIN $this->_m_prefix d ON a.prefix_id = d.prefix_id
                WHERE 
                    a.project_id=$this->_project_id
                    AND a.pt_id =$this->_pt_id 
                    and d.is_cashflow = 1
                ORDER BY c.coa
                ";
        $result = $this->_model->customefromquery($sql);
        return $result;
    }
    public function getcoagrid() {
        $sql = "SELECT a.*,b.kelsub FROM $this->_m_coa a 
                LEFT JOIN $this->_m_kelsub b ON a.kelsub_id = b.kelsub_id
                WHERE 
                    a.project_id=$this->_project_id
                    AND a.pt_id =$this->_pt_id 
                    AND a.active = 1
                    AND a.deleted = 0
                ";
        $result = $this->_model->customefromquery($sql);
        return $result;
    }
    public function getcoagridkelsub($param) {
        $kelsub = $param['kelsub'];
        $sql = "SELECT a.*,b.kelsub FROM $this->_m_coa a 
                LEFT JOIN $this->_m_kelsub b ON a.kelsub_id = b.kelsub_id
                WHERE 
                    a.project_id=$this->_project_id
                    AND a.pt_id =$this->_pt_id 
                    AND a.active = 1
                    AND a.deleted = 0
                    AND b.kelsub =''$kelsub'' 
                ";
        $result = $this->_model->customefromquery($sql);
        return $result;
    }

    public function getcoaptbyuser($param) {

        $sql = "SELECT 
                a.*,a.name as ptname                            
                FROM dbmaster.dbo.m_projectpt b
                left join dbmaster.dbo.m_pt a on a.pt_id=b.pt_id                                        
                    WHERE 
                b.project_id in (
                select project_id from 
                dbmaster.dbo.m_multiproject mp 
                where mp.user_id=$this->_user_id
                and mp.deleted=0 
                ) and a.active=1
                ";
        $result = $this->_model->customefromquery($sql);
        $result[0][0]['RECORD_TOTAL'] = 0;
        return $result;
    }

   

}
