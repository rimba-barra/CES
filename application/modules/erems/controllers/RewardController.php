<?php

class Erems_RewardController extends Zend_Controller_Action {

    //// added by Erwin.S 20042021
    function init() {
        $action = $this->getRequest()->getActionName();
        if($action != 'status'){
            $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
            if($this->session->getUserId() == null){
                throw new Zend_Controller_Action_Exception('This page does not exist', 404);
            }
        }
    }

    function readAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $model_reward = new Erems_Models_Reward();

        $post_data['mode_read'] = $this->getRequest()->getPost('mode_read');
        
        if($post_data['mode_read'] == 'inlineEdit'){
            $post_data['id'] = $this->getRequest()->getPost('id');
            $post_data['collumn'] = $this->getRequest()->getPost('collumn');
            $post_data['value'] = $this->getRequest()->getPost('value');

            $result = $model_reward->rewardInlineUpdate($post_data);
        }
        else if($post_data['mode_read'] == 'send_email'){
            $result = $this->send_email($this->getRequest()->getPost());
        }
        else{
			$post_data['start']             = $this->getRequest()->getPost('start');
			$post_data['limit']             = $this->getRequest()->getPost('limit');            
			$post_data['purchaseletter_no'] = $this->getRequest()->getPost('purchaseletter_no');
			$post_data['cluster_id']        = $this->getRequest()->getPost('cluster_id');
			$post_data['unit_number']       = $this->getRequest()->getPost('unit_number');
			$post_data['customer_name']     = $this->getRequest()->getPost('customer_name');
            $result = $model_reward->rewardRead($post_data);
        }
		
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function statusAction(){
        $check = end(explode('/', $_SERVER['REQUEST_URI']));

        $queryString = explode('&', base64_decode($check));
        $param = array();
        foreach ($queryString as $key => $value) {
            list($k,$v) = explode('=', $value);
            $param[$k]  = $v;
        }

        $model_reward = new Erems_Models_Reward();
        $sendStatus = $model_reward->approveRejectStatus($param);

        echo '<script>alert("' . $sendStatus['msg'] . '");close();</script>';
        
        exit;
    }

