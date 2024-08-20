<?php

class Gl_Models_Query_Incomestatement_bak extends Zend_Db_Table_Abstract {

    protected $_schema;
    protected $_name;
    protected $session;

    function init() {
        date_default_timezone_set('Asia/Jakarta');    
        //start setup
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
        $this->_m_report = 'm_rptformat';
        $this->_m_coa = 'm_coa';
        $this->_m_rptformat = 'm_rptformat';
        $this->_tmp_rptincomestatement = 'tmp_rptincomestatement';
        //end table from db
        //start create temporary for report 
        $this->_tmp_template = '##tmp_templateinstallment_' . $this->_user_id;
        $this->_tmp_parent = '##tmp_parent' . $this->_user_id;       
        $this->_tmp_header = '##tmp_header' . $this->_user_id;
        $this->_tmp_rpt = '##tmp_rpt_' . $this->_user_id;
        //end create temporary for report                
    }
    
    public function getalldata_rptformat($param) {
        $report = $param['report'];
        $level = $param['level'];
        $sql = "
                        SELECT *,
                                 REPLACE(name, ''-'', '' '') as namecoa
                        FROM $this->_m_rptformat 
                        WHERE 
                        active = $this->_active
                        AND deleted = $this->_delete
                        AND project_id = $this->_project_id
                        AND pt_id = $this->_pt_id
                        AND report = ''$report''
                        AND report_level = $level  
          ";
        $result = $this->_model->customefromquery($sql);
        return $result[0];
    }
    
    function set_parent() {
        $sql = "
                IF OBJECT_ID(''tempdb..$this->_tmp_parent'') IS NOT NULL DROP TABLE $this->_tmp_parent
                    SELECT * INTO $this->_tmp_parent FROM
                    (  

                        SELECT  a.rpt_id,a.coa,a.name,a.flag,a.level,b.parent_code
                        FROM $this->_tmp_rptincomestatement a
                        INNER JOIN $this->_m_coa c ON a.coa = c.coa 
                        INNER JOIN (SELECT project_id,pt_id,coa as parent_code FROM $this->_m_coa) b ON a.coa = b.parent_code              
                        WHERE            
                            c.project_id=$this->_project_id AND c.pt_id=$this->_pt_id
                             AND b.project_id=$this->_project_id AND b.pt_id=$this->_pt_id 			          
                             AND c.parent_code is null	
                             
                        UNION ALL	

                        SELECT a.rpt_id,a.coa,a.name,a.flag,a.level,b.parent_code         
                        FROM $this->_tmp_rptincomestatement a
                        INNER JOIN $this->_m_coa b ON a.coa = b.coa              
                        WHERE
                            b.project_id=$this->_project_id
                           AND b.pt_id=$this->_pt_id 
                           AND b.parent_code is not null
	) AS DATA
        
            SELECT * FROM $this->_tmp_parent
        ";
        
        $record = $this->_model->customefromquery($sql);
        return $record[1];
    }
    
    
     public function count_tmp_rpt() {
        $sql = "SELECT COUNT(rpt_id) as counterdata FROM $this->_tmp_rptincomestatement";
        $result = $this->_model->customefromquery($sql);
        $counter = $result[0][0]['counterdata'];
        return $counter;
    }
    
    public function count_tmp_rpt_byuser() {
        $sql = "SELECT COUNT(rpt_id) as counterdata FROM $this->_tmp_rptincomestatement
                WHERE
                project_id = $this->_project_id 
                AND pt_id =$this->_pt_id 
                AND user_id = $this->_user_id
                ";
        $result = $this->_model->customefromquery($sql);
        $counter = $result[0][0]['counterdata'];
        return $counter;
    }

    public function truncate_tmp() {
        $sql = "TRUNCATE TABLE $this->_tmp_rptincomestatement ";
        $this->_model->customefromquery($sql);
    }

    public function delete_tmp() {
        $sql = "DELETE FROM $this->_tmp_rptincomestatement 
                WHERE
                project_id = $this->_project_id 
                AND pt_id =$this->_pt_id 
                AND user_id = $this->_user_id
                ";
        $this->_model->customefromquery($sql);
    }
    
