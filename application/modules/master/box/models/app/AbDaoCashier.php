<?php

/**
 * Description of AbDao
 *
 * @author MIS
 */
abstract class Master_Box_Models_App_AbDaoMaster {
     protected $dbTable;
     
     private $hasil;
     private $model;
     
     function getHasil() {
         return $this->hasil;
     }

     function setHasil($hasil = NULL) {
         $this->hasil = $hasil;
     }

     function getModel() {
         return $this->model;
     }

     function setModel($model= NULL) {
         $this->model = $model;
     }

     public function getHasilModel() {
         $hasil = $this->hasil;
         $model = $this->model;
         
     
     }
     
     public function __construct() {
        $this->dbTable = new Master_Box_Models_Dbtable_DbMaster();
     
    }
    
    protected final function toDateTime($date){
        $date = (string)$date;
        $x = '';
        if(strlen($date)>0){
            $x = date('Y-m-d h:m:s', strtotime($date));
        }
        return $x;
    }
    
    
    
    public function getCustomRead($modeReads ,Master_Box_Models_App_HasilRequestRead $request, $ses ){
        $hasil = 0;
        $modeRead = ($modeReads)?$modeReads:$request->getModeRead();
        
        $userlog = Master_Box_GlobalParams::$userlog;
        $project = 0;
        if( in_array( $ses->getUser()->getId(),$userlog ) )
        {
             $project = 0;
        }
        else {
             $project = $ses->getProject()->getId();
        }

        $hasil = $this->dbTable->SPExecute('sp_all_read',
                $modeRead,
                $request->getModule(),
                $project,
                $ses->getPt()->getId(),
                1, //getpage
                25, //getlimit
                $request->getXmlValue(),
                $ses->getProject()->getId(),
                $ses->getUser()->getId()
               );
     
        return $hasil;
    }
    public function getCustomReadDirectModule($module,$modeReads ,Master_Box_Models_App_HasilRequestRead $request, $ses ){
        $hasil = 0;
        $modeRead = ($modeReads)?$modeReads:$request->getModeRead();
        $moduleRead = ($module)?$module:$request->getModule();
        
        $userlog = Master_Box_GlobalParams::$userlog;
        $project = 0;
        if( in_array( $ses->getUser()->getId(),$userlog ) )
        {
             $project = 0;
        }
        else {
             $project = $ses->getProject()->getId();
        }

        $hasil = $this->dbTable->SPExecute('sp_all_read',
                $modeRead,
                $moduleRead,
                $project,
                $ses->getPt()->getId(),
                1, //getpage
                25, //getlimit
                $request->getXmlValue(),
                $ses->getProject()->getId(),
                $ses->getUser()->getId()
               );
     
        return $hasil;
    }
    
    public function getCustomUpdate($sp,$modeReads ,Master_Box_Models_App_HasilRequestRead $request, $ses ) {
        $hasil = 0;
        $modeRead = ($modeReads)?$modeReads:$request->getModeRead();
        $hasil = $this->dbTable->SPExecute($sp,
                $modeRead,
                $request->getModule(),
                $ses->getProject()->getId(),
                $ses->getPt()->getId(),
                $ses->getUser()->getId(),
                $request->getXmlValue()
                );
            
        return $hasil;
    }
    
    
    
}

?>
