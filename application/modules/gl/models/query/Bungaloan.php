<?php

class Gl_Models_Query_Bungaloan extends Zend_Db_Table_Abstract {

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
        $this->_m_bungaloan = 'm_bungaloan';
        //end table from db
        //
        //start create temporary for report        
        //end create temporary for report                
    }

    public function txt($param) {
        return $this->_helper->textforquery($param);
    }

    function insertdata($record) {
        $result = $this->_model->extract_array($record);
        $key = $result['key'];
        $values = $result['values'];
        $sql = "
                 INSERT INTO $this->_m_bungaloan ($key) VALUES ($values)  
               ";
        $this->_model->customefromquery($sql);
    }

    function updatedata($id, $record) {
        $result = $this->_model->extract_array($record);
        $data = $result['setdata'];
        $sql = "
                 UPDATE $this->_m_bungaloan SET $data
                 WHERE 
                    project_id = $this->_project_id 
                    AND pt_id =$this->_pt_id 
                    AND bungaloan_id = $id
               ";
        $this->_model->customefromquery($sql);
    }

}
