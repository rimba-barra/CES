<?php

class Erems_InstallmentpaymentController extends Zend_Controller_Action {

    public function init() {

        $a = Zend_Registry::get("module_autoloader");
        $a->addResourceType('library', 'library', 'Libraries');
    }

    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $model_installmentpayment = new Erems_Models_Installmentpayment();
        $post_data['paymentflag'] = 1;
        // mode read

        $modeRead = $this->getRequest()->getPost('mode_read');
        if ($modeRead == 'detail') {
            $post_data['payment_id'] = $this->getRequest()->getPost('payment_id');
            $result = $model_installmentpayment->installmentpaymentdetailRead($post_data);
        } else if ($modeRead == 'paymentdetail') {
            $post_data['payment_id'] = $this->getRequest()->getPost('payment_id');
            $result = $model_installmentpayment->installmentpaymentdetailtableRead($post_data);
        } else {    /// list of all payment
            $post_data['start'] = $this->getRequest()->getPost('start');
            $post_data['limit'] = $this->getRequest()->getPost('limit');
            $post_data['payment_date'] = $this->getRequest()->getPost('payment_date');

            $result = $model_installmentpayment->installmentpaymentRead($post_data);
        }



        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {





        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model_purchaseletter = new Erems_Models_Purchaseletter();



        $sch_data = $model_purchaseletter->purchaseletterScheduleRead(array('purchaseletter_id' => $post_data['purchaseletter_id']));




        $tempTagihan = new Erems_Libraries_Tagihan(NULL, $sch_data['data']);
        $tempPaidTagihan = new Erems_Libraries_Tagihan(NULL, NULL);
        $payment = new Erems_Libraries_Payment();
        $payment->setTagihan($tempTagihan, $tempPaidTagihan);


        $payment->set_p_value($post_data['payment']);
        $payment->process();




        /* TOTAL PAYMENT */
        $totalPayment = $payment->get_p_value() + floatval($post_data['admin_fee']);

        /* CREATE DETAIL STRING */
        $detail_id = '';
        $detail_remaining_balance = '';
        $detail_paymenttype_id = '';
        $detail_payment = '';
        $detail_description = '';
        $detail_amount = '';
        $countPaid = 0;
        $delimiter = '~';
        $totalPaid = $payment->getTagihanPaid()->getJumlahCicilan();
        foreach ($payment->getTagihanPaid()->getListCicilan() as $row) {
            $countPaid +=1;
            $delimiter = $countPaid < $totalPaid ? '~' : '';
            $detail_id .= $row->getId() . '' . $delimiter;
            $detail_remaining_balance .= $row->getRemainingBalance() . '' . $delimiter;
            $detail_paymenttype_id .= '0' . $delimiter;
            $detail_payment .= '0' . $delimiter;
            $detail_amount .= '0' . $delimiter;
            $detail_description .= '' . $delimiter;
        }



        $new_post_data = array();
        $new_post_data['purchaseletter_id'] = intval($post_data['purchaseletter_id']);
        $new_post_data['paymentmethod_id'] = intval($post_data['paymentmethod_id']);
        $new_post_data['payment_date'] = addslashes($post_data['payment_date']);
        $new_post_data['payment'] = $payment->get_p_value();
        $new_post_data['total_payment'] = $totalPayment;
        $new_post_data['detail'] = array(
            'detail_id' => $detail_id,
            'remaining_balance' => $detail_remaining_balance,
            'paymenttype_id'=>$detail_paymenttype_id,
            'payment'=>$detail_payment,
            'amount'=>$detail_amount,
            'description'=>$detail_description
            
                );
        $new_post_data['cdn_val'] = $payment->get_cdn_value();
        $new_post_data['cdn_amount'] = $payment->get_cdn_amount();
        $new_post_data['admin_fee'] = floatval($post_data['admin_fee']);
        $new_post_data['denda'] = floatval($post_data['denda']);
        $new_post_data['note'] = addslashes($post_data['note']);
        $new_post_data['due_date'] = addslashes($post_data['due_date']);
        $new_post_data['cair_date'] = addslashes($post_data['cair_date']);
        $new_post_data['reference'] = addslashes($post_data['reference']);
        $new_post_data['is_reference_rejected'] = intval($post_data['is_reference_rejected']);
        $new_post_data['paymentflag_id'] = 1;
        $new_post_data['name'] = '';
        $new_post_data['address'] = '';
        $new_post_data['telp_home'] = '';
        $new_post_data['telp_office'] = '';
        $new_post_data['mobile_phone'] = '';
        $new_post_data['city_id'] = '0';
        $model_installmentpayment = new Erems_Models_Installmentpayment();
        $result = $model_installmentpayment->installmentpaymentCreate($new_post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_installmentpayment = new Erems_Models_Installmentpayment();
        $result = $mode_installmentpayment->installmentpaymentUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_installmentpayment = new Erems_Models_Installmentpayment();

        $dlmStr = '';
        $x = 0;
        $delimiter = '';
        $jumlah = count($post_data);

        if ($jumlah > 0) {
            
            foreach ($post_data as $row) {
                if (is_array($row)) {
                    $x++;
                    $delimiter = $x == $jumlah ? '' : '~';
                    $dlmStr .= $row['payment_id'] . '' . $delimiter;
                } else {
                     $dlmStr = ''.$post_data['payment_id'];
                }
            }


           

            $result = $mode_installmentpayment->installmentpaymentDelete($dlmStr);
        }



        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>