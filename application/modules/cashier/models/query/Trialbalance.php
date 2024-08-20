<?php

class Cashier_Models_Query_Trialbalance extends Zend_Db_Table_Abstract {

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

        $this->_pt_id = $_SESSION['Ciputra']['common']['pt_id_rpt'];
        $this->_project_id = $this->getProjectbypt($this->_pt_id);

        $this->_user_id = $this->session->getUserId();
        $this->_curdate = date('Y-m-d');
        $this->_curdatetime = date('Y-m-d H:i:s');
        $this->_active = 1;
        $this->_delete = 0;
        $this->_report = 'N';
        $this->_level = 3;
        $this->_levelsub = 2;
        $this->_mj = 'MJ0001/01';
        //end parameter  
        //start table from db
        $this->_m_rptformat = 'm_rptformat';
        $this->_m_coa = 'm_coa';
        $this->_m_prefix = 'm_prefix';
        $this->_th_summary = 'th_summary';
        $this->_th_jurnal = 'th_jurnal';
        $this->_td_jurnaldetail = 'td_jurnaldetail';
        $this->_tmp_rpttrialbalance = 'tmp_rpttrialbalance';
        //end table from db
        //start create temporary for report 
        $this->_tmp_parent = '##tmp_parent_' . $this->_user_id;
        $this->_tmp_unionbegbal = '##tmp_unionbegbal_' . $this->_user_id;
        $this->_tmp_unionchield = '##tmp_chield_' . $this->_user_id;
        $this->_tmp_uniondebetcredit = '##tmp_debetcredit_' . $this->_user_id;
        $this->_tmp_beginingbalance = '##tmp_beginingbalance_' . $this->_user_id;
        $this->_tmp_beginingbalancehead = '##tmp_beginingbalancehead_' . $this->_user_id;
        $this->_tmp_total_debetcredit = '##tmp_total_debetcredit_' . $this->_user_id;
        $this->_tmp_debethead = '##tmp_debethead_' . $this->_user_id;
        $this->_tmp_credithead = '##tmp_credithead_' . $this->_user_id;
        $this->_tmp_totalhead = '##tmp_totalhead_' . $this->_user_id;
        $this->_tmp_sumdata = '##tmp_sumdata_' . $this->_user_id;
        $this->_tmp_endbal = '##tmp_endbal_' . $this->_user_id;
        $this->_tmp_enddata = '##tmp_enddata_' . $this->_user_id;
        $this->_tmp_enddatachield = '##tmp_enddatachield_' . $this->_user_id;
        $this->_tmp_grand = '##tmp_grand_' . $this->_user_id;
        $this->_tmp_rpt = '##tmp_rpt_' . $this->_user_id;
        //end create temporary for report                
    }

    function create_beginingbal($startdate) {
        $sql = "
                        IF OBJECT_ID(''tempdb..$this->_tmp_unionchield'') IS NOT NULL DROP TABLE $this->_tmp_unionchield
                       SELECT * INTO $this->_tmp_unionchield FROM
                       ( 
                                SELECT        
                                        a.project_id,a.pt_id,$this->_user_id as user_id,a.coa,d.type as coatype,
                                        COALESCE(SUM(CASE WHEN d.type=''D'' THEN COALESCE(a.amount,0) ELSE -(COALESCE(a.amount,0)) END),0) as total_amount                      
                                    FROM $this->_td_jurnaldetail a
                                    LEFT JOIN $this->_th_jurnal b ON a.journal_id = b.journal_id 
                                    LEFT JOIN $this->_m_prefix c ON b.prefix_id = c.prefix_id
                                    LEFT JOIN $this->_m_coa d ON a.coa_id = d.coa_id
                                    WHERE 
                                        a.active = 1
                                        AND a.deleted = 0
                                        AND a.is_post = 1
                                        AND a.project_id = $this->_project_id
                                        AND a.pt_id = $this->_pt_id                 
                                        AND b.voucher_date $startdate
                                        AND a.type=''D''
                                    GROUP BY a.project_id,a.pt_id,a.coa,d.type

                             UNION ALL  

                                SELECT        
                                        a.project_id,a.pt_id,$this->_user_id as user_id,a.coa,d.type as coatype,
                                        COALESCE(SUM(CASE WHEN d.type=''C'' THEN COALESCE(a.amount,0) ELSE -(COALESCE(a.amount,0)) END),0) as total_amount                      
                                    FROM $this->_td_jurnaldetail a
                                    LEFT JOIN $this->_th_jurnal b ON a.journal_id = b.journal_id 
                                    LEFT JOIN $this->_m_prefix c ON b.prefix_id = c.prefix_id
                                    LEFT JOIN $this->_m_coa d ON a.coa_id = d.coa_id
                                    WHERE 
                                        a.active = 1
                                        AND a.deleted = 0
                                        AND a.is_post = 1
                                        AND a.project_id = $this->_project_id
                                        AND a.pt_id = $this->_pt_id                 
                                        AND b.voucher_date $startdate
                                        AND a.type=''C''
                                    GROUP BY a.project_id,a.pt_id,a.coa,d.type

                        ) AS DATA
                        
                  ";
        //print_r($sql);
        $this->_model->customefromquery($sql);

        $sql = " IF OBJECT_ID(''tempdb..$this->_tmp_beginingbalance'') IS NOT NULL DROP TABLE $this->_tmp_beginingbalance
                         SELECT * INTO $this->_tmp_beginingbalance FROM
                            ( 
                                          SELECT 				  
                                                  project_id,pt_id,user_id,coa,coatype,
                                                  CASE WHEN coatype=''D'' THEN SUM(total_amount) ELSE -SUM(total_amount) END AS begining_amount
                                         FROM $this->_tmp_unionchield
                                         WHERE 
                                            project_id=$this->_project_id
                                            and pt_id=$this->_pt_id    
                                            and user_id=$this->_user_id    
                                         group by  project_id,pt_id,user_id,coa,coatype
                             ) AS DATA
                             
                  ";

        $this->_model->customefromquery($sql);

        $sql = "
                                    declare @increment int = 1				  
                                    declare @counter int = 0	
                                    declare @coa varchar(max) = null  
                                    declare @begbal money = 0
                                    
                                    SET @counter =  (SELECT COUNT(coa) from $this->_tmp_beginingbalance)	
				    WHILE (@increment<=@counter)
				    BEGIN
                                        SELECT  @coa = coa,@begbal=begining_amount
                                        FROM $this->_tmp_beginingbalance order by coa desc

                                            UPDATE $this->_tmp_rpttrialbalance
                                            SET begining_amount = @begbal
                                            WHERE 
                                                project_id = $this->_project_id
                                            AND pt_id = $this->_pt_id 
                                            AND user_id = $this->_user_id 	
                                            AND level=2						
                                            AND coa = @coa  
                                        
                                        SET @increment=@increment+1
                                        DELETE FROM $this->_tmp_beginingbalance WHERE coa = @coa
                                     END                                          
                          ";
        $this->_model->customefromquery($sql);


        $sql = "
                        IF OBJECT_ID(''tempdb..$this->_tmp_beginingbalancehead'') IS NOT NULL DROP TABLE $this->_tmp_beginingbalancehead
                            SELECT * INTO $this->_tmp_beginingbalancehead FROM
                            (  
                                SELECT a.project_id,a.pt_id,a.user_id,a.coa,
                                       COALESCE(SUM(net_summary),0) as begining_amount
                                FROM $this->_tmp_rpttrialbalance a
                                INNER JOIN $this->_th_summary b ON a.coa_id = b.coa_id	
                                WHERE 
                                a.project_id =$this->_project_id
                                and a.pt_id = $this->_pt_id
                                and a.user_id =$this->_user_id
                                and a.flag=''H''
                                and a.level =1
                                and b.voucher_date $startdate
                                GROUP BY a.project_id,a.pt_id,a.user_id,a.coa
                            ) AS DATA
                         ";

        $this->_model->customefromquery($sql);

        $sql = "
                                    declare @increment int = 1				  
                                    declare @counter int = 0	
                                    declare @coa varchar(max) = null                                  
                                    declare @level int = 1
                                    declare @begbal money = 0
                                    
                                    SET @counter =  (SELECT COUNT(coa) from $this->_tmp_beginingbalancehead)	
				    WHILE (@increment<=@counter)
				    BEGIN
                                        SELECT  @coa = coa,@begbal=begining_amount
                                        FROM $this->_tmp_beginingbalancehead order by coa desc

                                            UPDATE $this->_tmp_rpttrialbalance
                                            SET begining_amount = @begbal
                                            WHERE 
                                                project_id = $this->_project_id
                                            AND pt_id = $this->_pt_id 
                                            AND user_id = $this->_user_id 	
                                            AND level=@level						
                                            AND coa = @coa  
                                        
                                        SET @increment=@increment+1
                                        DELETE FROM $this->_tmp_beginingbalancehead WHERE coa = @coa
                                     END                                          
                          ";
        $this->_model->customefromquery($sql);
    }

    public function create_sum_debetcredit($fromdate, $untildate) {
        $sql = "
                     IF OBJECT_ID(''tempdb.. $this->_tmp_uniondebetcredit'') IS NOT NULL DROP TABLE  $this->_tmp_uniondebetcredit
                    SELECT * INTO  $this->_tmp_uniondebetcredit FROM
                    ( 
                        SELECT 
                               project_id,pt_id,user_id,coa,
                               COALESCE(SUM(COALESCE(amount,0)),0) as debet,
                                                       0 as credit
                         FROM $this->_tmp_rpttrialbalance
                         WHERE 
                               project_id = $this->_project_id
                              AND pt_id = $this->_pt_id  
                              AND user_id = $this->_user_id 					               
                              AND trxtype  =''D''
                              AND flagshowdata =1
                              AND voucher_date  $fromdate  AND voucher_date <=''$untildate''
                         GROUP BY project_id,pt_id,user_id,coa	
					 	
                     UNION ALL  
                 
                            SELECT 
                                project_id,pt_id,user_id,coa,
                                                          0 as debet,
                                  COALESCE(SUM(COALESCE(amount,0)),0) as credit						  
                            FROM $this->_tmp_rpttrialbalance
                            WHERE 
                                  project_id = $this->_project_id
                                 AND pt_id = $this->_pt_id  
                                 AND user_id = $this->_user_id  						               
                                 AND trxtype  =''C''
                                 AND flagshowdata =1
                                 AND voucher_date  $fromdate AND voucher_date <=''$untildate''
                          GROUP BY project_id,pt_id,user_id,coa
                     
                  ) AS DATA  
            ";

        $this->_model->customefromquery($sql);

        $sql = "
                        IF OBJECT_ID(''tempdb..$this->_tmp_total_debetcredit'') IS NOT NULL DROP TABLE $this->_tmp_total_debetcredit
                                SELECT * INTO $this->_tmp_total_debetcredit FROM
                            ( 
				  SELECT 
                                        project_id,pt_id,user_id,coa,
                                        COALESCE(SUM(debet),0) as total_debet,
                                        COALESCE(SUM(credit),0) as total_credit		 
				  FROM $this->_tmp_uniondebetcredit
                                  WHERE 
                                  project_id=$this->_project_id
                                  and pt_id=$this->_pt_id    
                                  and user_id=$this->_user_id    
				  GROUP BY project_id,pt_id,user_id,coa
                            ) AS DATA
               ";

        $this->_model->customefromquery($sql);

        $sql = "
                    declare @increment int = 1				  
                    declare @counter int = 0	
                    declare @coa varchar(max) = null                                  
                    declare @level int = 2
                    declare @sumdebet money = 0
                    declare @sumcredit money = 0

                    SET @counter =  (SELECT COUNT(coa) from $this->_tmp_total_debetcredit)	
                    WHILE (@increment<=@counter)
                    BEGIN
                        SELECT  @coa = coa,@sumdebet=COALESCE(total_debet,0),@sumcredit=COALESCE(total_credit,0)
                        FROM $this->_tmp_total_debetcredit order by coa desc

                            UPDATE $this->_tmp_rpttrialbalance
                            SET 
                                sum_debet = COALESCE(@sumdebet,0),
                                sum_credit = COALESCE(@sumcredit,0)
                            WHERE 
                                project_id = $this->_project_id
                            AND pt_id = $this->_pt_id 
                            AND user_id = $this->_user_id 	
                            AND level=@level						
                            AND coa = @coa  

                        SET @increment=@increment+1
                        DELETE FROM $this->_tmp_total_debetcredit WHERE coa = @coa
                     END                                          
                          ";
        $this->_model->customefromquery($sql);

        $sql = "
                IF OBJECT_ID(''tempdb..$this->_tmp_debethead'') IS NOT NULL DROP TABLE $this->_tmp_debethead
                            SELECT * INTO $this->_tmp_debethead FROM
                            (  
                                SELECT a.project_id,a.pt_id,a.user_id,a.coa,
                                       COALESCE(SUM(debit_summary),0) as sum_debet
                                FROM $this->_tmp_rpttrialbalance a
                                INNER JOIN $this->_th_summary b ON a.coa_id = b.coa_id	
                                WHERE 
                                a.project_id =$this->_project_id
                                and a.pt_id = $this->_pt_id
                                and a.user_id =$this->_user_id
                                and a.flag=''H''
                                and a.level =1
                                and b.voucher_date $fromdate AND b.voucher_date <= ''$untildate''
                                GROUP BY a.project_id,a.pt_id,a.user_id,a.coa
                            ) AS DATA
                            
                            ";
        $this->_model->customefromquery($sql);

        $sql = "
                      
                            IF OBJECT_ID(''tempdb..$this->_tmp_credithead'') IS NOT NULL DROP TABLE $this->_tmp_credithead
                            SELECT * INTO $this->_tmp_credithead FROM
                            (  
                                SELECT a.project_id,a.pt_id,a.user_id,a.coa,
                                       COALESCE(SUM(credit_summary),0) as sum_credit
                                FROM $this->_tmp_rpttrialbalance a
                                INNER JOIN $this->_th_summary b ON a.coa_id = b.coa_id	
                                WHERE 
                                a.project_id =$this->_project_id
                                and a.pt_id = $this->_pt_id
                                and a.user_id =$this->_user_id
                                and a.flag=''H''
                                and a.level =1
                                and b.voucher_date $fromdate AND b.voucher_date <= ''$untildate''
                                GROUP BY a.project_id,a.pt_id,a.user_id,a.coa
                            ) AS DATA
                            
                         ";
        $this->_model->customefromquery($sql);

        $sql = "
                    IF OBJECT_ID(''tempdb..$this->_tmp_totalhead'') IS NOT NULL DROP TABLE $this->_tmp_totalhead
                            SELECT * INTO $this->_tmp_totalhead FROM
                            ( 
                                SELECT 
                                                a.project_id,a.pt_id,a.user_id,a.coa,                                                
                                                COALESCE(a.sum_debet,0)  as sum_debet,		
                                                COALESCE(b.sum_credit,0) as sum_credit
                                 FROM $this->_tmp_debethead a 
                                 LEFT JOIN $this->_tmp_credithead b ON a.coa=b.coa
                                 WHERE 
                                 a.project_id =$this->_project_id
                                 and a.pt_id = $this->_pt_id
                                 and a.user_id =$this->_user_id
                             ) AS DATA
                    ";
        $this->_model->customefromquery($sql);

        $sql = "
                    declare @increment int = 1				  
                    declare @counter int = 0	
                    declare @coa varchar(max) = null                                  
                    declare @level int = 1
                    declare @sumdebet money = 0
                    declare @sumcredit money = 0

                    SET @counter =  (SELECT COUNT(coa) from $this->_tmp_totalhead)	
                    WHILE (@increment<=@counter)
                    BEGIN
                        SELECT  @coa = coa,@sumdebet=sum_debet,@sumcredit=sum_credit
                        FROM $this->_tmp_totalhead order by coa desc

                            UPDATE $this->_tmp_rpttrialbalance
                            SET 
                                sum_debet = @sumdebet,
                                sum_credit = @sumcredit
                            WHERE 
                                project_id = $this->_project_id
                            AND pt_id = $this->_pt_id 
                            AND user_id = $this->_user_id 	
                            AND level=@level						
                            AND coa = @coa  

                        SET @increment=@increment+1
                        DELETE FROM $this->_tmp_totalhead WHERE coa = @coa
                     END                                          
                          ";
        $this->_model->customefromquery($sql);
    }

    public function create_ending_balance() {
        $sql = "
                IF OBJECT_ID(''tempdb..$this->_tmp_endbal'') IS NOT NULL DROP TABLE $this->_tmp_endbal
                            SELECT * INTO $this->_tmp_endbal FROM
                            ( 
                SELECT coa, 
                COALESCE(begining_amount,0)+COALESCE(sum_debet,0)-COALESCE(sum_credit,0) as ending_amount
                from $this->_tmp_rpttrialbalance
                where 
                    flag=''H''
                    AND project_id = $this->_project_id
                    AND pt_id = $this->_pt_id 
                    AND user_id = $this->_user_id 
                        
                ) AS DATA    
            ";
        $this->_model->customefromquery($sql);

        $sql = "
                        declare @increment int = 1				  
                        declare @counter int = 0	
                        declare @coa varchar(max) = null                                  
                        declare @level int = 1
                        declare @endbal money = 0

                        SET @counter =  (SELECT COUNT(coa) from $this->_tmp_endbal)	
                        WHILE (@increment<=@counter)
                        BEGIN
                            SELECT  @coa = coa,@endbal=ending_amount
                            FROM $this->_tmp_endbal order by coa desc

                                UPDATE $this->_tmp_rpttrialbalance
                                SET 
                                    ending_amount = @endbal                                
                                WHERE 
                                    project_id = $this->_project_id
                                AND pt_id = $this->_pt_id 
                                AND user_id = $this->_user_id 	
                                AND flag=''H''						
                                AND coa = @coa  

                            SET @increment=@increment+1
                            DELETE FROM $this->_tmp_endbal WHERE coa = @coa
                         END                                          
              ";
        $this->_model->customefromquery($sql);
    }

    public function create_ending_balancechield() {
        $sql = "
            
            IF OBJECT_ID(''tempdb..$this->_tmp_enddata'') IS NOT NULL DROP TABLE $this->_tmp_enddata
            SELECT * INTO $this->_tmp_enddata FROM
            ( 
            select coa
            from $this->_tmp_rpttrialbalance
            where 
                flag=''H''
                and level = 2
                and project_id = $this->_project_id
                and pt_id = $this->_pt_id 
                and user_id = $this->_user_id
             ) AS DATA
             
            ";
        $this->_model->customefromquery($sql);

        $sql = "
                        declare @increment int = 1				  
                        declare @counter int = 0	
                        declare @coa varchar(max) = null                                  
                        declare @level int = 3
                        

                        SET @counter =  (SELECT COUNT(coa) from $this->_tmp_enddata)	
                        WHILE (@increment<=@counter)
                        BEGIN
                            SELECT  @coa = coa
                            FROM $this->_tmp_enddata order by coa desc
                                
                                    IF OBJECT_ID(''tempdb..$this->_tmp_enddatachield'') IS NOT NULL DROP TABLE $this->_tmp_enddatachield
                                    SELECT * INTO $this->_tmp_enddatachield FROM
                                    (
                                        SELECT
                                            rpt_id,project_id,pt_id,user_id,voucher_no,voucher_date,coa,coatype,
                                            sum(coalesce(begining_amount,0)) OVER (PARTITION BY coa order by level,voucher_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)+
                                            sum(coalesce(amount_debet,0)) OVER (PARTITION BY coa order by level,voucher_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) -
                                            sum(coalesce(amount_credit,0)) OVER (PARTITION BY coa order by level,voucher_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)
                                            as ending_amount
                                            from $this->_tmp_rpttrialbalance
                                            where
                                                coa =@coa
                                                and level in(2,3)
                                                and flagshowdata =1
                                                and project_id = $this->_project_id
                                                and pt_id = $this->_pt_id 
                                                and user_id = $this->_user_id
                                      ) AS DATA


                                    declare @incrementsub int = 1
                                    declare @countersub int = 0
                                    declare @endbalsub money = 0
                                    declare @rpt_id int = 0

                                        SET @countersub =  (SELECT COUNT(rpt_id) from $this->_tmp_enddatachield)
                                    WHILE (@incrementsub<=@countersub)
                                        BEGIN
                                                SELECT  @rpt_id =rpt_id,@endbalsub =ending_amount
                                                FROM $this->_tmp_enddatachield
                                    UPDATE $this->_tmp_rpttrialbalance
                                    SET ending_amount = @endbalsub
                                    WHERE
                                        project_id = $this->_project_id
                                        AND pt_id = $this->_pt_id
                                        AND user_id = $this->_user_id
                                        AND level = 3
                                        AND rpt_id=@rpt_id

                                    SET @incrementsub=@incrementsub+1
                                    DELETE FROM $this->_tmp_enddatachield WHERE rpt_id = @rpt_id
                                    END
                            SET @increment=@increment+1
                            DELETE FROM $this->_tmp_enddata WHERE coa = @coa
                         END    
                         

              ";
        $this->_model->customefromquery($sql);
    }

    public function create_grand() {
        
        $sql = "
                

                IF OBJECT_ID(''tempdb..$this->_tmp_grand'') IS NOT NULL DROP TABLE $this->_tmp_grand
                    SELECT * INTO $this->_tmp_grand FROM
                    (
                                    SELECT    
                                    project_id,pt_id,user_id, 
                                    sum(begining_amount) as grand_begining,
                                    sum(sum_debet) as grand_debet,
                                    sum(sum_credit) as grand_credit,
                                    sum(ending_amount) as grand_ending
                                    FROM $this->_tmp_rpttrialbalance 
                                    WHERE 
                                    project_id=$this->_project_id
                                    and pt_id=$this->_pt_id
                                    and user_id=$this->_user_id
                                    and level=2
                                    GROUP BY project_id,pt_id,user_id
                    ) AS DATA
                    

                    declare @lastcoa varchar(max) = null
                    declare @coa varchar(max) = null
                    declare @pt_id int = 0
                    declare @user_id int = 0
                    declare @incrementgrand int = 1
                    declare @countergrand int = 0
                    declare @grand_begining money = 0
                    declare @grand_debet money = 0
                    declare @grand_credit money = 0
                    declare @grand_end money = 0
                    
                    SET @lastcoa=(
                                    SELECT TOP 1 coa 
                                    FROM $this->_tmp_rpttrialbalance
                                    WHERE 
                                        project_id=$this->_project_id
                                        and pt_id=$this->_pt_id
                                        and user_id=$this->_user_id
                                    ORDER BY  coa desc        
                                 )
                       

                    SET @countergrand = (select count(project_id) FROM $this->_tmp_grand)
                    WHILE (@incrementgrand<=@countergrand)
                          BEGIN
                                        SELECT 
                                            @pt_id=pt_id,
                                            @user_id=user_id,
                                            @grand_begining=grand_begining,
                                            @grand_debet=grand_debet,
                                            @grand_credit=grand_credit,
                                            @grand_end=grand_ending 
                                        FROM $this->_tmp_grand

                                        INSERT INTO tmp_rpttrialbalance
                                        (project_id,pt_id,user_id,voucher_no,coa,flag,flagshowdata,level,begining_amount,sum_debet,sum_credit,ending_amount) VALUES
                                        ($this->_project_id,$this->_pt_id,$this->_user_id,''GRAND TOTAL'',@lastcoa,''T'',1,4,@grand_begining,@grand_debet,@grand_credit,@grand_end)

                                SET @incrementgrand=@incrementgrand+1
                                DELETE FROM $this->_tmp_grand WHERE pt_id = @pt_id and user_id=@user_id
                            END
        
            ";
        
        $this->_model->customefromquery($sql);
    }

    public function show_report($flagheader,$flagdetail) {
        if ($flagheader == 1) {
            $where = "
                        WHERE                            
                                project_id = $this->_project_id
                            AND pt_id = $this->_pt_id
                            AND user_id = $this->_user_id
                            AND flagshowdata =1
                         ";
        } else {
            $where = "
                        WHERE                            
                                project_id = $this->_project_id
                            AND pt_id = $this->_pt_id
                            AND user_id = $this->_user_id
                            AND level IN (''2'',''3'',''4'')
                            AND flagshowdata =1
                         ";
        }
        
        if($flagdetail==2){
             $where = $where." AND flag not in(''I'')";
        }

        $sql2 = "
                            IF OBJECT_ID(''tempdb..$this->_tmp_rpt'') IS NOT NULL DROP TABLE $this->_tmp_rpt
                            SELECT * INTO $this->_tmp_rpt FROM
                            ( 
                                SELECT *,
                                CASE WHEN description is null then REPLACE(coaname, ''-'', '' '') else cast(voucher_date as nvarchar(max))+''  ''+description end as accdate,
                                CASE WHEN voucher_no is null then coa else voucher_no end as accvoucher,
                                format(coalesce(amount_debet,0), ''#,##0.00'') AS format_amount_debet, 
                                format(coalesce(amount_credit,0), ''#,##0.00'') AS format_amount_credit, 
                                format(coalesce(calculate_amount,0), ''#,##0.00'') AS format_calculate_amount, 
                                format(coalesce(begining_amount,0), ''#,##0.00'') AS format_begining_amount, 
                                format(coalesce(sum_debet,0), ''#,##0.00'') AS format_sum_debet, 
                                format(coalesce(sum_credit,0), ''#,##0.00'') AS format_sum_credit, 
                                format(coalesce(ending_amount,0), ''#,##0.00'') AS format_ending_amount
                                FROM $this->_tmp_rpttrialbalance 
                                $where
                             ) AS DATA      
                             
                  ";

        $this->_model->customefromquery($sql2);
        //$sql3 = "SELECT * FROM $this->_tmp_rpt ORDER BY coa,flag,level";
        $sql3 = "SELECT * FROM $this->_tmp_rpt ORDER BY coa,flag,level,voucher_date";
        return $sql3;
    }

    public function create_calculatetotal($startdate, $fromdate, $untildate, $flagheader,$flagdetail) {
        $this->create_beginingbal($startdate);
        $this->create_sum_debetcredit($fromdate, $untildate);
        $this->create_ending_balance();
        $this->create_ending_balancechield();
        $this->create_grand();
        $result = $this->show_report($flagheader,$flagdetail);
        return $result;
    }

    public function get_coa_from_journaldetail($from, $until) {
        $sql = "
                SELECT DISTINCT coa FROM $this->_td_jurnaldetail 
                WHERE 
                 active = 1
                 AND deleted = 0
                 AND is_post = 1
                 AND project_id = $this->_project_id
                 AND pt_id = $this->_pt_id
                 AND coa BETWEEN ''$from''  AND  ''$until'' 
                 ORDER BY coa asc    
               ";
        $result = $this->_model->customefromquery($sql);
        return $result[0];
    }

    public function get_coa_from_journaldetail_byperiode($coa, $fromdate, $untildate) {
        $sql = "
                SELECT  
                b.voucher_date,b.voucher_no,b.prefix_id,c.prefix,
                case when b.voucher_no=''$this->_mj'' then ''0'' else ''1'' end as flagshowdata,
                d.parent_code,d.name,d.type as coatype,d.level,
                a.*,
                CASE WHEN a.type=''D'' THEN COALESCE(a.amount,0) ELSE 0 END as amount_debet,
                CASE WHEN a.type=''C'' THEN COALESCE(a.amount,0) ELSE 0 END as amount_credit                 
                FROM $this->_td_jurnaldetail a
                LEFT JOIN $this->_th_jurnal b ON a.journal_id = b.journal_id 
                LEFT JOIN $this->_m_prefix c ON b.prefix_id = c.prefix_id
                LEFT JOIN $this->_m_coa d ON a.coa_id = d.coa_id
                WHERE 
                    a.active = 1
                    AND a.deleted = 0
                    AND a.is_post = 1
                    AND a.project_id = $this->_project_id
                    AND a.pt_id = $this->_pt_id
                    AND a.coa =''$coa''
                    AND b.voucher_date BETWEEN ''$fromdate'' AND ''$untildate''
                order by b.voucher_date asc  
               ";

        $result = $this->_model->customefromquery($sql);
        return $result[0];
    }

    public function get_coa_from_sumtrh($from, $until) {
        $sql = "
                SELECT DISTINCT coa FROM $this->_th_summary
                WHERE 
                 active = 1
                 AND deleted = 0
                 AND project_id = $this->_project_id
                 AND pt_id = $this->_pt_id
                 AND coa BETWEEN ''$from''  AND  ''$until'' 
                 ORDER BY coa asc    
               ";
        $result = $this->_model->customefromquery($sql);
        return $result[0];
    }

    public function get_coa_from_tmp() {
        $sql = "
                SELECT * FROM $this->_tmp_rpttrialbalance
                WHERE 
                  project_id = $this->_project_id
                 AND pt_id = $this->_pt_id
                 AND user_id = $this->_user_id
                 AND level =$this->_levelsub
                 ORDER BY coa asc    
               ";
        $result = $this->_model->customefromquery($sql);
        return $result[0];
    }

    public function count_tmp_rpt() {
        $sql = "SELECT COUNT(rpt_id) as counterdata FROM $this->_tmp_rpttrialbalance";
        $result = $this->_model->customefromquery($sql);
        $counter = $result[0][0]['counterdata'];
        return $counter;
    }

    public function count_tmp_rpt_byuser() {
        $sql = "SELECT COUNT(rpt_id) as counterdata FROM $this->_tmp_rpttrialbalance
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
        $sql = "TRUNCATE TABLE $this->_tmp_rpttrialbalance ";
        $this->_model->customefromquery($sql);
    }

    public function delete_tmp() {
        $sql = "DELETE FROM $this->_tmp_rpttrialbalance 
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
                 INSERT INTO $this->_tmp_rpttrialbalance ($key) VALUES ($values)  
               ";

        $this->_model->customefromquery($sql);
    }

    public function getProjectbypt($pt_id) {
        $sql = "exec cashier.dbo.sp_getprojectbypt ".$pt_id;
        $result = $this->_model->customefromquery($sql);
        $project_id = $result[0][0]['project_id'];
        return $project_id;
    }

}
