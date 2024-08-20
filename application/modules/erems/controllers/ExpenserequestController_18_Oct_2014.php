<?php

class Erems_ExpenserequestxxxController extends Zend_Controller_Action {

    private $session;
    private $requestor;

    function init() {

        $a = Zend_Registry::get("module_autoloader");
        $a->addResourceType('kouti', 'library/kouti', 'Kouti');
        $a->addResourceType('library', 'library', 'Libraries');
        $a->addResourceType('eremsconverter', 'library/converter', 'Converter');
        $x = new Erems_Kouti_Requestor();
        $this->requestor = $x->expenseRequest();
    }

    function readAction() {




        $kouti = new Erems_Models_App_Box('{}');
        $arRequest = (array) $kouti->getData();
        $rq = $this->getRequest()->getPost();
        /// test drive
        //  $rq = $this->requestor['read']['paymenttypebyunit'] ;

        $x = new Erems_Models_App_HasilRequestRead($rq);

        $hasilObj = new Erems_Models_App_HasilRead();
        $expenseDao = new Erems_Models_Expenserequest_ExpenseDao($hasilObj);
        $mr = $x->getModeRead();

        $totalRow = 0;
        $ar = array();
        if ($mr == "all") {


            $hasil = $expenseDao->getAll($x);
            if (key_exists('expense', $hasil)) {
                $allExpense = $hasil['expense'];

                $totalRow = $hasil['totalRow'];
                foreach ($allExpense as $row => $expense) {
                    $expense->setDate(date("d/m/Y", strtotime($expense->getDate())));
                    // $expense->set(date("d/m/Y",strtotime($expense->getDate())));
                    $ar[] = $expense->getArrayEmbed();
                }
            }

            $hasilObj->setTotalRow($totalRow);
            $hasilObj->setData($ar);
            //$hasilObj->setModel();
        } else if ($mr == "detail") {

            $ex = new Erems_Models_Expenserequest_Expense();


            $ex->setId($x->getOthersValue('expenserequest_id'));
            $allDetail = $expenseDao->getDetail($ex);

            foreach ($allDetail as $row) {

                $ar[] = $row->getArrayEmbed();
            }
            $hasilObj->setData($ar);
        } else if ($mr == "detailbyunit") {

            $ar = array();
            $unit = new Erems_Models_Master_Unit();
            $unit->setArrayTable($x->getOthers());
            $allDetail = $expenseDao->getDetailByUnit($unit);
            foreach ($allDetail as $row) {

                $ar[] = $row->getArrayEmbed();
            }
            $hasilObj->setData($ar);
        } else if ($mr == "paymenttypebyunit") {

            $ar = array();
            $unit = new Erems_Models_Master_Unit();
            $unit->setArrayTable($x->getOthers());
            $allDetail = $expenseDao->getPaymentTypeByUnit($unit);
           
            if ($allDetail) {
                foreach ($allDetail as $row) {

                    $ar[] = $row->getArrayEmbed();
                }
            }

            $hasilObj->setData($ar);
        } else if ($mr == "request_models") {
            $groupEmbede = new Erems_Models_App_EmbedGroup();
            $groupEmbede->setMember(array(new Erems_Models_Master_User(), new Erems_Models_Master_Department(), new Erems_Models_Master_PaymentMethod()));

            $expense = new Erems_Models_Expenserequest_Expense();
            $groupEmbed = new Erems_Models_App_EmbedGroup();
            $groupEmbed->setMember(array(new Erems_Models_Master_ExpenseType(), new Erems_Models_Master_Unit(), new Erems_Models_Master_Cluster(), new Erems_Models_Master_Block(), new Erems_Models_Master_PaymentType()));

            $geu = new Erems_Models_App_EmbedGroup();
            $geu->setMember(array(new Erems_Models_Expenserequest_Expense(), new Erems_Models_Master_ExpenseType(), new Erems_Models_Master_Unit(), new Erems_Models_Master_Cluster(), new Erems_Models_Master_Block(), new Erems_Models_Master_PaymentType()));

            $expenseDetail = new Erems_Models_Expenserequest_ExpenseDetail();
            $arExDe = $expenseDetail->getMappingArray();
            $arExDe = array_merge($arExDe, $groupEmbed->getModel());

            $arExDeUn = $expenseDetail->getMappingArray();
            $arExDeUn = array_merge($arExDeUn, $geu->getModel());
            $paymenttype = new Erems_Models_Master_PaymentType();
            $arExDeUnPa = $paymenttype->getMappingArray();

            $arEx = array_merge($expense->getMappingArray(), array(array("name" => "expensedetail")));
            $arEx = array_merge($arEx, array(array("name" => "deletedRows")));
            $arEx = array_merge($arEx, array(array("name" => "mode_update")));
            $arEx = array_merge($arEx, $groupEmbede->getModel());

            $dataModels = array("expense" => $arEx,
                "expensedetail" => $arExDe,
                "expensedetailunit" => $arExDeUn,
                "expensedetailunitpaymenttype" => $arExDeUnPa);
            $hasilObj->setData($dataModels);
        }






        $kouti->setHasil($hasilObj);
        $kouti->run($this);
    }

