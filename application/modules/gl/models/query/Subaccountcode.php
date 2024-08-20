<?php

class Gl_Models_Query_Subaccountcode extends Zend_Db_Table_Abstract {

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

    function getkelsub_in($kelsub_id) {
        $sql = "
        SELECT COUNT(a.subgl_id) AS RECORD_TOTAL FROM $this->_m_subgl a WITH (NOLOCK)
        INNER JOIN $this->_m_kelsub b ON a.kelsub_id = b.kelsub_id   
        WHERE
        a.active=1
        and a.deleted=0
        and a.project_id=$this->_project_id
        and a.pt_id=$this->_pt_id 
        and a.kelsub_id IN ($kelsub_id)                       

        SELECT a.*,b.kelsub,b.description as desckel FROM $this->_m_subgl a WITH (NOLOCK)
        INNER JOIN $this->_m_kelsub b ON a.kelsub_id = b.kelsub_id   
        WHERE
        a.active=1
        and a.deleted=0
        and a.project_id=$this->_project_id
        and a.pt_id=$this->_pt_id 
        and a.kelsub_id IN ($kelsub_id) 
        ORDER BY b.kelsub,a.code ASC         
        ";

        $result = $this->_model->customefromquery($sql);
        $return = null;
        if ($result[0][0]['RECORD_TOTAL'] > 0) {
            $return = $result;
        }
        return $return;
    }

    function getkelsub_inpt($pt_id) {
        $sql = "
        SELECT COUNT(a.subgl_id) AS RECORD_TOTAL FROM $this->_m_subgl a WITH (NOLOCK)
        INNER JOIN $this->_m_kelsub b ON a.kelsub_id = b.kelsub_id   
        WHERE
        a.active=1
        and a.deleted=0
                    --and a.project_id=$this->_project_id
                    and a.pt_id=$this->_pt_id                

                    SELECT a.*,b.kelsub,b.description as desckel FROM $this->_m_subgl a WITH (NOLOCK)
                    INNER JOIN $this->_m_kelsub b ON a.kelsub_id = b.kelsub_id   
                    WHERE
                    a.active=1
                    and a.deleted=0
                    --and a.project_id=$this->_project_id
                    and a.pt_id=$this->_pt_id 
                    ORDER BY b.kelsub,a.code ASC         
                    ";

                    $result = $this->_model->customefromquery($sql);
                    $return = null;
                    if ($result[0][0]['RECORD_TOTAL'] > 0) {
                        $return = $result;
                    }
                    return $return;
                }

                function getfiltersubgl($param) {

                    $fromcoa = $param['fromcoa'];
                    $untilcoa = $param['untilcoa'];
                    $fromkelsub = $param['fromkelsub'];
                    $untilkelsub = $param['untilkelsub'];
                    $kelsubid = $param['kelsub_id'];
                    $pt_id = $param['pt_id_owner'];

     /*   $sqlkel = "
                SELECT distinct(b.kelsub) FROM $this->_m_coa a
                INNER JOIN $this->_m_kelsub b ON a.kelsub_id = b.kelsub_id
                WHERE
                 a.active=1
                and a.deleted=0
                and a.project_id=$this->_project_id
                and a.pt_id=$this->_pt_id 
                and b.kelsub BETWEEN ''$fromkelsub''  AND ''$untilkelsub''
                and a.coa BETWEEN ''$fromcoa''  AND ''$untilcoa''
                ";

        $resultkel = $this->_model->customefromquery($sqlkel);
        $kelsubin = array();
        foreach ($resultkel[0] as $rowkel) {
            $kelsubin[] = "''" . $rowkel['kelsub'] . "''";
        }
        $kelsub = implode(",", $kelsubin);
        */

        $sql = "
        SELECT COUNT(a.subgl_id) AS RECORD_TOTAL FROM $this->_m_subgl a WITH (NOLOCK)
        INNER JOIN $this->_m_kelsub b ON a.kelsub_id = b.kelsub_id  
        WHERE
        a.active=1
        and a.deleted=0

        and a.pt_id=$pt_id
        and b.kelsub_id IN ($kelsubid)                      

        SELECT a.*,b.kelsub,b.description as desckel FROM $this->_m_subgl a WITH (NOLOCK)
        INNER JOIN $this->_m_kelsub b ON a.kelsub_id = b.kelsub_id   
        WHERE
        a.active=1
        and a.deleted=0

        and a.pt_id=$pt_id
        and b.kelsub_id IN ($kelsubid)                    
        ORDER BY b.kelsub,a.code ASC         
        ";




        $result = $this->_model->customefromquery($sql);
        $return = null;

        if ($result[0][0]['RECORD_TOTAL'] > 0) {
            $return = $result;
        }

        return $return;
    }