     function insert_to_tmp($record) {
        $result = $this->_model->extract_array($record);
        $key = $result['key'];
        $values = $result['values'];
        $sql = "
                 INSERT INTO $this->_tmp_rptincomestatement ($key) VALUES ($values)  
               ";

        $this->_model->customefromquery($sql);
    }

    function update_tmp_reportbyid($report_id, $record) {
        $result = $this->_model->extract_array($record);
        $data = $result['setdata'];
        $sql = "
                 UPDATE $this->_tmp_rptincomestatement SET $data
                 WHERE 
                    project_id = $this->_project_id 
                    AND pt_id =$this->_pt_id 
                    AND user_id = $this->_user_id
                    AND rpt_id =$report_id
               ";
        $this->_model->customefromquery($sql);
    }
    
    

    function update_tmp_amount($coa, $record) {
        $result = $this->_model->extract_array($record);
        $data = $result['setdata'];
        $sql = "
                 UPDATE $this->_tmp_rptincomestatement SET $data
                 WHERE 
                    project_id = $this->_project_id 
                    AND pt_id =$this->_pt_id 
                    AND user_id = $this->_user_id
                    AND coa =$coa
                    AND flag=''I''    
               ";
        $this->_model->customefromquery($sql);
    }
    
    function get_rpt_forcalculate($param) {
        $level = $param['level'];      
    //    if ($level >='1' and $level <= '3') {
            $sql = "
                        SELECT 
                                *,
                                case when type=''C'' then coalesce(lastmonth_amount,0) else -(coalesce(lastmonth_amount,0)) end AS calculate_lastamount,
                                case when type=''C'' then coalesce(thismonth_amount,0) else -(coalesce(thismonth_amount,0)) end AS calculate_thisamount,
                                case when type=''C'' then coalesce(budget_amount,0) else -(coalesce(budget_amount,0)) end AS calculate_budgetamount,
                                case when type=''C'' then coalesce(lastyear_amount,0) else -(coalesce(lastyear_amount,0)) end AS calculate_lastyear
                        FROM $this->_tmp_rptincomestatement 
                        WHERE                      
                            project_id = $this->_project_id
                        AND pt_id = $this->_pt_id                      
                        AND user_id = $this->_user_id              
          ";
      //  } else {
//            $sql = "
//                        SELECT 
//                                *,
//                                coalesce(lastmonth_amount,0) AS calculate_lastamount,
//                                coalesce(thismonth_amount,0)  AS calculate_thisamount,
//                                coalesce(budget_amount,0) AS calculate_budgetamount,
//                                coalesce(lastyear_amount,0) AS calculate_lastyear
//                        FROM $this->_tmp_rptincomestatement 
//                        WHERE                      
//                            project_id = $this->_project_id
//                        AND pt_id = $this->_pt_id                      
//                        AND user_id = $this->_user_id              
//          ";
      //  }

        $result = $this->_model->customefromquery($sql);
        return $result[0];
    }
    
    
    function getparent(){
        $sql = "SELECT 
                 distinct parent_coa             
                 FROM $this->_tmp_rptincomestatement
                 WHERE
                         project_id=$this->_project_id
                   AND pt_id=$this->_pt_id 
                   AND user_id=$this->_user_id
                   AND flag IN (''I'',''T'')    
                   order by parent_coa desc                 
                 ";   
        
        $record = $this->_model->customefromquery($sql);
        return $record[0];                   
    }
    function get_amount_from_parent($coa){ 
        $sql = "SELECT                 
                 parent_coa,
                 SUM(calculate_lastmonth) AS total_lastmonth,
                 SUM(calculate_thismonth) AS total_thismonth,
                 SUM(calculate_budget) AS total_budget,
                 SUM(calculate_lastyear) AS total_lastyear
                 FROM $this->_tmp_rptincomestatement
                 WHERE
                         project_id=$this->_project_id
                   AND pt_id=$this->_pt_id 
                   AND user_id=$this->_user_id
                   AND parent_coa = ''$coa''
                   GROUP BY parent_coa                  
                 ";   
        
        $record = $this->_model->customefromquery($sql);
        return $record[0];                   
    }
    