    function createAction() {
        $rjson = $this->getRequest()->getPost('data');
        // $rjson =  $this->requestor['create'];
        $moapp = new Erems_Models_App_Box($rjson);
        $sess = new Erems_Kouti_Session();
        $hasil = new Erems_Models_App_HasilSaveUpdate();
        $sess = $moapp->getSession(); /// get session from Kouti App
        // $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $y = $moapp->getData();




        if (is_array($y)) {
            $totalAmount = 0;
            $ex = new Erems_Models_Expenserequest_Expense();
            $ex->setArrayTable($y);

            $ex->setProjectId($sess->getProjectId());
            $ex->setAddBy($sess->getUserId());
            $ex->setPtId($sess->getPtId());
            $ex->setNomor(Erems_Models_App_DocPrefixGenerator::get("EXPREQ"));
            if (is_array($y['expensedetail'])) {
                $t = NULL;
                foreach ($y['expensedetail'] as $row) {
                    $t = new Erems_Models_Expenserequest_ExpenseDetail();
                    $t->setArrayTable($row);
                    $ex->addExpenseDetail($t);
                    $totalAmount += (double) $t->getAmount();
                }
                $ex->setTotalAmount($totalAmount);
            }
            /// add delimiter
            $de = new Erems_Libraries_Delien_DelimiterEnhancer();
            $de->setDelimiterCandidate($ex);
            $de->generate();
        }

        $dao = new Erems_Models_Expenserequest_ExpenseDao($hasil);
        $row = 0;
        if ((int) $ex->getId() > 0) {
            $decan = new Erems_Models_App_Decan(explode(",", $y["deletedRows"]));
            $de->setDelimiterCandidate($decan);
            $de->generate();

            $row = (int) $dao->update($ex, $decan);
        } else {
            $row = (int) $dao->save($ex);
        }

        $hasila = new Erems_Models_App_HasilSaveUpdate();
        if ($row > 0) {

            $hasila->setSucess(true);
        }


        $moapp->setHasil($hasila);

        $moapp->run($this);
    }

    function updateAction() {
        $rjson = $this->getRequest()->getPost('data');
        //  $rjson =  $this->requestor['update_approve'];
        $moapp = new Erems_Models_App_Box($rjson);
        $y = $moapp->getData();
        $modeUpdate = $y["mode_update"];
        if ($modeUpdate == 'approve') {
            $ses = new Erems_Kouti_Session();
            $ses = $moapp->getSession();
            $hasil = new Erems_Models_App_HasilSaveUpdate();
            $expense = new Erems_Models_Expenserequest_Expense();
            $expense->setArrayTable($y);
            $expense->setAddBy($ses->getUserId());

            $dao = new Erems_Models_Expenserequest_ExpenseDao($hasil);
            $daoRow = (int) $dao->approve($expense);
            if ($daoRow > 0) {
                $hasil->setSucess(TRUE);
            }
            $moapp->setHasil($hasil);
            $moapp->run($this);
        } else {
            // update form form data
            $this->createAction();
        }
    }

    function deleteAction() {
        $rjson = $this->getRequest()->getPost('data');
        // $rjson =  $this->requestor['delete_single'];
        $moapp = new Erems_Models_App_Box($rjson);
        $sess = new Erems_Kouti_Session();
        $hasil = new Erems_Models_App_HasilSaveUpdate();
        $sess = $moapp->getSession(); /// get session from Kouti App
        // $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $y = $moapp->getData();
        $idAr = array();
        // check if single or multi row 
        if (array_key_exists("0", $y)) {
            foreach ($y as $row) {
                $idAr[] = $row["expense_id"];
            }
        } else {
            $idAr[] = $y["expense_id"];
        }



        $de = new Erems_Libraries_Delien_DelimiterEnhancer();
        $decan = new Erems_Models_App_Decan($idAr);
        $de->setDelimiterCandidate($decan);
        $de->generate();

        $hasilSP = false;
        $dao = new Erems_Models_Expenserequest_ExpenseDao($hasil);
        $prosesSP = $dao->delete($decan, $sess);
        $hasilSP = $prosesSP > 0 ? TRUE : FALSE;
        $hasil->setSucess($hasilSP);
        $moapp->setHasil($hasil);

        $moapp->run($this);
    }

}

?>