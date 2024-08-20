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
class Erems_Models_Sms_Dao extends Erems_Box_Models_App_AbDao implements Erems_Box_Models_App_BlackHole{


    public function getAllSMSCategory(Erems_Models_SMS_SMSCategory $sc){
        $hasil = array();

        $hasil = $this->dbTable->SPExecute('sp_smscategory_read',1,9999,$sc->getProject()->getId(),$sc->getPt()->getId(),$sc->getId(),$sc->getCode());

        return $hasil;
    }
    
    public function getSMSCategory(Erems_Models_SMS_SMSCategory $sc){
        $hasil = array();

        $hasil = $this->dbTable->SPExecute('sp_smscategory_read',1,1,$sc->getProject()->getId(),$sc->getPt()->getId(),$sc->getId(),"");

        return $hasil;
    }
    
    public function getAllTagihan($projectId,$ptId,$startDate,$endDate){
        $hasil = array();

        $hasil = $this->dbTable->SPExecute('sp_smstagihan_read',$projectId,$ptId,$startDate,$endDate);

        return $hasil;
    }
    
    public function getAllReminderTagihan($projectId,$ptId,$startDate,$endDate,$maxHari){
        $hasil = array();

        $hasil = $this->dbTable->SPExecute('sp_smsremindertagihan_read',$projectId,$ptId,$startDate,$endDate,$maxHari);

        return $hasil;
    }
    
    public function getAllBerkas($projectId,$ptId){
        $hasil = array();

        $hasil = $this->dbTable->SPExecute('sp_smsberkas_read',$projectId,$ptId);

        return $hasil;
    }
    
    public function getAllSerahTerima($projectId,$ptId,$startDate,$endDate){
        $hasil = array();

        $hasil = $this->dbTable->SPExecute('sp_smsserahterima_read',$projectId,$ptId,$startDate,$endDate);

        return $hasil;
    }
    
    public function getAllHariRaya($projectId,$ptId,$tipeHariRaya){
        $hasil = array();

        $hasil = $this->dbTable->SPExecute('sp_smshariraya_read',$projectId,$ptId,$tipeHariRaya);

        return $hasil;
    }
    
    public function getAllSudahBayar($projectId,$ptId,$startDate,$endDate,$maxHari){
        $hasil = array();

        $hasil = $this->dbTable->SPExecute('sp_smssudahbayar_read',$projectId,$ptId,$startDate,$endDate,$maxHari);

        return $hasil;
    }
    
    public function getAllSudahBayarB($projectId,$ptId,$prosesDate){
        $hasil = array();

        $hasil = $this->dbTable->SPExecute('sp_smssudahbayar2_read',$projectId,$ptId,$prosesDate);

        return $hasil;
    }
    
    public function getAllAkad($projectId,$ptId,$startDate,$endDate){
        $hasil = array();

        $hasil = $this->dbTable->SPExecute('sp_smsakad_read',$projectId,$ptId,$startDate,$endDate);

        return $hasil;
    }
    
    public function getAllAjb($projectId,$ptId,$startDate,$endDate){
        $hasil = array();

        $hasil = $this->dbTable->SPExecute('sp_smsajb_read',$projectId,$ptId,$startDate,$endDate);

        return $hasil;
    }
    
    public function getAllProspek($projectId,$ptId){
        $hasil = array();

        $hasil = $this->dbTable->SPExecute('sp_smsprospek_read',$projectId,$ptId);


        return $hasil;
    }
    
    public function getAllKprAcc($projectId,$ptId,$startDate,$endDate){
        $hasil = array();

        $hasil = $this->dbTable->SPExecute('sp_smskpracc_read',$projectId,$ptId,$startDate,$endDate);

        return $hasil;
    }
    
    public function getAllWawancara($projectId,$ptId,$startDate,$endDate){
        $hasil = array();

        $hasil = $this->dbTable->SPExecute('sp_smswawancara_read',$projectId,$ptId,$startDate,$endDate);

        return $hasil;
    }
    
    public function getAll(Erems_Box_Models_App_HasilRequestRead $r,Erems_Models_SMS_SMS $sms,$unitNumber,$customerName,$processDate,$smsCategoryId,$smsStatus, $bot_purchaseDate, $top_purchaseDate){
        $hasil = array();

        $unitNumber = ($unitNumber == '' ? $unitNumber : substr($unitNumber,0,20));
        $customerName = ($customerName == '' ? $customerName : substr($customerName,0,30));
        $processDate = ($processDate == '' ? $processDate : substr($processDate,0,10));
        $smsCategoryId = ($smsCategoryId == '' ? $smsCategoryId : substr($smsCategoryId,0,10));
        $smsStatus = ($smsStatus == '' ? $smsStatus : substr($smsStatus,0,10));

        if($smsStatus==99 || $smsStatus=='' || $smsStatus==NULL){
            $smsStatus = ($smsStatus == '' ? 0 : $smsStatus);

            $hasil = $this->dbTable->spToQuery2('sp_sms_nullstatus_read',
                substr($sms->getProject()->getId(),0,10),substr($sms->getPt()->getId(),0,10),substr($r->getPage(),0,10),substr($r->getLimit(),0,10),
                $unitNumber,$customerName,
                $processDate,$smsCategoryId,$smsStatus,$bot_purchaseDate,$top_purchaseDate
            );
        }else{
            $hasil = $this->dbTable->spToQuery2('sp_sms_read',
                substr($sms->getProject()->getId(),0,10),substr($sms->getPt()->getId(),0,10),substr($r->getPage(),0,10),substr($r->getLimit(),0,10),
                $unitNumber,$customerName,
                $processDate,$smsCategoryId,$smsStatus,$bot_purchaseDate,$top_purchaseDate
            ); 
        }

        return $hasil;
    }
    
