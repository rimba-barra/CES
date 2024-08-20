<?php

/**
 * Description of AbsentProcessor
 *
 * @author MIS
 */
class Erems_Models_App_Box_VerificationProcessor extends Erems_Models_App_Box_Processor {

    public function daoProses($dao, $object, $modeCreate) {
     
        switch ($modeCreate) {
            case "setupsheet":
                return $dao->setupShift($object);
                break;
        }
    }
    
    public function daoSave($dao, $object) {
        $hasilSave = $dao->save($object);
        
        $params = $this->getData();

        $sendMail = false;
        $others = array(
            "SEND_MAIL" => FALSE,
            "SEND_STATUS" => FALSE,
            "SEND_OTHERS" => NULL // other information of send mail
        );

        if ($hasilSave > 0) { // jika berhasil save data, maka cek param send mail
           
            $sendMail = 1;

            if ($sendMail > 0) {
                $others["SEND_MAIL"] = TRUE;
                try {
                    $others["SEND_STATUS"] = TRUE;
                    
                    $receiverEmail = $object->getApproveBy();
                    $receiverName = $object->getApproveBy();
                    $unitNumber = $params["unit_unit_number"];

                    $players = array(
                        'approve' => array(
                            'email' => $receiverEmail,
                            'name' => $receiverName
                        )
                    );

                    $others["SEND_OTHERS"] = $players;

                    $message = '<html><body>';
                    $message .= '<p>Dear ' . $receiverName . '</p>';
                    $message .= '<p> <br/>';
                    $message .= '</p>';
                    $message .= '<p>Berikut permohonan transaksi pada CES (Ciputra Enterprise System), <br/>';
                    $message .= 'Mohon bantuan untuk persetujuannya.	<br/>';
                    $message .= '</p>';
                    $message .= '<p>';
                    $message .= '<table>';
                    $message .= '<tr><td>Persetujuan        </td><td>: Discount Purchaseletter </td></tr>';
                    $message .= '<tr><td>Nama Project        </td><td>: '.$object->getProject()->getName().' </td></tr>';
                    $message .= '<tr><td>Cluster        </td><td>: '.$params["cluster_cluster"].' </td></tr>';
              
                    $message .= '<tr><td>Nomor Unit       </td><td>: '.$unitNumber.'</td></tr>';
                   
                    $message .= '<tr><td>Tanggal permohonan </td><td>: ' . date("d-m-Y H:i:s") . '</td></tr>';
                    $message .= '</table>';
                    $message .= '</p>';
                    $message .= '<p>Deskripsi			:</p>';
                    $message .= '<p> <br/>';
                    $message .= '<br/>';
                    $message .= '<br/>';
                    $message .= '<a href="https://ces.ciputragroup.com/">Login disini untuk proses persetujuan</a><br/>';
                    $message .= '<br/>';
                    $message .= '<br/>';
                    $message .= 'Terima Kasih,	</p>';
                    $message .= '<p> &nbsp; </p>';
                    $message .= '<p>' . $object->getSubmitBy() . ' </p>';
                    $message .= "</body></html>";
                    $mail = new Erems_Box_Library_Email();
                    $mail->getMail()->setFrom('mis.kpjkt@ciputra.co.id');
                    $mail->getMail()->setBodyHtml(nl2br($message));
                    $mail->getMail()->addTo($players["approve"]["email"], $players["approve"]["name"]);
                    $mail->getMail()->setSubject('Request for Discount of Purchaseletter');
                    $mail->getMail()->send();

                    $statusSentMail = TRUE;
                } catch (Zend_Mail_Exception $e) {
                    $others["SEND_STATUS"] = FALSE;
                    $others["SEND_OTHERS"] = $e->getMessage();
                    $statusSentMail = FALSE;
                }
            }
        }


        return array("status" => $hasilSave, "others" => $others);
    }
    
   


}

?>
