<?php

class Cashier_Models_Validator_WriteoffValidator extends Cashier_Box_Models_App_Validator {

    public $appRequest;
    public $session;
    public $action;
    public $writeoff_id;
    public $paramdata;

    public function run(Cashier_Models_Master_Writeoff $pl) {
        $msg = "";
        $this->writeoff_id = 0;
        $dao = $this->controller->getDao();
        $idExist = 0;
        $request = $this->appRequest;
            $data = $this->paramdata;
            $writeoffdetail = array();
            $allwriteoffdetail = array();
            $is_allow = true;
            $totalwriteoff = 0;

            $decanWriteoffDetail = array();
            if (count($data['writeoffdetail'])) {
                $writeoffdetail = $data['writeoffdetail'];
                $negative = '-';
                foreach ($writeoffdetail as $row) {
                    $validate = $dao->validation($pl, $this->appRequest,$row['writeoff']);
                    $validatesudahpernah = $dao->validationsudahpernah($row['schedule_id']);
                    if($validatesudahpernah[0][0]['total']>0){
                        $is_allow = true;
                        $msg .= " - Denda Schedule ".$row['description']." sudah pernah dilakukan writeoff. Hanya bisa 1 kali writeoff dalam 1 schedule denda. <br>";
                    }
                    if($row['writeoff']<0) {
                        $row['writeoff'] = $negative.Cashier_Box_Tools::unformatMoney(number_format($row['writeoff'], 2));
                    } else {
                        $row['writeoff'] = Cashier_Box_Tools::unformatMoney(number_format($row['writeoff'], 2));
                    }
                    $d = new Cashier_Models_Master_Writeoffdetail();
                    Cashier_Box_Tools::setArrayTable($d, $row);
                    $allwriteoffdetail[] = $d;
                    $totalwriteoff = $totalwriteoff+$row['writeoff'];
                }
                $decanWriteoffDetail = Cashier_Box_Tools::toDecan($allwriteoffdetail);
                $decanWriteoffDetail = $decanWriteoffDetail->getDCResult();
               
                
            }
            if($data['is_special_wo']==1){
                $validatelimitpercase = $dao->validationlimitcase($data['purchaseletter_id'],$totalwriteoff);
                if($validatelimitpercase[0][0]['sudahlimit']==1){
                    $is_allow = false;
                    $msg .= $validatelimitpercase[0][0]['msg'];
                }
            }
            if($is_allow==true){
                $update = $dao->save($pl, $request, $decanWriteoffDetail);
                if ($update) {
                    $msg = "SUCCESS";
                    $this->writeoff_id = $update;
                    $this->setStatus(TRUE);
                    
                    
                    
                    $detailwo = $dao->getdetailwo($this->writeoff_id);
//                    var_dump($detailwo);

//                    var_dump($bodyemail);
                    if($detailwo[0][0]['to_email']!='unavailable'){
                        $emails = explode(",", $detailwo[0][0]['to_email']);
                        foreach($emails as $email) {
                            $bodyemail = '<html><body>';
                            $bodyemail .= '<p>Dear Bapak / Ibu,</p>';
                            $bodyemail .= "<p>Terdapat permohonan approval write off denda yang dibuat dari system CES-Finance Accounting. Mohon lakukan approval untuk permohonan berikut ini: </p>";										
                            $bodyemail .= '<table>';
                            $bodyemail .= '<tr>';
                            $bodyemail .= '<td>Keterangan</td><td>:</td><td>Writeoff Denda '.$detailwo[0][0]['project_name'].' '.$detailwo[0][0]['pt_name'].'</td>';
                            $bodyemail .= '</tr>';
                            $bodyemail .= '<tr>';
                            $bodyemail .= '<td>Tanggal Pengajuan</td><td>:</td><td>'.$detailwo[0][0]['addonnew'].'</td>';
                            $bodyemail .= '</tr>';
                            $bodyemail .= '<tr>';
                            $bodyemail .= '<td>User Pengaju</td><td>:</td><td>'.$detailwo[0][0]['addbyname'].'</td>';
                            $bodyemail .= '</tr>';
                            $bodyemail .= '<tr>';
                            $bodyemail .= '<td>Nomor Unit</td><td>:</td><td>'.$detailwo[0][0]['unit_number'].'</td>';
                            $bodyemail .= '</tr>';
                            $bodyemail .= '<tr>';
                            $bodyemail .= '<td>Catatan</td><td>:</td><td>'.$detailwo[0][0]['note'].'</td>';
                            $bodyemail .= '</tr>';
                            $bodyemail .= '</table>';					
                            $bodyemail .= '<table style="border:1px solid black;border-collapse: collapse;">';
                            $bodyemail .= '<tr style="border:1px solid black;">';
                            $bodyemail .= '<th style="border:1px solid black;">Denda</th>';
                            $bodyemail .= '<th style="border:1px solid black;">Nilai Denda</th>';
                            $bodyemail .= '<th style="border:1px solid black;">Nilai Writeoff</th>';
                            $bodyemail .= '<th style="border:1px solid black;">Sisa Denda Setelah Writeoff</th>';
                            $bodyemail .= '</tr>';
                            foreach($detailwo[1] as $dtlwo){
                                $bodyemail .= '<tr style="border:1px solid black;">';
                                $bodyemail .= '<td style="border:1px solid black;">'.$dtlwo['dendadesc'].'</td>';
                                $bodyemail .= '<td style="border:1px solid black;">'.$dtlwo['remaining_denda'].'</td>';
                                $bodyemail .= '<td style="border:1px solid black;">'.$dtlwo['writeoff'].'</td>';
                                $bodyemail .= '<td style="border:1px solid black;">'.$dtlwo['after_writeoff'].'</td>';
                                $bodyemail .= '</tr>';
                            }
                            $bodyemail .= '</table>';	
                            $bodyemail .= '<p>Untuk melakukan approval, silahkan klik tombol di bawah ini</p>';


                            $base_url = $_SERVER['REQUEST_SCHEME'].'://'.$_SERVER['HTTP_HOST'];
                            $modules               = 'cashier/writeoffapvbypass/status/';
                            $urlData = 'user=API&pass=API&writeoff_id='.$this->writeoff_id.'&approveid='.$email.'&modules='.$modules;

                            $urlDataApprove = $urlData.'&status=APPROVE';
                            $urlDataReject  = $urlData.'&status=REJECT';

                            $urlApprove     = $base_url.'/reroute.php/'.base64_encode($urlDataApprove);
                            $urlReject      = $base_url.'/reroute.php/'.base64_encode($urlDataReject);
                            
                            $bodyemail .= '
                                <table><tr><td><a style="border-radius: 4px;display: inline-block;font-size: 14px;font-weight: bold;line-height: 24px;padding: 12px 24px;text-align: center;text-decoration: none !important;transition: opacity 0.1s ease-in;color: #ffffff !important;background-color: #80bf2e;font-family: Ubuntu, sans-serif;" href="'.$urlApprove.'">Approve</a></td>
                                    <td><a style="border-radius: 4px;display: inline-block;font-size: 14px;font-weight: bold;line-height: 24px;padding: 12px 24px;text-align: center;text-decoration: none !important;transition: opacity 0.1s ease-in;color: #ffffff !important;background-color: #80bf2e;font-family: Ubuntu, sans-serif;" href="'.$urlReject.'">Reject</a></td></tr></table>

                            ';
                            $bodyemail .= '<br>';				
                            $bodyemail .= '<p>Regards,</p>';
                            $bodyemail .= '<p>Ces System Administrator</p>';
                            $bodyemail .= '<br>';				
                            $bodyemail .= '<br>';				
                            $bodyemail .= '<p><i>Notifikasi ini dikirim otomatis oleh system. Mohon untuk tidak membalas email ini.</i></p>';				
                            $bodyemail .= '</body>';				
                            $bodyemail .= '</html>';
                            
                            $email = trim($email);
                            $mail = new Cashier_Box_Library_Email();
                            $mail->getMail()->setFrom('ces@ciputra.co.id', "CES System");
                            $mail->getMail()->setBodyHtml(nl2br($bodyemail));
                            $mail->getMail()->addTo($email, $email);
                            //$mail->addCc('emailAddress', 'nameUser');
                            $mail->getMail()->setSubject('Writeoff Need Approval - '.$detailwo[0][0]['unit_number'].' untuk '.$email);
                            $mail->getMail()->send();
                        }
                    }
                } else {
                    $msg = "Unable to proccess data.";
                }
            }
//        }

        $this->setMsg($msg);
    }

}