    function getfilterbysubgl($param) {

        $fromcoa = $param['fromcoa'];
        $untilcoa = $param['untilcoa'];
        $fromkelsub = $param['fromkelsub'];
        $untilkelsub = $param['untilkelsub'];
        $kelsubid = $param['kelsub_id'];
        $pt_id = $param['pt_id_owner'];
        $project_id = $param['project_id'];
        $type = $param['type'];
        $customCode = str_replace("'", "",$param['customCode']);

        if ($param['checkallsub'] == 1) {
            $kelsub = '';
        }else{
            $kelsub = 'and b.kelsub_id IN ('.$kelsubid.') ';
        }

        if ($customCode == "") {
            $code = '';
        }else{
            if ($kelsub != '' ) {
                $code = " AND (a.code LIKE ''%".$customCode."%'' OR a.description LIKE ''%".$customCode."%'')";
            }else{
                $code = " AND (a.code LIKE ''%".$customCode."%'' OR a.description LIKE ''%".$customCode."%'')";
            }
        }

        $sql = "
        SELECT TOP 50 COUNT(a.subgl_id) AS RECORD_TOTAL FROM $this->_m_subgl a WITH (NOLOCK)
        INNER JOIN $this->_m_kelsub b ON a.kelsub_id = b.kelsub_id  
        WHERE
        a.active=1
        and a.deleted=0
        and b.deleted=0
        and a.pt_id=$pt_id
        and a.project_id=$project_id
        $kelsub $code

        SELECT TOP 50 a.*,b.kelsub,b.description as desckel FROM $this->_m_subgl a WITH (NOLOCK)
        INNER JOIN $this->_m_kelsub b ON a.kelsub_id = b.kelsub_id   
        WHERE
        a.active=1
        and a.deleted=0
        and b.deleted=0
        and a.pt_id=$pt_id
        and a.project_id=$project_id
        $kelsub $code ";

        // echo $sql;
        // exit();

        $result = $this->_model->customefromquery($sql);
        $return = null;

        if ($result[0][0]['RECORD_TOTAL'] > 0) {
            $return = $result;
        }

        return $return;
    }

    function getfilterSubbyCode1($param) {

        $fromcoa = $param['fromcoa'];
        $untilcoa = $param['untilcoa'];
        $fromkelsub = $param['fromkelsub'];
        $untilkelsub = $param['untilkelsub'];
        $kelsubid = $param['kelsub_id'];
        $pt_id = $param['pt_id_owner'];
        $project_id = $param['project_id'];
        $type = $param['type'];
        $customCode1 = str_replace("'", "",$param['customCode1']);
        $customCode2 = str_replace("'", "",$param['customCode2']);

        if ($param['checkallsub'] == 1) {
            $kelsub = '';
        }else{
            $kelsub = 'and b.kelsub_id IN ('.$kelsubid.') ';
        }

        if ($customCode1 == "" || $customCode2 == "") {
            $code = '';
        }else{
            if ($kelsub != '' ) {
                $code = " AND a.code1 BETWEEN ''".$customCode1."'' AND ''".$customCode2."''";
            }else{
                $code = " a.code1 BETWEEN ''".$customCode1."'' AND ''".$customCode2."''";
            }
        }

        $sql = "
        SELECT TOP 50 COUNT(a.subgl_id) AS RECORD_TOTAL FROM $this->_m_subgl a WITH (NOLOCK)
        INNER JOIN $this->_m_kelsub b ON a.kelsub_id = b.kelsub_id  
        WHERE
        a.active=1
        and a.deleted=0
        and b.deleted=0
        and a.pt_id=$pt_id
        and a.project_id=$project_id
        $kelsub $code

        SELECT DISTINCT REPLACE(REPLACE(REPLACE(code2, '' '', ''''), CHAR(13), ''''), CHAR(10), '''') as code2 FROM $this->_m_subgl a
        INNER JOIN $this->_m_kelsub b ON a.kelsub_id = b.kelsub_id   
        WHERE
        a.active=1
        and a.code2 != ''''
        and a.deleted=0
        and b.deleted=0
        and a.pt_id=$pt_id
        and a.project_id=$project_id
        $kelsub $code ";
        $result = $this->_model->customefromquery($sql);
        $return = null;

        if ($result[0][0]['RECORD_TOTAL'] > 0) {
            $return = $result;
        }

        return $return;
    }

    

}