    public function getAllByPageLimit($page,$limit,$project,$pt,$unitNumber,$customerName,$processDate,$smsCategoryId){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_sms_read',
            $project,$pt,$page,$limit,
            $unitNumber,$customerName,
            $processDate,$smsCategoryId
        );
        return $hasil;
    }
    //adedd by semy 22-06-17
    public function getAllByPageNoLimit($project,$pt,$unitNumber,$customerName,$processDate,$smsCategoryId){
        $hasil = array();
            /*
           $hasil = $this->dbTable->SPExecute('sp_sms_all_read',
                $project,$pt,
                $unitNumber,$customerName,
                $processDate,$smsCategoryId);
             
             */
                $hasil = $this->dbTable->spToQuery2('sp_sms_nullstatus_read',
                    $project,$pt,1,99999999,
                    $unitNumber,$customerName,
                    $processDate,$smsCategoryId
                );

                return $hasil;
            }
    //ended semy





            public function save(Erems_Models_Sms_SMS $sms){
                $hasil = 0;




                $hasil = $this->dbTable->SPUpdate('sp_sms_create',$sms->getAddBy(),
                    $sms->getProject()->getId(),$sms->getPt()->getId(),
                    $sms->getPurchaseletter()->getId(),
                    $sms->getCustomer()->getId(),
                    $sms->getPhoneNumber(),
                    $sms->getSMSCategory()->getId(),
                    $sms->getFlagType(),
                    $sms->getProcessDate(),
                    $sms->getCollectorId(),
                    $sms->getNotes(),
                    NULL, NULL
                );


        /*
       
        $hasil = $this->dbTable->SPUpdate('sp_blockb_create',$pc->getAddBy(),$pc->getProject()->getId(),
                $pc->getPt()->getId(),$pc->getCode(),$pc->getName(),$pc->getCluster()->getId(),$pc->getDescription());
        */

                return $hasil;
            }

            public function saveMultiSMS($userId,$projectId,$ptId,$decan){
                $hasil = 0;

                $dcResult = $decan->getDCResult();


                $hasil = $this->dbTable->SPUpdate('sp_sms_create',$userId,$projectId,$ptId,
                    $dcResult["purchaseletter_id"],
                    $dcResult["customer_customer_id"],
                    $dcResult["sms_phonenumber"],
                    $dcResult["smscategory_smscategory_id"],
                    $dcResult["flag_type"],
                    $dcResult["process_date"],
                    $dcResult["collector_id"],
                    $dcResult["notes"],
                    $dcResult["duedate"],
                    $dcResult["amount"]
                );


                return $hasil;
            }

            public function codeExist(Erems_Models_Master_BlockTran $ft){
                $hasil = 0;
                $hasil = $this->dbTable->SPExecute('sp_blockcodeexist_read',$ft->getCode(),$ft->getCluster()->getId());

                return $hasil;
            }

    //sp_projectfacilitiestcodeexist_read

            public function update(Erems_Models_Sms_SMS $sms){
                $hasil = 0;

                $hasil = $this->dbTable->SPUpdate('sp_sms_update',$sms->getAddBy(),
                    $sms->getId(),
                    $sms->getCustomer()->getId(),
                    $sms->getPhoneNumber(),
                    $sms->getSMSCategory()->getId(),
                    $sms->getProcessDate(),
                    $sms->getNotes()
                );


              //  var_dump($this->dbTable);
                return $hasil;
            }

            public function saveSmsCode($params){
                $hasil = 0;

                $hasil = $this->dbTable->SPUpdate('sp_sms_code_update',
                    $params['sms_id'], 
                    $params['status'],
                    $params['sent_by'],
                    $params['returncode']
                );
          //var_dump($this->dbTable);
                return $hasil;
            }

            public function saveSmsStatus($params){
                $hasil = 0;

                $hasil = $this->dbTable->SPUpdate('sp_sms_status_update',
                    $params['sms_id'], 
                    $params['status']
                );
        //var_dump($this->dbTable);
                return $hasil;
            }


            public function directDelete(\Erems_Box_Models_App_Decan $decan, \Erems_Box_Kouti_InterSession $session) {
                $row = 0;
                $row = $this->dbTable->SPUpdate('sp_sms_destroy', $decan->getString(), $session->getUserId());
                return $row;
            }

            public function getDataSendEmail($smsid){
                $hasil = array();

                $hasil = $this->dbTable->SPExecute('sp_sms_send_email', $smsid);

                return $hasil;
            }
        }
