<?php

class Gl_Models_Query_Cashflow extends Zend_Db_Table_Abstract {

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
        $this->_m_prefix = 'm_prefix';
        $this->_th_summary = 'th_summary';
        $this->_th_jurnal = 'th_jurnal';
        $this->_td_jurnaldetail = 'td_jurnaldetail';
        //end table from db
        //start create temporary for report 
        $this->_tmp_coaheader = '##tmp_coaheader_' . $this->_user_id;
        $this->_tmp_coachield = '##tmp_coachield_' . $this->_user_id;
        $this->_tmp_debet = '##tmp_debet_' . $this->_user_id;
        $this->_tmp_credit = '##tmp_credit_' . $this->_user_id;
        $this->_tmp_debetcredit = '##tmp_debetcredit_' . $this->_user_id;
        $this->_tmp_net = '##tmp_net_' . $this->_user_id;
        $this->_tmp_header = '##tmp_header_' . $this->_user_id;
        $this->_tmp_generate = '##tmp_generate_' . $this->_user_id;
        $this->_tmp_rpt = '##tmp_rpt_' . $this->_user_id;
        //end create temporary for report                
    }

    public function calculatedata($param) {
        $condition = $param['statusdetail'];
        $fromcoa = $param['fromcoa'];
        $untilcoa = $param['untilcoa'];
        $fromdate = date('Y-m-d', strtotime($param['fromdate']));
        $untildate = date('Y-m-d', strtotime($param['untildate']));

        $sql = "
                IF OBJECT_ID(''tempdb..$this->_tmp_coaheader'') IS NOT NULL DROP TABLE $this->_tmp_coaheader
                    SELECT * INTO $this->_tmp_coaheader FROM
                    (
                        SELECT 	
                         DISTINCT a.project_id,a.pt_id,a.is_post,b.coa_id,c.coa,c.name,c.type as coatype
                        FROM $this->_th_jurnal a
                        LEFT JOIN $this->_td_jurnaldetail b ON a.journal_id = b.journal_id
                        LEFT JOIN $this->_m_coa c ON b.coa_id = c.coa_id
                        LEFT JOIN $this->_m_prefix d ON a.prefix_id = d.prefix_id
                        WHERE 
                            a.project_id=$this->_project_id
                            AND a.pt_id =$this->_pt_id			
                            AND d.is_cashflow = 1 		
                            AND a.is_post = 1	
                            AND c.deleted = 0
                            AND c.active = 1  					
                            AND a.voucher_date BETWEEN ''$fromdate'' AND ''$untildate''
                            AND b.coa BETWEEN ''$fromcoa'' AND ''$untilcoa''
                    ) AS DATA
                    

                    IF OBJECT_ID(''tempdb..$this->_tmp_coachield'') IS NOT NULL DROP TABLE $this->_tmp_coachield
                    SELECT * INTO $this->_tmp_coachield FROM
                    (
                        SELECT 	
                            b.journaldetail_id,a.project_id,a.pt_id,a.is_post,a.voucher_no,a.voucher_date,b.coa_id,c.coa,c.name,c.type as coatype,''I'' as flag,b.type as typetrx,
                            case when b.type=''D'' then b.amount else 0 end as amount_debet,
                            case when b.type=''C'' then b.amount else 0 end as amount_credit,
                            b.keterangan
                        FROM $this->_th_jurnal a
                        LEFT JOIN $this->_td_jurnaldetail b ON a.journal_id = b.journal_id
                        LEFT JOIN $this->_m_coa c ON b.coa_id = c.coa_id
                        LEFT JOIN $this->_m_prefix d ON a.prefix_id = d.prefix_id
                        WHERE 
                            a.project_id=$this->_project_id
                            AND a.pt_id =$this->_pt_id			
                            AND d.is_cashflow = 1 		
                            AND a.is_post = 1	
                            AND c.deleted = 0
                            AND c.active = 1  					
                            AND a.voucher_date BETWEEN ''$fromdate'' AND ''$untildate''
                            AND b.coa BETWEEN ''$fromcoa'' AND ''$untilcoa''		  
                       ) AS DATA        

                       
                       IF OBJECT_ID(''tempdb..$this->_tmp_debet'') IS NOT NULL DROP TABLE $this->_tmp_debet
                        SELECT * INTO $this->_tmp_debet FROM
                        (		
                            SELECT 
                                    a.coa,
                                    coalesce(sum(a.amount),0) as total_amount
                            FROM $this->_td_jurnaldetail a
                            INNER JOIN $this->_tmp_coaheader b ON  a.coa =b.coa
                            LEFT JOIN $this->_th_jurnal c ON  a.journal_id =c.journal_id
                            LEFT JOIN $this->_m_prefix d ON c.prefix_id = d.prefix_id
                            WHERE
                            a.project_id = $this->_project_id
                            and a.pt_id = $this->_pt_id
                            and a.is_post = 1
                            and a.active = 1
                            and a.deleted = 0
                            and a.type=''D''
                            and d.is_cashflow = 1
                            and c.voucher_date BETWEEN ''$fromdate'' AND ''$untildate''
                            group by a.coa
                        )AS DATA
                        
                        IF OBJECT_ID(''tempdb..$this->_tmp_credit'') IS NOT NULL DROP TABLE $this->_tmp_credit
                        SELECT * INTO $this->_tmp_credit FROM
                        (		
                            SELECT 
                                    a.coa,
                                    -coalesce(sum(a.amount),0) as total_amount
                            FROM $this->_td_jurnaldetail a
                            INNER JOIN $this->_tmp_coaheader b ON  a.coa =b.coa
                            LEFT JOIN $this->_th_jurnal c ON  a.journal_id =c.journal_id
                            LEFT JOIN $this->_m_prefix d ON c.prefix_id = d.prefix_id
                            WHERE
                            a.project_id = $this->_project_id
                            and a.pt_id = $this->_pt_id
                            and a.is_post = 1
                            and a.active = 1
                            and a.deleted = 0
                            and a.type=''C''
                            and d.is_cashflow = 1
                            and c.voucher_date BETWEEN ''$fromdate'' AND ''$untildate''
                            group by a.coa
                        )AS DATA
                        

                        IF OBJECT_ID(''tempdb..$this->_tmp_debetcredit'') IS NOT NULL DROP TABLE $this->_tmp_debetcredit
                        SELECT * INTO $this->_tmp_debetcredit FROM
                        (
                                SELECT * FROM $this->_tmp_debet
                                UNION ALL
                                SELECT * FROM $this->_tmp_credit
                        ) AS DATA
                        
                        IF OBJECT_ID(''tempdb..$this->_tmp_net'') IS NOT NULL DROP TABLE $this->_tmp_net
                        SELECT * INTO $this->_tmp_net FROM
                        (
                            SELECT coa,
                                   SUM(total_amount) as amount_net
                           FROM $this->_tmp_debetcredit	 
                           GROUP BY coa	
                        ) AS DATA    
                        
                        IF OBJECT_ID(''tempdb..$this->_tmp_header'') IS NOT NULL DROP TABLE $this->_tmp_header
                        SELECT * INTO $this->_tmp_header FROM
                        (
                            SELECT 
                            b.*,''H'' as flag,
                            c.total_amount as sum_debet,d.total_amount as sum_credit,a.amount_net
                            FROM $this->_tmp_net a
                            INNER JOIN $this->_tmp_coaheader b on a.coa = b.coa
                            LEFT JOIN $this->_tmp_debet c on b.coa = c.coa
                            LEFT JOIN $this->_tmp_credit d on b.coa = d.coa
                        ) AS DATA
                        

                        IF OBJECT_ID(''tempdb..$this->_tmp_generate'') IS NOT NULL DROP TABLE $this->_tmp_generate
                        CREATE TABLE $this->_tmp_generate(
                           rpt_id int identity primary key,
                           sort int,
                           project_id int,
                           pt_id int, 
                           coa_id int,   
                           coa varchar(max),
                           accvoucher varchar(max),
                           accdate varchar(max),   
                           description varchar(max),
                           flag varchar(1),
                           amount_debet money,
                           amount_credit money,
                           amount_net money
                        );
                        


                        declare @sort int = 1				  
                        declare @increment int = 1				  
                        declare @counter int = 0
                        declare @project_id int = 0	
                        declare @pt_id int = 0	
                        declare @coa_id int = 0	
                        declare @coa varchar(max) = null 
                        declare @accno varchar(max) = null   
                        declare @accdate varchar(max) = null 
                        declare @description varchar(max) = null 
                        declare @flag varchar(max) = null 
                        declare @amount_debet money = 0 
                        declare @amount_credit money = 0 
                        declare @amount_net money = 0 


                    SET @counter =  (SELECT COUNT(coa) FROM $this->_tmp_header)
                    WHILE (@increment<=@counter)
                    BEGIN
                        SELECT  
			 @project_id = project_id,	
			 @pt_id = pt_id,	
			 @coa_id = coa_id,	
			 @coa = coa, 
			 @accno = coa,   
			 @accdate = name,   
			 @description= null, 
			 @flag = flag, 
			 @amount_debet = sum_debet,
			 @amount_credit = sum_credit, 
			 @amount_net = amount_net
                    FROM $this->_tmp_header order by coa desc

                INSERT INTO $this->_tmp_generate
                    (sort,project_id,pt_id,coa_id,coa,accvoucher,accdate,description,flag,amount_debet,amount_credit,amount_net)VALUES
                    (@sort,@project_id,@pt_id,@coa_id,@coa,@accno,@accdate,@description,@flag,COALESCE(@amount_debet,0),COALESCE(ABS(@amount_credit),0),COALESCE(@amount_net,0))	


                                        declare @incrementsub int = 1				  
                                        declare @countersub int = 0
                                        declare @project_idsub int = 0	
                                        declare @pt_idsub int = 0	
                                        declare @coa_idsub int = 0	
                                        declare @coasub varchar(max) = null 
                                        declare @accnosub varchar(max) = null   
                                        declare @accdatesub varchar(max) = null 
                                        declare @descriptionsub varchar(max) = null 
                                        declare @flagsub varchar(max) = null 
                                        declare @amount_debetsub money = 0 
                                        declare @amount_creditsub money = 0 
                                        declare @amount_netsub money = 0 
                                        declare @journaldetail_id int =0

                                            SET @countersub =  (SELECT COUNT(coa) from $this->_tmp_coachield where coa=@coa)
                                            WHILE (@incrementsub<=@countersub)
                                            BEGIN
                                             SELECT  
                                                    @journaldetail_id = journaldetail_id,
                                                    @project_idsub = project_id,	
                                                    @pt_idsub = pt_id,	
                                                    @coa_idsub = coa_id,			
                                                    @accnosub = voucher_no,   
                                                    @accdatesub = voucher_date,   
                                                    @descriptionsub= keterangan, 
                                                    @flagsub = flag, 
                                                    @amount_debetsub = amount_debet,
                                                    @amount_creditsub = amount_credit, 
                                                    @amount_netsub = 0
                                            FROM $this->_tmp_coachield 
                                            WHERE 
                                                    coa = @coa
                                            ORDER  BY journaldetail_id desc

                                            INSERT INTO $this->_tmp_generate
                                                (sort,project_id,pt_id,coa_id,coa,accvoucher,accdate,description,flag,amount_debet,amount_credit,amount_net)VALUES
                                                (@sort,@project_idsub,@pt_idsub,@coa_idsub,@coa,@accnosub,@accdatesub,@descriptionsub,@flagsub,COALESCE(@amount_debetsub,0),COALESCE(ABS(@amount_creditsub),0),COALESCE(@amount_netsub,0))	

                                            SET @incrementsub=@incrementsub+1
                                            DELETE FROM $this->_tmp_coachield WHERE journaldetail_id = @journaldetail_id
                                            END

                            SET @increment=@increment+1
                            SET @sort=@sort+1
                            DELETE FROM $this->_tmp_header WHERE coa = @coa
                            END  
                            

                                declare @grand_debet as money = 0
                                declare @grand_credit as money = 0
                                declare @grand_net as money = 0

                                set @grand_debet = (select coalesce(sum(amount_debet),0) from $this->_tmp_generate where flag=''H'')
                                set @grand_credit = (select coalesce(sum(amount_credit),0) from $this->_tmp_generate where flag=''H'')
                                set @grand_net = (select coalesce(sum(amount_debet),0) - coalesce(sum(amount_credit),0) from $this->_tmp_generate where flag=''H'')

                                INSERT INTO $this->_tmp_generate
                                (sort,project_id,pt_id,accdate,flag,amount_debet,amount_credit,amount_net)VALUES
                                (@sort+1,$this->_project_id,$this->_pt_id,''$this->_curdate'',''T'',COALESCE(@grand_debet,0),COALESCE(@grand_credit,0),COALESCE(@grand_net,0))
            
             ";

        $this->_model->customefromquery($sql);
        
//        $sqlgrand = "
//                declare @grand_debet as money = 0
//                declare @grand_credit as money = 0
//                declare @grand_net as money = 0
//
//                set @grand_debet = (select coalesce(sum(amount_debet),0) from $this->_tmp_generate where flag=''H'')
//                set @grand_credit = (select coalesce(sum(amount_credit),0) from $this->_tmp_generate where flag=''H'')
//                set @grand_net = (select coalesce(sum(amount_debet),0) - coalesce(sum(amount_credit),0) from $this->_tmp_generate where flag=''H'')
//
//                INSERT INTO $this->_tmp_generate
//                (project_id,pt_id,accdate,flag,amount_debet,amount_credit,amount_net)VALUES
//                ($this->_project_id,$this->_pt_id,''$this->_curdate'',''T'',COALESCE(@grand_debet,0),COALESCE(@grand_credit,0),COALESCE(@grand_net,0))
//                
//                ";
//        $this->_model->customefromquery($sqlgrand);

        if ($condition == '1') {
            $where = "
                        WHERE 
                            project_id = $this->_project_id
                            and pt_id = $this->_pt_id   
                    ";
        } else {
            $where = "
                        WHERE 
                            project_id = $this->_project_id
                            and pt_id = $this->_pt_id   
                            and flag IN (''H'',''T'')    
                    ";
        }
        $sql = "
                    IF OBJECT_ID(''tempdb..$this->_tmp_rpt'') IS NOT NULL DROP TABLE $this->_tmp_rpt
                        SELECT * INTO $this->_tmp_rpt FROM
                        (
                            SELECT *,
                                 format(coalesce(amount_debet,0), ''#,##0.00'') AS format_amount_debet, 
                                 format(coalesce(amount_credit,0), ''#,##0.00'') AS format_amount_credit, 
                                 format(coalesce(amount_net,0), ''#,##0.00'') AS format_ending_amount
                            FROM $this->_tmp_generate
                            $where 
                              
                        ) AS DATA
              ";


        $this->_model->customefromquery($sql);
        $query = "SELECT * FROM $this->_tmp_rpt ORDER BY sort,coa,flag,accdate asc  ";
        $return = array("cluster" => $query);
        return $return;
    }

}
