<?php

class Gl_Models_Query_Offset extends Zend_Db_Table_Abstract {

    protected $_schema;
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
        $this->_m_coa = 'm_coa';
        $this->_m_kelsub = 'm_kelsub';
        $this->_m_subgl = 'm_subgl';
        $this->_m_prefix = 'm_prefix';
        $this->_th_summary = 'th_summary';
        $this->_th_jurnal = 'th_jurnal';
        $this->_td_jurnaldetail = 'td_jurnaldetail';
        $this->_td_jurnalsubdetail = 'td_jurnalsubdetail';
        $this->_tmp_rpt = 'tmp_rptoffset';
        //end table from db
        //start create temporary for report 
        $this->_tmp_datadebet = '##tmp_datadebet_' . $this->_user_id;
        $this->_tmp_datacredit = '##tmp_datacredit_' . $this->_user_id;
        $this->_tmp_sumsub = '##tmp_sumsubgl_' . $this->_user_id;
        $this->_tmp_sumsubgrid = '##tmp_sumsubglgrid_' . $this->_user_id;
        $this->_tmp_sumkelsub = '##tmp_sumkelsub_' . $this->_user_id;
        //end create temporary for report                
    }

    public function truncatedata() {
        $sql = "TRUNCATE TABLE $this->_tmp_rpt";
        $this->_model->customefromquery($sql);
    }

    public function createdata($param) {
        $debet = $param['datadebet'];
        $credit = $param['datacredit'];
        $month = $param['month'];
        $this->datadebet($debet, $month);
        $this->datacredit($credit, $month);
    }

    function datadebet($coa, $month) {
        $sql = "    
                IF OBJECT_ID(''tempdb..$this->_tmp_datadebet'') IS NOT NULL DROP TABLE $this->_tmp_datadebet
                SELECT * INTO $this->_tmp_datadebet FROM
                 ( 
            
                    SELECT 
			a.project_id,a.pt_id,''D'' AS flaggrid,$this->_user_id as user_id,g.prefix,a.voucher_no,a.voucher_date,b.coa,d.parent_code as parent_coa ,d.name AS coaname,d.type as coatype,b.type as trxtype,
			b.kelsub,f.description as keldesc,b.amount as amount_debet,0 as amount_credit,b.keterangan as trxdesc,
			c.code,e.description as subgldesc,c.keterangan as subdesc,c.amount as amountsub,
                        b.coa_id,b.kelsub_id,c.subgl_id
                    FROM $this->_th_jurnal a
                    INNER JOIN $this->_td_jurnaldetail b ON a.journal_id  = b.journal_id
                    INNER JOIN $this->_td_jurnalsubdetail c ON b.journaldetail_id = c.journaldetail_id	
                    LEFT JOIN $this->_m_prefix g ON g.prefix_id = a.prefix_id	
                    LEFT JOIN $this->_m_coa d ON b.coa_id = d.coa_id
                    LEFT JOIN $this->_m_kelsub f ON b.kelsub_id = f.kelsub_id
                    LEFT JOIN $this->_m_subgl e ON c.subgl_id = e.subgl_id	
                    WHERE
                            a.active =1
                            and a.deleted =0
                            and a.project_id = $this->_project_id
                            and a.pt_id = $this->_pt_id
                            and b.coa IN ($coa)		
                            and MONTH(a.voucher_date) <= $month	
                           -- and a.voucher_no not in(''MJ0001/01'')  
                                
                  ) AS DATA                  
                ";
        $this->_model->customefromquery($sql);
    }

    function datacredit($coa, $month) {
        $sql = "
                IF OBJECT_ID(''tempdb..$this->_tmp_datacredit'') IS NOT NULL DROP TABLE $this->_tmp_datacredit
                SELECT * INTO $this->_tmp_datacredit FROM
                 ( 
                    SELECT 
			a.project_id,a.pt_id,''C'' AS flaggrid,$this->_user_id as user_id,g.prefix,a.voucher_no,a.voucher_date,b.coa,d.parent_code as parent_coa,d.name AS coaname,d.type as coatype,b.type as trxtype,
			b.kelsub,f.description as keldesc,b.amount as amount_debet,0 as amount_credit,b.keterangan as trxdesc,
			c.code,e.description as subgldesc,c.keterangan as subdesc,c.amount as amountsub,
                        b.coa_id,b.kelsub_id,c.subgl_id
                    FROM $this->_th_jurnal a
                    INNER JOIN $this->_td_jurnaldetail b ON a.journal_id  = b.journal_id
                    INNER JOIN $this->_td_jurnalsubdetail c ON b.journaldetail_id = c.journaldetail_id	
                    LEFT JOIN $this->_m_prefix g ON g.prefix_id = a.prefix_id	
                    LEFT JOIN $this->_m_coa d ON b.coa_id = d.coa_id
                    LEFT JOIN $this->_m_kelsub f ON b.kelsub_id = f.kelsub_id
                    LEFT JOIN $this->_m_subgl e ON c.subgl_id = e.subgl_id	
                    WHERE
                            a.active =1
                            and a.deleted =0
                            and a.project_id = $this->_project_id
                            and a.pt_id = $this->_pt_id
                            and b.coa IN ($coa)		
                            and MONTH(a.voucher_date) <= $month
                            --and a.voucher_no not in(''MJ0001/01'')
                                
                   ) AS DATA             
                ";
        $this->_model->customefromquery($sql);
    }

    function setselect($flag) {
        if ($flag == 'account') {
            $data = "SELECT 
                            project_id,pt_id,user_id,coa as accdesc,coaname as accdate,
                            coa_id,coa,parent_coa,coaname,coatype, 1 as position,
                            flaggrid,''account'' as flagstatus                            
                     ";
        } else if ($flag == 'kelsub') {
            $data = "SELECT 
                            project_id,pt_id,user_id,kelsub as accdesc,keldesc as accdate,
                            coa_id,coa,parent_coa,coaname,coatype,kelsub_id,kelsub,keldesc, 
                            2 as position,flaggrid,''kelsub'' as flagstatus 
               
                    ";
        } else if ($flag == 'subgl') {
            $data = "SELECT 
                            project_id,pt_id,user_id,code as accdesc,subgldesc as accdate,
                            coa_id,coa,parent_coa,coaname,coatype,kelsub_id,kelsub,keldesc,subgl_id,code,subgldesc, 
                            3 as position,flaggrid,''subgl'' as flagstatus 
               
                    ";
        } else if ($flag == 'subdetail') {
            $data = "SELECT 
                            project_id,pt_id,user_id,voucher_no as accdesc,voucher_date as accdate,
                            coa_id,coa,parent_coa,coaname,coatype,trxtype,kelsub_id,kelsub,keldesc,subgl_id,code,subgldesc,subdesc,
                            case when trxtype=''D'' then coalesce(amountsub,0) else -(coalesce(amountsub,0)) end AS amount,
                            4 as position,flaggrid,''subdetail'' as flagstatus                
                    ";
        }
        return $data;
    }

    function setwhere() {
        $data = "
                     WHERE
                        user_id = $this->_user_id
                        and project_id=$this->_project_id    
                        and pt_id=$this->_pt_id
                 ";
        return $data;
    }

    function setgroupby($flag) {
        if ($flag == 'account') {
            $data = "GROUP BY 
                            project_id,pt_id,user_id,
                            coa_id,coa,parent_coa,coaname,coatype,flaggrid
                      ORDER BY coa                    
                     ";
        } else if ($flag == 'kelsub') {
            $data = "GROUP BY 
                            project_id,pt_id,user_id,
                            coa_id,coa,parent_coa,coaname,coatype,kelsub_id,kelsub,keldesc,flaggrid 
                     ORDER BY coa,kelsub       
                    ";
        } else if ($flag == 'subgl') {
            $data = "GROUP BY 
                            project_id,pt_id,user_id,
                            coa_id,coa,parent_coa,coaname,coatype,kelsub_id,kelsub,keldesc,subgl_id,code,subgldesc,flaggrid 
                     ORDER BY coa,kelsub,code       
                    ";
        } else {
            $data = "ORDER BY voucher_date,voucher_no";
        }

        return $data;
    }

    function getdataforgriddebet($flag) {
        $select = $this->setselect($flag);
        $where = $this->setwhere();
        $groupby = $this->setgroupby($flag);
        $sql = " $select FROM $this->_tmp_datadebet 
                 $where
                 $groupby                     
                ";
        $result = $this->_model->customefromquery($sql);
        return $result[0];
    }

    function getdataforgridcredit($flag) {
        $select = $this->setselect($flag);
        $where = $this->setwhere();
        $groupby = $this->setgroupby($flag);
        $sql = " $select FROM $this->_tmp_datacredit 
                 $where
                 $groupby      
                ";
        $result = $this->_model->customefromquery($sql);
        return $result[0];
    }

    function insert_to_tmp($record) {
        $result = $this->_model->extract_array($record);
        $key = $result['key'];
        $values = $result['values'];
        $sql = "
                 INSERT INTO $this->_tmp_rpt ($key) VALUES ($values)  
               ";
        $this->_model->customefromquery($sql);
    }
     
    function set_totalsub() {
        $sql = "
                 IF OBJECT_ID(''tempdb..$this->_tmp_sumsub'') IS NOT NULL DROP TABLE $this->_tmp_sumsub
                 SELECT * INTO $this->_tmp_sumsub FROM
                 ( 
					select 
                                            project_id,pt_id,user_id,flaggrid,coa_id,coa,kelsub_id,kelsub,subgl_id,code,
                                            coalesce(sum(amount),0) as totalsub 
					from $this->_tmp_rpt
					where 
                                              project_id = $this->_project_id 
                                            AND pt_id =$this->_pt_id 
                                            AND user_id = $this->_user_id
                                            AND kelsub is not null 
                                            AND code is not null
					group by 
                                            project_id,pt_id,user_id,flaggrid,coa_id,coa,kelsub_id,kelsub,subgl_id,code
					
                    ) AS DATA
                    
                  SELECT * FROM $this->_tmp_sumsub
                  WHERE
                        project_id = $this->_project_id 
                    AND pt_id =$this->_pt_id 
                    AND user_id = $this->_user_id
                  ORDER BY 
                    flaggrid desc,kelsub,code
            ";
        $result = $this->_model->customefromquery($sql);
        return $result[1];
    }
    function set_totalkelsub() {
        $sql = "
                 IF OBJECT_ID(''tempdb..$this->_tmp_sumkelsub'') IS NOT NULL DROP TABLE $this->_tmp_sumkelsub
                 SELECT * INTO $this->_tmp_sumkelsub FROM
                  ( 
			
                    SELECT a.project_id,a.pt_id,a.user_id,a.flaggrid,a.coa_id,a.coa,a.kelsub_id,a.kelsub,a.coatype,
                           case when a.coatype=''D'' then coalesce(sum(amounttotalsub),0) else -coalesce(sum(amounttotalsub),0) end as totalkelsub
                    FROM $this->_tmp_rpt a
                    WHERE 
                            a.project_id = $this->_project_id 
                        AND a.pt_id =$this->_pt_id 
                        AND a.user_id = $this->_user_id
                        AND kelsub_id is not null    
                    GROUP BY 
                            a.project_id,a.pt_id,a.user_id,a.flaggrid,a.coa_id,a.coa,a.coatype,a.kelsub_id,a.kelsub
                    ) AS DATA
                    
                  SELECT * FROM $this->_tmp_sumkelsub
                  WHERE
                        project_id = $this->_project_id 
                    AND pt_id =$this->_pt_id 
                    AND user_id = $this->_user_id
                  ORDER BY                   
                    flaggrid desc,coa,kelsub asc
            ";
        $result = $this->_model->customefromquery($sql);
        return $result[1];
    }
    function set_totalsubgrid($flaggrid) {
        $sql = "
                  SELECT project_id,pt_id,user_id,flaggrid,kelsub_id,kelsub,subgl_id,code,
                  coalesce(SUM(amounttotalsub),0) as totalsubgrid
                  FROM $this->_tmp_rpt 
                  WHERE 
                     project_id = $this->_project_id 
                    AND pt_id =$this->_pt_id 
                    AND user_id = $this->_user_id
                    AND flaggrid=''$flaggrid''
                    AND kelsub_id is not null
                    AND subgl_id is not null
                    AND position = 3
                  GROUP  BY 
                        project_id,pt_id,user_id,flaggrid,kelsub_id,kelsub,subgl_id,code     
                  ORDER BY 
                            flaggrid desc,
                            kelsub,code asc                            
            ";
        $result = $this->_model->customefromquery($sql);
        return $result[0];
    }
    function set_totalkelsubgrid($flaggrid) {
        $sql = "
                  SELECT project_id,pt_id,user_id,flaggrid,kelsub_id,kelsub,
                  coalesce(SUM(amounttotal_kelsub),0) as totalkelsubgrid
                  FROM $this->_tmp_rpt 
                  WHERE 
                     project_id = $this->_project_id 
                    AND pt_id =$this->_pt_id 
                    AND user_id = $this->_user_id
                    AND flaggrid=''$flaggrid''
                    AND kelsub_id is not null                  
                    AND position = 2
                  GROUP  BY 
                        project_id,pt_id,user_id,flaggrid,kelsub_id,kelsub     
                  ORDER BY 
                            flaggrid desc,
                            kelsub asc                            
            ";
        $result = $this->_model->customefromquery($sql);
        return $result[0];
    }
    
    function set_totalaccount() {
        $sql = "
                  SELECT project_id,pt_id,user_id,flaggrid,coa_id,coa,
                  coalesce(SUM(amounttotal_kelsub),0) as totalaccount
                  FROM $this->_tmp_rpt 
                  WHERE 
                     project_id = $this->_project_id 
                    AND pt_id =$this->_pt_id 
                    AND user_id = $this->_user_id
                    AND kelsub_id is not null
                    AND position = 2
                  GROUP  BY 
                        project_id,pt_id,user_id,flaggrid,coa_id,coa     
                  ORDER BY 
                            flaggrid desc,
                            coa asc                            
            ";
        $result = $this->_model->customefromquery($sql);
        return $result[0];
    }
    function set_totalaccountgrid() {
        $sql = "
                  SELECT project_id,pt_id,user_id,flaggrid,
                  coalesce(SUM(amounttotal_account),0) as totalaccountgrid
                  FROM $this->_tmp_rpt 
                  WHERE 
                     project_id = $this->_project_id 
                    AND pt_id =$this->_pt_id 
                    AND user_id = $this->_user_id
                    AND coa_id is not null
                    AND position = 1
                  GROUP  BY 
                        project_id,pt_id,user_id,flaggrid
                  ORDER BY 
                            flaggrid desc
                                                     
            ";
        $result = $this->_model->customefromquery($sql);
        return $result[0];
    }
    
    function update_for_amounttotalsub($flaggrid,$coa_id,$kelsub_id,$subgl_id, $record) {
        $result = $this->_model->extract_array($record);
        $data = $result['setdata'];
        $sql = "
                 UPDATE $this->_tmp_rpt SET $data
                 WHERE 
                    project_id = $this->_project_id 
                    AND pt_id =$this->_pt_id 
                    AND user_id = $this->_user_id
                    AND flaggrid = ''$flaggrid''  
                    AND coa_id = $coa_id  
                    AND kelsub_id = $kelsub_id  
                    AND subgl_id = $subgl_id  
                    AND position =3 
               ";
        $this->_model->customefromquery($sql);
    }
    function update_for_amounttotalsubgrid($flaggrid,$kelsub_id,$subgl_id, $record) {
        $result = $this->_model->extract_array($record);
        $data = $result['setdata'];
        $sql = "
                 UPDATE $this->_tmp_rpt SET $data
                 WHERE 
                    project_id = $this->_project_id 
                    AND pt_id =$this->_pt_id 
                    AND user_id = $this->_user_id
                    AND flaggrid = ''$flaggrid''  
                    AND kelsub_id = $kelsub_id  
                    AND subgl_id = $subgl_id  
                    AND position =3 
               ";
        $this->_model->customefromquery($sql);
    }
    function update_for_amounttotal_kelsub($flaggrid,$coa_id,$kelsub_id, $record) {
        $result = $this->_model->extract_array($record);
        $data = $result['setdata'];
        $sql = "
                 UPDATE $this->_tmp_rpt SET $data
                 WHERE 
                    project_id = $this->_project_id 
                    AND pt_id =$this->_pt_id 
                    AND user_id = $this->_user_id
                    AND flaggrid = ''$flaggrid''  
                    AND coa_id = $coa_id  
                    AND kelsub_id = $kelsub_id  
                    AND position =2
               ";
        $this->_model->customefromquery($sql);
    }
    function update_for_amounttotal_kelsubgrid($flaggrid,$kelsub_id, $record) {
        $result = $this->_model->extract_array($record);
        $data = $result['setdata'];
        $sql = "
                 UPDATE $this->_tmp_rpt SET $data
                 WHERE 
                    project_id = $this->_project_id 
                    AND pt_id =$this->_pt_id 
                    AND user_id = $this->_user_id
                    AND flaggrid = ''$flaggrid''  
                    AND kelsub_id = $kelsub_id  
                    AND position =2
               ";
        $this->_model->customefromquery($sql);
    }
    function update_for_amounttotal_account($flaggrid,$coa_id, $record) {
        $result = $this->_model->extract_array($record);
        $data = $result['setdata'];
        $sql = "
                 UPDATE $this->_tmp_rpt SET $data
                 WHERE 
                    project_id = $this->_project_id 
                    AND pt_id =$this->_pt_id 
                    AND user_id = $this->_user_id
                    AND flaggrid = ''$flaggrid''  
                    AND coa_id = $coa_id  
                    AND position =1
               ";
        $this->_model->customefromquery($sql);
    }
    function update_for_amounttotal_accountgrid($flaggrid, $record) {
        $result = $this->_model->extract_array($record);
        $data = $result['setdata'];
        $sql = "
                 UPDATE $this->_tmp_rpt SET $data
                 WHERE 
                    project_id = $this->_project_id 
                    AND pt_id =$this->_pt_id 
                    AND user_id = $this->_user_id
                    AND flaggrid = ''$flaggrid''  
                    AND position =1
               ";
        $this->_model->customefromquery($sql);
    }
    
    function get_rptbycoaid($coa_id){
        $sql = "SELECT TOP 1 * 
                FROM $this->_tmp_rpt    
                WHERE    
                     project_id = $this->_project_id 
               AND pt_id =$this->_pt_id 
               AND user_id = $this->_user_id
               AND coa_id = $coa_id    
               ";
      
         $result = $this->_model->customefromquery($sql);
         return $result[0][0];
    }

}
