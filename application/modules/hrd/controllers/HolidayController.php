<?php

/**
 * Description of AbsentrecordController
 *
 * @author MIS
 */
class Hrd_HolidayController extends Box_Models_App_Hermes_AbstractController  {
    protected function testingFlag() {
        return FALSE;
    }  
    
    
    public function listmonthRead(){
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $creator = new Box_Models_App_Creator();

        $data = array();
        $r = $this->getAppData();
      
        $year = $r["year"];
        
        $listMonth = array("January","February","March","April","May","June","July","August","September","October","November","December");
       
        for($i=0;$i<count($listMonth);$i++){
            $dg = new Hrd_Models_App_DayGenerator($i+1,$year);
            $month = new Hrd_Models_Master_General_Month();
            $month->setId($i+1);
            $month->setName($listMonth[$i]);
            $month->setMaxDay($dg->getMaxDay());
            $month->setStartDay($dg->getFirstDay());
           
            $data[] = $month;
        }




        $dm->setHasil(array($data));


        return $dm;
    }
    
    /*
      public function listmonthRead(){
        $data = array();
        $r = $this->getAppData();
      
        $year = $r["year"];
        
        $listMonth = array("January","February","March","April","May","June","July","August","September","October","November","December");
       
        for($i=0;$i<count($listMonth);$i++){
            $dg = new Hrd_Models_App_DayGenerator($i+1,$year);
            $month = new Hrd_Models_Master_General_Month();
            $month->setId($i+1);
            $month->setName($listMonth[$i]);
            $month->setMaxDay($dg->getMaxDay());
            $month->setStartDay($dg->getFirstDay());
           
            $data[] = $month;
        }
    
    
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'month', array(),array());
        $dm->setDataList($dataList);
        $dm->setHasil($data);
        $dm->setDirectResult(TRUE);
        return $dm;
    }
     */
    
    public function allRead(){
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'calendar', array('department'),array('detail'));
        $dao = new Hrd_Models_Calendar_Dao();
        $cal = new Hrd_Models_Calendar_Calendar();
        $cal->setProject($this->getAppSession()->getProject());
        $cal->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAll($this->getAppRequest(),$cal);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    
    public function detailRead(){
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'calendardetail', array('shifttype'),array());
        $hasil = array();
        $cd = new Hrd_Models_Calendar_CalendarDetail();
        $cd->getCalendar()->setArrayTable($this->getAppData());
        $dao = new Hrd_Models_Calendar_Dao();
        $hasil = $dao->getDetail($cd);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    
    
    
    public function mainCreate(){
        $dm = new Box_Models_App_Hermes_DataModel();
        $obj = new Hrd_Models_Calendar_Calendar();
        $ses = $this->getAppSession();
        
        $obj->setProject($ses->getProject());
        $obj->setPt($ses->getPt());
        $dm->setDao(new Hrd_Models_Calendar_Dao());
        $dm->setValidator(new Hrd_Models_Calendar_Validator());
        $dm->setObject($obj);
    
        return $dm;
    }
    
    public function mainDelete(){
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setObject(new Hrd_Models_Calendar_Calendar());
        $dm->setDao(new Hrd_Models_Calendar_Dao());
        $dm->setIdProperty("calendar_id");
        return $dm;
    }
    
    
    
    
    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_Processor();
    }
    
    
}

?>
