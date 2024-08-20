<?php

class Cashier_Models_Prosesposting_Reportdata extends Zend_Db_Table_Abstract {

    function init() {
        date_default_timezone_set('Asia/Jakarta');
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_project_id = $this->session->getCurrentProjectId();
        $this->_pt_id = $this->session->getCurrentPtId();
        $this->_user_id = $this->session->getUserId();
        $this->_curdate = date('Y-m-d');
        $this->_curdatetime = date('Y-m-d H:i:s');

        $this->_schema = $this->session->getSelectedDbApp() . '.dbo';
        $this->_helperdata = new Cashier_Models_Function_Helperdata();
        $this->_model = new Cashier_Models_Generalmodel_Modelsp();
        $this->_query = new Cashier_Models_Prosesposting_Qdata();
    }

    public function istext($param) {
        return $this->_helperdata->textforquery($param);
    }

    function genReport($param) {
        $tmp = explode("_", $this->session->getSelectedDbApp());
        $year = $tmp[1];

        $resultperiode = $this->_helperdata->getFromanduntildate($param);
        $fromdatedesc = date("d F Y", strtotime($resultperiode["fromdate"]));
        $untildatedesc = date("d F Y", strtotime($resultperiode["untildate"]));

        $startdate = date("Y-m-d", strtotime($year . '-01-01'));
        $fromdate = date("Y-m-d", strtotime($resultperiode["fromdate"]));
        $untildate = date("Y-m-d", strtotime($resultperiode["untildate"]));

        $lastfromdate = date("Y-m-d", strtotime("-1 month", strtotime($fromdate)));
        $lastuntildate = date("Y-m-t", strtotime("-1 month", strtotime($fromdate)));

        $counter = $this->_query->count_tmp_rpt();
        if ($counter > 0) {
            $counterbyuser = $this->_query->count_tmp_rpt_byuser();
            if ($counter == $counterbyuser) {
                $this->_query->truncate_tmp();
            } else {
                $this->_query->delete_tmp();
            }
        } else {
            $this->_query->delete_tmp();
        }
        $this->create_tmp($param);
        $this->create_parent();
        $this->create_amount($param, $fromdate, $lastuntildate, $untildate, $startdate);
        $this->set_total();
        $this->set_grand();
        $result = $this->_query->getdata();

        $param['fromdate'] = $fromdatedesc;
        $param['untildate'] = $untildatedesc;
        $param['cluster'] = $result;

        return $param;
    }

    function create_tmp($param) {
        $result = $this->_query->getalldata_rptformat($param);
        if (!empty($result)) {
            foreach ($result as $row) {
                $record = array(
                    "user_id" => $this->_user_id,
                    "reportdate" => $this->istext($this->_curdatetime),
                    "project_id" => $this->_project_id,
                    "pt_id" => $this->_pt_id,
                    "coa_id" => $row['coa_id'],
                    "coa" => $this->istext($row['coa']),
                    "name" => $this->istext($row['namecoa']),
                    "level" => $row['level'],
                    "type" => $this->istext($row['type']),
                    "report" => $this->istext($row['report']),
                    "report_level" => $row['report_level'],
                    "flag" => $this->istext($row['flag']),
                );
                $this->_query->insert_to_tmp($record);
            }
        }
    }

    public function create_parent() {
        $result = $this->_query->set_parent();
        if (!empty($result)) {
            foreach ($result as $row) {
                $rpt_id = $row['rpt_id'];
                $record = array("parent_coa" => $this->istext($row['parent_code']));
                $this->_query->update_tmp_reportbyid($rpt_id, $record);
            }
        }
    }

