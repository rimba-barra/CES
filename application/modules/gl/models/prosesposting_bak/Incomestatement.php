<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
class Gl_Models_Prosesposting_Incomestatement extends Zend_Db_Table_Abstract {

    protected $_schema;
    protected $_name = 'th_summary';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_schema = $this->session->getSelectedDbApp() . '.dbo';
        $this->_modelcoa = new Gl_Models_Coa();
        $this->_model = new Gl_Models_Prosesposting_Modelsp();
        $this->_lr = new Gl_Models_Prosesposting_Createlr();
        $this->_helperdata = new Gl_Models_Function_Helperdata();
    }

    function generatetemplate($fromdate, $untildate) {
        $this->_model->setuptemporary();
        $this->generateinstallstatementfortemprary();
        $result = $this->_model->getsumnet($fromdate, $untildate);
        foreach ($result as $row) {
            $this->_model->update_reporttmp($row['coa'], $row);
        }
        $this->calculatefromsetup($untildate);
    }

    function generateinstallstatementfortemprary() {
        $result = $this->_model->getrepotinstallment();
        foreach ($result as $row) {
            $this->_model->insert_reporttmp($row);
        }
    }

    function calculatefromsetup($enddate) {
        $monthyear = date("F/Y",  strtotime($enddate));
        
        $rowcoalr = $this->_model->getcoarl();        
        
        //print_r($rowcoalr);
        
        //Profitloss
        $profitloss_coa_from = $rowcoalr['profitloss_coa_from'];
        $profitloss_coa_until = $rowcoalr['profitloss_coa_until'];

        //REVENUE
        $desc1_coa_from = $rowcoalr['desc1_coa_from'];
        $desc1_coa_until = $rowcoalr['desc1_coa_until'];
        $sumrevenue = $this->_model->getsummaryaccounttemplete($desc1_coa_from, $desc1_coa_until);
        //COST OF GOOD SOLD
        $desc2_coa_from = $rowcoalr['desc2_coa_from'];
        $desc2_coa_until = $rowcoalr['desc2_coa_until'];

        $sumcostgood = $this->_model->getsummaryaccounttemplete($desc2_coa_from, $desc2_coa_until);

        //GROSS PROFIT LOSS 
        $grossprofitloss = $sumrevenue - $sumcostgood;

        //OPERATING EXPENSES
        $desc3_coa_from = $rowcoalr['desc3_coa_from'];
        $desc3_coa_until = $rowcoalr['desc3_coa_until'];

        $sumoperating = $this->_model->getsummaryaccounttemplete($desc3_coa_from, $desc3_coa_until);

        //OPERATING INCOME 
        $operatingincome = $grossprofitloss - $sumoperating;

        //OTHERS INCOME(EXPENSES)
        $desc4_coa_from = $rowcoalr['desc4_coa_from'];
        $desc4_coa_until = $rowcoalr['desc4_coa_until'];

        $sumother = $this->_model->getsummaryaccounttemplete($desc4_coa_from, $desc4_coa_until);
        
        //EARING BEFORE TAX 
        $earingbeforetax = $operatingincome - $sumother;

        //TAX
        $desc5_coa_from = $rowcoalr['desc5_coa_from'];
        $desc5_coa_until = $rowcoalr['desc5_coa_until'];

        $sumtax = $this->_model->getsummaryaccounttemplete($desc5_coa_from, $desc5_coa_until);

        $sumaftertax = $earingbeforetax - $sumtax;

        //OTHER COMPREHENSIVE INCOME
        $desc6_coa_from = $rowcoalr['desc6_coa_from'];
        $desc6_coa_until = $rowcoalr['desc6_coa_until'];

        $sumcomprehensive = $this->_model->getsummaryaccounttemplete($desc6_coa_from, $desc6_coa_until);

        $netincomecomprehensive = $sumaftertax + $sumcomprehensive;
        
        $absolutenet = abs($netincomecomprehensive);
        
        $this->_lr->checkJournal($profitloss_coa_until,$profitloss_coa_from,$enddate,$netincomecomprehensive,$absolutenet);
        
    }

}
