<?php

/**
 * Description of ParamProcessor
 *
 * @author MIS
 */
class Gl_Models_App_Box_ReportProcessor extends Gl_Models_App_Box_Processor  {
    
    
    /*@added 14 Agustus 2014*/
    protected function getReadModel($controller,$debugSampleData){
        return new Gl_Models_App_Box_ReportReadWorms($controller,$debugSampleData);
    }
}

?>
