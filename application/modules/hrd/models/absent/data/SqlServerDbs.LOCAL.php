<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of SqlServerDbs
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Absent_Data_SqlServerDbs {
    
    public static function getDb($projectId,$ptId){
        /* SWITCH SQLSERVER DATABASE ABSENT  */
        if($projectId==1 && $ptId==1){
            
            return new Hrd_Models_Absent_Data_SqlServerLampung($projectId,$ptId);
            
        }else{
            return new Hrd_Models_Absent_Data_SqlServer();
        }
        
        /* END SWITCH SQLSERVER DATABASE ABSENT  */
    }
    
    
    
}
