<?php

/**
 * Description of AbsentProcessor
 *
 * @author MIS
 */
class Hrd_Models_App_Box_AbsentProcessor extends Hrd_Models_App_Box_Processor {

    public function daoProses($dao, $object, $modeCreate) {

        switch ($modeCreate) {
            case "setupsheet":
                return $dao->setupShift($object);
                break;
            case "updatebyrangedate":
                return $dao->updateByRangeDateAbsentType($object);
                break;
            case "absenttlk":
                return $dao->updateTlk($object);
                break;
        }
    }

    public function afterFillData($object) {
        if ($object instanceof Hrd_Models_Master_General_Date) {

            //// all input timein and timeout from frontend based on timeA (7_14 in, 7_14 out) 
            $time = $object->getTimeA();
            if ($time instanceof Hrd_Models_Master_General_ShiftTime) {
                $dao = new Hrd_Models_Master_ShiftTypeDao();
                $daoResult = $dao->getOne($object->getShiftType()->getId());
              
                $shifType = new Hrd_Models_Master_ShiftType();
                $shifType->setArrayTable($daoResult[0][0]);
                $stIn = new Hrd_Models_App_Date(date("Y-m-d",  strtotime($time->getIn())).$shifType->getInTime());
                
         
                
                $timeIn = new Hrd_Models_App_Date($time->getIn());
                $timeOut = new Hrd_Models_App_Date($time->getOut());
                
                $lateTime = "00:00:00";
                /* calculate late */
                if($timeIn->getTime() > $stIn->getTime()){
                    $duration = ($timeIn->getTime() - $stIn->getTime()) - (60*60);
                    $lateTime = date("H:i:s",$duration);
                }
                
                $object->setLate($lateTime);
             
               
                 
                
                $tempStIn = $shifType->getInTime();
                $tempStOut = $shifType->getOutTime();
                $timeInF = date('H:i:s',$timeIn->getTime());
                $timeOutF = date('H:i:s',$timeOut->getTime());
        
                self::resetTimeInOut($object);
            
               
                if(self::isInTimeRange($tempStIn, Box_Config::TIME_A_BOT, Box_Config::TIME_A_TOP)){
                   $object->getTimeA()->setIn($timeInF);
                }else if(self::isInTimeRange($tempStIn, Box_Config::TIME_B_BOT, Box_Config::TIME_B_TOP)){
                   $object->getTimeB()->setIn($timeInF); 
                }else if(self::isInTimeRange($tempStIn, Box_Config::TIME_C_BOT, Box_Config::TIME_C_TOP)){
                     $object->getTimeC()->setIn($timeInF); 
                }
                if(self::isInTimeRange($tempStOut, Box_Config::TIME_A_BOT, Box_Config::TIME_A_TOP)){
                   $object->getTimeA()->setOut($timeOutF);
                }else if(self::isInTimeRange($tempStOut, Box_Config::TIME_B_BOT, Box_Config::TIME_B_TOP)){
                   $object->getTimeB()->setOut($timeOutF); 
                }else if(self::isInTimeRange($tempStOut, Box_Config::TIME_C_BOT, Box_Config::TIME_C_TOP)){
                     $object->getTimeC()->setOut($timeOutF); 
                }
                
               
          
              
                
            }
        }

       

        return $object;
    }
    
    
    // @params $time H:i:s
    public static function isInTimeRange($time,$timeRangeBot,$timeRangeTop){
        $hasil = false;
        if(strtotime($time) >= strtotime($timeRangeBot) && strtotime($time) <= strtotime($timeRangeTop)){
            $hasil = true;
        }
        return $hasil;
    }
    
    public static function resetTimeInOut(Hrd_Models_Master_General_Date $object){
        $object->getTimeA()->setIn('');
        $object->getTimeA()->setOut('');
        $object->getTimeB()->setIn('');
        $object->getTimeB()->setOut('');
        $object->getTimeC()->setIn('');
        $object->getTimeC()->setOut('');
    }

    // added by Michael 2021.05.19 
    /*@added 19.05.2021*/
    protected function getReadModel($controller,$debugSampleData){
        return new Hrd_Models_App_Box_ReportReadWorms($controller,$debugSampleData);
    }
    // end added by Michael 2021.05.19 

}

?>
