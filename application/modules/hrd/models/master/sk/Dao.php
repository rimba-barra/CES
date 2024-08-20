<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Dao
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Master_Sk_Dao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {
    public function save(Hrd_Models_Master_Sk_MasterSK $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_mastersk_create',
                $d->getAddBy(),
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $d->getName(),
                $d->getNomor(),
                $d->getMasterkategorisk(),
                $d->getTanggal(),
                $d->getTanggalhabis(),
                $d->getKeterangan(),
                $d->getFileName(),
                $d->getPrivate(),
                $d->getActive()
                ); 
        
        
        return $hasil;
    }

    public function savefromimport($data) {
        $hasil = 0;  
        $hasil = $this->dbTable->SPUpdate(
                'sp_mastersk_create_from_import',
                $data['user_id'],
                $data['project_id'],
                $data['pt_id'],
                $data['name'],
                $data['nomor'],
                $data['masterkategorisk_id'],
                $data['tanggal'],
                $data['tanggal_habis'],
                $data['keterangan'],
                $data['file_name']
                );   
      
        return $hasil;
    }

    public function savetoexport($data) {
        $hasil = 0;  
        $hasil = $this->dbTable->SPUpdate(
                'sp_mastersk_create_to_export',
                $data['user_id'],
                $data['project_id'],
                $data['pt_id'],
                $data['name'],
                $data['nomor'],
                $data['masterkategorisk_id'],
                $data['tanggal'],
                $data['tanggal_habis'],
                $data['keterangan'],
                $data['file_name'],
                $data['mastersk_id']
                );   
      
        return $hasil;
    }

    public function sendemail_getroot($data) {
        $hasil = 0;  
        $hasil = $this->dbTable->SPExecute('sp_mastersk_read_userroot');
        return $hasil;
    }

    public function sendemail_getroot_projectpt($data) {
        $hasil = 0;  
        $hasil = $this->dbTable->SPExecute('sp_mastersk_read_userroot_projectpt',
                $data['mastersk_name'],
                $data['project_id'],
                $data['pt_id'],
                $data['employee_id']);
        return $hasil;
    }

    public function sendemail_getroot_email($data) {
        $hasil = 0;  
        $hasil = $this->dbTable->SPExecute('sp_mastersk_read_userroot_email',
                $data);
        return $hasil;
    }

    public function sendemail($email, $data) {
        $obj        = new Hrd_Models_Master_Sk_MasterSK();
        $hasil = 0; 
        $email_ciputra = $email;
        $item_email = $data;

        $body_message = "";
        $body_message = "Dear Bapak/Ibu, <br/><br/>
                         Document HC Filing sudah di Share ke Project PT bapak/ibu, oleh <b>'".$data[0]['addby_name']."'</b>.<br/>
                         Berikut ini nama dokumen dan project pt yang sudah di share ke bapak/ibu.<br/><br/>";

        $body_message .= "<table style='font-size:12px; font-family: Arial, sans-serif, Open Sans;'>
                            <thead>
                                <tr>
                                    <td style='background:#cdf1d3;padding: 8px 10px;text-align:center;'><b>No.</b></td>
                                    <td style='background:#cdf1d3;padding: 8px 10px;'><b>Document Name</b></td>
                                    <td style='background:#cdf1d3;padding: 8px 10px;'><b>Project</b></td>
                                    <td style='background:#cdf1d3;padding: 8px 10px;'><b>PT</b></td>
                                    <td style='background:#cdf1d3;padding: 8px 10px;'><b>Number</b></td>
                                    <td style='background:#cdf1d3;padding: 8px 10px;'><b>Category</b></td>
                                    <td style='background:#cdf1d3;padding: 8px 10px;'><b>Valid Date</b></td>
                                </tr>
                            </thead>
                            <tbody>"; 
        $i_body_message = 1;
        foreach($item_email as $key_mastersk => $item_mastersk){
            $nama_mastersk = $item_mastersk['name'];
            $nomor_mastersk = $item_mastersk['nomor'];
            $project_mastersk = $item_mastersk['project_name'];
            $pt_mastersk = $item_mastersk['pt_name'];
            $kategori_mastersk = $item_mastersk['masterkategorisk_name'];
            $tanggal_mastersk = date('d/M/Y',strtotime($item_mastersk['tanggal']));
            $tanggal_habis_mastersk = date('d/M/Y',strtotime($item_mastersk['tanggal_habis']));
            if($tanggal_habis_mastersk == '01/Jan/1970'){
                $tanggal_habis_mastersk = '01/Jan/9999';
            }
            if($i_body_message%2 == 0){
                $color_odd_even = '#f8f8f8';
            }else{
                $color_odd_even = '#ffffff';
            }
            $body_message .= "<tr style='background:".$color_odd_even.";'>
                                <td style='padding: 8px 10px;text-align:center;border-bottom:1px solid #dfdfdf;'>" . $i_body_message ."</td>
                                <td style='padding: 8px 10px;border-bottom:1px solid #dfdfdf;'>" . $nama_mastersk ."</td>
                                <td style='padding: 8px 10px;border-bottom:1px solid #dfdfdf;'>" . $project_mastersk ."</td>
                                <td style='padding: 8px 10px;border-bottom:1px solid #dfdfdf;'>" . $pt_mastersk ."</td>
                                <td style='padding: 8px 10px;border-bottom:1px solid #dfdfdf;'>" . $nomor_mastersk ."</td>
                                <td style='padding: 8px 10px;border-bottom:1px solid #dfdfdf;'>" . $kategori_mastersk ."</td>
                                <td style='padding: 8px 10px;border-bottom:1px solid #dfdfdf;'>" . $tanggal_mastersk ." - ". $tanggal_habis_mastersk ."</td>
                              </tr>";

            $i_body_message++;
        }
        $body_message .= "      </tbody>
                        </table><br/>";

        $body_message .= "Demikian informasi ini kami sampaikan atas perhatiannya kami ucapkan terima kasih.<br>
                        Regards,<br/>
                        Human Capital Management System";
        $sender = 'no.reply@ciputra.com';
        $to = $email_ciputra;
        // $to = 'michael@ciputra.com';

        if(!empty($to)){
            $mail = $obj->get_mail();
            $mail->setData()->setFrom($sender);
            $mail->setData()->setBodyHtml($body_message);
            $mail->setData()->addTo($to);
            $mail->setData()->setSubject('[Document HC Filing] Copy to Project Pt');
            if ($mail->setData()->send()) {
                $hasil = 1;
            }else{
            }
        }else{
            $hasil = 0;
        }

        return $hasil;
    }
    
    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Master_Sk_MasterSK $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_mastersk_read',
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $d->getName(),
                $d->getNomor(),
                $d->getMasterkategorisk(),
                $d->getActive(),
                $r->getPage(), $r->getLimit());
        return $hasil;
    }
    
    public function getAllWoPL(Hrd_Models_Master_Sk_MasterSK $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_mastersk_read',
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $d->getName(),
                $d->getMasterkategorisk(),
                $d->getActive(),
                $d->getNomor(),1,99999);
        return $hasil;
    }

    public function getAllDefaultBrowse(Hrd_Models_Master_Sk_MasterSK $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_mastersk_read_from_import',
                $d->getProjectid(),
                $d->getPtid(),
                $d->getName(),
                $d->getNomor(),
                1,99999);
        return $hasil;
    }   

    public function getAllDefaultApply(Hrd_Models_Master_Sk_MasterSK $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_mastersk_read_to_export',
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $d->getName(),
                $d->getNomor(),
                $d->getMasterkategorisk(),
                $d->getActive(),
                1,99999);
        return $hasil;
    }  

    public function getAllDefaultApply_Data(Hrd_Models_Master_Sk_MasterSK $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_mastersk_read_to_export',
                $d->getProjectid(),
                $d->getPtid(),
                $d->getName(),
                $d->getNomor(),
                $d->getMasterkategorisk(),
                $d->getActive(),
                1,99999);
        return $hasil;
    }   

    public function update(Hrd_Models_Master_Sk_MasterSK $em) {
        $hasil = 0;
        if ($em->getId() == 0) {
            return $hasil;
        }
       
        $hasil = $this->dbTable->SPUpdate('sp_mastersk_update', $em->getAddBy(), $em->getId(), 
                $em->getName(),
                $em->getNomor(),
                $em->getMasterkategorisk(),
                $em->getTanggal(),
                $em->getTanggalhabis(),
                $em->getKeterangan(),
                $em->getFileName(),
                $em->getPrivate(),
                $em->getActive());
        return $hasil;
    }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_mastersk_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }
}