    public function create_amount($param, $fromdate, $lastuntildate, $untildate, $startdate) {
        $resultlastmonth = $this->_model->getsumnet($fromdate, $lastuntildate);
        $resultthismonth = $this->_model->getsumnet($fromdate, $untildate);
        $resultthismonthlastyear = $this->_model->getsumnet($startdate, $untildate);

        foreach ($resultlastmonth as $row) {
            $record = array(
                "lastmonth_amount" => $row['net_summary']
            );
            $this->_query->update_tmp_amount($this->istext($row['coa']), $record);
        }

        foreach ($resultthismonth as $row) {
            $record = array(
                "thismonth_amount" => $row['net_summary']
            );
            $this->_query->update_tmp_amount($this->istext($row['coa']), $record);
        }

        foreach ($resultthismonthlastyear as $row) {
            $record = array(
                "lastyear_amount" => $row['net_summary']
            );
            $this->_query->update_tmp_amount($this->istext($row['coa']), $record);
        }

        $resultcalculate = $this->_query->get_rpt_forcalculate($param);

        if (!empty($resultcalculate)) {
            foreach ($resultcalculate as $rowcalculate) {
                $rpt_id = $rowcalculate['rpt_id'];
                $c_last = $rowcalculate['calculate_lastamount'];
                $c_this = $rowcalculate['calculate_thisamount'];
                $c_budget = $rowcalculate['calculate_budgetamount'];
                $c_year = $rowcalculate['calculate_lastyear'];

                $recordcalculate = array(
                    "calculate_lastmonth" => $c_last,
                    "calculate_thismonth" => $c_this,
                    "calculate_budget" => $c_budget,
                    "calculate_lastyear" => $c_year
                );

                $this->_query->update_tmp_reportbyid($rpt_id, $recordcalculate);
            }
        }
    }

    public function set_total() {
        $resultcoa = $this->_query->getparent();
        foreach ($resultcoa as $row) {
            $resultamount = $this->_query->get_amount_from_parent($row['parent_coa']);
            if (!empty($resultamount[0])) {
                $rowamount = $resultamount[0];
                $coa = $this->istext($rowamount['parent_coa']);
                $restcoa = $this->_query->get_coa_on_tmp($rowamount['parent_coa']);
                $rowcoa = $restcoa[0];
                $total_last = $rowamount['total_lastmonth'];
                $total_this = $rowamount['total_thismonth'];
                $total_budget = $rowamount['total_budget'];
                $total_year = $rowamount['total_lastyear'];

                $record = array(
                    "calculate_lastmonth" => $total_last,
                    "calculate_thismonth" => $total_this,
                    "calculate_budget" => $total_budget,
                    "calculate_lastyear" => $total_year
                );

                $this->_query->update_tmp_totalamount($coa, $record);
            }
        }
    }

