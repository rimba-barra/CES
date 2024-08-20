<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Master_Helpers_Templatemail extends Zend_Controller_Action_Helper_Abstract {

    public function init() {
        $this->_session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    public function htmlvoucherrequest($param) {
        $data = $param;
        if ($param['hideparam'] == 'approve' || $param['hideparam'] == 'unapprove') {
            $statusdata = $param['hideparam'];
        } else {
            $statusdata = 'request';
        }
        $application = 'CASHIER APPS SYSTEM';
        $condition = 'VOUCHER DEPARTMENT ' . strtoupper($statusdata);
        $goto = 'https://ces.ciputragroup.com';
        $regard = 'Master Apps System';

        $dear = $data['approvename'];
        $userrequest = $data['userrequest'];
        $voucherno = $data['voucher_no'];
        $voucherdate = date('d-m-Y', strtotime($data['voucher_date']));
	$duedate = $this->checkDate(date('d-m-Y', strtotime($data['due_date'])));
        
        $duedate = ($duedate == '' ? '' : $duedate); 

        $project = $data['projectname'];
        $pt = $data['ptname'];
        $dataflow = $data['dataflow'];
        
        if ($dataflow == 'I') {
            $statusflow = 'IN TRANS &#45; Pengembalian biaya';
        } else {
            $statusflow = 'OUT TRANS &#45; Permintaan biaya';
        }

        $amount = number_format($data['amount']);
        $description = $data['description'];

        $html = "
                    <table border='0' cellspacing='0' cellpadding='0' style='max-width:600px;' align='center'>
                        <tbody>
                            <tr height='16'></tr>
                            <tr>
                                <td>
                                    <table bgcolor='#4CAF50' width='100%' border='0' cellspacing='0' cellpadding='0' style=' min-width:332px;  max-width:600px; border:1px solid #e0e0e0;  border-bottom:0;  border-top-left-radius:3px; border-top-right-radius:3px;'>
                                        <tbody>
                                            <tr>
                                                <td height='30px' colspan='3'></td>
                                            </tr>
                                            <tr>
                                                <td width='32px'></td>
                                                <td style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:24px;color:#ffffff; line-height:1.25;'><span style='text-shadow:7px 6px 9px #000000;'>CIPUTRA - $application <br/><br/><small>$condition</small></span></td>
                                                <td width='32px'></td>
                                            </tr>
                                            <tr>
                                                <td height='18px' colspan='3'></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <table bgcolor='#FAFAFA' width='100%' border='0' cellspacing='0' cellpadding='0' style=' min-width:332px;max-width:600px;border:1px solid #f0f0f0;border-bottom:1px solid #c0c0c0;border-top:0;border-bottom-left-radius:3px;border-bottom-right-radius:3px;'>
                                        <tbody>
                                            <tr height='16px'>
                                                <td width='32px' rowspan='3'></td>
                                                <td></td>
                                                <td width='32px' rowspan='3'></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <table style='min-width:300px' border='0' cellspacing='0' cellpadding='0'>
                                                        <tbody>
                                                            <tr>
                                                                <td style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:13px;color:#202020;line-height:1.5;'>Kepada Yth,</td>
                                                            </tr>
                                                            <tr>
                                                                <td style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:13px; color:#202020; line-height:1.5;'>
                                                                    $dear <br/><br/>

                                                                    Terdapat pengajuan voucher department yang dibuat oleh $userrequest dan memerlukan proses approval, berikut detail voucher 
                                                                    yang diajukan :
                                                                    <table border='0' cellspacing='0' cellpadding='0' style='margin-top:16px;margin-bottom:16px;'>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>Nomor Voucher</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>:</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>$voucherno</span></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>Tanggal Voucher</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>:</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>$voucherdate</span></td>
                              	                                              </tr>

									     <tr>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>Due Date</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>:</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>$duedate</span></td>
                                                                            </tr>									
		

                                                                            <tr>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>Project</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>:</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>$project</span></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>PT (Company)</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>:</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>$pt</span></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style='line-height:1.2'><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>Status Pengajuan</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>:</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>$statusflow</span></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>Nilai</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>:</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>$amount</span></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>Keterangan</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>:</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>$description</span></td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                    Mohon bantuan untuk melakukan Revisi dan Approval atas voucher tersebut dari Aplikasi Master, untuk melakukan proses tersebut silakan klik tombol dibawah ini.<br><br>
                                                                    <a href='$goto' style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;display:inline-block;text-align:center;text-decoration:none;height:36px;line-height:36px;padding-left:8px; padding-right:8px; min-width:88px; font-size:14px;font-weight:400;color:#ffffff; background-color:#4CAF50;border-radius:2px; border-width:0px;text-shadow:7px 6px 9px #000000;' target='_blank'>Goto Ciputra Web Application</a><br><br>
                                                                </td>
                                                            </tr>
                                                            <tr height='32px'></tr>
                                                            <tr>
                                                                <td style=' font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:16px;color:#4CAF50;line-height:1.5;font-weight: bold;'>Regards,<br>$regard</td>
                                                            </tr>                                        
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr height='32px'></tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            </tbody>
                 </table>
              
            ";
        return $html;
    }

    public function htmlvoucherapprove($param) {
        $data = $param;
        if ($param['hideparam'] == 'approve' || $param['hideparam'] == 'unapprove') {
            $statusdata = $param['hideparam'];
        } else {
            $statusdata = 'request';
        }

        $application = 'CASHIER APPS SYSTEM';
        $condition = 'VOUCHER DEPARTMENT ' . strtoupper($statusdata);
        $goto = 'https://ces.ciputragroup.com';
        $regard = 'Master Apps System';

        $dear = $data['userrequest'];
        $approvename = $data['approvename'];
        $voucherno = $data['voucher_no'];
        $voucherdate = date('d-m-Y', strtotime($data['voucher_date']));
	$duedate = $this->checkDate(date('d-m-Y', strtotime($data['due_date'])));
        
        $duedate = ($duedate == '' ? '' : $duedate); 
       
        
        $project = $data['projectname'];
        $pt = $data['ptname'];
        $dataflow = $data['dataflow'];
        if ($dataflow == 'I') {
            $statusflow = 'IN TRANS &#45; Pengembalian biaya';
        } else {
            $statusflow = 'OUT TRANS &#45; Permintaan biaya';
        }

        $amount = number_format($data['amount']);
        $description = $data['description'];

        $html = "
                    <table border='0' cellspacing='0' cellpadding='0' style='max-width:600px;' align='center'>
                        <tbody>
                            <tr height='16'></tr>
                            <tr>
                                <td>
                                    <table bgcolor='#4CAF50' width='100%' border='0' cellspacing='0' cellpadding='0' style=' min-width:332px;  max-width:600px; border:1px solid #e0e0e0;  border-bottom:0;  border-top-left-radius:3px; border-top-right-radius:3px;'>
                                        <tbody>
                                            <tr>
                                                <td height='30px' colspan='3'></td>
                                            </tr>
                                            <tr>
                                                <td width='32px'></td>
                                                <td style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:24px;color:#ffffff; line-height:1.25;'><span style='text-shadow:7px 6px 9px #000000;'>CIPUTRA - $application <br/><br/><small>$condition</small></span></td>
                                                <td width='32px'></td>
                                            </tr>
                                            <tr>
                                                <td height='18px' colspan='3'></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <table bgcolor='#FAFAFA' width='100%' border='0' cellspacing='0' cellpadding='0' style=' min-width:332px;max-width:600px;border:1px solid #f0f0f0;border-bottom:1px solid #c0c0c0;border-top:0;border-bottom-left-radius:3px;border-bottom-right-radius:3px;'>
                                        <tbody>
                                            <tr height='16px'>
                                                <td width='32px' rowspan='3'></td>
                                                <td></td>
                                                <td width='32px' rowspan='3'></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <table style='min-width:300px' border='0' cellspacing='0' cellpadding='0'>
                                                        <tbody>
                                                            <tr>
                                                                <td style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:13px;color:#202020;line-height:1.5;'>Kepada Yth,</td>
                                                            </tr>
                                                            <tr>
                                                                <td style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:13px; color:#202020; line-height:1.5;'>
                                                                    $dear <br/><br/>

                                                                   Telah dilakukan $statusdata oleh $approvename,dengan detail voucher  yang diajukan sebagai berikut :
                                                                    <table border='0' cellspacing='0' cellpadding='0' style='margin-top:16px;margin-bottom:16px;'>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>Nomor Voucher</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>:</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>$voucherno</span></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>Tanggal Voucher</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>:</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>$voucherdate</span></td>
                                                                            </tr>

									    <tr>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>Due Date</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>:</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>$duedate</span></td>
                                                                            </tr>		


                                                                            <tr>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>Project</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>:</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>$project</span></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>PT (Company)</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>:</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>$pt</span></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style='line-height:1.2'><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>Status Pengajuan</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>:</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>$statusflow</span></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>Nilai</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>:</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>$amount</span></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>Keterangan</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>:</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>$description</span></td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                            <tr height='32px'></tr>
                                                            <tr>
                                                                <td style=' font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:16px;color:#4CAF50;line-height:1.5;font-weight: bold;'>Regards,<br>$regard</td>
                                                            </tr>                                        
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr height='32px'></tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            </tbody>
                 </table>
              
            ";
        return $html;
    }



   public function checkDate($date) {
        if ($date == '01-01-1970') {
            $cleardate = '';
        } else if ($date == '01-01-1990') {
            $cleardate = '';
        } else if ($date == '01-01-1970 07:00:00') {
            $cleardate = '';
        } else if ($date == '01-01-1990 07:00:00') {
            $cleardate = '';
        } else {
            $cleardate = $date;
        }
        return $cleardate;
    }
    
    public function htmlkasbonrequest($param) {
        $data = $param;
        if ($param['hideparam'] == 'approve' || $param['hideparam'] == 'unapprove') {
            $statusdata = $param['hideparam'];
        } else {
            $statusdata = 'request';
        }
        $application = 'CASHIER APPS SYSTEM';
        $condition = 'KASBON DEPARTMENT ' . strtoupper($statusdata);
        $goto = 'https://ces.ciputragroup.com';
        $regard = 'Master Apps System';

        $dear = $data['approvename'];
        $userrequest = $data['userrequest'];
        $kasbonno = $data['voucher_no'];
        $kasbondate = date('d-m-Y', strtotime($data['voucher_date']));
	

        $project = $data['projectname'];
        $pt = $data['ptname'];
        $dataflow = $data['dataflow'];
        
        if ($dataflow == 'I') {
            $statusflow = 'IN TRANS &#45; Pengembalian biaya';
        } else {
            $statusflow = 'OUT TRANS &#45; Permintaan biaya';
        }

        $amount = number_format($data['amount']);
        $description = $data['description'];

        $html = "
                    <table border='0' cellspacing='0' cellpadding='0' style='max-width:600px;' align='center'>
                        <tbody>
                            <tr height='16'></tr>
                            <tr>
                                <td>
                                    <table bgcolor='#4CAF50' width='100%' border='0' cellspacing='0' cellpadding='0' style=' min-width:332px;  max-width:600px; border:1px solid #e0e0e0;  border-bottom:0;  border-top-left-radius:3px; border-top-right-radius:3px;'>
                                        <tbody>
                                            <tr>
                                                <td height='30px' colspan='3'></td>
                                            </tr>
                                            <tr>
                                                <td width='32px'></td>
                                                <td style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:24px;color:#ffffff; line-height:1.25;'><span style='text-shadow:7px 6px 9px #000000;'>CIPUTRA - $application <br/><br/><small>$condition</small></span></td>
                                                <td width='32px'></td>
                                            </tr>
                                            <tr>
                                                <td height='18px' colspan='3'></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <table bgcolor='#FAFAFA' width='100%' border='0' cellspacing='0' cellpadding='0' style=' min-width:332px;max-width:600px;border:1px solid #f0f0f0;border-bottom:1px solid #c0c0c0;border-top:0;border-bottom-left-radius:3px;border-bottom-right-radius:3px;'>
                                        <tbody>
                                            <tr height='16px'>
                                                <td width='32px' rowspan='3'></td>
                                                <td></td>
                                                <td width='32px' rowspan='3'></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <table style='min-width:300px' border='0' cellspacing='0' cellpadding='0'>
                                                        <tbody>
                                                            <tr>
                                                                <td style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:13px;color:#202020;line-height:1.5;'>Kepada Yth,</td>
                                                            </tr>
                                                            <tr>
                                                                <td style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:13px; color:#202020; line-height:1.5;'>
                                                                    $dear <br/><br/>

                                                                    Terdapat pengajuan kasbon department yang dibuat oleh $userrequest dan memerlukan proses approval, berikut detail kasbon 
                                                                    yang diajukan :
                                                                    <table border='0' cellspacing='0' cellpadding='0' style='margin-top:16px;margin-bottom:16px;'>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>Nomor kasbon</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>:</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>$kasbonno</span></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>Tanggal kasbon</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>:</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>$kasbondate</span></td>
                              	                                              </tr>

									   								
		

                                                                            <tr>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>Project</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>:</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>$project</span></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>PT (Company)</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>:</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>$pt</span></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style='line-height:1.2'><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>Status Pengajuan</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>:</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>$statusflow</span></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>Nilai</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>:</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>$amount</span></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>Keterangan</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>:</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>$description</span></td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                    Mohon bantuan untuk melakukan Revisi dan Approval atas kasbon tersebut dari Aplikasi Master, untuk melakukan proses tersebut silakan klik tombol dibawah ini.<br><br>
                                                                    <a href='$goto' style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;display:inline-block;text-align:center;text-decoration:none;height:36px;line-height:36px;padding-left:8px; padding-right:8px; min-width:88px; font-size:14px;font-weight:400;color:#ffffff; background-color:#4CAF50;border-radius:2px; border-width:0px;text-shadow:7px 6px 9px #000000;' target='_blank'>Goto Ciputra Web Application</a><br><br>
                                                                </td>
                                                            </tr>
                                                            <tr height='32px'></tr>
                                                            <tr>
                                                                <td style=' font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:16px;color:#4CAF50;line-height:1.5;font-weight: bold;'>Regards,<br>$regard</td>
                                                            </tr>                                        
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr height='32px'></tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            </tbody>
                 </table>
              
            ";
        return $html;
    }

    
    public function htmlkasbonapprove($param) {
        $data = $param;
        if ($param['hideparam'] == 'approve' || $param['hideparam'] == 'unapprove') {
            $statusdata = $param['hideparam'];
        } else {
            $statusdata = 'request';
        }
        $application = 'CASHIER APPS SYSTEM';
        $condition = 'KASBON DEPARTMENT ' . strtoupper($statusdata);
        $goto = 'https://ces.ciputragroup.com';
        $regard = 'Master Apps System';
        
        $dear = $data['userrequest'];
        
        $userrequest = $data['userrequest'];
        $voucherno = $data['voucher_no'];
        $voucherdate = date('d-m-Y', strtotime($data['voucher_date']));
	
        $approvename = $data['approvename'];
        $project = $data['projectname'];
        $pt = $data['ptname'];
        $dataflow = $data['dataflow'];
        
        if ($dataflow == 'I') {
            $statusflow = 'IN TRANS &#45; Pengembalian biaya';
        } else {
            $statusflow = 'OUT TRANS &#45; Permintaan biaya';
        }

        $amount = number_format($data['amount']);
        $description = $data['description'];

        $html = "
                  <table border='0' cellspacing='0' cellpadding='0' style='max-width:600px;' align='center'>
                        <tbody>
                            <tr height='16'></tr>
                            <tr>
                                <td>
                                    <table bgcolor='#4CAF50' width='100%' border='0' cellspacing='0' cellpadding='0' style=' min-width:332px;  max-width:600px; border:1px solid #e0e0e0;  border-bottom:0;  border-top-left-radius:3px; border-top-right-radius:3px;'>
                                        <tbody>
                                            <tr>
                                                <td height='30px' colspan='3'></td>
                                            </tr>
                                            <tr>
                                                <td width='32px'></td>
                                                <td style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:24px;color:#ffffff; line-height:1.25;'><span style='text-shadow:7px 6px 9px #000000;'>CIPUTRA - $application <br/><br/><small>$condition</small></span></td>
                                                <td width='32px'></td>
                                            </tr>
                                            <tr>
                                                <td height='18px' colspan='3'></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <table bgcolor='#FAFAFA' width='100%' border='0' cellspacing='0' cellpadding='0' style=' min-width:332px;max-width:600px;border:1px solid #f0f0f0;border-bottom:1px solid #c0c0c0;border-top:0;border-bottom-left-radius:3px;border-bottom-right-radius:3px;'>
                                        <tbody>
                                            <tr height='16px'>
                                                <td width='32px' rowspan='3'></td>
                                                <td></td>
                                                <td width='32px' rowspan='3'></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <table style='min-width:300px' border='0' cellspacing='0' cellpadding='0'>
                                                        <tbody>
                                                            <tr>
                                                                <td style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:13px;color:#202020;line-height:1.5;'>Kepada Yth,</td>
                                                            </tr>
                                                            <tr>
                                                                <td style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:13px; color:#202020; line-height:1.5;'>
                                                                    $dear <br/><br/>

                                                                   Telah dilakukan $statusdata oleh $approvename,dengan detail KASBON  yang diajukan sebagai berikut :
                                                                    <table border='0' cellspacing='0' cellpadding='0' style='margin-top:16px;margin-bottom:16px;'>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>Nomor KASBON</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>:</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>$voucherno</span></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>Tanggal KASBON</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>:</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>$voucherdate</span></td>
                                                                            </tr>

									  

                                                                            <tr>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>Project</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>:</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>$project</span></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>PT (Company)</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>:</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>$pt</span></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style='line-height:1.2'><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>Status Pengajuan</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>:</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>$statusflow</span></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>Nilai</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>:</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>$amount</span></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>Keterangan</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>:</span></td>
                                                                                <td><span style='font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:#727272;font-weight: bold;'>$description</span></td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                            <tr height='32px'></tr>
                                                            <tr>
                                                                <td style=' font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:16px;color:#4CAF50;line-height:1.5;font-weight: bold;'>Regards,<br>$regard</td>
                                                            </tr>                                        
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr height='32px'></tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            </tbody>
                 </table>
              
              
            ";
        return $html;
    }

}
