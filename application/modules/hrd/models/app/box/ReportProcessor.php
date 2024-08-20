<?php

/**
 * Description of ParamProcessor
 *
 * @author MIS
 */
class Hrd_Models_App_Box_ReportProcessor extends Hrd_Models_App_Box_Processor  {
    
    
    /*@added 14 Agustus 2014*/
    protected function getReadModel($controller,$debugSampleData){
        return new Hrd_Models_App_Box_ReportReadWorms($controller,$debugSampleData);
    }
}

?>