    function set_grand() {
        $rowcoalr = $this->execSP3('sp_setlaprugilaba_getcoalr', array($this->_project_id, $this->_pt_id));

        $desc1_coa_from = $rowcoalr[0][0]['desc1_coa_from'];
        $desc2_coa_from = $rowcoalr[0][0]['desc2_coa_from'];
        $sum1_note = $rowcoalr[0][0]['sum1_note'];

        $desc3_coa_from = $rowcoalr[0][0]['desc3_coa_from'];
        $sum2_note = $rowcoalr[0][0]['sum2_note'];

        $desc4_coa_from = $rowcoalr[0][0]['desc4_coa_from'];
        $sum3_note = $rowcoalr[0][0]['sum3_note'];

        $desc5_coa_from = $rowcoalr[0][0]['desc5_coa_from'];
        $desc6_coa_from = $rowcoalr[0][0]['desc6_coa_from'];
        $sum4_note = $rowcoalr[0][0]['sum4_note'];


        $resultgross = $this->_query->createdataforgrand($desc1_coa_from, $desc2_coa_from);
        $resultoperating = $this->_query->createdataforgrand($desc3_coa_from, $desc3_coa_from);
        $resultotherincome = $this->_query->createdataforgrand($desc4_coa_from, $desc4_coa_from);
        $resulttax = $this->_query->createdataforgrand($desc5_coa_from, $desc5_coa_from);
        $resultcomprehensive = $this->_query->createdataforgrand($desc6_coa_from, $desc6_coa_from);

        $gross_grand_lastmonth = $resultgross['grand_lastmonth'];
        $gross_grand_thismont = $resultgross['grand_thismonth'];
        $gross_grand_budget = $resultgross['grand_budget'];
        $gross_grand_lastyear = $resultgross['grand_lastyear'];

        $recordgross = array(
            "calculate_lastmonth" => $gross_grand_lastmonth,
            "calculate_thismonth" => $gross_grand_thismont,
            "calculate_budget" => $gross_grand_budget,
            "calculate_lastyear" => $gross_grand_lastyear
        );
        $this->_query->set_grand($sum1_note, $recordgross);

        $operating_grand_lastmonth = $resultoperating['grand_lastmonth'];
        $operating_grand_thismont = $resultoperating['grand_thismonth'];
        $operating_grand_budget = $resultoperating['grand_budget'];
        $operating_grand_lastyear = $resultoperating['grand_lastyear'];

        $recordoperatingincome = array(
            "calculate_lastmonth" => ($gross_grand_lastmonth) - ($operating_grand_lastmonth),
            "calculate_thismonth" => ($gross_grand_thismont) - ($operating_grand_thismont),
            "calculate_budget" => ($gross_grand_budget) - ($operating_grand_budget),
            "calculate_lastyear" => ($gross_grand_lastyear) - ($operating_grand_lastyear)
        );
        $this->_query->set_grand($sum2_note, $recordoperatingincome);


        $other_grand_lastmonth = $resultotherincome['grand_lastmonth'];
        $other_grand_thismont = $resultotherincome['grand_thismonth'];
        $other_grand_budget = $resultotherincome['grand_budget'];
        $other_grand_lastyear = $resultotherincome['grand_lastyear'];

        $recordearing = array(
            "calculate_lastmonth" => ($gross_grand_lastmonth) - ($operating_grand_lastmonth) + ($other_grand_lastmonth),
            "calculate_thismonth" => ($gross_grand_thismont) - ($operating_grand_thismont) + ($other_grand_thismont),
            "calculate_budget" => ($gross_grand_budget) - ($operating_grand_budget) + ($other_grand_budget),
            "calculate_lastyear" => ($gross_grand_lastyear) - ($operating_grand_lastyear) + ($other_grand_lastyear)
        );
        $this->_query->set_grand($sum3_note, $recordearing);


        $tax_grand_lastmonth = $resulttax['grand_lastmonth'];
        $tax_grand_thismont = $resulttax['grand_thismonth'];
        $tax_grand_budget = $resulttax['grand_budget'];
        $tax_grand_lastyear = $resulttax['grand_lastyear'];

        $compre_grand_lastmonth = $resultcomprehensive['grand_lastmonth'];
        $compre_grand_thismont = $resultcomprehensive['grand_thismonth'];
        $compre_grand_budget = $resultcomprehensive['grand_budget'];
        $compre_grand_lastyear = $resultcomprehensive['grand_lastyear'];

        $recordnet = array(
            "calculate_lastmonth" => ($gross_grand_lastmonth) - ($operating_grand_lastmonth) + ($other_grand_lastmonth) - ($tax_grand_lastmonth) + ($compre_grand_lastmonth),
            "calculate_thismonth" => ($gross_grand_thismont) - ($operating_grand_thismont) + ($other_grand_thismont) - ($tax_grand_thismont) + ($compre_grand_thismont),
            "calculate_budget" => ($gross_grand_budget) - ($operating_grand_budget) + ($other_grand_budget) - ($tax_grand_budget) + ($compre_grand_budget),
            "calculate_lastyear" => ($gross_grand_lastyear) - ($operating_grand_lastyear) + ($other_grand_lastyear) - ($tax_grand_lastyear) + ($compre_grand_lastyear)
        );
        $this->_query->set_grand($sum4_note, $recordnet);
    }

}
