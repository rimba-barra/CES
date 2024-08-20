<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Dao
 *
 * @author DAVID-MIS
 */
class Erems_Models_Reservation_Dao extends Erems_Box_Models_App_AbDao implements Erems_Box_Models_App_BlackHole{
   
    public function getAll(Erems_Box_Models_App_HasilRequestRead $r,Erems_Models_Reservation_Reservation $v){
        $hasil = array();
        
        $hasil = $this->dbTable->SPExecute('sp_reservation_read',
                $v->getProject()->getId(),$v->getPt()->getId(),$r->getPage(),$r->getLimit(),
                $r->getOthersValue("unit_number")
                );

        //print_r($this->dbTable);
        //die();
        
        return $hasil;
    }


    public function getAllFillter(Erems_Models_Unit_UnitTran $unit,Erems_Box_Models_App_HasilRequestRead $r,$reservationNo ,$unitNumber,$customerName, $salesman){
        $hasil = array();

        $blockId = ''; $clusterId=''; $reservationDateUntil =''; $reservationDate='';

        $hasil = $this->dbTable->SPExecute('sp_reservation_read',$reservationNo,$blockId, $clusterId, $unitNumber,$customerName, $reservationDate, $reservationDateUntil ='',$unit->getProject()->getId(), $unit->getPt()->getId(),$r->getPage(),$r->getLimit(), $salesman);

        // print_r($hasil); die();

        return $hasil;
    }

    public function getAllFillterPopup($p,Erems_Box_Models_App_HasilRequestRead $r,$reservationNo ,$unitNumber,$customerName){
        $hasil = array();

        $blockId = ''; $clusterId=''; $reservationDateUntil =''; $reservationDate='';

        $hasil = $this->dbTable->SPExecute('sp_reservation_read',$reservationNo,$blockId, $clusterId, $unitNumber,$customerName, $reservationDate, $reservationDateUntil ='',$unit->getProject()->getId(), $unit->getPt()->getId(),$r->getPage(),$r->getLimit());

        //print_r($this->dbTable); die();

        return $hasil;
    }

    public function getOne($reservationId) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_reservationdetail_read', $reservationId);
    
        return $hasil;
    }

    public function getAvailableUnit($unitId){

        //is unit available
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_reservationunitcheck_read',$unitId);
        return $hasil;
    }

    /*COMBOBOX*/
    
    public function getScheduleType() {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_scheduletype_read');
    
        return $hasil;
    }

    public function getPriceType() {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_pricetype_read');
    
        return $hasil;
    }

    public function getMediaPromotion() {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_mediapromotion_read');
    
        return $hasil;
    }

    public function getReservationDays($project_id, $pt_id){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_reservationdays_read', $project_id, $pt_id );
        return $hasil;
    }
    
    
    public function approve(Erems_Models_Reservation_Reservation $v){
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_reservationapprove_update',
            $v->getAddBy(),$v->getId(),
            $v->getProject()->getId(),
            $v->getPt()->getId()
            );
        return $hasil;
    }

    public function reject(Erems_Models_Reservation_Reservation $v){
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_reservationreject_update',            
            $v->getAddBy(),$v->getId(),
            $v->getProject()->getId(),
            $v->getPt()->getId()
            );
        return $hasil;
    }
    public function release(Erems_Models_Reservation_Reservation $v){
        $hasil = 0;
        $status = 99;
        $hasil = $this->dbTable->SPUpdate('sp_reservationstatus_update',
            $v->getAddBy(),$v->getId(), $status ,
            $v->getProject()->getId(),
            $v->getPt()->getId()
            );
        return $hasil;
    }
    
     public function getIsReservationAprovalExist($user_id, $project_id, $pt_id){

        $hasil = array();
        $users = array();
        $hasil = $this->dbTable->SPExecute('sp_reservationapproveinfo_read',$user_id, $project_id, $pt_id );
        return $hasil;
    }


    public function save(Erems_Models_Reservation_Reservation $v){
        
        $row = $this->dbTable->SPExecute('sp_reservationgetno_read', $v->getProject()->getId(), $v->getPt()->getId());
    
        $params = array();
        $params['no'] = $row[0][0]['reservation_no'];
        $params['reservation_date'] = $v->getReservationDate();

        $rDU = new DateTime($v->getReservationDateUntil());
        $rDU->setTime(23, 59, 59);
        $v->setReservationDateUntil($rDU->format('Y-m-d H:i:s'));

        $reservationNo = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($v->getProject()->getId(), $v->getPt()->getId())->getReservationNoTemplate($params);
        $hasil = $this->dbTable->SPUpdate('sp_reservation_create',
            $v->getAddBy(),
            $v->getProject()->getId(),
            $v->getPt()->getId(),
            $reservationNo,
            $v->getReservationDate(),
            $v->getReservationDays(),
            $v->getReservationDateUntil(),
            $v->getUnitId(),
            $v->getCustomerName(),
            $v->getNotes(),
            $v->getCustomerPhone(),
            $v->getEmail(),
            $v->getPriceType(),
            $v->getBookingFee(),
            $v->getMediaPromotion(),
            $v->getCustomerAddress(),
            $v->getUangTitipan(),
            $v->getSalesmanId() // added by rico 14022023
        );

        return $hasil;
    }
    

    //sp_projectfacilitiestcodeexist_read
    
    public function update(Erems_Models_Reservation_Reservation $v){
        $hasil = 0;
      
        $hasil = $this->dbTable->SPUpdate('sp_reservation_update',$v->getAddBy(),
            $v->getProject()->getId(),
            $v->getPt()->getId(),
            $v->getId(),
            $v->getReservationDate(),
            $v->getReservationDays(),
            $v->getReservationDateUntil(),
            $v->getUnitId(),
            $v->getCustomerName(),
            $v->getNotes(),
            $v->getCustomerPhone(),
            $v->getEmail(),
            $v->getPriceType(),
            $v->getBookingFee(),
            $v->getMediaPromotion(),
            $v->getCustomerAddress(),
            $v->getUangTitipan(),
            $v->getSalesmanId() // added by rico 14022023
        );
              
              //  var_dump($this->dbTable);
        return $hasil;
    }

    public function directDelete(\Erems_Box_Models_App_Decan $decan, \Erems_Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPExecute('sp_reservation_destroy', $decan->getString(), $session->getUserId());
    //    var_dump($this->dbTable);
        $row = $row[0][0]['totalRow'];
        return $row;
    }
}
