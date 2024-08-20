<?php

/**
 * Description of AbsentDao
 *
 * @author MIS
 */
class Hrd_Models_Calendar_Dao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {
   
    
    public function save(Hrd_Models_Calendar_Calendar $c) {
        $hasil = 0;
       
        if(intval($c->getAddBy())==0){
            return $hasil;
        }
      
        $dc = $c->getDCResult();
        $hasil = $this->dbTable->SPUpdate('sp_calendar_create',$c->getAddBy(),$c->getProject()->getId(),$c->getPt()->getId(),$c->getYear(),$c->getDepartment()->getId(),$c->getIsDefault(),$dc["calendardetail_id"],$dc["day"],$dc["month"],$dc["is_holiday"],$dc["shifttype_id"]);
   
        return $hasil;
    }
    
    public function update(Hrd_Models_Calendar_Calendar $c){
        $hasil = 0;
       
        if(intval($c->getAddBy())==0 || $c->getId()==0){
            return $hasil;
        }
        $dc = $c->getDCResult();
        
       
     
     
        $hasil = $this->dbTable->SPUpdate('sp_calendar_update',$c->getId(),$c->getAddBy(),$c->getYear(),$c->getDepartment()->getId(),$c->getIsDefault(),$dc["calendardetail_id"],$dc["day"],$dc["month"],$dc["is_holiday"],$dc["shifttype_id"]);
   
        return $hasil;
    }
    
    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Calendar_Calendar $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_calendar_read', $r->getPage(), $r->getLimit(),$d->getProject()->getId(),$d->getPt()->getId());
        return $hasil;
    }
    
    public function getDetail(Hrd_Models_Calendar_CalendarDetail $cd){
        $hasil = array();
        if($cd->getCalendar()->getId() > 0){
            $hasil = $this->dbTable->SPExecute('sp_calendardetail_read',$cd->getCalendar()->getId());
        
        }
        return $hasil;
    }
    
    public function getDetailByEmployee(Hrd_Models_Absent $absent){
        $hasil = array();
        
        $hasil = $this->dbTable->SPExecute('sp_calendardetailforgenholiday_read','BYEMPLOYEE',$absent->getEmployee()->getId(),$absent->getMonth(),$absent->getYear());
        
        
        return $hasil;
    }
    
    public function getDetailByDepartment(Hrd_Models_Absent $absent){
        $hasil = array();
        
        $hasil = $this->dbTable->SPExecute('sp_calendardetailforgenholiday_read','BYDEPARTMENT',0,$absent->getMonth(),$absent->getYear(),$absent->getEmployee()->getDepartment()->getId());
        
        
        return $hasil;
    }
    
    public function getDetailByAll(Hrd_Models_Absent $absent){
        $hasil = array();
        
        $hasil = $this->dbTable->SPExecute('sp_calendardetailforgenholiday_read','BYALL',0,$absent->getMonth(),$absent->getYear(),0,$absent->getProject()->getId(),$absent->getPt()->getId());
        
        
        return $hasil;
    }
    
    public function isExist(Hrd_Models_Calendar_Calendar $c){
        $exist = FALSE;
        $hasil = $this->dbTable->SPExecute('sp_calendar_exist',$c->getYear(),$c->getDepartment()->getId(),$c->getProject()->getId(),$c->getPt()->getId());
        if(is_array($hasil)){
            if(key_exists(0, $hasil)){
                if(key_exists(0,$hasil[0])){
                    $exist = $hasil[0][0];
                }
            }
        }
        return $exist;
    }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_calendar_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }
}

?>