    function get_coa_on_tmp($coa){ 
        $sql = "SELECT                 
                 TOP 1 *
                 FROM $this->_tmp_rptincomestatement
                 WHERE
                         project_id=$this->_project_id
                   AND pt_id=$this->_pt_id 
                   AND user_id=$this->_user_id
                   AND coa = ''$coa''
                 ";  
        $record = $this->_model->customefromquery($sql);
        return $record[0];                   
    }
    
    function update_tmp_totalamount($coa, $record) {
        $result = $this->_model->extract_array($record);
        $data = $result['setdata'];
        $sql = "
                 UPDATE $this->_tmp_rptincomestatement SET $data
                 WHERE 
                    project_id = $this->_project_id 
                    AND pt_id =$this->_pt_id 
                    AND user_id = $this->_user_id
                    AND coa =$coa
                    AND flag=''T''    
               ";
        $this->_model->customefromquery($sql);
    }
    function set_grand($name, $record) {
        $result = $this->_model->extract_array($record);
        $data = $result['setdata'];
        $sql = "
                 UPDATE $this->_tmp_rptincomestatement SET $data
                 WHERE 
                    project_id = $this->_project_id 
                    AND pt_id =$this->_pt_id 
                    AND user_id = $this->_user_id
                    AND name =''$name''
                    AND flag=''G''    
               ";
        $this->_model->customefromquery($sql);
    }
    
    function createdataforgrand($from,$until){
            $sql = "
                IF OBJECT_ID(''tempdb..$this->_tmp_header'') IS NOT NULL DROP TABLE $this->_tmp_header
                SELECT * INTO $this->_tmp_header FROM
                 ( 
                       SELECT 
                             *,
                             case when type=''C'' then  coalesce(calculate_lastmonth,0) else -(coalesce(calculate_lastmonth,0)) end AS factor_lastmonth,
                             case when type=''C'' then  coalesce(calculate_thismonth,0) else -(coalesce(calculate_thismonth,0)) end AS factor_thismonth,
                             case when type=''C'' then  coalesce(calculate_budget,0) else -(coalesce(calculate_budget,0)) end AS factor_budget,
                             case when type=''C'' then  coalesce(calculate_lastyear,0) else -(coalesce(calculate_lastyear,0)) end AS factor_lastyear
                             FROM $this->_tmp_rptincomestatement
                       WHERE 
                            project_id = $this->_project_id 
                            AND pt_id =$this->_pt_id 
                            AND user_id = $this->_user_id
                            and level=1
                            and flag=''T''

                     ) AS DATA
                     
                        SELECT
                            SUM(factor_lastmonth) AS grand_lastmonth,
                            SUM(factor_thismonth) AS grand_thismonth,
                            SUM(factor_budget) AS grand_budget,
                            SUM(factor_lastyear) AS grand_lastyear
                        FROM $this->_tmp_header
                        WHERE
                            coa BETWEEN ''$from'' and ''$until''
                 "; 
            $result = $this->_model->customefromquery($sql);
            return $result[1][0];
    }
    
//================================================================================================================
    public function getdata() {
        $sql ="
               IF OBJECT_ID(''tempdb..$this->_tmp_rpt'') IS NOT NULL DROP TABLE $this->_tmp_rpt
                    SELECT * INTO $this->_tmp_rpt FROM
                   ( 
                    SELECT *,
                           name as namecoa, 
                           format(coalesce(calculate_lastmonth,0), ''#,##0.00'') AS format_calculate_lastmonth,
                           format(coalesce(calculate_thismonth,0), ''#,##0.00'') AS format_calculate_thismonth,
                           format(coalesce(calculate_budget,0), ''#,##0.00'') AS format_calculate_budget,
                           format(coalesce(calculate_lastyear,0), ''#,##0.00'') AS format_calculate_lastyear
                    FROM $this->_tmp_rptincomestatement
                    WHERE
                    project_id = $this->_project_id 
                    AND pt_id =$this->_pt_id 
                    AND user_id = $this->_user_id                      
                 )AS DATA
                ";
        $this->_model->customefromquery($sql);
        $sql = "SELECT * FROM $this->_tmp_rpt";
        return $sql;
    }

}
