<?php

class Gl_Models_Query_Copyjournal extends Zend_Db_Table_Abstract {

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
        //end parameter    
        //start table from db
        $this->_m_prefix = 'm_prefix';
        //end table from db
        //start create temporary for report        
        //end create temporary for report                
    }

    public function getprefixbycode($code) {
        $sql = "SELECT * FROM $this->_m_prefix 
                WHERE 
                    project_id=$this->_project_id
                    AND pt_id =$this->_pt_id 
                    AND active = 1
                    AND deleted = 0
                    AND prefix =''$code''
                ";
        $result = $this->_model->customefromquery($sql);
        return $result;
    }

}