    function send_email($post_data){
        $purchaseletter_id = $post_data['purchaseletter_id'];
        $harga_netto       = $post_data['harga_netto'];
        $harga_total_jual  = $post_data['harga_total_jual'];
        $salesman          = $post_data['salesman'];
        $title             = $post_data['title'];
        $flag              = $post_data['flag'];
        $nilai             = $post_data['nilai'];
        $tanggal_buat      = date('d-m-Y');
        $username_buat     = $this->session->getUserName();
        $project_name      = $this->session->getCurrentProjectName();

        $flag_modul = '';
        if($flag == 'closing_fee_value'){ $flag_modul = 'reward_closingfee'; }
        else if($flag == 'blt_value'){ $flag_modul = 'reward_blt'; }
        else if($flag == 'extrareward_value'){ $flag_modul = 'reward_extrareward'; }

        $status_sent_email    = false;
        $deskripsi_sent_email = 'Tidak ada alamat email untuk dikirim.';
        if($flag_modul != ''){
            $base_url = 'http' . ((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on') ? 's' : '') . '://' . $_SERVER['HTTP_HOST'] . str_replace('/public', '', str_replace('//', '/', dirname($_SERVER['SCRIPT_NAME'])));

            $model_app   = new Erems_Models_Approvallevel();
            $arr_approve = $model_app->getAllRead(array('modul' => $flag_modul));

            $modules = 'erems/reward/status/';

            if($arr_approve['success']){
                if(count($arr_approve['data']) > 0){
                    $sent_email = array();
                    foreach ($arr_approve['data'] as $key => $val) {
                        $approve_name       = $val['name'];
                        $approve_user_id    = $val['user_id'];
                        $approve_order      = $val['approve_order'];
                        $approve_email      = $val['email'];
                        $approve_project_id = $val['project_id'];
                        $approve_pt_id      = $val['pt_id'];

                        if($approve_name != '' && $approve_user_id != '' && $approve_order != '' && $approve_email != '' && $approve_project_id != '' && $approve_pt_id != ''){
                            $urlData = 'user=API&pass=API&purchaseletter_id=' . $purchaseletter_id . '&approveid=' . $approve_user_id . '&modules=' . $modules . '&time=' . mktime() . '&approveorder=' . $approve_order . '&approveemail=' . $approve_email . '&project_id=' . $approve_project_id . '&pt_id=' . $approve_pt_id . '&flag_modul=' . $flag_modul . '&title_text=' . $title;

                            $urlDataApprove = $urlData . '&status=APPROVE';
                            $urlDataReject  = $urlData . '&status=REJECT';

                            $urlApprove = $base_url . '/reroute.php/' . base64_encode($urlDataApprove);
                            $urlReject  = $base_url . '/reroute.php/' . base64_encode($urlDataReject);

                            $messageHead = '<p>Dear Bapak / Ibu,</p>';
                            $message = '<p>Terdapat permohonan approval ' . $title . ' baru yang dibuat oleh user dari EREMS APPLICATION di project ' . $project_name . ', mohon bantuan untuk followup permohonan berikut<br/>';
                            $message .= '<p>';
                            $message .= '<table>';
                            $message .= '<tr><td>Keterangan</td><td>: ' . $title . ' </td></tr>';
                            $message .= '<tr><td>Nilai ' . $title . '</td><td>: ' . Erems_Box_Tools::toCurrency($nilai) . ' </td></tr>';
                            $message .= '<tr><td>Harga Netto</td><td>: ' . Erems_Box_Tools::toCurrency($harga_netto) . ' </td></tr>';
                            $message .= '<tr><td>Harga Total Transaksi</td><td>: ' . Erems_Box_Tools::toCurrency($harga_total_jual) . ' </td></tr>';
                            $message .= '<tr><td>salesman</td><td>: ' . $salesman . ' </td></tr>';
                            $message .= '<tr><td>Tanggal Pembuatan</td><td>: ' . $tanggal_buat . '</td></tr>';
                            $message .= '<tr><td>Username Pembuat</td><td>: ' . $username_buat . '</td></tr>';
                            $message .= '</table>';
                            $message .= '</p>';
                            $message .= '<p>';
                            $message .= '<table>';
                            $message .= '<p>Dan untuk APPROVE/REJECT permohonan ' . $title . ' terbaru silakan klik tombol dibawah ini.</p>';

                            $message .= '
                                        <div class="btn btn--flat btn--small" style="Margin-bottom: 20px;text-align: center;">
                                            <![if !mso]><a style="border-radius: 4px;display: inline-block;font-size: 14px;font-weight: bold;line-height: 24px;padding: 12px 24px;text-align: center;text-decoration: none !important;transition: opacity 0.1s ease-in;color: #ffffff !important;background-color: #80bf2e;font-family: Ubuntu, sans-serif;" href="' . $urlApprove . '">Approve</a><![endif]>&emsp;&emsp;
                                            <![if !mso]><a style="border-radius: 4px;display: inline-block;font-size: 14px;font-weight: bold;line-height: 24px;padding: 12px 24px;text-align: center;text-decoration: none !important;transition: opacity 0.1s ease-in;color: #ffffff !important;background-color: #80bf2e;font-family: Ubuntu, sans-serif;" href="' . $urlReject . '">Reject</a><![endif]></div>
                                            <p> Regards,</p><p> EREMS APPLICATIONS </p>
                                    ';
                            
                            $finalMessage = $messageHead . $message;

                            try{
                                $var = array(
									'title'        => 'CES System - ' . $project_name,
									'subject'      => 'Request ' . $title . ' from ' . $project_name,
									'content'      => $finalMessage,
									'sender'       => Erems_Box_GlobalParams::EMAIL_USER_NOREPLY,
									'recipient'    => array('name' => $approve_name, 'email' => $approve_email),
					            );
					            $statusSentMail = Erems_Box_Tools::emailSend($var);

					            if($statusSentMail){
									$status_sent_email = true;
									$sent_email[]      = $approve_email;
					            }
                            }
                            catch (Zend_Mail_Exception $e) {
                            }
                        }
                    }

                    if(count($sent_email) > 0){
                        $deskripsi_sent_email = 'Email berhasil terkirim ke [' . implode(', ', $sent_email) . '].';                
                    }
                }
            }
        }
        
        return array('success' => $status_sent_email, 'description' => $deskripsi_sent_email);
    }
}
?>
